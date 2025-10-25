-- Add hero background URL to site config
ALTER TABLE site_config
ADD COLUMN IF NOT EXISTS hero_background_url TEXT;

-- Update with current S3 URL
UPDATE site_config
SET hero_background_url = 'https://kusyom-mania.s3.sa-east-1.amazonaws.com/Home+Banner+V3.mp4'
WHERE id IS NOT NULL;
