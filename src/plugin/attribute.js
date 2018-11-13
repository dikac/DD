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

                    attribute[this.name.toLowerCase()] = this.value;
                }
            });
        });

        return attribute;
    }


    let modal = new HtmeComponentModal('HtmeAttributeModal');

    modal.header = `
                <div class="alert alert-warning" role="alert">
                Class with HTME prefix is reserved, editing might cause unintended behavior            
                </div>
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

                // inputs dom
                let inputs = [];

                $(e.target).parents('.modal-content').children('.modal-body').find('input').each(function (k, v) {

                    inputs.push(v);

                });

                // attributes
                let attributes = {};

                for(let i =0; i < inputs.length; i++) {

                    let name = String($(inputs[i]).val()).trim();
                    let value = String($(inputs[++i]).val()).trim();

                    if(name.length) {

                        attributes[name.toLowerCase()] = value;
                    }
                }

                // remove attribute which not present in attribute var
                let domAttributes = HtmeGetAttributes(dom);

                for(let k in domAttributes) {

                    if(!(k in attributes)) {

                        dom.removeAttr(k);
                    }
                }

                // set attribute
                for(let k in attributes) {
                    console.log(dom);
                    dom.attr(k, attributes[k]);
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
            Htme.update.trigger();

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