<?php

/**
 * Saisies du formulaire de test pour formulaire_ajax
 *
 * @return array
 *     Tableau des saisies du formulaire
 */
function formulaires_tester_formulaire_ajax_saisies_dist () {

    $saisies = array(
        array(
            'saisie' => 'input',
            'options' => array(
                'nom' => 'test_input',
            ),
        ),
    );

    return $saisies;
}

/**
 * Chargement du formulaire de test pour formulaire_ajax
 *
 * Déclarer les champs postés et y intégrer les valeurs par défaut
 *
 * @return array
 *     Environnement du formulaire
 */
function formulaires_tester_formulaire_ajax_charger_dist () {

    $valeurs = array(
        'test_input' => 'metaphoneme',
    );

    return $valeurs;
}
