// const fs = require('fs');

// function getTypeString(schemaPath) {
//   if (schemaPath.instance === 'String') {
//     return 'String';
//   } else if (schemaPath.instance === 'Number') {
//     return 'Float';
//   } else if (schemaPath.instance === 'Boolean') {
//     return 'Boolean';
//   } else if (schemaPath.instance === 'Date') {
//     return 'DateTime';
//   } else if (schemaPath.instance === 'ObjectID') {
//     return 'Int @map("' + schemaPath.path + '")';
//   } else {
//     return 'Json'; // Fallback for unsupported types
//   }
// }

// function generatePrismaSchema(mongooseModel) {
//   let prismaSchema = `datasource db {
//   provider = "mysql"
//   url      = env("MYSQL_DB_URL")
// }

// generator client {
//   provider = "prisma-client-js"
// }\n\n`;

//   prismaSchema += `model ${mongooseModel.modelName} {
//   id        Int      @id @default(autoincrement())\n`;

//   for (const [key, value] of Object.entries(mongooseModel.schema.paths)) {
//     if (key === '_id') continue;

//     if (value.instance === 'Array') {
//       // Array type handling
//       const arrayType = getTypeString(value.schema.paths[0]);
//       prismaSchema += `  ${key} ${arrayType}[]`;
//     } else {
//       const typeString = getTypeString(value);
//       prismaSchema += `  ${key} ${typeString}`;
//     }

//     if (value.isRequired) {
//       prismaSchema += ' @required';
//     }

//     prismaSchema += '\n';
//   }

//   prismaSchema += '}\n';

//   return prismaSchema;
// }

// // Assuming the Product model is defined in the 'product.js' file as in the question.
// const Product = require('./product');

// const prismaSchema = generatePrismaSchema(Product);

// // Write the generated Prisma schema to a file.
// fs.writeFileSync('schema.prisma', prismaSchema);
