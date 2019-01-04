namespace Htme.Component.Structure {

    //import Panel = Htme.Component.Structure.Panel.Panel;
    import Dom = Htme.Component.Element.Dom;
   // import AbstractBlock = Htme.Component.Element.Standard;
   // import PanelStandard = Htme.Component.Structure.Panel.Standard;
    import SetAttribute = Htme.Component.Set_.AttributeValue;

    export class Standard extends Dom implements Structure {

        private $panel : Htme.Component.Structure.Panel.Standard;

        constructor(
            element : JQuery|string|null = null,
            handler : Htme.Plugin.Plugin
        ) {

            super(element);

            //this.attributes.get('class').add(Structure.IDENTIFIER);
            let set = new SetAttribute(this.attributes, 'class');
            set.add(IDENTIFIER);
           // return set.toString();

            // this.attributes.edit('class', function (attribute : string) : string {
            //
            //     let set = new SetAttribute(attribute);
            //     set.add(IDENTIFIER);
            //     return set.toString();
            //
            // });

            this.$panel = new Htme.Component.Structure.Panel.Standard(this, null,'%name%');

            handler.process(this);

            // call manually
            this.attachPanel();
        }

        get content () : string {

            this.detachPanel();
            let string = this.element.html();
            this.attachPanel();
            return string;
        }

        set content(content : string) {

            this.element.html(content);
        }

        get panel() : Htme.Component.Structure.Panel.Panel {

            return this.$panel;
        }

        attachPanel() {

            // value is not available on object construction
            if(this.$panel) {

                this.element.prepend(this.$panel.element);
            }
        }

        detachPanel() {

            this.$panel.element.detach();
        }

        //
        // attach()
        // {
        //     this.attachPanel();
        // }
        //
        // detach()
        // {
        //     this.detachPanel();
        //     this.element.empty();
        // }

    }

}