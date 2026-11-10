import { supabase } from "@/integrations/supabase/client";

export const MAX_REFERENCE_IMAGES = 3;
export const REFERENCE_LINK_LIFETIME_SECONDS = 7 * 24 * 60 * 60;
const BUCKET = "booking-references";

export function validateReferenceFiles(files: File[]): string | null {
  if (files.length > MAX_REFERENCE_IMAGES) return "Choose up to 3 reference photos. No photos were removed.";
  if (files.some((file) => !file.type.startsWith("image/"))) return "Please select image files only.";
  if (files.some((file) => file.size === 0)) return "An empty photo cannot be uploaded. Please choose another file.";
  return null;
}

// Reuse successful uploads on retry; refresh every signed link before sending.
export async function uploadBookingReferences(files: File[], uploadedPaths: Map<File, string>) {
  const validationError = validateReferenceFiles(files);
  if (validationError) throw new Error(validationError);
  const links: string[] = [];
  for (const [index, file] of files.entries()) {
    let path = uploadedPaths.get(file);
    if (!path) {
      const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 10) || "image";
      const { data, error } = await supabase.storage.from(BUCKET).upload(
        `${crypto.randomUUID()}.${extension}`, file, { upsert: false, contentType: file.type },
      );
      if (error || !data?.path) {
        throw new Error(`Reference photo ${index + 1} could not be uploaded. Your booking has not been sent. Please try again or replace that photo.`);
      }
      path = data.path;
      uploadedPaths.set(file, path);
    }
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, REFERENCE_LINK_LIFETIME_SECONDS);
    if (error || !data?.signedUrl || !data.signedUrl.startsWith("https://")) {
      throw new Error(`A secure link for reference photo ${index + 1} could not be created. Your booking has not been sent. Please try again.`);
    }
    links.push(data.signedUrl);
  }
  return links;
}

export function referenceEmailFields(links: string[]): Record<string, string> {
  return {
    reference_image_urls: links.length ? links.join("\n") : "None",
    ...(links.length ? { reference_photo_link_expiry: "Links expire 7 days after this booking is sent." } : {}),
    ...Object.fromEntries(links.map((link, index) => [`reference_photo_${index + 1}`, link])),
  };
}