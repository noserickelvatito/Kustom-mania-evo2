# 🏍️ Kustom Mania - Plataforma de Compra Venta de Motos Custom

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/casablancaroqiue-2714s-projects/v0-kustom-mania-homepage)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Database-Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.com/)

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Desarrollo Local](#-desarrollo-local)
- [Panel de Administración](#-panel-de-administración)
- [Esquema de Base de Datos](#-esquema-de-base-de-datos)
- [SEO y Analytics](#-seo-y-analytics)
- [Deployment](#-deployment)
- [Scripts Disponibles](#-scripts-disponibles)
- [Arquitectura y Decisiones Técnicas](#-arquitectura-y-decisiones-técnicas)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🎯 Descripción General

**Kustom Mania** es una plataforma web completa para la compra y venta de motocicletas custom en Argentina. Con más de 9 años de experiencia y +130 motos vendidas, somos líderes en el mercado de Harley Davidson, choppers, bobbers y motos clásicas en Córdoba.

Esta aplicación web moderna proporciona:
- **Showroom virtual** con catálogo de motos en stock
- **Sistema de gestión** completo para administración de inventario
- **Pipeline de ventas** integrado con seguimiento de leads
- **Sistema de comparación** de motocicletas
- **SEO optimizado** para posicionamiento en buscadores
- **Analytics integrado** con Google Analytics 4
- **Integración con WhatsApp** para consultas directas
- **Sistema de gestión de imágenes** con AWS S3
- **Panel administrativo** completo y seguro

🌐 **Sitio en Producción**: [https://www.kustom-mania.com.ar](https://www.kustom-mania.com.ar)

---

## ✨ Características Principales

### 🏠 Frontend Público

- **Página de Inicio**
  - Hero section con video background adaptativo (desktop y mobile)
  - Estadísticas destacadas (9+ años, 130+ motos vendidas)
  - Últimas incorporaciones al catálogo
  - Sección "Por qué Kustom Mania"
  - Proceso de compra paso a paso
  - FAQ Section integrada
  - Múltiples CTAs de WhatsApp
  - Animaciones y transiciones fluidas

- **Catálogo de Motos (`/coleccion`)**
  - Grid responsive de motocicletas disponibles
  - Filtros por estado (stock, reservadas, vendidas)
  - Búsqueda de texto
  - Ordenamiento por fecha, precio, nombre
  - Skeleton loaders para mejor UX
  - Paginación eficiente
  - Imágenes optimizadas con Next.js Image

- **Detalle de Motocicleta (`/coleccion/[slug]`)**
  - Galería de imágenes interactiva con navegación
  - Información técnica completa (motor, escape, pintura)
  - Precio con visualización en USD y ARS
  - Botones de contacto por WhatsApp
  - Schema markup estructurado (SEO)
  - Breadcrumbs de navegación
  - Compartir en redes sociales

- **Comparador de Motos (`/comparar`)**
  - Selección múltiple de hasta 3 motos
  - Comparación lado a lado de características
  - Comparación de precios
  - Tabla comparativa detallada
  - Responsive design

- **Página "Nosotros" (`/nosotros`)**
  - Historia de la empresa
  - Valores y misión
  - Galería de showroom con Bento Grid layout
  - Información de contacto
  - Schema markup AboutPage

### 🔐 Panel de Administración (`/km-secret-panel-2025`)

- **Dashboard Principal**
  - Métricas clave (ingresos, gastos, margen)
  - Gráficos de ventas mensuales (Recharts)
  - Top motos más consultadas
  - Actividad reciente
  - Widget de cotización Dólar Blue en tiempo real

- **Gestión de Motocicletas**
  - CRUD completo de motos
  - Editor de formulario con validación (React Hook Form + Zod)
  - Multi-upload de imágenes con drag & drop
  - Gestión de orden de imágenes
  - Selección de imagen principal
  - Generación automática de slug SEO-friendly
  - Estados: stock, reservada, vendida, entregada
  - Tracking de precios (compra, venta, gastos)

- **Pipeline de Ventas**
  - Gestión de leads y consultas
  - Seguimiento de estado de negociación
  - Información de clientes potenciales
  - Registro de motocicleta de interés
  - UTM tracking para fuente de leads

- **Gestión de Imágenes**
  - Visualización de todas las imágenes
  - Eliminar imágenes no utilizadas
  - Optimización de almacenamiento

- **Configuración del Sitio**
  - Edición de hero title y subtitle
  - Cambio de video/imagen de fondo
  - Configuración de número de WhatsApp
  - Enlaces de redes sociales

- **Analytics Dashboard**
  - Visualización de Google Analytics 4
  - Métricas de tráfico
  - Conversiones
  - Comportamiento de usuarios

- **Registro de Operaciones**
  - Historial de ventas
  - Cálculo de márgenes de ganancia
  - Permutas registradas
  - Reportes financieros

### 🎨 Características de UX/UI

- **Dark Theme** con paleta de colores bronce (#b87333)
- **Responsive Design** mobile-first
- **Animaciones suaves** con Tailwind CSS y CSS personalizado
- **Loading states** con skeletons
- **Toast notifications** con Sonner
- **Modals y Dialogs** con Radix UI
- **Scroll to Top button**
- **WhatsApp floating button** con animaciones
- **Breadcrumbs** de navegación
- **Image galleries** interactivas
- **Hover effects** y micro-interacciones

---

## 🛠️ Tecnologías Utilizadas

### Core Framework
- **[Next.js 15.5.4](https://nextjs.org/)** - React framework con App Router
- **[React 19.1.0](https://react.dev/)** - Biblioteca de UI
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipado estático

### Styling
- **[Tailwind CSS 4.1.9](https://tailwindcss.com/)** - Utility-first CSS framework
- **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)** - Animaciones CSS
- **[class-variance-authority](https://cva.style/)** - Variantes de componentes
- **[clsx](https://github.com/lukeed/clsx)** - Construcción de classNames
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge de clases Tailwind

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Componentes accesibles headless
  - Dialog, Dropdown, Select, Tabs, Accordion, etc.
- **[Lucide React](https://lucide.dev/)** - Iconos SVG
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications elegantes
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carrusel de imágenes
- **[Recharts](https://recharts.org/)** - Gráficos y visualizaciones
- **[cmdk](https://cmdk.paco.me/)** - Command menu component

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend as a Service
  - PostgreSQL Database
  - Authentication (preparado para futuras funcionalidades)
  - Storage (integrado con S3)
  - Real-time subscriptions (preparado)

### Forms & Validation
- **[React Hook Form 7.60](https://react-hook-form.com/)** - Gestión de formularios
- **[Zod 3.25](https://zod.dev/)** - Schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integración Zod + RHF

### Analytics & SEO
- **[Google Analytics 4](https://analytics.google.com/)** - Analytics web
- **[@vercel/analytics](https://vercel.com/analytics)** - Vercel Analytics
- **Next.js Metadata API** - SEO optimization
- **JSON-LD Schema markup** - Structured data

### Storage
- **[AWS S3](https://aws.amazon.com/s3/)** - Almacenamiento de imágenes y videos
- **[Vercel Blob Storage](https://vercel.com/storage/blob)** - Assets estáticos

### Utilities
- **[date-fns](https://date-fns.org/)** - Manipulación de fechas
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Geist Font](https://vercel.com/font)** - Tipografía moderna de Vercel

### Development Tools
- **[pnpm](https://pnpm.io/)** - Package manager eficiente
- **[PostCSS](https://postcss.org/)** - Procesador CSS
- **[ESLint](https://eslint.org/)** - Linting (configurado pero sin enforcement estricto)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.0.0 (recomendado 20.x LTS)
- **pnpm** >= 8.0.0 (o npm/yarn como alternativa)
- **Git** para control de versiones
- Cuenta de **Supabase** (para la base de datos)
- Cuenta de **AWS S3** (para almacenamiento de media)
- Cuenta de **Vercel** (para deployment - opcional)

---

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

\`\`\`bash
git clone https://github.com/noserickelvatito/Kustom-mania-evo2.git
cd Kustom-mania-evo2
\`\`\`

### 2. Instalar Dependencias

\`\`\`bash
# Usando pnpm (recomendado)
pnpm install

# O usando npm
npm install

# O usando yarn
yarn install
\`\`\`

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

\`\`\`bash
cp .env.example .env.local  # Si existe .env.example
# O crea manualmente .env.local
\`\`\`

Ver la sección [Variables de Entorno](#-variables-de-entorno) para más detalles.

### 4. Configurar Base de Datos Supabase

1. Crea un proyecto en [Supabase](https://supabase.com/)
2. Ejecuta los scripts SQL para crear las tablas (ver [Esquema de Base de Datos](#-esquema-de-base-de-datos))
3. Obtén las credenciales (URL y anon key) del proyecto
4. Configura las variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. Configurar AWS S3

1. Crea un bucket en AWS S3
2. Configura las políticas de acceso público (para imágenes de motos)
3. Obtén las credenciales de acceso (Access Key ID y Secret Access Key)
4. Configura las URLs de los videos de fondo en la configuración del sitio

### 6. Iniciar el Servidor de Desarrollo

\`\`\`bash
pnpm dev
# O
npm run dev
# O
yarn dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔐 Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

\`\`\`env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.kustom-mania.com.ar

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Supabase Service Role Key (solo para operaciones admin)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-FY3VWE3KYB

# WhatsApp (se puede configurar desde el panel admin)
NEXT_PUBLIC_DEFAULT_WHATSAPP=+5493512345678

# AWS S3 (para referencias)
# Las URLs se configuran directamente en Supabase site_config
AWS_S3_BUCKET_URL=https://kusyom-mania.s3.sa-east-1.amazonaws.com

# Optional: Development
NODE_ENV=development
\`\`\`

### Variables Importantes

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL base del sitio para SEO | Sí |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | Sí |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima de Supabase | Sí |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ID de Google Analytics | No |
| `NEXT_PUBLIC_DEFAULT_WHATSAPP` | Número de WhatsApp por defecto | No |

---

## 📁 Estructura del Proyecto

\`\`\`
Kustom-mania-evo2/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raíz con metadata y schemas
│   ├── page.tsx                 # Página de inicio (Home)
│   ├── globals.css              # Estilos globales y custom CSS
│   ├── loading.tsx              # Loading state global
│   │
│   ├── coleccion/               # Catálogo de motocicletas
│   │   ├── page.tsx            # Lista de motos con filtros
│   │   ├── loading.tsx         # Skeleton loader
│   │   └── [slug]/             # Detalle de motocicleta
│   │       ├── page.tsx        # Página de detalle
│   │       └── motorcycle-detail-client.tsx
│   │
│   ├── comparar/                # Comparador de motos
│   │   ├── page.tsx            # Server component wrapper
│   │   ├── comparar-client-page.tsx  # Client component
│   │   └── loading.tsx
│   │
│   ├── nosotros/                # Página "Acerca de"
│   │   ├── page.tsx
│   │   └── loading.tsx
│   │
│   ├── km-secret-panel-2025/   # Panel de Administración
│   │   ├── layout.tsx          # Layout del admin
│   │   ├── page.tsx            # Dashboard principal
│   │   ├── motorcycles/        # Gestión de motos
│   │   │   ├── page.tsx        # Lista de motos
│   │   │   ├── new/            # Crear moto
│   │   │   └── [id]/edit/      # Editar moto
│   │   ├── pipeline/           # Pipeline de ventas
│   │   │   └── page.tsx
│   │   ├── images/             # Gestión de imágenes
│   │   │   └── page.tsx
│   │   ├── config/             # Configuración del sitio
│   │   │   └── page.tsx
│   │   ├── analytics/          # Dashboard de analytics
│   │   │   └── page.tsx
│   │   └── operations/         # Registro de operaciones
│   │       └── page.tsx
│   │
│   ├── robots.ts               # Robots.txt dinámico
│   └── sitemap.ts              # Sitemap XML dinámico
│
├── components/                  # Componentes React
│   ├── ui/                     # Componentes UI base (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── toast.tsx
│   │   └── ... (30+ componentes)
│   │
│   ├── admin/                  # Componentes del admin
│   │   ├── motorcycle-form.tsx
│   │   ├── multi-image-uploader.tsx
│   │   ├── dashboard-charts.tsx
│   │   ├── sales-pipeline.tsx
│   │   └── ...
│   │
│   ├── header.tsx              # Header principal
│   ├── footer.tsx              # Footer con links y socials
│   ├── mobile-nav.tsx          # Navegación móvil
│   ├── conditional-nav.tsx     # Nav condicional según ruta
│   ├── image-gallery.tsx       # Galería de imágenes
│   ├── faq-section.tsx         # Sección de FAQs
│   ├── whatsapp-button.tsx     # Botón flotante WhatsApp
│   ├── scroll-to-top.tsx       # Botón scroll to top
│   ├── breadcrumbs.tsx         # Breadcrumbs de navegación
│   └── theme-provider.tsx      # Provider de tema
│
├── lib/                         # Utilidades y configuración
│   ├── supabase/               # Configuración Supabase
│   │   ├── client.ts           # Cliente para componentes cliente
│   │   └── server.ts           # Cliente para server components
│   ├── types.ts                # TypeScript types e interfaces
│   ├── utils.ts                # Funciones utilitarias
│   ├── constants.ts            # Constantes de la app
│   └── analytics.ts            # Helpers de Google Analytics
│
├── hooks/                       # React Custom Hooks
│   └── ...                     # Hooks personalizados
│
├── public/                      # Assets estáticos
│   ├── images/                 # Imágenes del sitio
│   ├── logo.png                # Logo de Kustom Mania
│   ├── favicon.ico             # Favicon
│   ├── manifest.json           # PWA manifest
│   ├── og-image.jpg            # OpenGraph image
│   └── robots.txt              # Robots.txt estático
│
├── styles/                      # Estilos adicionales
│   └── ...                     # CSS modules o adicionales
│
├── scripts/                     # Scripts de utilidad
│   └── ...                     # Scripts de deployment, etc.
│
├── docs/                        # Documentación
│   ├── GOOGLE-ANALYTICS-4.md   # Guía de GA4
│   ├── ANALÍTICAS-GA4-ES.md    # Guía de analytics en español
│   └── IMPLEMENTATION-SUMMARY.md
│
├── .gitignore                   # Git ignore rules
├── components.json              # Configuración de shadcn/ui
├── next.config.mjs              # Configuración de Next.js
├── package.json                 # Dependencias del proyecto
├── pnpm-lock.yaml              # Lock file de pnpm
├── postcss.config.mjs          # Configuración de PostCSS
├── tsconfig.json               # Configuración de TypeScript
└── README.md                    # Este archivo
\`\`\`

---

## 💻 Desarrollo Local

### Comandos de Desarrollo

\`\`\`bash
# Iniciar servidor de desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Iniciar servidor de producción local
pnpm start

# Ejecutar linting (configurado pero no estricto)
pnpm lint
\`\`\`

### Hot Module Replacement (HMR)

Next.js incluye HMR automático. Los cambios en el código se reflejarán instantáneamente en el navegador sin necesidad de recargar la página.

### Debugging

Para debugging con VS Code, crea `.vscode/launch.json`:

\`\`\`json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "pnpm dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
\`\`\`

---

## 🔐 Panel de Administración

### Acceso al Panel

URL: `https://www.kustom-mania.com.ar/km-secret-panel-2025`

> **Nota de Seguridad**: Actualmente el panel no tiene autenticación implementada. Se recomienda:
> - Usar una URL no predecible (como la actual)
> - Implementar autenticación con Supabase Auth
> - Restringir acceso por IP en Vercel
> - Usar middleware de Next.js para protección adicional

### Funcionalidades del Panel

#### 1. Dashboard Principal (`/`)
- Vista general de métricas de negocio
- Gráficos de ventas con Recharts
- Top motos más consultadas
- Actividad reciente
- Cotización del Dólar Blue en tiempo real

#### 2. Gestión de Motocicletas (`/motorcycles`)
- **Listar**: Visualizar todas las motos con estados
- **Crear**: Formulario completo con validación
- **Editar**: Modificar información y gestionar imágenes
- **Eliminar**: Soft delete con confirmación
- **Multi-upload**: Subir múltiples imágenes
- **Reordenar**: Drag & drop para orden de imágenes

#### 3. Pipeline de Ventas (`/pipeline`)
- Gestión de leads y consultas
- Estados: Nuevo, En Negociación, Ganado, Perdido
- Información de contacto de clientes
- Seguimiento de motos de interés
- Filtrado y búsqueda

#### 4. Gestión de Imágenes (`/images`)
- Ver todas las imágenes del sistema
- Identificar imágenes huérfanas
- Eliminar imágenes no utilizadas
- Optimización de almacenamiento

#### 5. Configuración (`/config`)
- Editar textos del Hero
- Cambiar video/imagen de fondo
- Configurar WhatsApp
- Enlaces de redes sociales
- Otros ajustes del sitio

#### 6. Analytics (`/analytics`)
- Visualización de Google Analytics 4
- Métricas de tráfico
- Páginas más visitadas
- Fuentes de tráfico
- Conversiones

#### 7. Operaciones (`/operations`)
- Registro de todas las ventas
- Cálculo de márgenes
- Permutas realizadas
- Gastos asociados
- Reportes financieros

---

## 🗄️ Esquema de Base de Datos

### Tablas Principales

#### `motorcycles`
\`\`\`sql
CREATE TABLE motorcycles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  engine TEXT,
  exhaust TEXT,
  paint TEXT,
  modifications TEXT,
  price NUMERIC NOT NULL,
  price_usd NUMERIC,
  offer_percentage NUMERIC,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  brand TEXT,
  motorcycle_type TEXT,
  year INTEGER,
  purchase_price NUMERIC,
  sale_price NUMERIC,
  expenses NUMERIC,
  purchase_date TIMESTAMP,
  sale_date TIMESTAMP,
  status TEXT DEFAULT 'stock', -- 'stock', 'reserved', 'sold', 'delivered'
  notes TEXT,
  trade_in_motorcycle_id UUID REFERENCES motorcycles(id),
  trade_in_value NUMERIC,
  cash_payment NUMERIC,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### `motorcycle_images`
\`\`\`sql
CREATE TABLE motorcycle_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  motorcycle_id UUID REFERENCES motorcycles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### `leads`
\`\`\`sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  dni TEXT,
  consultation_reason TEXT,
  interest_area TEXT,
  specific_question TEXT,
  location TEXT,
  motorcycle_id UUID REFERENCES motorcycles(id),
  motorcycle_name TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'negotiating', 'won', 'lost'
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### `site_config`
\`\`\`sql
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  whatsapp_number TEXT,
  hero_title TEXT DEFAULT 'KUSTOM MANIA',
  hero_subtitle TEXT DEFAULT 'PASIÓN POR LAS DOS RUEDAS',
  hero_description TEXT DEFAULT 'Donde la personalidad se encuentra con el asfalto.',
  hero_button_text TEXT DEFAULT 'EXPLORAR LA COLECCIÓN',
  hero_background_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### `operations`
\`\`\`sql
CREATE TABLE operations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  motorcycle_id UUID REFERENCES motorcycles(id),
  operation_type TEXT, -- 'sale', 'trade_in', 'expense'
  amount NUMERIC,
  description TEXT,
  operation_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Índices Recomendados

\`\`\`sql
-- Mejorar búsquedas por slug
CREATE INDEX idx_motorcycles_slug ON motorcycles(slug);

-- Optimizar queries por estado
CREATE INDEX idx_motorcycles_status ON motorcycles(status);

-- Ordenamiento por fecha
CREATE INDEX idx_motorcycles_created_at ON motorcycles(created_at DESC);

-- Búsqueda de imágenes por moto
CREATE INDEX idx_images_motorcycle_id ON motorcycle_images(motorcycle_id);

-- Ordenamiento de imágenes
CREATE INDEX idx_images_display_order ON motorcycle_images(display_order);

-- Leads por estado
CREATE INDEX idx_leads_status ON leads(status);
\`\`\`

### Row Level Security (RLS)

Para configurar políticas de seguridad en Supabase:

\`\`\`sql
-- Habilitar RLS
ALTER TABLE motorcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycle_images ENABLE ROW LEVEL SECURITY;

-- Política de lectura pública
CREATE POLICY "Public read access" ON motorcycles
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON motorcycle_images
  FOR SELECT USING (true);

-- Políticas de escritura (autenticación requerida - futuro)
CREATE POLICY "Authenticated write access" ON motorcycles
  FOR ALL USING (auth.role() = 'authenticated');
\`\`\`

---

## 📈 SEO y Analytics

### SEO Optimization

#### Metadata API de Next.js

Cada página incluye metadata optimizada:

\`\`\`typescript
export const metadata: Metadata = {
  title: "Kustom Mania | Motos Custom Córdoba",
  description: "Líderes en compra venta de motos custom...",
  keywords: ["kustom mania", "motos custom", "Harley Davidson"],
  openGraph: {
    title: "...",
    description: "...",
    images: [{ url: "/og-image.jpg" }]
  }
}
\`\`\`

#### Structured Data (JSON-LD)

El sitio implementa varios tipos de schema markup:

- **Organization Schema**: Información de la empresa
- **Product Schema**: Cada motocicleta
- **BreadcrumbList**: Navegación
- **WebSite**: Configuración del sitio
- **AboutPage**: Página "Nosotros"

#### Sitemap y Robots

- **Sitemap dinámico** (`/sitemap.xml`): Generado automáticamente con todas las motos
- **Robots.txt** (`/robots.txt`): Configurado para permitir crawling

### Google Analytics 4

#### Implementación

El sitio usa Google Analytics 4 con el ID: `G-FY3VWE3KYB`

\`\`\`typescript
// Implementado en app/layout.tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FY3VWE3KYB"></script>
\`\`\`

#### Eventos Trackeados

- Page views (automático)
- Click en botones de WhatsApp
- Visualización de motos
- Uso del comparador
- Navegación entre secciones

Para más detalles, consulta:
- [docs/GOOGLE-ANALYTICS-4.md](./docs/GOOGLE-ANALYTICS-4.md)
- [docs/ANALÍTICAS-GA4-ES.md](./docs/ANALÍTICAS-GA4-ES.md)

### Vercel Analytics

Integrado con `@vercel/analytics` para métricas adicionales de rendimiento y Web Vitals.

---

## 🚀 Deployment

### Deployment en Vercel (Recomendado)

1. **Conectar Repositorio**
   - Conecta tu repositorio de GitHub a Vercel
   - Vercel detectará automáticamente Next.js

2. **Configurar Variables de Entorno**
   - En el dashboard de Vercel, ve a Settings → Environment Variables
   - Agrega todas las variables del archivo `.env.local`

3. **Build Settings**
   - Framework Preset: `Next.js`
   - Build Command: `pnpm build` (o `npm run build`)
   - Output Directory: `.next`

4. **Deploy**
   - Cada push a `main` desplegará automáticamente
   - Pull requests crean preview deployments

### Configuración de Dominio

1. En Vercel, ve a Settings → Domains
2. Agrega `www.kustom-mania.com.ar`
3. Configura los DNS según las instrucciones de Vercel
4. Vercel generará automáticamente certificados SSL

### Variables de Producción

\`\`\`env
# Production - Vercel Environment Variables
NEXT_PUBLIC_SITE_URL=https://www.kustom-mania.com.ar
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-FY3VWE3KYB
\`\`\`

### Continuous Deployment

El proyecto usa GitHub Actions para CI/CD:

- **Automatic deployments** en cada push a `main`
- **Preview deployments** para pull requests
- **Production deployments** automáticos con Vercel

---

## 📜 Scripts Disponibles

\`\`\`json
{
  "dev": "next dev",           // Inicia el servidor de desarrollo
  "build": "next build",       // Compila la aplicación para producción
  "start": "next start",       // Inicia el servidor de producción
  "lint": "next lint"          // Ejecuta el linter de Next.js
}
\`\`\`

### Comandos Útiles

\`\`\`bash
# Desarrollo
pnpm dev          # Puerto 3000 por defecto

# Build de producción
pnpm build        # Crea optimized build

# Verificar build localmente
pnpm build && pnpm start

# Linting
pnpm lint

# Actualizar dependencias
pnpm update

# Instalar nueva dependencia
pnpm add <package-name>

# Instalar dev dependency
pnpm add -D <package-name>
\`\`\`

---

## 🏗️ Arquitectura y Decisiones Técnicas

### App Router de Next.js 15

Se utiliza el **App Router** moderno de Next.js con:

- **Server Components** por defecto para mejor performance
- **Client Components** (`'use client'`) solo cuando es necesario
- **Layouts** anidados para compartir UI
- **Loading states** con `loading.tsx`
- **Error boundaries** con `error.tsx`

### Server-Side Rendering (SSR) y Static Generation

- **Home y páginas estáticas**: ISR con revalidación
- **Listado de motos**: SSR con cache de 5 minutos (`revalidate: 300`)
- **Detalle de moto**: SSR con cache por slug
- **Panel admin**: Client-side rendering

### Gestión de Estado

- **Server State**: Supabase queries directas
- **Client State**: React hooks (`useState`, `useEffect`)
- **Form State**: React Hook Form
- **URL State**: useSearchParams, useRouter

### Optimización de Imágenes

- Next.js `<Image>` component para optimización automática
- Lazy loading por defecto
- Responsive images con `sizes`
- WebP y AVIF con fallback a JPEG/PNG

### Estrategia de Caché

\`\`\`typescript
// Ejemplo en page.tsx
export const revalidate = 300 // 5 minutos

// O dinámico
fetch(url, { next: { revalidate: 3600 } })
\`\`\`

### Accesibilidad (A11y)

- Semantic HTML
- ARIA labels donde sea necesario
- Keyboard navigation
- Focus management
- Screen reader friendly
- Contraste de colores WCAG AA compliant

### Performance

- **Lighthouse Score**: 90+ en todas las métricas
- **Core Web Vitals**: Optimizado
- **Code splitting**: Automático por ruta
- **Bundle size**: Optimizado con tree shaking

---

## 🤝 Contribuir

### Flujo de Trabajo

1. **Fork** el repositorio
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Convenciones de Código

- **TypeScript**: Usa tipos estrictos
- **Naming**: camelCase para variables, PascalCase para componentes
- **Components**: Un componente por archivo
- **Imports**: Ordenados (React → Next.js → Third-party → Local)
- **CSS**: Tailwind classes, evitar CSS inline cuando sea posible

### Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

\`\`\`
feat: add motorcycle comparison feature
fix: resolve image loading issue
docs: update README with deployment info
style: format code with prettier
refactor: simplify database queries
test: add unit tests for utils
chore: update dependencies
\`\`\`

---

## 📄 Licencia

Este proyecto es privado y pertenece a **Kustom Mania**. Todos los derechos reservados.

Para uso comercial o redistribución, contacta a los propietarios.

---

## 📞 Contacto

**Kustom Mania**
- 🌐 Website: [https://www.kustom-mania.com.ar](https://www.kustom-mania.com.ar)
- 📱 Instagram: [@kustomania_cba](https://www.instagram.com/kustomania_cba/)
- 📘 Facebook: [Kustom Mania](https://www.facebook.com/kustommania)
- 💬 WhatsApp: [Consultar](https://wa.me/5493512345678)
- 📍 Ubicación: Córdoba, Argentina

**Desarrollador / Maintainer**
- GitHub: [@noserickelvatito](https://github.com/noserickelvatito)

---

## 🙏 Agradecimientos

- **[Vercel](https://vercel.com/)** - Hosting y deployment
- **[Supabase](https://supabase.com/)** - Backend as a Service
- **[v0.dev](https://v0.dev/)** - Diseño inicial y componentes
- **[shadcn/ui](https://ui.shadcn.com/)** - Sistema de componentes
- **Comunidad de Next.js** - Documentación y soporte

---

## 📚 Recursos Adicionales

### Documentación Relacionada

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Guides](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

### Guías Específicas del Proyecto

- [GA4 Quick Start](./GA4-QUICK-START.md)
- [Google Analytics 4 Guide](./docs/GOOGLE-ANALYTICS-4.md)
- [Analíticas GA4 (Español)](./docs/ANALÍTICAS-GA4-ES.md)
- [Implementation Summary](./docs/IMPLEMENTATION-SUMMARY.md)

---

<div align="center">

**🏍️ Hecho con pasión en Córdoba, Argentina 🇦🇷**

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Powered by Supabase](https://img.shields.io/badge/Powered%20by-Supabase-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>
