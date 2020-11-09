const { Console } = require('console');
let express = require('express');
let app = express();
let fs = require('fs');
let path = require('path');
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded());

if (!fs.existsSync(path.join(__dirname, "data"))){
    fs.mkdirSync(path.join(__dirname, "data"));
    console.log("Directory Created");
}

app.param(["studentId"], (req, res, next)=>{
    let student = {};
    student.id = req.params.studentId;
    student.recordPath = path.join(__dirname, "data", `${student.id}.json`);
    student.propLocation = req.url.split("/").splice(2);
    student.exists = function(){
        if (fs.existsSync(student.recordPath)) {
            return true;
        }else{
            return false;
        }
    }
    student.getJSON = function (){
        let rawdata = fs.readFileSync(student.recordPath);
        return JSON.parse(rawdata);
    }
    req.student = student;
    next();
});

app.get('/:studentId/*', (req, res, next)=>{
    if(req.student.exists()){
        let propLocation = req.student.propLocation;
        student = req.student.getJSON();
        let currentProp = student[propLocation[0]];
        propLocation.forEach((element, i, arr) => {
            if(i< arr.length - 1 && i!==0){
                currentProp = currentProp[propLocation[i]];
            }
        })
        res.status(200).json(currentProp);
    }else{
        res.sendStatus(404);
    }
});

app.post('/:studentId/*', (req, res, next)=>{
    let id = req.params.studentId;
    let record = path.join(__dirname, "data", `${id}.json`);
    let propLocation = req.url.split("/").splice(2);
    let student = {}
    let newStudent = false;
    student[propLocation[0]] = {}
    if(req.student.exists()){
        student = req.student.getJSON();
    }else{
        newStudent = true;
    }
    let currentProp = student[propLocation[0]];
    propLocation.forEach((element, i, arr) => {
        if(i< arr.length - 1 && i!==0){
            if(newStudent)
                currentProp[propLocation[i]] = {};
            currentProp = currentProp[propLocation[i]];
        }
    })
    currentProp[propLocation[propLocation.length - 1]] = req.body[propLocation[propLocation.length - 1]]
    res.status(200).send("hello world");
    fs.writeFileSync(record, JSON.stringify(student));
})



app.listen(PORT, ()=>{
    console.log("Sever Started")
})