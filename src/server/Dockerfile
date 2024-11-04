# backend/Dockerfile
# Use Golang image to build the backend
FROM golang:1.22

# Set the working directory
WORKDIR /app

# Copy the Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy all backend source files
COPY . .

# Build the Go application
RUN go build -o backend-app

# Expose the backend port
EXPOSE 8090

# Run the backend application
CMD ["./backend-app"]
