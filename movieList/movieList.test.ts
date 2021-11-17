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

test("Can I add a movie to the list", async () => {
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

test("test movie deleted text", async () => {
  let deleteBtn = await driver.findElement(By.xpath("//ul/li/button"));
  deleteBtn.click();
  let messageText = await driver.findElement(By.id("message")).getText();

  await driver.sleep(2000);

  expect(messageText).toEqual("GhostBusters 1 deleted!");
});

test("test movie cross out text", async () => {
  let movieInput = await driver.findElement(By.id("inputField"));
  await movieInput.sendKeys("Batman Returns\n");

  let movie = await driver.findElement(By.xpath("//ul/li/span"));
  movie.click();
  let messageText = await driver.findElement(By.id("message")).getText();

  await driver.sleep(2000);

  expect(messageText).toEqual("Batman Returns watched!");
});

test("test movie uncross out text", async () => {
  let movie = await driver.findElement(By.xpath("//ul/li/span"));
  movie.click();
  let messageText = await driver.findElement(By.id("message")).getText();

  await driver.sleep(2000);

  expect(messageText).toEqual("Batman Returns added back!");
});
