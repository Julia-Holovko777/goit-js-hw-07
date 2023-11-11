import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");

const createGalleryItem = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image"
        src="${preview}"
        alt="${description}" />
    </a>
    </li>
    `;
};

const galleryMarkup = galleryItems.map(createGalleryItem).join("");
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

galleryList.addEventListener("click", (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.classList.contains("gallery__image")) {
    const originalUrl = target.getAttribute("src");
    const instance = basicLightbox.create(
      `<img src="${originalUrl}" alt="Image" />`,
      {
        onShow: () => {
          window.addEventListener("keydown", onKeydownEsc);
        },
        onClose: () => {
          window.removeEventListener("keydown", onKeydownEsc);
        },
      }
    );
    function closeLightbox() {
      instance.close();
    }
    function onKeydownEsc(event) {
      if (event.key === "Escape") {
        closeLightbox();
      }
    }
    instance.show();
  }
});

console.log(galleryItems);
