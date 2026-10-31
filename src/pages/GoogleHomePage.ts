import { Page, Locator } from '@playwright/test';

export class GoogleHomePage {
  readonly page: Page;
  readonly googleAppsIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.googleAppsIcon = page.getByRole('button', {
      name: /Google apps|Aplicaciones de Google|Apps de Google/i
    });
  }

  async navigateToGoogle(): Promise<void> {
    await this.page.goto('https://www.google.com');
  }

  async openGoogleAppsMenu(): Promise<void> {
    await this.googleAppsIcon.click();
  }

  async openDrive(): Promise<void> {
    await this.page
      .frameLocator('iframe[name="app"]')
      .getByText('Drive', { exact: true })
      .click();
  }
}
