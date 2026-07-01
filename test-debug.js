const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/events', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);

  const dims = await page.evaluate(() => {
    const wrapper = document.querySelectorAll('[style*="200vh"]')[0];
    const sticky  = wrapper?.firstElementChild;
    const body    = document.body;
    return {
      wrapperH:  wrapper?.getBoundingClientRect().height,
      wrapperTop: wrapper?.getBoundingClientRect().top,
      stickyH:   sticky?.getBoundingClientRect().height,
      stickyTop: sticky?.getBoundingClientRect().top,
      stickyPos: sticky && getComputedStyle(sticky).position,
      bodyBg:    getComputedStyle(body).background,
      vh: window.innerHeight,
    };
  });
  console.log(JSON.stringify(dims, null, 2));
  await browser.close();
})();
