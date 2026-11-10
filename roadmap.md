# Booking photo reliability
- [x] Add and test a bounded, read-only storage readiness check before selected-photo uploads.
- [x] Investigate the 07:33 live build, named storage host, and documented Formspree attachment fallback.
- [x] Fix file selection, fail-closed uploads, and separate expiring email links.
- [x] Verify tests, intercepted preview booking flow, and automatic build result.
- [x] Compare production booking script with original source.
- [x] Verify actual anonymous storage readiness, upload authorization, and existing-object signing without creating objects or bookings.
- [ ] Align private bucket access with RLS, then verify a real byte upload (blocked: user requested no privacy change; current public SELECT exposes all booking references; non-destructive checks do not upload bytes).
- [ ] Verify Formspree native attachment fallback if needed (blocked: account plan, submission-storage setting, and private expiring-link behavior unverified).

# Waiver email confirmation
- [x] Inspect production waiver endpoint and notification-result handling.
- [x] Show saved-but-email-failed or unconfirmed status with non-resubmission recovery guidance.
- [x] Test response rules, intercepted browser flow, and automatic build.
- [ ] Determine the 07:21 UTC email outcome (requires central sender logs, unavailable in this project's backend).