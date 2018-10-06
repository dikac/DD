(function () {

    let element = new HtmeComponentElement();
    let click = new HtmeComponentClick('HtmeShowHide', function(e) {

        let click = $(e.target);
        let container = HtmeComponentBlock.binding().selectFromChildren(click);

        let children = container.children().not(HtmeComponentPanel.binding().selector(true));

        if(click.html() === 'Hide') {

            click.html('Show');
            children.hide();

        } else {

            click.html('Hide');
            children.show();
        }

    },element);

    element.content = 'Hide';
    // style
    element.attribute().get('class').add('htmeItem');

    HtmeContainer.panel().menu('window').submenus['show/hide'] = click;
    HtmeContent.panel().menu('window').submenus['show/hide'] = click;

})();
