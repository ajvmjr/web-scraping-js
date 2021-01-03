const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://instagram.com/rocketseat_oficial');

  const imagesList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('article img')
    const imagesArray = [...nodeList]
    const imagesList = imagesArray.map( ({src}) => ({
      src
    }))
    console.log('imagesList', imagesList);
    return imagesList
  })
  
  console.log(imagesList);
  fs.writeFile('instagram.json', JSON.stringify(imagesList, null, 2), err => {
    if(err) throw new Error('something went wrong')
    else console.log('well done!');
  })
  await browser.close();
})();