namespace Htme.Component.Element {

    import Attributes = Htme.Component.Element.Attributes.Attributes;

    export class String implements Element {

        private dom : Dom;

        constructor(element : JQuery|string|null = null, content : string|null = null) {

            this.dom = new Dom(element);

            if(content !== null) {

                this.content = content;
            }
         }

        get content() : string {

            return this.dom.element.html();
        }

        set content(content : string) {

            this.element.html(content);//.attach();
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
    }
}