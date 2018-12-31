///<reference path="Map_.ts"/>
namespace Htme.Component.Map_ {

    import StringableI = Stringable.Stringable;
    import Attributes = Htme.Component.Element.Attributes.Attributes;

    /**
     *
     */
    export class Style extends MapString {

        constructor(
            private attributes : Attributes,
            private name : string
        ) {

            super(attributes.get(name), ':', ';');
        }

        clear(keep: boolean = false): void {

            super.clear();

            if (keep) {

                this.attributes.set(this.name, '');

            } else {

                this.attributes.delete(this.name);
            }
        }

        delete(key: string, keep: boolean = false): boolean {

            let deleted =  super.delete(key);

            if(deleted) {

                let attribute = this.toString();

                if(attribute.length) {

                    this.attributes.set(this.name, attribute);

                } else {

                    this.clear(keep);
                }
            }

            return deleted;
        }

        set(key: string, value: string): this {

            super.set(key, value);

            if(this.attributes) {

                this.attributes.set(this.name, this.toString());
            }

            return this;
        }
    }

}