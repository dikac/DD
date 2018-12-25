namespace Htme.Plugin.Container.Validator {


    import Attributes = Htme.Component.Element.Attributes.Attributes;

    export function IsContainer(attributes : Attributes) : boolean {

        return attributes.get('data-htme-handle').toString() === 'Container';
    }

    

}