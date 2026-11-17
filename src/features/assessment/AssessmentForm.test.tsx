import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { render } from '../../../test-utils';
import { AssessmentForm } from './AssessmentForm';
import { samplePatient } from './fixtures';

describe('AssessmentForm', () => {
  it('loads the sample and saves the parsed values', async () => {
    const onSave = vi.fn();
    render(<AssessmentForm onSave={onSave} />);
    fireEvent.click(screen.getByRole('button', { name: 'Load sample patient' }));
    expect(screen.getByLabelText('Medical record number')).toHaveValue(samplePatient.mrn);
    expect(screen.getByLabelText('Patient name')).toHaveValue(samplePatient.patientName);
    expect(screen.getByLabelText('Barthel Index')).toHaveValue('80');
    fireEvent.change(screen.getByLabelText('Patient name'), {
      target: { value: '  Sushila Deshpande  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save assessment' }));
    expect(screen.getByRole('button', { name: 'Save assessment' })).toBeDisabled();
    await waitFor(() => expect(onSave).toHaveBeenCalledWith(samplePatient), { timeout: 3000 });
    expect(await screen.findByText('Assessment saved')).toBeInTheDocument();
  });
});
