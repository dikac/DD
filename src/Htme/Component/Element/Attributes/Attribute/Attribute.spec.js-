QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute construct undefined", function( assert ) {

    let dom = $('<div></div>');
    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    assert.equal(attribute.get(), undefined, "Passed!");
    assert.equal(attribute.toString(), '', "Passed!");
});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute construct empty", function( assert ) {

    let dom = $('<div class=""></div>');
    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    assert.equal(attribute.get(), '', "Passed!");
    assert.equal(attribute.toString(), '', "Passed!");
});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute construct set", function( assert ) {

    let dom = $('<div class="data"></div>');
    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    assert.equal(attribute.get(), 'data', "Passed!");
    assert.equal(attribute.toString(), 'data', "Passed!");
});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute set", function( assert ) {

    let dom = $('<div class="data"></div>');
    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    attribute.set('val1 val2 val3');

    assert.equal(attribute.get(), 'val1 val2 val3', "Passed!");
    assert.equal(attribute.toString(), 'val1 val2 val3', "Passed!");
});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute add", function( assert ) {

    let dom = $('<div class="data"></div>');
    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    attribute.add('val1 val2 val3');

    assert.equal(attribute.get(),'data val1 val2 val3', "Passed!");
    assert.equal(attribute.toString(),'data val1 val2 val3', "Passed!");
});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute add repeat", function( assert ) {

    let dom = $('<div class="data"></div>');
    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    for(let i = 0; i<10; i++) {

        attribute.add('data');

        assert.equal(attribute.get(),'data', "Passed!");
        assert.equal(attribute.toString(),'data', "Passed!");
    }

});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute get", function( assert ) {

    let dom = $('<div class="data1 data2 data3"></div>');
    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    assert.equal(attribute.get(), 'data1 data2 data3', "Passed!");
    assert.equal(attribute.toString(), 'data1 data2 data3', "Passed!");
});


QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute remove keep", function( assert ) {

    let dom = $('<div class="data1 data2 data3"></div>');

    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    attribute.delete('data1 data2 data3 val4', true);

    assert.equal(attribute.get(), '', "Passed!" );
    assert.equal(attribute.toString(), '', "Passed!" );
});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute construct remove", function( assert ) {

    let dom = $('<div class="data1 data2 data3 val4"></div>');

    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    attribute.delete('data5', false);
    assert.equal(attribute.get(), 'data1 data2 data3 val4', "Passed!" );
    assert.equal(attribute.toString(), 'data1 data2 data3 val4', "Passed!" );

    attribute.delete('data1', false);
    assert.equal(attribute.get(), 'data2 data3 val4', "Passed!" );
    assert.equal(attribute.toString(), 'data2 data3 val4', "Passed!" );

    attribute.delete('data2 data3', false);
    assert.equal(attribute.get(), 'val4', "Passed!" );
    assert.equal(attribute.toString(), 'val4', "Passed!" );

    attribute.delete('data5', false);
    assert.equal(attribute.get(), 'val4', "Passed!" );
    assert.equal(attribute.toString(), 'val4', "Passed!" );
});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute add remove", function( assert ) {

    let dom = $('<div></div>');

    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    attribute.add('data1');
    attribute.add('data2');
    attribute.add('data3');
    attribute.add('data4');

    attribute.delete('data5', false);
    assert.equal(attribute.get(), 'data1 data2 data3 data4', "Passed!" );
    assert.equal(attribute.toString(), 'data1 data2 data3 data4', "Passed!" );

    attribute.delete('data1', false);
    assert.equal(attribute.get(), 'data2 data3 data4', "Passed!" );
    assert.equal(attribute.toString(), 'data2 data3 data4', "Passed!" );

    attribute.delete('data2 data3', false);
    assert.equal(attribute.get(), 'data4', "Passed!" );
    assert.equal(attribute.toString(), 'data4', "Passed!" );

    attribute.delete('data5', false);
    assert.equal(attribute.get(), 'data4', "Passed!" );
    assert.equal(attribute.toString(), 'data4', "Passed!" );
});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute remove unkeep", function( assert ) {

    let dom = $('<div class="data1 data2 data3"></div>');

    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);
    attribute.delete('data1 data2 data3 val4', false);

    assert.equal(attribute.get(), undefined, "Passed!" );
    assert.equal(attribute.toString(), '', "Passed!" );
});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute clear unkeep", function( assert ) {

    let dom = $('<div class="data1 data2 data3"></div>');

    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);
    attribute.clear(false);

    assert.equal(attribute.get(), undefined, "Passed!" );
    assert.equal(attribute.toString(), '', "Passed!" );
});

QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute clear unkeep", function( assert ) {

    let dom = $('<div class="data1 data2 data3"></div>');

    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);
    attribute.clear(  false);

    assert.equal(attribute.get(), undefined, "Passed!" );
    assert.equal(attribute.toString(), '', "Passed!" );
});


QUnit.test( "Htme.Component.Element.Attributes.Attribute.Attribute iterator", function( assert ) {

    let dom = $('<div class="data1 data2 data3" id="dis"></div>');

    let attribute = new Htme.Component.Element.Attributes.Attribute.Attribute('class', dom);

    let expect = {
        "data1": "data1",
        "data2": "data2",
        "data3": "data3"
    };
    let actual = {};

    attribute.forEach(function (v) {
        actual[v] = v;
    });

    assert.propEqual( actual, expect, "Passed!" );
});