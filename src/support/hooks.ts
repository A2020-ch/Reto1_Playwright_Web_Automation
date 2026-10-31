import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

setDefaultTimeout(60_000);

export let browser: Browser;
export let context: BrowserContext;
export let page: Page;

BeforeAll(async () => {
  browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled'] 
  });
});

Before(async () => {
  const authPath = path.join(__dirname, '../../auth/storageState.json');
  if (fs.existsSync(authPath)) {
    context = await browser.newContext({ storageState: authPath });
  } else {
    console.warn('⚠️ Archivo auth/storageState.json no encontrado. Se iniciará un contexto limpio.');
    context = await browser.newContext();
  }
  page = await context.newPage();
});

After(async () => {
  if (page) await page.close();
  if (context) await context.close();
});

AfterAll(async () => {
  if (browser) await browser.close();
});
