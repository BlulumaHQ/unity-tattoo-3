# Booking photo reliability
- [ ] Add and test a bounded, read-only storage readiness check before selected-photo uploads.
- [ ] Investigate the 07:33 live build, named storage host, and documented Formspree attachment fallback.
- [x] Fix file selection, fail-closed uploads, and separate expiring email links.
- [x] Verify tests, intercepted preview booking flow, and automatic build result.
- [x] Compare production booking script with original source.
- [ ] Confirm and enforce private bucket access, then verify real upload/signing (blocked: hosted storage paused; bucket API cannot obtain managed credentials).

# Waiver email confirmation
- [x] Inspect production waiver endpoint and notification-result handling.
- [x] Show saved-but-email-failed or unconfirmed status with non-resubmission recovery guidance.
- [x] Test response rules, intercepted browser flow, and automatic build.
- [ ] Determine the 07:21 UTC email outcome (requires central sender logs, unavailable in this project's backend).