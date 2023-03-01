import ReactPaginate from "react-paginate";
import { Image, Images } from "./images";

export type PaginatedImagesProps = {
    images: Array<Image>,
    fetchImagesCb: Function,
    pageCount: number
}
export function PaginatedImages({ images, fetchImagesCb, pageCount }: PaginatedImagesProps) {
    const handlePageClick = (event: { selected: number; }) => {
        fetchImagesCb(event.selected + 1);
    };

    return (
        <div className="image-container">
            <Images images={images} />
            <ReactPaginate
                className="paginate"
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    );
}