namespace Htme.Component.Structure.Panel {

    import Compound = Htme.Component.Element.Compound;
    import String = Htme.Component.Element.String;
    import Structure = Htme.Component.Structure.Structure;
    import Menu = Htme.Component.Structure.Menu.Menu;

    export class Standard extends Compound implements Panel {

        private $name : String;

        constructor(
            private structure : Structure,
            element : JQuery|string|null = null
        ) {
            super(element);

            this.attributes().get('class').add('HtmePanel');

            this.$name = new Htme.Component.Element.PanelName();

            this.attachName();
        }

        append(block: Menu/*, key: string | null = null*/): number {

            return super.append(block/*, key*/);
        }

        prepend(block: Menu/*, key: string | null = null*/): number {

            return super.prepend(block/*, key*/);
        }

        // set (content : string|JQuery) {
        //
        //     super.set(content);
        //     this.attachName();
        // }

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