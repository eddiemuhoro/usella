import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Usella',
      version: '1.0.0',
      description: 'welcome to usella, where send hand good has value'
    },
    paths: {
      // Users routes
      '/login': {
        post: {
          tags: ['User'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'emilio113kariuki@gmail.com'
                    },
                    password: {
                      type: 'string',
                      example: 'pass1234'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'User logged in successfully'
            }
          }
        }
      },

      '/register': {
        post: {
          tags: ['User'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'Emilio Kariuki'
                    },
                    email: {
                      type: 'string',
                      example: 'emilio113kariuki@gmail.com'
                    },
                    phone: {
                      type: 'string',
                      example: '0712345678'
                    },
                    password: {
                      type: 'string',
                      example: 'pass1234'
                    },
                    
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'User registered successfully'
            }
          }
        }
      },
      '/users/verify/{email}/{code}': {
        put: {
          tags: ['User'],
          parameters: [
            {
              name: 'code',
              in: 'path',
              description: 'The verification code',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The verification code'
              }
            },
            {
              name: 'email',
              in: 'path',
              description: 'The user email',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user email'
              }
            }
          ],
          responses: {
            200: {
              description: 'User verified successfully'
            }
          }
        }
      },

      '/users': {
        get: {
          tags: ['User'],
          responses: {
            200: {
              description:
                'A list of users currently registered in the database'
            }
          }
        }
      },
      '/users/{id}': {
        get: {
          tags: ['User'],
          description: 'Get a user by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: "User's details"
            }
          }
        }
      },

      '/users/delete/{id}': {
        delete: {
          tags: ['User'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              descrition: 'User deleted successfully'
            }
          }
        }
      },

      // Products routes
      '/product/send': {
        post: {
          tags: ['Product'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'Iphone 12'
                    },
                    description: {
                      type: 'string',
                      example: 'Iphone 12 pro max'
                    },
                    price: {
                      type: 'number',
                      example: '100000'
                    },
                    category: {
                      type: 'string',
                      enum: [
                        'ELECTRONICS',
                        'FASHION',
                        'HOME',
                        'HEALTH',
                        'SPORTS',
                        'BOOKS',
                        'BEAUTY',
                        'OTHERS'
                      ],
                      example: 'ELECTRONICS'
                    },
                    seller_id: {
                      type: 'string',
                      example: '1'
                    },
                    seller_name: {
                      type: 'string',
                      example: 'Emilio Kariuki'
                    },
                    seller_email: {
                      type: 'string',
                      example: 'emili0113kariuki@gmail.com'
                    },
                    seller_phone: {
                      type: 'string',
                      example: '0712345678'
                    },
                    location: {
                      type: 'string',
                      example: 'Nairobi'
                    },
                    quantity: {
                      type: 'number',
                      example: '1'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Product added successfully'
            }
          }
        }
      },

      '/product': {
        get: {
          tags: ['Product'],
          responses: {
            200: {
              description:
                'A list of products currently registered in the database'
            }
          }
        }
      },

      '/product/{id}': {
        get: {
          tags: ['Product'],
          description: 'Get a product by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The product id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The product id'
              }
            }
          ],
          responses: {
            200: {
              description: "Product's details"
            }
          }
        }
      },

      '/product/user/{id}': {
        get: {
          tags: ['Product'],
          description: 'Get a product by user id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: "Product's details"
            }
          }
        }
      },

      '/product/update/{id}': {
        put: {
          tags: ['Product'],
          description: 'Update a product by id',
          requestBody: {
            required: false,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      example: 'Iphone 12'
                    },
                    description: {
                      type: 'string',
                      example: 'Iphone 12 pro max'
                    },
                    price: {
                      type: 'number',
                      example: '100000'
                    },
                    category: {
                      type: 'string',
                      enum: [
                        'ELECTRONICS',
                        'FASHION',
                        'HOME',
                        'HEALTH',
                        'SPORTS',
                        'BOOKS',
                        'BEAUTY',
                        'OTHERS'
                      ],
                      example: 'ELECTRONICS'
                    },
                    seller_id: {
                      type: 'string',
                      example: '1'
                    },
                    seller_name: {
                      type: 'string',
                      example: 'Emilio Kariuki'
                    },
                    seller_email: {
                      type: 'string',
                      example: 'emili0113kariuki@gmail.com'
                    },
                    seller_phone: {
                      type: 'string',
                      example: '0712345678'
                    },
                    location: {
                      type: 'string',
                      example: 'Nairobi'
                    },
                    quantity: {
                      type: 'number',
                      example: '1'
                    }
                  }
                }
              }
            }
          },
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The product id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The product id'
              }
            }
          ],
          responses: {
            200: {}
          }
        }
      },

      '/product/delete/{id}': {
        delete: {
          tags: ['Product'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The product id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The product id'
              }
            }
          ],
          responses: {
            200: {
              descrition: 'Product deleted successfully'
            }
          }
        }
      },

      '/product/user/delete/{id}': {
        delete: {
          tags: ['Product'],
          description: 'Delete all products by user',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              descrition: 'user products deleted successfully'
            }
          }
        }
      },

      '/product/category/{category}': {
        get: {
          tags: ['Product'],
          parameters: [
            {
              name: 'category',
              in: 'path',
              description: 'The product category',
              required: true,
              schema: {
                type: 'string',
                required: true,
                enum: [
                  'ELECTRONICS',
                  'FASHION',
                  'HOME',
                  'HEALTH',
                  'SPORTS',
                  'BOOKS',
                  'BEAUTY',
                  'OTHERS'
                ],
                description: 'The product category'
              }
            }
          ],
          responses: {
            200: {
              description: "Product's details"
            }
          }
        }
      },

      //review routes

      '/review/send': {
        post: {
          tags: ['Review'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    sender_name: {
                      type: 'string',
                      example: 'Emilio Kariuki'
                    },
                    sender_image: {
                      type: 'string',
                      example: 'https://res.cloudinary.com/dzcmadjl1/i'
                    },
                    sender_email: {
                      type: 'string',
                      example: 'emilio113kariuki@gmail.com'
                    },
                    user_id: {
                      type: 'string',
                      example: '1'
                    },
                    rating: {
                      type: 'number',
                      example: 5
                    },
                    comment: {
                      type: 'string',
                      example: 'Nice product'
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: 'Review added successfully'
            }
          }
        }
      },

      '/review/user/{id}': {
        get: {
          tags: ['Review'],
          description: 'Get a review by product id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: 'User reviews'
            }
          }
        }
      },

      '/review/user/update/{id}': {
        put: {
          tags: ['Review'],
          description: 'Update a review by id',
          requestBody: {
            required: false,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    comment: {
                      type: 'string',
                      example: 'This is a nice product'
                    },
                    rating: {
                      type: 'number',
                      example: 5
                    },
                    user_id: {
                      type: 'string',
                      example: '1'
                    }
                  }
                }
              }
            }
          },
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The review id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The review id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Review updated successfully'
            }
          }
        }
      },

      '/review/usella/send': {
        post: {
          tags: ['Review'],
          description: 'Send a review to a usella founders',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    comment: {
                      type: 'string',
                      example: 'Nice product'
                    },
                    rating: {
                      type: 'number',
                      example: 5
                    }
                  }
                }
              }
            }
          }
        }
      },

      '/review/usella/delete/{id}': {
        delete: {
          tags: ['Review'],
          description: 'Delete a review by user id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'The user id',
              required: true,
              schema: {
                type: 'string',
                required: true,
                description: 'The user id'
              }
            }
          ],
          responses: {
            200: {
              description: 'Review deleted successfully'
            },
            404: {
              description: 'Review not found'
            }
          }
        }
      },

      '/review/usella': {
        get: {
          tags: ['Review'],
          description: 'Get all reviews',
          responses: {
            200: {
              description: 'All reviews'
            }
          }
        }
      }
    }
  },
  apis: ['./src/**/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
