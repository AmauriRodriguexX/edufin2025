
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".next-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const currentId = btn.closest(".step-content").id;
          const nextId = btn.dataset.next;
          changeStep(currentId, nextId);
        });
      });

      document.querySelectorAll(".validar-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const step = btn.dataset.step;
          const correct = Math.random() > 0.3; // ← cambia esta lógica real
          changeStep(`step-${step}.4`, `step-${step}-${correct ? 'correcto' : 'reintentar'}`);
        });
      });

      document.querySelectorAll(".avanzar-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const nextId = btn.dataset.next;
          document.querySelectorAll(".step-content").forEach(div => div.classList.add("d-none"));
          document.getElementById(nextId).classList.remove("d-none");
        });
      });

      document.querySelectorAll(".reiniciar-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const step = btn.dataset.step;
          document.querySelectorAll(`#step-${step} .step-content`).forEach(div => div.classList.add("d-none"));
          document.getElementById(`step-${step}.1`).classList.remove("d-none");
        });
      });

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