/* ============================================================
   ASTROVE TECHNOLOGY — JS v2 (Light Mode Only)
============================================================ */

/* ── LOADER ── */
(function () {
  document.body.style.overflow = 'hidden';
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  const loader = document.getElementById('loader');
  let progress = 0;
  const interval = setInterval(() => {
    const step = Math.random() * 12 + 3;
    progress = Math.min(progress + step, 98);
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
  }, 100);

  window.addEventListener('load', () => {
    clearInterval(interval);
    bar.style.width = '100%';
    pct.textContent = '100%';
    setTimeout(() => {
      loader.classList.add('out');
      document.body.style.overflow = '';
      document.querySelectorAll('.hero .reveal').forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), i * 80);
      });
    }, 400);
  });
})();

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (cursor && cursorDot) {
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top = my + 'px';
  });

  function animateCursor() {
    cx += (mx - cx) * 0.14;
    cy += (my - cy) * 0.14;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .pm-card, .svc-row, .proc-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.classList.contains('open');
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* Tutup menu kalau klik di luar */
document.addEventListener('click', (e) => {
  if (
    navLinks?.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('in'), delay);
    revealObs.unobserve(el);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  if (!el.closest('.hero')) revealObs.observe(el);
});

/* ── COUNTER ANIMATION ── */
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count);
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * target);
      if (t < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    countObs.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.sb-num').forEach(el => countObs.observe(el));

/* ── PORTFOLIO FILTERS ── */
const pfBtns = document.querySelectorAll('.pf-btn');
const pmCards = document.querySelectorAll('.pm-card');

pfBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pfBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    pmCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      if (match) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.4s, transform 0.4s';
          card.style.opacity = '1';
          card.style.transform = '';
        });
      } else {
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

/* ── PORTFOLIO MODAL ── */
const projects = [
  {
    title: 'Website UMKM Kuliner',
    tag: 'Landing Page',
    desc: 'Landing page modern untuk bisnis kuliner lokal dengan katalog menu, galeri produk, informasi lokasi, dan integrasi WhatsApp untuk meningkatkan pemesanan pelanggan.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap']
  },
  {
    title: 'Exelio Code Solution',
    tag: 'Website Perusahaan',
    desc: 'Website company profile profesional untuk menampilkan layanan, portofolio, profil perusahaan, dan informasi kontak dalam tampilan yang modern dan responsif.',
    stack: ['Laravel', 'PHP', 'Bootstrap', 'MySQL']
  },
  {
    title: 'Sistem Kasir Coffee Shop',
    tag: 'Sistem Informasi',
    desc: 'Aplikasi kasir berbasis web untuk mengelola pesanan, transaksi, produk, dan laporan penjualan harian sehingga operasional coffee shop menjadi lebih efisien.',
    stack: ['Laravel', 'PHP', 'Bootstrap', 'MySQL']
  },
  {
    title: 'Landing Page Jasa Renovasi',
    tag: 'Landing Page',
    desc: 'Website promosi untuk usaha renovasi rumah dengan galeri proyek, daftar layanan, testimoni pelanggan, dan formulir konsultasi online.',
    stack: ['Tailwind CSS', 'JavaScript', 'HTML', 'CSS']
  },
  {
    title: 'Website Profil Kontraktor',
    tag: 'Website Perusahaan',
    desc: 'Website company profile untuk perusahaan konstruksi yang menampilkan layanan, pengalaman proyek, galeri pekerjaan, dan informasi kontak.',
    stack: ['Laravel', 'Bootstrap', 'PHP', 'MySQL']
  },
  {
    title: 'Sistem Informasi Event',
    tag: 'Sistem Informasi',
    desc: 'Platform manajemen event berbasis web untuk mengelola jadwal acara, pendaftaran peserta, dan informasi kegiatan secara terpusat dan efisien.',
    stack: ['Django', 'Python', 'HTML', 'CSS']
  }
];

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.pmc-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const p = projects[parseInt(btn.dataset.project)];
    modalContent.innerHTML = `
      <span class="mc-tag">${p.tag}</span>
      <h2>${p.title}</h2>
      <p>${p.desc}</p>
      <div class="mc-stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
    `;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── TESTIMONIALS ── */
const testiScroll = document.getElementById('testiScroll');
const testiDots = document.getElementById('testiDots');
const testiPrev = document.getElementById('testiPrev');
const testiNext = document.getElementById('testiNext');

if (testiScroll) {
  const tCards = testiScroll.querySelectorAll('.tc');
  let currentSlide = 0;
  let slidesPerView = getSpv();
  let total = Math.ceil(tCards.length / slidesPerView);
  let autoTimer;

  function getSpv() {
    if (window.innerWidth < 641) return 1;
    if (window.innerWidth < 901) return 2;
    return 3;
  }

  function buildDots() {
    testiDots.innerHTML = '';
    total = Math.ceil(tCards.length / slidesPerView);
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'tn-dot' + (i === currentSlide ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      testiDots.appendChild(d);
    }
  }

  function goTo(idx) {
    currentSlide = (idx + total) % total;
    const cardW = tCards[0].offsetWidth + 20;
    testiScroll.style.transform = `translateX(-${currentSlide * slidesPerView * cardW}px)`;
    testiDots.querySelectorAll('.tn-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(currentSlide + 1), 4000);
  }
  function stopAuto() { clearInterval(autoTimer); }

  testiPrev?.addEventListener('click', () => { goTo(currentSlide - 1); startAuto(); });
  testiNext?.addEventListener('click', () => { goTo(currentSlide + 1); startAuto(); });
  testiScroll.addEventListener('mouseenter', stopAuto);
  testiScroll.addEventListener('mouseleave', startAuto);

  let touchStartX = 0;
  testiScroll.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  testiScroll.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(currentSlide + (diff > 0 ? 1 : -1));
  });

  buildDots();
  startAuto();
  window.addEventListener('resize', () => {
    slidesPerView = getSpv();
    currentSlide = 0;
    buildDots();
    goTo(0);
  });
}

/* ── FAQ ACCORDION ── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.fq-btn').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

/* ── TEXT SCRAMBLE on hero title ── */
class Scramble {
  constructor(el) {
    this.el = el;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';
    this.original = el.dataset.text || el.textContent;
    this.frameReq = null;
  }
  run() {
    if (this.frameReq) cancelAnimationFrame(this.frameReq);
    let iteration = 0;
    const original = this.original;
    const el = this.el;
    const update = () => {
      el.textContent = original.split('').map((char, i) => {
        if (i < iteration) return original[i];
        if (char === ' ') return ' ';
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }).join('');
      iteration += 0.5;
      if (iteration < original.length) {
        this.frameReq = requestAnimationFrame(update);
      } else {
        el.textContent = original;
      }
    };
    update();
  }
}

window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.ht-line').forEach((el, i) => {
      if (el.dataset.text) {
        const s = new Scramble(el);
        setTimeout(() => s.run(), i * 200 + 400);
      }
    });
  }, 1200);
});

/* ── PARALLAX on hero rings ── */
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const r1 = document.querySelector('.r1');
  const r2 = document.querySelector('.r2');
  if (r1) r1.style.transform = `translateY(calc(-50% + ${y * 0.4}px)) rotate(${x}deg)`;
  if (r2) r2.style.transform = `translateY(calc(-50% + ${y * 0.7}px)) rotate(${-x}deg)`;
}, { passive: true });

/* ── CONTACT FAB ── */
const trigger = document.getElementById("contactTrigger");
const menu = document.getElementById("contactMenu");

trigger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

/* ── NAV ACTIVE ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nl');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}, { passive: true });