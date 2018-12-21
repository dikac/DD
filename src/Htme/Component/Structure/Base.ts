namespace Htme.Component.Structure {

    import Panel = Htme.Component.Structure.Panel.Panel;
    import Compound = Htme.Component.Element.Compound;
    import AbstractBlock = Htme.Component.Element.Standard;
    import Standard = Htme.Component.Structure.Panel.Standard;

    export class Base extends AbstractBlock implements Structure {

        private $panel : Standard;

        constructor(
            element : JQuery|string
        ) {

            super(element);


            this.$panel = new Standard(this, '<div>%name%</div>');

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

        // set (content : string|JQuery) {
        //
        //     super.set(content);
        //     this.attachPanel();
        // }

        attach()
        {
            this.attachPanel();
        }

        detach()
        {
            this.detachPanel();
            super.detach();
        }

    }

}