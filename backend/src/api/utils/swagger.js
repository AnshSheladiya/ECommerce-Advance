const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation generated with Swagger',
    },
  },
  apis: [__dirname + '/../routes/../../../docs/api-docs/swaggerJSDocs.js'], // Modify this path to match your project's API routes
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  // Serve Swagger API documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
