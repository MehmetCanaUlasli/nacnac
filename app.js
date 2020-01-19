var express=require('express');
var fs=require('fs');

app=express();
app.get("/",function(req,res)
{
  var log=fs.createReadStream(__dirname+"/log.txt","utf-8");
  var wlog=fs.createWriteStream(__dirname+"/log.txt","utf-8");
  var text="Url:" + req.url + " Ip: " + req.ip;
  log.on("data",function(chunk)
  {
    wlog.write(chunk);
  });
  fs.createReadStream(__dirname+"/index.html","utf-8").pipe(res)
});

app.get("/send/:text",function(req,res)
{
    var text="";
    fs.createReadStream(__dirname+"/text.txt","utf-8").pipe(text);
    setTimeout(function()
    {
      text+=req.params.text;
      fs.createWriteStream(__dirname+"text.txt").write(text);

    },500);
});

app.listen(process.env.port || 4000);
