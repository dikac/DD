namespace Htme.Component.Map_ {

    import Attributes = Htme.Component.Map_.Attributes;
    import Map_ = Htme.Component.Map_.Map_;

    export const DataType = {
        container : 'container',
        content : 'content',
    };

    class Strict {

        constructor(
            private container: Data,
            private name : string
        ) {

        }

        set(type : string) {

            this.container.set(this.name, type);
        }

        get() : string | undefined {

            return this.container.get(this.name);
            // switch (type) {
            //     case undefined :
            //     case 'container' :
            //     case 'content' :
            //         return type;
            //     default :
            //         throw new Error('value for type is not DataType');
            // }
        }

        is(type : string) {

            return this.get() === type;
        }

    }

    export class Data extends Map_<string, any, Map<string, any>> implements Stringable.Stringable {

        constructor(
            private attributes : Attributes
        ) {

            super(new Map<string, any>());
            //console.log(this.attributes);
           // this.update();
        }

        toString(): string {

            return this.toJson(this);
        }

        protected map () : Map<string, any> {

            this.update();
            return super.map();
        }

        protected toJson(map : Map<string, any>) {

            let object = {};

            for(let [k, v] of map) {

                object[k] = v;
            }

            return JSON.stringify(object);
        }

        protected commit() : this {

            this.attributes.set('data-htme', this.toJson(super.map()));

            return this;
        }

        protected update() : this {

            let data = this.attributes.get('data-htme');
          //  console.log(super.map());

            super.map().clear();

            if(data) {

                try {

                    let parsed = JSON.parse(data);

                    for(let k in parsed) {

                        super.map().set(k, parsed[k]);
                    }

                } catch (e) {

                    console.log(data);
                    throw e;
                }

            }

            // let src = this.attributes.get(this.name);
            //
            // if(!src) {
            //
            //     src = '';
            // }
            //
            // super.map().replace(src);

            return this;
        }



        type() {

            return new Strict(this, 'type');
        }

        handle() {

            return new Strict(this, 'handle');
        }

        delete(key: string): boolean {

            let $return = super.delete(key);
            this.commit();
            return $return;
        }


        set(key: string, value: any): this {

            super.set(key, value);
            this.commit();
            return this;
        }
    }
}