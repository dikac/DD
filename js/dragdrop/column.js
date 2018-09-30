const DDColumn = new DDContainer();

DDColumn.attribute('class').push('col-md-4');
DDColumn.panel.menus['new'] = DD.panel.menus['new'];

DDColumn.panel.name.content = 'column';

DDColumn.item = new DDElementClick('DDColumn', 'Column');
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

//$new.items.push(new DDElementClick('DDRow', '1111111111111111111111'));

DDColumn.panel.menus['size'] = $new;