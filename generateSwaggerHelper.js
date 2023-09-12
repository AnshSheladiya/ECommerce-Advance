const inputObject = {
  summary: 'Get All Products',
  description: 'Get All Products',
  tags: 'Products',
  method: 'get',
  path: '/api/products',
  responses: {
    200: {
      _id: '649d42380025f3925d20ab8d',
      product_name: 'Sample Product 1',
      description: 'This is sample product 1',
      price: 10.99,
      quantity: 100,
      views: 0,
      rating: 0,
      likes_count: 1,
      is_taxable: true,
      downloadables: [],
      samples: [],
      tags: [],
      is_stock_controlled: false,
      stock_quantity: 0,
      low_stock_threshold: 0,
      out_of_stock_threshold: 0,
      is_backorder_allowed: false,
      is_preorder_allowed: false,
      related_products: [],
      upsell_products: [],
      cross_sell_products: [],
      frequently_bought_with: [],
      bundle_products: [],
      images: [],
      reviews: [],
      likes: [
        {
          _id: '649bdb41021983fa78b904b1',
          email: 'jenil83@yopmail.com',
          first_name: 'jenil83',
          last_name: 'jenil83',
        },
      ],
      variations: [],
      gift_wrapping_options: [],
      compare_prices: [],
      created_at: '2023-06-29T08:35:04.133Z',
      category_id: [],
    },
    401: {
      statusCode: 401,
      message: 'Unauthorized.',
      success: false,
    },
  },
};

function generateSwaggerDoc(inputObject) {
  const swaggerDoc = {
    paths: {},
    components: {
      schemas: {},
    },
  };

  const { summary, description, tags, requestBody, method, path, responses } = inputObject;

  const pathObj = {
    [method]: {
      tags: [tags],
      summary: summary,
      description: description,
      responses: {},
    },
  };

  Object.keys(responses).forEach((responseCode) => {
    const response = responses[responseCode];
    const responseObj = {
      description: response.message,
    };

    if (response.success !== undefined) {
      responseObj.content = {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number',
                example: response.statusCode,
              },
              message: {
                type: 'string',
                example: response.message,
              },
              success: {
                type: 'boolean',
                example: response.success,
              },
            },
          },
        },
      };
    }

    pathObj[method].responses[responseCode] = responseObj;
  });

  // Add the path to the Swagger document
  swaggerDoc.paths[path] = pathObj;

  // Generate the DTO schema if requestBody exists
  if (requestBody) {
    const dtoSchema = generateDTOSchema(requestBody, 'loginRequestDTO');
    swaggerDoc.components.schemas.loginRequestDTO = dtoSchema;
  }

  return swaggerDoc;
}
function generateDTOSchema(obj, refName) {
  const schema = {
    type: 'object',
    properties: {},
  };

  Object.keys(obj).forEach((key) => {
    const property = obj[key];
    const type = Array.isArray(property) ? 'array' : typeof property;

    if (type === 'object' && property !== null) {
      const ref = `${refName}_${key}_DTO`;
      schema.properties[key] = {
        $ref: `#/components/schemas/${ref}`,
      };
      const nestedSchema = generateDTOSchema(property, ref);
      schema.properties[ref] = nestedSchema;
    } else {
      schema.properties[key] = {
        type: type,
        example: property,
      };
    }
  });

  return schema;
}

const swaggerDoc = generateSwaggerDoc(inputObject);
console.log(JSON.stringify(swaggerDoc, null, 2));

// const inputObject = {
//                 "_id": "649d42380025f3925d20ab8d",
//                 "product_name": "Sample Product 1",
//                 "description": "This is sample product 1",
//                 "price": 10.99,
//                 "quantity": 100,
//                 "views": 0,
//                 "rating": 0,
//                 "likes_count": 1,
//                 "is_taxable": true,
//                 "downloadables": [],
//                 "samples": [],
//                 "tags": [],
//                 "is_stock_controlled": false,
//                 "stock_quantity": 0,
//                 "low_stock_threshold": 0,
//                 "out_of_stock_threshold": 0,
//                 "is_backorder_allowed": false,
//                 "is_preorder_allowed": false,
//                 "related_products": [],
//                 "upsell_products": [],
//                 "cross_sell_products": [],
//                 "frequently_bought_with": [],
//                 "bundle_products": [],
//                 "images": [],
//                 "reviews": [],
//                 "likes": [
//                     {
//                         "_id": "649bdb41021983fa78b904b1",
//                         "email": "jenil83@yopmail.com",
//                         "first_name": "jenil83",
//                         "last_name": "jenil83"
//                     }
//                 ],
//                 "variations": [],
//                 "gift_wrapping_options": [],
//                 "compare_prices": [],
//                 "created_at": "2023-06-29T08:35:04.133Z",
//                 "category_id": []
//             }

// function dto(inputObject) {
//   const swaggerDTO = {
//     type: "object",
//     properties: {}
//   };

//   Object.keys(inputObject).forEach((key) => {
//     const property = inputObject[key];
//     swaggerDTO.properties[key] = {
//       type: typeof property,
//       example: property
//     };
//   });

//   console.log("\n\n\n====DTO====\n\n\n"+JSON.stringify(swaggerDTO, null, 2)+"\n\n\n");
// }

// dto(inputObject);
