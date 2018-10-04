



function HtmeAttributeComponentEditor (attribute = '', value = '') {

    return `
        <div class="input-group col-md-12" style="margin-bottom: 5px; margin-top: 5px">
            <div class="col-md-2"><input value="${attribute}" class="form-control" type="text"></div>
            <div class="col-md-8"><input value="${value}" class=" form-control" type="text"></div>
            <div class="col-md-2"><button class="btn btn-danger HtmeAttributeRemove">Remove</button></div>
        </div>`;
}




(function () {

    let panel = new HtmeComponentPanel(Htme.menu);

    panel.menu('edit').submenus['element'] = function () {

        let click = new HtmeComponentClick('HtmeComponentElement',function(e) {


            let container = HtmeComponentBlock.fromInner($(e.target));

            //console.log(container);

            let attribute = container.attr('HtmeAttributeData');
            //console.log(attribute);

            if(attribute === undefined) {

                attribute = {};

            } else {

                attribute = JSON.parse(attribute);

            }


            let modal = new HtmeComponentModal('HtmeAttributeModal');


            modal.content = function () {

                let items  = new HtmeComponentItems();

                for(let k in attribute) {

                    items.items[k] = HtmeAttributeComponentEditor(k, attribute[k]);
                }

                return items;
            }();

            modal.header = `
                <div class="col-md-2">Attribute</div>
                <div class="col-md-8">Value</div>
                <div class="col-md-2"><button class="btn btn-default HtmeAttributeAdd">Add</button></div>
            `;


            modal.footer = function() {

                let items = new HtmeComponentItems();

                items.items['cancel'] = function () {

                    let click = new HtmeComponentClick('HtmeAttributeCancel', function (e) {

                        console.log('save');
                    });

                    click.element().content = 'Cancel';
                    click.element().attribute().list('class').push('btn btn-default');
                    click.element().attribute().list('data-dismiss').push('modal');

                    return click.element();
                }();


                items.items['save'] = function () {

                    let click = new HtmeComponentClick('HtmeAttributeSave', function (e) {

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



    new HtmeComponentClick('HtmeAttributeAdd', function (e) {

        //console.log($(e.target).parents('.modal-content'));
       // console.log($(e.target).parents('.modal-content').children('.HtmeAttributeContent'));

        $(e.target).parents('.modal-content').children('.modal-body').append(HtmeAttributeComponentEditor());

        Htme.update.trigger();
    });


    new HtmeComponentClick('HtmeAttributeRemove', function (e) {

        $(e.target).parents('.input-group').remove();
    });

})();