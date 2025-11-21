import { chromium } from 'playwright';
import * as fs from 'fs';

async function captureAllPages() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('Opening Figma site...');
  await page.goto('https://glory-whole-24323768.figma.site/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take login page screenshot
  await page.screenshot({ path: 'screenshots/01-login.png', fullPage: true });
  console.log('✓ Login page captured');

  // Login with demo credentials
  console.log('\nLogging in with admin/admin...');
  await page.fill('input[type="text"], input[name="username"], input[placeholder*="帳號"]', 'admin');
  await page.fill('input[type="password"], input[name="password"], input[placeholder*="密碼"]', 'admin');
  await page.click('button:has-text("登入"), button[type="submit"]');

  await page.waitForTimeout(3000);

  // Take dashboard screenshot
  await page.screenshot({ path: 'screenshots/02-dashboard.png', fullPage: true });
  console.log('✓ Dashboard captured');

  // Get all navigation items
  const navItems = await page.locator('nav a, aside a, [role="navigation"] a, [class*="sidebar"] a, [class*="menu"] a').all();

  console.log(`\nFound ${navItems.length} navigation items`);

  const pages: any[] = [];

  for (let i = 0; i < navItems.length; i++) {
    try {
      // Re-query each time to avoid stale elements
      const currentNavItems = await page.locator('nav a, aside a, [role="navigation"] a, [class*="sidebar"] a, [class*="menu"] a').all();
      if (i >= currentNavItems.length) break;

      const navItem = currentNavItems[i];
      const text = await navItem.textContent();
      const href = await navItem.getAttribute('href');

      if (!text?.trim()) continue;

      console.log(`\n[${i + 1}/${navItems.length}] Capturing: ${text.trim()}`);

      // Click the navigation item
      await navItem.click();
      await page.waitForTimeout(2000);

      // Take screenshot
      const fileName = `${String(i + 3).padStart(2, '0')}-${text.trim().replace(/[^a-z0-9\u4e00-\u9fa5]/gi, '-').toLowerCase()}.png`;
      await page.screenshot({ path: `screenshots/${fileName}`, fullPage: true });
      console.log(`✓ Saved: ${fileName}`);

      // Analyze page structure
      const structure = await page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => ({
          tag: h.tagName,
          text: h.textContent?.trim()
        }));

        const tables = Array.from(document.querySelectorAll('table')).map(table => ({
          rows: table.querySelectorAll('tr').length,
          cols: table.querySelector('tr')?.querySelectorAll('th, td').length || 0
        }));

        const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim());

        const forms = Array.from(document.querySelectorAll('form')).map(() => ({
          inputs: Array.from(document.querySelectorAll('input')).map(i => ({
            type: i.getAttribute('type'),
            name: i.getAttribute('name'),
            placeholder: i.getAttribute('placeholder')
          }))
        }));

        return { headings, tables, buttons, forms };
      });

      pages.push({
        name: text.trim(),
        href,
        fileName,
        structure
      });

    } catch (error) {
      console.log(`Error capturing page: ${error}`);
    }
  }

  // Save analysis
  fs.writeFileSync('scripts/pages-analysis.json', JSON.stringify(pages, null, 2));
  console.log('\n✓ Analysis saved to scripts/pages-analysis.json');
  console.log(`\n✓ Captured ${pages.length} pages total`);

  await page.waitForTimeout(2000);
  await browser.close();
}

captureAllPages().catch(console.error);
