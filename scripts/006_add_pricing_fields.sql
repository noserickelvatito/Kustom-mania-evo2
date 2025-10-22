-- Add new fields to motorcycles table for offers and USD pricing
ALTER TABLE public.motorcycles 
ADD COLUMN IF NOT EXISTS price_usd DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS has_offer BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS offer_text TEXT,
ADD COLUMN IF NOT EXISTS offer_percentage INTEGER;

-- Add new fields to leads table for enhanced contact form
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS dni TEXT,
ADD COLUMN IF NOT EXISTS consultation_reason TEXT,
ADD COLUMN IF NOT EXISTS interest_area TEXT,
ADD COLUMN IF NOT EXISTS specific_question TEXT;
