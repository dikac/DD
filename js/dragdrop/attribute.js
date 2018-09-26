(function () {

    var classes = {
        bind : 'ddAttribute',
        style : 'glyphicon glyphicon-console',
    };

    DragDrop.control.views['attribute'] = function () {

        return DragDrop.control.view([classes.style, classes.bind], 'edit attribute');
    };

    DragDrop.new.events['attribute'] = function () {

        $('.' + classes.bind).off('click').click(function (e) {



        });
    };

})();







