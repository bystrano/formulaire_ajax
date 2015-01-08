(function ($) {
    $.fn.formulairesAjax = function (options) {

        var config, form;

        config = $.extend({
            // Options par défaut
            blocsAjax: [] // Un tableau de noms ajax de <INCLURE>
        }, options);

        // retourne un objet contenant les valeurs des saisies du
        // formulaire
        this.valeurs = function () {
            return 'TODO retourner les valeurs du formulaire';
        }

        // s'il n'y a pas de blocs ajax on ne fait rien
        if (config.blocsAjax.length === 0) {
            return this;
        }

        // TODO ajaxifier le formulaire

        return this;
    };
}(jQuery));
