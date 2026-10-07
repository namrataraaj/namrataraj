const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const topic = document.getElementById('topic').value;
  const message = document.getElementById('message').value.trim();

  const text = [
    'Hello Namrata, I would like to connect.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || 'Not provided'}`,
    `Topic: ${topic}`,
    `Message: ${message}`
  ].join('\n');

  const url = `https://wa.me/918404971560?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
});

// ===== CLIENT FEEDBACK LIGHTBOX =====
const feedbackButtons = Array.from(document.querySelectorAll('[data-lightbox="feedback"]'));
const lightbox = document.getElementById('feedbackLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.querySelector('.lightbox-close');
const prevLightbox = document.querySelector('.lightbox-arrow.prev');
const nextLightbox = document.querySelector('.lightbox-arrow.next');
let feedbackIndex = 0;

function showFeedback(index){
  if (!feedbackButtons.length) return;
  feedbackIndex = (index + feedbackButtons.length) % feedbackButtons.length;
  const src = feedbackButtons[feedbackIndex].dataset.image;
  const img = feedbackButtons[feedbackIndex].querySelector('img');
  lightboxImage.src = src;
  lightboxImage.alt = img ? img.alt : 'Client feedback';
}
function openFeedback(index){
  showFeedback(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeFeedback(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  lightboxImage.src='';
}
feedbackButtons.forEach((button,index)=>button.addEventListener('click',()=>openFeedback(index)));
closeLightbox?.addEventListener('click',closeFeedback);
prevLightbox?.addEventListener('click',()=>showFeedback(feedbackIndex-1));
nextLightbox?.addEventListener('click',()=>showFeedback(feedbackIndex+1));
lightbox?.addEventListener('click',(e)=>{if(e.target===lightbox)closeFeedback();});
document.addEventListener('keydown',(e)=>{
  if(!lightbox?.classList.contains('open')) return;
  if(e.key==='Escape')closeFeedback();
  if(e.key==='ArrowLeft')showFeedback(feedbackIndex-1);
  if(e.key==='ArrowRight')showFeedback(feedbackIndex+1);
});

// ===== CERTIFICATE LIGHTBOX =====
const certificateButtons = Array.from(document.querySelectorAll('.certificate-card'));
const certificateLightbox = document.getElementById('certificateLightbox');
const certificateImage = document.getElementById('certificateLightboxImage');
const certificateCaption = document.getElementById('certificateLightboxCaption');
const certificateClose = document.querySelector('.certificate-lightbox-close');
const certificatePrev = document.querySelector('.certificate-lightbox-arrow.prev');
const certificateNext = document.querySelector('.certificate-lightbox-arrow.next');
let certificateIndex = 0;

function showCertificate(index){
  if (!certificateButtons.length) return;
  certificateIndex = (index + certificateButtons.length) % certificateButtons.length;
  const card = certificateButtons[certificateIndex];
  const img = card.querySelector('img');
  certificateImage.src = img?.src || '';
  certificateImage.alt = img?.alt || 'Certificate';
  certificateCaption.textContent = card.querySelector('.certificate-meta strong')?.textContent || 'Certificate';
}
function openCertificate(index){
  showCertificate(index);
  certificateLightbox.classList.add('open');
  certificateLightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeCertificate(){
  certificateLightbox.classList.remove('open');
  certificateLightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  certificateImage.src='';
}
certificateButtons.forEach((card,index)=>card.addEventListener('click',()=>openCertificate(index)));
certificateClose?.addEventListener('click',closeCertificate);
certificatePrev?.addEventListener('click',()=>showCertificate(certificateIndex-1));
certificateNext?.addEventListener('click',()=>showCertificate(certificateIndex+1));
certificateLightbox?.addEventListener('click',(e)=>{if(e.target===certificateLightbox)closeCertificate();});
document.addEventListener('keydown',(e)=>{
  if(!certificateLightbox?.classList.contains('open')) return;
  if(e.key==='Escape')closeCertificate();
  if(e.key==='ArrowLeft')showCertificate(certificateIndex-1);
  if(e.key==='ArrowRight')showCertificate(certificateIndex+1);
});

// ===== GALLERY LIGHTBOX =====
const galleryButtons = Array.from(document.querySelectorAll('.gallery-card'));
const galleryLightbox = document.getElementById('galleryLightbox');
const galleryLightboxImage = document.getElementById('galleryLightboxImage');
const galleryLightboxCaption = document.getElementById('galleryLightboxCaption');
const galleryClose = document.querySelector('.gallery-lightbox-close');
const galleryPrev = document.querySelector('.gallery-lightbox-arrow.prev');
const galleryNext = document.querySelector('.gallery-lightbox-arrow.next');
let galleryIndex = 0;

function showGalleryPhoto(index){
  if (!galleryButtons.length) return;
  galleryIndex = (index + galleryButtons.length) % galleryButtons.length;
  const card = galleryButtons[galleryIndex];
  const img = card.querySelector('img');
  galleryLightboxImage.src = img?.src || '';
  galleryLightboxImage.alt = img?.alt || 'Gallery photo';
  galleryLightboxCaption.textContent = img?.alt || 'Gallery';
}
function openGalleryPhoto(index){
  showGalleryPhoto(index);
  galleryLightbox.classList.add('open');
  galleryLightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeGalleryPhoto(){
  galleryLightbox.classList.remove('open');
  galleryLightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  galleryLightboxImage.src='';
}
galleryButtons.forEach((button,index)=>button.addEventListener('click',()=>openGalleryPhoto(index)));
galleryClose?.addEventListener('click',closeGalleryPhoto);
galleryPrev?.addEventListener('click',()=>showGalleryPhoto(galleryIndex-1));
galleryNext?.addEventListener('click',()=>showGalleryPhoto(galleryIndex+1));
galleryLightbox?.addEventListener('click',(e)=>{if(e.target===galleryLightbox)closeGalleryPhoto();});
document.addEventListener('keydown',(e)=>{
  if(!galleryLightbox?.classList.contains('open')) return;
  if(e.key==='Escape')closeGalleryPhoto();
  if(e.key==='ArrowLeft')showGalleryPhoto(galleryIndex-1);
  if(e.key==='ArrowRight')showGalleryPhoto(galleryIndex+1);
});
