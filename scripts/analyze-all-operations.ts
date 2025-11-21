import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface PageAnalysis {
  pageName: string;
  url: string;
  formFields: any[];
  tableColumns: string[];
  screenshots: string[];
}

const pages = [
  { name: 'dissolve', url: 'https://chia-yi-steel-dashboard-frontend.vercel.app/process/dissolve', label: '烘解作業' },
  { name: 'defect', url: 'https://chia-yi-steel-dashboard-frontend.vercel.app/process/defect', label: '造模作業' },
  { name: 'spheroidizing', url: 'https://chia-yi-steel-dashboard-frontend.vercel.app/process/spheroidizing', label: '球化作業' },
  { name: 'quenching', url: 'https://chia-yi-steel-dashboard-frontend.vercel.app/process/quenching', label: '淬注作業' },
];

async function analyzeAllOperations() {
  console.log('Starting comprehensive analysis of all operation pages...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const allAnalyses: PageAnalysis[] = [];

  for (const pageInfo of pages) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Analyzing: ${pageInfo.label} (${pageInfo.name})`);
    console.log('='.repeat(60));

    const page = await context.newPage();
    const screenshotsDir = path.join(process.cwd(), `screenshots/${pageInfo.name}-process`);

    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const analysis: PageAnalysis = {
      pageName: pageInfo.label,
      url: pageInfo.url,
      formFields: [],
      tableColumns: [],
      screenshots: [],
    };

    try {
      console.log(`Navigating to ${pageInfo.url}...`);
      await page.goto(pageInfo.url, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      await page.waitForTimeout(2000);

      // Take screenshot of main page
      const mainScreenshot = path.join(screenshotsDir, '01-main-page.png');
      await page.screenshot({ path: mainScreenshot, fullPage: true });
      analysis.screenshots.push(mainScreenshot);
      console.log(`Screenshot: Main page saved`);

      // Analyze table columns
      console.log('Analyzing table columns...');
      const tableHeaders = await page.$$eval('table thead th, table thead td', (cells) =>
        cells.map(cell => cell.textContent?.trim() || '')
      ).catch(() => []);

      analysis.tableColumns = tableHeaders;
      console.log(`Found ${tableHeaders.length} table columns:`, tableHeaders.join(' | '));

      // Click "新增" button to open form
      console.log('Looking for 新增 button...');
      const addButton = page.locator('button:has-text("新增")').first();

      if (await addButton.count() > 0) {
        await addButton.click();
        console.log('Clicked 新增 button');
        await page.waitForTimeout(3000);

        // Take screenshot of form
        const formScreenshot = path.join(screenshotsDir, '02-add-form.png');
        await page.screenshot({ path: formScreenshot, fullPage: true });
        analysis.screenshots.push(formScreenshot);
        console.log(`Screenshot: Add form saved`);

        // Analyze all form fields
        console.log('Analyzing form fields...');
        const inputs = await page.$$('input:visible, select:visible, textarea:visible');
        console.log(`Found ${inputs.length} visible input fields`);

        for (let i = 0; i < inputs.length; i++) {
          const input = inputs[i];
          const tagName = await input.evaluate(el => el.tagName.toLowerCase());
          const type = await input.getAttribute('type') || 'text';
          const name = await input.getAttribute('name') || '';
          const id = await input.getAttribute('id') || '';

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

          analysis.formFields.push({
            index: i + 1,
            label: labelText,
            tagName,
            type,
            name,
            id,
          });
        }

        // Get all labels
        const labels = await page.$$eval(
          'label:visible, .MuiFormLabel-root:visible, .MuiInputLabel-root:visible',
          (elements) => elements.map(el => el.textContent?.trim()).filter(t => t)
        ).catch(() => []);

        console.log(`\nLabels found (${labels.length}):`);
        labels.forEach((label, i) => {
          console.log(`  ${i + 1}. ${label}`);
        });
      } else {
        console.log('No 新增 button found on this page');
      }

      // Save analysis
      const analysisPath = path.join(screenshotsDir, 'analysis.json');
      fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
      console.log(`Analysis saved to: ${analysisPath}`);

      allAnalyses.push(analysis);

      await page.close();

    } catch (error) {
      console.error(`Error analyzing ${pageInfo.name}:`, error);
      const errorScreenshot = path.join(screenshotsDir, 'error.png');
      await page.screenshot({ path: errorScreenshot, fullPage: true });
      console.log(`Error screenshot saved: ${errorScreenshot}`);
      await page.close();
    }
  }

  await browser.close();

  // Generate comparison report
  console.log(`\n${'='.repeat(60)}`);
  console.log('ANALYSIS COMPLETE - SUMMARY');
  console.log('='.repeat(60));

  const reportPath = path.join(process.cwd(), 'screenshots/operations-comparison.md');
  let report = '# Operation Pages Analysis\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;

  for (const analysis of allAnalyses) {
    report += `## ${analysis.pageName}\n\n`;
    report += `**URL**: ${analysis.url}\n\n`;
    report += `### Table Columns (${analysis.tableColumns.length})\n\n`;
    report += analysis.tableColumns.map((col, i) => `${i + 1}. ${col}`).join('\n');
    report += '\n\n';
    report += `### Form Fields (${analysis.formFields.length})\n\n`;

    const uniqueLabels = [...new Set(analysis.formFields.map(f => f.label).filter(Boolean))];
    report += uniqueLabels.map((label, i) => `${i + 1}. ${label}`).join('\n');
    report += '\n\n';
    report += `### Screenshots\n\n`;
    analysis.screenshots.forEach((screenshot, i) => {
      report += `${i + 1}. \`${path.basename(screenshot)}\`\n`;
    });
    report += '\n---\n\n';

    console.log(`\n${analysis.pageName}:`);
    console.log(`  Table Columns: ${analysis.tableColumns.length}`);
    console.log(`  Form Fields: ${analysis.formFields.length}`);
    console.log(`  Screenshots: ${analysis.screenshots.length}`);
  }

  fs.writeFileSync(reportPath, report);
  console.log(`\nComparison report saved to: ${reportPath}`);

  console.log('\n✅ All operations analyzed successfully!\n');
}

// Run the analysis
analyzeAllOperations()
  .then(() => {
    console.log('Analysis completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Analysis failed:', error);
    process.exit(1);
  });
