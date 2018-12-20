namespace Htme.Component.Structure {

    import Compound = Htme.Component.Element.Compound;

    export class Base extends Compound {

        private $panel : Panel = new Panel('<div></div>', '%name%');

        constructor(
            element : JQuery|string
        ) {

            super(element);

            // call manually
            this.attachPanel();
        }

        get panel() : Panel {
            return this.$panel;
        }

        attachPanel() {

            // value is not available on object construction
            if(this.$panel) {

                this.element.prepend(this.$panel.element);
            }
        }

        detachPanel() {

            this.$panel.detach();
        }


        set (content : string|JQuery) {

            super.set(content);
            this.attachPanel();
        }

        attach()
        {
            super.attach();
            this.attachPanel();
        }

        detach()
        {
            this.detachPanel();
            super.detach();
        }

    }

}