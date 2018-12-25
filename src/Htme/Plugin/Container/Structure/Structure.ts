namespace Htme.Plugin.Container.Structure {

    import StructureInterface = Htme.Component.Structure.Structure;
    import SetImplement = Htme.Component.Datastructure.SetImplement;
    import SetElement = Htme.Component.Element.SetElement;
    import Panel = Htme.Component.Structure.Panel.Panel;
   // import StandardPanel = Htme.Component.Structure.Panel.Standard;
   // import Compound = Htme.Component.Element.Compound;

    export class Structure extends SetElement<StructureInterface> implements StructureInterface {

        private $panel : Htme.Component.Structure.Panel.Standard;

        constructor(
            element : JQuery|string|null = null,
            handler : Htme.Plugin.Plugin
        ) {

            super(element, function (jquery: JQuery) : StructureInterface {

                let val = handler.deserialize(jquery);
                handler.process(val);
                return val;
            });

            this.$panel =  new  Htme.Component.Structure.Panel.Standard(this, null, 'Container');


            Htme.Component.Process.container(this.attributes);

            handler.process(this);


            this.$panel.get('new');
            this.$panel.get('edit');
            this.$panel.get('window');

            this.attachPanel();

        }

        get panel() : Htme.Component.Structure.Panel.Panel {

            return  this.$panel;
        }

        toString(): string {

            this.$panel.element.detach();
            let string = super.toString();
            this.attachPanel();

            return string;
        }

        attachPanel(): void
        {
            this.element.prepend(this.$panel.element);
        }

        get content(): string
        {
            return "";
        }

        // detachPanel(): void
        // {
        //     this.$panel.detach();
        //
        // }


    }
}