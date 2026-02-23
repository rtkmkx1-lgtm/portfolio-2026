document.addEventListener('DOMContentLoaded', () => {
  const rotator = document.querySelector('.rotator');
  if (!rotator) return;

  // Accessibility: announce changes to screen readers
  rotator.setAttribute('aria-live', 'polite');

  let roles = [];
  try {
    roles = JSON.parse(rotator.getAttribute('data-roles'));
  } catch (e) {
    // invalid JSON
  }
  if (!Array.isArray(roles) || roles.length === 0) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  const transitionTime = 560; // must match CSS transition duration (ms)
  const intervalTime = 2500; // time each role is visible (ms)

  const showRole = (i) => {
    if (prefersReduced) {
      rotator.textContent = roles[0];
      return;
    }

    // fade out (opacity + translate), change text, fade in — no layout reflow
    rotator.classList.add('rotator--hidden');
    setTimeout(() => {
      rotator.textContent = roles[i];
      rotator.classList.remove('rotator--hidden');
    }, transitionTime);
  };

  // initialize
  showRole(0);

  if (!prefersReduced) {
    setInterval(() => {
      index = (index + 1) % roles.length;
      showRole(index);
    }, intervalTime);
  }


  // Experience: Load more + persistent 'Show less' button
  const loadMoreBtn = document.getElementById('load-more-experience-test');
  const collapseBtn = document.getElementById('collapse-experience-test');
  if (loadMoreBtn) {
    const expCards = Array.from(document.querySelectorAll('#exp-grid-test .exp-card'));
    const INITIAL_VISIBLE = 3;
    let visibleCount = INITIAL_VISIBLE;

    const showCards = (count) => {
      expCards.forEach((card, i) => {
        if (i < count) card.classList.remove('hidden');
        else card.classList.add('hidden');
      });
    };

    const updateButtons = () => {
      // If total <= initial, hide both
      if (expCards.length <= INITIAL_VISIBLE) {
        loadMoreBtn.style.display = 'none';
        if (collapseBtn) collapseBtn.style.display = 'none';
        return;
      }

      // Show/Hide Load more
      if (visibleCount >= expCards.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-block';
      }

      // Show/Hide Collapse (Show less)
      if (visibleCount > INITIAL_VISIBLE) {
        if (collapseBtn) collapseBtn.style.display = 'inline-block';
        if (collapseBtn) collapseBtn.setAttribute('aria-expanded','true');
      } else {
        if (collapseBtn) collapseBtn.style.display = 'none';
        if (collapseBtn) collapseBtn.setAttribute('aria-expanded','false');
      }
    };

    // initialize
    showCards(visibleCount);
    updateButtons();

    loadMoreBtn.addEventListener('click', () => {
      visibleCount = Math.min(expCards.length, visibleCount + 3);
      showCards(visibleCount);
      updateButtons();
    });

    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        visibleCount = INITIAL_VISIBLE;
        showCards(visibleCount);
        updateButtons();
        // move focus back to Load more for accessibility
        loadMoreBtn.focus();
      });
    }
  }

  // Projects: Load more + Show less (initial 3)
  const loadMoreProjectsBtn = document.getElementById('load-more-projects-test');
  const collapseProjectsBtn = document.getElementById('collapse-projects-test');
  if (loadMoreProjectsBtn) {
    const projectCards = Array.from(document.querySelectorAll('#projects-test .projects-grid .project-card'));
    const PROJ_INITIAL = 3;
    let projVisible = PROJ_INITIAL;

    const showProjectCards = (count) => {
      projectCards.forEach((card, i) => {
        if (i < count) card.classList.remove('hidden');
        else card.classList.add('hidden');
      });
    }; 

    const updateProjectButtons = () => {
      if (projectCards.length <= PROJ_INITIAL) {
        loadMoreProjectsBtn.style.display = 'none';
        if (collapseProjectsBtn) collapseProjectsBtn.style.display = 'none';
        return;
      }

      if (projVisible >= projectCards.length) {
        loadMoreProjectsBtn.style.display = 'none';
      } else {
        loadMoreProjectsBtn.style.display = 'inline-block';
      }

      if (projVisible > PROJ_INITIAL) {
        if (collapseProjectsBtn) {
          collapseProjectsBtn.style.display = 'inline-block';
          collapseProjectsBtn.setAttribute('aria-expanded','true');
        }
      } else {
        if (collapseProjectsBtn) {
          collapseProjectsBtn.style.display = 'none';
          collapseProjectsBtn.setAttribute('aria-expanded','false');
        }
      }
    };

    // initialize
    showProjectCards(projVisible);
    updateProjectButtons();

    loadMoreProjectsBtn.addEventListener('click', () => {
      projVisible = Math.min(projectCards.length, projVisible + 3);
      showProjectCards(projVisible);
      updateProjectButtons();
    });

    if (collapseProjectsBtn) {
      collapseProjectsBtn.addEventListener('click', () => {
        projVisible = PROJ_INITIAL;
        showProjectCards(projVisible);
        updateProjectButtons();
        loadMoreProjectsBtn.focus();
      });
    }
  }

  // Marketing: Load more + Show less (initial 3)
  const loadMoreMarketingBtn = document.getElementById('load-more-marketing-test');
  const collapseMarketingBtn = document.getElementById('collapse-marketing-test');
  if (loadMoreMarketingBtn) {
    const marketingCards = Array.from(document.querySelectorAll('#projects-test .marketing-grid .proj-alt-card'));
    const MARKETING_INITIAL = 3;
    let mVisible = MARKETING_INITIAL;

    const showMarketingCards = (count) => {
      marketingCards.forEach((card, i) => {
        if (i < count) card.classList.remove('hidden');
        else card.classList.add('hidden');
      });
    };

    const updateMarketingButtons = () => {
      if (marketingCards.length <= MARKETING_INITIAL) {
        loadMoreMarketingBtn.style.display = 'none';
        if (collapseMarketingBtn) collapseMarketingBtn.style.display = 'none';
        return;
      }

      // Toggle Load more visibility
      if (mVisible >= marketingCards.length) {
        loadMoreMarketingBtn.style.display = 'none';
        loadMoreMarketingBtn.setAttribute('aria-expanded','true');
      } else {
        loadMoreMarketingBtn.style.display = 'inline-block';
        loadMoreMarketingBtn.setAttribute('aria-expanded','false');
      }

      // Toggle Show less visibility
      if (mVisible > MARKETING_INITIAL) {
        if (collapseMarketingBtn) {
          collapseMarketingBtn.style.display = 'inline-block';
          collapseMarketingBtn.setAttribute('aria-expanded','true');
        }
      } else {
        if (collapseMarketingBtn) {
          collapseMarketingBtn.style.display = 'none';
          collapseMarketingBtn.setAttribute('aria-expanded','false');
        }
      }
    };

    // initialize
    showMarketingCards(mVisible);
    updateMarketingButtons();

    loadMoreMarketingBtn.addEventListener('click', () => {
      mVisible = Math.min(marketingCards.length, mVisible + 3);
      showMarketingCards(mVisible);
      updateMarketingButtons();
    });

    if (collapseMarketingBtn) {
      collapseMarketingBtn.addEventListener('click', () => {
        mVisible = MARKETING_INITIAL;
        showMarketingCards(mVisible);
        updateMarketingButtons();
        loadMoreMarketingBtn.focus();
      });
    }
  }

  // GIF behavior: lazy-generate a thumbnail (cover) when the card enters the viewport, and play GIF on hover
  const gifWrappers = Array.from(document.querySelectorAll('.gif-wrapper'));

  const lazyLoadThumb = (img) => {
    const gifUrl = img.getAttribute('data-gif');
    if (!gifUrl || img.dataset.thumbReady) return;
    const buffer = new Image();
    buffer.crossOrigin = 'anonymous';
    buffer.src = gifUrl;

    buffer.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = buffer.naturalWidth || img.width || 320;
        canvas.height = buffer.naturalHeight || img.height || 180;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(buffer, 0, 0);
        const thumb = canvas.toDataURL('image/png');
        img.dataset.thumb = thumb;
        img.src = thumb;
      } catch (e) {
        // fallback to using the GIF itself as the "thumb"
        img.dataset.thumb = gifUrl;
        img.src = gifUrl;
      } finally {
        img.dataset.thumbReady = '1';
      }
    };

    buffer.onerror = () => {
      img.dataset.thumb = gifUrl;
      img.src = gifUrl;
      img.dataset.thumbReady = '1';
    };
  };

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector('.gif-hover');
          if (img) lazyLoadThumb(img);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    gifWrappers.forEach(w => obs.observe(w));
  } else {
    // Fallback: load immediately
    gifWrappers.forEach(w => {
      const img = w.querySelector('.gif-hover');
      if (img) lazyLoadThumb(img);
    });
  }

  // Play GIF on hover and revert to thumbnail on leave
  gifWrappers.forEach(wrapper => {
    const img = wrapper.querySelector('.gif-hover');
    if (!img) return;

    // Ensure pointer affordance
    wrapper.style.cursor = 'pointer';

    wrapper.addEventListener('mouseenter', () => {
      const gifUrl = img.getAttribute('data-gif');
      if (!gifUrl) return;
      // Swap to gif (this will trigger browser to fetch it if not cached)
      if (img.src !== gifUrl) img.src = gifUrl;
    });

    wrapper.addEventListener('mouseleave', () => {
      if (img.dataset.thumb) img.src = img.dataset.thumb;
    });
  });

  // Expose global helpers — used by inline handlers as a reliable fallback
  window.revealMoreMarketing = function(e, btn, count = 3) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const isTest = (btn && btn.id && btn.id.includes('-test')) || (btn && btn.closest && !!btn.closest('#projects-test'));
    const root = document.querySelector(isTest ? '#projects-test' : '#projects') || document;
    const grid = root.querySelector('.marketing-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.proj-alt-card'));
    const hidden = cards.filter(c => c.classList.contains('hidden'));
    for (let i = 0; i < Math.min(count, hidden.length); i++) hidden[i].classList.remove('hidden');
    // update buttons
    if (grid.querySelectorAll('.proj-alt-card.hidden').length === 0) {
      if (btn) btn.style.display = 'none';
      const collapseId = (btn && btn.id) ? btn.id.replace('load-more','collapse') : null;
      const collapseBtn = collapseId ? document.getElementById(collapseId) : null;
      if (collapseBtn) collapseBtn.style.display = 'inline-block';
    }
  };

  window.collapseMarketing = function(e, btn) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const isTest = (btn && btn.id && btn.id.includes('-test')) || (btn && btn.closest && !!btn.closest('#projects-test'));
    const root = document.querySelector(isTest ? '#projects-test' : '#projects') || document;
    const grid = root.querySelector('.marketing-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.proj-alt-card'));
    // collapse to first 3
    cards.forEach((c, i) => {
      if (i < 3) c.classList.remove('hidden');
      else c.classList.add('hidden');
    });
    // update buttons
    const loadId = (btn && btn.id) ? btn.id.replace('collapse','load-more') : null;
    const loadBtn = loadId ? document.getElementById(loadId) : null;
    if (loadBtn) loadBtn.style.display = 'inline-block';
    if (btn) btn.style.display = 'none';
  };

  // Fallback: ensure any "Load more" for marketing grids works even if selectors change or script ordering differs
  document.querySelectorAll('[id^="load-more-marketing"]').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      // prefer global helper
      if (typeof window.revealMoreMarketing === 'function') return window.revealMoreMarketing(ev, btn, 3);
    });
  });

  // Power BI horizontal carousel controls (test page)
  const powerbiGrid = document.querySelector('#projects-test .projects-grid.powerbi-scroll');
  const pbLeft = document.getElementById('powerbi-scroll-left');
  const pbRight = document.getElementById('powerbi-scroll-right');
  const pbUp = document.getElementById('powerbi-scroll-up'); // fallback
  const pbDown = document.getElementById('powerbi-scroll-down');
  if (powerbiGrid && (pbLeft || pbRight || pbUp || pbDown)) {
    const card = powerbiGrid.querySelector('.project-card');
    const step = Math.max(card?.offsetWidth || 320, 320);
    const scrollAmount = Math.round(step * 0.9);
    if (pbRight) pbRight.addEventListener('click', () => powerbiGrid.scrollBy({left: scrollAmount, behavior: 'smooth'}));
    if (pbLeft) pbLeft.addEventListener('click', () => powerbiGrid.scrollBy({left: -scrollAmount, behavior: 'smooth'}));
    // backward-compatible vertical buttons -> use horizontal scroll
    if (pbDown) pbDown.addEventListener('click', () => powerbiGrid.scrollBy({left: scrollAmount, behavior: 'smooth'}));
    if (pbUp) pbUp.addEventListener('click', () => powerbiGrid.scrollBy({left: -scrollAmount, behavior: 'smooth'}));

    // keyboard support
    powerbiGrid.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') powerbiGrid.scrollBy({left: scrollAmount, behavior: 'smooth'});
      if (e.key === 'ArrowLeft') powerbiGrid.scrollBy({left: -scrollAmount, behavior: 'smooth'});
    });
    // ensure the grid is focusable
    powerbiGrid.tabIndex = 0;
  }

});