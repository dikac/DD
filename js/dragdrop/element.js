(function () {

    var classes = {
        bind : 'ddAttribute',
        style : 'glyphicon glyphicon-remove',
    };

    DragDrop.control.views['attribute'] = function () {

        return DragDrop.control.view([classes.style, classes.bind]);
    };

    DragDrop.new.events['attribute'] = function () {

        $('.' + classes.bind).off('click').click(function (e) {

            $(this).parent().parent().remove();

        });
    };

})();







