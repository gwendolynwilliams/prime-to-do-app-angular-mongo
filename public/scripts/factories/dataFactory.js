myApp.factory('DataFactory', ['$http', function($http) {

    // PRIVATE
    var task = '';
    var allTasks = undefined;

    var addTask = function(taskToAdd) {
        $http.post('/addTask', taskToAdd).then(function(response) {
            task = response.data;
        });
    };

    var getAllTasks = function() {
        var promise = $http.get('/getAllTasks').then(function(response) {
            allTasks = response.data;
        });
        return promise;
    };

    function deleteTask(id) {
        var promise = $http.delete('/deleteTask/' + id).then(function (response) {
            console.log('delete response:', response);
        });
        return promise;
    }

    function completeTask(id) {
        data = {completed: true};
        $http.put('/completeTask/' + id, data).then(function (response) {
            console.log('complete response:', response);
        });
    }


    //PUBLIC
    var publicApi = {
        factoryGetAllTasks: function() {
            return getAllTasks();
        },
        factoryRetrieveData: function() {
            return allTasks;
        },
        factoryDeleteTask: function(id) {
            deleteTask(id);
        },
        factoryCompleteTask: function(id) {
            completeTask(id)
        },
        factoryAddTask: function(task) {
            return addTask(task);
        }

    };

    return publicApi;

}]);