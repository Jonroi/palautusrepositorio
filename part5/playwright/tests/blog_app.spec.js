const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test Testington',
        username: 'testUser',
        password: 'test'
      }
    })

    await page.goto('http://localhost:5173')
  })

  describe('Logging in', () => {
    test('Login form is shown', async ({ page }) => {
      await expect(page.locator('#username')).toBeVisible()
      await expect(page.locator('#password')).toBeVisible()
      await expect(page.locator('#login-button')).toBeVisible()
    })

    test('login succeeds with correct credentials', async ({ page }) => {
      await page.locator('#username').fill('testUser')
      await page.locator('#password').fill('test')
      await page.locator('#login-button').click()
      expect(await page.locator('#user-info').textContent()).toContain(
        'logged in'
      )
    })

    test('login fails with wrong credentials', async ({ page }) => {
      await page.locator('#username').fill('testUseros')
      await page.locator('#password').fill('testoros')
      await page.locator('#login-button').click()
      expect(await page.locator('.error').textContent()).toContain(
        'invalid username or password'
      )
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173')
      await page.locator('#username').fill('testUser')
      await page.locator('#password').fill('test')
      await page.locator('#login-button').click()
    })

    test('logged users can create new blogs', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByPlaceholder('title of the blog').click()
      await page.getByPlaceholder('title of the blog').fill('testBlog')
      await page.getByPlaceholder('author of the blog').click()
      await page.getByPlaceholder('author of the blog').fill('testUser')
      await page.getByPlaceholder('url to the blog post').click()
      await page.getByPlaceholder('url to the blog post').fill('test/blog.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.waitForSelector('.blog-title-and-author')
    })

    test('only logged user sees remove button', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).last().click()
      await expect(page.locator('#remove-blog-button')).toBeVisible()
    })

    test('logged users can delete own blogs', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).last().click()
      const isConfirmed = await page.evaluate(() => {
        window.confirm = () => true
        return window.confirm('Remove blog testBlog by testUser??')
      })
      expect(isConfirmed).toBe(true)
      await page.getByRole('button', { name: 'remove blog' }).last().click()
      await page.waitForSelector('.blog-title-and-author')
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.locator('.viewButton').first().click()
      await page.getByRole('button', { name: 'like' }).click()
    })

    test('blog likes are ordered', async ({ page }) => {
      const likeCounts = await page.$$eval('.likes', (likes) =>
        likes.map((like) => Number(like.textContent))
      )
      for (let i = 0; i < likeCounts.length - 1; i++) {
        expect(likeCounts[i]).toBeGreaterThanOrEqual(likeCounts[i + 1])
      }
    })
  })
})
