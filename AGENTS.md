# Architecture rules
- Keep booking photo validation, retry-safe upload paths, and expiring notification links in `src/lib/booking-references.ts`; this makes failures testable and prevents sending incomplete photo sets.
- Retain the existing booking storage client and Formspree destination; booking photo reliability work must not migrate authentication, waiver handling, or other services.