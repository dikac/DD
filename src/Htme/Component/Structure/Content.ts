///<reference path="./Panel/Standard.ts"/>
namespace Htme.Component.Structure {

    import StructureInterface = Htme.Component.Structure.Structure;
    import StdPanel = Htme.Component.Structure.Panel.Standard;
    import Data = Htme.Component.Map_.Data;

    export class Content extends Htme.Component.Element.String implements StructureInterface {

        private $panel : Htme.Component.Structure.Panel.Standard;

        constructor(
            element : JQuery|string|null = null,
            handler : Htme.Component.Plugin.Plugin,
            handle : string,
            type : string,
        ) {

            super(element);

            this.$panel =  new  StdPanel(this, null, 'Content');

            let data = new Data(this.attributes);
            data.handle().set(handle);
            data.type().set(type);

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