interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex justify-center space-x-2 py-4">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 disabled:opacity-50"
        >
            Previous
        </button>
        <span className="flex items-center px-4">
            Page {currentPage} of {totalPages}
        </span>
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 disabled:opacity-50"
        >
            Next
        </button>
        </div>
    );
}