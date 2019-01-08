///<reference path="Map_.ts"/>
///<reference path="MapString.ts"/>
namespace Htme.Component.Map_ {

    /**
     *
     */
    export class AttributeValue extends Map_<string, string, MapString> {

        constructor(
            private attributes : Attributes,
            private name : string,
            associative : string,
            value : string

        ) {
            super(new MapString('', associative, value));
        }

         protected  map () : MapString {

            this.update();
            return super.map();
        }

        toString() : string {

            return this.map().toString();
        }

        protected commit() : this {

            this.attributes.set(this.name, super.map().toString());

            return this;
        }

        protected update() : this {

            let src = this.attributes.get(this.name);

            if(!src) {

                src = '';
            }

            super.map().replace(src);

            return this;
        }

        delete(key: string): boolean {

            let $return  = this.map().delete(key);
            this.commit();
            return $return;
        }

        set(key: string, value: string): this {

            super.set(key, value);
          //  console.log(super.map()[Symbol.iterator]());
            this.commit();

            return this;
        }

        clear(): void {

            this.attributes.set(this.name, '');
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

    }

}