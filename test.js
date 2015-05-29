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
      res.body[res.body.length-1]['text'].should.equal('This is a test');
      done();
    });
  });
});