import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@ui/pagination.ui";

import {TPagination} from "@containers/todo.container";

interface IProps {
  pagination: TPagination;
  setPagination: React.Dispatch<React.SetStateAction<TPagination>>;
}

export const PaginationComponent = (props: IProps) => {
  const totalPages = Math.ceil(props.pagination.itemCount / props.pagination.perPage);

  const isFirstPage = props.pagination.currentPage === 1;
  const isLastPage = props.pagination.currentPage === totalPages;

  const pagesDisplay = () => {
    switch (true) {
      case isFirstPage: {
        switch (totalPages) {
          case 1:
            return [1];

          case 2:
            return [1, 2];

          default:
            return [props.pagination.currentPage, props.pagination.currentPage + 1, props.pagination.currentPage + 2];
        }
      }

      case isLastPage: {
        return [props.pagination.currentPage - 2, props.pagination.currentPage - 1, props.pagination.currentPage];
      }

      default: {
        return [props.pagination.currentPage - 1, props.pagination.currentPage, props.pagination.currentPage + 1];
      }
    }
  };

  const pages = Array.from(pagesDisplay());

  const handlePageChange = (page: number) => {
    props.setPagination({
      ...props.pagination,
      currentPage: page < 1 ? 1 : page > totalPages ? totalPages : page
    });
  };

  return (
    <Pagination className="w-auto">
      <PaginationContent>
        {pages.map((page, index) => {
          return (
            <>
              {index === 0 && (
                <PaginationItem key={`pp_${index}`}>
                  <PaginationPrevious onClick={() => handlePageChange(props.pagination.currentPage - 1)} />
                </PaginationItem>
              )}
              {!pages.includes(1) && index === 0 && (
                <PaginationItem key={`pe1_${index}`}>
                  <PaginationEllipsis onClick={() => handlePageChange(props.pagination.currentPage - 3)} />
                </PaginationItem>
              )}
              <PaginationItem key={page}>
                <PaginationLink isActive={page === props.pagination.currentPage} onClick={() => handlePageChange(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
              {!pages.includes(totalPages) && index === 2 && (
                <PaginationItem key={`pe2_${index}`}>
                  <PaginationEllipsis onClick={() => handlePageChange(props.pagination.currentPage + 3)} />
                </PaginationItem>
              )}
              {index === pages.length - 1 && (
                <PaginationItem key={`pn_${index}`}>
                  <PaginationNext onClick={() => handlePageChange(props.pagination.currentPage + 1)} />
                </PaginationItem>
              )}
            </>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
