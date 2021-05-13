const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("http")

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile("/signup.html",{root:__dirname});
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.eMail;

  const data = {
     members:[
       {
         email_adress: email,
         status: "subcribed",
         merge_fields:{
           FNAME: firstName,
           LNAME: lastName
         }
       }
     ]
  }

  const jsonData = JSON.stringify(data);
  const url = "http://us1.api.mailchimp.com/3.0/lists/a3c497fb45";
  const options = {
    method: "POST",
    auth: "admin1:cedf90ba2630a38b2cbfb9050d7fe49b-us1"

  }
  const request = http.request(url, options, (response) => {
    response.on('data', (data) => {
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
});
app.listen(3000, () => console.log("Server is running on port 3000!"));


// API keys
// cedf90ba2630a38b2cbfb9050d7fe49b-us1
// Unique ID
// a3c497fb45
