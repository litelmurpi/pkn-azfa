document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const sidebarMenu = document.getElementById('sidebarMenu');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const scrollContainer = document.getElementById('scrollContainer');
  const logoCenter = document.getElementById('logoCenter');
  const sections = document.querySelectorAll('section');
  const body = document.body;

  const dotLinks = document.querySelectorAll('.dot-link');

  // Toggle Sidebar Menu
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sidebarMenu.classList.toggle('active');
  });

  // Handle Sidebar Navigation Click
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Close sidebar
      menuToggle.classList.remove('active');
      sidebarMenu.classList.remove('active');
      
      // Scroll to target slide
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Handle Dot Navigation Click
  dotLinks.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'));
      if (sections[slideIndex]) {
        sections[slideIndex].scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Update Sidebar Link Active States
  function updateSidebarActive(activeIndex) {
    sidebarLinks.forEach((link, idx) => {
      if (idx === activeIndex) {
        link.style.color = 'var(--color-lime)';
      } else {
        link.style.color = '';
      }
    });
  }

  // Update Dot Navigation Active States
  function updateDotsActive(activeIndex) {
    dotLinks.forEach((dot, idx) => {
      if (idx === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Fade out Logo elements on specific sections if needed
  function updateLogoCenter(activeIndex) {
    if (activeIndex === 0) {
      // Very prominent on hero
      logoCenter.style.opacity = '1';
    } else {
      // Faded or simple on other slides (mimicking Good Secrets scroll behaviors)
      logoCenter.style.opacity = '0.9';
    }
  }

  // Intersection Observer for Scroll Snapping & Theme Switching
  const observerOptions = {
    root: scrollContainer,
    threshold: 0.5 // Triggers when 50% of the section is visible in the container
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Manage active classes for Scroll Reveal Animations
        sections.forEach(sec => sec.classList.remove('active'));
        entry.target.classList.add('active');

        const theme = entry.target.getAttribute('data-theme');
        
        // Remove existing theme classes
        body.classList.remove('theme-lime', 'theme-indigo', 'theme-dark', 'theme-offwhite');
        
        // Add active theme class
        body.classList.add(`theme-${theme}`);
        
        // Find index of intersecting section
        const activeIndex = Array.from(sections).indexOf(entry.target);
        updateSidebarActive(activeIndex);
        updateDotsActive(activeIndex);
        updateLogoCenter(activeIndex);
      }
    });
  }, observerOptions);

  // Start observing all sections
  sections.forEach(section => observer.observe(section));
});
