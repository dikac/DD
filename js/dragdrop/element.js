



function DDAttributeEditor (attribute = '', value = '') {

    return `
        <div class="input-group col-md-12" style="margin-bottom: 5px; margin-top: 5px">
            <div class="col-md-2"><input value="${attribute}" class="form-control" type="text"></div>
            <div class="col-md-8"><input value="${value}" class=" form-control" type="text"></div>
            <div class="col-md-2"><button class="btn btn-danger DDAttributeRemove">Remove</button></div>
        </div>`;
}




(function () {

    let panel = new DDPanel(DD.menu);

    panel.menu('edit').submenus['element'] = function () {

        let click = new DDClick('DDElement',function(e) {


            let container = DDContainer.fromInner($(e.target));

            console.log(container);

            let attribute = container.attr('DDAttributeData');
            console.log(attribute);

            if(attribute === undefined) {

                attribute = {};

            } else {

                attribute = JSON.parse(attribute);

            }


            let modal = new DDModal('DDAttributeModal');


            modal.content = function () {

                let items  = new DDItems();

                for(let k in attribute) {

                    items.items[k] = DDAttributeEditor(k, attribute[k]);
                }

                return items;
            }();

            modal.header = `
                <div class="col-md-2">Attribute</div>
                <div class="col-md-8">Value</div>
                <div class="col-md-2"><button class="btn btn-default DDAttributeAdd">Add</button></div>
            `;


            modal.footer = function() {

                let items = new DDItems();

                items.items['cancel'] = function () {

                    let click = new DDClick('DDAttributeCancel', function (e) {

                        console.log('save');
                    });

                    click.element().content = 'Cancel';
                    click.element().attribute().list('class').push('btn btn-default');
                    click.element().attribute().list('data-dismiss').push('modal');

                    return click.element();
                }();


                items.items['save'] = function () {

                    let click = new DDClick('DDAttributeSave', function (e) {

                        let buffer = [];

                        $(e.target).parents('.modal-content').

                        children('.modal-body').find('input').each(function (k, v) {
                            buffer.push(v);
                        });


                        let attr = {};

                        for(let i =0; i < buffer.length; i++) {


                            attr[$(buffer[i]).val()] = $(buffer[i++]).val();
                        }

                        console.log(attr);
                    });


                    click.element().content = 'Save';
                    click.element().attribute().list('class').push('btn btn-default');
                   // click.element().attribute().list('data-dismiss').push('modal');

                    return click.element();
                }();

                return items;

            }();




            modal.show();

        });

        click.element().content = 'element';

        return click.element();
    }();



    new DDClick('DDAttributeAdd', function (e) {

        console.log($(e.target).parents('.modal-content'));
        console.log($(e.target).parents('.modal-content').children('.DDAttributeContent'));

        $(e.target).parents('.modal-content').children('.modal-body').append(DDAttributeEditor());

        DD.update.trigger();
    });


    new DDClick('DDAttributeRemove', function (e) {

        $(e.target).parents('.input-group').remove();
    });

})();