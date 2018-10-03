const DDRow = new DDContainer('DDRow', new DDElement(), new DDPanel(DD.menu));

DDRow.element().attribute().list('class').push('row');
DDRow.panel().name = '<div class="pull-left ddname">container</div>';

DD.boot.handlers['row'] = function(selector) {

    DDRow.boot(selector);
    DD.update.trigger();
};

DDRow.panel().menu('new').submenus['container'] = function () {

    let click = new DDClick('DDNewContainer',function(e) {

        var click = $(e.target);
        var container = DDContainer.fromInner(click);
        container.append(DDRow.toString());
        DD.update.trigger();
    });
    click.element().attribute().list('class').push('ddMenu');
    click.element().attribute().list('class').push();
    click.element().content = 'container';

    return click.element();
}();


