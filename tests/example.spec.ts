import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObjects/LoginPage';

test('test', async ({ page }) => {
/*
  await page.goto('https://saucedemo.com')
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user')
  await page.getByRole('textbox', { name: "Password" }).fill('secret_sauce')
  await page.getByRole('button', { name: 'Login' }).click()
  */

  const loginPage = new LoginPage(page)
  /*
  await loginPage.fillUsername('standard_user')
  await loginPage.fillPassword('secret_sauce')
  await loginPage.clickLogin()
  */

  await loginPage.loginWithCredentials('standard_user','secret_sauce')

  //await page.waitForLoadState('load')
  //await page.waitForTimeout(5000)


  const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

  const randomIndex = Math.floor(Math.random() * itemsContainer.length)

  const randomItem = itemsContainer[randomIndex]

  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
  const expectedName = await randomItem.locator('.inventory_item_name').innerText()
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

  console.log('Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}')

  await randomItem.getByRole('button', { name: 'Add to cart' }).click()

  await page.locator('a.shopping_cart_link').click()

  // await page.pause();

  await expect(page.getByRole('button', {name:'Checkout'})).toBeVisible()



  const actualDescription = await page.locator('.inventory_item_desc').innerText()
  const actualName = await page.locator('.inventory_item_name').innerText()
  const actualPrice = await page.locator('.inventory_item_price').innerText()

  expect(actualName).toEqual(expectedName)
  expect(actualDescription).toEqual(expectedDescription)
  expect(actualPrice).toEqual(expectedPrice)

  await page.getByRole('button', {name:'Checkout'}).click()

  await page.getByRole('textbox', { name: 'First Name' }).fill('juanan')
  await page.getByRole('textbox', { name: 'Last Name' }).fill('hola')
  await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('22')
  await page.locator("//input[@name='continue']").click()
  await page.locator("//button[@name='finish']").click()

  await expect(page.getByRole('heading', {name:'Thank you for your order!'})).toBeVisible()

  
});