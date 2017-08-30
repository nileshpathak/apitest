var express = require('express');
var app = express();

var jsonfile = require('jsonfile');
var bodyParser = require('body-parser');

var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
    res.send('Hello world!');
});


app.use(express.static('static'))


app.get("/userList", function (req, res, next) {
    var file = './data.json'
    jsonfile.readFile(file, function (err, obj) {
        console.dir(obj);
        res.json(obj);
    });
})



app.post("/login", function (req, res, next) {
   

      var file = './data.json'
      jsonfile.readFile(file, function (err, result) {
        var flag=false;
        if (err) {
            console.log("error in reading file");
        } else {

           console.log(result.length);
          
            for(var i=0;i<result.length;i++){

                if(result[i].email==req.body.email && result[i].password==req.body.password){
                    
                     res.send(result[i].name);
                     flag=true;
                     break;
                }
            }

            if(!flag){

                res.send("no user found");
            }


        }

    });


})


app.post("/saveUser", function (req, res, next) {

  
    var file = './data.json'
    var obj = {
        email: req.body.email,
        password:req.body.password,
        name: req.body.name

    }

    jsonfile.readFile(file, function (err, result) {
        var flag=false;
        if (err) {
            console.log("error in reading file");
        } else {

           console.log(result.length);
          
            for(var i=0;i<result.length;i++){

                if(result[i].email==req.body.email){
                     res.send("email already registered");
                     flag=true;
                     break;
                }
            }
         
            if(!flag){
            result.push(obj);
            jsonfile.writeFile(file, result, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(obj);
                }
            })
            }
        }

    });
})





var port = process.env.PORT || 8000;
 
// starting express server
app.listen(port, function() {
 console.log("Server is running at : http://localhost:" + port);
});


