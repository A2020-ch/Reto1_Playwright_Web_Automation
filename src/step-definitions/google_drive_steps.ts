import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { page } from '../support/hooks';
import { GoogleHomePage } from '../pages/GoogleHomePage';
import { GoogleDrivePage } from '../pages/GoogleDrivePage';
import { GoogleDocsPage } from '../pages/GoogleDocsPage';

let googleHomePage: GoogleHomePage;
let googleDrivePage: GoogleDrivePage;
let googleDocsPage: GoogleDocsPage;
let docPage: Page;
let expectedTitleName: string;

function getFormattedSaveDateTime(): string {
  const savedAt = new Date();
  const day = String(savedAt.getDate()).padStart(2, '0');
  const month = String(savedAt.getMonth() + 1).padStart(2, '0');
  const year = savedAt.getFullYear();
  const hours = String(savedAt.getHours()).padStart(2, '0');
  const minutes = String(savedAt.getMinutes()).padStart(2, '0');
  const seconds = String(savedAt.getSeconds()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

Given('que el usuario navega a la vista del buscador de Google', async () => {
  googleHomePage = new GoogleHomePage(page);
  await googleHomePage.navigateToGoogle();
});

When('abre el menú de Google Apps', async () => {
  await googleHomePage.openGoogleAppsMenu();
});

When('navega hacia Google Drive con sesión autenticada', async () => {
  await googleHomePage.openDrive();
  googleDrivePage = new GoogleDrivePage(page);
});

When('crea un nuevo documento de tipo Google Docs', async () => {
  docPage = await googleDrivePage.createNewDocument();
  googleDocsPage = new GoogleDocsPage(docPage);
});

When('le asigna como nombre "E01_Axel_Chacaliaza_<fecha_hora_guardado>"', async () => {
  const saveDateTime = getFormattedSaveDateTime();
  expectedTitleName = `E01_Axel_Chacaliaza_${saveDateTime}`;
  await googleDocsPage.setDocumentTitle(expectedTitleName);
});

Then('el título del documento debe ser actualizado correctamente con el patrón esperado', async () => {
  const actualTitle = await googleDocsPage.getDocumentTitle();
  expect(actualTitle).toBe(expectedTitleName);
});

Then('el archivo guardado debe aparecer en Mi unidad de Google Drive', async () => {
  await googleDrivePage.openMyDrive();
  await expect(googleDrivePage.getDocumentByName(expectedTitleName)).toBeVisible({
    timeout: 30000
  });
});
