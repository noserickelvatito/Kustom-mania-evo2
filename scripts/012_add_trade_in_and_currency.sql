-- Add trade-in and currency fields to motorcycles table
ALTER TABLE motorcycles
ADD COLUMN IF NOT EXISTS trade_in_motorcycle_id UUID REFERENCES motorcycles(id),
ADD COLUMN IF NOT EXISTS trade_in_value NUMERIC(12, 2),
ADD COLUMN IF NOT EXISTS cash_payment NUMERIC(12, 2);

-- Add comment to explain the fields
COMMENT ON COLUMN motorcycles.trade_in_motorcycle_id IS 'ID of motorcycle taken as trade-in (part of payment)';
COMMENT ON COLUMN motorcycles.trade_in_value IS 'Value assigned to the trade-in motorcycle';
COMMENT ON COLUMN motorcycles.cash_payment IS 'Actual cash received in the sale (excluding trade-in)';
