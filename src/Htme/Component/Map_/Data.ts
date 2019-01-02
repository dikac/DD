namespace Htme.Component.Map_ {

    import MapImplement = Htme.Component.Datastructure.MapImplement;
    import Attributes = Htme.Component.Element.Attributes.Attributes;

    export class Data extends MapImplement<string, string> {

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


        set(key: string, value: string): this {

          // JSON.stringify([]);
            return super.set(key, value);
        }
    }
}