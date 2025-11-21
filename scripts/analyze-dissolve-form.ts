import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function analyzeDissolveForm() {
  console.log('Starting Playwright form analysis...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  const screenshotsDir = path.join(process.cwd(), 'screenshots/dissolve-process');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  try {
    console.log('Navigating to dissolve process page...');
    await page.goto('https://chia-yi-steel-dashboard-frontend.vercel.app/process/dissolve', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    // Take screenshot of initial page
    await page.screenshot({ path: path.join(screenshotsDir, '03-before-click-add.png'), fullPage: true });
    console.log('Screenshot: Before clicking add button');

    // Look for the "新增" button and click it
    console.log('Looking for 新增 button...');
    const addButton = page.locator('button:has-text("新增")').first();
    await addButton.waitFor({ state: 'visible', timeout: 5000 });
    await addButton.click();
    console.log('Clicked 新增 button');

    // Wait for dialog/form to appear
    await page.waitForTimeout(3000);

    // Take screenshot of the form
    await page.screenshot({ path: path.join(screenshotsDir, '04-add-form.png'), fullPage: true });
    console.log('Screenshot: Add form');

    // Analyze all form fields
    console.log('\n=== FORM FIELDS ANALYSIS ===\n');

    // Get all input fields
    const inputs = await page.$$('input:visible, select:visible, textarea:visible');
    console.log(`Found ${inputs.length} visible input fields`);

    const formFields = [];

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const tagName = await input.evaluate(el => el.tagName.toLowerCase());
      const type = await input.getAttribute('type') || 'text';
      const name = await input.getAttribute('name') || '';
      const id = await input.getAttribute('id') || '';
      const placeholder = await input.getAttribute('placeholder') || '';
      const value = await input.inputValue().catch(() => '');
      const required = await input.getAttribute('required') !== null;

      // Try to find label
      let labelText = '';
      try {
        labelText = await input.evaluate((el) => {
          const label = el.closest('label') ||
                       document.querySelector(`label[for="${el.id}"]`) ||
                       el.closest('.MuiFormControl-root')?.querySelector('label');
          return label?.textContent?.trim() || '';
        });
      } catch (e) {
        // ignore
      }

      // For select, get options
      let options: string[] = [];
      if (tagName === 'select') {
        options = await input.$$eval('option', (opts) =>
          opts.map(opt => opt.textContent?.trim() || '')
        );
      }

      const fieldInfo = {
        index: i + 1,
        tagName,
        type,
        name,
        id,
        label: labelText,
        placeholder,
        value,
        required,
        ...(options.length > 0 && { options }),
      };

      formFields.push(fieldInfo);

      console.log(`Field ${i + 1}:`);
      console.log(`  Label: ${labelText}`);
      console.log(`  Type: ${tagName} (${type})`);
      console.log(`  Name: ${name}`);
      console.log(`  ID: ${id}`);
      console.log(`  Placeholder: ${placeholder}`);
      console.log(`  Required: ${required}`);
      if (options.length > 0) {
        console.log(`  Options: ${options.join(', ')}`);
      }
      console.log('');
    }

    // Also check for any visible text that looks like labels
    console.log('\n=== ALL VISIBLE TEXT (Labels) ===\n');
    const labels = await page.$$eval('label:visible, .MuiFormLabel-root:visible, .MuiInputLabel-root:visible',
      (elements) => elements.map(el => el.textContent?.trim()).filter(t => t)
    );

    console.log('Labels found:');
    labels.forEach((label, i) => {
      console.log(`  ${i + 1}. ${label}`);
    });

    // Save analysis to JSON
    const analysisPath = path.join(screenshotsDir, 'form-analysis.json');
    fs.writeFileSync(analysisPath, JSON.stringify({
      formFields,
      labels,
      totalFields: formFields.length,
    }, null, 2));
    console.log(`\nForm analysis saved to: ${analysisPath}`);

    // Also try clicking edit on first row to see if there are differences
    console.log('\n=== CHECKING EDIT FORM ===\n');
    await page.goBack();
    await page.waitForTimeout(2000);

    const editButton = page.locator('button[aria-label*="edit"], button:has(svg):has-text("")').first();
    if (await editButton.count() > 0) {
      await editButton.click();
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(screenshotsDir, '05-edit-form.png'), fullPage: true });
      console.log('Screenshot: Edit form');
    }

    // Try clicking Quick Add
    console.log('\n=== CHECKING QUICK ADD FORM ===\n');
    await page.goBack();
    await page.waitForTimeout(2000);

    const quickAddButton = page.locator('button:has-text("快速新增")').first();
    if (await quickAddButton.count() > 0) {
      await quickAddButton.click();
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(screenshotsDir, '06-quick-add-form.png'), fullPage: true });
      console.log('Screenshot: Quick add form');
    }

    console.log('\n=== ANALYSIS COMPLETE ===\n');

  } catch (error) {
    console.error('Error during analysis:', error);
    const errorScreenshot = path.join(screenshotsDir, 'error-form.png');
    await page.screenshot({ path: errorScreenshot, fullPage: true });
    console.log(`Error screenshot saved: ${errorScreenshot}`);
  } finally {
    await browser.close();
  }
}

// Run the analysis
analyzeDissolveForm()
  .then(() => {
    console.log('Form analysis completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Form analysis failed:', error);
    process.exit(1);
  });
