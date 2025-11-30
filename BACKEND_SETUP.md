# Configuración de Backend - API Integration

## 📡 Configuración del Proxy

El frontend está configurado para comunicarse con el backend a través de un proxy inverso de Nginx.

### Arquitectura

```
Navegador → http://localhost/api/* → Nginx (puerto 80) → Backend (puerto 8080)
```

### Configuración Actual

- **Frontend URL:** `http://localhost` (puerto 80)
- **API Endpoints:** `/api/creditos/*` (rutas relativas)
- **Backend URL:** `http://host.docker.internal:8080/api/*`

El proxy de Nginx redirige automáticamente todas las peticiones a `/api/*` al backend en el puerto 8080.

## 🚀 Requisitos del Backend

Para que la aplicación funcione correctamente, necesitas tener el backend corriendo en:

```
http://localhost:8080
```

### Endpoints Esperados

1. **Buscar por NFS-e:**
   ```
   GET /api/creditos/{numeroNfse}
   ```

2. **Buscar por Número de Crédito:**
   ```
   GET /api/creditos/credito/{numeroCredito}
   ```

## ✅ Verificar que el Backend está Corriendo

### 1. Verificar Puerto 8080

```powershell
netstat -ano | findstr ":8080"
```

Deberías ver una línea con `LISTENING` en el puerto 8080.

### 2. Probar Endpoint Directamente

```powershell
# Reemplaza 123456 con un número válido
Invoke-WebRequest -Uri "http://localhost:8080/api/creditos/credito/123456" -UseBasicParsing
```

### 3. Probar a través del Proxy de Nginx

```powershell
# Esto debería funcionar si el backend está corriendo
Invoke-WebRequest -Uri "http://localhost/api/creditos/credito/123456" -UseBasicParsing
```

## 🔧 Solución de Problemas

### Error: "ERR_CONNECTION_REFUSED" o "502 Bad Gateway"

**Causa:** El backend no está corriendo o no está escuchando en el puerto 8080.

**Solución:**
1. Verifica que el backend esté corriendo: `netstat -ano | findstr ":8080"`
2. Inicia el backend (Spring Boot u otro servidor)
3. Verifica los logs del backend

### Error: "404 Not Found"

**Causa:** La ruta del API no existe en el backend.

**Solución:**
1. Verifica que las rutas del backend coincidan:
   - `/api/creditos/{numeroNfse}`
   - `/api/creditos/credito/{numeroCredito}`
2. Revisa la documentación del backend

### Error: CORS

**Causa:** El backend tiene restricciones CORS.

**Solución:** La configuración de Nginx ya incluye headers CORS. Si aún hay problemas:
1. Verifica la configuración CORS del backend
2. Asegúrate de que el backend permita peticiones desde `http://localhost`

## 🐳 Usar Backend en Docker

Si el backend también está en Docker, actualiza `docker-compose.yml`:

```yaml
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: consulta_credito_ui
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - consulta_credito_network

  backend:
    image: tu-imagen-backend:latest
    container_name: consulta_credito_backend
    ports:
      - "8080:8080"
    networks:
      - consulta_credito_network

networks:
  consulta_credito_network:
    driver: bridge
```

Luego actualiza `nginx/nginx.conf`:

```nginx
location /api/ {
    proxy_pass http://backend:8080/api/;
    # ... resto de la configuración
}
```

## 📝 Cambiar Puerto del Backend

Si tu backend usa un puerto diferente (ej: 3000), actualiza `nginx/nginx.conf`:

```nginx
location /api/ {
    proxy_pass http://host.docker.internal:3000/api/;
    # ... resto de la configuración
}
```

Luego reconstruye:

```powershell
docker-compose down
docker-compose up -d --build
```

## 🧪 Probar la Integración

1. **Inicia el backend** en puerto 8080
2. **Verifica el backend:**
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:8080/api/creditos/credito/123456"
   ```
3. **Abre el frontend:** `http://localhost`
4. **Prueba la búsqueda** ingresando un número válido

## 📊 Logs Útiles

### Ver logs del frontend (Nginx)
```powershell
docker logs consulta_credito_ui
```

### Ver logs en tiempo real
```powershell
docker logs -f consulta_credito_ui
```

### Ver solo errores de proxy
```powershell
docker logs consulta_credito_ui 2>&1 | Select-String "proxy|upstream|error"
```

## 🔗 Referencia Rápida

| Componente | URL | Puerto |
|------------|-----|--------|
| Frontend | http://localhost | 80 |
| Backend | http://localhost:8080 | 8080 |
| API (a través del proxy) | http://localhost/api/* | 80 → 8080 |
| Health Check | http://localhost/health | 80 |
