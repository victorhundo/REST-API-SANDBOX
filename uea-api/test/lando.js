//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../modules/db');
var util = require('util');
var should = chai.should();
var expect = chai.expect;
var Lando = require('../controllers/models/lando');

chai.use(chaiHttp);
describe('Lando', function() {
    beforeEach( function(done) { //Before each test we empty the database
      var query = util.format('DELETE FROM `lando`');
      db.mysqlExec(query).then(function(result){
        done();
      })
    });

    describe('GET /lando', function(){
     it('it should GET all the landoj', function(done){
       chai.request(server)
           .get('/lando')
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(0);
             done();
           });
     });

     it('it should GET all the landoj with body', function(done){
       var user = {
         message : "Teste"
       }
       chai.request(server)
           .get('/lando')
           .send(user)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               res.body.length.should.be.eql(0);
             done();
           });
     });
   });

   describe('GET /lando/:id', function(){
     it('it should GET a lando given id', function(done){
      var lando = {id : 1,nomoLoka : "nomoLoka",nomoEo : "nomoEo",landKodo : "landKodo" };
      Lando.insert(lando).then(function(sucess){
        chai.request(server)
          .get('/lando/' + lando.id)
          .end(function(err, res){
            res.should.have.status(200);
            //expect(res.body).to.deep.equal({message: 'sucess'})
            //res.body.should.be.a('object');s
            done();
          });
      });
    });

    it('it NOT should GET a lando given id', function(done){
     var lando = {id : 2,nomoLoka : "nomoLoka",nomoEo : "nomoEo",landKodo : "landKodo" };
     Lando.insert(lando).then(function(sucess){
       chai.request(server)
         .get('/lando/' + lando.id + 1)
         .end(function(err, res){
           res.should.have.status(404);
           //expect(res.body).to.deep.equal({message: 'sucess'})
           //res.body.should.be.a('object');
           done();
         });
     });
   });
  });

  describe('POST /lando', function(){
   it('it should POST a lando', function(done){
     var lando = {id : 1, nomoLoka : "nomoLoka",nomoEo : "nomoEo",landKodo : "landKodo" };
     chai.request(server)
         .post('/lando')
         .send(lando)
         .end(function(err, res){
             res.should.have.status(201);
             res.body.should.have.property('id');
             res.body.should.have.property('nomoLoka');
             res.body.should.have.property('nomoEo');
             res.body.should.have.property('landKodo');
             //res.body.should.be.a('object');
           done();
         });
   });

   it('it NOT should POST a lando (miss ID)', function(done){
     var lando = {nomoLoka : "nomoLoka",nomoEo : "nomoEo",landKodo : "landKodo" };
     chai.request(server)
         .post('/lando')
         .send(lando)
         .end(function(err, res){
             res.should.have.status(400); //Bad Request
           done();
         });
   });
 });


 describe('DELETE /lando', function(){
  it('it should DELETE a landoj given id', function(done){
    var lando = {id : 1, nomoLoka : "nomoLoka",nomoEo : "nomoEo",landKodo : "landKodo" };
    Lando.insert(lando).then(function(sucess){
      chai.request(server)
        .delete('/lando/' + lando.id)
        .end((err, res) => {
          res.should.have.status(200);
          done();
      });
    })
  });
});

});
