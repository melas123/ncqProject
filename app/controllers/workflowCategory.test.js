const sinon = require("sinon");
const request = require("request");
const chai = require("chai");
const should = chai.should();

const base = "http://localhost:8080";

describe("when stubbed", () => {
  beforeEach(() => {
    this.get = sinon.stub(request, "get");
  });

  afterEach(() => {
    request.get.restore();
  });
  describe("GET /api/workflowsCategories", () => {
    const responseObject = {
      statusCode: 200,
      headers: {
        "content-type": "application/json"
      }
    };
    const responseBody = {
      status: "success",
      data: [
        {
          id: 4,
          name: "Workflow 1",
          description: "description 1",
          enabled: 5,
          category: 1
        },
        {
          id: 5,
          name: "Workflow 2",
          genre: "description 2",
          enabled: 1,
          category: 2
        },
        {
          id: 6,
          name: "Workflow 3",
          genre: "description 3",
          enabled: 2,
          category: 1
        }
      ]
    };
    it("should return all workflowsCategories", done => {
      this.get.yields(null, responseObject, JSON.stringify(responseBody));
      request.get(`${base}/api/workflowsCategories`, (err, res, body) => {
        // there should be a 200 status code
        res.statusCode.should.eql(200);
        // the response should be JSON
        res.headers["content-type"].should.contain("application/json");
        // parse response body
        body = JSON.parse(body);
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        body.status.should.eql("success");
        // the JSON response body should have a
        // key-value pair of {"data": [3 movie objects]}
        body.data.length.should.eql(3);
        // the first object in the data array should
        // have the right keys
        body.data[0].should.include.keys(
          "id",
          "name",
          "description",
          "enabled",
          "category"
        );
        // the first object should have the right value for name
        body.data[0].name.should.eql("Workflow 1");
        done();
      });
    });
  });
});
