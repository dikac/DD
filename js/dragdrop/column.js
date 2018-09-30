const DDColumn = new DDContainer();

DDColumn.attribute('class').push('col-md-4');
DDColumn.panel.menus['new'] = DD.panel.menus['new'];

DDColumn.panel.name.content = 'column';

var click = new DDElement('DDColumn', 'Column');


//click.attribute('class').push('dropdown-submenu');


click.content = `

        <div class="dropdown-submenu">
            <div>More options</div>
            <div class="dropdown-menu">
                <div>Second level</div>
                <div>Second level</div>
                <div>Second level</div>
            </div>
        </div>


`;


var menu = click.content = new DDMenu();
menu.attribute('class').push('dropdown-submenu');
menu.items.push(new DDElement('More options'));

var sub = new DDMenu();
sub.attribute('class').push('dropdown-menu');
menu.items.push(sub);
sub.items.push(new DDElement('Second level'));
sub.items.push(new DDElement('Second level'));



// var menu = click.content =  new DDMenu();
//
// var main = new DDElement();
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
// sub.items.push(new DDElement('11'));
// sub.items.push(new DDElement('22'));
// sub.items.push(new DDElement('33'));
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