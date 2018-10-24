var common = require("../config/common")
var config = require('../config/config')
var fetch = require('node-fetch')

var bad_result = {}

exports.getVideoInfo = function(req, response) {
  var bad_result = {};
  var video_id = req.params.video_id;
  
  var timestamp = Math.floor(Date.now() - 1 * 60 * 1000)
  var start_date = new Date(timestamp).toISOString()
  var end_date = new Date().toISOString()
  
  var post_data = {  
    "filters":[  
       {  
          "name":"PLAYED",
          "operator":"GT",
          "value":0
       },
       {  
          "name":"VIDEO_ID",
          "operator":"EQ",
          "value":video_id
       }
    ],
    "groupBy":[  
 
    ],
    "orderBy":[  
       {  
          "name":"MINUTE",
          "order":"DESC"
       }
    ],
    "dimension":"IMPRESSION_ID",
    "start":"2018-10-24T17:23:00.000Z",
    "end": start_date,
    "end": end_date,
    "licenseKey": config.licenseKey,
    "interval":"MINUTE"
   }

  // Set up the request
  fetch('https://api.bitmovin.com/v1/analytics/queries/count', { 
    method: 'POST',
    body:    JSON.stringify(post_data),
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key' : config.api_key,
      'X-Tenant-Org-Id' : config.organization_id,
    },
  })
    .then(res => {
      res.json()
        .then(json => {
          console.log(json.data.result)
          var message = "successfully.";
            var good_result = {
              video_id: video_id,
              start: start_date,
              end: end_date,
              user_data: json.data.result.rows,
            };
            common.sendFullResponse(response, 200, good_result, message);
        })
        .catch(err => {
          console.warn(err)
        })
    })
    .catch(err => {
      console.warn(err)
    })
    
  
}