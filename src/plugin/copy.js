(function () {

    /**
     *
     * @type {null|number}
     */
    let copyBuffer;

    /**
     * @type {null|number}
     */
    let cutBuffer;


    let paste = (function () {

        let click = new HtmeComponentClick('HtmePaste', function (e) {

            let target = HtmeComponentBlock.binding().selectFromChildren($(e.target));

            let message = Htme.transfer.trigger(copyBuffer, target);

            if(!jQuery.isEmptyObject(message)) {

                alert(new HtmeComponentItems(message));

            } else {

                let data = copyBuffer.clone();

                target.append(data);

                if(cutBuffer) {

                    copyBuffer = data;
                    cutBuffer.remove();
                }

                Htme.update.trigger();
            }
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().attribute().get('class').set('hide', 'htmeCPHide');
        click.element().content = 'Paste';
        HtmeContainer.panel().menu('edit').submenus['paste'] = click;


        click.show = function () {

            click.element().attribute().get('class').delete('hide');
            $('.HtmePaste').removeClass('htmeCPHide');
        };

        return click;
    })();

    let copy = (function () {

        let click = new HtmeComponentClick('HtmeCopy', function (e) {

            copyBuffer = HtmeComponentBlock.binding().selectFromChildren($(e.target));
            paste.show();
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = 'Copy';
        HtmeContainer.panel().menu('edit').submenus['copy'] = click;
        HtmeContent.panel().menu('edit').submenus['copy'] = click;

        return click;
    })();

    let cut = (function() {

        let click = new HtmeComponentClick('HtmeCut', function (e) {

            cutBuffer = HtmeComponentBlock.binding().selectFromChildren($(e.target));
            copyBuffer = cutBuffer;
            paste.show();
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = 'Cut';
        HtmeContainer.panel().menu('edit').submenus['cut'] = click;
        HtmeContent.panel().menu('edit').submenus['cut'] = click;

        return click;
    })();

    let copyInner = (function () {

        let click = new HtmeComponentClick('HtmeCopyContent', function (e) {

            let c = HtmeComponentBlock.binding().selectFromChildren($(e.target)).children().not(HtmeComponentPanel.binding().selector(true));

            copyBuffer = c;
            paste.show();
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = 'Copy Inner';
        HtmeContainer.panel().menu('edit').submenus['copy content'] = click;

        return click;
    })();


    let cutInner = (function () {

        let click = new HtmeComponentClick('HtmeCutContent', function (e) {

            let c = HtmeComponentBlock.binding().selectFromChildren($(e.target)).children().not(HtmeComponentPanel.binding().selector(true));

            copyBuffer = c;
            cutBuffer = c;

            paste.show();
        });

        click.element().attribute().get('class').add('htmeItem');
        click.element().content = 'Cut Inner';
        HtmeContainer.panel().menu('edit').submenus['cut content'] = click;

        return click;
    })();
})();