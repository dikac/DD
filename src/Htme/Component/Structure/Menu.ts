namespace Htme.Component.Structure {

    import Compound = Htme.Component.Element.Compound;
    import AbstractBlock = Htme.Component.Element.AbstractBlock;
    import Element = Htme.Component.Element.Element;

    export class Menu extends AbstractBlock {

        private $name : Htme.Component.Element.String;
        private compound : Compound;

        constructor(
            element : JQuery|string|null = null,
            name : string = '{name}'
        ) {
            super(element);

            this.attributes().get('class').add('HtmeMenu');

            this.$name = new Htme.Component.Element.String('<div class="HtmeMenuName"></div>');
            this.name = name;
            this.compound = new Compound('<div class="HtmeMenuItems"></div>');

            this.attach();
            this.hide();
            this.left();

            let $this = this;
            this.element.click(function () {

                $this.show();
            });

            $(document).click(function(e) {

               if($(e.target).closest($this.element).length === 0) {

                   $this.hide();
               }
            });
        }

        protected addClass(block: Element) {

            block.attributes().get('class').add('HtmeItem');
        }

        hide () {

            this.compound.attributes().get('class').add('HtmeHide');
        }

        show () {

            this.compound.attributes().get('class').delete('HtmeHide');
        }

        right() {

            this.attributes().get('class').add('HtmeMenuRight');
            this.attributes().get('class').delete('HtmeMenuLeft');
        }

        left() {

            this.attributes().get('class').delete('HtmeMenuRight');
            this.attributes().get('class').add('HtmeMenuLeft');
        }

        append(block: Element/*, key : string|null = null*/) : number {

            this.addClass(block);
            return this.compound.append(block/*, key*/);
        }

        prepend(block: Element/*, key : string|null = null*/) : number {

           this.addClass(block);
           return this.compound.prepend(block/*, key*/);
        }

        remove(key) {

            this.compound.remove(key);
        }

        get(key) : Element | undefined {

            return this.compound.get(key);
        }

        has(key) : boolean {

            return this.compound.has(key);
        }

        attach()
        {
            this.element.append(this.$name.element);
            this.element.append(this.compound.element);
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