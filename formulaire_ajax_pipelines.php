<?php
/**
 * Utilisations de pipelines par jQuery Formulaires SPIP
 *
 * @plugin     jQuery Formulaires SPIP
 * @copyright  2015
 * @author     Michel
 * @licence    GNU/GPL
 * @package    SPIP\formulaire_ajax\Pipelines
 */

if (!defined('_ECRIRE_INC_VERSION')) return;

/**
 * Inclure le plugin jQuery formulaireAjax
 *
 * @pipeline jquery_plugins
 * @param  array $scripts Liste des plugins jQuery
 * @return array          Données du pipeline
 */
function formulaire_ajax_jquery_plugins ($scripts) {

    $scripts[] = "javascripts/jquery.formulaireAjax.js";

    return $scripts;
}