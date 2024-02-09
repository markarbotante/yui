"use strict";

const generateSchema = require("generate-schema");
const Definitions = require("../swagger-docs/Definitions");

const Swagger = {
  generateDocs: (paths) => {
    let appName = process.env.APP_NAME || "[App]";
    let newPaths = {};

    for (var path in paths) {
      paths[path].forEach((endpoint) => {
        let tmp = {
          tags: [],
          summary: endpoint.description || "",
          consumes: endpoint.consumes || [],
          produces: endpoint.produces || [],
          parameters: endpoint.parameters || {},
          responses: endpoint.responses || {},
        };
        tmp.tags.push(endpoint.tags);
        if (!newPaths[`${path}${endpoint.path}`]) newPaths[`${path}${endpoint.path}`] = {};
        newPaths[`${path}${endpoint.path}`][endpoint.method.toLowerCase()] = tmp;
      });
    }

    // Generate definitions
    let definitions = Swagger.generateDefinitions(Definitions);

    let swaggerDocument = {
      swagger: process.env.APP_SWAGGER_VERSION || "2.0",
      info: {
        description: process.env.APP_DESCRIPTION || "[App]",
        version: process.env.APP_VERSION || "",
        title: process.env.APP_NAME || "",
      },
      host: process.env.HOST + ":" + process.env.PORT || 8080,
      basePath: "",
      schemes: ["http"],
      paths: newPaths,
      definitions: definitions,
    };

    return swaggerDocument;
  },

  generateDefinitions: (definitions) => {
    let newDefinitions = {};

    for (var definition in definitions) {
      newDefinitions[definition] = Swagger.getProperties(definitions[definition]);
      newDefinitions[definition]["example"] = definitions[definition];
    }

    return newDefinitions;
  },

  getProperties: (element) => {
    return generateSchema.json(element);
  },
};

module.exports = Swagger;
