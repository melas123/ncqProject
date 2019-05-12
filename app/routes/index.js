var express = require("express");
var router = express.Router();

var getWorkflowcategories = require("../controllers/workflowCategory");
var postWorkflows = require("../controllers/workflow");

/**
 * @swagger
 * /api/workflowCategories:
 *   get:
 *     tags:
 *       - WorkflowCategories
 *     description: Returns all Workflow Categories
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of workflowCategories
 */
router.get("/workflowCategories", getWorkflowcategories);

/**
 * @swagger
 * /api/workflows:
 *   post:
 *     tags:
 *       - Workflows
 *     description: Returns all workflows with filters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: the name of the workflow
 *         in: body
 *         required: false
 *       - name: status
 *         description: the status of the workflow
 *         in: body
 *         required: false
 *       - name: categories
 *         description: An array of workflowsCategories ids
 *         in: body
 *         required: false
 *     responses:
 *       200:
 *         description: An array of workflows
 */
router.post("/workflows", postWorkflows);

module.exports = router;
