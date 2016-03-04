myApp.controller('MainController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.addTask = function() {

        var taskToAdd = {
            task: $scope.taskToAdd,
            completed: false,
            deleted: false
        };
        $scope.dataFactory.factoryAddTask(taskToAdd);
        $scope.taskToAdd = '';
        getAllTasks();
    };

    $scope.dataFactory.factoryGetAllTasks().then(function() {
        $scope.tasks = $scope.dataFactory.factoryRetrieveData();
    });

    $scope.deleteTask = function(id) {
        $scope.dataFactory.factoryDeleteTask(id);
        getAllTasks();
    };

    $scope.completeTask = function(id) {
        $scope.dataFactory.factoryCompleteTask(id)
        getAllTasks();
    };

    function getAllTasks() {
        $scope.dataFactory.factoryGetAllTasks().then(function() {
            $scope.tasks = $scope.dataFactory.factoryRetrieveData();
        });
    }

}]);