import { drizzle } from 'drizzle-orm/vercel-postgres';

import { sql } from "@vercel/postgres";

import {

    integer,
    pgTable,

    serial,

    text,

    timestamp,

    uniqueIndex,

  } from 'drizzle-orm/pg-core';


export const db = drizzle(sql);

// Models

export const Student = pgTable(
    'students',
    {
        id : serial('id').primaryKey(),
        name : text('name').notNull(),
        username : text('username').notNull(),
        password : text('password').notNull(),
        section : integer('section_id').references(() => Section.id)
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
    }
)


// Operations

export type StudentType = typeof Student.$inferInsert

export const insertStudent = async (student : StudentType) => {
    return db.insert(Student).values(student).returning()
}
