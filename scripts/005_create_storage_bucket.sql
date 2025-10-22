-- Create storage bucket for motorcycle images
INSERT INTO storage.buckets (id, name, public)
VALUES ('motorcycle-images', 'motorcycle-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to read images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'motorcycle-images');

-- Allow all users to upload images (since we removed auth)
CREATE POLICY "Allow Upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'motorcycle-images');

-- Allow all users to update images
CREATE POLICY "Allow Update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'motorcycle-images');

-- Allow all users to delete images
CREATE POLICY "Allow Delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'motorcycle-images');
