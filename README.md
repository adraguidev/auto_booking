# Sistema de Reserva de Autos

Este proyecto consiste en un sistema de reserva de autos con una arquitectura de frontend y backend separados.

## Estructura del Proyecto

```
reserva-autos/
├── backend/                    # Proyecto Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── reservaautos/
│   │   │   │           ├── controller/    # Controladores REST
│   │   │   │           ├── model/         # Entidades JPA
│   │   │   │           ├── repository/    # Repositorios JPA
│   │   │   │           ├── service/       # Lógica de negocio
│   │   │   │           └── ReservaAutosApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
└── frontend/                   # Proyecto React
    ├── src/
    │   ├── components/        # Componentes reutilizables
    │   ├── pages/            # Páginas/views
    │   ├── services/         # Servicios API
    │   ├── utils/            # Utilidades
    │   └── App.js            # Componente principal
    ├── public/               # Archivos estáticos
    └── package.json
```

## Requisitos Previos

- Java 17
- Maven
- Node.js y npm
- PostgreSQL

## Configuración del Backend

1. Asegúrate de tener PostgreSQL instalado y ejecutándose
2. Crea una base de datos llamada `reserva_autos_db`
3. Ajusta las credenciales en `backend/src/main/resources/application.properties`
4. Ejecuta el backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

## Configuración del Frontend

1. Instala las dependencias:
   ```bash
   cd frontend
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

## Tecnologías Utilizadas

### Backend
- Spring Boot 3.2.3
- Spring Data JPA
- PostgreSQL
- Lombok

### Frontend
- React 18
- React Router
- Axios
- Material-UI (opcional) 