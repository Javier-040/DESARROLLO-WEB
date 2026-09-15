'use strict';

/* ===== Menú móvil ===== */
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('mostrar');
    const icono = navToggle.querySelector('i');
    icono.classList.toggle('fa-bars');
    icono.classList.toggle('fa-times');
  });
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav__link').forEach((enlace) => {
  enlace.addEventListener('click', () => {
    navMenu.classList.remove('mostrar');
    const icono = navToggle.querySelector('i');
    icono.classList.add('fa-bars');
    icono.classList.remove('fa-times');
  });
});

/* ===== Efecto typewriter ===== */
const palabras = ['Desarrollador Web', 'Diseñador Frontend', 'Freelancer', 'Creativo'];
const elementoTypewriter = document.getElementById('typewriter');

let indicePalabra = 0;
let indiceLetra = 0;
let borrando = false;

function escribir() {
  const palabraActual = palabras[indicePalabra];

  if (!borrando) {
    elementoTypewriter.textContent = palabraActual.slice(0, ++indiceLetra);
    if (indiceLetra === palabraActual.length) {
      borrando = true;
      setTimeout(escribir, 1800);
      return;
    }
    setTimeout(escribir, 120);
  } else {
    elementoTypewriter.textContent = palabraActual.slice(0, --indiceLetra);
    if (indiceLetra === 0) {
      borrando = false;
      indicePalabra = (indicePalabra + 1) % palabras.length;
    }
    setTimeout(escribir, 60);
  }
}

if (elementoTypewriter) {
  escribir();
}

/* ===== Header con scroll ===== */
const header = document.getElementById('header');

function cambiarHeader() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', cambiarHeader);

/* ===== Enlaces activos según la sección ===== */
const secciones = document.querySelectorAll('section');
const enlacesNav = document.querySelectorAll('.nav__link');

function resaltarEnlaceActivo() {
  let posicionActual = window.scrollY + 100;

  secciones.forEach((seccion) => {
    const top = seccion.offsetTop;
    const fondo = seccion.offsetTop + seccion.offsetHeight;

    if (posicionActual >= top && posicionActual < fondo) {
      enlacesNav.forEach((enlace) => {
        enlace.classList.remove('active');
        if (enlace.getAttribute('href') === '#' + seccion.id) {
          enlace.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', resaltarEnlaceActivo);

/* ===== Botón volver arriba ===== */
const botonScrollTop = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    botonScrollTop.classList.add('mostrar');
  } else {
    botonScrollTop.classList.remove('mostrar');
  }
});

if (botonScrollTop) {
  botonScrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== Animación de barras de habilidades ===== */
const barras = document.querySelectorAll('.habilidad__progreso');

function animarBarras() {
  barras.forEach((barra) => {
    const rect = barra.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progreso = barra.getAttribute('data-progreso');
      barra.style.width = progreso + '%';
    }
  });
}

window.addEventListener('scroll', animarBarras);
window.addEventListener('load', animarBarras);

/* ===== Animación de aparición al hacer scroll ===== */
const animarElementos = document.querySelectorAll('.proyecto, .habilidad, .sobre__avatar, .contacto__item');

const observadorAparicion = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.style.animation = 'aparecer 0.8s ease forwards';
        observadorAparicion.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.1 }
);

animarElementos.forEach((elemento) => {
  elemento.style.opacity = 0;
  observadorAparicion.observe(elemento);
});

// Estilo claveframe inyectado para la animación de aparición
const estiloAparicion = document.createElement('style');
estiloAparicion.textContent = `
  @keyframes aparecer {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(estiloAparicion);

/* ===== Formulario de contacto ===== */
const formularioContacto = document.getElementById('contacto-form');
const mensajeFormulario = document.getElementById('form-mensaje');

if (formularioContacto) {
  formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(formularioContacto);
    const datos = Object.fromEntries(formData.entries());

    if (datos.nombre && datos.email && datos.asunto && datos.mensaje) {
      mensajeFormulario.style.color = '#27ae60';
      mensajeFormulario.textContent = '¡Mensaje enviado correctamente! Te contactaré pronto.';
      formularioContacto.reset();
    } else {
      mensajeFormulario.style.color = '#e74c3c';
      mensajeFormulario.textContent = 'Por favor, completa todos los campos.';
    }

    setTimeout(() => {
      mensajeFormulario.textContent = '';
    }, 5000);
  });
}

/* ===== Año actual en el footer ===== */
const elementoAnio = document.getElementById('anio');
if (elementoAnio) {
  elementoAnio.textContent = new Date().getFullYear();
}
