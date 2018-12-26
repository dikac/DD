namespace Htme.Component.Structure.Type {

    import Attributes = Htme.Component.Element.Attributes.Attributes;

    export abstract class Type {

        constructor(
            private type  : string

        ) {

        }

        valid(attributes : Attributes) {

            return attributes.get('data-htme-type').toString() === this.type;
        }

        set(attributes : Attributes) {

            attributes.get('data-htme-type').set(this.type);
            attributes.get('class').add('HtmeStructure');
        }
    }

}


