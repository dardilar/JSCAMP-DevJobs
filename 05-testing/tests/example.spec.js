// @ts-check
import { test, expect } from '@playwright/test';

// 1. Lo mas recomendable es usar Roles, aria
// 2. Etiquetas de texto, placeholder, nombres
// 3. data-testid
// 4. Selectores de CSS como ultimo recurso

test('Buscar empleos y aplicar a una oferta', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  const searchInput = page.getByRole('searchbox');
  await searchInput.fill('React');
  
  const searchButton = page.getByRole('button', { name: 'Buscar' });
  await searchButton.click();

  const jobsCards = page.locator('.job-listing-card');
  await expect(jobsCards.first()).toBeVisible();

  const firstJobTitle = jobsCards.first().locator('a').first();
  await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior');

  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  const applyButton = page.getByRole('button', { name: 'Aplicar' }).first();
  await applyButton.click();

  await expect(page.getByRole('button', { name: 'Aplicado' }).first()).toBeVisible();

});
