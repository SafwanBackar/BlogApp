var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')

// App Config 
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Mongoose Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
})
var Blog = mongoose.model("Blog", blogSchema);


// Restful Routes 

// Index Route
app.get('/', function (req, res) {
    res.redirect('/blogs')
})

app.get('/blogs', function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err)
        } else {
            res.render('index', { blogs: blogs })
        }
    })
})
// New Route
app.get('/blogs/new', function (req, res) {
    res.render('new')
})
// Create Route

app.post('/blogs', function (req, res) {
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render('new')
            console.log(err)
        } else {
            res.redirect('/blogs')
        }
    })
})
// Show Route
app.get('/blogs/:id', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/blogs')
            console.log(err)
        } else {
            res.render('show', { blog: foundBlog })
        }
    })
})



app.listen(1002, function () {
    console.log('Server has started')
})