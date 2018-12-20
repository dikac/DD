namespace Htme.Component.Structure {

    import Compound = Htme.Component.Element.Compound;
    import String = Htme.Component.Element.String;

    export class Panel extends Compound {

        private $name : String;

        constructor(
            element : JQuery|string
        ) {
            super(element);

            this.attributes().get('class').add('HtmePanel');

            this.$name = new String('<div class="HtmePanelName">{name}</div>');

            this.attachName();
        }

        append(block: Menu, key: string | null = null): string {

            return super.append(block, key);
        }

        prepend(block: Menu, key: string | null = null): string {

            return super.prepend(block, key);
        }

        set (content : string|JQuery) {

            super.set(content);
            this.attachName();
        }

        attachName() {

            // value is not available on object construction
            if(this.$name) {

                this.element.prepend(this.$name.element);
            }
        }

        detachName() {

            this.$name.detach();
        }

        attach()
        {
            super.attach();
            this.attachName();
        }

        detach()
        {
            this.detachName();
            super.detach();
        }

        get name() : string
        {
            return this.$name.content;
        }

        set name(name : string)
        {
            this.$name.content = name;
        }
    }
    
}