namespace Htme.Plugin.Attribute.Element {

    import Structure = Htme.Component.Structure.Structure;
    import Modal = Htme.Component.Element.Modal;
    import Attributes = Htme.Component.Element.Attributes.Attributes;
    import Block = Htme.Component.Element.Block;
    import MapElement = Htme.Component.Element.MapElement;
    import Panel = Htme.Component.Element.Panel;

    export class Editor {

        private modal : Modal = new Modal();

        constructor(private structure : Structure) {

            this.modal.handlerIn = function(event) {

                structure.attributes.edit('class', function(attribute : string) : string {

                    let set = new Htme.Component.Set_.Attribute(attribute);
                    set.add('HtmeActive');
                    return set.toString();
                });
            };

            this.modal.handlerOut = function(event) {

                structure.attributes.edit('class', function(attribute : string) : string {

                    let set = new Htme.Component.Set_.Attribute(attribute);
                    set.delete('HtmeActive');
                    return set.toString();
                });

            };

            this.modal.attributes.edit('style', function(attribute : string) : string {

                let map = new Htme.Component.Map_.Style(attribute);
                map.set('position', 'absolute');
                return map.toString();
            });



           // let panel = new Panel();
            this.modal.set('panel', new Htme.Component.Element.String('<div>Attribute</div>'));

        }

        protected newLinkedElement() {


        }

        show(top : number, left : number) {

           // this.modal.clear();

            let $this = this;
            let map = new MapElement();

            //console.log(typeof map);
            //console.log(map instanceof Map);
            //map.attributes.get('class').add('HtmeAttributeWrapper');
            map.attributes.edit('class', function(attribute : string) : string {

                let set = new Htme.Component.Set_.Attribute(attribute);
                set.add('HtmeAttributeWrapper');
                return set.toString();
            });

            for (let [key, value] of this.structure.attributes) {


                let inputValue = new Block(`<input type="text" name="${key}" value="${value}" />`);
                inputValue.element.keyup(function (event) {

                    let attribute = $(this).attr('name');
                    let value = $(this).val();

                    $this.structure.attributes.set(attribute, value.toString() );
                });


                let inputName = new Block(`<input type="text" value="${value}" />`);
                inputValue.element.keyup(function (event) {

                    let value = $(this).val();

                    $this.structure.attributes.set(attribute, value.toString() );
                });

                                map.set(key, new Block(`<div>${key}</div>`));


                map.set(key + ':input', input);






                map.set(key + ':remove', new Block(`<div>Remove</div>`));
            }

            this.modal.set('inputs', map);

            this.modal.show();
            //this.modal.attributes.get('style').add(`top:${top}px;left:${left}px;z-index:11;z-index:11`);

            this.modal.attributes.edit('style', function(attribute : string) : string {

                let map = new Htme.Component.Map_.Style(attribute);
                map.set('top', top + 'px');
                map.set('left', left + 'px');
              //  map.set('left', left + 'px');
                return map.toString();
            });
        }

    }
}