
document.addEventListener('DOMContentLoaded', function () {
  // Mobile Navigation
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // Header scroll effect
  const header = document.querySelector('header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Activate header on page load if scrolled
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  }

  // Portfolio filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const navDots = document.querySelectorAll('.nav-dot');
  let currentSlide = 0;

  function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    navDots.forEach(dot => dot.classList.remove('active'));

    testimonialSlides[index].classList.add('active');
    navDots[index].classList.add('active');
    currentSlide = index;
  }

  navDots.forEach(dot => {
    dot.addEventListener('click', function () {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      showSlide(slideIndex);
    });
  });

  // Auto slide change
  setInterval(() => {
    let nextSlide = currentSlide + 1;
    if (nextSlide >= testimonialSlides.length) {
      nextSlide = 0;
    }
    showSlide(nextSlide);
  }, 5000);

  // Back to top button
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Form submission
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1500);
  });

  // Animate skill progress bars on scroll
  const skillProgressBars = document.querySelectorAll('.progress');

  function animateSkills() {
    skillProgressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';

      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  // Intersection Observer for skill animation
  const aboutSection = document.querySelector('#about');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(aboutSection);
});
