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
        array(
            'saisie' => 'checkbox',
            'options' => array(
                'nom' => 'test_checkbox',
                'datas' => array(
                    1 => "1",
                    2 => "2",
                    3 => "3",
                    4 => "4",
                ),
            ),
        ),
        array(
            'saisie' => 'case',
            'options' => array(
                'nom' => 'test_case_oui',
            ),
        ),
        array(
            'saisie' => 'case',
            'options' => array(
                'nom' => 'test_case_non',
            ),
        ),
        array(
            'saisie' => 'hidden',
            'options' => array(
                'nom' => 'test_hidden',
            ),
        ),
        array(
            'saisie' => 'explication',
            'options' => array(
                'nom' => 'test_explication',
                'texte' => 'Ceci est un formulaire de test',
            ),
        ),
        array(
            'saisie' => 'fieldset',
            'options' => array(
                'nom' => 'test_fieldset',
            ),
            'saisies' => array(
                array(
                    'saisie' => 'input',
                    'options' => array(
                        'nom' => 'test_input_dans_fieldset',
                    ),
                ),
            ),
        ),
        array(
            'saisie' => 'oui_non',
            'options' => array(
                'nom' => 'test_oui_non_oui',
            ),
        ),
        array(
            'saisie' => 'oui_non',
            'options' => array(
                'nom' => 'test_oui_non_non',
            ),
        ),
        array(
            'saisie' => 'radio',
            'options' => array(
                'nom' => 'test_radio_vide',
                'datas' => array(
                    1 => "un",
                    2 => "deux",
                    3 => "trois",
                    4 => "quatre",
                ),
            ),
        ),
        array(
            'saisie' => 'radio',
            'options' => array(
                'nom' => 'test_radio',
                'datas' => array(
                    1 => "un",
                    2 => "deux",
                    3 => "trois",
                    4 => "quatre",
                ),
            ),
        ),
        array(
            'saisie' => 'textarea',
            'options' => array(
                'nom' => 'test_textarea',
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
        'test_checkbox' => array(1,4),
        'test_case_oui' => 'on',
        'test_hidden' => "You'll never find me !",
        'test_input_dans_fieldset' => 'on met le brun',
        'test_oui_non_oui' => 'on',
        'test_oui_non_non' => '',
        'test_radio' => '2',
        'test_textarea' => 'Lorem Ipsum etc…',
    );

    return $valeurs;
}