# Abasa — Plataforma de Suministros Industriales

**Abasa** es un proyecto desarrollado con **[Astro](https://astro.build)**, **React**, y **Tailwind CSS**, que implementa **SSR (Server-Side Rendering)** para ofrecer una web rápida, moderna y optimizada para SEO.

El sitio muestra información de la empresa *Abastecedora Industrial ABASA*, junto con un catálogo dinámico como ejemplo de productos industriales y de ferretería, con búsqueda, filtros y página de detalle por producto.

---

## **Tecnologías principales**

| Herramienta | Uso |
|--------------|-----|
| ⚡ [Astro](https://astro.build) | Framework base con SSR habilitado |
| ⚛️ [React](https://react.dev) | Componentes interactivos (búsqueda y filtros) |
| 🎨 [Tailwind CSS v4](https://tailwindcss.com) | Maquetación moderna y responsive |
| 🗄️ JSON local | Fuente de datos del servidor |
| 🌐 Node Adapter | Adaptador para ejecutar SSR con Node.js |

---

## 🏗️ **Estructura del proyecto**
abasa/
├─ public/
│ ├─ images/
│ │ ├─ og-image.jpg
│ │ └─ productos/...
│ └─ favicon.svg
├─ src/
│ ├─ components/
│ │ └─ TestReact.jsx
│ ├─ data/
│ │ └─ items.json
│ ├─ pages/
│ │ ├─ index.astro
│ │ └─ item/[slug].astro
│ └─ styles/
│ └─ global.css
├─ astro.config.mjs
├─ package.json
└─ README.md

---

## **Instalación y ejecución**

1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/abasa.git
cd abasa

2️⃣ Instalar dependencias
npm install

3️⃣ Modo desarrollo
npm run dev

(Abre http://localhost:4321 para ver el sitio en vivo.)

4️⃣ Build de producción
npm run build
npm run preview

---
Características principales

✅ SSR habilitado: los datos del JSON se cargan desde el servidor, optimizando SEO y rendimiento.
✅ Diseño responsive: desarrollado completamente con Tailwind CSS.
✅ Búsqueda y filtros dinámicos: implementados en React.
✅ Rutas dinámicas: cada producto tiene su propia página /item/[slug].
✅ Metadatos dinámicos: títulos y descripciones generadas automáticamente para SEO y redes sociales.
✅ Paleta personalizada: tonos de rojo corporativo en lugar de azules.
✅ Diseño limpio y profesional: layout centrado, header sticky, footer informativo.

------
SEO y Metadatos

El proyecto incluye metadatos completos:

<title> y <meta description> dinámicos


Schema.org (JSON-LD para buscadores)

Imagen de vista previa (og-image.jpg)

Esto permite que cada producto se comparta correctamente en redes sociales y mejore su posicionamiento en buscadores.

---
Optimización visual

La UI utiliza componentes reutilizables y una paleta cálida basada en tonos rojo vino / gris neutro, garantizando contraste y jerarquía visual.

/* Ejemplo de clases Tailwind */
text-red-700 bg-gray-50 rounded-xl shadow-md hover:bg-red-800 transition

💡 Autor

👨‍💻 Mario Alberto Arroyo
Frontend Developer — México
🌐 https://www.linkedin.com/in/mario-alberto-arroyo-utrera-690876299/

-----

📦 Licencia

Este proyecto se entrega como demostración técnica y no está destinado a uso comercial directo.
© {new Date().getFullYear()} Abastecedora Industrial ABASA.


