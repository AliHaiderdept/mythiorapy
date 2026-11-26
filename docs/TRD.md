# Meridian — Technical Requirements Document

## 1. Scope
A responsive mental wellness dashboard with assessments, settings, history, reports, information, books, content, analytics, quizzes, detailed results, and premium content presentation.

## 2. Technology
- TanStack Start v1 and TanStack Router
- React 19 with TypeScript
- Tailwind CSS v4 using semantic design tokens
- Vite build system
- Lucide icons
- Generated local image assets

## 3. Frontend requirements
- Responsive layouts at 320px, 768px, 1280px, and 1440px.
- Route-specific metadata.
- Semantic HTML and visible focus states.
- Reduced-motion support.
- Lazy loading for content images below the initial viewport.
- No external hotlinked images.

## 4. Future backend requirements
- Managed authentication with verified sessions.
- Row-level authorization for all personal records.
- Versioned assessment definitions and immutable submitted results.
- Idempotent writes for assessment submission.
- Audit trail for exports, deletion, and consent changes.
- Encrypted object storage for generated reports.

## 5. API requirements
- Validate all inputs at the server boundary.
- Rate-limit submission and export endpoints.
- Return stable error codes with non-sensitive messages.
- Never expose clinical notes or private assessment answers in logs.

## 6. Non-functional requirements
- WCAG 2.2 AA target.
- Largest Contentful Paint under 2.5 seconds on a mid-tier mobile device.
- Cumulative Layout Shift below 0.1.
- 99.9% target availability after production launch.
- Automated tests for scoring, authorization, data deletion, and critical navigation.

## 7. Release gates
- Clinical and legal review completed.
- Security review and dependency scan passed.
- Keyboard, screen-reader, reduced-motion, and responsive QA passed.
- Crisis information verified for supported regions.
- Backup, retention, deletion, and incident procedures documented.
