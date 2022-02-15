const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000.");
})


app.get("/",function(req, res){

  res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  var data = {

    members: [

      {
        email_address: email,

        status: "subscribed",

        merge_fields: {

          FNAME: firstName,

          LNAME: lastName

        }

      }

    ]

  };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/59e6c651fa"
  const options = {
    method: "POST",
    auth: "daniel:0f0a7a7bd22c1e0fac4997d01d88aeeb-us1"
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200){
      res.sendFile(__dirname + "/Success.html")
    }
    else{
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})

// api key : 0f0a7a7bd22c1e0fac4997d01d88aeeb-us14

// list id: 59e6c651fa
