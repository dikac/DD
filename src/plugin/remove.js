(function () {

    let remove = function () {

        let element = new HtmeComponentElement();
        let click = new HtmeComponentClick('HtmeRemove', function(e) {

            var click = $(e.target);
            var container = HtmeComponentBlock.binding().selectFromChildren(click);


            if(HtmeComponentBlock.binding().selectFromChildren(container, true).length) {

                container.remove();

            } else {

                container.empty();
                Htme.update.trigger();
            }

        }, element);

        element.content = 'Remove';
        element.attribute().get('class').add('htmeItem');

        return click.element();
    }();

    HtmeContainer.panel().menu('window').submenus['remove'] = remove;
    HtmeContent.panel().menu('window').submenus['remove'] = remove;

})();