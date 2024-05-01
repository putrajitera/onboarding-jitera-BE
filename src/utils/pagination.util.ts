export const generatePagination = (page: number, total: number, limit: number) => {
  const totalPage = Math.ceil(total / limit);

  return {
    currentPage: page,
    nextPage: page < totalPage ? page + 1 : 0,
    prevPage: page - 1,
    totalPage,
    totalData: total,
    limit,
  };
}