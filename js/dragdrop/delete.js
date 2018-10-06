(function (DragDrop) {

    var classes = {

        panel : {
            bind : 'ddDelete',
            style : 'glyphicon-trash glyphicon ddDeletePanel'
        }
    };

    DragDrop.handlers.panel['delete'] = function () {

        return DragDrop.render.panel([
            DragDrop.classes.droppable,
            classes.panel.bind,
            classes.panel.style,
        ]);
    };

    DragDrop.handlers.receive['delete'] = function (event, ui) {

        $('.' + classes.panel.bind).html('');
    };


})(DragDrop);





