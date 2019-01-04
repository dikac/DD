namespace Htme.Component.Element {

    import MapImplement = Htme.Component.Datastructure.MapImplement;
   // import Attributes = Htme.Component.Map_.Attributes;

    export class MapElement<Value extends Element>
        extends MapImplement<string, Value>
        implements Element
    {

        private dom : Dom;

        constructor(
            element : JQuery|string|null = null,
            factory : ((JQuery) => Value|null)| null = null
        ) {

            super();

            this.dom = new Dom(element);

            let buffer : Value[] = [];

            this.dom.element.children().each(function (k, v) {

                if(factory) {

                    let result = factory($(v));

                    if(result) {

                        buffer.push(result);
                    }
                }

            });

            for(let k in buffer) {

                this.set(k.toString(), buffer[k]);
            }
        }

        clear() {

            super.clear();
            this.element.empty();
        }

        // attach() {
        //
        //     this.detach();
        //     for(let [key, value] of this) {
        //
        //         this.element.append(value.element);
        //     }
        // }

        // detach() {
        //
        //     for(let [key, value] of this) {
        //
        //         value.detach();
        //     }
        //
        //     this.element.empty();
        // }

        // protected ensureKey(key : string|null) : string {
        //
        //     if(key === null) {
        //
        //         for(let i = 0; this.children.hasOwnProperty(key = '_' + i); i++);
        //     }
        //
        //     this.remove(key);
        //
        //     return key;
        // }

        // hide(key : string) {
        //
        //     let value = this.get(key);
        //
        //     if(value) {
        //
        //         value.element.detach();
        //     }
        // }

        delete(key : string) : boolean {

            if(this.has(key)) {

                let val = super.get(key);

                if(val) {

                    val.element.remove();
                    super.delete(key);
                }

                return true;
            }

            return false;
        }


        set(key : string, element: Value) : this {

            this.delete(key);
            super.set(key, element);
            this.element.append(element.element);
            // this.detach();
            // this.attach();
            return this;
        }


        toString(): string {

            return this.dom.toString();
        }

        get element(): JQuery {

            return this.dom.element;
        }

        get attributes(): Htme.Component.Map_.Attributes {

            return this.dom.attributes;
        }
    }
}