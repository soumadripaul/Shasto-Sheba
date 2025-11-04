import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon Bondhu API Documentation',
      version: '1.0.0',
      description: `
# মন বন্ধু (Mon Bondhu) - Health Support Platform API

A comprehensive health support platform for Bangladesh providing:
- 🏥 Health center information and mapping
- 💡 Health tips and guidance (Bengali/English)
- 📅 Health events and awareness programs
- 👨‍⚕️ Community health worker directory
- 🆘 Anonymous help request system
- 🤰 Maternal health tracking
- 🧠 Mental health assessments
- 🔍 Symptom checker
- 🤖 AI-powered health chatbot
- 📊 Health statistics and analytics

## Features
- RESTful API architecture
- MongoDB database
- CORS enabled for cross-origin requests
- Comprehensive error handling
- Bengali language support
- Population-based referencing
      `,
      contact: {
        name: 'Mon Bondhu Team',
        email: 'support@monbondhu.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://api.monbondhu.com',
        description: 'Production server'
      }
    ],
    tags: [
      {
        name: 'Health Tips',
        description: 'Health tips and guidance in Bengali/English'
      },
      {
        name: 'Health Centers',
        description: 'Hospital and health center information'
      },
      {
        name: 'Events',
        description: 'Health awareness events and programs'
      },
      {
        name: 'Workers',
        description: 'Community health worker directory'
      },
      {
        name: 'Help Requests',
        description: 'Anonymous help request system'
      },
      {
        name: 'Mental Health',
        description: 'Mental health assessments and tracking'
      },
      {
        name: 'Maternal Health',
        description: 'Maternal health tracking for pregnant women'
      },
      {
        name: 'Symptom Checker',
        description: 'Symptom check records and analysis'
      },
      {
        name: 'Statistics',
        description: 'Health statistics and analytics'
      },
      {
        name: 'Chatbot',
        description: 'AI-powered health assistant chatbot'
      }
    ],
    components: {
      schemas: {
        HealthTip: {
          type: 'object',
          required: ['title', 'description', 'category'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ID',
              example: '507f1f77bcf86cd799439011'
            },
            title: {
              type: 'string',
              description: 'Title of the health tip',
              example: 'গ্রীষ্মকালে হাইড্রেটেড থাকুন'
            },
            description: {
              type: 'string',
              description: 'Detailed description',
              example: 'প্রতিদিন কমপক্ষে ৮-১০ গ্লাস পানি পান করুন।'
            },
            category: {
              type: 'string',
              description: 'Category of health tip',
              example: 'পুষ্টি'
            },
            season: {
              type: 'string',
              description: 'Applicable season',
              default: 'সারা বছর',
              example: 'গ্রীষ্মকাল'
            },
            icon: {
              type: 'string',
              description: 'Emoji icon',
              default: '💡',
              example: '💧'
            },
            language: {
              type: 'string',
              enum: ['bn', 'en'],
              default: 'bn',
              description: 'Language of the tip'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        HealthCenter: {
          type: 'object',
          required: ['name', 'type', 'division', 'district'],
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            name: {
              type: 'string',
              example: 'ঢাকা মেডিকেল কলেজ হাসপাতাল'
            },
            type: {
              type: 'string',
              enum: ['hospital', 'clinic', 'pharmacy', 'diagnostic'],
              example: 'hospital'
            },
            division: {
              type: 'string',
              example: 'ঢাকা'
            },
            district: {
              type: 'string',
              example: 'ঢাকা'
            },
            upazila: {
              type: 'string',
              example: 'মতিঝিল'
            },
            address: {
              type: 'string',
              example: 'সেগুনবাগিচা, ঢাকা-১০০০'
            },
            phone: {
              type: 'string',
              example: '০২-৮৬২৬৮১২'
            },
            services: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: ['জরুরি বিভাগ', 'শিশু বিভাগ', 'মা ও শিশু']
            },
            coordinates: {
              type: 'object',
              properties: {
                lat: {
                  type: 'number',
                  example: 23.7359
                },
                lng: {
                  type: 'number',
                  example: 90.3985
                }
              }
            }
          }
        },
        HelpRequest: {
          type: 'object',
          required: ['name', 'phone', 'location', 'requestType', 'description'],
          properties: {
            _id: {
              type: 'string',
              example: '507f1f77bcf86cd799439011'
            },
            ticketCode: {
              type: 'string',
              description: 'Unique ticket code for tracking',
              example: 'HELP-2024-001'
            },
            name: {
              type: 'string',
              example: 'রহিম আহমেদ'
            },
            phone: {
              type: 'string',
              example: '০১৭১২৩৪৫৬৭৮'
            },
            location: {
              type: 'string',
              example: 'মিরপুর, ঢাকা'
            },
            requestType: {
              type: 'string',
              enum: ['emergency', 'consultation', 'medication', 'transport', 'other'],
              example: 'consultation'
            },
            description: {
              type: 'string',
              example: 'তীব্র জ্বর এবং মাথা ব্যথা'
            },
            urgency: {
              type: 'string',
              enum: ['low', 'medium', 'high', 'critical'],
              default: 'medium'
            },
            status: {
              type: 'string',
              enum: ['pending', 'assigned', 'in-progress', 'completed', 'cancelled'],
              default: 'pending'
            },
            response: {
              type: 'string',
              nullable: true
            },
            assignedWorker: {
              type: 'string',
              description: 'Worker ID reference',
              nullable: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        ChatbotRequest: {
          type: 'object',
          required: ['message'],
          properties: {
            message: {
              type: 'string',
              description: 'User message in Bengali or English',
              example: 'জ্বর হলে কি করতে হবে?'
            }
          }
        },
        ChatbotResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            response: {
              type: 'string',
              example: 'জ্বর থাকলে বিশ্রাম নিন এবং প্রচুর পানি পান করুন। জ্বর ৩ দিনের বেশি থাকলে ডাক্তার দেখান।'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message'
            }
          }
        }
      },
      responses: {
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'Resource not found'
              }
            }
          }
        },
        BadRequest: {
          description: 'Bad request - validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'Validation error'
              }
            }
          }
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              },
              example: {
                success: false,
                message: 'Something went wrong!'
              }
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './server.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
