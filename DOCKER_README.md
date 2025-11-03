# MonBondhu Docker Setup Guide

## 🐳 Docker Commands

### Build and Run with Docker Compose (Recommended)

```bash
# Build and start the application
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop the application
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Manual Docker Commands

```bash
# Build the Docker image
docker build -t monbondhu-app:latest .

# Run the container
docker run -d -p 3000:80 --name monbondhu-web monbondhu-app:latest

# View logs
docker logs -f monbondhu-web

# Stop the container
docker stop monbondhu-web

# Remove the container
docker rm monbondhu-web
```

### Save and Load Docker Image

```bash
# Save Docker image to a tar file
docker save monbondhu-app:latest -o monbondhu-app.tar

# Or compress it
docker save monbondhu-app:latest | gzip > monbondhu-app.tar.gz

# Load Docker image from tar file
docker load -i monbondhu-app.tar

# Or from compressed file
gunzip -c monbondhu-app.tar.gz | docker load
```

### Export and Import Container

```bash
# Export running container
docker export monbondhu-web -o monbondhu-container.tar

# Import container
docker import monbondhu-container.tar monbondhu-app:imported
```

## 📦 Push to Docker Hub (Optional)

```bash
# Tag your image
docker tag monbondhu-app:latest yourusername/monbondhu-app:latest

# Login to Docker Hub
docker login

# Push to Docker Hub
docker push yourusername/monbondhu-app:latest
```

## 🚀 Access the Application

After running the container, access the application at:
- **http://localhost:3000**

Health check endpoint:
- **http://localhost:3000/health**

## 🔍 Useful Commands

```bash
# List all containers
docker ps -a

# List all images
docker images

# Remove unused images
docker image prune

# View container stats
docker stats monbondhu-web

# Execute command in container
docker exec -it monbondhu-web sh

# Inspect container
docker inspect monbondhu-web
```

## 📊 Image Size Optimization

The Dockerfile uses multi-stage builds to keep the image size small:
- **Build stage**: Uses Node.js to build the app
- **Production stage**: Uses lightweight Nginx Alpine (~25MB base)

## 🔐 Production Considerations

1. **Environment Variables**: Add your environment variables in `docker-compose.yml`
2. **SSL/TLS**: Use a reverse proxy (Nginx/Traefik) or enable HTTPS in Nginx
3. **Monitoring**: Add monitoring tools (Prometheus, Grafana)
4. **Scaling**: Use Docker Swarm or Kubernetes for scaling

## 🛠️ Development vs Production

For development:
```bash
# Run with hot reload (development)
docker-compose -f docker-compose.dev.yml up
```

For production:
```bash
# Run optimized production build
docker-compose up -d
```

## 📝 Notes

- The app runs on port 80 inside the container
- Port 3000 on host is mapped to port 80 in container
- Nginx serves the built React app
- Health checks are enabled for monitoring
- Gzip compression is enabled for better performance
