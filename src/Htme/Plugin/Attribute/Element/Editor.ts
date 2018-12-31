namespace Htme.Plugin.Attribute.Element {

    import Structure = Htme.Component.Structure.Structure;
    import Modal = Htme.Component.Element.Modal;
    import Attributes = Htme.Component.Element.Attributes.Attributes;
    import Block = Htme.Component.Element.Block;
    import MapElement = Htme.Component.Element.MapElement;
    import Panel = Htme.Component.Element.Panel;
    import SetElement = Htme.Component.Element.SetElement;

    export class Editor {

        private modal : Modal = new Modal();
        private inputs = new SetElement<Inputs>();

        constructor(private structure : Structure) {


            this.modal.handlerIn = function(event) {

                let set = new Htme.Component.Set_.Attribute(structure.attributes, 'class');
                set.add('HtmeActive');

                // structure.attributes.edit('class', function(attribute : string) : string {
                //
                //     let set = new Htme.Component.Set_.Attribute(attribute);
                //     set.add('HtmeActive');
                //     return set.toString();
                // });
            };

            this.modal.handlerOut = function(event) {


                let set = new Htme.Component.Set_.Attribute(structure.attributes, 'class');
                set.delete('HtmeActive');

                // structure.attributes.edit('class', function(attribute : string) : string {
                //
                //     let set = new Htme.Component.Set_.Attribute(attribute);
                //     set.delete('HtmeActive');
                //     return set.toString();
                // });

            };

            let map = new Htme.Component.Map_.Style(this.modal.attributes, 'style');
            map.set('position', 'absolute');
          //  return map.toString();

            // this.modal.attributes.edit('style', function(attribute : string) : string {
            //
            //     let map = new Htme.Component.Map_.Style(attribute);
            //     map.set('position', 'absolute');
            //     return map.toString();
            // });


           // let panel = new Panel();
            this.modal.set('panel', new Htme.Component.Element.String(
                '<div class="HtmeAttributeHeading">Attribute</div>'
            ));

            let close =  new Htme.Component.Element.String(
                '<div class="HtmeAttributeWrapper">Close</div>'
            );
            this.modal.set('close',close);

            let $this = this;
            close.element.click(function () {

                $this.modal.hide();
            });

            //let title = new SetElement();
            //title.attributes.set('class', 'HtmeAttributeWrapper');


           // this.modal.set('name', title);

            this.inputs.attributes.set('class', 'HtmeAttributeWrapper');
            this.modal.set('inputs', this.inputs);
        }

        protected attributeToInput() {

            let $this = this;

            this.inputs.clear();
            this.inputs.element.append((new Htme.Component.Element.String(null,'Name')).element);
            this.inputs.element.append((new Htme.Component.Element.String(null,'Value')).element);

            let add = new Htme.Component.Element.String(null,'Add');
            add.element.click(function () {

                $this.inputs.add(new Inputs('', '', function () {

                    $this.inputToAttribute();

                },  $this.inputs));
            });

            this.inputs.element.append(add.element);


            for(let [attr, val] of this.structure.attributes) {

                this.inputs.add(new Inputs(attr, val, function () {

                    $this.inputToAttribute();

                },  this.inputs));
            }
        }

        protected inputToAttribute() {

            let buffer = {};

            for(let [attr, val] of this.structure.attributes) {

                buffer[attr.toLowerCase()] = val;
            }

            for(let value of this.inputs) {

                let [attr, val] = value.get();

                if(attr.length) {

                    this.structure.attributes.set(attr, val);
                    delete buffer[attr.toLowerCase()];
                }

            }

            for(let attr in buffer) {

                this.structure.attributes.delete(attr);
            }

        }

        hide() {

        }

        // protected add(name : string, attribute : string) {
        //
        //     let value = new Block(`<input type="text" name="${key}" value="${value}" />`);
        //
        //     value.element.keyup(function (event) {
        //
        //         let attribute = $(this).attr('name');
        //         let value = $(this).val();
        //
        //         $this.structure.attributes.set(attribute, value.toString() );
        //     });
        //
        //
        //     let inputName = new Block(`<input type="text" value="${value}" />`);
        //     value.element.keyup(function (event) {
        //
        //         let value = $(this).val();
        //
        //         $this.structure.attributes.set(attribute, value.toString() );
        //     });
        // }

        show(top : number, left : number) {

           // this.modal.clear();

            // let $this = this;
            // let map = new MapElement();

            //console.log(typeof map);
            //console.log(map instanceof Map);
            //map.attributes.get('class').add('HtmeAttributeWrapper');
            // map.attributes.edit('class', function(attribute : string) : string {
            //
            //     let set = new Htme.Component.Set_.Attribute(attribute);
            //     set.add('HtmeAttributeWrapper');
            //     return set.toString();
            // });

           // for (let [key, value] of this.structure.attributes) {


                // let inputValue = new Block(`<input type="text" name="${key}" value="${value}" />`);
                // inputValue.element.keyup(function (event) {
                //
                //     let attribute = $(this).attr('name');
                //     let value = $(this).val();
                //
                //     $this.structure.attributes.set(attribute, value.toString() );
                // });
                //
                //
                // let inputName = new Block(`<input type="text" value="${value}" />`);
                // inputValue.element.keyup(function (event) {
                //
                //     let value = $(this).val();
                //
                //     $this.structure.attributes.set(attribute, value.toString() );
                // });

                           //     map.set(key, new Block(`<div>${key}</div>`));


               // map.set(key + ':input', input);






               // map.set(key + ':remove', new Block(`<div>Remove</div>`));
          //  }



            this.modal.show();
            this.attributeToInput();
            //this.modal.attributes.get('style').add(`top:${top}px;left:${left}px;z-index:11;z-index:11`);


            let map = new Htme.Component.Map_.Style(this.modal.attributes, 'style');
            map.set('top', top + 'px');
            map.set('left', left + 'px');


            // this.modal.attributes.edit('style', function(attribute : string) : string {
            //
            //     let map = new Htme.Component.Map_.Style(attribute);
            //     map.set('top', top + 'px');
            //     map.set('left', left + 'px');
            //   //  map.set('left', left + 'px');
            //     return map.toString();
            // });
        }

    }
}