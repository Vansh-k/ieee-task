const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");


// App
const app = express();

// db connection
mongoose.connect('mongodb+srv://Admin-vansh:V@nshk@p00r@cluster0.jb0li.mongodb.net/studentDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

// Static location
app.use(express.static(__dirname +"/public/"));

// View-engine
app.set('view engine', 'ejs');

// bodyParser
app.use(bodyParser.urlencoded({
  extended: true
}));

// Db schema declaration
const studentSchema = new mongoose.Schema({
  name : String,
  scholarNo : Number,
  branch : String,
  MobNo : Number,
  email : String,
  post : {
    type : [],
    required : true
  }
})

// global variable
var foundObject ;

// model declaration
const Student = new mongoose.model('Student', studentSchema);

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/register", function(req,res){
  res.render("register");
});

app.post("/register", function(req,res){
  var regDetails = req.body;

  const student = Student({
    name : regDetails.name,
    scholarNo : regDetails.scholarNo,
    branch : regDetails.branch,
    MobNo : regDetails.mobileNo,
    email : regDetails.email,
    post : regDetails.Post
  })

  student.save();

  Student.find({scholarNo : regDetails.scholarNo},function(err,data){
    if(err){
      console.log(err);
    }else{
      res.redirect("/sucessfull");
    }
  })
});

app.get("/sucessfull",function(req,res){
  res.render("successReg");
})
app.get("/admin",function(req,res){

  Student.find({},function(err,data){
    if(err){
      console.log(err);
    }else{
      foundObject = data;
    }
  });

  res.render('admin',{data : foundObject});

});


// Port Listening of Server
app.listen(process.env.PORT || "3000", function() {
  console.log("Server has started sucessfully");
});
