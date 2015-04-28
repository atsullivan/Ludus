"use strict";
// initialize Hoodie
var hoodie  = new Hoodie();

// Todos Collection/View
function Todos($element) {
  var collection = [];
  var $el = $element;

  // Handle marking todo as "done"
  $el.on('click', 'input[type=checkbox]', function() {
    hoodie.store.remove('todo', $(this).parent().data('id'));
    return false;
  });

  // Find index/position of a todo in collection.
  function getTodoItemIndexById(id) {
    for (var i = 0, len = collection.length; i < len; i++) {
      if (collection[i].id === id) {
        return i;
      }
    }
    return null;
  }

  function paint() {
    $el.html('');
    collection.sort(function(a, b) {
      return ( a.createdAt > b.createdAt ) ? 1 : -1;
    });
    for (var i = 0, len = collection.length; i<len; i++) {
      $el.append(
        '<div class="col-md-3">' +
            '<div class="card card-blue">' +
              '<li data-id="' + collection[i].id + '">' + 
                '<input type="checkbox">' +
                '<div class="icon">' +
                    '<i class="pe-7s-' + collection[i].goaltype + '"></i>' +
                '</div>' +
                '<div class="text">' +
                    '<h4>' + collection[i].goaldescription + '</h4>' +
                    '<p> Goal Date: ' + collection[i].goaldate + '</p>' +
                '</div>' +
                '<div class="icons">' +
                  '<a href="#"><i class="pe-7s-check"></i></a>' +
                '</div>' +
              '</li>' +
            '</div>' +
        '</div>' 
      );
    }
  }

  this.add = function(todo) {
    collection.push(todo);
    paint();
  };

  this.update = function(todo) {
    collection[getTodoItemIndexById(todo.id)] = todo;
    paint();
  };

  this.remove = function(todo) {
    collection.splice(getTodoItemIndexById(todo.id), 1);
    paint();
  };

  this.clear = function() {
    collection = [];
    paint();
  };
}



// Instantiate Todos collection & view.
var todos = new Todos($('#todolist'));

// initial load of all todo items from the store
hoodie.store.findAll('todo').then(function(allTodos) {
  allTodos.forEach(todos.add);
});

// when a todo changes, update the UI.
hoodie.store.on('todo:add', todos.add);
hoodie.store.on('todo:update', todos.update);
hoodie.store.on('todo:remove', todos.remove);
// clear todos when user logs out,
hoodie.account.on('signout', todos.clear);


// handle creating a new task
$('#addBut').on('click', function() {
  hoodie.store.add('todo', {
  goaldate: $("#goaldate").val(),
  goaldescription: $("#goaldescription").val(),
  goaltype: $("#goaltype").val()
  });
  $("#todoinput").val('');
});

// Wods Collection/View
function Wods($element) {
  var collection = [];
  var $el = $element;

  // Handle marking wod as "done"
  $el.on('click', 'input[type=checkbox]', function() {
    hoodie.store.remove('wod', $(this).parent().data('id'));
    return false;
  });

  // Find index/position of a wod in collection.
  function getWodIndexById(id) {
    for (var i = 0, len = collection.length; i < len; i++) {
      if (collection[i].id === id) {
        return i;
      }
    }
    return null;
  }

  function paint() {
    $el.html('');
    collection.sort(function(a, b) {
      return ( a.createdAt > b.createdAt ) ? 1 : -1;
    });
    for (var i = 0, len = collection.length; i<len; i++) {
      $el.append(
        '<div class="col-md-3">' +
            '<div class="card card-blue">' +
              '<li data-id="' + collection[i].id + '">' + 
                '<input type="checkbox">' +
                
                '<div class="text">' +
                    '<p>' + collection[i].woddate + '</p>' +
                    '<p>' + collection[i].wodtitle + '</p>' +
                    '<p>' + collection[i].wodcontent + '</p>' +
                    '<p>' + collection[i].wodcomments + '</p>' +
                '</div>' +
                
              '</li>' +
            '</div>' +
        '</div>' 
      );
    }
  }

  this.add = function(wod) {
    collection.push(wod);
    paint();
  };

  this.update = function(wod) {
    collection[getWodIndexById(wod.id)] = wod;
    paint();
  };

  this.remove = function(wod) {
    collection.splice(getWodIndexById(wod.id), 1);
    paint();
  };

  this.clear = function() {
    collection = [];
    paint();
  };
}



// Instantiate Wods collection & view.
var wods = new Wods($('#wodlist'));

// initial load of all wod items from the store
hoodie.store.findAll('wod').then(function(allWods) {
  allWods.forEach(wods.add);
});

// when a wod changes, update the UI.
hoodie.store.on('wod:add', wods.add);
hoodie.store.on('wod:update', wods.update);
hoodie.store.on('wod:remove', wods.remove);
// clear todos when user logs out,
hoodie.account.on('signout', wods.clear);


// handle creating a new wod
$('#addWod').on('click', function() {
  hoodie.store.add('wod', {
  woddate: $("#woddate").val(),
  wodtitle: $("#wodtitle").val(),
  wodcontent: $("#wodcontent").val(),
  wodcomments: $("#wodcomments").val()
  });
  $("#wodinput").val('');
});

