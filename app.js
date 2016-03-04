var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/iota');
mongoose.model(
    'Task',
    new Schema({
            "task": String,
            "completed": Boolean
        },
        {
            collection: 'tasks'
        }
    ));

var Task = mongoose.model('Task');

app.post('/addTask', function(req, res) {
    var addedTask = new Task({
        "task": req.body.task,
        "completed": false
    });

    addedTask.save(function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        Task.find({}, function(err, data) {
            if(err) {
                console.log('ERR: ', err);
            }

            res.send(data);
        });
    });

});

app.get('/getAllTasks', function(req, res) {
    Task.find({}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        res.send(data);
    });
});

app.delete('/deleteTask/:id', function(req, res) {
    Task.findByIdAndRemove({"_id" : req.params.id}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        res.send(data);
    });
});

app.put('/completeTask/:id', function(req, res){
    Task.findByIdAndUpdate(
        {_id: req.params.id},
        {
            $set: {completed: true}
        },
        function(err, data) {
            if(err) {
                console.log('ERR: ', err);
            }

            res.send(data);
        }
    );

});

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});