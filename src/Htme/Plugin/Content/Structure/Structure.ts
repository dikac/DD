///<reference path="../../../Component/Structure/Panel/Standard.ts"/>
///<reference path="../Handle/Handle.ts"/>
namespace Htme.Plugin.Content.Structure {

    import StructureInterface = Htme.Component.Structure.Structure;
    import StdPanel = Htme.Component.Structure.Panel.Standard;
    import Content = Htme.Component.Structure.Type.Content;
    import Handle = Htme.Plugin.Content.Handle.Handle;

    export class Structure extends Htme.Component.Element.String implements StructureInterface {

        private $panel : Htme.Component.Structure.Panel.Standard;

        constructor(
            element : JQuery|string|null = null,
            handler : Htme.Plugin.Plugin
        ) {

            super(element);

            this.$panel =  new  StdPanel(this, null, 'Content');

            (new Content).set(this.attributes);
            (new Handle).set(this.attributes);

            handler.process(this);

            this.$panel.get('edit');
            this.$panel.get('window');

            this.attachPanel();
        }

        get panel() : Htme.Component.Structure.Panel.Panel
        {
            return  this.$panel;
        }

        toString(): string
        {
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
    }
}