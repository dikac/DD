///<reference path="Set_.ts"/>
///<reference path="SetString.ts"/>
namespace Htme.Component.Set_ {

    import StringableI = Stringable.Stringable;
    import Attributes = Htme.Component.Map_.Attributes;
    import Stringable = Htme.Component.Stringable.Stringable;

    /**
     *
     */
    export class AttributeValue extends Set_<string, SetString> {

        constructor(
            private attributes : Attributes,
            private name : string,
            delimiter : string = ' '
        ) {

            super(new SetString('', delimiter));
        }


        protected set() : SetString {

            this.update();
            return super.set();
        }

        replace(data: string) {

            this.attributes.set(this.name, data);
        }

        toString(): string {

            return this.set().toString();
        }

        protected commit() : this {

            this.attributes.set(this.name, super.set().toString());
            return this;
        }

        clear(): void {

            this.attributes.set(this.name, '');
        }

        remove() {

            this.attributes.delete(this.name);
        }

        clean() {

            if(!this.size) {

                this.remove();
            }
        }

        add(value: string): this
        {
            this.set().add(value);
            this.commit();
            return this;
        }

        delete(value: string): boolean
        {
            let $return = this.set().delete(value);
            this.commit();
            return $return;
        }


        protected update() : this
        {
            let source = this.attributes.get(this.name);

            if(!source) {

                source = '';
            }

            super.set().replace(source);

            return this;
        }


    }

}