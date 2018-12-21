namespace Htme.Component.Element {

    import Attributes = Htme.Component.Element.Attributes.Attributes;

    export class String implements Element {

        private dom : Dom;
        private $content : string;

        constructor(element : JQuery|string|null = null) {

            this.dom = new Dom(element);
            this.$content = this.dom.element.html();
        }


        attach() {

            if(this.$content) {

                this.dom.element.html(this.content);

            } else {

                this.dom.element.empty();
            }
        }

        detach() {

            this.dom.element.empty();
        }

        get content() : string {

            return this.$content;
        }

        set content(content : string) {

            this.$content = content;
            this.attach();
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