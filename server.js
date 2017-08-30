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



app.get("/allpear", function (req, res, next) {
    var file = './data.json'
    jsonfile.readFile(file, function (err, obj) {
        //console.dir(obj);
        res.json(obj);
    });
})



app.post("/addpear", function (req, res, next) {
    var file = './data.json'
    var obj = {
        id: req.body.id
    }
    jsonfile.readFile(file, function (err, result) {
        if (err) {
            console.log("error in reading file");
        } else {
            result.push(obj);
            jsonfile.writeFile(file, result, function (err) {


                if (err) {
                    console.log(err);
                } else {
                    res.send("successfull");
                }
            })
        }

    });

})



var port = process.env.PORT || 9000;
 
// starting express server
app.listen(port, function() {
 console.log("Server is running at : http://localhost:" + port);
});


