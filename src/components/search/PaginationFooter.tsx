import { Dispatch, SetStateAction } from 'react';

interface Props {
  count: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const ITEMS_PER_PAGE = 8;

const PaginationFooter = ({ count, page, setPage }: Props) => {
  const maxPageNumber = Math.ceil(count / ITEMS_PER_PAGE);

  const _nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const _prevPage = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <button
        type="button"
        className="self-start search-button__load-more"
        onClick={_prevPage}
        disabled={page === 0}
      >
        Prev Page
      </button>
      {/* TODO: change the below to warning / prompt instead of page 0 of 0 */}
      Page {count > 0 ? page + 1 : 0} of {maxPageNumber}
      <button
        type="button"
        className="self-end search-button__load-more"
        onClick={_nextPage}
        disabled={page === maxPageNumber}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginationFooter;
