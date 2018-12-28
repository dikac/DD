QUnit.test( "Htme.Component.Map_.MapString construct", function( assert ) {

    let string = 'z-index:1;padding:20px;';
    let map = new Htme.Component.Map_.MapString(string, ':', ';');

    assert.equal(map.get('z-index'), '1', "Passed!");
    assert.equal(map.get('padding'), '20px', "Passed!");
    assert.equal(map.toString(), 'z-index:1;padding:20px', "Passed!");

});

QUnit.test( "Htme.Component.Map_.MapString set", function( assert ) {

    let map = new Htme.Component.Map_.MapString('', ':', ';');

    map.set('z-index', '1');
    map.set('padding', '20px');

    assert.equal(map.get('z-index'), '1', "Passed!");
    assert.equal(map.get('padding'), '20px', "Passed!");
    assert.equal(map.toString(), 'z-index:1;padding:20px', "Passed!");

    map.set('z-index', '99');
    assert.equal(map.get('z-index'), '99', "Passed!");
    assert.equal(map.toString(), 'z-index:99;padding:20px', "Passed!");
});


