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

export const Student = pgTable(
    'students',
    {
        id : serial('id').primaryKey(),
        name : text('name').notNull(),
        username : text('username').notNull().unique('username'),
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
