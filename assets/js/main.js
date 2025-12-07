/**
* Template Name: BizLand
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Updated: Dec 05 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
    
    // Close all dropdowns when closing mobile nav
    if (!document.querySelector('body').classList.contains('mobile-nav-active')) {
      document.querySelectorAll('.navmenu .dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
        const menu = dropdown.querySelector('ul');
        if (menu) {
          menu.classList.remove('dropdown-active');
        }
      });
    }
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', (e) => {
      // Don't close menu if this is a dropdown parent link
      const isDropdownParent = navmenu.parentNode.classList.contains('dropdown') && 
                               navmenu.parentNode.querySelector('ul');
      
      if (document.querySelector('.mobile-nav-active') && !isDropdownParent) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Get the parent <a> tag and the dropdown <li>
      const parentLink = this.parentNode;
      const dropdownLi = parentLink.parentNode;
      const dropdownMenu = dropdownLi.querySelector('ul');
      
      // Close all other dropdowns first
      document.querySelectorAll('.navmenu .dropdown').forEach(otherDropdown => {
        if (otherDropdown !== dropdownLi) {
          otherDropdown.classList.remove('active');
          const otherMenu = otherDropdown.querySelector('ul');
          if (otherMenu) {
            otherMenu.classList.remove('dropdown-active');
          }
        }
      });
      
      // Toggle current dropdown
      dropdownLi.classList.toggle('active');
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('dropdown-active');
      }
    });
  });
  
  // Prevent parent link from navigating and trigger dropdown on mobile
  document.querySelectorAll('.navmenu .dropdown > a').forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default on mobile
      if (window.innerWidth < 1200) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get the parent <li> and the dropdown menu
        const dropdownLi = this.parentNode;
        const dropdownMenu = dropdownLi.querySelector('ul');
        
        // Close all other dropdowns first
        document.querySelectorAll('.navmenu .dropdown').forEach(otherDropdown => {
          if (otherDropdown !== dropdownLi) {
            otherDropdown.classList.remove('active');
            const otherMenu = otherDropdown.querySelector('ul');
            if (otherMenu) {
              otherMenu.classList.remove('dropdown-active');
            }
          }
        });
        
        // Toggle current dropdown
        dropdownLi.classList.toggle('active');
        if (dropdownMenu) {
          dropdownMenu.classList.toggle('dropdown-active');
        }
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
 * Dark Mode Toggle Functionality
 * Works with navigation menu toggle
 */

(function() {
  'use strict';

  // Check for saved dark mode preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply the theme on page load
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Logo switching for dark mode with automatic path detection
  function updateLogo() {
    // Detect if we're in a subfolder (EL or CN)
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes('/EL/') || currentPath.includes('/CN/');
    const pathPrefix = isInSubfolder ? '../' : '';
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    const darkLogo = pathPrefix + 'assets/img/logo-dark.png';
    const lightLogo = pathPrefix + 'assets/img/logo_gray.png';
    
    // Update header logo
    const logoImg = document.querySelector('.logo img');
    if (logoImg) {
      logoImg.src = isDarkMode ? darkLogo : lightLogo;
    }
    
    // Update service card logos
    const serviceCardLogos = document.querySelectorAll('.service-card .front img');
    serviceCardLogos.forEach(img => {
      img.src = isDarkMode ? darkLogo : lightLogo;
    });
  }
  
  // Toggle dark mode function
  function toggleDarkMode(e) {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    
    // Update logo after toggling
    updateLogo();
  }

  // Initialize when DOM is ready
  function initDarkModeToggle() {
    const toggleButton = document.getElementById('darkModeToggle');
    
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleDarkMode);
    }
    
    // Update logo on initial load
    updateLogo();
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkModeToggle);
  } else {
    initDarkModeToggle();
  }

  // Optional: Listen for system theme preference changes
  if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    darkModeQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      }
    });
  }
})();

/**
 * Page Transition - Zoom Out/In Effect
 * Intercepts navigation and creates smooth zoom transition between pages
 */
(function() {
  'use strict';

  // Create the transition overlay element
  function createTransitionOverlay() {
    let overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'page-transition-overlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  // Perform zoom out transition then navigate
  function transitionToPage(url) {
    const overlay = createTransitionOverlay();
    const mainContent = document.querySelector('.main');
    const header = document.querySelector('.header');
    
    // Mark body as transitioning
    document.body.classList.add('transitioning-out');
    
    // Start zoom out animation on page content
    if (mainContent) {
      mainContent.classList.add('page-transition-zoom-out');
    }
    if (header) {
      header.classList.add('page-transition-zoom-out');
    }
    
    // Expand the overlay (background color)
    setTimeout(() => {
      overlay.classList.add('zoom-out-active');
    }, 100);
    
    // Navigate to new page after animation completes
    setTimeout(() => {
      // Set flag in sessionStorage to trigger zoom-in on next page
      sessionStorage.setItem('pageTransition', 'true');
      window.location.href = url;
    }, 800);
  }

  // Handle zoom in animation on page load
  function handlePageLoad() {
    const shouldTransition = sessionStorage.getItem('pageTransition');
    
    if (shouldTransition === 'true') {
      // Clear the flag
      sessionStorage.removeItem('pageTransition');
      
      const overlay = createTransitionOverlay();
      const mainContent = document.querySelector('.main');
      const header = document.querySelector('.header');
      
      // Start with overlay fully visible
      overlay.style.opacity = '1';
      overlay.style.transform = 'scale(1)';
      
      // Hide content initially
      if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'scale(0.8)';
      }
      if (header) {
        header.style.opacity = '0';
        header.style.transform = 'scale(0.8)';
      }
      
      // Start zoom in animation
      requestAnimationFrame(() => {
        // Shrink overlay away
        overlay.classList.add('zoom-in-active');
        
        // Zoom in page content
        setTimeout(() => {
          if (mainContent) {
            mainContent.classList.add('page-transition-zoom-in');
            mainContent.style.opacity = '';
            mainContent.style.transform = '';
          }
          if (header) {
            header.classList.add('page-transition-zoom-in');
            header.style.opacity = '';
            header.style.transform = '';
          }
        }, 100);
      });
      
      // Clean up after animation and trigger AOS animations
      setTimeout(() => {
        overlay.classList.remove('zoom-in-active');
        overlay.style.opacity = '';
        overlay.style.transform = '';
        if (mainContent) {
          mainContent.classList.remove('page-transition-zoom-in');
        }
        if (header) {
          header.classList.remove('page-transition-zoom-in');
        }
        
        // Trigger AOS refresh to play animations
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      }, 800);
    }
  }

  // Intercept navigation clicks
  function interceptNavigation() {
    // Get all links that navigate to other HTML pages
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
      // Skip links that are already handled or external
      if (link.hasAttribute('data-transition-disabled')) {
        return;
      }
      
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only intercept if it's a navigation to another page (not hash links or external)
        if (href && 
            !href.startsWith('#') && 
            !href.startsWith('http://') && 
            !href.startsWith('https://') &&
            !this.hasAttribute('target')) {
          
          e.preventDefault();
          transitionToPage(href);
        }
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      handlePageLoad();
      interceptNavigation();
    });
  } else {
    handlePageLoad();
    interceptNavigation();
  }
})();