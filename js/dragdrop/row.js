(function (DragDrop) {

    var classes = {

        panel : {
            bind : 'ddRow',
            style : 'ddRowPanel glyphicon glyphicon-unchecked',
        },

        container: {
            style : ' ddRowContainer ddContainer row'
        }
    };

    DragDrop.handlers.panel['row'] = function() {

        return DragDrop.render.panel(
            [   DragDrop.classes.draggable,
                classes.panel.bind,
                classes.panel.style
            ]
        );
    };

    DragDrop.handlers.receive['row'] = function(event, ui)
    {
        $(event.target).children('.' + classes.panel.bind).replaceWith(`
            
            <div>
                <div class="${DragDrop.classes.droppable} ${classes.container.style}"></div>
           </div>
        `);

        DragDrop.bind.droppable();
        DragDrop.bind.new();

    };

})(DragDrop);

