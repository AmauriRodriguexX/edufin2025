document.addEventListener("DOMContentLoaded", () => {
     const initialStepId = 'step-10.7'; // ← cámbialo al ID que quieras mostrar
     document.querySelectorAll(".step-content").forEach(step => step.classList.add("d-none"));
     const initialStep = document.getElementById(initialStepId);
     if (initialStep) initialStep.classList.remove("d-none");
   });