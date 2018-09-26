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

     DragDrop.name.views['column' + num] = function(element)
     {
         var e = $(element);

         if(e.hasClass(column.bootstrap)) {

             return 'column ' + num;
         }

         return '';
     };

    DragDrop.panel.views['column' + num] = function() {

        return DragDrop.panel.view(
            [   DragDrop.draggable.classes.bind.main,
                panel.bind,
                panel.style,
            ]
        );
    };

    DragDrop.droppable.events.receive['column' + num] = function(event, ui)
    {
        var child = $(event.target).children('.' + panel.bind);

        if(child.length !== 0) {

            var content = DragDrop.content.view([
                column.bootstrap, column.bind

            ],[
                DragDrop.droppable.classes.bind.main,
                column.style,
            ], 'Column' + num);

            child.replaceWith(content);


            DragDrop.droppable.bind();
            DragDrop.control.render();
            DragDrop.name.render();
            DragDrop.new.trigger();
        }

        //DragDrop.droppable.bind();
        //DragDrop.control.render();
        //DragDrop.name.render();

    };
     //
     // DragDrop.new.events['DragDrop.droppable.bind'] = DragDrop.droppable.bind;
     // DragDrop.new.events['DragDrop.control.render'] = DragDrop.control.render;
     // DragDrop.new.events['DragDrop.name.render'] = DragDrop.name.render;
};

DDColumn(3);
DDColumn(4);

