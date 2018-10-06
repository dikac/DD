(function () {

    /**
     *
     * @type {null|number}
     */
    let copy;

    /**
     * @type {null|number}
     */
    let cut;

    let copyClick = new HtmeComponentClick('HtmeCopy', function (e) {

        copy = HtmeComponentBlock.binding().selectFromChildren($(e.target));
        $('.HtmePaste').show();
    });

    copyClick.element().attribute().get('class').add('htmeItem');
    copyClick.element().content = 'Copy';
    HtmeContainer.panel().menu('edit').submenus['copy'] = copyClick;


    let cutClick = new HtmeComponentClick('HtmeCut', function (e) {

        cut = HtmeComponentBlock.binding().selectFromChildren($(e.target));
        copy = cut;

        $('.HtmePaste').show();

    });

    cutClick.element().attribute().get('class').add('htmeItem');
    cutClick.element().content = 'Cut';
    HtmeContainer.panel().menu('edit').submenus['cut'] = cutClick;


    let pasteClick = new HtmeComponentClick('HtmePaste', function (e) {

        let data = copy.clone();
        HtmeComponentBlock.binding().selectFromChildren($(e.target)).append(data);

        if(cut) {
            copy = data;
            cut.remove();
        }

        Htme.update.trigger();
    });

    pasteClick.element().attribute().get('class').add('htmeItem');
    pasteClick.element().attribute().get('class').add('htmeHide');
    pasteClick.element().content = 'Paste';
    HtmeContainer.panel().menu('edit').submenus['paste'] = pasteClick;

})();