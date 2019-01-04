///<reference path="Map_.ts"/>
///<reference path="MapString.ts"/>
///<reference path="AttributeValue.ts"/>
namespace Htme.Component.Map_ {

    import StringableI = Stringable.Stringable;
    import Attributes = Htme.Component.Map_.Attributes;

    /**
     *
     */
    export class Style extends AttributeValue {

        constructor(attributes : Attributes) {

            super(attributes, 'style', ':', ';');
        }
    }

}