(function () {

    var increment = 0;
    var hidden = {};

    let element = new HtmeComponentElement();

    let click = new HtmeComponentClick('HtmeShowHide', function(e) {

        let click = $(e.target);
        let container = HtmeComponentBlock.binding().selectFromChildren(click);

        let children = container.children().not(HtmeComponentPanel.binding().selector(true));

        if(click.html() === 'Show') {

            click.html('Hide');

            children.each(function (k, v) {

               for(let kh in hidden) {

                   console.log(v === hidden[kh]);

                   if(v === hidden[kh]) {

                       $(v).removeClass('htmeSHHide');

                       delete hidden[kh];
                   }
               }
            })

        } else {

            click.html('Show');

            children.each(function (k, v) {

                $(v).addClass('htmeSHHide');

                while(increment in hidden) {
                    increment++;
                }

                hidden[increment] = v;
            });
        }

    },element);

    element.content = 'Hide';
    // style
    element.attribute().get('class').add('htmeItem');

    HtmeContainer.panel().menu('window').submenus['show/hide'] = click;
    HtmeContent.panel().menu('window').submenus['show/hide'] = click;

    Htme.render.handlers['show/hide'] = function () {

        for(let k in hidden) {

            $(hidden[k]).removeClass('htmeSHHide');
        }
    };

    Htme.edit.handlers['show/hide'] = function () {

        for(let k in hidden) {

            $(hidden[k]).addClass('htmeSHHide');
        }
    };

})();
