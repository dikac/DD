///<reference path="../Element/SetElement.ts"/>
///<reference path="./Panel/Menu/Item/Click.ts"/>
///<reference path="../Map_/Data.ts"/>
namespace Htme.Component.Structure {

    import StructureInterface = Htme.Component.Structure.Structure;
    import SetElement = Htme.Component.Element.SetElement;
    import Data = Htme.Component.Map_.Data;

    export class Container extends SetElement<StructureInterface> implements StructureInterface {

        private $panel : Htme.Component.Structure.Panel.Standard;

        constructor(
            element : JQuery|string|null = null,
            handler : Htme.Component.Plugin.Plugin,
            handle : string,
            type : string,
        ) {

            super(element, function (jquery: JQuery) : StructureInterface {

                console.log(handler);
                let val = handler.deserialize(jquery);

                if(!val) {

                    throw new Error('Failed to deserialize ' + val);
                }

                handler.process(val);
                return val;
            });

            this.$panel =  new  Htme.Component.Structure.Panel.Standard(this, null, 'Container');
            this.$panel.get('new');
            this.$panel.get('edit');
            this.$panel.get('window');
            this.attachPanel();

            let data = new Data(this.attributes);
            data.handle().set(handle);
            data.type().set(type);

            handler.process(this);
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

    }
}