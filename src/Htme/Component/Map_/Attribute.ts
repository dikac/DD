///<reference path="Map_.ts"/>
///<reference path="MapString.ts"/>
namespace Htme.Component.Map_ {

    import StringableI = Stringable.Stringable;
    import Attributes = Htme.Component.Element.Attributes.Attributes;

    /**
     *
     */
    export class Attribute extends MapString {

        constructor(
            private attributes : Attributes,
            private name : string,
            associative : string,
            value : string

        ) {

            super(attributes.get(name), associative, value);
        }

        commit() : this {

            if(this.attributes) {

                this.attributes.set(this.name, this.toString());
            }

            return this;
        }

        fetch() : this {

            this.replace(this.attributes.get(this.name));
            return this;
        }

        delete(key: string): boolean {

            let $return  = super.delete(key);
            this.commit();
            return $return;
        }

        set(key: string, value: string): this {

            super.set(key, value);

            this.commit();

            return this;
        }

        clear(): void {

            super.clear();
            // attribute does not set on super construction
            if(this.attributes) {

                this.attributes.set(this.name, '');
            }
        }

        remove() {

            super.clear();
            this.attributes.delete(this.name);
        }

        clean() {

            let attribute = this.attributes.get(this.name);

            if(!attribute) {

                this.remove();
            }
        }
    }

}