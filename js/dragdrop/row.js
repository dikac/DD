//

const DDRow = new DDContainer();

//
// DDRow.item.attribute('class').push('glyphicon glyphicon-unchecked btn btn-default btn-xs');
// DDRow.item.attribute('style').push('float:right;');



DD.panel.menus['add'].items.push(new DDItem());
DD.panel.menus['add'].items.push(22);

//
// DD.menu.items.push(DDRow.item);
// DD.menu.items.push(new DDItem('a',[],{'style':['float:left;']}));

// var invoker = new DDViewAbstract('DDRow');
// invoker.attribute('class').push('glyphicon glyphicon-unchecked btn btn-default btn-xs');
// DDRow.invoker = invoker;
//
//
// var c = new DDContainerName('Aw',[]);
// c.attribute('style').push('float:left;');
// DD.menu.menus.push(c);
// DD.menu.menus.push(DDRow.invoker);
// DD.menu.menus.push(DDRow.invoker);

//
//
// class DDRowPanel extends DDViewAbstract {
//
//     constructor() {
//
//         super();
//         this.attributes['class'] = ['glyphicon glyphicon-unchecked btn btn-default btn-xs'];
//         this.attributes['title'] = ['row'];
//     }
//
//     inner() {
//         return '';
//     }
// }
//
//
// DD.document.panels['row'] = (new DDRowPanel).render();
// DD.document.panels['rowz'] = (new DDRowPanel).render();
//
// DD.update.events['row'] = function () {
//
//     $(DDRowPanel.selector()).off('click').click(function (e) {
//
//         console.log(this);
//     });
// };