
process.env.TZ = 'Australia/Sydney'
const http = require('http');


exports.handler = (event, context, callback) => {
  var data = '';
  var payload = [];
  var i = 0;

  const options = {
    hostname: 'www.bom.gov.au',
    path: '/fwo/IDV60901/IDV60901.94853.json',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  };

function getit() {
http.get(options, function(res) {
    if (res.statusCode == 200) {
      res.on('data', function(data_) { data += data_.toString(); });
      res.on('end', function() {
        try { var proc = JSON.parse(data); }
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
getit();
};
