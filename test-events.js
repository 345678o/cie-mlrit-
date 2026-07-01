const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/events', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/tmp/events-initial.png' });

  for (let i = 0; i < 22; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), (i + 1) * 100);
    await page.waitForTimeout(100);
  }
  await page.screenshot({ path: '/tmp/events-mid.png' });

  for (let i = 22; i < 40; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), (i + 1) * 100);
    await page.waitForTimeout(100);
  }
  await page.screenshot({ path: '/tmp/events-full.png' });

  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  console.log('Console errors:', errors);
  await browser.close();
  console.log('Done — screenshots at /tmp/events-*.png');
})();
