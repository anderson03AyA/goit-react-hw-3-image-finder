import React, { useState, useEffect } from "react";
import { Notify } from "notiflix";
import axios from "axios";
import { myValue } from "./Key";
import "./ApiPixabay.css";
import PhotoCard from "../photoCard/photoCard";
import LoadMore from "../LoadMore/LoadMoreMagnifyingGlass";

const API_KEY = myValue;
const PER_PAGE = 12;

const ApiPixabay = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [photoCards, setPhotoCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchInputValue !== "") {
      setLoading(true);
      fetchResults();
    }
  }, [currentPage]);

  const handleSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleSendClick = async (event) => {
    event.preventDefault();
    if (searchInputValue === "") {
      Notify.warning("Input invalid");
    } else {
      setCurrentPage(1);
      setLoading(true);
      fetchResults();
    }
  };

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${searchInputValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${PER_PAGE}`
      );

      const { data } = response;
      if (parseInt(data.totalHits) > 0) {
        setTotalPages(Math.ceil(parseInt(data.totalHits) / PER_PAGE));
        const photoCards = data.hits.map((hit) => (
          <PhotoCard
            key={hit.id}
            img={hit.largeImageURL}
            likes={hit.likes}
            views={hit.views}
            comments={hit.comments}
            downloads={hit.downloads}
          />
        ));
        setPhotoCards(photoCards);
      } else {
        setTotalPages(0);
        setPhotoCards([]);
        Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Notify.failure("Error fetching data.");
    }
  };

  return (
    <>
      <div className="container-form">
        <form onSubmit={handleSendClick}>
          <input
            type="text"
            className="search"
            value={searchInputValue}
            onChange={handleSearchInputChange}
          />
          <button type="submit" className="send">
            Search
          </button>
          {loading && <LoadMore />}
        </form>
      </div>
      <div className="container-photo-cards">{photoCards}</div>

      <div className="container-pagination">
        <button onClick={handlePrevPageClick} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPageClick}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ApiPixabay;
