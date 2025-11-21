import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface FieldInfo {
  type: string;
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface PageAnalysis {
  url: string;
  title: string;
  fields: FieldInfo[];
  buttons: Array<{ text: string; type: string }>;
  tables: Array<{ headers: string[]; rowCount: number }>;
  userFlow: string[];
  screenshots: string[];
}

async function analyzeDissolveProcess() {
  console.log('Starting Playwright analysis...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  const analysis: PageAnalysis = {
    url: 'https://chia-yi-steel-dashboard-frontend.vercel.app/process/dissolve',
    title: '',
    fields: [],
    buttons: [],
    tables: [],
    userFlow: [],
    screenshots: [],
  };

  try {
    console.log('Navigating to dissolve process page...');
    await page.goto('https://chia-yi-steel-dashboard-frontend.vercel.app/process/dissolve', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Get page title
    analysis.title = await page.title();
    console.log(`Page title: ${analysis.title}`);

    // Take initial screenshot
    const screenshotsDir = path.join(process.cwd(), 'screenshots/dissolve-process');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    const initialScreenshot = path.join(screenshotsDir, '01-initial-view.png');
    await page.screenshot({ path: initialScreenshot, fullPage: true });
    analysis.screenshots.push(initialScreenshot);
    console.log(`Screenshot saved: ${initialScreenshot}`);

    // Analyze all input fields
    console.log('Analyzing input fields...');
    const inputs = await page.$$('input, select, textarea');

    for (const input of inputs) {
      const type = await input.getAttribute('type') || 'text';
      const name = await input.getAttribute('name') || '';
      const placeholder = await input.getAttribute('placeholder') || '';
      const value = await input.inputValue().catch(() => '');
      const required = await input.getAttribute('required') !== null;

      // Try to find associated label
      const labelText = await input.evaluateHandle((el) => {
        const label = el.closest('label') ||
                     document.querySelector(`label[for="${el.id}"]`);
        return label?.textContent?.trim() || '';
      }).then(h => h.jsonValue());

      // For select elements, get options
      let options: string[] = [];
      if (await input.evaluate(el => el.tagName) === 'SELECT') {
        options = await input.$$eval('option', (opts) =>
          opts.map(opt => opt.textContent?.trim() || '')
        );
      }

      analysis.fields.push({
        type: await input.evaluate(el => el.tagName.toLowerCase()),
        label: labelText as string,
        name,
        value,
        placeholder,
        required,
        ...(options.length > 0 && { options }),
      });
    }

    console.log(`Found ${analysis.fields.length} input fields`);

    // Analyze buttons
    console.log('Analyzing buttons...');
    const buttons = await page.$$('button');

    for (const button of buttons) {
      const text = await button.textContent();
      const type = await button.getAttribute('type') || 'button';
      const isVisible = await button.isVisible();

      if (isVisible && text) {
        analysis.buttons.push({
          text: text.trim(),
          type,
        });
      }
    }

    console.log(`Found ${analysis.buttons.length} buttons`);

    // Analyze tables
    console.log('Analyzing tables...');
    const tables = await page.$$('table');

    for (const table of tables) {
      const headers = await table.$$eval('thead th, thead td', (cells) =>
        cells.map(cell => cell.textContent?.trim() || '')
      );

      const rows = await table.$$('tbody tr');

      analysis.tables.push({
        headers,
        rowCount: rows.length,
      });
    }

    console.log(`Found ${analysis.tables.length} tables`);

    // Take screenshot after scrolling
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    const midScreenshot = path.join(screenshotsDir, '02-mid-scroll.png');
    await page.screenshot({ path: midScreenshot, fullPage: true });
    analysis.screenshots.push(midScreenshot);
    console.log(`Screenshot saved: ${midScreenshot}`);

    // Document user flow
    analysis.userFlow = [
      '1. User navigates to dissolve process page',
      '2. User views current dissolve operations/records',
      '3. User can add new dissolve operation (via button)',
      '4. User fills in form fields (batch info, machine, parameters, etc.)',
      '5. User submits form to create/update record',
      '6. User can view/edit/delete existing records in table',
      '7. User can search/filter records',
      '8. User can export data (if available)',
    ];

    // Save analysis to JSON
    const analysisPath = path.join(screenshotsDir, 'analysis.json');
    fs.writeFileSync(analysisPath, JSON.stringify(analysis, null, 2));
    console.log(`Analysis saved to: ${analysisPath}`);

    // Generate markdown report
    const reportPath = path.join(screenshotsDir, 'ANALYSIS-REPORT.md');
    const report = generateMarkdownReport(analysis);
    fs.writeFileSync(reportPath, report);
    console.log(`Report saved to: ${reportPath}`);

    console.log('\n=== ANALYSIS COMPLETE ===\n');
    console.log(`Total Fields: ${analysis.fields.length}`);
    console.log(`Total Buttons: ${analysis.buttons.length}`);
    console.log(`Total Tables: ${analysis.tables.length}`);
    console.log(`Screenshots: ${analysis.screenshots.length}`);

  } catch (error) {
    console.error('Error during analysis:', error);

    // Take error screenshot
    const screenshotsDir = path.join(process.cwd(), 'screenshots/dissolve-process');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    const errorScreenshot = path.join(screenshotsDir, 'error.png');
    await page.screenshot({ path: errorScreenshot, fullPage: true });
    console.log(`Error screenshot saved: ${errorScreenshot}`);
  } finally {
    await browser.close();
  }

  return analysis;
}

function generateMarkdownReport(analysis: PageAnalysis): string {
  let report = `# Dissolve Process Page Analysis\n\n`;
  report += `**URL**: ${analysis.url}\n`;
  report += `**Page Title**: ${analysis.title}\n`;
  report += `**Analysis Date**: ${new Date().toISOString()}\n\n`;

  report += `## Summary\n\n`;
  report += `- **Total Fields**: ${analysis.fields.length}\n`;
  report += `- **Total Buttons**: ${analysis.buttons.length}\n`;
  report += `- **Total Tables**: ${analysis.tables.length}\n`;
  report += `- **Screenshots**: ${analysis.screenshots.length}\n\n`;

  report += `## Fields\n\n`;
  if (analysis.fields.length > 0) {
    report += `| Label | Type | Name | Placeholder | Required | Options |\n`;
    report += `|-------|------|------|-------------|----------|--------|\n`;

    for (const field of analysis.fields) {
      report += `| ${field.label || '-'} | ${field.type} | ${field.name || '-'} | ${field.placeholder || '-'} | ${field.required ? '✓' : ''} | ${field.options?.join(', ') || '-'} |\n`;
    }
  } else {
    report += `No fields found.\n`;
  }
  report += `\n`;

  report += `## Buttons\n\n`;
  if (analysis.buttons.length > 0) {
    report += `| Text | Type |\n`;
    report += `|------|------|\n`;

    for (const button of analysis.buttons) {
      report += `| ${button.text} | ${button.type} |\n`;
    }
  } else {
    report += `No buttons found.\n`;
  }
  report += `\n`;

  report += `## Tables\n\n`;
  if (analysis.tables.length > 0) {
    for (let i = 0; i < analysis.tables.length; i++) {
      const table = analysis.tables[i];
      report += `### Table ${i + 1}\n\n`;
      report += `**Headers**: ${table.headers.join(' | ')}\n`;
      report += `**Row Count**: ${table.rowCount}\n\n`;
    }
  } else {
    report += `No tables found.\n`;
  }
  report += `\n`;

  report += `## User Flow\n\n`;
  for (const step of analysis.userFlow) {
    report += `${step}\n`;
  }
  report += `\n`;

  report += `## Screenshots\n\n`;
  for (let i = 0; i < analysis.screenshots.length; i++) {
    const screenshot = analysis.screenshots[i];
    const filename = path.basename(screenshot);
    report += `${i + 1}. \`${filename}\`\n`;
  }
  report += `\n`;

  report += `## Implementation Plan\n\n`;
  report += `Based on this analysis, the following components need to be implemented:\n\n`;
  report += `1. **Page Layout**: Main dissolve process page structure\n`;
  report += `2. **Form Component**: Input form for creating/editing dissolve records\n`;
  report += `3. **Table Component**: Data table to display existing records\n`;
  report += `4. **Action Buttons**: Add, Edit, Delete, Export functionality\n`;
  report += `5. **Search/Filter**: Search and filter capabilities\n`;
  report += `6. **API Integration**: Backend API calls for CRUD operations\n`;
  report += `7. **Validation**: Form validation logic\n`;
  report += `8. **State Management**: Local state for form and table data\n\n`;

  report += `## Next Steps\n\n`;
  report += `1. Review analysis report and screenshots\n`;
  report += `2. Create TypeScript interfaces for data models\n`;
  report += `3. Implement page component at \`/dashboard/roasting-operation\`\n`;
  report += `4. Create reusable form and table components\n`;
  report += `5. Add API integration (placeholder for now)\n`;
  report += `6. Test functionality and match design\n`;

  return report;
}

// Run the analysis
analyzeDissolveProcess()
  .then(() => {
    console.log('Analysis completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Analysis failed:', error);
    process.exit(1);
  });
