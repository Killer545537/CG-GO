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
