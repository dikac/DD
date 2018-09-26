class DDRowPanel extends DDViewAbstract {

    constructor() {

        super();
        this.attributes['class'] = ['glyphicon glyphicon-unchecked btn btn-default btn-xs'];
        this.attributes['title'] = ['row'];
    }

    inner() {
        return '';
    }
}


DD.document.panels['row'] = (new DDRowPanel).render();

DD.update.events['row'] = function () {

    $(DDRowPanel.selector()).off('click').click(function (e) {

        console.log(this);
    });
};