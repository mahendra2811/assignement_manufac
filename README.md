# Geriatric Care Assessment Form

A one-page assessment form for a fictional home-care visit. This exercise simulates saving in the browser; it is not a medical record system.

## Stack

React 19, TypeScript, Vite, Mantine (`@mantine/core`, `@mantine/form`, `@mantine/dates`), Zod 4, Vitest and React Testing Library.

## Getting started

The template pins Yarn 4 via Corepack. Enable Corepack if needed, then run:

```bash
yarn install
yarn dev
```

Run the two focused tests and the template's complete quality checks:

```bash
yarn vitest
yarn test
```

## Features and approach

The form includes ten assessment fields, schema-based validation on blur and submission, a fictional sample patient, and a simulated save with loading feedback. A successful save displays the Zod-parsed values.

Mantine `useForm` manages editable input state and `schemaResolver` maps the supplied Zod issues to fields. Empty dates and numbers and unchecked consent are valid editing states even though they are not valid assessments. The submit handler parses again because Mantine's validation does not replace raw form values with Zod's transformed output.

Numeric controls do not clamp typed values on blur; the schema rejects out-of-range or non-integer scores. The assessment date picker limits selection to today, as requested. The original schema does not itself enforce this UI limit.

## Deployment and incomplete work

The production build succeeds locally. A public Git repository and live deployment have not been created: GitHub authentication and hosting credentials were not available in this environment. To deploy with Vercel, authenticate with `npx vercel login`, run `npx vercel` from this directory and follow the prompts, then publish with `npx vercel --prod`. Verify the resulting public URL and add it here. For a public repository, create one on GitHub and push the existing `main` branch; do not add the ignored private study notes.

