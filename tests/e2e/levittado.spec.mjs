import { test, expect } from "@playwright/test";

test("home page renders the primary conversion path", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Barbearia Levittado/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Barbearia Levittado");
  await expect(page.getByRole("link", { name: /agendar/i }).first()).toBeVisible();
});

test("mobile navigation can open and close", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menu = page.getByRole("button", { name: /menu/i });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("motion and loading contracts are active", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".page-progress")).toBeAttached();
  await expect(page.locator(".map-card")).toHaveAttribute("aria-busy", /true|false/);
});
