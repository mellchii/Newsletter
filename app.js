const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.post('/', (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          "FNAME": fName,
          "LNAME": lName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = 'https://us6.api.mailchimp.com/3.0/lists/bcbc11e427';

  const options = {
    method: "POST",
    auth: "gabby:25a5bd08d76572740cbe39c8cd05a4a2-us6"
  }

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data))
    })

  })

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/")
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port 3000`)
});





// Api Key
// 25a5bd08d76572740cbe39c8cd05a4a2-us6

// Audience ID
// bcbc11e427