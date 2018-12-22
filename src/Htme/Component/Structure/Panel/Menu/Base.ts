namespace Htme.Component.Structure.Panel.Menu {

    import Element = Htme.Component.Element.Element;
    import MapElement = Htme.Component.Element.MapElement;
    import Dom = Htme.Component.Element.Dom;
    import Item = Htme.Component.Structure.Panel.Menu.Item.Item;

    export class Base extends Dom implements Menu, Map<string, Item>{

        private $name : Htme.Component.Element.String;
        private elements : MapElement;

        constructor(
            element : JQuery|string|null = null,
            name : string = '{name}'
        ) {
            super(element);

            this.attributes.get('class').add('HtmeMenu');

            this.$name = new Htme.Component.Element.String('<div class="HtmeMenuName"></div>');
            this.name = name;
            this.elements = new MapElement<Item>('<div class="HtmeMenuItems"></div>');

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

            block.attributes.get('class').add('HtmeItem');
        }

        hide () {

            this.elements.attributes.get('class').add('HtmeHide');
        }

        show () {

            this.elements.attributes.get('class').delete('HtmeHide');
        }

        right() {

            this.attributes.get('class').add('HtmeMenuRight');
            this.attributes.get('class').delete('HtmeMenuLeft');
        }

        left() {

            this.attributes.get('class').delete('HtmeMenuRight');
            this.attributes.get('class').add('HtmeMenuLeft');
        }

        set(key : string, block: Item) : this {

            this.addClass(block);
            return this.elements.set(key, block);
        }


        detach() {

            this.element.empty();
        }


        delete(key) : boolean {

            return this.elements.delete(key);
        }

        get(key) : Element | undefined {

            return this.elements.get(key);
        }

        has(key) : boolean {

            return this.elements.has(key);
        }

        attach()
        {
            this.element.append(this.$name.element);
            this.element.append(this.elements.element);
        }

        get name() : string
        {
            return this.$name.content;
        }

        set name(name : string)
        {
            this.$name.content = name;
        }



        get [Symbol.toStringTag] () : string  {

            return this.elements[Symbol.toStringTag];
        }

        get size () : number  {

            return this.elements.size
        };

        [Symbol.iterator](): IterableIterator<[string, Item]> {

            return this.elements[Symbol.iterator]();
        }

        clear(): void {

            this.elements.clear();
        }



        entries(): IterableIterator<[string, Item]> {
            return             this.elements.entries();;
        }

        forEach(callbackfn: (value: Item, key: string, map: Map<string, Item>) => void, thisArg?: any): void {

            return this.elements.forEach(callbackfn, thisArg);
        }

        keys(): IterableIterator<string> {

            return this.elements.keys();
        }



        values(): IterableIterator<Item> {

            return this.elements.values();
        }
    }
    
}