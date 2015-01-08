<?php
/**
 * Utilisations de pipelines par jQuery Formulaires SPIP
 *
 * @plugin     jQuery Formulaires SPIP
 * @copyright  2015
 * @author     Michel
 * @licence    GNU/GPL
 * @package    SPIP\Formulaires_ajax\Pipelines
 */

if (!defined('_ECRIRE_INC_VERSION')) return;

/**
 * Inclure le plugin jQuery formulairesAjax
 *
 * @pipeline jquery_plugins
 * @param  array $scripts Liste des plugins jQuery
 * @return array          Données du pipeline
 */
function formulaires_ajax_jquery_plugins ($scripts) {

    $scripts[] = "javascripts/jquery.formulairesAjax.js";

    return $scripts;
}