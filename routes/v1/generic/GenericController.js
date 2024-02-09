"use strict";
const TAG = "[TestController]";
const rekuire = require("rekuire");
const Logger = rekuire("Logger");
const Errors = rekuire("Errors");
const MySql = rekuire("TestMySQL");

function TestController(req, res) {
  this.req = req;
  this.res = res;
}

TestController.prototype.sampleGet = function (cb, result) {
  const limit = this.req.query?.limit || 5;
  const page = this.req.query?.page || 1;
  const offset = (page - 1) * limit;

  const countQuery = `SELECT COUNT(*) as totalCount FROM developer.tasks`;
  const dataQuery = `SELECT * FROM developer.tasks LIMIT ${limit} OFFSET ${offset}`;

  const getCount = MySql.execute(countQuery);
  const getData = MySql.execute(dataQuery);

  Promise.all([getCount, getData])
    .then(([countResult, dataResult]) => {
      const totalCount = countResult[0].totalCount;
      const records = dataResult;
      if (records.length < 1) {
        let errors = Errors.raise("MISSING_INVALID_PARAMS");
        return cb(errors, null);
      }
      return cb(null, { records, totalCount, page });
    })
    .catch((error) => {
      let errors = Errors.raise("INTERNAL_SERVER_ERROR");
      errors.error.details = error.message || {};

      return cb(errors, null);
    });
};

TestController.prototype.samplePost = function (cb, result) {
  const body = this.req.body || {};

  if (!body.name) {
    let errors = Errors.raise("MISSING_INVALID_PARAMS");
    return cb(errors, null);
  }

  const dataQuery = `INSERT INTO developer.tasks (name) VALUES ('${body.name}');`;

  const getData = MySql.execute(dataQuery);
  getData
    .then((result) => {
      if (result.affectedRows < 1) {
        let errors = Errors.raise("MISSING_INVALID_PARAMS");
        return cb(errors, null);
      }
      return cb(null, { message: "successfully added a task" });
    })
    .catch((error) => {
      let errors = Errors.raise("INTERNAL_SERVER_ERROR");
      errors.error.details = error.message || {};

      return cb(errors, null);
    });
};

TestController.prototype.samplePut = function (cb, result) {
  const body = this.req.body || {};
  const params = this.req.params;
  const now = new Date();
  const currentDate = now.toISOString().slice(0, 19).replace("T", " ");

  if (!body.name) {
    let errors = Errors.raise("MISSING_INVALID_PARAMS");
    return cb(errors, null);
  }

  const dataQuery = `Update developer.tasks SET name = '${body.name}', date_updated = '${currentDate}' WHERE id = ${params.id};`;
  const getData = MySql.execute(dataQuery);

  getData
    .then((result) => {
      if (result.affectedRows < 1) {
        let errors = Errors.raise("MISSING_INVALID_PARAMS");
        return cb(errors, null);
      }
      return cb(null, { message: "successfully updated a task" });
    })
    .catch((error) => {
      let errors = Errors.raise("INTERNAL_SERVER_ERROR");
      errors.error.details = error.message || {};

      return cb(errors, null);
    });
};

TestController.prototype.sampleDelete = function (cb, result) {
  const body = this.req.body || {};
  const params = this.req.params;

  const dataQuery = `DELETE FROM developer.tasks WHERE id = ${params.id};`;
  const getData = MySql.execute(dataQuery);

  getData
    .then((result) => {
      if (result.affectedRows < 1) {
        let errors = Errors.raise("MISSING_INVALID_PARAMS");
        return cb(errors, null);
      }
      return cb(null, { message: "successfully deleted a task" });
    })
    .catch((error) => {
      let errors = Errors.raise("INTERNAL_SERVER_ERROR");
      errors.error.details = error.message || {};

      return cb(errors, null);
    });
};

module.exports = TestController;
