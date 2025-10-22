-- Insert sample motorcycles
INSERT INTO public.motorcycles (name, slug, description, engine, exhaust, paint, modifications, price, featured, display_order) VALUES
(
  'Iron Custom 350',
  'iron-custom-350',
  'Una obra maestra del estilo café racer con acabados en bronce metálico. Perfecta combinación de potencia y elegancia para los amantes del diseño clásico con un toque moderno.',
  '350cc monocilíndrico refrigerado por aire',
  'Escape artesanal de acero inoxidable con acabado negro mate',
  'Bronce metálico con detalles en negro brillante',
  'Manillar bajo tipo clip-on, asiento monoplaza de cuero, suspensión rebajada, llantas de radios cromadas',
  4500000,
  true,
  1
),
(
  'Dark Blade 500',
  'dark-blade-500',
  'Agresiva y poderosa, esta bobber oscura combina la brutalidad del negro con sutiles toques de bronce. Diseñada para quienes buscan destacar en cada ruta.',
  '500cc bicilíndrico en V refrigerado por líquido',
  'Escape doble lateral con puntas cromadas',
  'Negro mate con líneas en bronce envejecido',
  'Guardabarros corto, iluminación LED completa, asiento tipo bobber, neumáticos anchos, manillar alto tipo ape hanger',
  6200000,
  true,
  2
),
(
  'Street Rebel 250',
  'street-rebel-250',
  'Compacta y ágil, ideal para la ciudad. Esta scrambler urbana ofrece versatilidad y estilo en un paquete accesible, perfecta para riders que buscan su primera custom.',
  '250cc monocilíndrico de 4 tiempos',
  'Escape alto tipo scrambler en acero inoxidable',
  'Gris metalizado con detalles en bronce',
  'Neumáticos mixtos, protector de motor, faro redondo LED, asiento plano, manillar ancho',
  3200000,
  false,
  3
);
