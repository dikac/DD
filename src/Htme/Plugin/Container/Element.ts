namespace Htme.Plugin.Container {

    import Structure = Htme.Component.Structure.Standard;
    import SetImplement = Htme.Component.Datastructure.SetImplement;
   // import Compound = Htme.Component.Element.Compound;

    export class Element extends Structure implements Set<Structure>{

        private children : SetImplement<Structure> = new SetImplement<Structure>();

        constructor(
            element : JQuery|string|null = null,
            handler : Htme.Plugin.Plugin
        ) {

            super(element);

            Htme.Component.Process.container(this.attributes);

            this.panel.name = 'Container';

            this.panel.get('new');
            this.panel.get('edit');
            this.panel.get('window');

        }

        readonly [Symbol.toStringTag]: string;
        readonly size: number;

        [Symbol.iterator](): IterableIterator<Htme.Component.Structure.Standard>
        {

            return this.children[Symbol.iterator]();
        }

        add(value: Htme.Component.Structure.Standard): this
        {

            this.children.add(value);
            return this;
        }

        clear(): void {

            this.children.clear();
        }

        delete(value: Htme.Component.Structure.Standard): boolean
        {

            return this.children.delete(value);
        }

        entries(): IterableIterator<[Htme.Component.Structure.Standard, Htme.Component.Structure.Standard]>
        {
            return this.children.entries();
        }

        forEach(callbackfn: (value: Htme.Component.Structure.Standard, value2: Htme.Component.Structure.Standard, set: Set<Htme.Component.Structure.Standard>) => void, thisArg?: any): void
        {

            return this.children.forEach(callbackfn, thisArg);
        }

        has(value: Htme.Component.Structure.Standard): boolean
        {
            return this.children.has(value);
        }

        keys(): IterableIterator<Htme.Component.Structure.Standard>
        {
            return this.children.keys();
        }

        values(): IterableIterator<Htme.Component.Structure.Standard>
        {
            return this.children.values();
        }

    }
}