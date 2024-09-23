import { drizzle } from 'drizzle-orm/vercel-postgres';

import { sql } from "@vercel/postgres";

import { and, eq, ne, relations } from 'drizzle-orm';

import * as schema from './schema';
import { query } from 'firebase/database';

export const db = drizzle(sql ,{ schema });

// Operations

export type StudentType = typeof schema.Student.$inferInsert

export const insertStudent = async (student : StudentType) => {
    return db.insert(schema.Student).values(student).returning()
}

export const getStudents = async () => {
    const students = await db.query.Student.findMany({
        columns : {
            password : false
        },
        with : {
            score : true,
            progress : {
                columns : {
                    id : false
                }
            },
            section : {
                columns : {
                    id : false,
                    teacherId : false,
                },
                with : {
                    teacher : {
                        columns : {
                            name: true,
                            username : true
                        }
                    }
                }
            }
        }
    });

    return students
}

export const getStudentsWithScores = async (page : number = 1) => {
    const pageSize = 12
    const students = await db.query.Student.findMany({
        with : {
            score : {
                columns : {
                    id : false
                }
            }
        },
        limit : pageSize,
        offset : (pageSize - 1) * page
    })

    return students
}

export const getStudentWithProgress = async (page : number = 1) => {
    const pageSize = 12
    const students = await db.query.Student.findMany({
        with : {
            progress : {
                columns : {
                    id : false
                }
            }
        },
        limit : pageSize,
        offset : (pageSize -1) * page
    })

    return students
}
export const getStudent = async (userId : number) => {
    const student = await db.query.Student.findFirst({
        where : eq(schema.Student.id, userId),
        with : {
            section : {
                columns : {
                    id : false
                },
                with : {
                    teacher : {
                        columns : {
                            id : false,
                            password : false
                        }
                    }
                }
            },
            progress : {
                columns : {
                    id : false
                }
            },
            score : {
                columns : {
                    id : false
                }
            }
        }

    })

    return student
}

export const getTeacher = async (username : string) => {
    const query = db.select()
                    .from(schema.Teacher)
                    .where(and(
                            eq(schema.Teacher.username, username),
                        ))
    return await query.execute()
}

export const getTeacherById = async (id : number | string) => {
    const query = await db.select()
                        .from(schema.Teacher)
                        .where(eq(schema.Teacher.id, Number(id)))

    return query[0]
}

export const getTeachers = async () => {
    const query = await db.select()
                    .from(schema.Teacher)
                    .where(eq(schema.Teacher.isAdmin, false))

    return query
}

export const changePassword = async (new_password: string, password : string) => {
    const query = await db.update(schema.Teacher)
                    .set({ password : new_password })
                    .where(eq(schema.Teacher.password, password))
                    .returning()

    return query
}

export const getAdmin = async (username : string, password : string) => {
    const query = await db.select()
                    .from(schema.Teacher)
                    .where(and(
                            eq(schema.Teacher.username, username),
                            eq(schema.Teacher.password, password),
                            eq(schema.Teacher.isAdmin, true)
                        ))
    return query
}



export const insertSection = async (section : typeof schema.Section.$inferInsert) => {
    return db.insert(schema.Section).values(section).returning()
}

export const getSections = async () => {
    const sections = await db.query.Section.findMany({
        with : {
            teacher : {
                columns : {
                    password : false,
                    isAdmin : false
                }
            }
        }
    })

    return sections
}


export const getSection = async (id : number) => {
    const section = db.select().from(schema.Section).where(eq(schema.Section.id, id)).as('section')
    const query = await db.select().from(schema.Student)
                            .innerJoin(section, eq(section.id, schema.Student.section))
                            .leftJoin(schema.Score, eq(schema.Score.id, schema.Student.score))
                            .leftJoin(schema.Progress, eq(schema.Progress.id, schema.Student.progress))
                            .execute()

    return query
}

export const getSectionData = async(id : number) => {
    const result = await db.query.Section.findFirst({
        where: eq(schema.Section.id, id),
        with : {
            students : {
                with : {
                    score : {
                        columns : {
                            id: false
                        }
                    },
                    progress : {
                        columns : {
                            id : false
                        }
                    }
                }
            }
        }
    })
   return result
}

export const createTeacher = async (newTeacher : typeof schema.Teacher.$inferInsert, section_id : number | null) => {

    const teacher = await db.select().from(schema.Teacher).where(eq(schema.Teacher.username, newTeacher.username))

    if (teacher.length > 0){
        throw new Error(`Teacher ${newTeacher.username} already exists!`);
    }
    const query = await db.insert(schema.Teacher).values(newTeacher).returning()

    if (section_id || section_id !== 0 || !isNaN(section_id)){
        const update_section = await db.update(schema.Section)
                                    .set({ teacherId : query[0].id })
                                    .where(eq(schema.Section.id, section_id as number))
    }

    return query
}

export const createSection = async (teacherId : number | null, section_name : string) => {
    return await db.transaction( async (tx) => {

        const query = await tx.insert(schema.Section).values({ sectionName : section_name }).returning()

        if(teacherId || teacherId !== 0){

            const result = await tx.select().from(schema.Teacher).where(eq(schema.Teacher.id, (teacherId as number))).execute()

            const updated = await tx.update(schema.Section).set({ teacherId : query[0].id }).where(eq(schema.Section.id, query[0].id))
        }

        return query
    })
}

export const addStudentFromSection = async (secId : number, studentId : number) => {
    return db.transaction( async (tx) => {
        const section = await tx.select().from(schema.Section).where(eq(schema.Section.id, secId)).execute()

        return await tx.update(schema.Student).set({ section : section[0].id }).where(eq(schema.Student.id, studentId))
    })
}


export const createProgress = async (newProgress : typeof schema.Progress.$inferInsert, studentId : number) => {
    const progress = await db.insert(schema.Progress).values(newProgress).returning()

    const student = await db.update(schema.Student).set({ progress : progress[0].id }).where(eq(schema.Student.id, studentId)).returning()

    return student[0]
}

export const getProgress = async(studentId : number) => {
    const query = await db.select({
                            name : schema.Student.name,
                            username : schema.Student.username,
                            quantumMastery : schema.Progress.quantumMastery,
                            ecologyMastery : schema.Progress.ecologyMastery,
                            momentumMastery : schema.Progress.momentumMastery,
                            teraMastery : schema.Progress.teraMastery,
                            section : schema.Section.sectionName
                        }).from(schema.Student)
                        .leftJoin(schema.Progress, eq(schema.Student.progress, schema.Progress.id))
                        .leftJoin(schema.Section, eq(schema.Section.id, schema.Student.section))
                        .where(eq(schema.Student.id, studentId))
    return query[0]
}

export const updateStudentScore = async(studentId : number, newScore : typeof schema.Score.$inferInsert) => {
    const student = await db.query.Student.findFirst({
        where : eq(schema.Student.id, studentId),
        with : {
            score : true
        }
    })

    if(student?.score){

        const res = await db.update(schema.Score).set(newScore).where(eq(schema.Score.id, Number(student?.score.id))).returning()

        return await db.query.Student.findFirst({
            where : eq(schema.Student.score, res[0].id),
            with : {
                score : true
            }
        })
    }
    else
    {
        const score = await db.insert(schema.Score).values(newScore).returning()

        if(typeof student !== 'undefined'){
            const st = await db.update(schema.Student).set({ score : score[0].id }).where(eq(schema.Student.id, student.id)).returning()

            return st[0]
        }

    }

    return null

}
