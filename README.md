# EcoLearn Loja - Frontend v1.0

Frontend de la plataforma educativa **EcoLearn Loja**, construido con React para compartir y gestionar contenido de video relacionado con ecología y educación ambiental en Loja, Ecuador.

> **🎨 Interfaz Moderna** - Diseño responsivo con temas personalizables y componentes reutilizables.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías-utilizadas)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación-y-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Páginas](#-páginas)
- [Componentes](#-componentes)
- [Servicios](#-servicios)
- [Temas](#-temas)
- [Autenticación](#-autenticación)
- [Scripts](#-scripts-disponibles)

---

## ✨ Características

### Interfaz de Usuario
- ✅ **Diseño Responsivo**: Adaptable a móviles, tablets y desktop
- ✅ **Temas Personalizables**: Sistema de temas con Neo Carbon y Light
- ✅ **Animaciones Suaves**: Transiciones y efectos visuales modernos
- ✅ **Componentes Reutilizables**: Biblioteca de componentes compartidos

### Funcionalidades
- ✅ **Autenticación Completa**: Login, registro y gestión de sesión
- ✅ **Gestión de Videos**: Subida, visualización y reproducción
- ✅ **Sistema de Comentarios**: Comentarios en videos
- ✅ **Sistema de Valoraciones**: Rating de 1-5 estrellas
- ✅ **Dashboard de Usuario**: Panel personalizado por rol
- ✅ **Perfil de Usuario**: Gestión de información personal

### Seguridad
- ✅ **Rutas Protegidas**: Control de acceso por autenticación
- ✅ **Tokens JWT**: Manejo seguro de sesiones
- ✅ **Refresh Tokens**: Renovación automática de sesión
- ✅ **Context API**: Estado global de autenticación

---

## �️ Tecnologías Utilizadas

### Core
- **React 18.3** - Biblioteca de UI
- **React Router DOM 6.28** - Enrutamiento
- **Axios 1.7** - Cliente HTTP

### UI/UX
- **Material-UI (MUI) 6.1** - Componentes de UI
- **Emotion** - CSS-in-JS
- **React Icons 5.4** - Iconos

### Gestión de Estado
- **React Context API** - Estado global
- **Custom Hooks** - Lógica reutilizable

### Desarrollo
- **Create React App** - Configuración base
- **ESLint** - Linting de código
- **Web Vitals** - Métricas de rendimiento

---

## 🏗️ Arquitectura

### Estructura de Capas

```
┌─────────────────────────────────────────┐
│          User Interface (Pages)          │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Layouts (PortalLayout)              │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Components (Shared/Specific)        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Services (API Calls)                │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Context (Auth, Theme)               │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     Backend API                         │
└─────────────────────────────────────────┘
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+
- npm o yarn
- Backend API corriendo

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Ismael-1105/frontend-ecologia.git
cd frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

**Nota:** Ver `.env.example` para más opciones de configuración.

**Configuraciones según entorno:**
- **Local development:** `http://localhost:8080/api`
- **Backend en VPS:** `http://YOUR_VPS_IP:8080/api`
- **Producción:** `https://api.yourdomain.com/api`

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📁 Estructura del Proyecto

```
frontend/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   └── Navbar.js
│   │   └── shared/
│   │       ├── Avatar/
│   │       │   └── IconAvatar.jsx
│   │       ├── Card/
│   │       │   ├── CardText.jsx
│   │       │   ├── GlassCard.jsx
│   │       │   └── GradientCard.jsx
│   │       ├── Section/
│   │       │   └── SectionHeader.jsx
│   │       ├── Stats/
│   │       │   └── StatCard.jsx
│   │       ├── SimpleVideoPlayer.jsx
│   │       ├── VideoPlayer.jsx
│   │       └── index.js
│   ├── core/
│   │   ├── api/
│   │   │   └── client.js
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── ThemeContext.js
│   │   ├── data/
│   │   │   └── videoData.js
│   │   └── services/
│   │       ├── authService.js
│   │       ├── commentService.js
│   │       ├── ratingService.js
│   │       ├── userService.js
│   │       ├── videoService.js
│   │       └── index.js
│   ├── layouts/
│   │   └── PortalLayout.jsx
│   ├── pages/
│   │   ├── AboutPage/
│   │   │   ├── AboutPage.jsx
│   │   │   └── components/
│   │   │       ├── ContactSection.jsx
│   │   │       ├── InfoSection.jsx
│   │   │       ├── MainHeader.jsx
│   │   │       ├── MissionVisionSection.jsx
│   │   │       └── ValuesSection.jsx
│   │   ├── HomePage/
│   │   │   ├── HomePage.jsx
│   │   │   └── components/
│   │   │       └── Hero.js
│   │   ├── LandingPage/
│   │   │   └── LandingPage.jsx
│   │   ├── LoginPage/
│   │   │   └── LoginPage.jsx
│   │   ├── RegisterPage/
│   │   │   └── RegisterPage.jsx
│   │   └── Portal/
│   │       ├── DashboardPage/
│   │       │   ├── DashboardPage.jsx
│   │       │   └── components/
│   │       │       └── VideoCard.js
│   │       ├── UploadVideoPage/
│   │       │   └── UploadVideoPage.jsx
│   │       └── VideoPlayerPage/
│   │           └── VideoPlayerPage.jsx
│   ├── styles/
│   │   └── animations.css
│   ├── themes/
│   │   ├── lightTheme.js
│   │   └── neoCarbonTheme.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 📄 Páginas

### Páginas Públicas

#### **LandingPage** (`/`)
- Página de inicio principal
- Información general del proyecto
- Call-to-action para registro/login

#### **HomePage** (`/home`)
- Página de bienvenida
- Hero section
- Información destacada

#### **AboutPage** (`/about`)
- Información del proyecto
- Misión y visión
- Valores
- Información de contacto

#### **LoginPage** (`/login`)
- Formulario de inicio de sesión
- Validación de credenciales
- Redirección al dashboard

#### **RegisterPage** (`/register`)
- Formulario de registro
- Validación de datos
- Roles: Estudiante, Docente

### Páginas Protegidas (Portal)

#### **DashboardPage** (`/portal/dashboard`)
- Panel principal del usuario
- Estadísticas personalizadas
- Videos recientes
- Acceso rápido a funcionalidades

#### **VideoPlayerPage** (`/portal/video-player`)
- Reproductor de videos
- Lista de videos disponibles
- Comentarios y valoraciones
- Información del video

#### **UploadVideoPage** (`/portal/upload-video`)
- Formulario de subida de videos
- Vista previa
- Metadatos (título, descripción)
- Solo para Docentes y Administradores

---

## 🧩 Componentes

### Componentes Compartidos

#### **Cards**
- **GlassCard**: Tarjeta con efecto glassmorphism
- **GradientCard**: Tarjeta con gradiente
- **CardText**: Tarjeta de texto simple

#### **Avatar**
- **IconAvatar**: Avatar con icono personalizable

#### **Stats**
- **StatCard**: Tarjeta de estadísticas

#### **Video**
- **VideoPlayer**: Reproductor de video completo con controles
- **SimpleVideoPlayer**: Reproductor básico

#### **Section**
- **SectionHeader**: Encabezado de sección reutilizable

### Componentes de Navegación

#### **Navbar**
- Navegación principal
- Menú responsivo
- Indicador de usuario autenticado
- Botones de login/logout

---

## 🔌 Servicios

### API Client (`core/api/client.js`)
Cliente Axios configurado con:
- Base URL del backend
- Interceptores de request (agregar token)
- Interceptores de response (manejar errores)
- Refresh token automático

### Auth Service (`core/services/authService.js`)
```javascript
- login(email, password)
- register(userData)
- logout()
- refreshToken()
- getCurrentUser()
```

### User Service (`core/services/userService.js`)
```javascript
- getProfile()
- updateProfile(data)
- updateProfilePicture(file)
- deleteAccount(password)
```

### Video Service (`core/services/videoService.js`)
```javascript
- getAllVideos(params)
- getVideoById(id)
- uploadVideo(formData)
- updateVideo(id, data)
- deleteVideo(id)
```

### Comment Service (`core/services/commentService.js`)
```javascript
- getComments(videoId)
- createComment(videoId, text)
- updateComment(commentId, text)
- deleteComment(commentId)
```

### Rating Service (`core/services/ratingService.js`)
```javascript
- rateVideo(videoId, rating)
- getVideoRating(videoId)
- getUserRating(videoId)
- deleteRating(videoId)
```

---

## 🎨 Temas

### Neo Carbon Theme
Tema oscuro moderno con:
- Colores oscuros y acentos vibrantes
- Gradientes sutiles
- Efectos de glassmorphism
- Sombras suaves

### Light Theme
Tema claro profesional con:
- Colores claros y acentos suaves
- Fondo blanco
- Bordes definidos
- Alta legibilidad

### Cambio de Tema
```javascript
import { useTheme } from './core/context/ThemeContext';

const { theme, toggleTheme } = useTheme();
```

---

## 🔐 Autenticación

### Context de Autenticación

```javascript
import { useAuth } from './core/context/AuthContext';

const { 
  user,           // Usuario actual
  isAuthenticated, // Estado de autenticación
  login,          // Función de login
  logout,         // Función de logout
  register        // Función de registro
} = useAuth();
```

### Rutas Protegidas

```javascript
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

### Flujo de Autenticación

1. Usuario ingresa credenciales
2. Frontend envía request al backend
3. Backend valida y retorna tokens
4. Frontend guarda tokens en localStorage
5. Tokens se incluyen en requests subsecuentes
6. Refresh token automático cuando expira access token

---

## � Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **start** | `npm start` | Inicia servidor de desarrollo |
| **build** | `npm run build` | Construye para producción |
| **test** | `npm test` | Ejecuta tests |
| **eject** | `npm run eject` | Expone configuración de CRA |

---

## 🌐 Variables de Entorno

### Configuración

Crear un archivo `.env` en la raíz del proyecto:

```env
# API Backend URL
VITE_API_BASE_URL=http://localhost:8080/api
```

### Variables Disponibles

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL base del backend API | `http://localhost:8080/api` |

### Configuraciones por Entorno

**Desarrollo Local (Backend en tu PC):**
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

**Backend en VPS:**
```env
VITE_API_BASE_URL=http://192.168.1.100:8080/api
```

**Producción:**
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

**Nota:** Las variables deben empezar con `VITE_` para ser accesibles en el cliente. Reiniciar el servidor después de cambiar variables de entorno.

---

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 **Mobile**: 320px - 767px
- 📱 **Tablet**: 768px - 1023px
- 💻 **Desktop**: 1024px+

---

## 🎯 Características Destacadas

### Gestión de Estado
- Context API para autenticación
- Context API para temas
- Estado local con hooks

### Optimizaciones
- Lazy loading de componentes
- Memoización con useMemo/useCallback
- Code splitting automático

### UX/UI
- Feedback visual en acciones
- Loading states
- Error handling
- Validación de formularios
- Mensajes de éxito/error

---

## 🔄 Integración con Backend

### Endpoints Utilizados

**Autenticación:**
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

**Usuarios:**
- `GET /api/users/me`
- `PUT /api/users/me`
- `PUT /api/users/me/profile-picture`

**Videos:**
- `GET /api/videos`
- `GET /api/videos/:id`
- `POST /api/videos`
- `PUT /api/videos/:id`
- `DELETE /api/videos/:id`

**Comentarios:**
- `GET /api/videos/:videoId/comments`
- `POST /api/videos/:videoId/comments`
- `PUT /api/videos/:videoId/comments/:commentId`
- `DELETE /api/videos/:videoId/comments/:commentId`

**Valoraciones:**
- `POST /api/videos/:videoId/rate`
- `GET /api/videos/:videoId/rate`
- `GET /api/videos/:videoId/rate/me`
- `DELETE /api/videos/:videoId/rate`

---

## 🚀 Despliegue

### Build de Producción

```bash
npm run build
```

Esto crea una carpeta `build/` con los archivos optimizados.

### Despliegue Recomendado

- **Vercel**: Despliegue automático desde GitHub
- **Netlify**: Integración continua
- **GitHub Pages**: Hosting gratuito
- **AWS S3 + CloudFront**: Escalable y rápido

---

## 🐛 Troubleshooting

### Problemas Comunes

**Error de CORS:**
```
Verificar que CORS_ORIGIN en backend incluya la URL del frontend
```

**Token expirado:**
```
El refresh token se maneja automáticamente
Si persiste, hacer logout y login nuevamente
```

**Videos no cargan:**
```
Verificar que el backend esté corriendo
Verificar REACT_APP_API_URL en .env
```

---

## � Recursos Adicionales

- [Documentación de React](https://react.dev/)
- [Material-UI Docs](https://mui.com/)
- [React Router Docs](https://reactrouter.com/)
- [Axios Docs](https://axios-http.com/)

---

## 👨‍💻 Autor

**Ismael Gonzalez**  
Email: castroismael571@gmail.com  
GitHub: [@Ismael-1105](https://github.com/Ismael-1105)

---

## 📄 Licencia

ISC

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Soporte

Para preguntas, bugs o sugerencias:
- Email: castroismael571@gmail.com
- Issues: [GitHub Issues](https://github.com/Ismael-1105/frontend-ecologia/issues)

---

**Versión**: 1.0.0  
**Última Actualización**: 2025-11-26  
**Estado**: ✅ En Desarrollo
