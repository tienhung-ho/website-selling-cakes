module.exports = (currentPage, paginationObject) => {

  if (currentPage) {
      paginationObject.currentPage = parseInt(currentPage)
  }
  
  paginationObject.skip = (paginationObject.currentPage - 1) * paginationObject.limit

  paginationObject.totalPage = Math.ceil(paginationObject.totalProducts / paginationObject.limit)
  return paginationObject
}
