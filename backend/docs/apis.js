const SwaggerApis = [
  {
    summary: 'User signup',
    description: 'Endpoint for user registration',
    tags: 'Authentication',
    requestBody: {
      email: 'jenil123@yopmail.com',
      password: '12345678',
    },
    responses: {
      200: {
        statusCode: 200,
        message: 'Successfully logged in.',
        success: true,
        data: {
          lastActive: '2023-07-03T10:22:26.814Z',
          email: 'jenil123@yopmail.com',
          first_name: 'Jenil',
          last_name: 'Jenil',
          order_history: [],
          shipping_address_book: [],
          billing_address_book: [],
          wish_list: [],
          recently_viewed_products: [],
          recently_searches: [],
          favorite_products: [],
          recently_purchased: [],
          product_reviews: [],
          product_ratings: [],
          product_recommendations: [],
          security_questions: [],
          is_email_verified: true,
          email_verification_token: null,
          interests: [],
          created_at: '2023-06-29T04:02:22.783Z',
        },
      },
      401: {
        statusCode: 401,
        message: 'Unauthorized.',
        success: false,
      },
    },
  },
];

module.exports = SwaggerApis;
