namespace Htme.Component.Map_ {

    import Attributes = Htme.Component.Map_.Attributes;

    export type DataType = 'container' | 'content';

    export class Data extends Map_<string, string> implements Stringable {

        constructor(
            private attributes : Attributes
        ) {

            super();

            let data = this.attributes.get('data-htme');

            if(data) {

                for(let [k, v] of JSON.parse(data)) {

                    super.set(k, v);
                }
            }
        }

        setType(type : DataType) {

            this.set('type', type);
        }

        getType() : DataType | undefined {

            let type =  this.get('type');
           switch (type) {
               case undefined :
               case 'container' :
               case 'content' :
                   return type;
               default :
                   throw new Error('value for type is not DataType');
           }
        }

        isType(type : DataType) {

            return this.getType() === type;
        }



        set(key: string, value: string): this {

          // JSON.stringify([]);
            return super.set(key, value);
        }
    }
}