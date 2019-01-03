// QUnit.test( "Htme.Component.Map_.Attribute construct", function( assert ) {
//
//     let Attributes = Htme.Component.Element.Attributes.Attributes;
//     let dom = $('<div style="padding:10px;margin:10px"></div>');
//     let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'style', ':', ';');
//
//     assert.equal(map.get('padding'), '10px', "Passed!");
//     assert.equal(map.get('margin'), '10px', "Passed!");
// });


QUnit.test( "Htme.Component.Map_.Attribute set", function( assert ) {

    let Attributes = Htme.Component.Element.Attributes.Attributes;
    let dom = $('<div></div>');
    let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'style', ':', ';');

    map.set('padding', '10px');
    console.log(map);

    assert.equal(map.get('padding'), '10px', "Passed!");
    assert.equal(dom.attr('style'), 'padding:10px', "Passed!");
    //
    // map.set('margin', '11px');
    // assert.equal(map.get('margin'), '11px', "Passed!");
    //
    // assert.equal(map.toString(), 'padding:10px;margin:11px', "Passed!");
});
//
// QUnit.test( "Htme.Component.Map_.Attribute delete", function( assert ) {
//
//     let Attributes = Htme.Component.Element.Attributes.Attributes;
//     let dom = $('<div style="z-index:1;padding:10px;margin:10px"></div>');
//     let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'style', ':', ';');
//
//     map.delete('z-index');
//     assert.equal(map.toString(), 'padding:10px;margin:10px');
//
//     map.delete('padding');
//     assert.equal(map.toString(), 'margin:10px');
//
//     map.delete('margin');
//     assert.equal(map.toString(), '');
//     //assert.equal(map.attribute, '');
//
// });
//
// QUnit.test( "Htme.Component.Map_.Attribute fetch", function( assert ) {
//
//     let Attributes = Htme.Component.Element.Attributes.Attributes;
//     let dom = $('<div></div>');
//     let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'style', ':', ';');
//     dom.attr('style', "z-index:1;padding:10px;margin:11px");
//
//     assert.equal(map.toString(), '');
//     assert.equal(map.get('z-index'), undefined);
//
//     map.fetch();
//
//     assert.equal(map.toString(), "z-index:1;padding:10px;margin:11px");
//     assert.equal(map.get('z-index'), '1');
//     assert.equal(map.get('padding'), '10px');
//     assert.equal(map.get('margin'), '11px');
// });