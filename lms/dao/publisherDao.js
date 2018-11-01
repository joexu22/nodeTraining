var db = require('./db');

exports.getAllPublishers = function(cb){
    db.query('select * from lms.publisher', function(err, result) {
        cb(err, result);
      });
};

exports.addPublisher = function(publisher, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('insert into lms.publisher(publisher_address, publisher_name) values(?,?)', [publisher.publisher_address, publisher.publisher_name], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          } 
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      });
};

exports.updatePublisher = function(publisherId, publisher, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);

        db.query('update lms.publisher set publisher_address = ?, publisher_name = ? where publisher_id = ?', [publisher.publisher_address, publisher.publisher_name, publisherId], function(err, res){
          if(err){
            db.rollback(function(err, res) {
              cb(err, res);
            });
          }
          db.commit(function(err, res){
            cb(err, res);
          });
        });
    });
};

exports.removePublisher = function(publisherId, cb){
    db.beginTransaction(function(err){
        if(err) cb(err, null);
    
        db.query('delete from lms.publisher where publisher_id = ?', [publisherId], function(err, res){
          if(err){
            db.rollback(function(err, res){
              cb(err, res);
            });
          } 
          db.commit(function(err, res){
            cb(err, res);
          });
        });
      });
}