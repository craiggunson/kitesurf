
exports.handler = (event, context, callback) => {

process.env.TZ = 'Australia/Sydney'
var http = require('http');
var data = '';
var payload = [];

http.get('http://www.bom.gov.au/fwo/IDV60901/IDV60901.94853.json', function(res) {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      res.on('data', function(data_) { data += data_.toString(); });
      res.on('end', function() {
        var proc = JSON.parse(data);


        for (i = 0; i < 5; i++) {
           var when = proc.observations.data[i].local_date_time;
           var windspeed = proc.observations.data[i].wind_spd_kt;
           var gustspeed = proc.observations.data[i].gust_kt;
           payload.push(when,windspeed,gustspeed);

           console.log ('when',when,'speed',windspeed,'gust',gustspeed);
//           console.log('wind',proc.observations.data[i].local_date_time);


          }
          var payloadjson = JSON.stringify(payload)
  console.log ('payload',payloadjson);
  callback(null, payloadjson);

      });
    }})
};
