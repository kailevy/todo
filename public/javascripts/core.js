var app = angular.module('myTodo', []);

app.controller('mainCtrl', function($scope,Factory) {
  $scope.formData = {};
  Factory.get().success(function(data) {
    $scope.todos = data;
  });

  $scope.createTodo = function() {
    if ($scope.formData.text !== undefined) {
      Factory.create($scope.formData).success(function(data) {
        $scope.todos = data;
        $scope.formData = {};
      });
    }
  };

  $scope.deleteTodo = function(id) {
    Factory.delete(id).success(function(data) {
      $scope.todos = data;
    })
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
    }
  };
});