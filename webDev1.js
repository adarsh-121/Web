const fetch = require("node-fetch");
//const { setInterval } = require("node:timers");
require('dotenv').config();
var urlList = ['https%3A%2F%2Fwww.gmail.com','https%3A%2F%2Fwww.thehindu.com%2F','https%3A%2F%2Fwww.dailypioneer.com%2F', 'https%3A%2F%2Fwww.google.com', 'https%3A%2F%2Fwww.webpagetest.org', 'https%3A%2F%2Fwww.catchpoint.com%2F','https%3A%2F%2Fwww.facebook.com%2F'];
const api_key = process.env.API_KEY;

for (var i = 0; i < urlList.length; i++)
 {
  let url = `https://www.webpagetest.org/runtest.php?url=${urlList[i]}&k=${api_key}&fvonly=1&f=json&custom=%5Bmemory-used%5D%0Areturn%20new%20Promise((resolve)%20%3D%3E%20%7B%0A%20%20performance.measureUserAgentSpecificMemory().then((value)%20%3D%3E%20%7B%0A%20%20%20%20resolve(value.bytes)%3B%0A%20%20%7D)%3B%0A%7D)%3B&cmdline=--disable-web-security`;
  var myVar = '';
  var vb = [];
  fetch(url)
    .then(response => response.json()).then(data => {
      vb.push(data.data.jsonUrl);
    })
} 
myVar = (setInterval(timeOut, 40000));

const arr = [];
async function timeOut() {
  console.log(vb);
  for (let j = vb.length - 1; j >= 0; --j) {
    try {
      var db = await Promise.all(
        fetch(vb[j]).then(response => response.json()).then(data => {
          if (data.statusCode == '200') {
            arr.push(data.data.average.firstView['memory-used']);
            const unique = [...new Set(arr)];
            console.log(data.data.id);
            console.log(unique);
            
            vb.splice(j,1);
            console.log(vb.length);
          }
        }),
       // vb.splice(j, 1)

      );
      return (db)
    }
    catch (error) {
    }
  }
  if (vb.length == 0) {
    clearInterval(myVar);

  }
}



