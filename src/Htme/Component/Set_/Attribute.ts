///<reference path="Set_.ts"/>
///<reference path="SetString.ts"/>
namespace Htme.Component.Set_ {

    import StringableI = Stringable.Stringable;
    import Attributes = Htme.Component.Element.Attributes.Attributes;

    /**
     *
     */
    export class Attribute extends SetString {

        constructor(
            private attributes : Attributes,
            private name : string
        ) {

            super(attributes.get(name), ' ');
        }

        clear(keep: boolean = false): void {

            super.clear();

            if (keep) {

                this.attributes.set(this.name, '');

            } else {

                this.attributes.delete(this.name);
            }
        }

        add(value: string): this {

            super.add(value);

            if(this.attributes) {

                this.attributes.set(this.name, this.toString());
            }

            return this;

        }


        delete(value: string, keep: boolean = false): boolean {

            let deleted =  super.delete(value);

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
    }

}