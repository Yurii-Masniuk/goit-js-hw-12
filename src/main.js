import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from "./js/render-functions";

const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

form.addEventListener("submit", onFormSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);

async function fetchImages(page) {
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    const { hits, totalHits: hitsTotal } = data;

    if (page === 1) {
      totalHits = hitsTotal;
      clearGallery();
      if (hits.length === 0) {
        iziToast.error({
          title: "No results",
          message: "Sorry, there are no images matching your search query.",
        });
        return;
      }
      iziToast.success({
        title: "Success",
        message: `We found ${totalHits} images.`,
      });
    }

    createGallery(hits);

    const galleryItemsCount = document.querySelectorAll(".gallery li").length;
    if (galleryItemsCount < totalHits) {
      showLoadMoreButton();
    } else if (galleryItemsCount >= totalHits && page > 1) {
      iziToast.info({
        title: "End of results",
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (err) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
    });
    console.error(err);
  } finally {
    hideLoader();
  }
}

async function onFormSubmit(e) {
  e.preventDefault();
  const query = e.target.elements["search-text"].value.trim();
  if (!query) {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query!",
    });
    return;
  }
  currentQuery = query;
  currentPage = 1;
  await fetchImages(currentPage);
  form.reset();
}

async function onLoadMore() {
  currentPage += 1;
  await fetchImages(currentPage);
  smoothScroll();
}

function smoothScroll() {
  const firstCard = document.querySelector(".gallery li");
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}