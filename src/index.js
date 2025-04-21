// Importa el módulo WASM 
import init, { process_image, apply_sepia, adjust_brightness, invert_colors } from './rust-wasm/pkg/rust_wasm.js';

// Inicializa el módulo WASM
async function run() {
  await init();

  const upload = document.getElementById("upload");
  const grayscaleButton = document.getElementById("grayscale");
  const sepiaButton = document.getElementById("sepia");
  const invertButton = document.getElementById("invert");
  const brightnessSlider = document.getElementById("brightness");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let imageData;

  // Solicitar permiso para notificaciones
  async function requestNotificationPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Permiso para notificaciones concedido');
        return true;
      } else {
        console.log('Permiso para notificaciones denegado');
        return false;
      }
    } catch (error) {
      console.error('Error al solicitar permiso para notificaciones:', error);
      return false;
    }
  }

  // Mostrar notificación
  async function showNotification(title, body) {
    if (!('Notification' in window)) {
      console.log('Este navegador no soporta notificaciones');
      return;
    }

    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      registration.showNotification(title, {
        body: body,
        icon: '/icons/icon-192x192.svg',
        badge: '/icons/badge-72x72.svg',
        vibrate: [100, 50, 100]
      });
    } catch (error) {
      console.error('Error al mostrar notificación:', error);
    }
  }

  // Cargar imagen y dibujar en canvas
  upload.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        imageData = ctx.getImageData(0, 0, img.width, img.height);
        console.log("Imagen cargada:", img.width, "x", img.height);
        showNotification('Imagen cargada', 'La imagen se ha cargado correctamente');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

  // Función para procesar la imagen con un filtro específico
  async function applyFilter(filterFunction, ...args) {
    if (!imageData) {
      alert("Por favor, primero sube una imagen");
      return;
    }

    try {
      // Obtener los datos de píxeles como Uint8Array
      const pixelData = new Uint8Array(imageData.data.buffer);
      console.log("Procesando imagen con", pixelData.length, "bytes");

      // Procesar la imagen
      const processedData = filterFunction(pixelData, ...args);
      console.log("Imagen procesada exitosamente");

      // Crear un nuevo ImageData con los datos procesados
      const processedImageData = new ImageData(
        new Uint8ClampedArray(processedData),
        imageData.width,
        imageData.height
      );

      // Dibujar la imagen procesada en el canvas
      ctx.putImageData(processedImageData, 0, 0);

      // Mostrar notificación de éxito
      const filterName = filterFunction === process_image ? 'escala de grises' :
                        filterFunction === apply_sepia ? 'sepia' :
                        filterFunction === invert_colors ? 'inversión de colores' :
                        'brillo';
      await showNotification('Filtro aplicado', `Se ha aplicado el filtro de ${filterName} correctamente`);
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
      alert("Ocurrió un error al procesar la imagen");
    }
  }

  // Procesar imagen al pulsar el botón de escala de grises
  grayscaleButton.addEventListener("click", () => {
    applyFilter(process_image);
  });

  // Procesar imagen al pulsar el botón de sepia
  sepiaButton.addEventListener("click", () => {
    applyFilter(apply_sepia);
  });

  // Procesar imagen al pulsar el botón de inversión de colores
  invertButton.addEventListener("click", () => {
    applyFilter(invert_colors);
  });

  // Ajustar brillo cuando se mueve el slider
  brightnessSlider.addEventListener("input", () => {
    const factor = parseFloat(brightnessSlider.value);
    applyFilter(adjust_brightness, factor);
  });
}

// Registro del service worker para funcionamiento offline
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(registration => {
        console.log("Service Worker registrado: ", registration);
      })
      .catch(error => {
        console.error("Error registrando el Service Worker: ", error);
      });
  });
}

run();

//
// Integración básica de Firebase Cloud Messaging para notificaciones
//
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getMessaging, getToken } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js';

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

const appFirebase = initializeApp(firebaseConfig);
const messaging = getMessaging(appFirebase);

getToken(messaging, { vapidKey: "TU_VAPID_KEY" })
  .then((currentToken) => {
    if (currentToken) {
      console.log("Token de mensajería: ", currentToken);
      // Aquí podrías enviar el token a tu servidor para gestionar las notificaciones
    } else {
      console.log("No se pudo obtener el token");
    }
  }).catch((err) => {
    console.error("Error al obtener token: ", err);
  });