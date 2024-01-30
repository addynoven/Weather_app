const Cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
async function fetchData(url) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector("#wob_wc");
    const htmlContent = await page.content();
    await browser.close();
    return htmlContent;
}

function parseData($) {
    const selectedElements = [];
    $("#wob_wc > div").each((idx, ele) => {
        selectedElements.push(ele);
    });
    return selectedElements;
}

async function main(req, res, next) {
    const city = decodeURIComponent(req.params.city).replace(/ /g, "+");
    try {
        const data = {};
        const url = `https://www.google.com/search?q=weather+in+${city}+celsius`;
        console.log(url);
        const htmlContent = await fetchData(url);
        const $ = Cheerio.load(htmlContent);
        const selectedElements = parseData($);
        const div1 = $(selectedElements[0]).html();
        const div2 = $(selectedElements[1]).html();
        const div3 = $(selectedElements[2]).html();
        const dom1 = new JSDOM(div1);
        const dom2 = new JSDOM(div2);
        const dom3 = new JSDOM(div3);
        data["weather_img"] = dom1.window.document
            .querySelector("img")
            .getAttribute("src");
        data["Temperature"] = [];
        temp = [];
        temp_list = dom1.window.document.querySelectorAll("div > div>div>span");
        temp_list.forEach((ele) => {
            if (ele.innerHTML) {
                temp.push(ele.innerHTML);
            }
        });
        data["Temperature"] = {
            celsius: `${temp[0]} ${temp[2]}`,
            fahrenheit: `${temp[1]} ${temp[3]}`,
        };
        const inputString = String(
            dom1.window.document.querySelector("*").textContent
        );
        const precipitationMatch = inputString.match(/Precipitation: \d+%/);
        const humidityMatch = inputString.match(/Humidity: \d+%/);
        const windMatch = inputString.match(/Wind: [\d\s]+km\/h/);

        const precipitation = precipitationMatch ? precipitationMatch[0] : "";
        const humidity = humidityMatch ? humidityMatch[0] : "";
        const wind = windMatch ? windMatch[0] : "";

        data["precipitation"] = precipitation;
        data["humidity"] = humidity;
        data["wind"] = wind;
        data["Time"] = dom2.window.document.querySelector(
            "span div:nth-child(2)"
        ).innerHTML;
        data["description"] = dom2.window.document.querySelector(
            "span div:last-child span"
        ).innerHTML;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = main;
