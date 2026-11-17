import { describe, expect, it } from 'vitest';
import { samplePatient } from './fixtures';
import { assessmentSchema } from './schema';

describe('assessmentSchema', () => {
  it('accepts the 60th birthday and rejects the day before', () => {
    expect(
      assessmentSchema.safeParse({ ...samplePatient, dateOfBirth: '1966-08-07' }).success
    ).toBe(true);
    const result = assessmentSchema.safeParse({ ...samplePatient, dateOfBirth: '1966-08-08' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.path[0] === 'dateOfBirth')).toBe(true);
    }
  });
});
