import { expect, test } from "@playwright/test";

for (const width of [1440, 390]) {
  for (const theme of ["light", "dark"] as const) {
    test(`scroll reveals animate once at ${width}px in ${theme} mode`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 844 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: "no-preference" });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto("/");
      const reveal = page.locator("#education [data-scroll-reveal]").first();
      // This must start hidden below the fold after hydration, not merely exist.
      await expect(reveal).toHaveCSS("opacity", "0");
      await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = "auto";
        document.body.style.scrollBehavior = "auto";
        document.querySelector("#education")?.scrollIntoView();
      });
      await expect(reveal).toHaveCSS("opacity", "1");
      await expect(reveal).toHaveCSS("transform", "none");
      await page.screenshot({ path: testInfo.outputPath("revealed-section.png") });
      await page.evaluate(() => window.scrollTo(0, 0));
      await expect(reveal).toHaveCSS("opacity", "1");
      expect(errors).toEqual([]);
    });
  }
}

test("server-rendered content is visible with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const section of ["experience", "skills", "projects", "education"]) {
      const reveal = page.locator(`#${section} [data-scroll-reveal]`).first();
      await expect(reveal).toBeVisible();
      await expect(reveal).toHaveCSS("opacity", "1");
    }
  } finally {
    await context.close();
  }
});

test("reduced motion keeps offscreen content visible and responds to preference changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const reveal = page.locator("#education [data-scroll-reveal]").first();
  await expect(reveal).toHaveCSS("opacity", "1");
  await expect(reveal).toHaveCSS("transform", "none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(reveal).toHaveCSS("opacity", "0");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(reveal).toHaveCSS("opacity", "1");
});

test("hydrated cards retain their hover effects", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const card = page.locator("#skills .rounded-lg.border").first();
  const categories = page.locator("#skills .space-y-6");
  await expect(categories).toHaveCSS("opacity", "0");
  await page.evaluate(() => document.querySelector("#skills")?.scrollIntoView());
  await expect(categories).toHaveCSS("opacity", "1");
  await card.hover();
  await expect(card).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -5)");
});

test("keyboard navigation reveals the linked section", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const reveal = page.locator("#projects [data-scroll-reveal]").first();
  await expect(reveal).toHaveCSS("opacity", "0");
  await page.keyboard.press("Tab");
  await expect(page.locator("header a[href='/']")).toBeFocused();
  for (let step = 0; step < 4; step++) await page.keyboard.press("Tab");
  await expect(page.getByRole("navigation").first().getByRole("link", { name: /Projects/ })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#projects$/);
  await expect(reveal).toHaveCSS("opacity", "1");
});
