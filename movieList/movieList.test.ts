import { Builder, Capabilities, By } from "selenium-webdriver";
import { DriverService } from "selenium-webdriver/remote";

const chromedriver = require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await driver.get("http://127.0.0.1:5501/movieList/index.html");
});

afterAll(async () => {
  await driver.quit();
});

test("I can search my movie list", async () => {
  let movieInput = await driver.findElement(By.id("inputField"));
  //   let submissionBtn = await driver.findElement(By.id("submission-btn"));

  await movieInput.sendKeys("GhostBusters 1\n");
  //   submissionBtn.click();

  let firstMovie = await driver
    .findElement(By.xpath("//ul/li/span[1]"))
    .getText();

  await driver.sleep(3000);

  //   await movieInput.sendKeys("Batman Returns\n");
  //   //   submissionBtn.click();

  //   await driver.sleep(3000);

  await movieInput.clear();

  expect(firstMovie).toEqual("GhostBusters 1");
});
