// Task 2 animations: GSAP + IntersectionObserver
window.addEventListener('DOMContentLoaded', () => {
  // 1) Navbar slide-in on page load
  if (window.gsap) {
    gsap.from('.nav', {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  // 2) Button hover pulse (JS-driven; not pure CSS :hover)
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    let hoverTween;
    btn.addEventListener('mouseenter', () => {
      hoverTween && hoverTween.kill();
      hoverTween = gsap.to(btn, {
        duration: 0.25,
        scale: 1.04,
        y: -1,
        ease: 'power2.out'
      });
    });
    btn.addEventListener('mouseleave', () => {
      hoverTween && hoverTween.kill();
      hoverTween = gsap.to(btn, {
        duration: 0.25,
        scale: 1,
        y: 0,
        ease: 'power2.out'
      });
    });
    btn.addEventListener('mousedown', () => {
      gsap.to(btn, { duration: 0.12, scale: 0.98, ease: 'power2.in' });
    });
    btn.addEventListener('mouseup', () => {
      gsap.to(btn, { duration: 0.18, scale: 1.02, ease: 'power2.out' });
    });
    btn.addEventListener('blur', () => {
      gsap.to(btn, { duration: 0.2, scale: 1, y: 0, ease: 'power2.out' });
    });
  });

  // 3) Scroll-triggered fade-ins with IntersectionObserver + GSAP
  const revealEls = document.querySelectorAll('.reveal');

  const animateIn = (el) => {
    // Stagger children for nicer entrance
    const children = el.querySelectorAll('h2, p, ul, li, .container > *');
    if (children.length) {
      gsap.fromTo(children,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08
        }
      );
    } else {
      gsap.fromTo(el,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
    el.classList.add('revealed'); // base visible state
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
          animateIn(entry.target);
          observer.unobserve(entry.target); // run once
        }
      });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    revealEls.forEach(el => io.observe(el));
  } else {
    // Fallback: reveal immediately
    revealEls.forEach(el => animateIn(el));
  }
});
