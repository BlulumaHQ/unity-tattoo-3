# Booking photo reliability
- [x] Fix file selection, fail-closed uploads, and separate expiring email links.
- [x] Verify tests, intercepted preview booking flow, and automatic build result.
- [x] Compare production booking script with original source.
- [ ] Confirm and enforce private bucket access, then verify real upload/signing (blocked: hosted storage paused; bucket API cannot obtain managed credentials).

# Waiver email confirmation
- [ ] Inspect production waiver endpoint and notification-result handling.
- [ ] Show saved-but-email-failed or unconfirmed status with non-resubmission recovery guidance.
- [ ] Test response rules, intercepted browser flow, and automatic build.
- [ ] Determine the 07:21 UTC email outcome (requires central sender logs, unavailable in this project's backend).