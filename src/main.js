import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
  } from './js/render-functions.js';
  
  import { getImagesByQuery } from './js/pixabay-api.js';
  
  import iziToast from 'izitoast';
  import 'izitoast/dist/css/iziToast.min.css';
  
  const form = document.querySelector('.form');
  const input = form.querySelector('input[type="text"]');
  const loadMoreBtn = document.querySelector('.load-more');
  
  let searchQuery = '';
  let page = 1;
  let totalHits = 0;
  
  form.addEventListener('submit', async e => {
    e.preventDefault();
  
    searchQuery = input.value.trim();
    if (searchQuery === '') {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search query.',
        position: 'topRight',
      });
      return;
    }
  
    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();
  
    try {
      const { hits, totalHits: total } = await getImagesByQuery(
        searchQuery,
        page
      );
      totalHits = total;
  
      if (hits.length === 0) {
        iziToast.info({
          title: 'No Results',
          message: 'Sorry, there are no images matching your search query.',
          position: 'topRight',
        });
        return;
      }
  
      createGallery(hits);
      if (hits.length < totalHits) {
        showLoadMoreButton();
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
      console.error(error);
    } finally {
      hideLoader();
    }
  
    form.reset();
  });
  
  loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    showLoader();
  
    try {
      const { hits } = await getImagesByQuery(searchQuery, page);
      createGallery(hits);
  
      smoothScroll();
  
      if (page * 15 >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          title: 'End',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong while loading more images.',
        position: 'topRight',
      });
      console.error(error);
    } finally {
      hideLoader();
    }
  });
  
  function smoothScroll() {
    const { height: cardHeight } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }