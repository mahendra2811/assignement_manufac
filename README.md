# Geriatric Care Assessment Form

> **Public repository:** [https://github.com/mahendra2811/assignement_manufac](https://github.com/mahendra2811/assignement_manufac)  
> **Live application:** [https://assignementmanufac.vercel.app](https://assignementmanufac.vercel.app)

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

The source code is available in the public GitHub repository linked above, and the live application is deployed at the Vercel URL linked above. The production build succeeds locally. The private learning notes are excluded from Git. No other incomplete implementation items are known.

