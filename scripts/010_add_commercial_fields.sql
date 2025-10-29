-- Add commercial management fields to motorcycles table
ALTER TABLE public.motorcycles
ADD COLUMN IF NOT EXISTS purchase_price DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS sale_price DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS expenses DECIMAL(10, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS purchase_date DATE,
ADD COLUMN IF NOT EXISTS sale_date DATE,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'stock' CHECK (status IN ('stock', 'published', 'negotiating', 'reserved', 'sold', 'delivered')),
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_motorcycles_status ON public.motorcycles(status);
CREATE INDEX IF NOT EXISTS idx_motorcycles_purchase_date ON public.motorcycles(purchase_date DESC);
CREATE INDEX IF NOT EXISTS idx_motorcycles_sale_date ON public.motorcycles(sale_date DESC);

-- Update existing motorcycles to have 'published' status if they don't have one
UPDATE public.motorcycles SET status = 'published' WHERE status IS NULL;

-- Create a view for motorcycle analytics
CREATE OR REPLACE VIEW public.motorcycle_analytics AS
SELECT 
  m.id,
  m.name,
  m.slug,
  m.purchase_price,
  m.sale_price,
  m.expenses,
  m.purchase_date,
  m.sale_date,
  m.status,
  m.price as display_price,
  m.price_usd,
  m.offer_percentage,
  -- Calculate margin
  CASE 
    WHEN m.sale_price IS NOT NULL AND m.purchase_price IS NOT NULL 
    THEN m.sale_price - m.purchase_price - COALESCE(m.expenses, 0)
    ELSE NULL
  END as net_margin,
  -- Calculate margin percentage
  CASE 
    WHEN m.sale_price IS NOT NULL AND m.purchase_price IS NOT NULL AND m.purchase_price > 0
    THEN ((m.sale_price - m.purchase_price - COALESCE(m.expenses, 0)) / m.purchase_price * 100)
    ELSE NULL
  END as margin_percentage,
  -- Calculate days in stock
  CASE 
    WHEN m.sale_date IS NOT NULL THEN m.sale_date - m.purchase_date
    WHEN m.purchase_date IS NOT NULL THEN CURRENT_DATE - m.purchase_date
    ELSE NULL
  END as days_in_stock,
  -- Count images
  (SELECT COUNT(*) FROM public.motorcycle_images WHERE motorcycle_id = m.id) as image_count,
  -- Count leads
  (SELECT COUNT(*) FROM public.leads WHERE motorcycle_id = m.id) as lead_count
FROM public.motorcycles m;

-- Grant access to the view
GRANT SELECT ON public.motorcycle_analytics TO authenticated, anon;
