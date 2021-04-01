const WebPageTest = require('webpagetest');
require('dotenv').config();

const api_key = process.env.API_KEY;

const wptPublic = new WebPageTest('www.webpagetest.org', api_key)

var urlList = ['https://www.linkedin.com', 'https://www.geeksforgeeks.org', 'https://websee.com','https://www.facebook.com','https://www.yahoo.com','https://www.fast.com']

for (var i = 0; i < urlList.length; i++) {

  const script = wptPublic.scriptToString([

    { navigate: [urlList[i]] },

  ]);

  wptPublic.runTest(script, {
    pollResults: 15,
    timeout: 120,
    firstViewOnly: true,
    location: 'Dulles:Chrome',
    
    customMetrics: [
      '[memory]',
      'return new Promise((resolve) => { performance.measureUserAgentSpecificMemory().then((value) => { resolve(value.bytes); }); });'
    ].join('\n'),

    commandLine: '--disable-web-security',

  },

    (err, data) => {
      console.log('Id:', err || data.data.id)
      console.log('Memory:', err || data.data.average.firstView.memory)
      
    })

}