class APIFeatures {
  // query is a Model instance e.g. Product
  // queryStr is a request query object
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  /**
   * @desc Search for a document.
   * @returns document of query instance that matches keyword or all document if no keyword.
   */
  async search() {
    this.keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: 'i'
      }
    } : {}

    const result = await this.query.find({ ...this.keyword })
    return result
  }
}

module.exports = APIFeatures