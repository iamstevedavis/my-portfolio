import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("portfolio renders its content and section navigation", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  for (const section of ["experience", "skills", "projects", "education"]) {
    await expect(page.locator(`#${section}`)).toHaveCount(1);
  }
  await expect(page.getByRole("navigation").first().getByRole("link", { name: /Projects/ })).toHaveAttribute("href", "#projects");
  expect(errors).toEqual([]);
});

test("theme can be toggled and restored", async ({ page }) => {
  await page.goto("/");
  const root = page.locator("html");
  const initialTheme = await root.evaluate((element) => element.classList.contains("dark"));
  await page.getByRole("button", { name: "Toggle theme" }).click();
  const nextTheme = await root.evaluate((element) => element.classList.contains("dark"));
  expect(nextTheme).toBe(!initialTheme);
  await page.reload();
  expect(await root.evaluate((element) => element.classList.contains("dark"))).toBe(nextTheme);
});

test("mobile menu opens, navigates, and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: "Toggle menu" });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  const mobileNav = page.getByRole("navigation").last();
  const projectsLink = mobileNav.getByRole("link", { name: /Projects/ });
  await expect(projectsLink).toBeVisible();
  await projectsLink.click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(mobileNav.getByRole("link", { name: /Projects/ })).toHaveCount(0);
});

test("page has no serious or critical automated accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(results.violations.filter(({ impact }) => impact === "critical" || impact === "serious")).toEqual([]);
});
