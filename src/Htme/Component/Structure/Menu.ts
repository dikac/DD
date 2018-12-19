namespace Htme.Component.Structure {

    import Compound = Htme.Component.Element.Compound;

    export class Menu extends Compound {

        private $name : Htme.Component.Element.String;

        constructor(
            element : JQuery|string, name : string
        ) {
            super(element);

            this.attributes().get('class').add('HtmeMenu');

            this.$name = new Htme.Component.Element.String('<div class="HtmeMenuName"></div>');
            this.name = name;
        }

        // detach() {
        //
        //     this.element.append(this.$name.element);
        //     super.detach();
        // }

        attach()
        {
            this.element.append(this.$name.element);
            super.attach();
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