/* Request Body Schemas for Documentation */
/* Keys must be unique */

const Definitions = {
  SampleGetResponse: {
    records: [
      {
        id: 2,
        name: "task two",
        status: 0,
        date_created: "2023-03-27T06:52:52.000Z",
        date_updated: null,
      },
      {
        id: 3,
        name: "task three",
        status: 0,
        date_created: "2023-03-27T06:52:52.000Z",
        date_updated: null,
      },
    ],
    totalCount: 29,
    page: 1,
  },

  SamplePostRequest: {
    name: "bake cookies",
  },

  SamplePostResponse: {
    message: "successfully added a task",
  },

  SamplePutRequest: {
    name: "Call my dog",
  },

  SamplePutResponse: {
    message: "successfully updated a task",
  },

  SampleDeleteResponse: {
    message: "successfully deleted a task",
  },
};
module.exports = Definitions;
