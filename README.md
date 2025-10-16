
# 🪙 WASI: Billetera Digital Comunitaria

![WASI Logo](public/placeholder-logo.svg)

## 🌟 Visión General

WASI es una innovadora aplicación de billetera digital diseñada para fortalecer las economías locales y fomentar la conexión comunitaria. Inspirada en la riqueza cultural, la aplicación busca ser un puente entre la tecnología financiera moderna y las tradiciones, ofreciendo herramientas accesibles y relevantes para todos los miembros de la comunidad.

---

## ✨ Características Principales

El proyecto cuenta con una arquitectura modular que permite integrar diversas funcionalidades. A continuación se describen las más destacadas:

-   **🏠 Panel Principal (`Wallet-Dashboard`):** Visualiza tu balance, últimas transacciones y accesos directos a las funciones más importantes.
-   **💸 Enviar y Recibir Pagos (`Send-Transaction` / `Receive-Payment`):** Realiza y recibe pagos de forma instantánea y segura, utilizando códigos QR para facilitar las transacciones.
-   **📊 Historial de Transacciones (`Transaction-History`):** Lleva un registro detallado de todos tus movimientos financieros.
-   **🏦 Módulo de Préstamos (`Loans-Module`):** Accede a opciones de micro-créditos o préstamos comunitarios.
-   **🛍️ Mercado Local (`Local-Marketplace`):** Descubre y apoya a los negocios y emprendedores de tu comunidad.
-   **🎓 Módulo Educativo (`Education-Module`):** Aprende sobre finanzas y mejora tu salud económica con recursos interactivos.
-   **🤝 Líderes Comunitarios (`Community-Leaders`):** Conecta con los líderes y organizadores de tu comunidad.
-   **🗣️ Navegación por Voz y Selección de Idioma (`Voice-Navigation` / `Language-Selector`):** Aumenta la accesibilidad permitiendo controlar la app con la voz y seleccionando idiomas nativos.
-   **🌐 Modo Offline (`Offline-Mode`):** Realiza transacciones básicas incluso sin conexión a internet, sincronizando los datos una vez que se restablece la conexión.
-   ** ceremonial (`Payment-Ceremonies`):** Integra elementos culturales en las transacciones, dándoles un significado más profundo.

---

## 🛠️ Pila Tecnológica

WASI está construido con un conjunto de tecnologías modernas, robustas y escalables, seleccionadas para ofrecer la mejor experiencia de usuario.

-   **Framework Principal:** Next.js
-   **Lenguaje:** TypeScript
-   **Estilos:** Tailwind CSS
-   **Componentes UI:** Shadcn UI / Radix UI
-   **Gestión de Formularios:** React Hook Form
-   **Esquemas y Validaciones:** Zod
-   **Visualización de Datos:** Recharts

---

## 🚀 Cómo Empezar

Para poner en marcha el proyecto en tu entorno local, sigue estos sencillos pasos.

1.  **Clonar el Repositorio:** Descarga una copia del proyecto en tu máquina.
2.  **Instalar Dependencias:** Abre una terminal en la raíz del proyecto y ejecuta el comando para instalar todos los paquetes necesarios. Se recomienda usar `pnpm`.
3.  **Ejecutar el Servidor de Desarrollo:** Una vez instaladas las dependencias, inicia la aplicación en modo de desarrollo.
4.  **Abrir en el Navegador:** Accede a la dirección local que se muestra en la terminal (generalmente `http://localhost:3000`) para ver la aplicación en funcionamiento.

---

## 📁 Estructura del Proyecto

El código fuente está organizado de manera intuitiva para facilitar el desarrollo y mantenimiento.

-   **/app:** Contiene las rutas principales, el layout global y los estilos globales de la aplicación.
-   **/components:** Alberga todos los componentes reutilizables de React.
    -   **/ui:** Componentes de bajo nivel (botones, inputs, tarjetas) proporcionados por Shadcn UI.
    -   **Componentes de Funcionalidad:** Módulos específicos de la aplicación como `Wallet-Dashboard.tsx` o `Loans-Module.tsx`.
-   **/hooks:** Hooks personalizados de React para encapsular lógica y estado.
-   **/lib:** Utilidades, configuraciones y lógica de soporte, como la internacionalización (`i18n`) y la conexión con Metamask.
-   **/public:** Almacena todos los activos estáticos como imágenes, logos e iconos.
-   **/styles:** Archivos de estilos globales.

