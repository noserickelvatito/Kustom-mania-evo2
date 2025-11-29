# Integración de Google Analytics 4 - Kustom Mania

## ¿Qué se implementó?

Se integró Google Analytics 4 (GA4) en todo el sitio web de Kustom Mania para rastrear las interacciones de los usuarios y medir la efectividad del sitio.

### ID de Medición: `G-FY3VWE3KYB`

## Eventos que se Rastrean Automáticamente

### 1. 📱 Visualización de Motos (view_item)
**¿Cuándo?** Cada vez que alguien entra a ver el detalle de una moto.

**¿Qué información captura?**
- Nombre de la moto
- Marca (Harley Davidson, etc.)
- Tipo (Chopper, Bobber, etc.)
- Precio
- ID único de la moto

**¿Para qué sirve?** 
- Ver qué motos interesan más a los visitantes
- Identificar qué modelos generan más visitas
- Entender qué marcas son más populares

### 2. 🚀 Consultas por WhatsApp (generate_lead)
**¿Cuándo?** Cada vez que alguien hace clic en "Consultar por WhatsApp".

**¿Qué información captura?**
- Qué moto están consultando
- Marca y tipo de moto
- Precio de la moto consultada

**¿Para qué sirve?**
- Medir cuántos leads (consultas) genera cada moto
- Ver qué motos convierten mejor (de vista a consulta)
- Calcular la tasa de conversión por modelo

### 3. 🔍 Búsquedas y Filtros (search)
**¿Cuándo?** Cuando los visitantes buscan o filtran motos en la colección.

**¿Qué información captura?**
- Texto de búsqueda
- Filtros usados (marca, tipo, rango de precio)
- Cantidad de resultados encontrados

**¿Para qué sirve?**
- Entender qué buscan los usuarios
- Ver qué marcas/tipos son más buscados
- Identificar rangos de precio más populares

### 4. 📜 Profundidad de Scroll (scroll_XX_percent)
**¿Cuándo?** Cuando los usuarios hacen scroll en las páginas de detalle de motos.

**¿Qué mide?** 25%, 50%, 75% y 100% de scroll

**¿Para qué sirve?**
- Ver qué tan comprometidos están los usuarios
- Identificar si leen toda la información
- Medir engagement de las páginas

### 5. 🖼️ Visualización de Galerías (view_item_list)
**¿Cuándo?** Cuando alguien ve la galería de fotos de una moto.

**¿Para qué sirve?**
- Medir interés en ver más imágenes
- Identificar motos con galerías más vistas

## ¿Cómo Ver los Datos?

### Acceder a Google Analytics 4

1. Ir a [Google Analytics](https://analytics.google.com/)
2. Seleccionar la propiedad "Kustom Mania" (G-FY3VWE3KYB)
3. Navegar a **Informes** → **Interacción** → **Eventos**

### Dashboards Recomendados

#### 🎯 Embudo de Conversión
Seguir el recorrido de los usuarios desde que ven una moto hasta que consultan:

\`\`\`
Ver Moto (view_item)
    ↓
Ver Galería (view_item_list)
    ↓
Consultar WhatsApp (generate_lead)
\`\`\`

**Análisis útil:**
- ¿Qué porcentaje de visitas se convierte en consulta?
- ¿Cuántas personas ven la galería antes de consultar?

#### 🏆 Motos Más Populares
Crear un informe para ver:
- Motos con más visualizaciones
- Motos con más consultas
- Tasa de conversión por modelo

**Ejemplo de insights:**
- "La Harley Davidson Sportster tiene 100 vistas y 20 consultas (20% conversión)"
- "Las choppers convierten 30% mejor que las bobbers"

#### 🔎 Análisis de Búsquedas
Ver qué buscan los usuarios:
- Términos de búsqueda más comunes
- Marcas más filtradas
- Rangos de precio más buscados

**Ejemplo de insights:**
- "El 60% busca Harley Davidson"
- "El rango $5M-$10M es el más popular"

#### 📊 Métricas de Engagement
Medir qué tan comprometidos están los usuarios:
- Porcentaje que llega a 50% scroll
- Porcentaje que ve la galería completa
- Tiempo promedio en página de producto

## Casos de Uso Prácticos

### Optimizar Inventario
**Pregunta:** ¿Qué tipo de motos debería conseguir más?

**Análisis en GA4:**
1. Ver eventos `view_item` agrupados por marca y tipo
2. Ver eventos `generate_lead` para el mismo grupo
3. Calcular conversión por categoría

**Acción:** Conseguir más motos del tipo/marca que mejor convierten

### Ajustar Precios
**Pregunta:** ¿Los precios son atractivos?

**Análisis en GA4:**
1. Ver filtros de precio más usados en eventos `search`
2. Ver conversión por rango de precio
3. Identificar "punto dulce" de precio

**Acción:** Ajustar inventario al rango de precio más demandado

### Mejorar Descripciones
**Pregunta:** ¿La información es suficiente?

**Análisis en GA4:**
1. Ver métricas de scroll en páginas de producto
2. Correlacionar scroll depth con conversión
3. Ver qué motos tienen bajo engagement

**Acción:** Mejorar descripciones de motos con bajo engagement

### Campañas de Marketing
**Pregunta:** ¿Qué modelos promocionar?

**Análisis en GA4:**
1. Identificar motos con muchas vistas pero pocas consultas
2. Identificar motos con alta conversión
3. Ver tendencias de búsqueda

**Acción:** 
- Promocionar motos con alta conversión para maximizar ventas
- Mejorar precio/descripción de motos con muchas vistas pero baja conversión

## Reporte Semanal Recomendado

Cada lunes, revisar:

1. **Top 5 motos más vistas** de la semana
2. **Top 5 motos más consultadas** de la semana
3. **Tasa de conversión general** (consultas/vistas)
4. **Búsquedas más comunes** de la semana
5. **Tendencias**: ¿qué marca/tipo está subiendo?

## Métricas Clave (KPIs)

### Tasa de Conversión Global
\`\`\`
(Total de consultas WhatsApp / Total de vistas de producto) × 100
\`\`\`
**Meta:** 15-20% es excelente para este tipo de producto

### Engagement Score
\`\`\`
Promedio de scroll depth × Visitas a galería
\`\`\`
**Meta:** >50% de usuarios llegan al 75% scroll

### Calidad de Leads
\`\`\`
Consultas por moto / Vistas por moto
\`\`\`
**Meta:** Identificar motos con ratio >25%

## Próximos Pasos

### Corto Plazo (1-2 semanas)
- [ ] Familiarizarse con el dashboard de GA4
- [ ] Crear informes personalizados
- [ ] Configurar alertas para eventos importantes

### Mediano Plazo (1 mes)
- [ ] Analizar primer mes de datos
- [ ] Identificar tendencias
- [ ] Ajustar inventario basado en datos
- [ ] Optimizar descripciones de bajo rendimiento

### Largo Plazo (3 meses)
- [ ] Comparar ventas reales con predicciones de GA4
- [ ] Implementar estrategias de marketing basadas en datos
- [ ] Configurar objetivos de conversión
- [ ] A/B testing en páginas de producto

## Soporte Técnico

Si necesitas hacer cambios o agregar nuevos eventos de seguimiento, consulta la documentación técnica en `docs/GOOGLE-ANALYTICS-4.md`

### Archivos Modificados
- `/lib/analytics.ts` - Funciones de rastreo
- `/hooks/use-analytics.ts` - Hooks de React para tracking
- `/app/layout.tsx` - Script de GA4
- `/components/whatsapp-button.tsx` - Tracking de leads
- `/components/collection-client.tsx` - Tracking de búsquedas
- `/components/image-gallery.tsx` - Tracking de galería
- `/app/coleccion/[slug]/motorcycle-detail-client.tsx` - Tracking de vistas

## Preguntas Frecuentes

**P: ¿Los datos aparecen inmediatamente?**  
R: Los datos en tiempo real aparecen en 1-2 minutos. Los reportes completos pueden tardar 24-48 horas.

**P: ¿Se rastrea información personal de los usuarios?**  
R: No. Solo se rastrea información anónima de navegación y interacción.

**P: ¿Puedo ver qué usuario específico hizo qué?**  
R: No. GA4 trabaja con datos agregados y anónimos por privacidad.

**P: ¿Afecta la velocidad del sitio?**  
R: Mínimamente. GA4 carga de forma asíncrona y no bloquea la carga de la página.

**P: ¿Necesito hacer algo para que funcione?**  
R: No. Todo está automatizado. Solo accede a GA4 para ver los informes.

## Recursos Útiles

- [Video Tutorial GA4 en Español](https://www.youtube.com/results?search_query=google+analytics+4+tutorial+espa%C3%B1ol)
- [Curso Gratis de Google Analytics](https://analytics.google.com/analytics/academy/)
- [Centro de Ayuda GA4](https://support.google.com/analytics/)
