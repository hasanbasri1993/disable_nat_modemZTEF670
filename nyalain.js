/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Search developers.google.com/web for articles tagged
 * "Headless Chrome" and scrape results from the results page.
 */

'use strict';

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://192.168.1.1/');


    // Wait for the results page to load and display the results.
    const login_title_center = '.login_title_center';
    await page.waitForSelector(login_title_center);

    // Type into search box.
    await page.type('#Frm_Username', 'admin');
    await page.type('#Frm_Password', 'Telkomdso123');

    // Wait for suggest overlay to appear and click "show all results".
    const LoginId = '#LoginId';
    await page.waitForSelector(login_title_center);
    await page.click(LoginId);

    await page.waitForSelector("#mainFrame");
    console.log('iframe is ready. Loading iframe content');


    const elementHandle = await page.$(
        '#mainFrame[src="template.gch"]',
    );
    const frame = await elementHandle.contentFrame();
    console.log('filling form in iframe');
    // Wait for suggest overlay to appear and click "show all results".
    const mmNet = "#mmNet";
    await frame.waitForSelector(mmNet);
    await frame.click(mmNet,{delay: 1000});

    await delay(2000);

    const Frm_WANCName0 = "#TABLE_WANCNAME tbody tr td select#Frm_WANCName0";
    await frame.waitForSelector(Frm_WANCName0);
    await frame.select(Frm_WANCName0, 'IGD.WD1.WCD1.WCPPP2');

    await delay(1000);

    const Frm_WBDMode = "#TABLE_Public tbody tr#TR_WBDMode td input#Frm_WBDMode";
    await frame.waitForSelector(Frm_WBDMode);
    await frame.click(Frm_WBDMode);

    await delay(1000);

    await frame.waitForSelector("#Frm_VLANID");
    await frame.type("#Frm_VLANID","3145");

    const Frm_IsNAT = "#TABLE_static tbody tr#TR_nat td input#Frm_IsNAT";
    await frame.waitForSelector(Frm_IsNAT);
    await frame.click(Frm_IsNAT);

    await delay(1000);

    await frame.waitForSelector('input#Btn_DoEdit');
    await frame.click('input#Btn_DoEdit');

    //Wait for suggest overlay to appear and click "show all results".
    const title_log = ".title_log a";
    await frame.waitForSelector(title_log);
    await frame.click(title_log);
    await browser.close();


})();

function delay(time) {
    return new Promise(function(resolve) {
        setTimeout(resolve, time)
    });
}
