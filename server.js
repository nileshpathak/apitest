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




var port = process.env.PORT || 8000;
 
// starting express server
app.listen(port, function() {
 console.log("Server is running at : http://localhost:" + port);
});


