-- Remove authentication-based RLS policies and allow all operations
-- Since we're using an obscure URL for security instead of authentication

-- Drop existing restrictive policies for motorcycles
DROP POLICY IF EXISTS "Authenticated users can insert motorcycles" ON public.motorcycles;
DROP POLICY IF EXISTS "Authenticated users can update motorcycles" ON public.motorcycles;
DROP POLICY IF EXISTS "Authenticated users can delete motorcycles" ON public.motorcycles;

-- Drop existing restrictive policies for motorcycle images
DROP POLICY IF EXISTS "Authenticated users can insert motorcycle images" ON public.motorcycle_images;
DROP POLICY IF EXISTS "Authenticated users can update motorcycle images" ON public.motorcycle_images;
DROP POLICY IF EXISTS "Authenticated users can delete motorcycle images" ON public.motorcycle_images;

-- Drop existing restrictive policies for leads
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated users can delete leads" ON public.leads;

-- Drop existing restrictive policies for site config
DROP POLICY IF EXISTS "Authenticated users can update site config" ON public.site_config;

-- Create new permissive policies that allow all operations
-- Motorcycles: allow all operations
CREATE POLICY "Allow all operations on motorcycles"
  ON public.motorcycles
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Motorcycle Images: allow all operations
CREATE POLICY "Allow all operations on motorcycle images"
  ON public.motorcycle_images
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Leads: allow all operations
CREATE POLICY "Allow all operations on leads"
  ON public.leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Site Config: allow all operations
CREATE POLICY "Allow all operations on site config"
  ON public.site_config
  FOR ALL
  USING (true)
  WITH CHECK (true);
