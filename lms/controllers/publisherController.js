var routes = require('express').Router();
var db = require('../dao/db');
var publisherDao = require('../dao/publisherDao');

routes.get('/publisher',function(req,res){
    publisherDao.getAllPublishers(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/publisher', function(req, res){
  var publisher = req.body;
  publisherDao.addPublisher(publisher, function(err, result){
    if(err){
      res.status(400);
      res.send('Add Publisher Failed!');
    }
    res.status(201);
    res.send('Add Publisher Successful!');
  });
});

routes.put('/publisher/:id', function(req, res){
  var publisher = req.body;
  publisherDao.updatePublisher(req.params.id, publisher, function(err, result){
    if(err){
      res.status(400);
      res.send('Update Publisher Failed!');
    }
    res.send('Update Publisher Successful!');
  });
});

routes.delete('/publisher/:id', function(req, res){
  publisherDao.removePublisher(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Publisher Failed!');
    }
    res.send('Delete Publisher Successful!');
  });
});

module.exports = routes;
