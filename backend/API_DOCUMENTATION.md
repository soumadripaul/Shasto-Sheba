# Mon Bondhu API Documentation

## 📚 Overview

Mon Bondhu is a comprehensive health support platform API for Bangladesh. This API provides endpoints for health tips, health center locations, events, community workers, help requests, maternal health tracking, mental health assessments, symptom checking, and an AI-powered chatbot.

## 🚀 Getting Started

### Base URL

- **Development**: `http://localhost:5000`
- **Production**: `https://api.monbondhu.com`

### Interactive API Documentation

Access the interactive Swagger UI documentation:

```
http://localhost:5000/api-docs
```

The Swagger UI provides:
- 📖 Complete API reference with request/response examples
- 🧪 Interactive testing interface (Try it out!)
- 📋 Schema definitions and data models
- 🔍 Search and filter capabilities
- 📥 Export OpenAPI specification

## 🔑 Authentication

Currently, the API is open and does not require authentication for most endpoints. Future versions will implement:

- JWT (JSON Web Token) authentication
- API key authentication for third-party integrations
- Role-based access control (Admin, Health Worker, User)

### Planned Authentication Flow

```javascript
// Future authentication header
headers: {
  'Authorization': 'Bearer <your-jwt-token>',
  'X-API-Key': '<your-api-key>'
}
```

## 📊 API Endpoints

### Health Tips
- `GET /api/health-tips` - Get all health tips
- `GET /api/health-tips/:id` - Get single health tip
- `POST /api/health-tips` - Create new health tip
- `PUT /api/health-tips/:id` - Update health tip
- `DELETE /api/health-tips/:id` - Delete health tip

**Query Parameters:**
- `category` - Filter by category (e.g., পুষ্টি, ব্যায়াম)
- `language` - Filter by language (bn, en)

### Health Centers
- `GET /api/health-centers` - Get all health centers
- `GET /api/health-centers/:id` - Get single health center
- `POST /api/health-centers` - Create new health center
- `PUT /api/health-centers/:id` - Update health center
- `DELETE /api/health-centers/:id` - Delete health center

**Query Parameters:**
- `type` - Filter by type (hospital, clinic, pharmacy, diagnostic)
- `division` - Filter by division
- `district` - Filter by district
- `upazila` - Filter by upazila

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Workers
- `GET /api/workers` - Get all community health workers
- `GET /api/workers/:id` - Get single worker
- `POST /api/workers` - Create new worker
- `PUT /api/workers/:id` - Update worker
- `DELETE /api/workers/:id` - Delete worker

### Help Requests
- `GET /api/help-requests` - Get all help requests
- `GET /api/help-requests/:id` - Get single help request
- `GET /api/help-requests/code/:ticketCode` - Get by ticket code
- `POST /api/help-requests` - Create new help request
- `PUT /api/help-requests/:id` - Update help request
- `PATCH /api/help-requests/:id/assign` - Assign worker to request
- `DELETE /api/help-requests/:id` - Delete help request

**Query Parameters:**
- `status` - Filter by status (pending, assigned, in-progress, completed, cancelled)
- `urgency` - Filter by urgency (low, medium, high, critical)
- `requestType` - Filter by type (emergency, consultation, medication, transport, other)

### Mental Health
- `GET /api/mental-health` - Get all mental health records
- `GET /api/mental-health/:id` - Get single record
- `POST /api/mental-health` - Create new assessment
- `PUT /api/mental-health/:id` - Update assessment
- `DELETE /api/mental-health/:id` - Delete assessment

### Maternal Health
- `GET /api/maternal-health` - Get all maternal health records
- `GET /api/maternal-health/:id` - Get single record
- `POST /api/maternal-health` - Create new record
- `PUT /api/maternal-health/:id` - Update record
- `DELETE /api/maternal-health/:id` - Delete record

### Symptom Checker
- `GET /api/symptom-checks` - Get all symptom check records
- `GET /api/symptom-checks/:id` - Get single record
- `POST /api/symptom-checks` - Create new symptom check
- `PUT /api/symptom-checks/:id` - Update record
- `DELETE /api/symptom-checks/:id` - Delete record

### Statistics
- `GET /api/statistics/overview` - Get overall statistics
- `GET /api/statistics/help-requests` - Get help request statistics
- `GET /api/statistics/health-centers` - Get health center statistics
- `GET /api/statistics/workers` - Get worker statistics

### Chatbot (AI Assistant)
- `POST /api/chatbot` - Send message to AI chatbot

## 📝 Request/Response Examples

### Create Help Request

**Request:**
```http
POST /api/help-requests
Content-Type: application/json

{
  "name": "রহিম আহমেদ",
  "phone": "01712345678",
  "location": "মিরপুর, ঢাকা",
  "requestType": "consultation",
  "description": "তীব্র জ্বর এবং মাথা ব্যথা",
  "urgency": "high"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "ticketCode": "HELP-2024-001",
    "name": "রহিম আহমেদ",
    "phone": "01712345678",
    "location": "মিরপুর, ঢাকা",
    "requestType": "consultation",
    "description": "তীব্র জ্বর এবং মাথা ব্যথা",
    "urgency": "high",
    "status": "pending",
    "createdAt": "2024-11-04T10:30:00.000Z",
    "updatedAt": "2024-11-04T10:30:00.000Z"
  },
  "message": "Help request submitted successfully"
}
```

### Chat with AI Bot

**Request:**
```http
POST /api/chatbot
Content-Type: application/json

{
  "message": "জ্বর হলে কি করতে হবে?"
}
```

**Response:**
```json
{
  "success": true,
  "response": "জ্বর থাকলে বিশ্রাম নিন এবং প্রচুর পানি পান করুন। জ্বর ৩ দিনের বেশি থাকলে ডাক্তার দেখান। লক্ষণ পরীক্ষা মেনুতে বিস্তারিত জানুন।"
}
```

### Get Health Tips

**Request:**
```http
GET /api/health-tips?category=পুষ্টি&language=bn
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "গ্রীষ্মকালে হাইড্রেটেড থাকুন",
      "description": "প্রতিদিন কমপক্ষে ৮-১০ গ্লাস পানি পান করুন।",
      "category": "পুষ্টি",
      "season": "গ্রীষ্মকাল",
      "icon": "💧",
      "language": "bn",
      "createdAt": "2024-11-04T10:00:00.000Z",
      "updatedAt": "2024-11-04T10:00:00.000Z"
    }
  ]
}
```

## 🔒 CORS Policy

CORS (Cross-Origin Resource Sharing) is enabled for all origins in development. In production, only whitelisted domains are allowed:

```javascript
// Allowed origins
- https://monbondhu.com
- https://www.monbondhu.com
- https://app.monbondhu.com
```

## ⚠️ Error Handling

All API responses follow a consistent error format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 📊 Rate Limiting

**Current:** No rate limiting (development)

**Planned:** 
- 100 requests per minute per IP
- 1000 requests per hour per API key
- Chatbot: 20 requests per minute per IP

## 🌐 Supported Languages

- **Bengali (bn)**: Primary language
- **English (en)**: Secondary language

All text content supports both languages. Use the `language` query parameter or request body field to specify the preferred language.

## 🔄 Data Models

### Health Tip Schema
```javascript
{
  title: String (required),
  description: String (required),
  category: String (required),
  season: String (default: 'সারা বছর'),
  icon: String (default: '💡'),
  language: String (enum: ['bn', 'en'], default: 'bn'),
  timestamps: true
}
```

### Help Request Schema
```javascript
{
  ticketCode: String (unique, auto-generated),
  name: String (required),
  phone: String (required),
  location: String (required),
  requestType: String (enum: ['emergency', 'consultation', 'medication', 'transport', 'other']),
  description: String (required),
  urgency: String (enum: ['low', 'medium', 'high', 'critical']),
  status: String (enum: ['pending', 'assigned', 'in-progress', 'completed', 'cancelled']),
  response: String,
  assignedWorker: ObjectId (ref: 'Worker'),
  timestamps: true
}
```

## 🧪 Testing the API

### Using Swagger UI (Recommended)

1. Start the server: `npm start`
2. Open browser: `http://localhost:5000/api-docs`
3. Click "Try it out" on any endpoint
4. Fill in parameters and request body
5. Click "Execute"

### Using Postman (Advanced Testing)

**Import Postman Collection:**

1. Open Postman (Desktop or Web)
2. Click **Import** button
3. Select `backend/postman_collection.json`
4. Import environment: `backend/postman_environment_local.json`
5. Select "Mon Bondhu - Local Development" environment
6. Start testing!

**Features:**
- ✅ All 80+ API endpoints pre-configured
- ✅ Automated tests for responses
- ✅ Bengali examples included
- ✅ Environment variables for easy switching
- ✅ Request chaining (IDs saved automatically)

**Quick Test:**
```
1. Open "Health Tips" → "Get All Health Tips"
2. Click "Send"
3. View response and automated test results
```

For detailed Postman guide, see: [`POSTMAN_GUIDE.md`](./POSTMAN_GUIDE.md)

### Using cURL

```bash
# Get all health tips
curl http://localhost:5000/api/health-tips

# Create help request
curl -X POST http://localhost:5000/api/help-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "01712345678",
    "location": "Dhaka",
    "requestType": "consultation",
    "description": "Test description"
  }'

# Chat with bot
curl -X POST http://localhost:5000/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message": "জ্বর হলে কি করব?"}'
```

### Using Postman

1. Import OpenAPI specification from `/api-docs`
2. All endpoints will be automatically populated
3. Test with pre-configured examples

## 📦 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/mon-bondhu

# OpenAI API (for chatbot)
OPENAI_API_KEY=your_openai_api_key_here

# Future: Authentication
JWT_SECRET=your_jwt_secret_here
API_KEY_SECRET=your_api_key_secret_here
```

## 🚀 Starting the Server

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed
```

## 📖 Additional Resources

- **Swagger UI**: http://localhost:5000/api-docs
- **OpenAPI JSON**: http://localhost:5000/api-docs.json
- **API Root**: http://localhost:5000/
- **GitHub Repository**: https://github.com/soumadripaul/Shasto-Sheba

## 🤝 Support

For API support and questions:
- Email: support@monbondhu.com
- GitHub Issues: https://github.com/soumadripaul/Shasto-Sheba/issues

## 📄 License

MIT License - See LICENSE file for details
