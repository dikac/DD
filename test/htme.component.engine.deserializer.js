QUnit.test( "Component.Element.String construct", function( assert ) {

    let dom = $(`<div></div>`);
    let string = new Htme.Component.Engine.deserializer(dom, 'value');

    assert.equal('value', dom.html(), "Passed!");
    assert.equal('value', string.content, "Passed!");

});

