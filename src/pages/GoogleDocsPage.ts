import { Page, Locator } from '@playwright/test';

export class GoogleDocsPage {
  readonly page: Page;
  readonly titleInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.locator('input.docs-title-input');
  }

  async setDocumentTitle(title: string): Promise<void> {
    await this.titleInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.titleInput.click();
    await this.titleInput.fill(title);
    await this.titleInput.press('Enter');
  }

  async getDocumentTitle(): Promise<string> {
    return this.titleInput.inputValue();
  }
}
