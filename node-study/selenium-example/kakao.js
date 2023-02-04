const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const run = async () => {
  // headless로 크롬 드라이버 실행
  let driver = await new Builder()
    .forBrowser("chrome")
    // .setChromeOptions(
    //   new chrome.Options()
    //     .headless()
    //     .addArguments("--disable-gpu", "window-size=1920x1080", "lang=ko_KR")
    // )
    .build();

  try {
    // 특정 URL 생성
    await driver.get("https://map.kakao.com/");
    let userAgent = await driver.executeScript("return navigator.userAgent;");
    console.log("[UserAgent]", userAgent);

    //
    await driver.wait(until.elementLocated(By.className("tit_32143142login")), 10000);

    

    // By.id로 #query Element를 얻어온다.
    await driver.findElement(By.xpath('//*[@id="search.tab5"]/a')).click();

    // id가 id_line인 element가 나올 때까지 최대 10초 기다린다.
    await driver.wait(until.elementLocated(By.id("input-loginKey")), 10000);

    // id pw 입력
    await driver.findElement(By.id("input-loginKey")).sendKeys("hyeon_1997");
    await driver.findElement(By.id("input-password")).sendKeys("hyun74");

    // login button 클릭
    await driver
      .findElement(
        By.xpath('//*[@id="mainContent"]/div/div/form/div[4]/button[1]')
      )
      .click();

    // 저장 버튼이 나올 때까지 최대 10초 기다린다.
    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//*[@id="sidebar"]/navbar/perfect-scrollbar/div/div[1]/div/ul/li[6]/a'
        )
      ),
      10000
    );

    // 저장 버튼 클릭
    await driver
      .findElement(
        By.xpath(
          '//*[@id="sidebar"]/navbar/perfect-scrollbar/div/div[1]/div/ul/li[6]/a'
        )
      )
      .click();

    // 새 리스트 추가가 나올 때까지 최대 10초 기다린다.
    await driver.wait(
      until.elementLocated(By.xpath('//*[@id="__next"]/div[1]/div[2]/button')),
      10000
    );

    // 저장 리스트 가져오기
    const list = await driver.findElements(By.className("wTaI4v _17l24i"));

    console.log(list);

    // // keyword를 선택하고 검색 버튼 사용
    // let keyword = "닭발";
    // searchInput.sendKeys(keyword, Key.ENTER);

    // // css selector로 가져온 element가 위치할때까지 최대 10초간 기다린다.
    // await driver.wait(
    //   until.elementLocated(By.id("info.search.place.list")),
    //   10000
    // );
    // let resultElements = await driver.findElements(By.className("placetit"));

    // // 검색한 elements 하위의 value를 출력함
    // console.log("[resultElements.length]", resultElements.length);
    // for (var i = 0; i < resultElements.length; i++) {
    //   console.log("- " + (await resultElements[i].getCssValue()));
    // }
  } catch (e) {
    console.log(e);
  } finally {
    driver.quit();
  }
};
run();
