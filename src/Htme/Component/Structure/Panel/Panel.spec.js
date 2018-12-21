QUnit.test( "Htme.Component.Structure construct", function( assert ) {

    let dom = $(`<div></div>`);
    let element = new Htme.Component.Structure.Panel(dom);

    assert.equal(dom.html(), '<div class="HtmePanelName">{name}</div>',"Passed!");

    assert.equal(element.toString(), '<div class="HtmePanel"><div class="HtmePanelName">{name}</div></div>', "Passed!");

    assert.equal(element.name, '{name}',"Passed!");
});


QUnit.test( "Htme.Component.Structure set name", function( assert ) {

    let dom = $(`<div></div>`);
    let element = new Htme.Component.Structure.Panel(dom);

    assert.equal(dom.html(), '<div class="HtmePanelName">{name}</div>',"Passed!");
    assert.equal(element.toString(), '<div class="HtmePanel"><div class="HtmePanelName">{name}</div></div>', "Passed!");
    assert.equal(element.name, '{name}',"Passed!");

    element.name = 'Content';

    assert.equal(dom.html(), '<div class="HtmePanelName">Content</div>',"Passed!");
    assert.equal(element.toString(), '<div class="HtmePanel"><div class="HtmePanelName">Content</div></div>', "Passed!");
    assert.equal(element.name, 'Content',"Passed!");
});

QUnit.test( "Htme.Component.Structure add panel", function( assert ) {

    let dom = $(`<div></div>`);
    let element = new Htme.Component.Structure.Panel(dom);

    // inner of panel html from jQuery
    assert.equal(dom.html(), '<div class="HtmePanelName">{name}</div>',"Passed!");
    assert.equal(element.toString(), '<div class="HtmePanel"><div class="HtmePanelName">{name}</div></div>', "Passed!");
    assert.equal(element.name, '{name}',"Passed!");

    element.append(new Htme.Component.Structure.Menu());

    assert.equal(dom.html(),
        '<div class="HtmePanelName">{name}</div>'+
        '<div class="HtmeMenu"></div>'
        ,"Passed!");

    assert.equal(element.toString(), '' +
        '<div class="HtmePanel">' +
            '<div class="HtmePanelName">{name}</div>' +
            '<div class="HtmeMenu"></div>' +
        '</div>', "Passed!");


    element.name = 'Container';
    assert.equal(element.name, 'Container',"Passed!");

    assert.equal(element.toString(), '' +
        '<div class="HtmePanel">' +
        '<div class="HtmePanelName">Container</div>' +
        '<div class="HtmeMenu"></div>' +
        '</div>', "Passed!");
});