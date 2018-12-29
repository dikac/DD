namespace Htme.Component.Structure.Handle {

    import Attributes = Htme.Component.Element.Attributes.Attributes;

    export abstract class Handle {

        constructor(
            private handle  : string
        ) {

        }

        valid(attributes : Attributes) {

            return attributes.get('data-htme-handle').toString() === this.handle;
        }

        set(attributes : Attributes) {

            attributes.set('data-htme-handle', this.handle);
        }
    }

}


