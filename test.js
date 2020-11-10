const tape = require('tape')
const jsonist = require('jsonist')
const path = require("path")
const fs = require("fs");
const PORT = process.env.PORT = process.env.PORT || require('get-PORT-sync')()
const server = require('./app')

const urlBase = `http://localhost:${PORT}`

// tape('should respond hello', (t) => {
//   jsonist.get(urlBase, (err, body) => {
//     if (err) t.error(err)

//     t.equal(body.msg, 'hello')
//     t.end()
//   })
// })


tape('should create a student with a name: gary', (t) => {
    let id = "gary";
    let data = { "last": id };
    jsonist.post(urlBase + `\\${id}\\name\\last`, data, (err, body) => {
        console.log(body);
        t.equal(body.name, id);
        t.true(fs.existsSync(path.join(__dirname, "data", `${id}.json`)));
        t.end();
    })
    
})


// tape('should respond b64', (t) => {
//   jsonist.get(`${urlBase}/b64/hello`, (err, body) => {
//     if (err) t.error(err)

//     t.equal(body.b64, 'aGVsbG8=')
//     t.end()
//   })
// })

tape('cleanup', function (t) {
  server.close()
  t.end()
})
