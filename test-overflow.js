const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/events', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const culprits = await page.evaluate(() => {
    const wrapper = document.querySelectorAll('[style*="200vh"]')[0];
    const results = [];
    let el = wrapper?.parentElement;
    while (el && el !== document.documentElement) {
      const s = getComputedStyle(el);
      if (s.overflow !== 'visible' || s.overflowX !== 'visible' || s.overflowY !== 'visible') {
        results.push({ tag: el.tagName, id: el.id, cls: el.className.slice(0,60), overflow: s.overflow, overflowX: s.overflowX, overflowY: s.overflowY });
      }
      el = el.parentElement;
    }
    return results;
  });
  console.log(JSON.stringify(culprits, null, 2));
  await browser.close();
})();
