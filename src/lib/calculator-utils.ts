/**
 * CGPA Calculator Utility Functions
 */

export type TargetResult = {
    targetCGPA: number;
    requiredSemesterCGPA: number | 'Not Possible';
};

/**
 * Sum an array of numbers
 */
function sumNumbers(numbers: number[]): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}

/**
 * Calculate weighted sum (credits * CGPA)
 */
function weightedSum(credits: number[], cgpas: number[]): number {
    if (credits.length !== cgpas.length) {
        throw new Error('Credits and CGPAs arrays must have the same length');
    }
    return credits.reduce(
        (sum, credit, index) => sum + credit * (cgpas[index] ?? 0),
        0,
    );
}

/**
 * Calculate current CGPA based on completed and dropped courses
 */
export function calculateCurrentCGPA(
    completedCredits: number[],
    completedCGPAs: number[],
    droppedCredits: number[],
    droppedCGPAs: number[],
): number {
    const totalCompletedCredits = sumNumbers(completedCredits);
    const totalCompletedCreditPoints = weightedSum(
        completedCredits,
        completedCGPAs,
    );

    const totalDroppedCredits = sumNumbers(droppedCredits);
    const totalDroppedCreditPoints = weightedSum(droppedCredits, droppedCGPAs);

    const effectivePastCredits = totalCompletedCredits - totalDroppedCredits;
    const effectivePastCreditPoints =
        totalCompletedCreditPoints - totalDroppedCreditPoints;

    if (effectivePastCredits === 0) {
        return 0;
    }

    return effectivePastCreditPoints / effectivePastCredits;
}

/**
 * Find required semester CGPAs for various target CGPAs
 */
export function findTargetCGPAs(
    completedCredits: number[],
    completedCGPAs: number[],
    droppedCredits: number[],
    droppedCGPAs: number[],
    currentSemesterCredits: number,
): TargetResult[] {
    if (
        !Number.isFinite(currentSemesterCredits) ||
        currentSemesterCredits <= 0
    ) {
        throw new Error('Current semester credits must be a positive number');
    }

    const totalCompletedCredits = sumNumbers(completedCredits);
    const totalCompletedCreditPoints = weightedSum(
        completedCredits,
        completedCGPAs,
    );

    const totalDroppedCredits = sumNumbers(droppedCredits);
    const totalDroppedCreditPoints = weightedSum(droppedCredits, droppedCGPAs);

    const effectivePastCredits = totalCompletedCredits - totalDroppedCredits;

    if (effectivePastCredits < 0) {
        throw new Error('Dropped credits exceed completed credits');
    }

    const effectivePastCreditPoints =
        totalCompletedCreditPoints - totalDroppedCreditPoints;

    const results: TargetResult[] = [];

    // Start from next 0.5 increment above current CGPA (calculated internally just for start point?)
    // Actually, let's just use the fixed range 6.0 to 10.0 as requested in code block.
    // Logic was:
    // for (let targetCGPA = 6.0; targetCGPA <= 10.0; targetCGPA += 0.5)

    for (let targetCGPA = 6.0; targetCGPA <= 10.0; targetCGPA += 0.5) {
        const requiredSemesterCGPA =
            (targetCGPA * (effectivePastCredits + currentSemesterCredits) -
                effectivePastCreditPoints) /
            currentSemesterCredits;

        results.push({
            targetCGPA,
            requiredSemesterCGPA:
                !Number.isFinite(requiredSemesterCGPA) ||
                requiredSemesterCGPA < 0 ||
                requiredSemesterCGPA > 10
                    ? 'Not Possible'
                    : Number(requiredSemesterCGPA.toFixed(2)),
        });
    }

    return results;
}

/**
 * Validate CGPA value (must be between 0 and 10)
 */
export function isValidCGPA(cgpa: number): boolean {
    return Number.isFinite(cgpa) && cgpa >= 0 && cgpa <= 10;
}

/**
 * Validate credits value (must be positive)
 */
export function isValidCredits(credits: number): boolean {
    return Number.isFinite(credits) && credits > 0;
}
