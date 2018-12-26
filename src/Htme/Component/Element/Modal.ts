namespace Htme.Component.Element {

    export const IDENTIFIER : string = 'HtmeModal';

    export class Modal extends MapElement<Element>  {

        constructor(
            element : JQuery|string|null = null,
            factory : (JQuery) => Element| null = null
        ) {
            super(element, factory);
            this.attributes.get('class').add(IDENTIFIER);
            this.attributes.get('class').add("ui-widget-content");

            this.element.draggable({
                addClasses: false
            }).resizable({
                handles: 'all'
            });
        }


        show() {

            $('body').append(this.element);
        }

        hide() {

            this.element.detach();
        }
    }
}