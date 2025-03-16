# PROYECTO_INGENIERIA_GRUPO_JAHE_FRONTEND
# Sistema de Reservación de Hoteles

## Descripción
Este es un sistema de reservación de hoteles que permite a los usuarios buscar, reservar y administrar sus estadías en hoteles registrados. El sistema está dividido en dos repositorios independientes:

- **Frontend:** Desarrollado en [Tecnología utilizada, por ejemplo, Angular o React], proporcionando una interfaz intuitiva para los usuarios.
- **Backend:** Construido en [Tecnología utilizada, por ejemplo, Node.js con Express o Spring Boot], encargado de la lógica del negocio y la gestión de datos.

El proyecto también se relaciona con un **drive** que almacena archivos relevantes, como documentación, diseños de bases de datos y otros recursos.

## Tecnologías Utilizadas

### Frontend
- [Framework o librería utilizada]
- Tailwind CSS / Bootstrap
- Consumo de API REST
- Manejo de estado con [Redux, Context API, etc.]

### Backend
- [Lenguaje y framework utilizado]
- Base de datos: [MySQL, PostgreSQL, MongoDB, etc.]
- Autenticación con JWT / OAuth
- Arquitectura basada en microservicios / MVC

## Instalación y Configuración
### Clonar los repositorios
```bash
# Clonar el frontend
git clone https://github.com/usuario/frontend-reservacion-hoteles.git

# Clonar el backend
git clone https://github.com/usuario/backend-reservacion-hoteles.git
```

### Configuración del Backend
1. Instalar dependencias:
```bash
cd backend-reservacion-hoteles
npm install  # o el gestor de paquetes correspondiente
```
2. Configurar variables de entorno en un archivo `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=contraseña
JWT_SECRET=clave_secreta
```
3. Iniciar el servidor:
```bash
npm start
```

### Configuración del Frontend
1. Instalar dependencias:
```bash
cd frontend-reservacion-hoteles
npm install
```
2. Configurar variables de entorno:
```
REACT_APP_API_URL=http://localhost:5000
```
3. Iniciar el proyecto:
```bash
npm start
```

## Estructura del Proyecto
```
/
├── frontend-reservacion-hoteles  # Interfaz de usuario
├── backend-reservacion-hoteles   # Lógica del negocio y base de datos
├── drive                         # Archivos compartidos (documentación, diagramas, etc.)
```

## Funcionalidades
- Registro e inicio de sesión de usuarios
- Búsqueda y filtrado de hoteles
- Realización y cancelación de reservas
- Integración con pasarelas de pago
- Gestión de administradores y hoteles

## Contribución
Si deseas contribuir al proyecto, sigue estos pasos:
1. Realiza un fork del repositorio.
2. Crea una rama con tu función o corrección (`git checkout -b nueva-funcionalidad`).
3. Realiza cambios y haz commit (`git commit -m 'Descripción del cambio'`).
4. Envía un pull request para su revisión.

## Licencia
Este proyecto está bajo la licencia [Nombre de la licencia, por ejemplo, MIT].

## Contacto
Para consultas o soporte, puedes contactar a [Tu correo o redes sociales].

