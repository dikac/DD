namespace Htme.Component.Element {

    import Attributes = Htme.Component.Element.Attributes.Attributes;

    export class Block implements Element {

        private $content : Element|null = null;
        private dom : Dom;

        constructor(
            element : JQuery|string
        ) {

            this.dom = new Dom(element);

            let content = this.element.html();

            if(content.length > 0) {

                //this.content = new Block(content);
            }
        }

        get content() : Element|null {

            return this.$content;
        }

        set content(content : Element|null) {

            this.$content = content;
            this.element.empty();

            if(content) {

                this.element.append(content.element);

            } else {

                this.element.empty();
            }
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