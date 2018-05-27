var express = require('express');
var mysql = require('mysql');

// Create Connection
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'q1mysql'
});

//Connect

db.connect((err) => {
    if(err){
        console.log(err);
    }
    console.log('MySql Connected...');
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE q1mysql';
    db.query(sql, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.get('/createtaskstable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), description VARCHAR(255), project_id int, due_date DATETIME, status VARCHAR(3), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Tasks table created...');
    });
});

// Insert task 1
app.get('/inserttask1', (req, res) => {
    let post = {title:'Task One', description:'This is task number one', project_id: Math.floor(1000 + (10000 - 1000) * Math.random()), due_date:'2017-11-11',status:'Old'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Task 1 added...');
    });
});

// Insert task 2
app.post('/inserttask2', (req, res) => {
    let post = {title:req.body.title, description:req.body.description, project_id: Math.floor(1000 + (10000 - 1000) * Math.random()), due_date:req.body.due_date,status:req.body.status};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Task 2 added...');
    });
});

// Select tasks
app.get('/gettasks', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) console.log(err);
        console.log(results);
        res.send('Tasks fetched...');

    });
});

// Select single task
app.get('/tasks/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Task fetched...');
    });
});


// Delete Task
app.get('/deletetask/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Task deleted...');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});