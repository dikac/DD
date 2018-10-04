(function () {

    let copy;
    let cut;

   let copyClick = new HtmeComponentClick('HtmeCopy', function (e) {

        copy = HtmeComponentBlock.binding().selectFromChildren($(e.target));

    });

    copyClick.element().attribute().get('class').add('htmeMenu');
    copyClick.element().content = 'copy';
    HtmeContainer.panel().menu('edit').submenus['copy'] = copyClick;


    let cutClick = new HtmeComponentClick('HtmeCut', function (e) {

        cut = HtmeComponentBlock.binding().selectFromChildren($(e.target));
        copy = cut;

    });

    cutClick.element().attribute().get('class').add('htmeMenu');
    cutClick.element().content = 'cut';
    HtmeContainer.panel().menu('edit').submenus['cut'] = cutClick;


    let pasteClick = new HtmeComponentClick('HtmePaste', function (e) {

        let data = copy.clone();
        HtmeComponentBlock.binding().selectFromChildren($(e.target)).append(data);

        if(cut) {
            copy = data;
            cut.remove();
        }
    });

    pasteClick.element().attribute().get('class').add('htmeMenu');
    pasteClick.element().content = 'paste';
    HtmeContainer.panel().menu('edit').submenus['paste'] = pasteClick;
})();