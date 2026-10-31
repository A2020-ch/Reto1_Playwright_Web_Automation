# Playwright + TypeScript + POM + BDD Cucumber: Google Drive Document Automation

Este proyecto implementa la automatización BDD con Playwright, TypeScript y el patrón Page Object Model (POM) para el flujo de navegación en Google y creación de un nuevo documento en Google Drive.

## 🛡️ Solución al Bloqueo de Inicio de Sesión de Google

Google cuenta con mecanismos de seguridad avanzados (Bot Detection / Automation Controlled) que bloquean los inicios de sesión automatizados interactivos directos desde scripts.

Para resolver este desafío sin violar políticas ni fallar en la automatización:
1. **Mecanismo de Reutilización de Sesión (StorageState):** Se implementa un script previo (`saveAuthState.ts`) que levanta el navegador Chromium con banderas anti-detección para que el usuario ingrese la cuenta de prueba de manera única.
2. **Persistencia:** Al completar el login, se exportan las cookies/tokens a `auth/storageState.json`.
3. **Ejecución Automática:** Las ejecuciones posteriores del framework BDD cargan dicho estado guardado de manera transparente, permitiendo ingresar directamente a Google Drive en estado autenticado.

---

## 🛠️ Requisitos Previos

- **Node.js**: v18.x o superior
- **npm**: v9.x o superior

---

## 🚀 Pasos para Instalación y Ejecución

### 1. Clonar e Instalar Dependencias
```bash
npm install
npx playwright install chromium
```

### 2. Generar el Estado de Sesión Autenticada (Paso Único Previo)
Ejecuta el script interactivo para autenticar la cuenta de prueba:
```bash
npm run save-auth
```
- Se abrirá la ventana de Chromium.
- Ingresa las credenciales de tu cuenta de prueba de Google.
- Una vez cargado el correo/Drive, regresa a la terminal y presiona **ENTER**.
- Se creará el archivo `auth/storageState.json`.

### 3. Ejecutar las Pruebas BDD
Para lanzar la suite de pruebas BDD con Cucumber y Playwright:
```bash
npm test
```

---

## 📂 Estructura del Proyecto (POM + BDD)

```
playwright_project/
├── auth/                       # Almacenamiento de cookies/tokens de sesión
│   └── storageState.json
├── src/
│   ├── features/               # Archivos .feature redactados en Gherkin
│   │   └── google_drive_create_doc.feature
│   ├── pages/                  # Page Object Model (POM)
│   │   ├── GoogleHomePage.ts
│   │   ├── GoogleDrivePage.ts
│   │   └── GoogleDocsPage.ts
│   ├── step-definitions/       # Mapeo de pasos Gherkin a TypeScript
│   │   └── google_drive_steps.ts
│   └── support/                # Configuraciones y Hooks de Cucumber
│       ├── hooks.ts
│       └── saveAuthState.ts
├── cucumber.json               # Configuración del Runner de Cucumber
├── package.json
└── tsconfig.json
```
