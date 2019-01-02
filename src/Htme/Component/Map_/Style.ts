///<reference path="Map_.ts"/>
///<reference path="MapString.ts"/>
///<reference path="Attribute.ts"/>
namespace Htme.Component.Map_ {

    import StringableI = Stringable.Stringable;
    import Attributes = Htme.Component.Element.Attributes.Attributes;

    /**
     *
     */
    export class Style extends Attribute {

        constructor(    attributes : Attributes) {

            super(attributes, 'style', ':', ';');
        }
    }

}