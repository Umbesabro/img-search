'use client';

import axios from 'axios';
import { CSSProperties, useState } from 'react';
import { RingLoader } from 'react-spinners';
import { Image } from './images/images';
import { PaginatedImages } from './images/paginated-images';

const override: CSSProperties = {
  display: "block",
  paddingTop: "25px",
  margin: "0 auto",
  marginTop: "30px",
  borderColor: "red",
};

type SearchResponse = { data: { results: [Image], total: number, total_pages: number }, };

export default function Home() {
  const itemsPerPage: number = 6;
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  const fetchImages = async (pageNumber: number = 1) => {
    try {
      if (query && query !== '') {
        setImages([]);
        setLoading(true);
        setFailed(false);
        const response: SearchResponse = await axios.get(`/api/photos/search?query=${query}&page=${pageNumber}&per_page=${itemsPerPage}`);
        setLoading(false);
        setImages(response.data.results);
        setPageCount(response.data.total_pages);
      }
    } catch (err) {
      setLoading(false);
      setFailed(true);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="container">
      <h1>Image search</h1>
      <div className="form">
        <input type="text" value={query} onChange={handleInputChange} />
        <button onClick={() => fetchImages()}>Search</button>
      </div>
      <RingLoader
        color={"#4262ff"}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="paginate">
        {images.length && !failed ? <PaginatedImages
          images={images}
          fetchImagesCb={fetchImages}
          pageCount={pageCount}
        /> : null}
      </div>
      {failed ? <p>Failed to fetch images</p> : null}
    </div>
  )
}
