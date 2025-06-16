document.addEventListener("DOMContentLoaded", () => {
  // Botón para avanzar (sin validación)
  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const currentId = btn.closest(".step-content").id;
      const nextId = btn.dataset.next;
      changeStep(currentId, nextId);
    });
  });

  // Validar respuestas (solo ejemplo para step-3.2)
  document.querySelectorAll(".validar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const step = btn.dataset.step;               // e.g. "3.2"
      const baseId = `step-${step}`;               // "step-3.2"
      const correctoId   = `${baseId}-correcto`;   // "step-3.2-correcto"
      const reintentoId  = `${baseId}-reintentar`; // "step-3.2-reintentar"
  
      const container = document.getElementById(baseId);
      // 1) Recolecta todos los names de las preguntas
      const names = [...new Set(
        Array.from(container.querySelectorAll(".validate-question"))
             .map(inp => inp.name)
      )];
  
      // 2) Para cada pregunta, localiza el radio :checked y comprueba su clase
      const allCorrect = names.every(name => {
        const sel = container.querySelector(`input[name="${name}"]:checked`);
        return sel && sel.classList.contains("correct-answer");
      });
  
      // 3) Avanza al bloque correcto o al de reintento
      changeStep(baseId, allCorrect ? correctoId : reintentoId);
    });
  });
  
  

  // Avanzar automático (después de video)
  document.querySelectorAll(".avanzar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const nextId = btn.dataset.next;
      document.querySelectorAll(".step-content").forEach(div => div.classList.add("d-none"));
      document.getElementById(nextId)?.classList.remove("d-none");
    });
  });

  // Reiniciar desde video original
  document.querySelectorAll(".reiniciar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const step = btn.dataset.step;
      document.querySelectorAll(`#step-${step} .step-content`).forEach(div => div.classList.add("d-none"));
      document.getElementById(`step-${step}.1`)?.classList.remove("d-none");
    });
  });

  // Detecta cambios y habilita botón
  document.querySelectorAll(".step-content").forEach(step => {
    step.addEventListener("change", () => {
      const btn = step.querySelector(".next-btn, .validar-btn");
      if (btn) btn.disabled = false;
    });
  });

  function changeStep(currentId, nextId) {
    document.getElementById(currentId)?.classList.add("d-none");
    document.getElementById(nextId)?.classList.remove("d-none");
  }
});


// Modal  

document.addEventListener('DOMContentLoaded', () => {
  const openModalLink = document.querySelector('a.link-cb');
  const modalOverlay = document.getElementById('modalOverlay');
  const closeModalBtn = document.getElementById('closeModal');

  openModalLink.addEventListener('click', (e) => {
    e.preventDefault(); // Evita navegación
    modalOverlay.classList.remove('d-none');
  });

  closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('d-none');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.add('d-none');
    }
  });
});


//card button
document.querySelectorAll('.ir-a-step').forEach(card => {
  card.addEventListener('click', () => {
    const nextId = card.dataset.next;
    if (nextId) {
      document.querySelectorAll('.step-content').forEach(s => s.classList.add('d-none'));
      document.getElementById(nextId)?.classList.remove('d-none');
    }
  });
});


//Modal Avanzado card
  document.addEventListener('DOMContentLoaded', () => {
    const cardAvanzado = document.querySelector('.abrir-modal-avanzado');
    const modal = document.getElementById('modalAvanzado');
    const closeModal = document.getElementById('closeModalAvanzado');

    cardAvanzado?.addEventListener('click', () => {
      modal.classList.remove('d-none');
    });

    closeModal?.addEventListener('click', () => {
      modal.classList.add('d-none');
    });

    // También cerrar si se hace clic fuera de la caja
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('d-none');
      }
    });
  });

