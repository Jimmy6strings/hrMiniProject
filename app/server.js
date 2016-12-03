//where node will open in terminal
//required packages
var express = require('express');
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var Dog = require('./models/dog');
//created database from mlab created environment
mongoose.connect('mongodb://mlab.com/environments/e-2ad3a8a5');
//defining the app name to use express
var app = express();

//configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set the port
var port = process.env.PORT || 8080;

//create instance of router on express to pass on database
var router = express.Router();

//create middleware for all requests
router.use(function(req, res, next) {
  next();
});

//create route for http://localhost8080/dogs
router.route('/dogs')
//post request for all dogs
.post(function(req, res) {
  var dog = new Dog();
  dog.name = req.body.name;

    dog.save(function(err) {
      if(err)
        res.send(err);
        res.json({ message: 'created a dog!' });
    });
})
//get all the dogs
.get(function(req, res) {
  Dog.find(function(err, dogs) {
    if (err)
      res.send(err);
      res.json(dogs);
    });
});
//create route http://localhost8080/dogs/:dog_id
router.route('/dogs/:dog_id')
//get a dog
.get(function(req, res) {
  Dog.findById(req.params.dog_id, function(err, dog) {
    if (err)
      res.send(err);
    res.josn(dog);
  });
})
//change dog properties
.put(function(res, req) {
  Dog.findById(req.params.dog_id, function(err, dog) {
    if(err)
      res.send(err);

    dog.name = req.body.name;
    dog.save(function(err) {
      if(err)
        res.send(err);
      res.json({ message: 'name the doggy!'})
    });
  });
})
//remove a dog
.delete(function(req, res) {
  Dog.remove({
    id: req.params.dog_id
  }, function(err, dog) {
    if(err)
      res.send(err);
    res.json({ message: 'bye doggy'})
  });
})

//routes using /api
app.use('/api', router)

//server start
app.listen(port);
console.log("heres the port " + port);
//standard URL's http://urlname.com/api/dogs & https://urlname.com/api/dogs/:dog_id