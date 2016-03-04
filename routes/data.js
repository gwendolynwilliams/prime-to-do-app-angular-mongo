var express = require('express');
var router = express.Router();
var pg = require('pg');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
    )
);

var Task = mongoose.model('Task');

router.post('/addTask', function(req, res) {
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

router.get('/getAllTasks', function(req, res) {
    Task.find({}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        res.send(data);
    });
});

router.delete('/deleteTask/:id', function(req, res) {
    Task.findByIdAndRemove({"_id" : req.params.id}, function(err, data) {
        if(err) {
            console.log('ERR: ', err);
        }

        res.send(data);
    });
});

router.put('/completeTask/:id', function(req, res){
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

module.exports = router;