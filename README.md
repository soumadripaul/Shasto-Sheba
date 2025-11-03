# 🩺 MonBondhu - Rural Healthcare Platform

<div align="center">

**A comprehensive healthcare platform designed for rural Bangladesh**

[🎨 HLD Design](https://app.eraser.io/workspace/OCsnwdaxSQEZGMM9bAcs) | [📡 API Docs](#api-specification) | [🐳 Docker Setup](http://localhost:32768/)

</div>

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [API Specification](#api-specification)
- [Postman Collection](#postman-collection)
- [Docker Setup](#docker-setup)
- [Installation](#installation)
- [Project Structure](#project-structure)

---

## 🎯 Project Overview

### Background

Access to healthcare in rural Bangladesh faces significant challenges including limited internet connectivity, scarcity of healthcare facilities, and low health awareness. **MonBondhu** provides a digital solution to bridge this gap.

### Solution

MonBondhu is a Progressive Web Application (PWA) that offers:

- ✅ **Offline-First** - Critical features work without internet
- ✅ **Bengali Language** - Full support for local language
- ✅ **Privacy-Focused** - Data stored locally on device
- ✅ **Simple Interface** - Icon and image-based navigation

### Target Users

- Rural population with limited healthcare access
- Pregnant women and children
- People facing mental health challenges
- Community health workers

---

## ✨ Key Features

### 1. 😊 Mental Health Assessment
- Daily mood tracking
- Private data storage with local storage
- Monthly reports and trend analysis

### 2. 🏥 Health Center Map
- Nearby hospitals and clinics information
- Contact details and addresses
- Emergency contact numbers
- Static data from JSON file

### 3. 🆘 Anonymous Help Request
- Request help privately through forms
- Emergency referral system

### 4. 💡 Health Tips
- Seasonal health advice
- Disease prevention tips
- Nutrition guidelines
- Daily health habits from static data

### 5. 👶 Maternal & Child Health
- Vaccination schedule and reminders
- Pregnancy checkup tracking
- Nutrition advice
- Prenatal and postnatal care information

### 6. 🩺 Symptom Checker
- Common disease symptom identification
- Warning signs alert
- First aid guidance
- Doctor consultation recommendations

### 7. 📅 Health Events & Camps
- Upcoming health camp information from JSON data
- Vaccination programs
- Health awareness events
- Free medical services

### 8. 👨‍⚕️ Health Worker Network
- List of trained health workers from static data
- Contact information

### 9. 🎤 Voice Assistant
- Bengali voice command interface
- Text-to-speech support
- Accessibility for illiterate users

---

## 🛠 Technology Stack

### Frontend
- **React 19.1** - UI Framework
- **Vite 7.1** - Build tool and dev server
- **React Router v7.9** - Client-side routing
- **CSS3** - Custom styling
- **LocalStorage** - Client-side data persistence

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container management
- **Nginx** - Web server and reverse proxy
- **Node.js 18** - Build environment

---

### High-Level Design

View our complete system architecture and design:

🔗 **[Eraser.io HLD Diagram](https://app.eraser.io/workspace/OCsnwdaxSQEZGMM9bAcs)**

### Current System Architecture

```
┌─────────────────────────────────────────────────┐
│              Client Layer (PWA)                 │
│  ┌──────────────────────────────────────────┐  │
│  │         React Application                │  │
│  │  ┌──────────┐  ┌──────────────────────┐ │  │
│  │  │  Pages   │  │    Components        │ │  │
│  │  │  - Landing│  │    - Header         │ │  │
│  │  │  - Mental │  │    - Footer         │ │  │
│  │  │  - Health │  │                      │ │  │
│  │  │  - Map    │  │                      │ │  │
│  │  └──────────┘  └──────────────────────┘ │  │
│  │                                          │  │
│  │  ┌──────────────────────────────────┐   │  │
│  │  │    Static Data (JSON Files)      │   │  │
│  │  │    - events.json                 │   │  │
│  │  │    - healthCenters.json          │   │  │
│  │  │    - healthTips.json             │   │  │
│  │  │    - workers.json                │   │  │
│  │  └──────────────────────────────────┘   │  │
│  │                                          │  │
│  │  ┌──────────────────────────────────┐   │  │
│  │  │    Local Storage                 │   │  │
│  │  │    - User preferences            │   │  │
│  │  │    - Mental health records       │   │  │
│  │  └──────────────────────────────────┘   │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 📡 API Specification

### API Documentation Links

Our API specifications are available in multiple formats:

#### Swagger/OpenAPI Specification
```
Base URL: [To be configured]
Swagger UI: [To be added]
OpenAPI Spec: [To be added]
```
#### Scalar Documentation
```
Scalar Docs: [To be added]
```

### API Endpoints

> **Note:** API endpoints documentation will be added here.

## 📬 Postman Collection

### Collection Overview

Postman collection structure will be organized as follows:

## 🐳 Docker Setup

### Docker Configuration

The application is fully containerized using Docker.

#### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Key Features:**
- Multi-stage build for smaller image size
- Alpine Linux for lightweight deployment
- Nginx for serving static files
- Production-optimized configuration

#### Docker Compose

```yaml
version: '3.8'

services:
  monbondhu-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: monbondhu-web
    ports:
      - "3000:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
    networks:
      - monbondhu-network

networks:
  monbondhu-network:
    driver: bridge
```




- Github Repository: [Shasto-Sheba](https://github.com/soumadripaul/Shasto-Sheba)

</div>


