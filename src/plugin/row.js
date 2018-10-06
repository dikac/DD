(function () {

    let HtmeRow = new HtmeComponentBlock(new HtmeComponentAttribute({'HtmeRow':'HtmeRow'}));
    HtmeRow.element().attribute().get('class').add('row');
    HtmeRow.panel().name().attribute().get('class').add('htmeName');
    HtmeRow.panel().name().content = 'Row';
    HtmeRow.panel().setMenu(HtmeContainer.panel().menu('window'));


    let HtmeColumn = new HtmeComponentBlock(new HtmeComponentAttribute({'HtmeColumn':'HtmeColumn'}));
    HtmeColumn.panel().name().attribute().get('class').add('htmeName');
    HtmeColumn.panel().name().content = 'Column';

    HtmeColumn.panel().setMenus(HtmeContainer.panel().menus());


    Htme.edit.handlers['row'] = function() {

        HtmeRow.setPanel();

        let menu = HtmeColumn.panel().menu('edit');

        menu.submenus['columnEdit'] = columnEdit;

        HtmeColumn.setPanel();

        delete menu.submenus['columnEdit'];
    };

    Htme.render.handlers['row'] = function() {

        HtmeRow.removePanel();
        HtmeColumn.removePanel();

    };


    function ColumValue(event) {

        this.click = $(event.target);
        this.container = HtmeComponentBlock.binding().selectFromChildren(this.click);

        this.input = this.click.children('.HtmeColumnInput').first();

        this.val = this.input.val();

        if(this.val > 12) {

            this.input.val(this.val = 12)

        } else if(this.val < 1) {

            this.input.val(this.val = 1)
        }
     }

    HtmeContainer.panel().menu('new').submenus['row'] = function () {

        let element = new HtmeComponentElement();
        element.attribute().get('class').add('htmeItem');
        element.content = 'Row';

        return new HtmeComponentClick('HtmeNewRow',function(e) {

            var click = $(e.target);
            var container = HtmeComponentBlock.binding().selectFromChildren(click);

            container.append(HtmeRow.toString());

            Htme.update.trigger();

        }, element);
    }();


    var columnItem = `
    Column
    <input class="HtmeColumnInput pull-right" type="number" value="3"
    name="quantity" min="1" max="12" style="height: 20px; width: 40px; margin-left: 10px">
    `;

    var columnEdit = function() {

        let click = new HtmeComponentClick('HtmeEditColumn',function(e) {

            let input = new ColumValue(e);

            // remove
            let val = input.container.attr('Htme-column');

            input.container.removeAttr(`Htme-column`);
            input.container.removeClass(`col-md-${val}`);

            // set
            input.container.addClass(`col-md-${input.val}`);
            input.container.attr('Htme-column', ''+input.val)
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = columnItem;

        return click;
    }();


    HtmeRow.panel().menu('new').submenus['column'] = function () {

        let click = new HtmeComponentClick('HtmeNewColumn',function(e) {

            let input = new ColumValue(e);

            HtmeColumn.element().attribute().get('class').set('col', 'col-md-' + input.val);
            HtmeColumn.element().attribute().get('Htme-column').set('col',''+input.val);

            let menu = HtmeColumn.panel().menu('edit');

            menu.submenus['columnEdit'] = columnEdit;

            input.container.append(HtmeColumn.toString());

            delete menu.submenus['columnEdit'];

            Htme.update.trigger();
        });


        new HtmeComponentClick('HtmeColumnInput',function(e) {
            e.stopPropagation();
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = columnItem;

        return click.element();
    }();

})();

