import { drizzle } from 'drizzle-orm/vercel-postgres';

import { sql } from "@vercel/postgres";

import {

    integer,
    pgTable,

    serial,

    text,

    timestamp,

    uniqueIndex,

    boolean

  } from 'drizzle-orm/pg-core';
import { and, eq, ne, relations } from 'drizzle-orm';
import { hashPassword } from '@main/libs/PasswordGenerator';


export const db = drizzle(sql);

// Models

export const Student = pgTable(
    'students',
    {
        id : serial('id').primaryKey(),
        name : text('name').notNull(),
        username : text('username').notNull(),
        password : text('password').notNull(),
        section : integer('section_id').references(() => Section.id),
        score : integer('score_id').references(() => Score.id),
        progress : integer('progress_id').references(() => Progress.id)
   }
)

export const Score = pgTable(
    'scores',
    {
        id : serial('id').primaryKey(),
        postTest : integer('post_test'),
        preTest : integer('pre_test')
    }
)

export const Progress = pgTable(
    'progress',
    {
        id : serial('id').primaryKey(),
        quantumMastery : integer("quantum_mastery"),
        ecologyMastery : integer('ecology_mastery'),
        momentumMastery : integer('momentum_mastery'),
        teraMastery : integer('tera_mastery')
    }
)

export const Section = pgTable(
    'sections',
    {
        id : serial('id').primaryKey(),
        sectionName : text('section_name').notNull(),
        teacherId : integer('teacher_id').references(() => Teacher.id)
   }
)

export const Teacher = pgTable(
    'teachers',
    {
        id : serial('id').primaryKey(),
        name : text('name').notNull(),
        username : text('username').notNull(),
        password : text('password').notNull(),
        isAdmin : boolean('is_admin').default(false)
    }
)

// Relations

export const sectionRelations = relations(Section, ({ many, one }) => ({
    users : many(Student),
    teacher : one(Teacher)
}))

export const studentRelations = relations(Student, ({ one }) => ({
    section : one(Section),
    score : one(Score),
    progress : one(Progress)
}))


// Operations

export type StudentType = typeof Student.$inferInsert

export const insertStudent = async (student : StudentType) => {
    return db.insert(Student).values(student).returning()
}

export const getStudents = async () => {
    const query = db.select().from(Student)

    return await query.execute()
}

export const getStudentsWithScores = async () => {
    const query = db.select()
                    .from(Student)
                    .leftJoin(Score, eq(Score.id, Student.score))
                    .where(ne(Student.score, 0))

    return query
}

export const getStudentWithProgress = async () => {
    const query = await db.select()
                            .from(Student)
                            .where(ne(Student.progress, 0))
                            .leftJoin(Progress, eq(Progress.id, Student.progress))

    return query
}

export const getStudentInfo = async (studentId : number) => {
    const query = await db.select()
                            .from(Student)
                            .where(eq(Student.id, studentId))
                            .leftJoin(Progress, eq(Progress.id, Student.progress))
                            .leftJoin(Score, eq(Score.id, Student.score))

    return query
}

export const getStudent = async (username : string, password : string) => {
    const query = db.select()
                    .from(Student)
                    .where(and(
                            eq(Student.username, username),
                            eq(Student.password, password)
                        ))

    return await query.execute()
}

export const getTeacher = async (username : string) => {
    const query = db.select()
                    .from(Teacher)
                    .where(and(
                            eq(Teacher.username, username),
                        ))
    return await query.execute()
}

export const getTeachers = async () => {
    const query = await db.select()
                    .from(Teacher)
                    .where(eq(Teacher.isAdmin, false))

    return query
}

export const changePassword = async (new_password: string, password : string) => {
    const query = await db.update(Teacher)
                    .set({ password : hashPassword(new_password) })
                    .where(eq(Teacher.password, password))
                    .returning()

    return query
}

export const getAdmin = async (username : string, password : string) => {
    const query = await db.select()
                    .from(Teacher)
                    .where(and(
                            eq(Teacher.username, username),
                            eq(Teacher.password, password),
                            eq(Teacher.isAdmin, true)
                        ))
    return query
}



export const insertSection = async (section : typeof Section.$inferInsert) => {
    return db.insert(Section).values(section).returning()
}

export const getSections = async () => {
    const query = db.select().from(Section)

    return await query.execute()
}


export const getSection = async (id : number) => {
    const section = db.select().from(Section).where(eq(Section.id, id)).as('section')
    const query = await db.select().from(Student)
                            .innerJoin(section, eq(section.id, Student.section))
                            .leftJoin(Score, eq(Score.id, Student.score))
                            .leftJoin(Progress, eq(Progress.id, Student.progress))
                            .execute()

    return query
}

export const getSectionStudents = async(id : number) => {
    const section = db.select()
                        .from(Section)
                        .where(eq(Section.id, id))
                        .as('section')

    const query = await db.select().from(Student)
                            .innerJoin(section, eq(section.id, Student.section))
                            .leftJoin(Score, eq(Score.id, Student.score))
                            .leftJoin(Progress, eq(Progress.id, Student.progress))
                            .execute()
   return query
}

export const createTeacher = async (newTeacher : typeof Teacher.$inferInsert, section_id : number | null) => {

    newTeacher.password = hashPassword(newTeacher.password)

    const query = await db.insert(Teacher).values(newTeacher).returning()

    if (section_id || section_id !== 0){
        const update_section = await db.update(Section)
                                    .set({ teacherId : query[0].id })
                                    .where(eq(Section.id, section_id as number))
    }

    return query
}

export const createSection = async (teacherId : number | null, section_name : string) => {
    return await db.transaction( async (tx) => {

        const query = await tx.insert(Section).values({ sectionName : section_name }).returning()

        if(teacherId || teacherId !== 0){

            const result = await tx.select().from(Teacher).where(eq(Teacher.id, (teacherId as number))).execute()

            const updated = await tx.update(Section).set({ teacherId : query[0].id }).where(eq(Section.id, query[0].id))
        }

        return query
    })
}

export const addStudentFromSection = async (secId : number, studentId : number) => {
    return db.transaction( async (tx) => {
        const section = await tx.select().from(Section).where(eq(Section.id, secId)).execute()

        return await tx.update(Student).set({ section : section[0].id }).where(eq(Student.id, studentId))
    })
}

