-- Add is_primary field to motorcycle_images table
ALTER TABLE public.motorcycle_images 
ADD COLUMN IF NOT EXISTS is_primary BOOLEAN DEFAULT false;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_motorcycle_images_is_primary 
ON public.motorcycle_images(motorcycle_id, is_primary);

-- Create index for display order
CREATE INDEX IF NOT EXISTS idx_motorcycle_images_display_order 
ON public.motorcycle_images(motorcycle_id, display_order);

-- Function to ensure only one primary image per motorcycle
CREATE OR REPLACE FUNCTION ensure_single_primary_image()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_primary = true THEN
    -- Set all other images for this motorcycle to not primary
    UPDATE public.motorcycle_images 
    SET is_primary = false 
    WHERE motorcycle_id = NEW.motorcycle_id 
    AND id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce single primary image
DROP TRIGGER IF EXISTS trigger_ensure_single_primary_image ON public.motorcycle_images;
CREATE TRIGGER trigger_ensure_single_primary_image
  BEFORE INSERT OR UPDATE ON public.motorcycle_images
  FOR EACH ROW
  EXECUTE FUNCTION ensure_single_primary_image();

-- Set first image as primary for motorcycles that don't have one
UPDATE public.motorcycle_images mi1
SET is_primary = true
WHERE id IN (
  SELECT DISTINCT ON (motorcycle_id) id
  FROM public.motorcycle_images mi2
  WHERE NOT EXISTS (
    SELECT 1 FROM public.motorcycle_images mi3
    WHERE mi3.motorcycle_id = mi2.motorcycle_id
    AND mi3.is_primary = true
  )
  ORDER BY motorcycle_id, display_order, created_at
);
