const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  page.on('pageerror', e => console.error('JS ERROR:', e.message));

  await page.goto('http://localhost:3000/events', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Slow scroll: 50px at a time with pause to let scrub settle
  const scrollTo = async (y) => {
    await page.evaluate((pos) => window.scrollTo(0, pos), y);
    await page.waitForTimeout(200);
  };

  // Start of first event reveal
  for (let y = 800; y <= 1100; y += 50) await scrollTo(y);
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/ev-reveal-start.png' });

  // Mid reveal
  for (let y = 1100; y <= 1400; y += 50) await scrollTo(y);
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/ev-reveal-mid.png' });

  // Reveal complete
  for (let y = 1400; y <= 1700; y += 50) await scrollTo(y);
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/ev-reveal-done.png' });

  // Past first event, entering second
  for (let y = 1700; y <= 2100; y += 50) await scrollTo(y);
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/ev-event2.png' });

  await browser.close();
  console.log('done');
})();
