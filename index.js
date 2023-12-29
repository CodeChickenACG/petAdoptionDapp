var express = require('express');
var app = express();
var path = require('path');
// Set the views directory to the "src" directory
app.set('views', path.join(__dirname, 'src'));
app.set('view engine', 'html'); // Set the view engine to EJS
app.engine('html',require('ejs').renderFile)

// Serve static files from the 'src' directory
app.use(express.static('src'));

app.get('/', function (req, res) {
    res.render('index.html');
});

// Start the server on port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
