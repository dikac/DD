namespace Htme.Component.Element {

    export class Block extends AbstractBlock {

        private $content : Element|null = null;

        constructor(
            element : JQuery|string
        ) {

            super(element);

            let content = this.element.html();

            if(content.length > 0) {

                this.content = new Block(content);
            }
        }

        get content() : Element|null {

            return this.$content;
        }

        set content(content : Element|null) {

            this.$content = content;
            this.attach();
        }

        attach() {

            this.detach();

            if(this.$content) {

                this.element.append(this.content.element);

            }
        }

        detach() {

            this.element.empty();
        }
    }
}