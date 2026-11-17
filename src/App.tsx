import { MantineProvider } from '@mantine/core';
import { AssessmentForm } from './features/assessment/AssessmentForm';
import './styles.css';

export default function App() {
  return (
    <MantineProvider>
      <AssessmentForm />
    </MantineProvider>
  );
}
