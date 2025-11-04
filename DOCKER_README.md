# 🐳 Mon Bondhu - Docker Deployment Guide

## 📋 Overview

Complete Docker setup for Mon Bondhu health platform with **all latest features**:

- ✅ **Voice Assistant with AI Chatbot** (OpenAI GPT-3.5 Turbo)
- ✅ **Interactive API Documentation** (Swagger UI at `/api-docs`)
- ✅ **Health Map** with Division → District → Upazila selection
- ✅ **Maternal & Mental Health** tracking systems
- ✅ **Bengali Language Support** (SolaimanLipi font)
- ✅ **Health Centers & Events** finder
- ✅ **Symptom Checker** with AI recommendations
- ✅ **Help Request** ticketing system
- ✅ **Healthchecks** for all services

## � Quick Start

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+
- 2GB free disk space
- **OpenAI API Key** (required for chatbot)

### 1️⃣ Environment Setup

```bash
# Create environment file from template
cp .env.example .env

# Edit .env and add your OpenAI API key
nano .env  # or use any text editor
```

**Required in `.env`:**
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Optional (defaults provided):**
```env
JWT_SECRET=your_secure_random_string_here
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/monbondhu
VITE_API_URL=http://localhost:5000
```

### 2️⃣ Build and Run

```bash
# Build all containers (first time or after code changes)
docker-compose build

# Start all services
docker-compose up -d

# View logs (optional - useful for debugging)
docker-compose logs -f

# Check container health status
docker ps
```

### 3️⃣ Access Application

- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:5000
- 📚 **API Documentation (Swagger)**: http://localhost:5000/api-docs
- 🗄️ **MongoDB**: localhost:27017

### 4️⃣ Verify Services

```bash
# Check all containers are running and healthy
docker-compose ps

# Test backend API
curl http://localhost:5000/api/health-tips

# Test frontend
curl http://localhost:3000
```

## 🏗️ Architecture

### Three-Container Setup

```
┌─────────────────────────────────────────────┐
│           Frontend Container                │
│  React + Vite + Nginx (Port 3000)          │
│  - Voice Assistant UI                       │
│  - Health Map with Location Dropdowns       │
│  - Maternal/Mental Health Forms             │
└──────────────┬──────────────────────────────┘
               │ HTTP Requests
               ▼
┌─────────────────────────────────────────────┐
│           Backend Container                 │
│  Node.js + Express (Port 5000)              │
│  - REST API (40+ endpoints)                 │
│  - OpenAI Chatbot Integration               │
│  - Swagger UI at /api-docs                  │
│  - Healthcheck: GET /api/health-tips        │
└──────────────┬──────────────────────────────┘
               │ Mongoose ODM
               ▼
┌─────────────────────────────────────────────┐
│           MongoDB Container                 │
│  MongoDB 6.0 (Port 27017)                   │
│  - Data persistence with volume             │
│  - Auto-seeding on first run                │
└─────────────────────────────────────────────┘
```

## 🐳 Docker Commands

### Basic Operations

```bash
# Build and start the application
docker-compose up -d --build

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop the application
docker-compose down

# Stop and remove volumes (⚠️ deletes database)
docker-compose down -v

# Stop and remove volumes (⚠️ deletes database)
docker-compose down -v

# Restart specific service
docker-compose restart backend

# Rebuild specific service
docker-compose build backend
docker-compose up -d backend
```

### Service Management

```bash
# Check container health status
docker ps

# View resource usage (CPU, Memory)
docker stats

# Execute command in container
docker-compose exec backend sh
docker-compose exec frontend sh

# View container details
docker inspect mon-bondhu-backend
```

### Database Operations

```bash
# Access MongoDB shell
docker-compose exec mongodb mongosh monbondhu

# Backup database
docker-compose exec mongodb mongodump --out=/data/backup

# Restore database
docker-compose exec mongodb mongorestore /data/backup

# View database logs
docker-compose logs -f mongodb
```

## 🔧 Configuration Files

### docker-compose.yml
Main orchestration file with 3 services:
- **frontend**: React app served by Nginx
- **backend**: Node.js Express API
- **mongodb**: Database with persistent volume

**Key Features:**
- Environment variable injection from `.env` file
- Named volumes for MongoDB persistence
- Healthchecks for backend service (30s interval)
- Networks for inter-container communication

### Backend Dockerfile (`backend/Dockerfile.backend`)
Multi-stage build for optimized image:
- **Stage 1**: Install dependencies
- **Stage 2**: Production runtime with Alpine Linux
- Includes: Swagger dependencies, healthcheck with wget
- Size: ~200MB (Node Alpine + dependencies)

### Frontend Dockerfile (`Dockerfile`)
Multi-stage build for lightweight deployment:
- **Stage 1**: Build React app with Vite
- **Stage 2**: Nginx Alpine serving static files
- Includes: Custom nginx.conf, gzip compression
- Size: ~50MB (Nginx Alpine + built app)

### .dockerignore Files
Optimized to exclude:
- Documentation files (except essential READMEs)
- Test files and test data
- Development tools (Postman collections, scripts)
- Node modules (rebuilt in container)

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | **Required** for chatbot functionality | `sk-proj-abc123...` |

### Optional Variables (with defaults)

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | Secret for JWT token generation | `your_jwt_secret_here` |
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://mongodb:27017/monbondhu` |
| `VITE_API_URL` | Frontend API base URL | `http://localhost:5000` |

**Get OpenAI API Key:**
1. Visit https://platform.openai.com/api-keys
2. Create new secret key
3. Copy and add to `.env` file

## 🧪 Testing the Deployment

### 1. Check Services Are Running

```bash
$ docker-compose ps

NAME                STATUS              PORTS
mon-bondhu-frontend    running            0.0.0.0:3000->80/tcp
mon-bondhu-backend     running (healthy)  0.0.0.0:5000->5000/tcp
mon-bondhu-mongodb     running            0.0.0.0:27017->27017/tcp
```

### 2. Test Backend API

```bash
# Health Tips endpoint
curl http://localhost:5000/api/health-tips

# Chatbot endpoint (requires OpenAI key)
curl -X POST http://localhost:5000/api/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{"message": "জ্বর হলে কি করবো?"}'

# Statistics endpoint
curl http://localhost:5000/api/statistics/overview
```

### 3. Test Swagger Documentation

Visit: http://localhost:5000/api-docs

You should see interactive API documentation with "Try it out" buttons.

### 4. Test Frontend

Visit: http://localhost:3000

Check all features:
- ✅ Landing page loads
- ✅ Voice Assistant button works
- ✅ Health Map dropdowns populate (Division → District → Upazila)
- ✅ Maternal Health form submits
- ✅ Mental Health tracking works
- ✅ Quick question buttons appear in chatbot

## 📊 Monitoring & Logs

### View Logs

## 📊 Monitoring & Logs

### View Logs

```bash
# All services (streaming)
docker-compose logs -f

# Last 100 lines from backend
docker-compose logs --tail=100 backend

# Follow frontend logs only
docker-compose logs -f frontend

# Search logs for errors
docker-compose logs backend | grep -i error
```

### Health Checks

Backend service has built-in healthcheck:
- **Endpoint**: `GET /api/health-tips`
- **Interval**: Every 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3 times before marking unhealthy

```bash
# Check health status
docker inspect mon-bondhu-backend --format='{{.State.Health.Status}}'

# View health check logs
docker inspect mon-bondhu-backend --format='{{json .State.Health}}' | jq
```

## 🚀 Production Deployment

### 1. Update Environment Variables

```bash
# Edit .env for production
nano .env
```

Change these for production:
```env
NODE_ENV=production
JWT_SECRET=use_a_very_long_random_string_here
VITE_API_URL=https://api.yourdomain.com
OPENAI_API_KEY=sk-your-production-key
```

### 2. Enable HTTPS

Option A: Use reverse proxy (Nginx/Traefik)
```bash
# Example Nginx config for HTTPS
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:3000;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

Option B: Use Let's Encrypt with Certbot
```bash
# Install certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com
```

### 3. Security Best Practices

- ✅ Use strong JWT secret (32+ random characters)
- ✅ Enable HTTPS in production
- ✅ Set proper CORS origins in backend
- ✅ Use MongoDB authentication
- ✅ Don't expose MongoDB port publicly
- ✅ Keep OpenAI API key secret
- ✅ Enable rate limiting for API endpoints
- ✅ Regular security updates: `docker-compose pull && docker-compose up -d`

### 4. Scaling Considerations

For high traffic:
```bash
# Scale backend to 3 instances
docker-compose up -d --scale backend=3

# Use load balancer (Nginx/HAProxy)
# Use managed MongoDB (MongoDB Atlas)
# Add Redis for caching
# Use CDN for frontend assets
```

## 📦 Image Management

### Save and Load Images

### Save and Load Images

```bash
# Save all images to tar files
docker save mon-bondhu-frontend:latest -o frontend.tar
docker save mon-bondhu-backend:latest -o backend.tar

# Or compress them (recommended)
docker save mon-bondhu-frontend:latest | gzip > frontend.tar.gz
docker save mon-bondhu-backend:latest | gzip > backend.tar.gz

# Load images on another machine
docker load -i frontend.tar
gunzip -c backend.tar.gz | docker load

# Transfer to another server
scp frontend.tar.gz backend.tar.gz user@server:/path/
```

### Push to Docker Hub

```bash
# Tag images with your Docker Hub username
docker tag mon-bondhu-frontend:latest yourusername/mon-bondhu-frontend:latest
docker tag mon-bondhu-backend:latest yourusername/mon-bondhu-backend:latest

# Login to Docker Hub
docker login

# Push images
docker push yourusername/mon-bondhu-frontend:latest
docker push yourusername/mon-bondhu-backend:latest

# Pull on another machine
docker pull yourusername/mon-bondhu-frontend:latest
docker pull yourusername/mon-bondhu-backend:latest
```

## �️ Troubleshooting

### Backend Container Won't Start

```bash
# Check logs for errors
docker-compose logs backend

# Common issues:
# 1. Missing OpenAI API key
#    Solution: Add OPENAI_API_KEY to .env file

# 2. MongoDB connection failed
#    Solution: Check mongodb container is running
docker-compose ps mongodb

# 3. Port 5000 already in use
#    Solution: Change PORT in docker-compose.yml
```

### Frontend Shows "Cannot connect to backend"

```bash
# Check backend is running
docker-compose ps backend

# Check backend health
curl http://localhost:5000/api/health-tips

# Check frontend environment
docker-compose exec frontend cat /usr/share/nginx/html/index.html | grep VITE_API_URL

# Solution: Rebuild frontend with correct API URL
docker-compose build frontend
docker-compose up -d frontend
```

### MongoDB Data Lost After Restart

```bash
# Check volume exists
docker volume ls | grep mon-bondhu

# If missing, data wasn't persisted
# Solution: Always use named volumes in docker-compose.yml
volumes:
  mongodb-data:
    name: mon-bondhu-mongodb-data
```

### Chatbot Not Responding

```bash
# Check OpenAI API key is set
docker-compose exec backend printenv | grep OPENAI_API_KEY

# Test OpenAI connection
docker-compose logs backend | grep -i openai

# Common issues:
# 1. Invalid API key
# 2. API rate limit exceeded
# 3. No credit balance on OpenAI account
```

### Health Map Upazila Dropdown Empty

```bash
# This should be fixed in latest code
# Verify you're running latest build:
docker-compose build frontend
docker-compose up -d frontend

# Check browser console for API errors
# F12 → Console tab
```

### Out of Disk Space

```bash
# Check Docker disk usage
docker system df

# Clean up unused images/containers
docker system prune -a

# Clean up volumes (⚠️ deletes data)
docker volume prune
```

## 🔍 Useful Commands

### Container Inspection

```bash
# List all containers
docker ps -a

# List all images
docker images

# View container stats (CPU, Memory, Network)
docker stats

# Inspect container configuration
docker inspect mon-bondhu-backend

# Check environment variables
docker-compose exec backend printenv
```

### Database Commands

```bash
# Access MongoDB shell
docker-compose exec mongodb mongosh monbondhu

# In mongosh:
show collections
db.healthtips.find().limit(5)
db.helprequests.countDocuments()
db.maternalhealth.aggregate([{$group: {_id: "$risk", count: {$sum: 1}}}])
```

### Development Commands

```bash
# Watch logs during development
docker-compose logs -f backend frontend

# Restart on code changes
docker-compose restart backend

# Rebuild after dependency changes
docker-compose build --no-cache backend
```

## 📚 Additional Resources

### Documentation Files
- `README.md` - Project overview and features
- `DESIGN_SYSTEM.md` - UI/UX design guidelines
- `API_DOCUMENTATION.md` - REST API reference
- `SWAGGER_SETUP.md` - OpenAPI/Swagger configuration guide
- `POSTMAN_GUIDE.md` - API testing with Postman

### API Documentation
- **Swagger UI**: http://localhost:5000/api-docs (when running)
- **Postman Collection**: `backend/postman_collection.json`
- **Environment Files**: 
  - `backend/postman_environment_local.json`
  - `backend/postman_environment_prod.json`

### Key Features Included in Docker

| Feature | Status | Notes |
|---------|--------|-------|
| Voice Assistant | ✅ Included | Requires OpenAI API key |
| Swagger API Docs | ✅ Included | Access at `/api-docs` |
| Health Map | ✅ Fixed | Upazila dropdown now works |
| Bengali Font | ✅ Included | SolaimanLipi embedded |
| Healthchecks | ✅ Enabled | Backend auto-monitoring |
| Maternal Health | ✅ Included | Full tracking system |
| Mental Health | ✅ Included | Mood tracking + tips |
| Symptom Checker | ✅ Included | AI-powered recommendations |
| Help Requests | ✅ Included | Ticket system |
| Statistics | ✅ Included | Dashboard with charts |

## � Changelog

### Latest Updates (Current Version)

- ✅ Added OpenAI chatbot integration
- ✅ Integrated Swagger UI for API documentation
- ✅ Fixed Health Map upazila dropdown issue
- ✅ Added healthchecks for backend service
- ✅ Updated .dockerignore to exclude test files
- ✅ Created .env.example template
- ✅ Optimized Docker images with multi-stage builds
- ✅ Added Bengali language support throughout
- ✅ Updated docker-compose.yml with all environment variables
- ✅ Comprehensive documentation added

## 🤝 Support

For issues or questions:
1. Check logs: `docker-compose logs -f`
2. Review troubleshooting section above
3. Check API documentation: http://localhost:5000/api-docs
4. Test with Postman collection
5. Open GitHub issue with error logs

## ⚠️ Important Notes

- **OpenAI API Key Required**: Chatbot won't work without it
- **First Run**: Backend seeds demo data automatically
- **Data Persistence**: Uses named volumes (data survives container restarts)
- **Port Conflicts**: Ensure ports 3000, 5000, 27017 are available
- **Production**: Change JWT_SECRET and enable HTTPS
- **Memory**: Requires ~1.5GB RAM for all services
- **Updates**: Pull latest code and rebuild: `git pull && docker-compose build`

---

**Mon Bondhu** - মন বন্ধু (Mind Friend) - Your trusted health companion 🏥💚
