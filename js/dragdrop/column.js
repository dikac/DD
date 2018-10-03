

const HtmeColumn = new HtmeComponentContainer('HtmeRow', new HtmeComponentElement(), new HtmeComponentPanel(Htme.menu));
HtmeColumn.panel().name = '<div class="pull-left htmeName">column</div>';

HtmeColumn.panel().menu('new').submenus['column'] = function () {

    let click = new HtmeComponentClick('HtmeNewColumn',function(e) {

        var click = $(e.target);
        var container = HtmeComponentContainer.fromInner(click);
        var input = click.children('.HtmeColumnInput');
        var col = input.val();

        if(col > 12) {

            input.val(col = 12)

        } else if(col < 1) {

            input.val(col = 1)
        }

        HtmeColumn.element().attribute().named('class')['col'] = 'col-md-' + col;

        container.append(HtmeColumn.toString());

        Htme.update.trigger();
    });


    new HtmeComponentClick('HtmeColumnInput',function(e) {
        e.stopPropagation();
    });

    click.element().attribute().list('class').push('htmeMenu');
    click.element().content = `
    column
    
    <input class="HtmeColumnInput pull-right" type="number" value="3"
    name="quantity" min="1" max="12" style="height: 20px; width: 40px; margin-left: 10px">
    `;

    return click.element();
}();



//
// const HtmeColumn = function() {
//
//     let panel = Object.assign(new HtmeComponentElement(), new HtmeComponentPanel());
//     return Object.assign(new HtmeComponentElement(), new HtmeComponentContainer(new HtmeComponentAttribute, panel));
//
// }();
//
// HtmeColumn.content.content = new HtmeComponentItems({
//     menu:HtmeComponentMenu(Htme.menu.new),
//     show:Htme.menu.show
// });
//
// new function HtmeComponentItems(items = {}) {
//
//     this.content = items;
//
//     this.toString = function () {
//
//         let array = [];
//
//         for(let k in this.content) {
//
//             if(k === 'column') {
//
//                 continue;
//             }
//
//             array.push(this.content[k]);
//         }
//
//         return array.join('');
//     }
//
// }(Htme.menu.new);
//
//
// Htme.menu.new['column'] = function () {
//
//     let click = Object.assign(new HtmeComponentElement(), new HtmeComponentClick('DDNewColumn'));
//
//     click.attribute.list('class').push('pull-left');
//     click.content = 'Column';
//
//     click.setHandler(function(e) {
//
//         let click = $(e.target);
//         let col = click.siblings('.DDColumnInput').val();
//
//         HtmeColumn.attribute.named('class')['col'] = 'col-md-' + col;
//
//         let container = HtmeComponentContainer.fromInner(click);
//         container.append(HtmeColumn.toString());
//         Htme.update.trigger();
//
//     });
//
//     let input = `<input
//                 class="pull-left DDColumnInput" type="number" value="3"
//                 name="quantity" min="1" max="12" style="height: 20px; width: 40px; margin-left: 10px">`
//
//     return new HtmeComponentItems({name:click, input:input});
// }();
//
//
//































//
// HtmeColumn.attribute('class').push('col-md-4');
// HtmeColumn.panel.menus['new'] = Htme.panel.menus['new'];
//
// HtmeColumn.panel.name.content = 'column';
//
// var click = new DDElementAbstract('HtmeColumn', 'Column');
// click.attribute('class').push('DDmenu');
//
// //click.attribute('class').push('dropdown-submenu');
//
// //
// // click.content = `
// //
// //         <div class="dropdown-submenu">
// //             <div>More options</div>
// //             <div class="dropdown-menu">
// //                 <div>Second level</div>
// //                 <div>Second level</div>
// //                 <div>Second level</div>
// //             </div>
// //         </div>
// //
// //
// // `;
//
//
// var menu = click.content = new HtmeComponentMenu();
// menu.attribute('class').push('dropdown-submenu');
// menu.attribute('role').push('toolbar');
// menu.items.push(new DDElementAbstract('Column'));
//
//
// var sub = new HtmeComponentMenu();
// sub.attribute('class').push('dropdown-menu btn-toolbar');
// menu.items.push(sub);
//
//
// for(let i = 1;i<=12;i++) {
//
//
//     let element = new DDElementClick('HtmeColumn' + i, i);
//     element.attribute('class').push('btn btn-xs btn-default btn-group');
//     element.attribute('style').push('width: 30px;');
//     // element.attribute('class').push('btn btn-default btn-group');
//     // element.attribute('style').push('width: 40px;');
//     sub.items.push(element);
//
//     element.handler = function(jquery) {
//
//
//         var container = HtmeComponentContainer.fromInner($(jquery.target));
//
//          var content = DDContent.fromOuter(container);
//
//         HtmeColumn.content = new DDContent();
//         HtmeColumn.attribute('class').push('col-md-' + i);
//        // console.log(content);
//          content.append(HtmeColumn.toString());
//         //
//         // Htme.update.trigger();
//     };
//
//
//   //  Htme.panel.menus['new'].items.push(HtmeRow.item);
// }





// var menu = click.content =  new HtmeComponentMenu();
//
// var main = new DDElementAbstract();
// main.content = 'aw';
// main.attribute('class').push('dropdown-submenu');
// menu.items.push(main);
//
// //click.items.push(new Element('a'));
//
// var sub = new HtmeComponentMenu();
// sub.attribute('class').push('dropdown-menu');
//
// menu.items.push(sub);
//
// // sub.attribute('class').push('dropdown-menu');
// sub.items.push(new DDElementAbstract('11'));
// sub.items.push(new DDElementAbstract('22'));
// sub.items.push(new DDElementAbstract('33'));
// //
// // click.content = sub;
//
//
// HtmeColumn.item = click;
// HtmeColumn.item.handler = function(jquery) {
//
//
//     var container = HtmeComponentContainer.fromInner($(jquery.target));
//     console.log(container);
//     var content = DDContent.fromOuter(container);
//
//
//     content.append(HtmeColumn.toString());
//
//     Htme.update.trigger();
// };
//
//
// Htme.panel.menus['new'].items.push(HtmeColumn.item);
//
//
//
//
//
//
//
//
//
//
//
//
//
// var $new = new DDMenuDropDown();
// $new.name = 'size';
// $new.attribute('class').push('pull-left');
//
//
// $new.items.push(new DDElementClick('A', '1111111111111111111111'));
//
// HtmeColumn.panel.menus['size'] = $new;