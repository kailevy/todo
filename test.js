var superagent = require("superagent"),
    chai = require("chai"),
    expect = chai.expect,
    should = require("should");

describe("Index", function() {
  it("renders HTML", function(done) {
    superagent.get("http://localhost:4000/")
    .end(function(err, res) {
      (err === null).should.equal(true);
      res.should.be.html;
      res.statusCode.should.equal(200);
      done();
    });
  });
});

describe("Post", function() {
  it("sends a post request", function(done) {
    superagent.post("http://localhost:4000/api/todos/")
    .send({text: 'This is a test'})
    .end(function(err,res) {
      (err === null).should.equal(true);
      res.should.be.json;
      res.body[res.body.length-1].text.should.equal('This is a test');
      done();
    });
  });
});

describe("Deletion", function() {
  it("removes the oldest entry", function(done) {
    superagent.get("http://localhost:4000/api/todos/")
    .end(function(err,res) {
      (err === null).should.equal(true);
      var lastId = res.body[0]._id;
      superagent.del("http://localhost:4000/api/todos/" + lastId)
      .end(function(err,res) {
        (err === null).should.equal(true);
        superagent.get("http://localhost:4000/api/todos/")
        .end(function(err,res) {
          (err === null).should.equal(true);
          if (res.body.length != 0) {
            res.body[0]._id.should.not.equal(lastId);
          } else {
            res.body.length.should.equal(0);
          }
          done();
        });
      });
    });
  });
});