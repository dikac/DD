const DDColumn = new DDContainer();

DDColumn.attribute('class').push('col-md-4');
DDColumn.panel.menus['new'] = DD.panel.menus['new'];

DDColumn.panel.name.content = 'column';

var click = new DDElementAbstract('DDColumn', 'Column');
click.attribute('class').push('DDmenu');

//click.attribute('class').push('dropdown-submenu');

//
// click.content = `
//
//         <div class="dropdown-submenu">
//             <div>More options</div>
//             <div class="dropdown-menu">
//                 <div>Second level</div>
//                 <div>Second level</div>
//                 <div>Second level</div>
//             </div>
//         </div>
//
//
// `;


var menu = click.content = new DDMenu();
menu.attribute('class').push('dropdown-submenu');
menu.attribute('role').push('toolbar');
menu.items.push(new DDElementAbstract('Column'));


var sub = new DDMenu();
sub.attribute('class').push('dropdown-menu btn-toolbar');
menu.items.push(sub);


for(let i = 1;i<=12;i++) {


    let element = new DDElementClick('DDColumn' + i, i);
    element.attribute('class').push('btn btn-xs btn-default btn-group');
    element.attribute('style').push('width: 30px;');
    // element.attribute('class').push('btn btn-default btn-group');
    // element.attribute('style').push('width: 40px;');
    sub.items.push(element);

    element.handler = function(jquery) {


        var container = DDContainer.from($(jquery.target));

         var content = DDContent.fromOuter(container);

        DDColumn.content = new DDContent();
        DDColumn.attribute('class').push('col-md-' + i);
       // console.log(content);
         content.append(DDColumn.toString());
        //
        // DD.update.trigger();
    };


  //  DD.panel.menus['new'].items.push(DDRow.item);
}





// var menu = click.content =  new DDMenu();
//
// var main = new DDElementAbstract();
// main.content = 'aw';
// main.attribute('class').push('dropdown-submenu');
// menu.items.push(main);
//
// //click.items.push(new Element('a'));
//
// var sub = new DDMenu();
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


DDColumn.item = click;
DDColumn.item.handler = function(jquery) {


    var container = DDContainer.from($(jquery.target));
    console.log(container);
    var content = DDContent.fromOuter(container);


    content.append(DDColumn.toString());

    DD.update.trigger();
};


DD.panel.menus['new'].items.push(DDColumn.item);













var $new = new DDMenuDropDown();
$new.name = 'size';
$new.attribute('class').push('pull-left');


$new.items.push(new DDElementClick('A', '1111111111111111111111'));

DDColumn.panel.menus['size'] = $new;