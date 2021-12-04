const { TestScheduler } = require('@jest/core')
const {Builder, Capabilities, By} = require('selenium-webdriver')
const assert = require('assert')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

test('Adding Movies', async () => {
    let searchBar = await driver.findElement(By.xpath('/html/body/main/section/form/input'))
    await searchBar.sendKeys('Dune\n')
    let duneSpan = await driver.findElement(By.xpath('/html/body/main/ul/li/span'))
    let duneText = await duneSpan.getText()
    assert.equal('Dune', duneText)

    let deleteDune = await driver.findElement(By.xpath('//*[@id="Dune"]'))
    deleteDune.click()
    let duneSpanGone = await driver.findElement(By.xpath('/html/body/main/ul/li/span'))
    assert.notEqual(duneSpanGone, duneSpan)

    await searchBar.sendKeys('Dune\n')
    await searchBar.sendKeys('Lion King\n')

    let deleteLionKing = await driver.findElement(By.xpath('/html/body/main/ul/li[2]/span'))
    deleteLionKing.click()
    let lionKingSpan = await driver.findElement(By.xpath('/html/body/main/ul/li[2]/span'))
    assert.notEqual(lionKingSpan, deleteLionKing)
})

