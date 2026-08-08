// ============================================
// CUENTA REGRESIVA
// ============================================

const weddingDate = new Date('2026-10-10T16:00:00-03:00');

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();

  const days = document.getElementById('days');
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');

  if (difference <= 0) {
    days.textContent = '00';
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);

  const daysValue = Math.floor(totalSeconds / 86400);
  const hoursValue = Math.floor((totalSeconds % 86400) / 3600);
  const minutesValue = Math.floor((totalSeconds % 3600) / 60);
  const secondsValue = totalSeconds % 60;

  days.textContent = String(daysValue).padStart(2, '0');
  hours.textContent = String(hoursValue).padStart(2, '0');
  minutes.textContent = String(minutesValue).padStart(2, '0');
  seconds.textContent = String(secondsValue).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================

function handleScrollAnimation() {
  const sections = document.querySelectorAll('.section');

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight * 0.85) {
      section.classList.add('visible');
    }
  });
   const hero = document.querySelector('.hero');

  if (hero) {
    hero.classList.toggle('hero-open', window.scrollY > 40);
  }

  
}

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);


// ============================================
// MODAL DE REGALOS
// ============================================

const giftModal = document.getElementById('giftModal');
const openGiftModal = document.getElementById('openGiftModal');
const closeModal = document.getElementById('closeModal');
const copyAlias = document.getElementById('copyAlias');
const copyConfirmation = document.getElementById('copyConfirmation');

if (openGiftModal && giftModal) {
  openGiftModal.addEventListener('click', () => {
    giftModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

function closeGiftModal() {
  if (giftModal) {
    giftModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

if (closeModal) {
  closeModal.addEventListener('click', closeGiftModal);
}

if (giftModal) {
  giftModal.addEventListener('click', (event) => {
    if (event.target === giftModal) {
      closeGiftModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (
    event.key === 'Escape' &&
    giftModal &&
    giftModal.classList.contains('active')
  ) {
    closeGiftModal();
  }
});

if (copyAlias) {
  copyAlias.addEventListener('click', async () => {
    const alias = 'CASAMIENTODELFIYEDU';

    try {
      await navigator.clipboard.writeText(alias);

      copyConfirmation.textContent =
        '¡Alias copiado al portapapeles!';
      copyConfirmation.classList.add('visible');

      setTimeout(() => {
        copyConfirmation.classList.remove('visible');
      }, 3000);

    } catch (error) {
      console.error('Error al copiar:', error);

      copyConfirmation.textContent =
        'No se pudo copiar. Podés seleccionarlo manualmente.';
      copyConfirmation.classList.add('visible');
    }
  });
}


// ============================================
// CONFIGURACIÓN SEGÚN LA URL
// ============================================

const rutaActual = window.location.pathname
  .replace(/\/+$/, '');

const esInvitadoIndividual = rutaActual === '/1';
const esInvitadoConPareja = rutaActual === '/2';

const tipoInvitacion = esInvitadoIndividual
  ? 'individual'
  : 'parejas';


// ============================================
// ELEMENTOS DEL FORMULARIO
// ============================================

const rsvpForm = document.getElementById('rsvpForm');
const btnSubmit = document.getElementById('btnSubmit');
const formStatus = document.getElementById('formStatus');

const acompananteFields =
  document.getElementById('acompananteFields');

const nombreAcompanante =
  document.getElementById('nombreAcompanante');

const apellidoAcompanante =
  document.getElementById('apellidoAcompanante');

const menuAcompanante =
  document.getElementById('menuAcompanante');

const menuAcompananteGroup =
  document.getElementById('menuAcompananteGroup');

const menuPrincipal =
  document.getElementById('menuPrincipal');

const menuPrincipalGroup =
  document.getElementById('menuPrincipalGroup');

const radiosAsistencia =
  document.querySelectorAll('input[name="asiste"]');

const opcionPareja =
  document.querySelector(
    'input[value="Asistiremos los dos"]'
  );

const opcionIndividual =
  document.querySelector(
    'input[value="Asisto solo/a"]'
  );


// ============================================
// CONFIGURAR FORMULARIO POR RUTA
// ============================================

function configurarRuta() {
  if (esInvitadoIndividual) {
    // Ocultar "Asistiremos los dos"
    if (opcionPareja) {
      opcionPareja.closest('.radio-label').style.display = 'none';
      opcionPareja.checked = false;
    }

    // Cambiar "Asisto solo/a" por "Asisto"
    if (opcionIndividual) {
      opcionIndividual.value = 'Asisto';

      const texto =
        opcionIndividual.parentElement.querySelector('span');

      if (texto) {
        texto.textContent = 'Asisto';
      }
    }

    ocultarDatosAcompanante();

  } else if (esInvitadoConPareja) {
    // En /2 los campos se muestran solo
    // cuando se elige "Asistiremos los dos"
    actualizarCamposPorAsistencia();
  }
}

function ocultarDatosAcompanante() {
  if (acompananteFields) {
    acompananteFields.style.display = 'none';
  }

  if (menuAcompananteGroup) {
    menuAcompananteGroup.style.display = 'none';
  }

  if (nombreAcompanante) {
    nombreAcompanante.value = '';
  }

  if (apellidoAcompanante) {
    apellidoAcompanante.value = '';
  }

  if (menuAcompanante) {
    menuAcompanante.value = '';
  }
}

function actualizarCamposPorAsistencia() {
  const asistenciaSeleccionada =
    document.querySelector(
      'input[name="asiste"]:checked'
    )?.value || '';

  const vienenLosDos =
    asistenciaSeleccionada === 'Asistiremos los dos';

  const noAsiste =
    asistenciaSeleccionada === 'No podré asistir';

  if (esInvitadoIndividual || !vienenLosDos) {
    ocultarDatosAcompanante();
  } else {
    if (acompananteFields) {
      acompananteFields.style.display = 'grid';
    }

    if (menuAcompananteGroup) {
      menuAcompananteGroup.style.display = 'block';
    }
  }

  // Si no asiste, el menú principal no es necesario
  if (menuPrincipal) {
    menuPrincipal.required = !noAsiste;

    if (noAsiste) {
      menuPrincipal.value = '';
    }
  }

  if (menuPrincipalGroup) {
    menuPrincipalGroup.style.display = noAsiste
      ? 'none'
      : 'block';
  }
}

radiosAsistencia.forEach((radio) => {
  radio.addEventListener(
    'change',
    actualizarCamposPorAsistencia
  );
});

configurarRuta();


// ============================================
// ENVÍO DEL FORMULARIO
// ============================================

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzK3gvUd9olxmPCcxUQGNVG0Me2yWt_4ubgfikmJ6R1kmCbwmuyCbvgFG1r8uqr2fs/exec';

if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';

    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const asistencia =
      document.querySelector(
        'input[name="asiste"]:checked'
      )?.value || '';

    const vienenLosDos =
      asistencia === 'Asistiremos los dos';

    const datos = new URLSearchParams();

    datos.append(
      'nombre',
      document.getElementById('nombre').value.trim()
    );

    datos.append(
      'apellido',
      document.getElementById('apellido').value.trim()
    );

    datos.append('asiste', asistencia);

    datos.append(
      'menuPrincipal',
      menuPrincipal.value || ''
    );

    datos.append(
      'menuAcompanante',
      vienenLosDos && esInvitadoConPareja
        ? menuAcompanante.value || ''
        : ''
    );

    datos.append(
      'nombreAcompanante',
      vienenLosDos && esInvitadoConPareja
        ? nombreAcompanante.value.trim()
        : ''
    );

    datos.append(
      'apellidoAcompanante',
      vienenLosDos && esInvitadoConPareja
        ? apellidoAcompanante.value.trim()
        : ''
    );

    // Se conserva la columna "Pais" de la planilla,
    // pero queda vacía porque ahora hay un solo campo telefónico.
    datos.append('pais', '');

    datos.append(
      'telefono',
      document.getElementById('telefono').value.trim()
    );

    datos.append(
      'mensaje',
      document.getElementById('mensaje').value.trim()
    );

    datos.append('tipo', tipoInvitacion);

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: datos
      });

      formStatus.textContent =
        '¡Gracias! Tu confirmación fue enviada.';
      formStatus.classList.add('success');

      rsvpForm.reset();

      if (esInvitadoIndividual) {
        configurarRuta();
      } else {
        ocultarDatosAcompanante();
        actualizarCamposPorAsistencia();
      }

    } catch (error) {
      console.error('Error al enviar:', error);

      formStatus.textContent =
        'Hubo un error. Por favor intentá de nuevo.';
      formStatus.classList.add('error');

    } finally {
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'CONFIRMAR';
    }
  });
}