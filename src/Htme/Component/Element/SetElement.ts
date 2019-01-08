///<reference path="../Set_/Set_.ts"/>
namespace Htme.Component.Element {

    import Attributes = Htme.Component.Map_.Attributes;
    import Set_ = Htme.Component.Set_.Set_;
    import Element = Htme.Component.Element.Element;

    export class SetElement<Value extends Element = Element>
        extends Set_<Value, Set<Value>>
        implements Element {

        private dom : Dom;
        private $content : string;

        constructor(
            element : JQuery|string|null = null,
            factory : ((JQuery) => Value| null)|null = null
        ) {

            super(new Set<Value>());

            this.dom = new Dom(element);
            this.$content = this.dom.element.html();

            let buffer : Value[]= [];

            if(factory) {

                this.dom.element.children().each(function (k, v) {

                    let result = factory($(v));

                    if(result) {

                        buffer.push(result);
                    }

                });
            }


            for(let v of buffer) {

                this.add(v);
            }

        }

        add(value: Value) : this
        {
            super.add(value);
            this.element.append(value.element);
            return this;
        }

        clear(): void
        {
            super.clear();
            this.element.empty();
        }

        delete(value: Value): boolean
        {
            if(super.delete(value)) {

                value.element.remove();
                return true;
            }

            return false;
        }


        toString(): string {

            return this.dom.toString();
        }

        get element(): JQuery {

            return this.dom.element;
        }

        get attributes(): Attributes {

            return this.dom.attributes;
        }

        // attach() {
        //
        //     for(let value of this) {
        //
        //         this.element.append(value.element);
        //     }
        // }
        //
        // detach() {
        //
        //     this.element.html();
        // }
    }
}