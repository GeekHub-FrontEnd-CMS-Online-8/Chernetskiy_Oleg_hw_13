jQuery(function ($) {
    const todos = [];
    const list = $('.todos');
    const input = $('input');

    function addTodo(value) {
        todos.push(value);
        renderTodos();
    };

        function renderTodos() {
        list.empty();
        $.each(todos, function (i) {
            list.prepend(`
               <li>
                 ${this}
                 <button data-index="${i}" class="delete">Delete</button>
                 <button data-index="${i}" class="edit">Edit</button>
               </li>
            `);
            var tasks = JSON.stringify(todos);
            window.localStorage.setItem('todos', tasks);
        });
    };

    $(document).ready(function() {
        var tasksViev = JSON.parse(window.localStorage.getItem('todos'));
        todos.push(tasksViev);
        renderTodos();
    });

    function removeTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    };

    function editTodo (index) {
        var elementText = todos.splice(index, 1);
        test = prompt('Меняй меня полностю', elementText);
        todos.push(test);
        renderTodos();
    };

    input.on('change', function () {
        addTodo(this.value);
        this.value = '';
    });

    $(document).on('click', '.delete', function () {
        const index = $(this).data('index');
        removeTodo(index);
    });

    $(document).on('click', '.edit', function () {
        const index = $(this).data('index');
        editTodo(index);
    });

    $(document).on('click', '.loadMore', function () {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/todos", success: function (result) {
                result.splice(0, 10).map((item) => {
                    todos.push(item.title);
                    renderTodos();
                })
            }
        })
    });

});

