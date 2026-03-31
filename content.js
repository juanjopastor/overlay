const OVERLAY_ID = 'chrome-overlay-box';

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  overlay.tabIndex = 0;
  overlay.innerHTML = `
    <div class="overlay-header">
      <span>Overlay Box</span>
      <button class="overlay-close" title="Close overlay">×</button>
    </div>
    <div class="overlay-handle" data-direction="se"></div>
  `;
  overlay.className = 'overlay-box overlay-hidden';
  document.body.appendChild(overlay);

  let isDragging = false;
  let isResizing = false;
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;
  let startLeft = 0;
  let startTop = 0;

  const handle = overlay.querySelector('.overlay-handle');
  const closeButton = overlay.querySelector('.overlay-close');

  closeButton.addEventListener('click', (event) => {
    overlay.classList.add('overlay-hidden');
    event.stopPropagation();
  });

  overlay.addEventListener('pointerdown', (event) => {
    if (event.target.closest('.overlay-close')) {
      return;
    }

    if (event.target === handle) {
      isResizing = true;
      startX = event.clientX;
      startY = event.clientY;
      startWidth = overlay.offsetWidth;
      startHeight = overlay.offsetHeight;
    } else {
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
      startLeft = parseFloat(getComputedStyle(overlay).left);
      startTop = parseFloat(getComputedStyle(overlay).top);
    }

    overlay.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  document.addEventListener('pointermove', (event) => {
    if (isDragging) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const newLeft = Math.max(0, Math.min(window.innerWidth - overlay.offsetWidth, startLeft + dx));
      const newTop = Math.max(0, Math.min(window.innerHeight - overlay.offsetHeight, startTop + dy));
      overlay.style.left = `${newLeft}px`;
      overlay.style.top = `${newTop}px`;
    }
    if (isResizing) {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const maxWidth = window.innerWidth - startLeft;
      const maxHeight = window.innerHeight - startTop;
      overlay.style.width = `${Math.max(120, Math.min(maxWidth, startWidth + dx))}px`;
      overlay.style.height = `${Math.max(80, Math.min(maxHeight, startHeight + dy))}px`;
    }
  });

  document.addEventListener('pointerup', () => {
    isDragging = false;
    isResizing = false;
  });

  return overlay;
}

function toggleOverlay() {
  let overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) {
    overlay = createOverlay();
  }
  overlay.classList.toggle('overlay-hidden');
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'toggle-overlay') {
    toggleOverlay();
    sendResponse({ status: 'ok' });
  }
});
