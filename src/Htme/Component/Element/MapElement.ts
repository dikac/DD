///<reference path="../Map_/Map_.ts"/>
namespace Htme.Component.Element {

    import Map_ = Htme.Component.Map_.Map_;

    export class MapElement<Value extends Element>
        extends Map_<string, Value, Map<string, Value>>
        implements Element
    {

        private dom : Dom;

        constructor(
            element : JQuery|string|null = null,
            factory : ((JQuery) => Value|null)| null = null
        ) {

            super(new Map<string, Value>());

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