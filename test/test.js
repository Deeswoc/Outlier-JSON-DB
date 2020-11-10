
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
describe('Create Student Property', ()=>{
    let id = "876";
    describe('Student File does not exists', ()=>{
        it('should not have a file for the student', ()=>{
            expect(fs.existsSync(path.join(__dirname, "data", `${id}.json`))).to.be.false;
        })

        it('should return the name of the student', ()=>{
            chai.request(server)
                .post(`/${id}/name`)
                .set('content-type', 'application/json')
                .send({ name:"Henry"})
                .end((err, res)=>{
                    res.should.have.status(200);
                    expect(res.body).to.be.eql({ name:"Henry"});
                })
        });

        it('should create a file with the given id', ()=>{
          path.join(__dirname, "data", `${id}.json`)
        })

    })
})