// Main JavaScript for Travis Jankowski's Portfolio Website

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initTypingEffect();
  initThemeToggler();
  initScrollEffects();
  initMobileMenu();
  initAnimations();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".navbar-nav a");
  const allInternalLinks = document.querySelectorAll('a[href^="#"]');

  // Smooth scrolling for all internal navigation links
  allInternalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarNav = document.getElementById("navbar-nav");
        navbarNav.classList.remove("active");
      }
    });
  });

  // Update active nav link on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Add/remove navbar background on scroll
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Typing effect for hero section
function initTypingEffect() {
  const typingText = document.getElementById("typing-text");
  if (!typingText) return;

  const phrases = [
    "Building the future with code",
    "Developing AI solutions",
    "Creating innovative software",
    "Solving complex problems",
    "Learning new technologies",
  ];

  let currentPhrase = 0;
  let currentChar = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 2000;

  function type() {
    const current = phrases[currentPhrase];

    if (isDeleting) {
      typingText.innerHTML =
        current.substring(0, currentChar - 1) +
        '<span class="typing-cursor"></span>';
      currentChar--;

      if (currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, deleteSpeed);
    } else {
      typingText.innerHTML =
        current.substring(0, currentChar + 1) +
        '<span class="typing-cursor"></span>';
      currentChar++;

      if (currentChar === current.length) {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, pauseTime);
        return;
      }
      setTimeout(type, typeSpeed);
    }
  }

  // Start typing effect
  setTimeout(type, 1000);
}

// Theme toggler functionality
function initThemeToggler() {
  // Check for saved theme preference or default to 'dark'
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Create theme toggle button
  const navbar = document.querySelector(".navbar .container");
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  themeToggle.setAttribute("aria-label", "Toggle theme");
  themeToggle.style.cssText = `
        background: none;
        border: none;
        color: var(--terminal-green);
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0.5rem;
        transition: all 0.3s ease;
    `;

  // Update icon based on current theme
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector("i");
    if (theme === "dark") {
      icon.className = "fas fa-sun";
    } else {
      icon.className = "fas fa-moon";
    }
  }

  updateThemeIcon(savedTheme);

  themeToggle.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  // Add to navbar (only on desktop)
  if (window.innerWidth > 768) {
    navbar.appendChild(themeToggle);
  }
}

// Scroll effects and animations
function initScrollEffects() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all cards and timeline items
  const animateElements = document.querySelectorAll(
    ".card, .timeline-item, .project-card, .contact-item, .skill-item"
  );
  animateElements.forEach((el) => {
    el.classList.add("animate-fade");
    observer.observe(el);
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const navbarToggle = document.getElementById("navbar-toggle");
  const navbarNav = document.getElementById("navbar-nav");

  if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener("click", function () {
      navbarNav.classList.toggle("active");

      // Update toggle icon
      const icon = this.querySelector("i");
      if (navbarNav.classList.contains("active")) {
        icon.className = "fas fa-times";
      } else {
        icon.className = "fas fa-bars";
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navbarToggle.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove("active");
        navbarToggle.querySelector("i").className = "fas fa-bars";
      }
    });
  }
}

// Additional animations and effects
function initAnimations() {
  // Add CSS for fade-in animation
  const style = document.createElement("style");
  style.textContent = `
        .animate-fade {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-fade.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .navbar.scrolled {
            background-color: rgba(10, 10, 10, 0.98);
            box-shadow: 0 2px 20px rgba(0, 255, 0, 0.1);
        }
        
        .navbar-nav a.active {
            color: var(--terminal-green-bright);
        }
        
        .navbar-nav a.active::after {
            width: 100%;
        }
        
        .theme-toggle:hover {
            color: var(--terminal-green-bright);
            transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
            .theme-toggle {
                display: none;
            }
        }
    `;
  document.head.appendChild(style);

  // Add hover effects to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add click effect to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
}

// Skills animation on scroll
function animateSkills() {
  const skillItems = document.querySelectorAll(".skill-item");

  skillItems.forEach((skill, index) => {
    setTimeout(() => {
      skill.style.opacity = "1";
      skill.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Initialize skills animation when skills section is in view
const skillsSection = document.getElementById("skills");
if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkills();
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillsObserver.observe(skillsSection);
}
