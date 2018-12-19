namespace Htme.Component.Element {

    export class Compound extends AbstractBlock {

        private children : {[key:string] : Element} = {};

        constructor(
            element : JQuery|string
        ) {

            super(element);
            this.set(this.element.children());
        }

        set (content : string|JQuery) {

            content = ensureJquery(content);

            this.element.empty();
            let $this = this;

            content.each(function (k, v) {

                $this.append(new String($(v)));
            })
        }

        all() : {[key:string] : Element} {

            return Object.assign<{}, {}>({}, this.children);
        }

        clear() {

            this.element.empty();
        }

        attach() {

            for(let k in this.children) {

                this.element.append(this.children[k].element);
            }
        }

        detach() {

            for(let k in this.children) {

                this.children[k].element.detach();
            }
        }

        protected ensureKey(key : string|null) : string {

            if(key === null) {

                for(let i = 0; this.children.hasOwnProperty(key = '_' + i); i++);
            }

            this.remove(key);

            return key;
        }

        remove(key) {

            if(this.has(key)) {

                this.children[key].element.detach();
                delete this.children[key];
            }
        }

        prepend(block: Element, key : string|null = null) : string {

            key = this.ensureKey( key);

            let buffer = {};
            buffer[key] = block;

            this.children = Object.assign(buffer, this.children);

            this.attach();

            return key;
        }

        append(block: Element , key : string|null = null): string {

            key = this.ensureKey( key);

            this.element.append(block.element);
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
}