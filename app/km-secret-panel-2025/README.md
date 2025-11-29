# Panel de Administración - Kustom Mania

Este directorio contiene el panel de administración completo para gestionar el sitio web de Kustom Mania.

## 🏗️ Estructura

\`\`\`
km-secret-panel-2025/
├── layout.tsx              # Layout principal con sidebar y Toaster
├── page.tsx                # Dashboard con métricas clave
├── analytics/              # Estadísticas detalladas
├── config/                 # Configuración del sitio
├── images/                 # Gestión de imágenes
├── leads/                  # Consultas de WhatsApp
├── motorcycles/            # CRUD de motocicletas
├── operations/             # Tabla financiera
└── pipeline/               # Pipeline de ventas
\`\`\`

## 🎨 Características

### Diseño Consistente
- Todas las páginas usan el mismo layout con sidebar
- Tema claro/oscuro totalmente funcional
- Responsive design en todas las páginas
- Color de marca: `#b87333` (cobre)

### Notificaciones
- Sistema de toast con Sonner
- Feedback visual en todas las operaciones CRUD
- Loading states con spinners e íconos

### Navegación
- Sidebar organizado por categorías:
  - **Principal**: Dashboard
  - **Gestión**: Operaciones, Pipeline, Motocicletas
  - **Análisis**: Estadísticas, Consultas
  - **Contenido**: Imágenes
  - **Sistema**: Configuración

## 🔧 Componentes Principales

### Layout (`layout.tsx`)
- Wrapper principal con sidebar
- ThemeProvider para modo claro/oscuro
- Toaster para notificaciones globales

### Dashboard (`page.tsx`)
- Métricas clave de negocio
- Alertas de motos que requieren atención
- Gráficos de ventas y márgenes
- Actividad reciente

### Operaciones (`operations/`)
- Tabla financiera completa
- Resumen de inversión, gastos e ingresos
- Búsqueda y filtros
- Exportación a CSV

### Pipeline (`pipeline/`)
- Kanban de estados de motos
- Drag-like para cambiar estados
- Vista visual del proceso de venta

## 📦 Dependencias Clave

- **Next.js 15**: Framework principal
- **Supabase**: Base de datos y autenticación
- **shadcn/ui**: Componentes de UI
- **Sonner**: Sistema de notificaciones
- **Recharts**: Gráficos y visualizaciones

## 🎯 Buenas Prácticas

1. **Siempre usar el layout principal**: No crear headers personalizados
2. **Toast para feedback**: Usar `toast` de Sonner para todas las acciones
3. **Loading states**: Mostrar estados de carga en operaciones asíncronas
4. **Localización**: Usar `toLocaleString("es-AR")` para números
5. **Tipado**: Mantener tipos estrictos con TypeScript
6. **Componentes reutilizables**: Crear en `/components/admin/`

## 🚀 Desarrollo

\`\`\`bash
# Instalar dependencias
npm install --legacy-peer-deps

# Modo desarrollo
npm run dev

# Build de producción
npm run build
\`\`\`

## 🔐 Acceso

El panel está protegido y solo accesible para usuarios autenticados con permisos de admin.

Ruta: `/km-secret-panel-2025`

## 📝 Notas

- Todos los cambios se reflejan inmediatamente con `router.refresh()`
- Las imágenes se almacenan en Supabase Storage
- Los datos financieros se calculan en tiempo real
- Las métricas de analytics se cachean en una tabla separada

## 🎨 Estilo y Diseño

- Usa Tailwind CSS para todos los estilos
- Evita estilos inline excepto para casos muy específicos
- Mantén consistencia con el color de marca `#b87333`
- Usa los componentes de shadcn/ui cuando sea posible
- Responsive first: diseña primero para móvil

## 🐛 Debugging

- Los errores se logean en la consola con prefijo `[v0]`
- Usa las DevTools de React para inspeccionar componentes
- Verifica el Network tab para problemas de API
- Usa `router.refresh()` si los datos no se actualizan

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
