/**
 * File Name: generateSchemaDocs.js
 */
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const userSchema = require('../models/User');
const productSchema = require('../models/Product');
const orderSchema = require('../models/order');

// Get schema fields as an object
const getSchemaFields = (schema) => {
  const schemaFields = schema.obj;

  const rows = [];
  for (const [field, fieldOptions] of Object.entries(schemaFields)) {
    let fieldType = '';
    if (Array.isArray(fieldOptions.type)) {
      fieldType = `${fieldOptions.type[0].name}[]`;
    } else if (fieldOptions.type) {
      fieldType = fieldOptions.type.name;
    }
    const required = fieldOptions.required !== undefined ? fieldOptions.required : false;
    const unique = fieldOptions.unique !== undefined ? fieldOptions.unique : false;
    let defaultValue = '';
    if (fieldOptions.default !== undefined) {
      defaultValue = fieldOptions.default ? fieldOptions.default.toString() : '';
    }
    let refValue = '';
    if (fieldOptions.ref !== undefined) {
      refValue = fieldOptions.ref;
    }
    let enumValues = '';
    if (Array.isArray(fieldOptions.enum)) {
      enumValues = fieldOptions.enum.join(', ');
    }
    rows.push({
      field,
      fieldType,
      required: required.toString(),
      unique,
      defaultValue,
      refValue,
      enumValues,
    });
  }
  return rows;
};
 
const createTable = (schemaName, schemaFields) => {
  const header = ['Field', 'Type', 'Required'];
  const headerSeparator = `| ${header.map((h) => h.padEnd(30, ' ')).join(' | ')} |`;
  const rows = schemaFields.map((field) => {
    const requiredStr = field.required?.toString().padEnd(20) ?? '';
    return `| ${field.field?.padEnd(30) ?? ''} | ${field.fieldType?.padEnd(30) ?? ''} | ${requiredStr} |`;
  });
  const table = [`## ${schemaName} Schema`, '', headerSeparator, ...rows, ''].join('\n');
  return table;
};

// Generate documentation for all schemas
const generateDocumentation = () => {
  const schemas = {
    User: userSchema,
    Product: productSchema,
    Order: orderSchema,
    // add more schemas here
  };
  const schemaDocs = [];
  for (const [schemaName, schema] of Object.entries(schemas)) {
    const schemaFields = getSchemaFields(schema);
    const table = createTable(schemaName, schemaFields);
    schemaDocs.push(table);
  }
  return schemaDocs.join('\n');
};

// Write documentation to file
const writeDocumentation = () => {
  const documentation = generateDocumentation();
  const docPath = path.join(__dirname, '..', 'Schemas.documentation.md');
  fs.writeFile(docPath, documentation, (err) => {
    if (err) throw err;
    console.log(`Documentation file saved at ${docPath}`);
  });
};

// Watch schemas for changes and regenerate documentation
const watchSchemas = () => {
  const schemas = {
    User: mongoose.model('User', userSchema),
    Product: mongoose.model('Product', productSchema),
    Order: mongoose.model('Order', orderSchema),
    // add more schemas here
  };
  for (const [schemaName, model] of Object.entries(schemas)) {
    model.watch().on('change', () => {
      console.log(`Schema ${schemaName} has changed`);
      writeDocumentation();
    });
  }
};

// Generate and write documentation on startup
writeDocumentation();

// Watch schemas for changes and regenerate documentation
watchSchemas();

module.exports = {
  generateDocumentation,
  writeDocumentation,
  watchSchemas,
};
