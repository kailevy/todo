var app = angular.module('myTodo', []);

app.controller('mainCtrl', function($scope,Factory) {
  $scope.formData = {};
  $scope.formEdit = {};
  $scope.displayingEditForm = null;
  Factory.get().success(function(data) {
    $scope.todos = data;
    })
    .error(function(reason) {
      alert(reason);
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

  $scope.loadColor = function(num) {
    switch(true) {
      case (num === 0):
        return "label label-success";
      case (num < 4 && num > 0):
        return "label label-info";
      case (num > 3 && num < 10):
        return "label label-warning";
      case (num > 9):
        return "label label-danger";   
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

  $scope.startEdit = function(id) {
    $scope.displayingEditForm = id;
  };

  $scope.endEdit = function() {
    $scope.displayingEditForm = null;
  };

  $scope.editingThisForm = function(id) {
    return $scope.displayingEditForm == id;
  };

  $scope.editTodo = function(todo) {
    $scope.formEdit.text = todo.text;
    $scope.formEdit.priority = todo.priority;
  };

  $scope.updateTodo = function(id) {
    if ($scope.formEdit.text !== ""){
      Factory.update(id,$scope.formEdit).success(function(data) {
        Factory.get().success(function(data) {
          $scope.todos = data;
        });
      });
    }
  };
});

// LINK TO API METHODS

app.factory('Factory', function($http){
  BASE_URL = "http://localhost:4001"
  return {
    get: function() {
      return $http.get(BASE_URL + '/api/todos');
    },
    create: function(todoData) {
      return $http.post(BASE_URL + '/api/todos', todoData);
    },
    delete: function(id) {
      return $http.delete(BASE_URL + '/api/todos/' + id);
    },
    update: function(id, editData) {
      return $http.post(BASE_URL + '/api/todos/' + id, editData);
    }
  };
});