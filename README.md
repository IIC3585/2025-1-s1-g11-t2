# Procesador de Imágenes PWA con WASM

Este proyecto implementa una aplicación web progresiva (PWA) que permite el procesamiento de imágenes utilizando WebAssembly (WASM) para operaciones intensivas de cómputo. La aplicación aprovecha las capacidades modernas de los navegadores para ofrecer una experiencia similar a una aplicación nativa.

## 📁 Estructura del Proyecto

```
.
├── src/                    # Código fuente principal
│   ├── rust-wasm/         # Código Rust para WASM
│   │   ├── src/           # Código fuente Rust
│   │   ├── Cargo.toml     # Configuración de Rust
│   │   └── pkg/           # Módulos WASM compilados
│   └── index.js           # Punto de entrada de la aplicación
├── public/                 # Archivos estáticos
│   └── icons/             # Íconos para la PWA
│       ├── icon-192x192.svg  # Ícono principal (formato SVG)
│       └── badge-72x72.svg   # Badge para notificaciones (formato SVG)
├── service-worker.js      # Service Worker para funcionamiento offline
├── index.html             # Archivo HTML principal
├── manifest.json          # Configuración de la PWA
├── vite.config.ts         # Configuración de Vite
└── package.json           # Dependencias y scripts
```

## 🛠️ Componentes Principales

### 1. Módulo WASM (src/rust-wasm/)
- **Responsabilidad**: Procesamiento intensivo de imágenes
- **Funcionalidades**:
  - Conversión a escala de grises (`process_image`)
  - Aplicación de filtro sepia (`apply_sepia`)
  - Inversión de colores (`invert_colors`)
  - Ajuste de brillo (`adjust_brightness`)
- **Tecnologías**: Rust, WebAssembly

### 2. Interfaz de Usuario (src/index.js)
- **Responsabilidad**: Gestión de la interfaz y eventos
- **Funcionalidades**:
  - Carga de imágenes desde el dispositivo
  - Visualización en canvas
  - Control de filtros mediante botones
  - Control de brillo mediante slider
  - Sistema de notificaciones
- **Tecnologías**: JavaScript vanilla, Canvas API

### 3. Service Worker (service-worker.js)
- **Responsabilidad**: Funcionamiento offline
- **Funcionalidades**:
  - Cache de recursos estáticos
  - Manejo de notificaciones push
  - Respuesta a eventos de notificación
  - Funcionamiento sin conexión
- **Tecnologías**: Service Workers API, Cache API

### 4. Configuración PWA (manifest.json)
- **Responsabilidad**: Configuración de la aplicación web progresiva
- **Funcionalidades**:
  - Definición de íconos en múltiples tamaños
  - Configuración de tema y colores
  - Modo de visualización standalone
  - Configuración para Firebase Cloud Messaging
- **Tecnologías**: Web App Manifest

## 🚀 Características Implementadas

### Procesamiento de Imágenes con WASM
- **Subida de imágenes**: Carga de imágenes desde el dispositivo local
- **Filtros disponibles**:
  - Escala de grises: Convierte la imagen a tonos de gris
  - Sepia: Aplica un tono cálido vintage a la imagen
  - Inversión de colores: Invierte todos los colores de la imagen
  - Ajuste de brillo: Control deslizante para ajustar el brillo de 0 a 2x
- **Visualización en tiempo real**: Los resultados se muestran inmediatamente en el canvas

### Funcionalidades PWA Implementadas
- **Notificaciones**:
  - Notificaciones locales: Al cargar imágenes y aplicar filtros
  - Notificaciones push: Configuración con Firebase Cloud Messaging
  - Personalización de iconos: Uso de SVG para mejor calidad
- **Funcionamiento Offline**:
  - Service Worker que cachea recursos esenciales
  - Funcionamiento sin conexión una vez cargada la aplicación
- **Personalización de la App**:
  - Tema verde (#4CAF50) definido en manifest.json
  - Íconos SVG escalables para diferentes dispositivos
  - Modo standalone para experiencia tipo aplicación nativa

## 🛠️ Tecnologías Utilizadas

- **Frontend**: 
  - JavaScript vanilla
  - HTML5 Canvas para renderizado
  - CSS3 para estilos
- **WebAssembly**: 
  - Implementado en Rust
  - Compilado con wasm-pack
- **PWA**: 
  - Service Workers para caché y offline
  - Web App Manifest para instalación
  - Notificaciones con la Notifications API
  - Firebase Cloud Messaging (configuración básica)
- **Almacenamiento**: Cache API para recursos offline

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 14 o superior)
2. **Rust** (instalado a través de rustup)
3. **wasm-pack**

## 🔧 Instalación

### 1. Instalar Rust y wasm-pack

```bash
# Instalar Rust usando rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Cargar el nuevo PATH
source $HOME/.cargo/env

# Instalar el target wasm32-unknown-unknown
rustup target add wasm32-unknown-unknown

# Instalar wasm-pack
cargo install wasm-pack

# Agregar wasm-bindgen al PATH (si es necesario)
# La ruta puede variar según la instalación
echo 'export PATH=$PATH:$HOME/.cache/.wasm-pack/.wasm-bindgen-cargo-install-0.2.*/bin' >> ~/.bashrc
source ~/.bashrc
```

### 2. Clonar y configurar el proyecto

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Navegar al directorio del proyecto
cd [NOMBRE_DEL_PROYECTO]

# Instalar dependencias de Node.js
npm install

# Compilar el módulo WASM
cd src/rust-wasm
wasm-pack build --target web
cd ../..
```

### 3. Iniciar la aplicación

```bash
# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🌐 Uso

1. Abre la aplicación en tu navegador
2. Sube una imagen desde tu dispositivo usando el botón de selección de archivo
3. Selecciona uno de los filtros disponibles:
   - Escala de grises
   - Sepia
   - Inversión de colores
   - Ajusta el brillo con el control deslizante
4. La imagen procesada se mostrará automáticamente en el canvas
5. Recibirás notificaciones sobre el estado del procesamiento

## 🔍 Solución de Problemas

### Error: "Failed to resolve import"
Si encuentras el error `[plugin:vite:import-analysis] Failed to resolve import "./rust-wasm/pkg/rust_wasm.js"`, asegúrate de:

1. Haber compilado correctamente el módulo WASM:
```bash
cd src/rust-wasm
wasm-pack build --target web
```

2. Verificar que el archivo `rust_wasm.js` existe en `src/rust-wasm/pkg/`

### Error: "wasm-pack: command not found"
Si wasm-pack no está instalado correctamente:
```bash
cargo install wasm-pack
source $HOME/.cargo/env
```

### Error: Íconos no encontrados
Si hay errores relacionados con íconos no encontrados:
1. Asegúrate de que los íconos SVG estén en la carpeta `public/icons/`
2. Verifica que las rutas en index.js y service-worker.js sean correctas

## 📱 Compatibilidad

La aplicación está diseñada para funcionar en navegadores modernos que soporten:
- WebAssembly
- Service Workers
- Notificaciones Push
- Canvas API

## Referencias

Este proyecto fue documentado y desarrollado con la ayuda de ChatGPT para estructurar el contenido, refinar las explicaciones y mejorar la claridad.

## Autores

Manuel Espinoza
Pedro del Río