# Meridian — Architecture

## Current prototype
The delivered prototype uses TanStack Start, React 19, TypeScript, Tailwind CSS v4, and Vite. The current experience is frontend-only with local component state for demonstrative interactions.

## Application layers
1. Route layer: page metadata and screen composition.
2. UI layer: reusable dashboard, navigation, result, assessment, and resource patterns.
3. Domain layer: future assessment scoring, recommendation rules, and report models.
4. Data layer: future authenticated persistence for user-owned records.

## Recommended production modules
- Identity and consent
- Profile and preferences
- Check-ins and mood entries
- Assessment definitions, responses, and scoring
- Quiz content and results
- Content catalog and entitlements
- Analytics summaries
- Report generation
- Notifications and reminders
- Safety-resource localization

## Suggested data entities
User, Profile, Consent, CheckIn, Assessment, AssessmentResponse, Result, Activity, ContentItem, ContentProgress, Subscription, Reminder, and AuditEvent.

## Security boundaries
- Treat health-related entries as sensitive data.
- Enforce server-side authorization for every user-owned record.
- Encrypt transport and managed storage.
- Separate product analytics from sensitive journal content.
- Never determine premium or admin access in browser storage.
- Log access to exports and account deletion actions.

## Scale and performance
- Server-render the initial dashboard shell.
- Lazy-load lower-page media.
- Cache public catalog content; never publicly cache personal results.
- Precompute longer-range aggregates while retaining source records.
