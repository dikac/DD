namespace Htme.Component.Element {

    import SetImplement = Htme.Component.Datastructure.SetImplement;
    import MapImplement = Htme.Component.Datastructure.MapImplement;

    export class Attributes extends MapImplement<string, Attribute> {

        constructor(public jquery : JQuery)
        {
            super();

            let $this = this;

            jquery.each(function() {

                $.each(this.attributes, function() {
                    // this.attributes is not a plain object, but an array
                    // of attribute nodes, which contain both the name and value
                    if(this.specified) {

                        let name = this.name.toLowerCase();

                        $this.set(name, new Attribute(name, jquery));
                    }
                });
            });
        }

        toString() : string
        {
            let buffer : string[] = [];

            for(let [name, attribute] of this) {


                buffer.push(`${name}="${attribute}"`);
            }

            return buffer.join(' ');

        }

        get(attribute : string) : Attribute
        {
            if(!this.has(attribute)) {

                this.set(attribute, new Attribute(attribute, this.jquery));
            }

            return super.get(attribute);
        }
    }
}