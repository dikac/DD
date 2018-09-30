const DDRow = new DDContainer();

DDRow.panel.menus = DD.panel.menus;

DDRow.panel.name.content = 'row';

DDRow.item = new DDElementClick('DDRow', 'Row');
DDRow.item.handler = function(jquery) {


    var container = DDContainer.from($(jquery.target));
    console.log(container);
    var content = DDContent.fromOuter(container);


    content.append(DDRow.toString());

    DD.update.trigger();
};


DD.panel.menus['new'].items.push(DDRow.item);

