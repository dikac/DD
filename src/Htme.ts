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

        [Symbol.iterator](): IterableIterator<string>
        {

            return this.container[Symbol.iterator]();
        }

        entries(): IterableIterator<[string, string]>
        {

            return this.container.entries();
        }

        keys(): IterableIterator<string> {


            return this.container.keys();
        }

        forEach(callbackfn: (value: string, value2: string, set: Set<string>) => void, thisArg?: any): void
        {

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



    
    export interface Jqueriable {

        jquery() : JQuery ;
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

    // export class Panel extends Compound {
    //
    //     private $name : Elements;
    //
    //     constructor(jquery : JQuery|null = null, name : string) {
    //
    //         super(jquery);
    //         this.$name = new Elements($(`<div class="HtmePanelName">${name}</div>`));
    //         this.attributes.get('class').add('HtmePanel');
    //
    //         this.name = name;
    //     }
    //
    //     set name (name : string) {
    //
    //         this.$name.html(name);
    //
    //         this.prepend(this.$name);
    //     }
    //
    //     get name () : string {
    //
    //         return this.$name.content();
    //     }
    // }


    // export class Container {
    //
    //     constructor(
    //         private block : Elements,
    //         private panel : Elements = new Elements($('<div></div>')),
    //         readonly events : Events = new Events()
    //     ) {
    //
    //     }
    //
    // }

}}



namespace Htme.Component.Element {

    interface Element<Content> {

        attributes() : Attributes;
       // parent();
        //detach();
        //parent(jquery : JQuery|null);
        //attach();
        content() : Content ;
        toString() : string;
    }


     abstract class AbstractBlock<Content> implements Element<Content> {

        private $attributes : Attributes;

        constructor(protected element : JQuery|string) {

            if(typeof this.element === "string") {

                this.element = $(this.element);
            }

            this.$attributes = new Attributes(this.element);
        }


        abstract content () : Content;
        abstract toString () : string;

        attributes(): Attributes {

            return this.$attributes;
        }
    }


    export class String extends AbstractBlock<string|null> {


        constructor() {

        }
       // private $parent : JQuery|null;

        // constructor(
        //     private $content : string,
        //     parent : JQuery|null = null
        // ) {
        //
        //     this.parent(parent);
        // }

        // parent(jquery : JQuery|null) {
        //
        //     this.detach();
        //     this.$parent = jquery;
        //     this.attach();
        // }

        // attach() {
        //
        //     if(this.$parent) {
        //
        //         this.$parent.html(this.$content);
        //     }
        // }
        //
        // detach() {
        //
        //     if(this.$parent) {
        //
        //         this.$parent.empty();
        //     }
        //
        // }

        get content() : string|null {

            return this.$content;
        }

        set content(content : string|null) {

            this.$content = content;
            super.element;
        }
    }

    /*
        export class Blockz implements Element {

            private $parent : JQuery|null;

            constructor(
                private element : Element,
                private $content : Element| null,
                parent : JQuery|null = null
            ) {

                this.parent(parent);
            }

            attach() {

                if(this.$parent) {

                    this.$parent.empty();
                    this.$parent.append(this.element);
                }
            }

            detach() {

                if(this.$parent) {

                    this.$content.detach();
                }
            }

            parent(jquery: JQuery|null) {

                this.detach();
                this.$parent = jquery;
                this.attach();
            }

            get content() : Element|null {

                return this.$content;
            }

            set content(content : Element|null) {

                this.$content = content;
                this.attach();
            }
        }



















        export class Compound implements Element {

            private $parent : JQuery|null;

            private children : {[key:string] : Element} = {};

            constructor($parent : JQuery|null = null) {

                // if(this.jquery === null) {
                //
                //     this.jquery = $('<div></div>');
                // }
                //
                // for(let val of jquery.children()) {
                //
                //     this.append(new Compound($(val)))
                // }

              //  this.attributes = new Attributes(jquery);
            }

            parent(jquery : JQuery|null) {

                this.detach();
                this.$parent = jquery;
                this.attach();

            }

            all() : {[key:string] : Element} {

                return Object.assign<{}, {}>({}, this.children);
            }

            content() : string {

                return this.$parent.html();
            }

            attach() {

                if(this.$parent) {

                    for(let k in this.children) {

                        this.children[k].parent(this.$parent);
                    }
                }
            }

            detach() {

                if(this.$parent) {

                    this.$parent.empty();
                }
            }

            toString() {

                let string = this.$parent.wrap('<div></div>').parent().html();
                this.$parent.unwrap();

                return string;
            }

            protected ensureKey(key : string|null) : string {

                if(key === null) {

                    for(var i = 0; this.children.hasOwnProperty(i); i++);

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

                    return new Compound($(block));
                }

                return block;
            }

            remove(key) {

                if(this.has(key)) {

                    this.children[key].detach();
                    delete this.children[key];
                }
            }

            prepend(block: Element|string, key : string|null = null) : string {

                [block, key] = this.ensure(block, key);

                let buffer = {};
                buffer[key] = block;

                this.children = Object.assign(buffer, this.children);

                this.attach();

                return key;
            }

            append(block: Element|string , key : string|null = null): string {

                [block, key] = this.ensure(block, key);

                block.parent(this.$parent);
                this.children[key] = block;

                return key;
            }

            get(key) : Element | undefined {

                return this.children[key];
            }

            has(key) : boolean {

                return this.children.hasOwnProperty(key);
            }
        }
    */
}





namespace Htme { export namespace App {

    export function init(selector: string, ...plugin) {


    }

}}