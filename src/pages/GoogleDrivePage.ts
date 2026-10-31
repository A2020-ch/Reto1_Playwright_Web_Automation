import { Page, Locator } from '@playwright/test';

export class GoogleDrivePage {
  readonly page: Page;
  readonly newButton: Locator;
  readonly googleDocsOption: Locator;
  readonly blankDocumentOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newButton = page.getByRole('button', { name: /^(Nuevo|New)$/i });
    this.googleDocsOption = page.getByRole('menuitem', {
      name: /^(Documentos de Google|Google Docs)$/i
    });
    this.blankDocumentOption = page.getByRole('menuitem', {
      name: /^(Documento en blanco|Blank document)/
    });
  }

  async createNewDocument(): Promise<Page> {
    await this.newButton.waitFor({ state: 'visible' });
    await this.newButton.click();

    await this.googleDocsOption.waitFor({ state: 'visible' });
    await this.googleDocsOption.click();

    await this.blankDocumentOption.waitFor({ state: 'visible' });
    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup', { timeout: 45000 }),
      this.blankDocumentOption.click()
    ]);

    await newPage.waitForURL(/https:\/\/docs\.google\.com\/document\/d\//, {
      timeout: 45000
    });
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  async openMyDrive(): Promise<void> {
    await this.page.goto('https://drive.google.com/drive/my-drive', {
      waitUntil: 'domcontentloaded'
    });
  }

  getDocumentByName(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }
}
