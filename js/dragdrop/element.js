



function DDAttributeEditor (attrribute, value) {

    return `
        <div class="input-group col-md-12">
            <div class="col-md-2"><input value="${attrribute}" class="form-control" type="text"></div>
            <div class="col-md-8"><input value="${value}" class=" form-control" type="text"></div>
            <div class="col-md-2"><button class="btn btn-danger">Remove</button></div>
        </div>`;
}


(function () {

    let panel = new DDPanel(DD.menu);

    panel.menu('edit').submenus['element'] = function () {

        let click = new DDClick('DDElement',function(e) {


            let container = DDContainer.fromInner($(e.target));

            let attribute = container.attr('DDAttributeData');
            console.log(attribute);

            if(attribute === undefined) {

                attribute = {};

            } else {

                attribute = JSON.parse(attribute);

            }


            let modal = new DDModal('DDAttributeModal');
            let element = new DDElement();
            modal.content = element;
            modal.content.attribute().list('class').push('DDAttributeContent');


            let items  = new DDItems();
            element.content = items;

            modal.header = `
                <div class="col-md-2">Attribute</div>
                <div class="col-md-8">Value</div>
                <div class="col-md-2"><button class="btn btn-default DDAttributeAdd">Add</button></div>
            `;

            for(let k in attribute) {

                items.items[k] = DDAttributeEditor(k, attribute[k]);
            }

            modal.show();


        });

        click.element().content = 'element';

        return click.element();
    }();



    let click = new DDClick('DDAttributeContent', function () {

    });




})();