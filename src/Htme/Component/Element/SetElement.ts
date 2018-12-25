namespace Htme.Component.Element {

    import MapImplement = Htme.Component.Datastructure.MapImplement;
    import Attributes = Htme.Component.Element.Attributes.Attributes;
    import SetImplement = Htme.Component.Datastructure.SetImplement;
    import Element = Htme.Component.Element.Element;

    export class SetElement<Value extends Element = Element> extends SetImplement<Value> implements Element {

        private dom : Dom;
        private $content : string;

        constructor(
            element : JQuery|string|null = null,
                    factory : (JQuery) => Value| null = null
        ) {

            super();

            this.dom = new Dom(element);
            this.$content = this.dom.element.html();

            let buffer = [];

            this.dom.element.children().each(function (k, v) {

                buffer.push(factory($(v)));

            });

            //console.log(buffer);

            for(
                let                     v
                of buffer) {

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