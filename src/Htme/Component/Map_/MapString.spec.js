QUnit.test( "Htme.Component.Map_.MapString construct", function( assert ) {


    let string = new Htme.Component.Map_.MapString('z-index:1;padding:20ox;', ':', ';');

    assert.equal(string.get('z-index'), '1', "Passed!");
    assert.equal(string.get('padding'), '20ox', "Passed!");

});


