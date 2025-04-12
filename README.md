# AutoBooking - Sistema de Reserva de Autos

## Sprint 1 - Implementación Inicial

### Descripción
AutoBooking es una plataforma web para la reserva de autos, desarrollada con React en el frontend y Spring Boot en el backend.

### Características Implementadas en Sprint 1

#### Frontend
- Estructura base de la aplicación React
- Componentes principales:
  - Header con navegación
  - Footer con información legal
  - Buscador de autos
  - Listado de categorías
  - Grid de productos
  - Página de detalle de producto
- Diseño responsivo
- Integración con API backend

#### Backend
- API REST con Spring Boot
- Endpoints implementados:
  - GET /api/products - Listado de productos
  - GET /api/products/{id} - Detalle de producto
  - POST /api/products - Creación de producto
  - DELETE /api/products/{id} - Eliminación de producto
- Base de datos PostgreSQL
- Validación de datos

### Requisitos Técnicos

#### Frontend
- Node.js 18+
- npm 9+

#### Backend
- Java 17+
- Maven 3.8+
- PostgreSQL 14+

### Instalación y Ejecución

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Backend:
```bash
cd backend
mvn spring-boot:run
```

3. Frontend:
```bash
cd frontend
npm install
npm start
```

### Capturas de Pantalla

#### Página Principal
![Home Page](screenshots/home.png)

#### Página de Detalle
![Product Detail](screenshots/product-detail.png)

### Próximos Pasos (Sprint 2)
- Implementación de formularios de creación/edición
- Sistema de autenticación
- Gestión de reservas
- Mejoras en la interfaz de usuario 