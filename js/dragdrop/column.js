 function DDColumn (num) {

     var panel = {
         bind : 'ddColumn' + num,
         style : `glyphicon glyphicon glyphicon-th ddColumnPanel${num}`
     };

     var panelRender = {
         bind : 'ddColumnRenderBind',
         render : 'ddColumnRender',
         style : `ddColumnPanelRender glyphicon glyphicon-equalizer `,
     };

     var column = {
         bind : `ddColumnBind`,
         bootstrap : 'col-md-' + num,
         style : `ddColumnContainer${num} ddColumnContainer ddContainer`,

     };

     DragDrop.handlers.panel['column'] = function() {

         return DragDrop.render.panel(
             [
                 panelRender.bind,
                 panelRender.style,
             ]
         );
     };

     DragDrop.handlers.new['column'] = function ()
     {
         var on = false;

         $('.' + panelRender.bind).off('click').click(function (e) {

             var selector = $('.' + column.bind);

             if(on) {

                 on = false;
                 selector.removeClass(panelRender.render);

             } else {

                 on = true;
                 selector.addClass(panelRender.render);
             }
         });
     };

    DragDrop.handlers.panel['column' + num] = function() {

        return DragDrop.render.panel(
            [
                DragDrop.classes.draggable,
                panel.bind,
                panel.style,
            ]
        );
    };

    DragDrop.handlers.receive['column' + num] = function(event, ui)
    {
        $(event.target).children('.' + panel.bind).replaceWith(`

            <div class="${column.bootstrap} ${column.bind}">
                <div class="${DragDrop.classes.droppable} ${column.style}">

                </div>
            </div>
   
        `);

        DragDrop.bind.droppable();
        DragDrop.bind.new();
    };

};

DDColumn(3);
DDColumn(4);

