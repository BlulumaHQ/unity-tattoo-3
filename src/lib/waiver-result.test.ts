import { describe, expect, it } from "vitest";
import { classifyWaiverResult } from "./waiver-result";

const complete = { success: true, pdf_generated: true, admin_email_sent: true, customer_email_sent: true, email_error: null };

describe("waiver notification outcomes", () => {
  it("preserves a saved waiver when the admin email fails", () => {
    const result = classifyWaiverResult({ ...complete, admin_email_sent: false });
    expect(result.saved).toBe(true);
    expect(result.adminEmail).toBe("failed");
    expect(result.needsRecovery).toBe(true);
  });
  it("flags email_error even when email flags are true", () => {
    const result = classifyWaiverResult({ ...complete, email_error: "synthetic provider rejection" });
    expect(result.emailError).toBe(true);
    expect(result.needsRecovery).toBe(true);
    expect(JSON.stringify(result)).not.toContain("synthetic provider rejection");
  });
  it("never assumes missing email flags mean sent", () => {
    const result = classifyWaiverResult({ success: true, pdf_generated: true });
    expect(result.adminEmail).toBe("unconfirmed");
    expect(result.customerEmail).toBe("unconfirmed");
    expect(result.needsRecovery).toBe(true);
  });
  it("shows customer email failure separately", () => {
    const result = classifyWaiverResult({ ...complete, customer_email_sent: false });
    expect(result.adminEmail).toBe("accepted");
    expect(result.customerEmail).toBe("failed");
    expect(result.needsRecovery).toBe(true);
  });
  it("does not equate sending acceptance with delivery", () => {
    const result = classifyWaiverResult(complete);
    expect(result.adminEmail).toBe("accepted");
    expect(result.customerEmail).toBe("accepted");
    expect(result.needsRecovery).toBe(false);
  });
  it("does not classify unsuccessful saves as saved", () => {
    expect(classifyWaiverResult({ ...complete, success: false }).saved).toBe(false);
    expect(classifyWaiverResult(null).saved).toBe(false);
  });
  it("preserves saved state on PDF failure", () => {
    const result = classifyWaiverResult({ ...complete, pdf_generated: false, pdf_step_error: "synthetic failure" });
    expect(result.saved).toBe(true);
    expect(result.pdf).toBe("failed");
    expect(result.needsRecovery).toBe(true);
  });
});