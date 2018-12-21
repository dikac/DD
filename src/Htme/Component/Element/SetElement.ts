namespace Htme.Component.Element {

    import MapImplement = Htme.Component.Datastructure.MapImplement;
    import Attributes = Htme.Component.Element.Attributes.Attributes;
    import SetImplement = Htme.Component.Datastructure.SetImplement;
    import Element = Htme.Component.Element.Element;

    export class SetElement extends SetImplement<Element> implements Element {

        private dom : Dom;
        private $content : string;

        constructor(element : JQuery|string|null = null) {

            super();

            this.dom = new Dom(element);
            this.$content = this.dom.element.html();
        }

        add(value: Element) : this
        {
            super.add(value);
            this.attach();
            return this;
        }

        clear(): void
        {
            super.clear();
            this.element.empty();
        }

        delete(value: Element): boolean
        {
            if(super.delete(value)) {

                this.attach();
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

        attach() {

            for(let value of this) {

                this.element.append(value.element);
            }
        }

        detach() {

            this.element.html();
        }
    }
}