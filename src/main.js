import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {      
      if (!data.hits.length) {
        iziToast.info({
          title: 'No results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        form.reset();
        return;
      }

      createGallery(data.hits);
      setTimeout(hideLoader, 100);
      form.reset();
    })
    .catch(error => {      
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      })
      console.error(error);
      hideLoader();
    })
    });