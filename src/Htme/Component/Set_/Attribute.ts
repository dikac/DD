///<reference path="Set_.ts"/>
///<reference path="SetString.ts"/>
namespace Htme.Component.Set_ {

    import StringableI = Stringable.Stringable;
    import Attributes = Htme.Component.Element.Attributes.Attributes;
    import Stringable = Htme.Component.Stringable.Stringable;

    /**
     *
     */
    export class Attribute extends SetString {

        constructor(
            private attributes : Attributes,
            private name : string,
            delimiter : string = ' '
        ) {

            super('', delimiter);
            this.fetch();
        }
        //
        // get attribute () : string|undefined {
        //
        //     return this.attributes.get(this.name);
        // }



        replace(data: string) {

            super.replace(data);

            if(this.attributes) {

                this.attributes.set(this.name, data);
            }
        }

        // toString(): string {
        //
        //     let attribute =  this.attribute;
        //
        //     if(!attribute) {
        //
        //         attribute = '';
        //     }
        //
        //     return attribute;
        // }


        clear(): void {

            super.clear();
            // attribute does not set on super construction
            if(this.attributes) {

                this.attributes.set(this.name, '');
            }
        }

        remove() {

            this.attributes.delete(this.name);
        }

        clean() {

            let attribute = this.attributes.get(this.name);

            if(!attribute) {

                this.remove();
            }
        }

        add(value: string): this
        {
            super.add(value);
            this.commit();
            return this;
        }

        delete(value: string): boolean
        {
            let $return = super.delete(value);
            this.commit();
            return $return;
        }

        commit() : this {

            this.attributes.set(this.name, this.toString());
            return this;
        }

        fetch() : this
        {
            let source = this.attributes.get(this.name);

            if(!source) {

                source = '';
            }

            super.replace(source);

            return this;
        }

    }

}