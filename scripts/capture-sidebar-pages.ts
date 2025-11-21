import { chromium } from 'playwright';
import * as fs from 'fs';

async function captureSidebarPages() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('Opening Figma site...');
  await page.goto('https://glory-whole-24323768.figma.site/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Login
  console.log('Logging in...');
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'admin');
  await page.click('button');
  await page.waitForTimeout(3000);

  // Get all sidebar menu items (both parent and expandable items)
  const menuItems = await page.evaluate(() => {
    const items: { text: string; hasDropdown: boolean; index: number }[] = [];

    // Find all clickable items in sidebar
    const sidebarItems = document.querySelectorAll('aside [role="button"], aside button, aside a, aside li');

    sidebarItems.forEach((item, index) => {
      const text = item.textContent?.trim();
      if (text && text.length > 0) {
        const hasDropdown = item.querySelector('svg') !== null ||
                           item.classList.toString().includes('expand') ||
                           item.getAttribute('aria-expanded') !== null;
        items.push({ text, hasDropdown, index });
      }
    });

    return items;
  });

  console.log(`\nFound ${menuItems.length} sidebar items`);
  console.log(JSON.stringify(menuItems, null, 2));

  const pages: any[] = [];

  // Iterate through each menu item
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    console.log(`\n[${i + 1}/${menuItems.length}] Processing: ${item.text}`);

    try {
      // Find and click the item by text
      const itemLocator = page.locator(`aside >> text="${item.text}"`).first();

      if (await itemLocator.isVisible({ timeout: 2000 })) {
        await itemLocator.click();
        await page.waitForTimeout(1500);

        // If it has a dropdown, capture the expanded state
        if (item.hasDropdown) {
          console.log(`  └─ Expanding dropdown for: ${item.text}`);
          await page.waitForTimeout(1000);

          // Try to find sub-items
          const subItems = await page.locator(`aside >> text="${item.text}" >> .. >> .. >> a, aside >> text="${item.text}" >> .. >> .. >> [role="button"]`).count();
          console.log(`  └─ Found ${subItems} sub-items`);
        }

        // Take screenshot
        const fileName = `page-${String(i + 1).padStart(3, '0')}-${item.text.replace(/[^a-z0-9\u4e00-\u9fa5]/gi, '-')}.png`;
        await page.screenshot({ path: `screenshots/${fileName}`, fullPage: true });
        console.log(`  ✓ Saved: ${fileName}`);

        // Capture page structure
        const structure = await page.evaluate(() => {
          const title = document.querySelector('h1, h2, [class*="title"]')?.textContent?.trim();

          const cards = Array.from(document.querySelectorAll('[class*="card"], [class*="Card"]')).length;

          const tables = Array.from(document.querySelectorAll('table')).map(table => {
            const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent?.trim());
            const rowCount = table.querySelectorAll('tbody tr').length;
            return { headers, rowCount };
          });

          const buttons = Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()).filter(Boolean);

          const inputs = Array.from(document.querySelectorAll('input')).map(i => ({
            type: i.type,
            placeholder: i.placeholder
          }));

          return { title, cards, tables, buttons, inputs };
        });

        pages.push({
          order: i + 1,
          name: item.text,
          hasDropdown: item.hasDropdown,
          fileName,
          structure
        });
      }
    } catch (error) {
      console.log(`  ✗ Error: ${error}`);
    }
  }

  // Save comprehensive analysis
  fs.writeFileSync('scripts/sidebar-pages-analysis.json', JSON.stringify({
    totalPages: pages.length,
    pages
  }, null, 2));

  console.log(`\n✓ Analysis saved to scripts/sidebar-pages-analysis.json`);
  console.log(`✓ Captured ${pages.length} total pages`);

  await page.waitForTimeout(2000);
  await browser.close();
}

captureSidebarPages().catch(console.error);
