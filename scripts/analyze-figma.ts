import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function analyzeFigmaSite() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('Navigating to Figma site...');
  await page.goto('https://glory-whole-24323768.figma.site/', { waitUntil: 'networkidle' });

  // Wait for page to fully load
  await page.waitForTimeout(3000);

  // Take screenshot of homepage
  await page.screenshot({ path: 'screenshots/homepage.png', fullPage: true });
  console.log('✓ Homepage screenshot saved');

  // Get all navigation links
  const navLinks = await page.evaluate(() => {
    const links: { text: string; href: string }[] = [];
    document.querySelectorAll('a').forEach((link) => {
      const text = link.textContent?.trim() || '';
      const href = link.getAttribute('href') || '';
      if (text && href) {
        links.push({ text, href });
      }
    });
    return links;
  });

  console.log('\n=== Navigation Links ===');
  console.log(JSON.stringify(navLinks, null, 2));

  // Get page structure
  const pageStructure = await page.evaluate(() => {
    const getColors = (el: Element) => {
      const styles = window.getComputedStyle(el);
      return {
        background: styles.backgroundColor,
        color: styles.color,
        border: styles.border
      };
    };

    const getLayout = (el: Element) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        flexDirection: styles.flexDirection,
        justifyContent: styles.justifyContent,
        alignItems: styles.alignItems,
        padding: styles.padding,
        margin: styles.margin,
        width: styles.width,
        height: styles.height
      };
    };

    // Find main navigation/sidebar
    const sidebar = document.querySelector('[role="navigation"], nav, aside') ||
                    document.querySelector('[class*="sidebar"], [class*="nav"]');

    // Find main content area
    const main = document.querySelector('main, [role="main"], [class*="content"]');

    // Get all headings
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
      tag: h.tagName,
      text: h.textContent?.trim(),
      colors: getColors(h)
    }));

    // Get font families used
    const fonts = new Set<string>();
    document.querySelectorAll('*').forEach(el => {
      const font = window.getComputedStyle(el).fontFamily;
      if (font) fonts.add(font);
    });

    return {
      sidebar: sidebar ? {
        exists: true,
        layout: getLayout(sidebar),
        colors: getColors(sidebar),
        html: sidebar.outerHTML.substring(0, 1000)
      } : null,
      main: main ? {
        exists: true,
        layout: getLayout(main),
        colors: getColors(main)
      } : null,
      headings,
      fonts: Array.from(fonts),
      bodyColors: getColors(document.body),
      bodyLayout: getLayout(document.body)
    };
  });

  console.log('\n=== Page Structure ===');
  console.log(JSON.stringify(pageStructure, null, 2));

  // Get all clickable elements that might be menu items
  const menuItems = await page.evaluate(() => {
    const items: any[] = [];

    // Look for common navigation patterns
    const selectors = [
      '[role="menuitem"]',
      'nav a',
      'aside a',
      '[class*="menu"] a',
      '[class*="nav"] a',
      '[class*="sidebar"] a'
    ];

    const seen = new Set();
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el: any) => {
        const text = el.textContent?.trim();
        const href = el.href || el.getAttribute('href');
        const key = `${text}-${href}`;

        if (text && !seen.has(key)) {
          seen.add(key);
          const styles = window.getComputedStyle(el);
          items.push({
            text,
            href,
            fontSize: styles.fontSize,
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            padding: styles.padding
          });
        }
      });
    });

    return items;
  });

  console.log('\n=== Menu Items ===');
  console.log(JSON.stringify(menuItems, null, 2));

  // Try to find and click through different pages
  const pagesToExplore = menuItems.slice(0, 10); // Explore first 10 menu items

  for (let i = 0; i < pagesToExplore.length; i++) {
    const item = pagesToExplore[i];
    console.log(`\n\n=== Exploring: ${item.text} ===`);

    try {
      // Navigate to the page
      if (item.href && item.href.startsWith('http')) {
        await page.goto(item.href, { waitUntil: 'networkidle', timeout: 10000 });
      } else {
        // Try clicking the link
        await page.click(`text="${item.text}"`, { timeout: 5000 });
      }

      await page.waitForTimeout(2000);

      // Take screenshot
      const fileName = `page-${i}-${item.text.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.png`;
      await page.screenshot({ path: `screenshots/${fileName}`, fullPage: true });
      console.log(`✓ Screenshot saved: ${fileName}`);

      // Get page content structure
      const content = await page.evaluate(() => {
        return {
          title: document.title,
          headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
            tag: h.tagName,
            text: h.textContent?.trim()
          })),
          tables: document.querySelectorAll('table').length,
          forms: document.querySelectorAll('form').length,
          buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent?.trim()),
          inputs: Array.from(document.querySelectorAll('input')).map(i => ({
            type: i.getAttribute('type'),
            placeholder: i.getAttribute('placeholder')
          }))
        };
      });

      console.log(JSON.stringify(content, null, 2));

    } catch (error) {
      console.log(`Error exploring ${item.text}:`, error);
    }
  }

  // Save all findings to a JSON file
  const analysis = {
    navLinks,
    pageStructure,
    menuItems,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    'scripts/figma-analysis.json',
    JSON.stringify(analysis, null, 2)
  );
  console.log('\n✓ Analysis saved to scripts/figma-analysis.json');

  await browser.close();
}

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(process.cwd(), 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

analyzeFigmaSite().catch(console.error);
