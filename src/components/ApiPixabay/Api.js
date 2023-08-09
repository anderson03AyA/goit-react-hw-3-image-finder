import React from 'react'
import { Key } from 'react'

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${searchInputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${PER_PAGE}`
      );

      const { data } = response;
      if (parseInt(data.totalHits) > 0) {
        setTotalPages(Math.ceil(parseInt(data.totalHits) / PER_PAGE));
        const photoCards = data.hits.map((hit, index) =>
          renderPhotoCard(
            hit.largeImageURL,
            index
          )
        );
        setPhotoCards(photoCards);
        setVisibleArray(new Array(photoCards.length).fill(false));
      } else {
        setTotalPages(0);
        setPhotoCards([]);
        setVisibleArray([]);
        Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        );
      }
    } catch (error) {
      Notify.failure("Error fetching data.");
    }
  }; 

export default Api
