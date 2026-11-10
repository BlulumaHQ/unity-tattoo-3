import { beforeEach, describe, expect, it, vi } from "vitest";

const storage = vi.hoisted(() => ({ list: vi.fn(), upload: vi.fn(), createSignedUrl: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { storage: { from: () => storage } } }));
import { checkBookingStorageAvailability, referenceEmailFields, STORAGE_CHECK_TIMEOUT_MS, uploadBookingReferences, validateReferenceFiles } from "./booking-references";

const photo = (name = "photo.png") => new File(["synthetic image"], name, { type: "image/png" });

beforeEach(() => {
  vi.resetAllMocks();
  storage.list.mockResolvedValue({ data: [], error: null });
  storage.upload.mockResolvedValue({ data: { path: "synthetic.png" }, error: null });
  storage.createSignedUrl.mockResolvedValue({ data: { signedUrl: "https://example.invalid/signed/photo?token=synthetic" }, error: null });
});

describe("booking reference safety", () => {
  it("blocks uploads and notification when storage is unavailable", async () => {
    storage.list.mockResolvedValue({ data: null, error: { message: "paused" } });
    const notify = vi.fn();
    await expect(uploadBookingReferences([photo()], new Map()).then(notify)).rejects.toThrow("Photo storage is currently unavailable");
    expect(storage.upload).not.toHaveBeenCalled();
    expect(notify).not.toHaveBeenCalled();
  });

  it("bounds an unresponsive storage check to 12 seconds", async () => {
    vi.useFakeTimers();
    try {
      storage.list.mockImplementation(() => new Promise(() => {}));
      const assertion = expect(checkBookingStorageAvailability()).rejects.toThrow("Photo storage is currently unavailable");
      expect(STORAGE_CHECK_TIMEOUT_MS).toBe(12000);
      await vi.advanceTimersByTimeAsync(12000);
      await assertion;
    } finally {
      vi.useRealTimers();
    }
  });

  it("never enumerates existing photos and skips storage for photo-free bookings", async () => {
    await uploadBookingReferences([photo()], new Map());
    expect(storage.list).toHaveBeenCalledWith(expect.stringMatching(/^readiness-/), { limit: 1 });
    storage.list.mockClear();
    await expect(uploadBookingReferences([], new Map())).resolves.toEqual([]);
    expect(storage.list).not.toHaveBeenCalled();
    expect(referenceEmailFields([]).reference_photo_count).toBe("0");
  });
  it("rejects more than 3 selected photos instead of silently truncating", () => {
    expect(validateReferenceFiles([photo(), photo(), photo()])).toBeNull();
    expect(validateReferenceFiles([photo(), photo(), photo(), photo()])).not.toBeNull();
  });

  it("blocks notification when any selected photo upload fails", async () => {
    storage.upload.mockResolvedValueOnce({ data: { path: "one.png" }, error: null })
      .mockResolvedValueOnce({ data: null, error: { message: "upload failed" } });
    const notify = vi.fn();
    await expect(uploadBookingReferences([photo("one.png"), photo("two.png")], new Map()).then(notify)).rejects.toThrow("photo 2 could not be uploaded");
    expect(notify).not.toHaveBeenCalled();
  });

  it("blocks notification when signing fails", async () => {
    storage.createSignedUrl.mockResolvedValue({ data: null, error: { message: "denied" } });
    const notify = vi.fn();
    await expect(uploadBookingReferences([photo()], new Map()).then(notify)).rejects.toThrow("secure link");
    expect(notify).not.toHaveBeenCalled();
  });

  it("requires an actual upload path and an actual signed URL", async () => {
    storage.upload.mockResolvedValue({ data: null, error: null });
    await expect(uploadBookingReferences([photo()], new Map())).rejects.toThrow("could not be uploaded");
    storage.upload.mockResolvedValue({ data: { path: "one.png" }, error: null });
    storage.createSignedUrl.mockResolvedValue({ data: {}, error: null });
    await expect(uploadBookingReferences([photo()], new Map())).rejects.toThrow("secure link");
  });

  it("uses time-limited signed links and reuses uploads when retrying", async () => {
    const file = photo();
    const cache = new Map<File, string>();
    await uploadBookingReferences([file], cache);
    await uploadBookingReferences([file], cache);
    expect(storage.upload).toHaveBeenCalledTimes(1);
    expect(storage.createSignedUrl).toHaveBeenCalledTimes(2);
    expect(storage.createSignedUrl).toHaveBeenCalledWith("synthetic.png", 604800);
    expect(storage.upload.mock.calls[0][0]).not.toContain(file.name);
  });

  it("sends a separate readable field for every uploaded photo", () => {
    const links = ["https://example.invalid/one", "https://example.invalid/two", "https://example.invalid/three"];
    const fields = referenceEmailFields(links);
    expect(fields.reference_photo_count).toBe("3");
    expect(fields.reference_photo_1).toBe(links[0]);
    expect(fields.reference_photo_2).toBe(links[1]);
    expect(fields.reference_photo_3).toBe(links[2]);
    expect(fields.reference_image_urls).toBe(links.join("\n"));
  });
});