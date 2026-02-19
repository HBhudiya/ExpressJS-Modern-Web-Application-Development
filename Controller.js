class Controller {
  constructor(buildReadQuery, database) {
    this.buildReadQuery = buildReadQuery;
    this.database = database;
  }

  // Method
  get = async (req, res, variant) => {
    const sql = this.buildReadQuery(req, variant);
    try {
      const [result] = await this.database.query(sql);
      if (result.length === 0)
        res.status(404).json({ message: "No Record(s) Found" });
      else res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed To Execute Query: ${error.message}` });
    }
  };
}

export default Controller;
