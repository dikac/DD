namespace Htme.Component.Structure.Panel.Menu {

    import Element = Htme.Component.Element.Element;
    import MapElement = Htme.Component.Element.MapElement;
    import Dom = Htme.Component.Element.Dom;
    import Item = Htme.Component.Structure.Panel.Menu.Item.Item;
    import SetAttribute = Htme.Component.Set_.Attribute;

    export class Standard extends Dom implements Menu, Map<string, Item>{

        private $name : Htme.Component.Element.String;
        private items : MapElement<Item>;
        private $structure : Structure;

        constructor(
            structure: Structure,
            element : JQuery|string|null = null,
            name : string = '{name}'
        ) {
            super(element);

            this.$name = new Htme.Component.Element.String(`<div class="HtmeMenuName">${name}</div>`);
            this.items = new MapElement<Item>('<div class="HtmeMenuItems"></div>');

          //  this.attributes.get('class').add(IDENTIFIER);
            this.attributes.edit('class', function (attribute : string) : string {

                let set = new SetAttribute(attribute);
                set.add(IDENTIFIER);
                return set.toString();

            });

            this.structure = structure;


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

        get structure() : Structure {

            return this.$structure;
        }

        set structure(structure : Structure)  {

            this.$structure = structure;

            for(let [k, value] of this) {

                value.structure  = structure;
            }
        }

        protected addClass(block: Element) {

           // block.attributes.get('class').add('HtmeItem');

            block.attributes.edit('class', function (attribute : string) : string {

                let set = new SetAttribute(attribute);
                set.add('HtmeItem');
                return set.toString();

            });
        }

        hide () {

           // this.items.attributes.get('class').add('HtmeHide');
            this.items.attributes.edit('class', function (attribute : string) : string {

                let set = new SetAttribute(attribute);
                set.add('HtmeHide');
                return set.toString();

            });
        }

        show () {

           // this.items.attributes.get('class').delete('HtmeHide');
            this.items.attributes.edit('class', function (attribute : string) : string {

                let set = new SetAttribute(attribute);
                set.delete('HtmeHide');
                return set.toString();

            });
        }

        right() {

           // this.attributes.get('class').add('HtmeMenuRight');
           // this.attributes.get('class').delete('HtmeMenuLeft');

            this.attributes.edit('class', function (attribute : string) : string {

                let set = new SetAttribute(attribute);
                set.add('HtmeMenuRight');
                set.delete('HtmeMenuLeft');
                return set.toString();

            });
        }

        left() {

           // this.attributes.get('class').delete('HtmeMenuRight');
           // this.attributes.get('class').add('HtmeMenuLeft');

            this.attributes.edit('class', function (attribute : string) : string {

                let set = new SetAttribute(attribute);
                set.delete('HtmeMenuRight');
                set.add('HtmeMenuLeft');
                return set.toString();

            });
        }

        set(key : string, block: Item) : this {

            block.structure = this.structure;
            this.addClass(block);

          //  console.log(key, block.element);

            this.items.set(key, block);
            return this;
        }

        detach() {

            this.element.empty();
        }

        delete(key) : boolean {

            return this.items.delete(key);
        }

        get(key) : Item | undefined {

            return this.items.get(key);
        }

        has(key) : boolean {

            return this.items.has(key);
        }

        attach()
        {
            this.element.append(this.$name.element);
            this.element.append(this.items.element);
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

            return this.items[Symbol.toStringTag];
        }

        get size () : number  {

            return this.items.size
        };

        [Symbol.iterator](): IterableIterator<[string, Item]> {

            return this.items[Symbol.iterator]();
        }

        clear(): void {

            this.items.clear();
        }



        entries(): IterableIterator<[string, Item]> {
            return   this.items.entries();;
        }

        forEach(callbackfn: (value: Item, key: string, map: Map<string, Item>) => void, thisArg?: any): void {

            return this.items.forEach(callbackfn, thisArg);
        }

        keys(): IterableIterator<string> {

            return this.items.keys();
        }



        values(): IterableIterator<Item> {

            return this.items.values();
        }
    }
    
}