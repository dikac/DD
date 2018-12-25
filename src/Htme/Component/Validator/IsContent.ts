namespace Htme.Component.Validator {


    import Attributes = Htme.Component.Element.Attributes.Attributes;

    export function IsContent(attributes : Attributes) : boolean {

        return attributes.get('data-htme-type').toString() === 'Content';
    }

    

}