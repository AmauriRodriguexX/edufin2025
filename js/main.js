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
      const step = btn.dataset.step;

      // Solo ejecutamos lógica personalizada si es step-3.2
      if (step === "3.2") {
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        const isCorrect = q1?.value === "correcto" && q2?.value === "correcto";
        changeStep("step-3.2", `step-3.2-${isCorrect ? "correcto" : "reintentar"}`);
      } else {
        // lógica genérica para otros pasos futuros
        const currentId = `step-${step}`;
        const nextId = `step-${step}-${Math.random() > 0.3 ? "correcto" : "reintentar"}`;
        changeStep(currentId, nextId);
      }
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
