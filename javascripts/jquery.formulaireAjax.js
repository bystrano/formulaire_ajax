/* jshint strict: true, undef: true, unused: true, curly: true,
   eqeqeq: true, freeze: true, funcscope: true, futurehostile: true,
   nonbsp: true */
/* globals ajaxReload, window, jQuery */

(function ($) {
    "use strict";

    $.fn.formulaireAjax = function (options) {

        var config, form, champs, timer;

        form = $(this);

        // Options par défaut
        config = $.extend(true, {
            // Un tableau de noms ajax de <INCLURE>
            blocsAjax: [],
            // soumettre automatiquement le formulaire dès qu'une
            // valeur change
            autoSubmit: true,
            // permet de changer le format de date renvoyé par les
            // saisies date
            //
            // 'request' permet de recupérer la date au format
            //           habituel renvoyé par la fonction _request.
            // 'datetime' permet d'avoir la date au format datetime
            //            valeur par défaut pour pouvoir passer dans
            //            des urls et l'utiliser directement dans des
            //            critères de boucles.
            formatDate: 'datetime',
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
                checkbox_mots: function (champ) {
                    var inputs = $(champ).find('input'),
                        valeur = [];

                    inputs.each(function () {
                        if ($(this).attr('checked') === 'checked') {
                            valeur.push($(this).attr('value'));
                        }
                    });

                    return valeur;
                },
                checkbox_mots_arborescents: function (champ) {
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
                },
                selection_multiple: function (champ) {
                    var valeur = null;

                    $(champ).find('option').each(function () {
                        if ($(this).attr('selected') === 'selected') {
                            if ( ! valeur) { valeur = []; }
                            valeur.push($(this).attr('value'));
                        }
                    });

                    return valeur;
                },
                selection_multiple_mots: function (champ) {
                    var valeur = null;

                    $(champ).find('option').each(function () {
                        if ($(this).attr('selected') === 'selected') {
                            if ( ! valeur) { valeur = []; }
                            valeur.push($(this).attr('value'));
                        }
                    });

                    return valeur;
                },
                date: function (champ) {
                    var valeur = {},
                        inputs = $(champ).find('input'),
                        horaire = (inputs.length === 2);

                    if ( ! horaire) {
                        valeur = inputs.attr('value');

                        if (config.formatDate === 'request') {
                            return valeur;
                        } else {
                            return valeur.replace('/','-','g');
                        }

                    } else {
                        inputs.each(function () {
                            if ($(this).hasClass('date')) {
                                valeur.date = $(this).attr('value');
                            } else if ($(this).hasClass('heure')) {
                                valeur.heure = $(this).attr('value');
                            }
                        });

                        if (config.formatDate === 'request') {
                            return valeur;
                        } else {
                            return valeur.date.replace('/','-','g') + ' ' +
                                valeur.heure + ':00';
                        }
                    }
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
        };

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
        };


        // s'il n'y a pas de blocs ajax on ne fait rien
        if (config.blocsAjax.length === 0) {
            return form;
        }

        // On ajaxifie le formulaire
        form
            .unbind('submit')
            .submit(function (e) {
                e.preventDefault();

                function rechargerBlocs () {
                    for (var i in config.blocsAjax) {
                        ajaxReload(config.blocsAjax[i], {
                            args: form.valeurs(),
                            history: true
                        });
                    }
                }
                /* On ne fait pas la requête ajax tout de suite, pour
                   éviter d'en faire plein quand on tape vite */
                window.clearTimeout(timer);
                timer = window.setTimeout(rechargerBlocs, 50);
            });

        if (config.autoSubmit) {
            // On soumet automatiquement le formulaire dès que quelque
            // chose change
            form
                .find('input')
                // les inputs de type text n'émettent pas de 'change'
                // lors de la frappe
                .keyup(function () {
                    form.submit();
                })
                // pour les autres saisies on se fie à change
                .change(function (e) {
                    if (((e.target.type !== 'text') &&
                         (e.target.type !== 'search') &&
                         (e.target.type !== 'email')) ||
                        /* Les datepicker sont de type 'text', mais
                           sont un cas spécial */
                        ($(e.target).hasClass('datePicker'))) {

                        form.submit();
                    }
                });

            form
                .find('select')
                .change(function () {
                    form.submit();
                });

            // … du coup on a plus besoin du bouton
            form.find('.boutons').remove();
        }

        return form;
    };
}(jQuery));
