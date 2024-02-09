const rekuire = require("rekuire");
const async = require("async");

const TestController = rekuire("GenericController");

const router = {
  basePath: "/api",
  tags: "TEST",
  endpoints: [
    {
      method: "GET",
      path: "/",
      description: "TEST",
      consumes: ["application/json"],
      produces: ["application/json"],
      /* Endpoint Params - Query / Path / Body */
      /* All Endpoint Responses */
      responses: {
        200: {
          description: "Successful Response",
          type: "object",
          schema: {
            $ref: "#/definitions/SampleGetResponse",
          },
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          schema: {
            $ref: "#/definitions/InternalServerError",
          },
        },
      },
      handler: (req, res, next) => {
        var _test = new TestController(req);

        async.auto(
          {
            sampleGet: _test.sampleGet.bind(_test),
          },
          function (err, result) {
            if (err) {
              return res.error(err);
            } else {
              return res.ok(result.sampleGet);
            }
          }
        );
      },
    },
    {
      method: "POST",
      path: "/",
      description: "TEST",
      consumes: ["application/json"],
      produces: ["application/json"],
      /* Endpoint Params - Query / Path / Body */
      parameters: [
        {
          name: "Request Body",
          required: true,
          in: "body",
          schema: {
            $ref: "#/definitions/SamplePostRequest",
          },
        },
      ],
      /* All Endpoint Responses */
      responses: {
        200: {
          description: "Successful Response",
          type: "object",
          schema: {
            $ref: "#/definitions/SamplePostResponse",
          },
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          schema: {
            $ref: "#/definitions/InternalServerError",
          },
        },
      },
      handler: (req, res, next) => {
        var _test = new TestController(req);

        async.auto(
          {
            samplePost: _test.samplePost.bind(_test),
          },
          function (err, result) {
            if (err) {
              return res.error(err);
            } else return res.ok(result.samplePost);
          }
        );
      },
    },
    {
      method: "PUT",
      path: "/:id",
      description: "TEST",
      consumes: ["application/json"],
      produces: ["application/json"],
      /* Endpoint Params - Query / Path / Body */
      parameters: [
        {
          name: "Request Body",
          required: true,
          in: "body",
          schema: {
            $ref: "#/definitions/SamplePutRequest",
          },
        },
      ],
      /* All Endpoint Responses */
      responses: {
        200: {
          description: "Successful Response",
          type: "object",
          schema: {
            $ref: "#/definitions/SamplePutResponse",
          },
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          schema: {
            $ref: "#/definitions/InternalServerError",
          },
        },
      },
      handler: (req, res, next) => {
        var _test = new TestController(req);

        async.auto(
          {
            samplePut: _test.samplePut.bind(_test),
          },
          function (err, result) {
            if (err) {
              return res.error(err);
            } else return res.ok(result.samplePut);
          }
        );
      },
    },
    {
      method: "DELETE",
      path: "/:id",
      description: "TEST",
      consumes: ["application/json"],
      produces: ["application/json"],
      /* Endpoint Params - Query / Path / Body */
      parameters: [
        {
          name: "Request Body",
          required: true,
          in: "path",
          description: "The ID of the resource to delete",
        },
      ],
      /* All Endpoint Responses */
      responses: {
        200: {
          description: "Successful Response",
          type: "object",
          schema: {
            $ref: "#/definitions/SampleDeleteResponse",
          },
        },
        500: {
          description: "Internal Server Error",
          type: "object",
          schema: {
            $ref: "#/definitions/InternalServerError",
          },
        },
      },
      handler: (req, res, next) => {
        var _test = new TestController(req);

        async.auto(
          {
            sampleDelete: _test.sampleDelete.bind(_test),
          },
          function (err, result) {
            if (err) {
              return res.error(err);
            } else return res.ok(result.sampleDelete);
          }
        );
      },
    },
  ],
};

module.exports = router;
