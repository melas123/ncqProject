var knexfile = require("../../knexfile");
var knex = require("knex")(knexfile);

filterArray = arr => {
  let filtredArray = arr.filter(function(elm) {
    return elm !== "";
  });
  return filtredArray;
};

const getWorkflowcategories = (req, res, next) => {
  // execute query
  knex
    .select()
    .table("workflowCategories")
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

module.exports = getWorkflowcategories;
