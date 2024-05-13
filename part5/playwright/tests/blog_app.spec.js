const { test, expect } = require('@playwright/test')
const { describe } = require('node:test')

describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })
})
test('front page can be opened', async ({ page }) => {
  const locator = await page.getByText('login')
  await expect(locator).toBeVisible()
  await expect(page.getByText('Log in to application')).toBeVisible()
})

test('login fails with wrong credentials', async ({ page }) => {
  await page.locator('#username').fill('jonroi')
  await page.locator('#password').fill('1234')
  await page.getByRole('button', { name: 'login' }).click()
  await page.goto('http://localhost:5173/')
})
