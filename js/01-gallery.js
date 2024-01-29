import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryElement = document.querySelector('.gallery');
  const allGalleryItems = galleryItems.map(image => 
    `<li class = "gallery_item">
    <a class = "gallery_link" href = "${image.original}">
    <img
        class="gallery__image"
        src="${image.preview}" 
        alt="${image.description}"
        data-source="${image.original}"
    >
    </img>
    </a>
    </li>`
  ).join('');
galleryElement.insertAdjacentHTML('afterbegin', allGalleryItems); 

let lightboxInstance = null;

galleryElement.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const imageUrl = event.target.dataset.source;

    if (lightboxInstance) {
        lightboxInstance.close();
    }

    lightboxInstance = basicLightbox.create(`
    <img src="${imageUrl}" alt="Image description">
    `);

    lightboxInstance.show();

// Zamykanie okna z klawiatury
document.addEventListener('keydown', onKeyPress);
}

function onKeyPress(event) {
    if (event.key === 'Escape' && lightboxInstance) {
        lightboxInstance.close();
        lightboxInstance = null;
        document.removeEventListener('keydown', onKeyPress);
    }
}