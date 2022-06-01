var express = require('express');

var path = require('path');
const fast2sms = require('fast-two-sms');
var alert=require('alert')
const ejsMate=require('ejs-mate');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
// import alert from 'alert'


 
// popupS.alert({
//     content: 'Hello World!'
// });
require('dotenv').config();


app.use(express.urlencoded({ extended: false }))

var unirest = require("unirest");
const { isWindows } = require('nodemon/lib/utils');

//middleware
app.engine('ejs',ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static("public"));
app.use(flash());




// app.post('/sendMessage', async(req, res) => {
//         // console.log(req.body.number)
//     //     console.log(req.body.number)
//     //     console.log(req.body.message)
//     //     const response = await fast2sms.sendMessage({ authorization: process.env.YOUR_API_KEY, message: req.body.message, numbers: [req.body.number] })
//     //     res.send(response)
    
//     var req1 = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
    
//     req1.headers({
//         "authorization": "2ayUDS2ihSlOPN3XvNWnaxWH29CBSOhUPVCxl93UTXRqenasGTuhLKaVDE6k"
//       });
      
//       req1.form({
//         "message":'hellp',
//         "language": "english",
//         "route": "q",
//         "numbers": "9834540106",
//       });
      
//     req1.end(function (res) {
//         if (res.error) throw new Error(res.error);
      
//         console.log(res.body);
//       });
//     })
app.use(session({
  secret:'flashblog',
  saveUninitialized: true,
  resave: true
}));


app.get("/", function(req, res) {
  // isWindows.prompt('hellp')

  // req.flash('message', 'Welcome to Blog');

    res.render('index.ejs',{success:''})
});
app.get("/doctors", function(req, res) {

  res.render('doctors.ejs')
});
app.get("/bookappt", function(req, res) {

  res.render('bookappt.ejs')
});app.get("/facilities", function(req, res) {

  res.render('facilities.ejs')
});
app.post('/sendMessage', async(req, res) => {
  console.log(req.body);
  var sid  = 'ACc51b8e86eea391d1cf8575d9d039805c'
  var auth_token = '955dc6395a11ae1262b1086650c289c4'
  let contact =req.body.number

  var twilio = require('twilio')(sid,auth_token)
  twilio.messages.create({
      from: "+15709685824",
      to: `${contact}`,
      body: `Your Appointment is fixed with doctor  ${req.body.doctor} on ${req.body.date} at ${req.body.time} `
  })
  .then(function(res) { 
   })
  .catch(function(err)  {
    console.log(err);
  });
  res.render('index.ejs',{success:'Appointment Booked Successfully'})

  })
app.listen(3000, function() {
    console.log("Listening at port 3000");
});