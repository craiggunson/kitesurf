kitesurf.craiggunson.com
===================



![Build Status](https://codebuild.ap-southeast-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiNlc1VWFVVlIrNzlIQzlFeXppejI0YVkxWFJOamFPVlpwaHFXQ0hJNFJEMzM5LzRlNnRaQ3RtVHpuQkExZGZkbXZNeWVwY1JFQlMxMmNncjdhcEhnaTY4PSIsIml2UGFyYW1ldGVyU3BlYyI6IlZUa1M5TmhncWlkYkNTekciLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)



serverless kitesurfing windspeed app using javascript, HTML5/Canvas, api-gateway, lambda   



##### See buildspec.yml

1. Use AWS CodeBuild or (manual) use deploy commands from inside.
2. update kite.js like so...

```
$.get({
  url: "https://yourapi.execute-api.ap-southeast-2.amazonaws.com/Stage/wind",
```

pic


![Sample](./sample.png)
