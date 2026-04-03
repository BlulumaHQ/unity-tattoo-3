-- Create booking_requests table
CREATE TABLE public.booking_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  placement TEXT NOT NULL,
  is_coverup BOOLEAN NOT NULL DEFAULT false,
  tattoo_size TEXT NOT NULL,
  style TEXT NOT NULL,
  colour_preference TEXT NOT NULL,
  description TEXT NOT NULL,
  preferred_artists TEXT[] NOT NULL,
  preferred_days TEXT[] NOT NULL,
  preferred_time TEXT NOT NULL,
  additional_comments TEXT,
  booked_before BOOLEAN NOT NULL DEFAULT false,
  reference_image_urls TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public booking form)
CREATE POLICY "Anyone can submit a booking request"
ON public.booking_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Authenticated users can view booking requests"
ON public.booking_requests
FOR SELECT
TO authenticated
USING (true);

-- Create storage bucket for reference images
INSERT INTO storage.buckets (id, name, public)
VALUES ('booking-references', 'booking-references', true);

-- Allow anonymous uploads to booking-references
CREATE POLICY "Anyone can upload booking references"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'booking-references');

-- Allow public read of booking references
CREATE POLICY "Booking references are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'booking-references');