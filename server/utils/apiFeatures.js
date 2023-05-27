class APIFeatures {
  // query is list of documents
  // queryStr is a request query object
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  /**
   * @desc Search for a document.
   * @returns document of query instance that matches keyword or all document if no keyword.
   */
  search() {
    this.keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: 'i'
      }
    } : {}

    this.query = this.query.find({ ...this.keyword })
    return this
  }


  filter() {
    const queryCopy = { ...this.queryStr }

    const removeFields = ["keyword", "limit", "page"]
    removeFields.forEach(field => delete queryCopy[field])

    // advance filter for price and rating fields
    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1
    const skip = resPerPage * (currentPage - 1)
    this.query = this.query.limit(resPerPage).skip(skip)
    return this
  }
}

module.exports = APIFeatures