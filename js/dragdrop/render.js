(function () {

    var classes = {
        bind : 'ddRender',
        style : 'glyphicon glyphicon-blackboard',
    };

    DragDrop.panel.views['render'] = function () {

        return DragDrop.panel.view([classes.style, classes.bind], 'render');
    };

    DragDrop.new.events['render'] = function () {

        $('.' + classes.bind).off('click').click(function (e) {

            DragDrop.content.render(true);

        });
    };

})();

(function () {

    var classes = {
        bind : 'ddEdit',
        style : 'glyphicon glyphicon-pencil',
    };

    DragDrop.panel.views['edit'] = function () {

        return DragDrop.panel.view([classes.style, classes.bind], 'edit');
    };

    DragDrop.new.events['edit'] = function () {

        $('.' + classes.bind).off('click').click(function (e) {

            DragDrop.content.render(false);

        });
    };

})();







