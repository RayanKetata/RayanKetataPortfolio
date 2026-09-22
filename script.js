'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const typedName = document.querySelector('#typed-name');
const greeting = document.querySelector('.greeting');
const cursor = document.querySelector('.cursor');
let typingTimer;
function completeIntroduction() {
  clearTimeout(typingTimer);
  greeting.textContent = "Hi, I'm";
  typedName.textContent = 'Rayan Ketata.';
  cursor.classList.add('finished');
}
if (!reducedMotion.matches) {
  const introduction = "Hi, I'm Rayan Ketata.";
  let index = 0;
  greeting.innerHTML = '&nbsp;';
  typedName.textContent = '';
  function type() {
    index++;
    greeting.textContent = introduction.slice(0, Math.min(index, 7));
    typedName.textContent = index > 8 ? introduction.slice(8, index) : '';
    if (index < introduction.length) typingTimer = setTimeout(type, index === 7 ? 280 : 85);
    else typingTimer = setTimeout(completeIntroduction, 1400);
  }
  typingTimer = setTimeout(type, 250);
} else completeIntroduction();
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    completeIntroduction();
    document.querySelectorAll('.will-reveal').forEach(element => element.classList.add('visible'));
  }
});
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  if (!reducedMotion.matches) document.querySelectorAll('.reveal').forEach(element => {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('will-reveal');
      revealObserver.observe(element);
    }
  });
  const navigation = document.querySelectorAll('nav a');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) navigation.forEach(link => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-10% 0px -45% 0px' });
  document.querySelectorAll('main > section').forEach(section => sectionObserver.observe(section));
}
document.querySelector('#year').textContent = new Date().getFullYear();
let copyTimer;
document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText('rayanketata2@gmail.com');
    status.textContent = 'Copied!';
  } catch {
    status.textContent = 'Select the email address to copy it.';
  }
  copyTimer = setTimeout(() => { status.textContent = ''; }, 4000);
});
