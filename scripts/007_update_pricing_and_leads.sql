-- Add new pricing fields to motorcycles table
ALTER TABLE motorcycles
ADD COLUMN IF NOT EXISTS price_usd DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS offer_percentage INTEGER CHECK (offer_percentage >= 0 AND offer_percentage <= 100);

-- Add new fields to leads table for enhanced contact form
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS dni VARCHAR(20),
ADD COLUMN IF NOT EXISTS consultation_reason TEXT,
ADD COLUMN IF NOT EXISTS interest_area VARCHAR(255),
ADD COLUMN IF NOT EXISTS specific_question TEXT;

-- Add comments
COMMENT ON COLUMN motorcycles.price_usd IS 'Price in USD';
COMMENT ON COLUMN motorcycles.offer_percentage IS 'Discount percentage (0-100)';
COMMENT ON COLUMN leads.dni IS 'Customer ID number';
COMMENT ON COLUMN leads.consultation_reason IS 'Reason for consultation';
COMMENT ON COLUMN leads.interest_area IS 'Area of interest';
COMMENT ON COLUMN leads.specific_question IS 'Specific question about the motorcycle';
