# Consulta Crédito UI

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.1.

## 🐳 Docker Deployment (Recommended)

### Prerequisites
- Docker Desktop installed and running
- **Backend API running on port 8080** (required for full functionality)

### Quick Start with Docker

1. **Build and run the container:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   Open your browser and navigate to `http://localhost`
   
   **⚠️ IMPORTANTE:** Si ves una página en blanco, presiona `Ctrl + F5` para recargar sin caché.

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### 🚀 Script de Inicio Rápido (PowerShell)

Para verificar y abrir la aplicación automáticamente:
```powershell
.\open-app.ps1
```

### 🔧 Solución de Problemas

**Página en Blanco:**
- Presiona `Ctrl + F5` en el navegador para limpiar el caché
- O abre en modo incógnito: `Ctrl + Shift + N` (Chrome/Edge)
- Ver [TROUBLESHOOTING.md](TROUBLESHOOTING.md) para más soluciones

### Docker Commands

**Build the Docker image manually:**
```bash
docker build -t consulta-credito-ui .
```

**Run the container manually:**
```bash
docker run -d -p 80:80 --name consulta_credito_ui consulta-credito-ui
```

**View container logs:**
```bash
docker logs consulta_credito_ui
```

**Stop and remove the container:**
```bash
docker stop consulta_credito_ui
docker rm consulta_credito_ui
```

**Rebuild after code changes:**
```bash
docker-compose up -d --build
```

### Production Deployment

The Docker container includes:
- Multi-stage build for optimized image size
- Nginx web server for high performance
- **Reverse proxy to backend API** (port 8080)
- Gzip compression enabled
- Security headers configured
- CORS headers for API integration
- Health check endpoint at `/health`
- Optimized caching strategy for static assets
- Support for Angular routing (SPA)

### 🔗 Backend Integration

The frontend communicates with the backend through an Nginx reverse proxy:

```
Browser → http://localhost/api/* → Nginx → Backend (localhost:8080)
```

**Requirements:**
- Backend must be running on `http://localhost:8080`
- API endpoints: `/api/creditos/*`

**Verify backend is running:**
```powershell
netstat -ano | findstr ":8080"
```

For detailed backend setup instructions, see [BACKEND_SETUP.md](BACKEND_SETUP.md).

## 💻 Local Development (Without Docker)

### Prerequisites
- Node.js 20.x or higher
- npm 11.4.2 or higher

### Development server

To start a local development server, run:

```bash
npm install
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
npm test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📁 Project Structure

```
├── nginx/                  # Nginx configuration for Docker
│   └── nginx.conf         # Custom nginx settings
├── public/                # Public static assets
├── src/                   # Application source code
│   ├── app/              # Angular application modules and components
│   ├── index.html        # Main HTML file
│   ├── main.ts           # Application entry point
│   └── styles.css        # Global styles
├── Dockerfile            # Docker build instructions
├── docker-compose.yml    # Docker Compose configuration
└── .dockerignore         # Files to exclude from Docker build
```

## 🔧 Environment Configuration

For different environments, you can modify the nginx configuration in `nginx/nginx.conf` or create environment-specific Dockerfiles.

## 🚀 CI/CD Integration

This project is ready for continuous integration and deployment. The Docker setup ensures consistent builds across all environments.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
