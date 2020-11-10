
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = chai.expect;
let fs = require('fs');
let path = require('path');
chai.use(chaiHttp);
let port = 3000;
let baseUrl = `http://localhost:${port}/`

let testIDs = [];
describe('POST', () => {
  let id = "876";
  describe('Student file does not exist', () => {
    it('should not have a file for the student', () => {
      fs.existsSync(getFile(id));
      expect(fs.existsSync(getFile(id))).to.be.false;
    })

    it('should return the name of the student', () => {
      chai.request(server)
        .post(`/${id}/name`)
        .set('content-type', 'application/json')
        .send({ name: "Henry" })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql({ name: "Henry" });
        })
    });

    it('should create a file with the given id', () => {
      expect(fs.existsSync(getFile(id))).to.be.true;
      testIDs.push(id);
    })
  })


  describe('Student File does Exist', () => {
    it('should return the name of the student', () => {
      chai.request(server)
        .post(`/${id}/Class/Teacher/name`)
        .set('content-type', 'application/json')
        .send({ name: "Bill" })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql({ name: "Bill" });
        })
    });

    it('should still have the students name', () => {
      let data = fs.readFileSync(getFile(id));
      let student = JSON.parse(data);
      expect(student.name).to.be.equal("Henry");
    });

    it('should able to post the same data twice and not lower heirarchy properties', () => {
      chai.request(server)
        .post(`/${id}/Class/Teacher/name`)
        .set('content-type', 'application/json')
        .send({ name: "Bill" })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql({ name: "Bill" });
        })

      chai.request(server)
        .post(`/${id}/name`)
        .set('content-type', 'application/json')
        .send({ name: "Henry" })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql({ name: "Henry" });
        })
    })

  })
})

describe('Recreating Sample File', () => {
  let sample = "rn1abu8";
  testIDs.push(sample);
  let ye0ab61 = { ye0ab61: 98 };
  let ye01fd4 = { ye01fd4: 42 };
  let ye02fd4 = { ye02fd4: 80 };
  let th44 = { th44: 77 }
  let th99 = { th99: 32 }
  let ptc23 = { ptc23: 67 }
  let ptc69 = { ptc69: 23 }
  let ptco4 = { ptco4: 20 }
  let finals = { finals: 88 }
  let teacher = {teacher:"Nick Cannon"};
  let name = { name: "Andrew Holness" }
  describe("Set Up", () => {
    before(
      ()=>{
        chai.request(server)
        .post(`/${sample}/courses/calculus/quizzes/ye0ab61`)
        .send(ye0ab61)
        .end((err, res) => {
          res.should.have.status(201);
          console.log('Body: ', res.body);
          expect(res.body).to.be.eql({ye0ab61});
        })

        chai.request(server)
        .post(`/${sample}/courses/calculus/teacher`)
        .send(teacher)
        .end((err, res) => {
          res.should.have.status(201);
          console.log('Body: ', res.body);
          expect(res.body).to.be.eql(teacher);
        })

      chai.request(server)
        .post(`/${sample}/name`)
        .send(name)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql(name);
        })

      chai.request(server)
        .post(`/${sample}/courses/calculus/coursework/ye01fd4`)
        .send(ye01fd4)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql(ye01fd4);
        })

      chai.request(server)
        .post(`/${sample}/courses/calculus/coursework/ye02fd4`)
        .send(ye02fd4)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql(ye02fd4);
        })

      chai.request(server)
        .post(`/${sample}/courses/physics/labs/theoretical/th44`)
        .send(th44)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql(th44);
        })

      chai.request(server)
        .post(`/${sample}/courses/physics/labs/theoretical/th99`)
        .send(th99)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql(th99);
        })

      chai.request(server)
        .post(`/${sample}/courses/physics/labs/practical/ptc23`)
        .send(ptc23)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql(ptc23);
        })

      chai.request(server)
        .post(`/${sample}/courses/physics/labs/practical/ptc69`)
        .send(ptc69)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql(ptc69);
        })

      chai.request(server)
        .post(`/${sample}/courses/physics/labs/practical/ptco4`)
        .send(ptco4)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql(ptco4);
        })

      chai.request(server)
        .post(`/${sample}/courses/physics/quizzes/finals`)
        .send(finals)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.eql(finals);
        })
      }
    )
    it('should make all the requests', () => {
      console.log("ffffffffffffffffffffffffffffffffffffffffffffffffffffff");
      expect(require('../data/rn1abu8')).to.be.eql(require('./test-sample-1.json'));
    })
    after(() => {
      it('should have recreated the file', () => {
      })
    })
  });

})

function getFile(id) {
  return path.join(__dirname, "../", "data", `${id}.json`)
}

describe('GET', () => {
  // id = "876" 
})

after("Cleaning Up", () => {
  testIDs.forEach(id => {
    if (fs.existsSync(getFile(id))) {
      console.log("Deleting " + id + ".json");
      fs.unlinkSync(getFile(id));
    }
  })
})