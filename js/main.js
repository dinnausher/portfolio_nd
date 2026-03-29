const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.pf-card');
if (filterBtns.length && projectCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

const sbFills = document.querySelectorAll('.sb-fill');
if (sbFills.length) {
  const widths = Array.from(sbFills).map(el => el.style.width);
  sbFills.forEach(el => { el.style.width = '0'; });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sbFills.forEach((el, i) => {
          setTimeout(() => { el.style.width = widths[i]; }, i * 100);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const skillsSection = document.querySelector('.skills-section');
  if (skillsSection) observer.observe(skillsSection);
}

const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length) {
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });
  timelineItems.forEach(item => tlObserver.observe(item));
}

const pfCards = document.querySelectorAll('.pf-card, .project-card, .snap-card');
if (pfCards.length) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 60 * i);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  pfCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
  });
}
