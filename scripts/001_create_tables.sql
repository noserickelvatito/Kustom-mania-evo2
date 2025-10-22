-- Create motorcycles table
CREATE TABLE IF NOT EXISTS public.motorcycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  engine TEXT NOT NULL,
  exhaust TEXT NOT NULL,
  paint TEXT NOT NULL,
  modifications TEXT NOT NULL,
  price DECIMAL(10, 2),
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create motorcycle images table
CREATE TABLE IF NOT EXISTS public.motorcycle_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  motorcycle_id UUID NOT NULL REFERENCES public.motorcycles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table for WhatsApp consultations
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  motorcycle_id UUID REFERENCES public.motorcycles(id) ON DELETE SET NULL,
  motorcycle_name TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  origin_route TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site configuration table
CREATE TABLE IF NOT EXISTS public.site_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number TEXT NOT NULL,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_description TEXT NOT NULL,
  hero_button_text TEXT NOT NULL,
  instagram_url TEXT,
  facebook_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default configuration
INSERT INTO public.site_config (
  whatsapp_number,
  hero_title,
  hero_subtitle,
  hero_description,
  hero_button_text
) VALUES (
  '+5491112345678',
  'KUSTOM MANIA',
  'PASIÓN POR LAS DOS RUEDAS',
  'Donde la personalidad se encuentra con el asfalto.',
  'EXPLORAR LA COLECCIÓN'
) ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.motorcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.motorcycle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Public read access for motorcycles and images (no auth required)
CREATE POLICY "Anyone can view motorcycles"
  ON public.motorcycles FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view motorcycle images"
  ON public.motorcycle_images FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view site config"
  ON public.site_config FOR SELECT
  USING (true);

-- Anyone can insert leads (for WhatsApp form submissions)
CREATE POLICY "Anyone can create leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can manage motorcycles (admin only)
CREATE POLICY "Authenticated users can insert motorcycles"
  ON public.motorcycles FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update motorcycles"
  ON public.motorcycles FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete motorcycles"
  ON public.motorcycles FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Only authenticated users can manage motorcycle images
CREATE POLICY "Authenticated users can insert motorcycle images"
  ON public.motorcycle_images FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update motorcycle images"
  ON public.motorcycle_images FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete motorcycle images"
  ON public.motorcycle_images FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Only authenticated users can view and manage leads
CREATE POLICY "Authenticated users can view leads"
  ON public.leads FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete leads"
  ON public.leads FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Only authenticated users can update site config
CREATE POLICY "Authenticated users can update site config"
  ON public.site_config FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_motorcycles_slug ON public.motorcycles(slug);
CREATE INDEX IF NOT EXISTS idx_motorcycles_featured ON public.motorcycles(featured);
CREATE INDEX IF NOT EXISTS idx_motorcycles_display_order ON public.motorcycles(display_order);
CREATE INDEX IF NOT EXISTS idx_motorcycle_images_motorcycle_id ON public.motorcycle_images(motorcycle_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_motorcycle_id ON public.leads(motorcycle_id);
