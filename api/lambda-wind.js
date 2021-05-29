
process.env.TZ = 'Australia/Sydney'
const http = require('http');
const zlib = require("zlib");


exports.handler = (event, context, callback) => {
  var data = '';
  var payload = [];
  var i = 0;


  const options = {
    hostname: 'www.bom.gov.au',
    path: '/fwo/IDV60901/IDV60901.94853.json',
    headers: { 'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 13816.82.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.218 Safari/537.36',
    'Host': 'www.bom.gov.au',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Cookie': '__utma=172860464.456594757.1622178828.1622178828.1622178828.1; __utmc=172860464; __utmz=172860464.1622178828.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _easyab_seed=630.7793953918866; _hjTLDTest=1; _hjid=bccab30f-26e4-46e7-8ec5-1f358e2a5ae1; bm_sv=1DECE32E29D7503310B2F1DF86546AA7~TG5MzDwriZC0wvjWoiXF4O56EPexh+f9ZCT+igosoK2T15XIAzob9C+YXdW/h6FCuoJmuUTPsrD0tsypCig252Dtbb4S3pmPLoFKkBYEeOvItpXn2aqnt6gWOVD0JMn9JtEzfahN/J7vDAt4y1JnMD2LXgGCuhQAbF0OHJyMuEg=; bm_mi=4AB420F846A6BCF80E6A44192B2A7D01~3LmqCB6pS6zqtBjUYg5jd06dxu21NjD8QgHWfLl9ILf06zmBGOhF5elrjHLj82hPS2OhNW755IamRIpokHMTfzqkhWHQFcqbsCVW6mIaiUbsMyBDa8iqRKDnlTqFuR2o+KfIRGf5n5lEF2JizoQNvDkzpscMvlfNbF/CrTko4p5uy2aijSESCB0InMrd1V8+GezKm/Yj4mMpNJ3UVdoXjAjmCv/IBTHoHrIpBTH/IXZ1jQWzcbnUoqquOlUn/NVd/hTt7oeg42hpRMGO5qRWYYDGFD5qWpd5b9ORha/nE30f8L2ghr/+7mEF4n5WnMbj; ak_bmsc=746885270B6F3F1B1EBD311448C2F02F17CEC735246E0000AC9DB2607DF6CC22~plKWbjG8vJipTly8BSEmLHfoGSmhFlV5/KkW3dfZhQ5POzi5sawTfFAyBLTxciSxGH76/4a0aPxMemihd3QdGHmayikGpBqLONNnfoUYeOvdDpnEXv+yeKKMcoTXx4659aAZO/dmrPhTmEEavFKKYaNDJIu0S52JZFG99JYhCpO/G4ljcU9u0RzKJJloexvKWuPimCGY/KwrfRZv7ZGd4vwBH24j/ktKYFg+Tu2zg0KwE1+IAFgyFYkevtqF22u0eF',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'max-age=0',
    'Accept-Encoding': 'gzip, deflate',

 
  }};

console.log('options',options.headers)
http.get(options, function(res) {
    console.log(res.statusCode)
    if (res.statusCode == 200) {
      console.log(res.data);
      var gunzip = zlib.createGunzip();            
      res.pipe(gunzip);

      gunzip.on('data', function(data) { buffer.push(data.toString()); });


       gunzip.on('end', function() {
        try {  var proc = JSON.parse(buffer.join("")); }
        catch (e) {console.log('parse error');return}

        for (i = 0; i < 5; i++) {
           var when = proc.observations.data[i].local_date_time;
           var windspeed = proc.observations.data[i].wind_spd_kt;
           var gustspeed = proc.observations.data[i].gust_kt;
           var winddir = proc.observations.data[i].wind_dir;
           payload.push(when,windspeed,gustspeed,winddir);
           console.log ('when',when,'speed',windspeed,'gust',gustspeed,'winddir',winddir);
          }
          var payloadjson = JSON.stringify(payload)
  console.log ('payload',payloadjson);
  callback(null, payloadjson);

      });
    }}).on("error", (err) => {
      console.log("wind fail" + err.message);
    });


  }
