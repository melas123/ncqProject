var knexfile = require("../../knexfile");
var knex = require("knex")(knexfile);

filterArray = arr => {
  let filtredArray = arr.filter(function(elm) {
    return elm !== "";
  });
  return filtredArray;
};

const postWorkflows = (req, res, next) => {
  let status = req.body.status;
  let name = req.body.name;
  let categories = req.body.categories;

  let query = knex.select().table("workflows");

  if (name) {
    query.where("name", name);
  }

  if (categories && filterArray(categories).length > 0) {
    query.whereIn("category", categories);
  }

  if (status) {
    query.where("enabled", status);
  }

  // execute query
  query
    .then(function(collection) {
      res.json({
        error: false,
        data: collection
      });
    })
    .catch(function(err) {
      res.status(500).json({
        error: true,
        data: {
          message: err.message
        }
      });
    });
};

module.exports = postWorkflows;
