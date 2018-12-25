namespace Htme.Component.Structure.Panel {

   // import Compound = Htme.Component.Element.Compound;
    import String = Htme.Component.Element.String;
    import Structure = Htme.Component.Structure.Structure;
    import Menu = Htme.Component.Structure.Panel.Menu.Menu;
    import MenuStandard = Htme.Component.Structure.Panel.Menu.Standard;
    import MapElement = Htme.Component.Element.MapElement;

    // export function defaultFactory (element : JQuery|string|null = null) : Menu | null {
    //
    //     return new Standard(element);
    // }

    export class Standard extends MapElement<Menu> implements Panel {

        private $name : String;
        private $structure : Structure;

        constructor(
            structure : Structure,
            element : JQuery|string|null = null,
            name : string = '{panel name}',
           // factory : (element : JQuery|string|null) => Menu | null = defaultFactory
        ) {
            super(element/*, factory*/);
            this.structure = structure;

            this.attributes.get('class').add(IDENTIFIER);

            this.$name = new Htme.Component.Element.PanelName(name);

            this.element.prepend(this.$name.element);
            //this.attachName();
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

        set(key: string, element: Menu): this {

            element.structure = this.structure;
            super.set(key, element);

            return this;
        }


        get(key: string): Menu {

            let menu = super.get(key);

            if(!menu) {

                menu = new MenuStandard(this.structure, null, key);
                this.set(key, menu)
            }

            return menu;
        }

        // append(block: Menu/*, key: string | null = null*/): number {
        //
        //     return super.append(block/*, key*/);
        // }
        //
        // prepend(block: Menu/*, key: string | null = null*/): number {
        //
        //     return super.prepend(block/*, key*/);
        // }
        //
        // // set (content : string|JQuery) {
        // //
        // //     super.set(content);
        // //     this.attachName();
        // // }

        // attachName() {
        //
        //     // value is not available on object construction
        //     if(this.$name) {
        //
        //         this.element.prepend(this.$name.element);
        //     }
        // }

        // detachName() {
        //
        //     this.$name.detach();
        // }

        // attach()
        // {
        //     super.attach();
        //    // this.attachName();
        // }
        //
        // detach()
        // {
        //     //this.detachName();
        //     super.detach();
        // }

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