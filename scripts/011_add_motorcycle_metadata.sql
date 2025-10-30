-- Add brand, type, and year fields to motorcycles table
ALTER TABLE public.motorcycles
ADD COLUMN IF NOT EXISTS brand TEXT,
ADD COLUMN IF NOT EXISTS motorcycle_type TEXT,
ADD COLUMN IF NOT EXISTS year INTEGER;

-- Create index for better filtering performance
CREATE INDEX IF NOT EXISTS idx_motorcycles_brand ON public.motorcycles(brand);
CREATE INDEX IF NOT EXISTS idx_motorcycles_type ON public.motorcycles(motorcycle_type);
CREATE INDEX IF NOT EXISTS idx_motorcycles_year ON public.motorcycles(year);
CREATE INDEX IF NOT EXISTS idx_motorcycles_status ON public.motorcycles(status);

-- Add some common motorcycle types as a comment for reference
COMMENT ON COLUMN public.motorcycles.motorcycle_type IS 'Types: Custom, Chopper, Cafe Racer, Bobber, Scrambler, Cruiser, Sportster, etc.';
