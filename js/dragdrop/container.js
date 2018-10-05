
const HtmeRow = new HtmeComponentBlock(new HtmeComponentAttribute({'HtmeRow':'HtmeRow'}));
HtmeRow.element().attribute().get('class').add('row');
HtmeRow.panel().name().attribute().get('class').add('htmeName');
HtmeRow.panel().name().content = 'row';
HtmeRow.panel().setMenu(HtmeContainer.panel().menu('window'));


const HtmeColumn = new HtmeComponentBlock(
    new HtmeComponentAttribute({'HtmeColumn':'HtmeColumn'}),
        new HtmeComponentElement(),

);
HtmeColumn.panel().name().attribute().get('class').add('htmeName');
HtmeColumn.panel().name().content = 'column';

HtmeColumn.panel().setMenus( HtmeContainer.panel().menus());

(function () {

    function ColumValue(event) {

        this.click = $(event.target);
        this.container = HtmeComponentBlock.binding().selectFromChildren(this.click);

        console.log((this.click));

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
        element.attribute().get('class').add('htmeMenu');
        element.content = 'row';

        return new HtmeComponentClick('HtmeNewRow',function(e) {

            var click = $(e.target);
            var container = HtmeComponentBlock.binding().selectFromChildren(click);

            container.append(HtmeRow.toString());

            Htme.update.trigger();

        }, element);
    }();


    var columnItem = `
    column
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

        click.element().attribute().get('class').add('htmeMenu');
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

        click.element().attribute().get('class').add('htmeMenu');
        click.element().content = columnItem;

        return click.element();
    }();




//
// HtmeRow.panel().menu('new').submenus['container'] = function () {
//
//     let element = new HtmeComponentElement();
//     element.attribute().get('class').add('htmeMenu');
//     element.content = 'column';
//
//     return new HtmeComponentClick('HtmeNewColumn',function(e) {
//
//         var click = $(e.target);
//         var container = HtmeComponentBlock.binding().selectFromChildren(click);
//
//         HtmeColumn.panel().name().content = 'column';
//         container.append(HtmeColumn.toString());
//
//         Htme.update.trigger();
//     }, element);
// }();






})();

//
// (function () {
//
//     function prepare () {
//
//          HtmeContainer.binding().setTemporary(new HtmeComponentAttribute({'row':'row'}));
//     }
//
//     let f1 = Htme.boot.handlers['container'];
//     console.log(f1);
//     Htme.boot.handlers['container'] = function(arg) {
//       prepare();
//       f1(arg);
//     };
//
//
//
//     let submenus = HtmeContainer.panel().menu('new').submenus['container'];
//     let f2 = submenus.handler();
//     submenus.setHandler(function(e) {
//
//         prepare();
//         f2(e);
//     });
//
//     console.log(1111111111);
// })();
//
// HtmeContainer.panel().menu('edit').submenus['row'] = function () {
//
//     let click = new HtmeComponentClick('HtmeRow');
//     click.element().attribute().get('class').add('htmeMenu');
//     click.element().content = 'row';
//
//     click.setHandler(function (e) {
//
//         let target = $(e.target);
//         let container = HtmeContainer.binding().selectFromChildren(target);
//
//         console.log(container);
//     });
//
//     return click;
//
// }();

// const HtmeContainer = new HtmeComponentBlock('HtmeContainer', new HtmeComponentElement(), new HtmeComponentPanel(Htme.menu));
//
// HtmeContainer.element().attribute().list('class').push('row');
// HtmeContainer.panel().name = '<div class="pull-left htmeName">container</div>';
//
// Htme.boot.handlers['row'] = function(selector) {
//
//     HtmeContainer.boot(selector);
//     Htme.update.trigger();
// };
//
// HtmeContainer.panel().menu('new').submenus['container'] = function () {
//
//     let click = new HtmeComponentClick('HtmeNewContainer',function(e) {
//
//         var click = $(e.target);
//         var container = HtmeComponentBlock.fromInner(click);
//         container.append(HtmeContainer.toString());
//         Htme.update.trigger();
//     });
//     click.element().attribute().list('class').push('htmeMenu');
//     click.element().attribute().list('class').push();
//     click.element().content = 'container';
//
//     return click.element();
// }();
//

