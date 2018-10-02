

let panel = Object.assign(new DDElement(), new DDPanel());
const DD = Object.assign(new DDElement(), new DDContainer(new DDAttribute, panel));

DDInit.events['row'] = function(selector) {

    DD.setTo(selector);
    DDUpdate.trigger();

};

DDNew.list['container'] = function () {

    let attribute = new DDAttribute();
    let click = new DDClick('DDNewContainer', null, attribute);

    attribute.list('class').push('btn btn-default btn-xl col-md-1 glyphicon glyphicon-unchecked');
    attribute.named('data-dismiss')['modal'] = 'modal';

    click.setHandler(function(e) {

        var click = $(DDNew.event.target);
        var container = DDContainer.fromInner(click);
        container.append(DD.toString());
        DDUpdate.trigger();

    });

    return Object.assign(new DDElement('<div>Container</div>'), click);
}();



DD.content.content = new DDItems();

DD.content.content.content['show/hide'] = function () {

    let attribute = new DDAttribute();

    attribute.list('class').push(
        'glyphicon glyphicon-eye-close btn btn-default btn-xs pull-right'
    );

    let click = new DDClick('DDShowHide', null, attribute);

    click.setHandler(function(e) {

        var click = $(e.target);
        var container = DDContainer.fromInner(click);
        container.toggleClass('DDHide');
        click.toggleClass('glyphicon-eye-close glyphicon-eye-open');
    });

    return Object.assign(new DDElement(), click);
}();




DD.content.content.content['add'] = function () {

    let attribute = new DDAttribute();
    let modal = new DDModal('DDNew');
    modal.header = 'new Item';
    modal.content = new DDItems(DDNew.list);

    attribute.list('class').push(
        'glyphicon glyphicon-plus btn btn-default btn-xs pull-left'
    );

    let click = new DDClick('DDAdd', null, attribute);

    click.setHandler(function(e) {

        DDNew.event = e;
        modal.show();
    });

    return Object.assign(new DDElement(), click);

}();





