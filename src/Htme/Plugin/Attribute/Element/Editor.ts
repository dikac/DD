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

                structure.attributes.get('class').add('HtmeActive');
            };

            this.modal.handlerOut = function(event) {

                structure.attributes.get('class').delete('HtmeActive');
            };

            this.modal.attributes.get('style').add('position:absolute;');
        }


        show(top : number, left : number) {

            this.modal.clear();

            let map = new MapElement();

            console.log(typeof map);
            console.log(map instanceof Map);
            map.attributes.get('class').add('HtmeAttributeWrapper');


            for (let [key, value] of this.structure.attributes) {

                map.set(key, new Block(`<input type="text" value="${value}" />`));
            }

            this.modal.set('inputs', map);

            this.modal.show();
            this.modal.attributes.get('style').add(`top:${top}px;left:${left}px;z-index:11;z-index:11`);

        }

    }
}