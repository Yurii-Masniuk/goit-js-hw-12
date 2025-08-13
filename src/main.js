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

const loadMoreBtn = document.createElement("button");
loadMoreBtn.type = "button";
loadMoreBtn.className = "load-more hidden";
loadMoreBtn.textContent = "Load More";
document.querySelector("main").appendChild(loadMoreBtn);

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

form.addEventListener("submit", onFormSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);

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
  clearGallery();
  hideLoadMoreButton();

  await fetchImages();
}

async function onLoadMore() {
  currentPage += 1;
  await fetchImages(true);
}

async function fetchImages(isLoadMore = false) {
  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits, totalHits: hitsTotal } = data;

    if (currentPage === 1) {
      totalHits = hitsTotal;
      if (hits.length === 0) {
        iziToast.error({
          title: "No results",
          message: "Sorry, there are no images matching your search query. Please try again!",
        });
        form.reset();
        return;
      }
      iziToast.success({
        title: "Success",
        message: `We found ${totalHits} images.`,
      });
    }

    createGallery(hits);
    form.reset();

    const loadedImages = currentPage * 15;
    if (loadedImages < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      if (isLoadMore) {
        iziToast.info({
          title: "End of results",
          message: "We're sorry, but you've reached the end of search results.",
        });
      }
    }

    if (isLoadMore) {
      smoothScroll();
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

function smoothScroll() {
  const firstCard = document.querySelector(".gallery li");
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}