import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox(".gallery a", {
 captionsData: "alt",
 captionDelay: 250,
});

export function createGallery(images) {
 const markup = images
 .map(
 ({
 webformatURL,
 largeImageURL,
 tags,
 likes,
 views,
 comments,
 downloads,
 }) => `
 <li>
 <a href="${largeImageURL}">
 <img src="${webformatURL}" alt="${tags}" />
 </a>
 <div class="info">
 <p>Likes: ${likes}</p>
 <p>Views: ${views}</p>
 <p>Comments: ${comments}</p>
 <p>Downloads: ${downloads}</p>
 </div>
 </li>
 `
 )
 .join("");

 galleryEl.insertAdjacentHTML("beforeend", markup);
 lightbox.refresh();
}

export function clearGallery() {
 galleryEl.innerHTML = "";
}

export function showLoader() {
 loaderEl.classList.remove("hidden");
}

export function hideLoader() {
 loaderEl.classList.add("hidden");
}

export function showLoadMoreButton() {
 loadMoreBtn.classList.remove("hidden");
}

export function hideLoadMoreButton() {
 loadMoreBtn.classList.add("hidden");
}