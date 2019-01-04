namespace Htme.Component.Structure.Handle {

    import Attributes = Htme.Component.Map_.Attributes;

    export abstract class Handle {

        constructor(
            private handle  : string
        ) {

        }

        valid(attributes : Attributes) {

            let handle = attributes.get('data-htme-handle');

            if(handle) {

                return handle === this.handle;
            }

            return false;
        }

        set(attributes : Attributes) {

            attributes.set('data-htme-handle', this.handle);
        }
    }

}


