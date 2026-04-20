const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

/* MOBILE MENU */
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNav = navLinks.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedMenuButton) {
      navLinks.classList.remove("show");
    }
  });

  const navAnchors = navLinks.querySelectorAll("a");
  navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

/* CONTACT FORM */
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputs = contactForm.querySelectorAll("input, textarea");
    let isValid = true;

    inputs.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = "rgba(239, 68, 68, 0.7)";
      } else {
        field.style.borderColor = "rgba(255, 255, 255, 0.08)";
      }
    });

    if (!isValid) {
      if (formMessage) {
        formMessage.textContent = "Please fill in all fields first.";
        formMessage.style.color = "#fca5a5";
      }
      return;
    }

    if (formMessage) {
      formMessage.textContent = "Message sent successfully!";
      formMessage.style.color = "#86efac";
    }

    contactForm.reset();
  });
}

/* SIMPLE REVEAL ANIMATION ON SCROLL */
const revealItems = document.querySelectorAll(
  ".info-card, .content-box, .project-card, .skills-list-card, .stat-card, .contact-card, .timeline-item, .featured-project"
);

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealItems.forEach((item) => {
    if (!item.classList.contains("fade-up")) {
      item.style.opacity = "0";
      item.style.transform = "translateY(28px)";
      item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    }

    revealObserver.observe(item);
  });
}