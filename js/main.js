document.addEventListener("DOMContentLoaded", () => {
  // Navegación normal
  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const currentId = btn.closest(".step-content").id;
      const nextId = btn.dataset.next;
      changeStep(currentId, nextId);
    });
  });

  // Validar respuestas correctas
  document.querySelectorAll(".validar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const step = btn.dataset.step;
      const baseId = `step-${step}`;
      const correctoId = `${baseId}-correcto`;
      const reintentoId = `${baseId}-reintentar`;

      const container = document.getElementById(baseId);
      const names = [...new Set(
        Array.from(container.querySelectorAll(".validate-question"))
             .map(inp => inp.name)
      )];

      const allCorrect = names.every(name => {
        const sel = container.querySelector(`input[name="${name}"]:checked`);
        return sel && sel.classList.contains("correct-answer");
      });

      changeStep(baseId, allCorrect ? correctoId : reintentoId);
    });
  });

  // Avanzar con botón genérico
  document.querySelectorAll(".avanzar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const nextId = btn.dataset.next;
      document.querySelectorAll(".step-content").forEach(div => div.classList.add("d-none"));
      document.getElementById(nextId)?.classList.remove("d-none");
    });
  });

  // Reiniciar desde la primera subvista
  document.querySelectorAll(".reiniciar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const step = btn.dataset.step;
      const substepId = `step-${step}.1`;
      document.querySelectorAll(`#step-${step} .step-content`).forEach(div => div.classList.add("d-none"));
      document.getElementById(substepId)?.classList.remove("d-none");
    });
  });

  // Habilitar botón al cambiar input
  document.querySelectorAll(".step-content").forEach(step => {
    step.addEventListener("change", () => {
      const btn = step.querySelector(".next-btn, .validar-btn");
      if (btn) btn.disabled = false;
    });
  });

  // Ir a step desde tarjeta
  document.querySelectorAll('.ir-a-step').forEach(card => {
    card.addEventListener('click', () => {
      const nextId = card.dataset.next;
      if (nextId) {
        document.querySelectorAll('.step-content').forEach(s => s.classList.add('d-none'));
        document.getElementById(nextId)?.classList.remove('d-none');
      }
    });
  });

  // Modal términos dinámico
  document.querySelectorAll('a.link-cb').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const modal = document.querySelector(targetId);
      if (modal) modal.classList.remove('d-none');
    });
  });

  // Cerrar cualquier modal
  document.querySelectorAll('.btn-close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay')?.classList.add('d-none');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('d-none');
      }
    });
  });

  // Modal Avanzado (específico)document.addEventListener("DOMContentLoaded", () => {
  const modalAvanzado = document.getElementById('modalAvanzado');
  const closeModalAvanzado = document.getElementById('closeModalAvanzado');

  // Todas las tarjetas que abren el mismo modal
  const cardsAvanzado = document.querySelectorAll('.abrir-modal-avanzado');

  cardsAvanzado.forEach(card => {
    card.addEventListener('click', () => {
      modalAvanzado?.classList.remove('d-none');
    });
  });

  // Cerrar modal con el botón
  closeModalAvanzado?.addEventListener('click', () => {
    modalAvanzado?.classList.add('d-none');
  });

  // Cerrar modal si se hace clic fuera del modal-box
  modalAvanzado?.addEventListener('click', (e) => {
    if (e.target === modalAvanzado) {
      modalAvanzado.classList.add('d-none');
    }
  });
});
