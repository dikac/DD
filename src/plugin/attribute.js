(function () {

    var dom;

    function HtmeAttributeComponentEditor (attribute = '', value = '') {

        return `
        <div class="input-group col-md-12" style="margin-bottom: 5px; margin-top: 5px">
            <div class="col-md-2"><input value="${attribute}" class="form-control" type="text"></div>
            <div class="col-md-9"><input value="${value}" class=" form-control" type="text"></div>
            <div class="col-md-1"><button class="btn btn-danger HtmeAttributeRemove">Remove</button></div>
        </div>`;
    }

    function HtmeGetAttributes(jquery) {

        let attribute = {};

        jquery.each(function() {
            $.each(this.attributes, function() {
                // this.attributes is not a plain object, but an array
                // of attribute nodes, which contain both the name and value
                if(this.specified) {

                    attribute[this.name] = this.value;
                }
            });
        });

        return attribute;
    }


    let modal = new HtmeComponentModal('HtmeAttributeModal');

    modal.header = `
                <div class="alert alert-warning" role="alert">Insert Warning Here</div>
                <div class="col-md-2">Attribute</div>
                <div class="col-md-9">Value</div>
                <div class="col-md-1"><button class="btn btn-default HtmeAttributeAdd">Add</button></div>
            `;

    modal.footer = function() {

        let items = new HtmeComponentItems();

        items.items['close'] = function () {

            let click = new HtmeComponentClick('HtmeAttributeClose', function (e) {


            });

            click.element().content = 'Close';
            click.element().attribute().get('class').add('btn btn-default');
            click.element().attribute().get('data-dismiss').add('modal');

            return click.element();
        }();


        items.items['save'] = function () {

            let click = new HtmeComponentClick('HtmeAttributeSave', function (e) {

                let buffer = [];

                $(e.target).parents('.modal-content').children('.modal-body').find('input').each(function (k, v) {

                    buffer.push(v);

                });

                let attr = {};

                for(let i =0; i < buffer.length; i++) {

                    attr[$(buffer[i]).val()] = $(buffer[++i]).val();
                }

                // for(let k in attribute) {
                //
                //     container.removeAttr(k);
                // }

                for(let k in attr) {

                    if(attr[k].length) {

                        dom.attr(k, attr[k]);
                    }
                }
            });

            click.element().content = 'Save';
            click.element().attribute().get('data-dismiss').add('modal');
            click.element().attribute().get('class').add('btn btn-default');

            return click.element();
        }();

        return items;

    }();


    let editor = function () {

        let click = new HtmeComponentClick('HtmeComponentAttribute',function(e) {

            dom = HtmeComponentBlock.binding().selectFromChildren($(e.target));

            let attribute = HtmeGetAttributes(dom);

            modal.show();


            let body = $('.HtmeAttributeModal').find('.modal-body');
            body.empty();

            let items  = new HtmeComponentItems();

            for(let k in attribute) {

                items.items[k] = HtmeAttributeComponentEditor(k, attribute[k]);
            }

            body.html(items.toString());

        });

        click.element().content = 'Attribute';
        click.element().attribute().get('class').add('htmeItem');

        return click.element();

    }();


    HtmeContainer.panel().menu('edit').submenus['element'] = editor;
    HtmeContent.panel().menu('edit').submenus['element'] = editor;

    new HtmeComponentClick('HtmeAttributeAdd', function (e) {

        $(e.target).parents('.modal-content').children('.modal-body').append(HtmeAttributeComponentEditor());

        Htme.update.trigger();
    });

    new HtmeComponentClick('HtmeAttributeRemove', function (e) {

        $(e.target).parents('.input-group').remove();
    });

})();