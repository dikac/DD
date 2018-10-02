const DDRow = new DDContainer();

DDRow.panel.menus = DD.panel.menus;
DDRow.content.attribute('class').push('row');

DDRow.panel.name.content = 'row';

var click = DDRow.item = new DDElementClick('DDRow', 'Row');


DDRow.item.handler = function(jquery) {

    var container = DDContainer.fromInner($(jquery.target));
    var content = DDContent.fromOuter(container);

    content.append(DDRow.toString());

    DD.update.trigger();
};


DD.panel.menus['new'].items.push(DDRow.item);

