QUnit.test( "Htme.Component.Map_.Attribute construct", function( assert ) {

    let Attributes = Htme.Component.Element.Attributes.Attributes;
    let dom = $('<div style="padding:10px;margin:10px"></div>');
    let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'style', ':', ';');

    assert.equal(map.get('padding'), '10px', "Passed!");
    assert.equal(map.get('margin'), '10px', "Passed!");


});


QUnit.test( "Htme.Component.Map_.Attribute set", function( assert ) {

    let Attributes = Htme.Component.Element.Attributes.Attributes;
    let dom = $('<div></div>');
    let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'class');

    map.set('padding', '10px');
    assert.equal(map.get('margin'), 'padding:10px', "Passed!");

    map.set('margin', '10px');
    assert.equal(map.get('margin'), 'padding:10px;margin:10px', "Passed!");
});
//
// QUnit.test( "Htme.Component.Map_.Attribute delete", function( assert ) {
//
//     let Attributes = Htme.Component.Element.Attributes.Attributes;
//     let dom = $('<div class="class1 class2 class3"></div>');
//     let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'class');
//
//     map.delete('class1');
//     assert.equal(map.toString(), 'class2 class3');
//
//     map.delete('class2');
//     assert.equal(map.toString(), 'class3');
//
//     map.delete('class3');
//     assert.equal(map.toString(), '');
//     //assert.equal(map.attribute, '');
//
// });
//
//
// QUnit.test( "Htme.Component.Map_.Attribute vacuum", function( assert ) {
//
//     let Attributes = Htme.Component.Element.Attributes.Attributes;
//     let dom = $('<div class></div>');
//     let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'class');
//
//    // assert.equal(map.attribute, '');
//     assert.equal(map.toString(), '');
//
//     map.clean();
//
//     //assert.equal(map.attribute, undefined);
//     assert.equal(map.toString(), '');
//
//
//     dom = $('<div class = "class1"></div>');
//     map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'class');
//
//     map.delete('class1');
//     //assert.equal(map.attribute, '');
//     assert.equal(map.toString(), '');
//
//     map.clean();
//
//     //assert.equal(map.attribute, undefined);
//     assert.equal(map.toString(), '');
// });
//
//
// QUnit.test( "Htme.Component.Map_.Attribute fetch", function( assert ) {
//
//     let Attributes = Htme.Component.Element.Attributes.Attributes;
//     let dom = $('<div></div>');
//     let map = new Htme.Component.Map_.Attribute(new Attributes(dom), 'class');
//
//
// });