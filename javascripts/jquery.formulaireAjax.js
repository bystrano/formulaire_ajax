(function ($) {
    $.fn.formulaireAjax = function (options) {

        var config, form, champs;

        form = $(this);

        config = $.extend(true, {
            // Options par défaut
            blocsAjax: [], // Un tableau de noms ajax de <INCLURE>
            // soumettre automatiquement le formulaire dès qu'une
            // valeur change
            autoSubmit: true,
            // Donne des fonctions pour trouver la valeur d'une saisie
            calculValeurSaisie: {
                defaut: function (champ) {
                    return $(champ).find('input').attr('value');
                },
                case: function (champ) {
                    var input = $(champ).find('input[type="checkbox"]');

                    return (input.attr('checked') === 'checked') ? 'on' : '';
                },
                checkbox: function (champ) {
                    var inputs = $(champ).find('input'),
                        valeur = [];

                    inputs.each(function () {
                        if ($(this).attr('checked') === 'checked') {
                            valeur.push($(this).attr('value'));
                        }
                    });

                    return valeur;
                },
                radio: function (champ) {
                    var valeur = null;

                    $(champ).find('input').each(function () {
                        if ($(this).attr('checked') === 'checked') {
                            valeur = $(this).attr('value');
                        }
                    });

                    return valeur;
                },
                oui_non: function (champ) {
                    var valeur = '';

                    $(champ).find('input').each(function () {
                        if ($(this).attr('checked') === 'checked') {
                            valeur = $(this).attr('value');
                        }
                    });

                    return valeur;
                },
                textarea: function (champ) {
                    return $(champ).find('textarea').html();
                },
                selection: function (champ) {
                    var valeur = '';

                    $(champ).find('option').each(function () {
                        if ($(this).attr('selected') === 'selected') {
                            valeur = $(this).attr('value');
                        }
                    });

                    return valeur;
                }
            }
        }, options);

        // Retourne une fonction qui calcule la valeur d'un type de
        // saisie donné
        form.calcul_valeur = function (type_saisie) {

            if (config.calculValeurSaisie.hasOwnProperty(type_saisie)) {
                return config.calculValeurSaisie[type_saisie];
            }

            return config.calculValeurSaisie.defaut;
        }

        // retourne un objet contenant les valeurs des saisies du
        // formulaire
        form.valeurs = function () {
            var valeurs = {};

            champs = form.find('.editer');

            champs.each(function () {
                var type_saisie = this.className.replace(/^.*saisie_([^ ]+).*$/,'$1'),
                    nom_saisie = this.className.replace(/^.*editer_([^ ]+).*$/,'$1');

                valeurs[nom_saisie] = (form.calcul_valeur(type_saisie))(this);
            });

            return valeurs;
        }


        // s'il n'y a pas de blocs ajax on ne fait rien
        if (config.blocsAjax.length === 0) {
            return form;
        }

        // On ajaxifie le formulaire
        form
            .unbind('submit')
            .submit(function (e) {
                e.preventDefault();
                for (var i in config.blocsAjax) {
                    ajaxReload(config.blocsAjax[i], {
                        args: form.valeurs(),
                        history: true
                    });
                }
            });

        if (config.autoSubmit) {
            // On soumet automatiquement le formulaire dès que quelque
            // chose change
            form
                .find('input')
                .change(function (e) {
                    form.submit();
                })
                // les inputs n'émettent pas de 'change' lors de la
                // frappe
                .keyup(function () {
                    form.submit();
                });

            // … du coup on a plus besoin du bouton
            form.find('.boutons').remove();
        }

        return form;
    };
}(jQuery));
