namespace Htme.Plugin.Attribute.Element {

    import Structure = Htme.Component.Structure.Structure;
    import Modal = Htme.Component.Element.Modal;
    import Attributes = Htme.Component.Element.Attributes.Attributes;
    import Block = Htme.Component.Element.Block;
    import MapElement = Htme.Component.Element.MapElement;

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

        }


        show(top : number, left : number) {

            this.modal.clear();

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

                map.set(key, new Block(`<div>key</div>`));
                map.set(key + ':input', new Block(`<input type="text" name="${key}" value="${value}" />`));
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