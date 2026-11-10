type DeliveryStatus = "accepted" | "failed" | "unconfirmed";

export interface WaiverOutcome {
  saved: boolean;
  adminEmail: DeliveryStatus;
  customerEmail: DeliveryStatus;
  emailError: boolean;
  pdf: DeliveryStatus;
  needsRecovery: boolean;
}

const status = (value: unknown): DeliveryStatus => value === true ? "accepted" : value === false ? "failed" : "unconfirmed";
const hasError = (value: unknown) => value !== undefined && value !== null && value !== false && value !== "";

// Keep only outcome flags: never render provider errors, email addresses, IDs, or private links.
export function classifyWaiverResult(value: unknown): WaiverOutcome {
  const json = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const adminEmail = status(json.admin_email_sent);
  const customerEmail = status(json.customer_email_sent);
  const emailError = hasError(json.email_error);
  const pdf = hasError(json.pdf_step_error) ? "failed" : status(json.pdf_generated);
  return {
    saved: json.success === true,
    adminEmail,
    customerEmail,
    emailError,
    pdf,
    needsRecovery: adminEmail !== "accepted" || customerEmail !== "accepted" || emailError || pdf !== "accepted",
  };
}