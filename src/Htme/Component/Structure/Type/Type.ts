namespace Htme.Component.Structure.Type {

    import Attributes = Htme.Component.Element.Attributes.Attributes;
    import SetAttribute = Htme.Component.Set_.Attribute;

    export abstract class Type {

        constructor(
            private type  : string

        ) {

        }

        valid(attributes : Attributes) {

            return attributes.get('data-htme-type').toString() === this.type;
        }

        set(attributes : Attributes) {

            attributes.set('data-htme-type', this.type);

            let set = new SetAttribute(attributes, 'class');
            set.add('HtmeStructure');
            //return set.toString();


            // attributes.edit('class', function (attribute : string) : string {
            //
            //     let set = new SetAttribute(attribute);
            //     set.add('HtmeStructure');
            //     return set.toString();
            //
            // });
        }
    }

}


