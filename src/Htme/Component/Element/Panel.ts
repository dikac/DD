namespace Htme.Component.Element {

   // import Compound = Htme.Component.Element.Compound;
    import String = Htme.Component.Element.String;
    import Structure = Htme.Component.Structure.Structure;
    import Menu = Htme.Component.Structure.Panel.Menu.Menu;
    import MenuStandard = Htme.Component.Structure.Panel.Menu.Standard;
   // import MapElement = Htme.Component.Element.MapElement;
    import SetAttribute = Htme.Component.Set_.Attribute;

    // export function defaultFactory (element : JQuery|string|null = null) : Menu | null {
    //
    //     return new Standard(element);
    // }

    export class Panel<Value  extends Element> extends MapElement<Value> {

        private $name : String;

        constructor(
            element : JQuery|string|null = null,
            name : string = '{panel name}',
           // factory : (element : JQuery|string|null) => Menu | null = defaultFactory
        ) {
            super(element/*, factory*/);

           // this.attributes.get('class').add(IDENTIFIER);

            // this.attributes.edit('class', function (attribute : string) : string {
            //
            //     let set = new SetAttribute(attribute);
            //     return set.toString();
            //
            // });

            this.$name = new Htme.Component.Element.PanelName(name);

            this.element.prepend(this.$name.element);
            //this.attachName();
        }


        set(key: string, element: Value): this {

            super.set(key, element);

            return this;
        }


        // get(key: string): Value|undefined {
        //
        //     let menu = super.get(key);
        //
        //     if(!menu) {
        //
        //         menu = new MenuStandard(this.structure, null, key);
        //         this.set(key, menu)
        //     }
        //
        //     return menu;
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