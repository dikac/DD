namespace Htme {export namespace Component {

    export class Attribute  {

        private container :  Set<string> = new Set<string>();

        constructor(readonly $name : string, private jquery : JQuery) {

            let attribute = this.get();

            if(attribute) {

                for(let val of attribute.split(' ')) {

                    this.container.add(val);
                }
            }
        }

        [Symbol.iterator](): IterableIterator<string> {

            return this.container[Symbol.iterator]();
        }

        entries(): IterableIterator<[string, string]> {

            return this.container.entries();
        }

        keys(): IterableIterator<string> {


            return this.container.keys();
        }

        forEach(callbackfn: (value: string, value2: string, set: Set<string>) => void, thisArg?: any): void {

            this.container.forEach(callbackfn, thisArg);
        }


        values(): IterableIterator<string> {
            return this.container.values();
        }

        add(value : string) : any
        {
            for(let val of value.split(' ')) {

                this.container.add(val);
            }

            let attribute = this.get();

            if(attribute !== undefined) {

                value = `${attribute} ${value}`;
            }

            this.set(value);

        }

        set (value : string) : any {

            this.jquery.attr(this.$name, value);
        }

        get () : string | undefined {

            return this.jquery.attr(this.$name);
        };

        toString() : string {

            let attribute = this.get();

            if(attribute === undefined) {

                return '';
            }

            return attribute;
        }

        clear(keep : boolean = false): void
        {
            if(keep) {

                this.jquery.attr(this.$name, '');

            } else {

                this.jquery.removeAttr(this.$name);
            }

            this.container.clear();
        }

        delete(value : string, keep : boolean = false) : any
        {
            for(let v of value.split(' ')) {

                this.container.delete(v);
            }

            let attribute = Array.from(this.container).join(' ').trim();

            if(attribute === '') {

                this.clear(keep);

            } else {

                this.jquery.attr(this.$name, attribute);
            }
        }
    }




    export class Events {

        constructor(
            private events : {[key:string]:(...args)=> any} = {}
        ) {

        }

        call(...args) {

            for(let i in this.events) {

                this.events[i](...args);
            }
        }
    }


    export class Attributes {

        private datas : {[key: string]: Attribute} = {};

        constructor(public jquery : JQuery)
        {
            let attribute = new Set<string>();

            jquery.each(function() {

                $.each(this.attributes, function() {
                    // this.attributes is not a plain object, but an array
                    // of attribute nodes, which contain both the name and value
                    if(this.specified) {

                        attribute.add(
                            this.name.toLowerCase()
                        );
                    }
                });
            });

            for(let value of attribute) {

                this.datas[value] = new Attribute(value, this.jquery)
            }
        }

        toString() : string
        {
            let buffer : string[] = [];

            for(let k in this.datas) {

                let value = this.datas[k].toString();
                buffer.push(`${k}="${value}"`);
            }

            return buffer.join(' ');

        }

        get(attribute : string) : Attribute
        {
            if(!(attribute in this.datas)) {

                this.datas[attribute] = new Attribute(attribute, this.jquery);
            }

            return this.datas[attribute];
        }
    }


    export class Element  {

        protected attributes : Attributes;
        private blocks : {[key:string] : Element} = {};

        constructor(protected jquery : JQuery|null = null) {

            if(this.jquery === null) {

                this.jquery = $('<div></div>');
            }


            for(let val of jquery.children()) {

                this.append(new Element($(val)))
            }

            this.attributes = new Attributes(jquery);
        }

        all() : {[key:string] : Element} {

            return Object.assign({}, this.blocks);
        }

        content() : string{

            return this.jquery.html();
        }

        detach() {

            this.jquery.detach();
        }

        toString() {

            let string = this.jquery.wrap('<div></div>').parent().html();
            this.jquery.unwrap();

            return string;
        }

        protected ensureKey(key : string|null) : string {

            if(key === null) {

                for(var i = 0; this.blocks.hasOwnProperty(i); i++);

                return i.toString();
            }

            return key;
        }

        protected ensure(element: Element|string , key : string|null = null) : [Element, string] {

            element = this.ensureElement(element);
            key = this.ensureKey(key);
            this.remove(key);

            return [element, key];
        }

        protected ensureElement(block: Element|string) : Element {

            if(typeof block === "string") {

                return new Element($(block));
            }

            return block;
        }

        remove(key) {

            if(this.has(key)) {

                this.blocks[key].jquery.detach();
                delete this.blocks[key];
            }
        }

        prepend(block: Element|string, key : string|null = null) : string {

            [block, key] = this.ensure(block, key);

            this.jquery.prepend(block.jquery);

            let buffer = {};
            buffer[key] = block;

            this.blocks = Object.assign(buffer, this.blocks);

            return key;
        }

        append(block: Element|string , key : string|null = null): string {

            [block, key] = this.ensure(block, key);

            this.jquery.append(block.jquery);
            this.blocks[key] = block;

            return key;
        }

        get(key) : Element | undefined {

            return this.blocks[key];
        }

        has(key) : boolean {

            return this.blocks.hasOwnProperty(key);
        }
    }

    // export class Item extends Map {
    //
    //
    //
    // }

    // export class Menu extends Map<string, Item> {
    //
    //
    //
    // }

    export class Panel extends Element {

        private $name : Element;

        constructor(jquery : JQuery|null = null, name : string) {

            super(jquery);

            this.attributes.get('class').add('HtmePanel');

            this.name = name;
        }


        set name (name : string) {

            if(this.$name) {

                this.$name.detach();
            }

            this.$name = new Element($(`<div class="HtmePanelName">${name}</div>`));

            this.prepend(this.$name);
        }

        get name () : string {

            return this.$name.content();
        }
    }


    export class Container {

        constructor(
            private block : Element,
            private panel : Element = new Element($('<div></div>')),
            readonly events : Events = new Events()
        ) {

        }

    }

}}









namespace Htme { export namespace App {

    export function init(selector: string, ...plugin) {


    }

}}