const app = require("../app.js");
const supertest = require("supertest");

describe("Run API endpoints scenarios", () => {
  test("TEST 404 API Response", async () => {
    await supertest(app)
      .get("/v1/apis")
      .expect(404)
      .then((result) => {
        expect(result);
      });
  });
  describe("Run GET API Scenarios", () => {
    test("TEST GET API Success", async () => {
      await supertest(app)
        .get("/v1/api/")
        .expect(200)
        .then((result) => {
          expect(result);
        });
    });

    test("TEST GET API with Limit", async () => {
      await supertest(app)
        .get("/v1/api?limit=5")
        .expect(200)
        .then((result) => {
          const body = result.body;
          expect(body.records.legth == 5);
        });
    });
  });

  describe("Run POST API Scenarios", () => {
    test("TEST POST API", async () => {
      await supertest(app)
        .post("/v1/api/")
        .send({
          name: "bake cookies",
        })
        .expect(200)
        .then((result) => {
          expect(result);
        });
    });

    test("TEST POST API invalid input", async () => {
      await supertest(app)
        .post("/v1/api/")
        .send({
          names: "wrong field name",
        })
        .expect(400)
        .then((result) => {
          expect(result.body.errors);
        });
    });
  });

  describe("Run PUT API Scenarios", () => {
    test("TEST PUT API", async () => {
      await supertest(app)
        .put("/v1/api/26")
        .send({
          name: "Call my dog",
        })
        .expect(200)
        .then((result) => {
          expect(result);
        });
    });

    test("TEST PUT API invalid id", async () => {
      await supertest(app)
        .put("/v1/api/260")
        .send({
          name: "Call my dog",
        })
        .expect(400)
        .then((result) => {
          expect(result.body.errors);
        });
    });
  });

  describe("Run DELETE API Scenarios", () => {
    test("TEST DELETE API", async () => {
      await supertest(app)
        .delete("/v1/api/5")
        .expect(400)
        .then((result) => {
          expect(result);
        });
    });
  });
});
