const menu = document.querySelector(".menu-toggle");
const mobile = document.querySelector("#mobileNav");

menu?.addEventListener("click", () => {
  const open = mobile?.classList.toggle("open") ?? false;
  menu.setAttribute("aria-expanded", String(open));
});

mobile?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobile.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  });
});

const header = document.querySelector(".site-header");
const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealTargets = document.querySelectorAll(
  [
    "main section:not(.hero) .section-kicker",
    "main section:not(.hero) h2",
    "main section:not(.hero) .section-heading > p",
    "main section:not(.hero) .position-grid > *",
    "main section:not(.hero) .experience-copy > *",
    "main section:not(.hero) .service",
    "main section:not(.hero) .person",
    "main section:not(.hero) .place-grid > *",
    "main section:not(.hero) .location-grid > *",
    "main section:not(.hero) .final-cta > *",
  ].join(", "),
);

if (!reduceMotion.matches && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
}

const slider = document.querySelector("[data-slider]");
const slides = slider ? [...slider.querySelectorAll(".cut-slide")] : [];
const dots = slider?.querySelector(".dots");
const previousButton = slider?.querySelector(".slider-prev");
const nextButton = slider?.querySelector(".slider-next");
const autoplayDelay = 4000;
let currentSlide = 0;
let autoplayTimer;

function renderSlider() {
  slides.forEach((slide, index) => {
    const isActive = index === currentSlide;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
    slide.setAttribute("aria-current", isActive ? "true" : "false");
  });

  if (!dots) return;

  dots.replaceChildren();
  slides.forEach((_, index) => {
    const button = document.createElement("button");
    const isActive = index === currentSlide;
    button.type = "button";
    button.className = `dot${isActive ? " active" : ""}`;
    button.setAttribute("aria-label", `Ir para corte ${index + 1}`);
    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute("aria-current", isActive ? "true" : "false");
    button.addEventListener("click", () => {
      currentSlide = index;
      renderSlider();
      restartAutoplay();
    });
    dots.appendChild(button);
  });
}

function showNextSlide(direction = 1) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  renderSlider();
}

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
  autoplayTimer = undefined;
}

function startAutoplay() {
  stopAutoplay();
  if (slides.length < 2 || reduceMotion.matches || document.hidden) return;
  autoplayTimer = window.setInterval(() => showNextSlide(), autoplayDelay);
}

function restartAutoplay() {
  startAutoplay();
}

if (slides.length > 0) {
  renderSlider();

  previousButton?.addEventListener("click", () => {
    showNextSlide(-1);
    restartAutoplay();
  });
  nextButton?.addEventListener("click", () => {
    showNextSlide();
    restartAutoplay();
  });

  slider?.addEventListener("pointerenter", stopAutoplay);
  slider?.addEventListener("pointerleave", startAutoplay);
  slider?.addEventListener("focusin", stopAutoplay);
  slider?.addEventListener("focusout", (event) => {
    if (!slider.contains(event.relatedTarget)) startAutoplay();
  });
  document.addEventListener("visibilitychange", startAutoplay);
  reduceMotion.addEventListener("change", startAutoplay);
  startAutoplay();
}

const video = document.querySelector(".hero-video-media");
if (video) {
  const heroVideo = video.closest(".hero-video");
  const showVideo = () => heroVideo?.classList.add("is-ready");
  const hideVideo = () => {
    heroVideo?.classList.remove("is-ready");
    video.style.display = "none";
  };
  let videoLoadScheduled = false;

  video.addEventListener("loadeddata", showVideo, { once: true });
  video.addEventListener("error", hideVideo);

  const loadHeroVideo = () => {
    if (videoLoadScheduled || reduceMotion.matches || document.hidden) return;

    videoLoadScheduled = true;
    video.autoplay = true;
    video.load();

    const playPromise = video.play();
    playPromise?.catch(() => {});
  };

  const scheduleHeroVideoLoad = () => {
    if (reduceMotion.matches || document.hidden) return;

    window.setTimeout(loadHeroVideo, 300);
  };

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      scheduleHeroVideoLoad();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  };

  if (document.readyState === "complete") {
    scheduleHeroVideoLoad();
  } else {
    window.addEventListener("load", scheduleHeroVideoLoad, { once: true });
  }

  if (document.hidden) {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }

  reduceMotion.addEventListener("change", () => {
    if (!reduceMotion.matches) scheduleHeroVideoLoad();
  });
}
