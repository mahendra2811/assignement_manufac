import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { initialValues, samplePatient, type AssessmentInput } from './fixtures';
import { assessmentSchema, MOBILITY, type Assessment } from './schema';

type AssessmentFormProps = {
  onSave?: (assessment: Assessment) => void | Promise<void>;
};

const mobilityOptions = MOBILITY.map((value) => ({
  value,
  label: value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '),
}));

export function AssessmentForm({ onSave }: AssessmentFormProps) {
  const [saving, setSaving] = useState(false);
  const [savedAssessment, setSavedAssessment] = useState<Assessment | null>(null);
  const savingRef = useRef(false);
  const form = useForm<AssessmentInput>({
    mode: 'controlled',
    initialValues,
    validate: schemaResolver(assessmentSchema, { sync: true }),
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values: AssessmentInput) => {
    if (savingRef.current) return;
    const parsed = assessmentSchema.parse(values);
    savingRef.current = true;
    setSaving(true);
    setSavedAssessment(null);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 800));
      await onSave?.(parsed);
      setSavedAssessment(parsed);
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper withBorder p="xl" radius="md">
        <Title order={1} mb="lg">
          Geriatric Care Assessment
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Stack>
            <TextInput
              label="Medical record number"
              placeholder="MRN-004821"
              {...form.getInputProps('mrn')}
            />
            <TextInput label="Patient name" {...form.getInputProps('patientName')} />
            <DateInput label="Date of birth" {...form.getInputProps('dateOfBirth')} />
            <DateInput
              label="Assessment date"
              maxDate={dayjs().format('YYYY-MM-DD')}
              {...form.getInputProps('assessmentDate')}
            />
            <Select label="Mobility" data={mobilityOptions} {...form.getInputProps('mobility')} />
            <NumberInput
              label="Barthel Index"
              step={5}
              min={0}
              max={100}
              clampBehavior="none"
              {...form.getInputProps('barthelIndex')}
            />
            <NumberInput
              label="Regular medications"
              min={0}
              max={30}
              clampBehavior="none"
              {...form.getInputProps('medicationCount')}
            />
            <Checkbox
              label="Pharmacist review requested"
              {...form.getInputProps('pharmacistReviewRequested', { type: 'checkbox' })}
            />
            <DateInput label="Next review date" {...form.getInputProps('followUpDate')} />
            <Checkbox
              label="Patient or representative has given consent"
              {...form.getInputProps('consentObtained', { type: 'checkbox' })}
            />
            <Group>
              <Button
                variant="default"
                type="button"
                disabled={saving}
                onClick={() => {
                  form.setValues(samplePatient);
                  form.clearErrors();
                  form.resetTouched();
                  setSavedAssessment(null);
                }}
              >
                Load sample patient
              </Button>
              <Button type="submit" loading={saving} disabled={saving}>
                Save assessment
              </Button>
            </Group>
          </Stack>
        </form>
        {savedAssessment && (
          <Alert title="Assessment saved" color="green" mt="lg">
            <Code block>{JSON.stringify(savedAssessment, null, 2)}</Code>
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
