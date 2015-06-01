var app = angular.module('myTodo', []);

app.controller('mainCtrl', function($scope,Factory) {
  $scope.formData = {};
  Factory.get().success(function(data) {
    $scope.todos = data;
    });

  $scope.evalPriority = function(todo) {
    switch(todo.priority) {
      case 0:
        return "alert alert-info";
      case 1:
        return "alert alert-warning";
      case 2:
        return "alert alert-danger";   
    }
  };

  $scope.createTodo = function() {
    if ($scope.formData.text !== undefined) {
      Factory.create($scope.formData).success(function(data) {
        $scope.todos = data;
        $scope.formData.text = undefined;
      });
    }
  };

  $scope.deleteTodo = function(id) {
    Factory.delete(id).success(function(data) {
      $scope.todos = data;
    });
  };

// EDITING STUFF

  $scope.editTodo = function(todo) {
    
  };

});

app.factory('Factory', function($http){
  return {
    get: function() {
      return $http.get('/api/todos');
    },
    create: function(todoData) {
      return $http.post('/api/todos', todoData);
    },
    delete: function(id) {
      return $http.delete('/api/todos/' + id);
    },
    update: function(id, todoData) {
      return $http.post('/api/todos/' + id);
    }
  };
});