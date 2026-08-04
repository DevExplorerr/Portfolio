// ---------- Mobile nav toggle ----------
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('nav-active');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('nav-active');
    });
  });
}

// ---------- Typing effect (hero role cycler) ----------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const roleEl = document.getElementById('role-text');

const roles = [
  'Building Production-Grade Mobile Apps',
  'Clean Architecture & Firebase',
  'Full-Stack Flutter Ecosystems',
  'Open to Remote Opportunities'
];

if (roleEl) {
  if (prefersReducedMotion) {
    roleEl.textContent = roles[0];
  } else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = roles[roleIndex];
      roleEl.textContent = current.substring(0, charIndex);

      let speed = deleting ? 35 : 55;

      if (!deleting && charIndex === current.length) {
        speed = 1400;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      } else {
        charIndex += deleting ? -1 : 1;
      }

      setTimeout(typeLoop, speed);
    }

    typeLoop();
  }
}

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll('.project-card, .timeline-item');

if (prefersReducedMotion) {
  revealTargets.forEach((el) => el.classList.add('revealed'));
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('revealed'), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('revealed'));
}

// ---------- Active nav link ----------
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

const handleMouseMove = (e) => {
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  target.style.setProperty("--mouse-x", `${x}px`);
  target.style.setProperty("--mouse-y", `${y}px`);
};

const interactiveCards = document.querySelectorAll(".service-card, .project-card");

if (!prefersReducedMotion) {
  for (const card of interactiveCards) {
    card.addEventListener("mousemove", handleMouseMove);
  }
}

// ---------- Page Transitions ----------
const transitionLinks = document.querySelectorAll('a[href$=".html"]');

if (!prefersReducedMotion) {
  transitionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const targetUrl = link.getAttribute('href');

      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 400);
    });
  });
}
