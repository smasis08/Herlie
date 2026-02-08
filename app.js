const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const buttons = Array.from(document.querySelectorAll('.carousel-btn'));
let currentIndex = 0;
let autoPlayId = null;

const setActiveSlide = (index) => {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('is-active', idx === index);
  });
  dots.forEach((dot, idx) => {
    dot.classList.toggle('is-active', idx === index);
  });
  currentIndex = index;
};

const showNext = () => {
  const nextIndex = (currentIndex + 1) % slides.length;
  setActiveSlide(nextIndex);
};

const showPrev = () => {
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  setActiveSlide(prevIndex);
};

const startAutoplay = () => {
  if (autoPlayId) {
    clearInterval(autoPlayId);
  }
  autoPlayId = setInterval(showNext, 4500);
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.direction;
    if (direction === 'next') {
      showNext();
    } else {
      showPrev();
    }
    startAutoplay();
  });
});

setActiveSlide(0);
startAutoplay();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((section) => {
  observer.observe(section);
});
