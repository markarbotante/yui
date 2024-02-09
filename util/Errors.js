module.exports = {
  get: function (tag) {
    var errors = {
      MISSING_INVALID_PARAMS: {
        status: 400,
        error: {
          code: 'F',
          message: 'Missing/invalid parameters.',
          params: []
        }
      },
      INTERNAL_SERVER_ERROR: {
        status: 500,
        error: {
          code: 'I',
          message: 'Internal server error.'
        }
      },
      NOT_FOUND: {
        status: 404,
        error: {
          code: 'F',
          message: "Not found."
        }
      },
      DB_ERROR: {
        status: 500,
        error: {
          code: 'I',
          message: "Database error/unavailable."
        }
      },
      SERVER_ERROR: {
        status: 500,
        error: {
          code: 'I',
          message: 'Server unreachable.'
        }
      },
      SERVICE_ERROR: {
        status: 500,
        error: {
          code: 'I',
          message: 'Service error/unavailable.'
        }
      },
      UNAUTHORIZED_ACCESS: {
        status: 401,
        error: {
          code: 'F',
          message: 'Unauthorized Access.'
        }
      }
    };
    return errors[tag];
  },

  raise: function (e, details) {
    var error = JSON.parse(JSON.stringify(this.get(e)));
    error.error.details = details;
    return error;
  }
};

