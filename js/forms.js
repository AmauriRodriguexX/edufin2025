document.addEventListener('DOMContentLoaded', () => {
     const radios = document.querySelectorAll('input[name="cliente"]');
     const forms = {
       si: document.getElementById('form-si'),
       no: document.getElementById('form-no')
     };
     const telInputs = document.querySelectorAll('.tel-input');
     const checkbox = document.getElementById('checkTerminos');
     const nextBtn = document.getElementById('btn-next-2-2');
 
     radios.forEach(radio => {
       radio.addEventListener('change', () => {
         forms.si.classList.toggle('d-none', radio.value !== 'si');
         forms.no.classList.toggle('d-none', radio.value !== 'no');
       });
     });
 
     telInputs.forEach(input => {
       input.addEventListener('input', () => {
         const msg = input.nextElementSibling;
         if (/^\d{10}$/.test(input.value)) {
           input.classList.remove('is-invalid');
           input.classList.add('is-valid');
           msg.textContent = 'Tu campo se ha llenado correctamente';
           msg.className = 'feedback valid-msg';
         } else {
           input.classList.remove('is-valid');
           input.classList.add('is-invalid');
           msg.textContent = 'Este campo debe tener 10 dígitos';
           msg.className = 'feedback invalid-msg';
         }
         validateForm();
       });
     });
 
     checkbox.addEventListener('change', validateForm);
 
     function validateForm() {
       const visibleForm = document.querySelector('.cliente-form:not(.d-none)');
       const allFilled = [...visibleForm.querySelectorAll('input, select')].every(el => el.value.trim() !== '');
       const telValid = visibleForm.querySelector('.tel-input')?.classList.contains('is-valid');
       const termsChecked = checkbox.checked;
 
       if (allFilled && telValid && termsChecked) {
         nextBtn.removeAttribute('disabled');
       } else {
         nextBtn.setAttribute('disabled', true);
       }
     }
   });

   document.addEventListener('DOMContentLoaded', () => {
     const icon = document.getElementById('tooltipTrigger');
     const tooltip = document.getElementById('tooltipBox');
   
     if (!icon || !tooltip) return;
   
     const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
   
     if (isTouch) {
       // Mobile: toggle con clic
       icon.addEventListener('click', (e) => {
         e.stopPropagation();
         tooltip.classList.toggle('tooltip-visible');
       });
   
       // Ocultar si se da clic fuera
       document.addEventListener('click', () => {
         tooltip.classList.remove('tooltip-visible');
       });
   
       // Prevenir que se cierre al tocar dentro del tooltip
       tooltip.addEventListener('click', (e) => {
         e.stopPropagation();
       });
     }
   });
   

// validracion de formulario final de estrelllas
document.addEventListener("DOMContentLoaded", () => {
  let rating = 0;

  const stars = document.querySelectorAll("#star-rating .star");
  const submitBtn = document.getElementById("final-submit-btn");

  // Manejo de estrellas
  stars.forEach(star => {
    star.addEventListener("click", () => {
      rating = parseInt(star.dataset.value);
      stars.forEach(s => {
        s.src = parseInt(s.dataset.value) <= rating
          ? "assets/resources/star.png"
          : "assets/resources/star-inactive.png";
      });
      checkFinalValidity();
    });
  });

  // Validar solo radios y estrellas
  document.querySelectorAll(".q-final").forEach(el =>
    el.addEventListener("change", checkFinalValidity)
  );

  function checkFinalValidity() {
    const q1Checked = document.querySelector('input[name="q1-final"]:checked');
    const q2Checked = document.querySelector('input[name="q2-final"]:checked');
    const valid = q1Checked && q2Checked && rating > 0;
    submitBtn.disabled = !valid;
  }
});