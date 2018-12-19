namespace Htme.Component.Element {

    export class String extends AbstractBlock {

        private $content : string | null;

        constructor(element : JQuery|string) {

            super(element);
            this.content = this.element.html();
        }
        // private $parent : JQuery|null;

        // constructor(
        //     private $content : string,
        //     parent : JQuery|null = null
        // ) {
        //
        //     this.parent(parent);
        // }

        // parent(jquery : JQuery|null) {
        //
        //     this.detach();
        //     this.$parent = jquery;
        //     this.attach();
        // }

        attach() {

            if(this.$content) {

                this.element.html(this.content);

            } else {

                this.element.empty();
            }
        }

        detach() {

            this.element.empty();
        }

        get content() : string|null {

            return this.$content;
        }

        set content(content : string|null) {

            this.$content = content;
            this.attach();
        }
    }
}