function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => (modal.style.display = 'none'), 400);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // === INTEGRANTE ===
  const cardIntegrante = document.querySelector('.card-integrante');
  const imgIntegranteMobile = document.querySelector('.img-integrante-mobile');
  const btnNext = document.querySelector('#modalIntegrante .btn-next');
  const btnBack = document.querySelector('#modalIntegrante .btn-back');
  let integranteSwiper = null;

  const abrirModal = () => {
    openModal('modalIntegrante');

    if (!integranteSwiper) {
      integranteSwiper = new Swiper('.integrante-swiper', {
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 600,
        pagination: {
          el: '#modalIntegrante .swiper-pagination',
          clickable: true
        },
        on: {
          slideChange: () => {
            const isFirstSlide = integranteSwiper.realIndex === 0;
            const isLastSlide = integranteSwiper.realIndex === integranteSwiper.slides.length - 1;
            btnBack?.classList.toggle('disabled', isFirstSlide);
            btnNext?.classList.toggle('expand', isLastSlide);
          }
        }
      });

      // Mostrar botón "Entendido" si solo hay una slide
      if (integranteSwiper.slides.length === 1) {
        btnBack?.classList.add('disabled');
        btnNext?.classList.add('expand');
      }
    }
  };

  cardIntegrante?.addEventListener('click', abrirModal);
  imgIntegranteMobile?.addEventListener('click', abrirModal);

  btnNext?.addEventListener('click', () => {
    const isLastSlide = integranteSwiper?.realIndex === integranteSwiper.slides.length - 1;
    if (isLastSlide) {
      closeModal('modalIntegrante');
    } else {
      integranteSwiper?.slideNext();
    }
  });

  btnBack?.addEventListener('click', () => {
    integranteSwiper?.slidePrev();
  });

  // === COMITÉ ===
  const cardComite = document.querySelector('.card-comite');
  const imgComiteMobile = document.querySelector('img[alt="Comité mobile"]');
  const btnNextComite = document.querySelector('#modalComite .btn-next');
  const btnBackComite = document.querySelector('#modalComite .btn-back');
  let comiteSwiper = null;

  const abrirModalComite = () => {
    openModal('modalComite');

    if (!comiteSwiper) {
      comiteSwiper = new Swiper('.comite-swiper', {
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 600,
        pagination: {
          el: '#modalComite .swiper-pagination',
          clickable: true
        },
        on: {
          slideChange: () => {
            const isFirstSlide = comiteSwiper.realIndex === 0;
            const isLastSlide = comiteSwiper.realIndex === comiteSwiper.slides.length - 1;
            btnBackComite?.classList.toggle('disabled', isFirstSlide);
            btnNextComite?.classList.toggle('expand', isLastSlide);
          }
        }
      });

      // Mostrar botón "Entendido" si solo hay una slide
      if (comiteSwiper.slides.length === 1) {
        btnBackComite?.classList.add('disabled');
        btnNextComite?.classList.add('expand');
      }
    }
  };

  cardComite?.addEventListener('click', abrirModalComite);
  imgComiteMobile?.addEventListener('click', abrirModalComite);

  btnNextComite?.addEventListener('click', () => {
    const isLastSlide = comiteSwiper?.realIndex === comiteSwiper.slides.length - 1;
    if (isLastSlide) {
      closeModal('modalComite');
    } else {
      comiteSwiper?.slideNext();
    }
  });

  btnBackComite?.addEventListener('click', () => {
    comiteSwiper?.slidePrev();
  });
});
