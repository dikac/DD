namespace Htme.Component.Structure {

    import Panel = Htme.Component.Structure.Panel.Panel;
    import Dom = Htme.Component.Element.Dom;
   // import AbstractBlock = Htme.Component.Element.Standard;
   // import PanelStandard = Htme.Component.Structure.Panel.Standard;

    export class Standard extends Dom implements Structure {

        private $panel : Htme.Component.Structure.Panel.Standard;

        constructor(
            element : JQuery|string|null = null
        ) {

            super(element);

            this.$panel = new Htme.Component.Structure.Panel.Standard(this, null,'%name%');

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
            this.element.empty();
        }

    }

}