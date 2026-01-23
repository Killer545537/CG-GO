import type { FieldApi, ReactFormApi } from '@tanstack/react-form';
import { type } from 'arktype';

// Define the semester schema
export const semesterSchema = type({
    credits: 'string > 0', // Input is string, validated as number > 0
    sgpa: 'string >= 0', // Input is string, validated as number >= 0
});

// Define the calculator form schema
export const calculatorSchema = type({
    semesters: semesterSchema.array().atLeastLength(1),
    dropped: semesterSchema.array(),
    currentCredits: 'string > 0',
});

// Infer types from schemas
export type Semester = typeof semesterSchema.infer;
export type CalculatorState = typeof calculatorSchema.infer;

// Form type aliases to avoid repetitive generic declarations
export type StringFieldApi = FieldApi<
    any,
    any,
    string,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
>;
export type SemesterArrayFieldApi = FieldApi<
    any,
    any,
    Semester[],
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
>;
export type FormApi = ReactFormApi<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
>;
