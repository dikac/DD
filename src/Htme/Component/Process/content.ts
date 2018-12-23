namespace Htme.Component.Process {

    import Attributes = Htme.Component.Element.Attributes.Attributes;

    export function content(attributes : Attributes) {

        attributes.get('class').add(Htme.Component.Structure.CONTENT);
        attributes.get('data-htme-type').set('Content');
    }


}