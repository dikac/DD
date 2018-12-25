
QUnit.test( "Htme.Component.Element.Attributes.Attributes construct", function( assert ) {

    let dom = $('<div class="class1 class2" id="id1 id2"></div>');
    let attribute = new Htme.Component.Element.Attributes.Attributes(dom);

    assert.equal(attribute.toString(), 'class="class1 class2" id="id1 id2"', "Passed!");
});
