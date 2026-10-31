import { chromium } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Google bloquea inicios de sesión automatizados vía Chromium directo.
 * Para solucionar esto:
 * 1. Ejecuta este script para abrir un navegador con perfil persistente o manual.
 * 2. Inicia sesión manualmente en Google.
 * 3. Presiona ENTER en la consola y se guardará la sesión autenticada en 'auth/storageState.json'.
 */
(async () => {
  const authDir = path.join(__dirname, '../../auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  console.log('Iniciando navegador para inicio de sesión manual...');
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://accounts.google.com/');
  console.log('Por favor, inicia sesión con la cuenta Google de prueba en la ventana abierta.');
  console.log('Una vez iniciada la sesión y estando en la pantalla principal de Google/Drive, presiona ENTER en esta consola...');

  process.stdin.once('data', async () => {
    await context.storageState({ path: path.join(authDir, 'storageState.json') });
    console.log('¡Estado de autenticación guardado exitosamente en auth/storageState.json!');
    await browser.close();
    process.exit(0);
  });
})();
