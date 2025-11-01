import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show: 1, 2, current-1, current, current+1, ..., last
      if (currentPage <= 3) {
        // Show first 5 pages, ..., last
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first, ..., last 5 pages
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first, ..., current-1, current, current+1, ..., last
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = renderPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-[60px] h-10 rounded-[30px] border transition-colors ${
            currentPage === 1
              ? "bg-[#f9fbfc] border-textPrimary text-textPrimary cursor-not-allowed opacity-50"
              : "bg-[#f9fbfc] border-textPrimary text-textPrimary hover:bg-mainBg"
          }`}
        >
          <IoChevronBack size={12} />
        </button>

        <div className="flex items-center gap-2">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-10 h-10 flex items-center justify-center font-dm font-medium text-[15px] text-textPrimary"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-dm font-medium text-[15px] transition-colors ${
                  isActive
                    ? "bg-textPrimary text-white"
                    : "text-textPrimary hover:bg-mainBg"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Right arrow - Next page */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-[60px] h-10 rounded-[30px] border transition-colors ${
            currentPage === totalPages
              ? "bg-white border-grayBorder text-textPrimary cursor-not-allowed opacity-50"
              : "bg-white border-grayBorder text-textPrimary hover:bg-mainBg"
          }`}
        >
          <IoChevronForward size={12} />
        </button>
      </div>

      {/* Results text */}
      <p className="font-dm font-normal text-sm text-textPrimary leading-[26px]">
        Показаны результаты {startItem}-{endItem} из {totalItems}
      </p>
    </div>
  );
};

export default Pagination;