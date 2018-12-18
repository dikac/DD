QUnit.test( "Component.Element.Block construct", function( assert ) {

    let Single = Htme.Component.Element.Block;

    let dom = $(`<div></div>`);
    let element = new Single(Single($(`<p></p>`)), dom);

    assert.equal('<p></p>', dom.html(), "Passed!");
    assert.equal('<p></p>', element.content, "Passed!");
});
//
//
// QUnit.test( "Component.Element.String set", function( assert ) {
//
//     let string = new Htme.Component.Element.String('value');
//     let dom = $(`<div></div>`);
//
//     assert.equal('', dom.html(), "Passed!");
//
//     string.parent(dom);
//
//     assert.equal('value', dom.html(), "Passed!");
//
//     string.content = 'edited';
//
//     assert.equal('edited', dom.html(), "Passed!");
//     assert.equal('edited', string.content, "Passed!");
//
// });
//
// QUnit.test( "Component.Element.String detach & attach", function( assert ) {
//
//     let dom = $(`<div></div>`);
//     let string = new Htme.Component.Element.String('value', dom);
//
//     string.detach();
//     assert.equal('', dom.html(), "Passed!");
//     assert.equal('value', string.content, "Passed!");
//
//
//     string.attach();
//     assert.equal('value', dom.html(), "Passed!");
//     assert.equal('value', string.content, "Passed!");
// });
