<?php
/**
 * Plugin Name: IncanTour - Custom Trip Form & ACF Integration (Disegna il Tuo Viaggio)
 * Description: Registra il Custom Post Type "Viaggi su Misura", il gruppo campi ACF, le colonne nel pannello di amministrazione e l'endpoint REST API per ricevere le richieste da Next.js.
 * Version: 1.0.0
 * Author: IncanTour Tech
 * 
 * ISTRUZIONI PER L'USO:
 * 1. Nel pannello di WordPress, vai su "Snippet" -> "Aggiungi nuovo" (Code Snippets).
 * 2. Incolla l'intero contenuto di questo file nello snippet.
 * 3. Seleziona l'opzione "Esegui lo snippet ovunque" (Run snippet everywhere).
 * 4. Fai clic su "Salva modifiche e attiva".
 * 5. Troverai una nuova voce "Viaggi su Misura" nella barra laterale sinistra di WordPress con tutte le richieste ricevute!
 */

if (!defined('ABSPATH')) {
    exit; // Sicurezza: impedisce l'accesso diretto
}

/* ==========================================================================
   1. REGISTRAZIONE CUSTOM POST TYPE "custom_trip_request"
   ========================================================================== */
function incantour_register_custom_trip_cpt() {
    $labels = array(
        'name'                  => _x('Viaggi su Misura', 'Post type general name', 'incantour'),
        'singular_name'         => _x('Richiesta Viaggio', 'Post type singular name', 'incantour'),
        'menu_name'             => _x('Viaggi su Misura', 'Admin Menu text', 'incantour'),
        'name_admin_bar'        => _x('Richiesta Viaggio', 'Add New on Toolbar', 'incantour'),
        'add_new'               => __('Aggiungi Richiesta', 'incantour'),
        'add_new_item'          => __('Aggiungi Nuova Richiesta Viaggio', 'incantour'),
        'new_item'              => __('Nuova Richiesta', 'incantour'),
        'edit_item'             => __('Dettagli Richiesta Viaggio', 'incantour'),
        'view_item'             => __('Visualizza Richiesta', 'incantour'),
        'all_items'             => __('Tutte le Richieste', 'incantour'),
        'search_items'          => __('Cerca Richieste', 'incantour'),
        'not_found'             => __('Nessuna richiesta trovata.', 'incantour'),
        'not_found_in_trash'    => __('Nessuna richiesta nel cestino.', 'incantour'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => false,
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => false,
        'rewrite'            => false,
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 26,
        'menu_icon'          => 'dashicons-palmtree',
        'supports'           => array('title', 'custom-fields'),
        'show_in_rest'       => true,
    );

    register_post_type('custom_trip_request', $args);
}
add_action('init', 'incantour_register_custom_trip_cpt');

/* ==========================================================================
   2. REGISTRAZIONE GRUPPO CAMPI ACF (Advanced Custom Fields)
   ========================================================================== */
add_action('acf/init', function() {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    acf_add_local_field_group(array(
        'key' => 'group_incantour_custom_trip',
        'title' => 'Dettagli Richiesta Viaggio su Misura',
        'fields' => array(
            // TAB 1: DATI PERSONALI
            array(
                'key' => 'field_ct_tab_anagrafica',
                'label' => 'Anagrafica & Richiedente',
                'name' => '',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ),
            array(
                'key' => 'field_ct_trip_type',
                'label' => 'Tipologia Flusso',
                'name' => 'trip_type',
                'type' => 'select',
                'choices' => array(
                    'incoming' => 'INCOMING (Campania / Italia)',
                    'outgoing' => 'OUTGOING (Mondo / Estero)',
                ),
                'wrapper' => array('width' => '33'),
            ),
            array(
                'key' => 'field_ct_first_name',
                'label' => 'Nome',
                'name' => 'first_name',
                'type' => 'text',
                'wrapper' => array('width' => '33'),
            ),
            array(
                'key' => 'field_ct_last_name',
                'label' => 'Cognome',
                'name' => 'last_name',
                'type' => 'text',
                'wrapper' => array('width' => '33'),
            ),
            array(
                'key' => 'field_ct_email',
                'label' => 'E-mail',
                'name' => 'email',
                'type' => 'email',
                'wrapper' => array('width' => '33'),
            ),
            array(
                'key' => 'field_ct_phone',
                'label' => 'Telefono',
                'name' => 'phone',
                'type' => 'text',
                'wrapper' => array('width' => '33'),
            ),
            array(
                'key' => 'field_ct_city',
                'label' => 'Città',
                'name' => 'city',
                'type' => 'text',
                'wrapper' => array('width' => '34'),
            ),
            array(
                'key' => 'field_ct_address',
                'label' => 'Indirizzo Completo',
                'name' => 'address',
                'type' => 'text',
                'wrapper' => array('width' => '100'),
            ),

            // TAB 2: DETTAGLI VIAGGIO & TRASPORTI
            array(
                'key' => 'field_ct_tab_dettagli',
                'label' => 'Attese, Date & Trasporti',
                'name' => '',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ),
            array(
                'key' => 'field_ct_travel_expectations',
                'label' => 'Attese di Viaggio / Periodo',
                'name' => 'travel_expectations',
                'type' => 'text',
                'wrapper' => array('width' => '50'),
            ),
            array(
                'key' => 'field_ct_travel_type',
                'label' => 'Tipo di Viaggio (Pacchetto / Volo / ecc)',
                'name' => 'travel_type',
                'type' => 'text',
                'wrapper' => array('width' => '50'),
            ),
            array(
                'key' => 'field_ct_date_start',
                'label' => 'Data Inizio / Dal',
                'name' => 'date_start',
                'type' => 'date_picker',
                'display_format' => 'd/m/Y',
                'return_format' => 'Y-m-d',
                'wrapper' => array('width' => '50'),
            ),
            array(
                'key' => 'field_ct_date_end',
                'label' => 'Data Fine / Al',
                'name' => 'date_end',
                'type' => 'date_picker',
                'display_format' => 'd/m/Y',
                'return_format' => 'Y-m-d',
                'wrapper' => array('width' => '50'),
            ),
            array(
                'key' => 'field_ct_departure_city',
                'label' => 'Città di Partenza (Da dove parti?)',
                'name' => 'departure_city',
                'type' => 'text',
                'wrapper' => array('width' => '50'),
            ),
            array(
                'key' => 'field_ct_transport_mode',
                'label' => 'Mezzo di Trasporto (Come vuoi arrivare?)',
                'name' => 'transport_mode',
                'type' => 'text',
                'wrapper' => array('width' => '50'),
            ),

            // TAB 3: DESTINAZIONE & PREFERENZE
            array(
                'key' => 'field_ct_tab_destinazione',
                'label' => 'Destinazione & Preferenze',
                'name' => '',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ),
            array(
                'key' => 'field_ct_destination',
                'label' => 'Destinazione Scelta',
                'name' => 'destination',
                'type' => 'text',
                'wrapper' => array('width' => '50'),
            ),
            array(
                'key' => 'field_ct_other_destination_text',
                'label' => 'Destinazione Altro (Dettagli)',
                'name' => 'other_destination_text',
                'type' => 'text',
                'wrapper' => array('width' => '50'),
            ),
            array(
                'key' => 'field_ct_preferences',
                'label' => 'Preferenze Itinerario',
                'name' => 'preferences',
                'type' => 'textarea',
                'rows' => 3,
                'wrapper' => array('width' => '50'),
            ),
            array(
                'key' => 'field_ct_other_preferences_notes',
                'label' => 'Altre Proposte / Desideri Specifici',
                'name' => 'other_preferences_notes',
                'type' => 'textarea',
                'rows' => 3,
                'wrapper' => array('width' => '50'),
            ),

            // TAB 4: SOGGIORNO & BUDGET (OUTGOING)
            array(
                'key' => 'field_ct_tab_budget',
                'label' => 'Soggiorno & Budget (Outgoing)',
                'name' => '',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ),
            array(
                'key' => 'field_ct_accommodation',
                'label' => 'Dove vuoi dormire? (Alloggio)',
                'name' => 'accommodation',
                'type' => 'text',
                'wrapper' => array('width' => '50'),
            ),
            array(
                'key' => 'field_ct_when_option',
                'label' => 'Quando? (Opzione Scelta)',
                'name' => 'when_option',
                'type' => 'text',
                'wrapper' => array('width' => '50'),
            ),
            array(
                'key' => 'field_ct_budget_type',
                'label' => 'Tipo Budget',
                'name' => 'budget_type',
                'type' => 'text',
                'wrapper' => array('width' => '33'),
            ),
            array(
                'key' => 'field_ct_budget_min',
                'label' => 'Budget Minimo (€)',
                'name' => 'budget_min',
                'type' => 'number',
                'wrapper' => array('width' => '33'),
            ),
            array(
                'key' => 'field_ct_budget_max',
                'label' => 'Budget Massimo / Più di (€)',
                'name' => 'budget_max',
                'type' => 'number',
                'wrapper' => array('width' => '34'),
            ),

            // TAB 5: PRIVACY & NOTE
            array(
                'key' => 'field_ct_tab_privacy',
                'label' => 'Note & Privacy',
                'name' => '',
                'type' => 'tab',
                'placement' => 'top',
                'endpoint' => 0,
            ),
            array(
                'key' => 'field_ct_notes',
                'label' => 'Note Aggiuntive Cliente',
                'name' => 'notes',
                'type' => 'textarea',
                'rows' => 4,
            ),
            array(
                'key' => 'field_ct_privacy',
                'label' => 'Consenso Privacy Accettato',
                'name' => 'privacy_accepted',
                'type' => 'true_false',
                'ui' => 1,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'custom_trip_request',
                ),
            ),
        ),
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ));
});

/* ==========================================================================
   3. COLONNE PERSONALIZZATE NELLA LISTA RICHIESTE DEL PANNELLO WP
   ========================================================================== */
add_filter('manage_custom_trip_request_posts_columns', function($columns) {
    $new_columns = array(
        'cb'           => $columns['cb'],
        'title'        => 'Richiedente',
        'trip_type'    => 'Tipo Viaggio',
        'contact'      => 'Contatti (Email / Tel)',
        'destination'  => 'Destinazione',
        'when_period'  => 'Periodo / Quando',
        'budget'       => 'Budget',
        'date'         => 'Data Ricezione',
    );
    return $new_columns;
});

add_action('manage_custom_trip_request_posts_custom_column', function($column, $post_id) {
    switch ($column) {
        case 'trip_type':
            $type = get_post_meta($post_id, 'trip_type', true);
            if ($type === 'outgoing') {
                echo '<span style="background:#0284c7;color:#fff;font-weight:700;font-size:11px;padding:3px 8px;border-radius:12px;text-transform:uppercase;">OUTGOING</span>';
            } else {
                echo '<span style="background:#0d9488;color:#fff;font-weight:700;font-size:11px;padding:3px 8px;border-radius:12px;text-transform:uppercase;">INCOMING</span>';
            }
            break;

        case 'contact':
            $email = get_post_meta($post_id, 'email', true);
            $phone = get_post_meta($post_id, 'phone', true);
            $city  = get_post_meta($post_id, 'city', true);
            if ($email) {
                echo '<div><a href="mailto:' . esc_attr($email) . '">✉️ ' . esc_html($email) . '</a></div>';
            }
            if ($phone) {
                echo '<div><a href="tel:' . esc_attr($phone) . '">📞 ' . esc_html($phone) . '</a></div>';
            }
            if ($city) {
                echo '<div style="color:#666;font-size:12px;">📍 ' . esc_html($city) . '</div>';
            }
            break;

        case 'destination':
            $dest = get_post_meta($post_id, 'destination', true);
            $other = get_post_meta($post_id, 'other_destination_text', true);
            echo '<strong>' . esc_html($dest ? $dest : '—') . '</strong>';
            if ($other) {
                echo '<br><small style="color:#666;">(' . esc_html($other) . ')</small>';
            }
            break;

        case 'when_period':
            $expectations = get_post_meta($post_id, 'travel_expectations', true);
            $start = get_post_meta($post_id, 'date_start', true);
            $end = get_post_meta($post_id, 'date_end', true);
            $when = get_post_meta($post_id, 'when_option', true);
            
            $text = $when ? $when : $expectations;
            echo esc_html($text ? $text : '—');
            if ($start) {
                echo '<br><small style="color:#666;">' . esc_html($start) . ($end ? ' &rarr; ' . esc_html($end) : '') . '</small>';
            }
            break;

        case 'budget':
            $b_type = get_post_meta($post_id, 'budget_type', true);
            $b_more = get_post_meta($post_id, 'budget_more_than', true);
            $b_min  = get_post_meta($post_id, 'budget_min', true);
            $b_max  = get_post_meta($post_id, 'budget_max', true);

            if ($b_type === 'more_than' && $b_more) {
                echo '> €' . number_format_i18n($b_more);
            } elseif ($b_min || $b_max) {
                echo '€' . number_format_i18n($b_min) . ' - €' . number_format_i18n($b_max);
            } else {
                echo '—';
            }
            break;
    }
}, 10, 2);

/* ==========================================================================
   4. META BOX FALLBACK (VISIBILE ANCHE SE ACF È DISATTIVATO)
   ========================================================================== */
add_action('add_meta_boxes', function() {
    add_meta_box(
        'incantour_custom_trip_summary_box',
        'Riepilogo Scheda Viaggio su Misura',
        'incantour_render_trip_summary_meta_box',
        'custom_trip_request',
        'normal',
        'high'
    );
});

function incantour_render_trip_summary_meta_box($post) {
    $meta = get_post_custom($post->ID);
    $get = function($key) use ($meta) {
        return isset($meta[$key][0]) ? maybe_unserialize($meta[$key][0]) : '';
    };

    $trip_type = $get('trip_type');
    $first_name = $get('first_name');
    $last_name = $get('last_name');
    $email = $get('email');
    $phone = $get('phone');
    $address = $get('address');
    $city = $get('city');

    $expectations = $get('travel_expectations');
    $travel_type = $get('travel_type');
    $date_start = $get('date_start');
    $date_end = $get('date_end');
    $departure_city = $get('departure_city');
    $transport_mode = $get('transport_mode');

    $destination = $get('destination');
    $other_dest = $get('other_destination_text');
    $preferences = $get('preferences');
    $other_preferences = $get('other_preferences_notes');

    $accommodation = $get('accommodation');
    $when_option = $get('when_option');
    $budget_type = $get('budget_type');
    $budget_more = $get('budget_more_than');
    $budget_min = $get('budget_min');
    $budget_max = $get('budget_max');
    $notes = $get('notes');
    ?>
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; font-size: 14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:#1b5e5f; color:#fff; padding:16px 20px; border-radius:8px; margin-bottom:20px;">
            <div>
                <h2 style="margin:0; font-size:18px; color:#fff;">
                    Richiesta Viaggio: <?php echo esc_html($first_name . ' ' . $last_name); ?>
                </h2>
                <div style="margin-top:4px; font-size:13px; color:#e6a532;">
                    Ricevuta il <?php echo get_the_date('d/m/Y \a\l\l\e H:i', $post->ID); ?>
                </div>
            </div>
            <div>
                <?php if ($trip_type === 'outgoing'): ?>
                    <span style="background:#0284c7; color:#fff; padding:6px 14px; border-radius:20px; font-weight:bold; font-size:12px; letter-spacing:0.5px;">OUTGOING (MONDO)</span>
                <?php else: ?>
                    <span style="background:#10b981; color:#fff; padding:6px 14px; border-radius:20px; font-weight:bold; font-size:12px; letter-spacing:0.5px;">INCOMING (CAMPANIA/ITALIA)</span>
                <?php endif; ?>
            </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin-bottom:20px;">
            <!-- Contatti -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px;">
                <h3 style="margin-top:0; border-bottom:2px solid #e6a532; padding-bottom:6px; color:#1b5e5f; font-size:15px;">👤 Dati Richiedente</h3>
                <p><strong>Nome:</strong> <?php echo esc_html($first_name . ' ' . $last_name); ?></p>
                <p><strong>Email:</strong> <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a></p>
                <p><strong>Telefono:</strong> <a href="tel:<?php echo esc_attr($phone); ?>"><?php echo esc_html($phone); ?></a></p>
                <p><strong>Città:</strong> <?php echo esc_html($city ?: '—'); ?></p>
                <p><strong>Indirizzo:</strong> <?php echo esc_html($address ?: '—'); ?></p>
            </div>

            <!-- Viaggio & Trasporti -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px;">
                <h3 style="margin-top:0; border-bottom:2px solid #e6a532; padding-bottom:6px; color:#1b5e5f; font-size:15px;">✈️ Viaggio & Mezzi</h3>
                <p><strong>Attese di Viaggio:</strong> <?php echo esc_html($expectations ?: ($when_option ?: '—')); ?></p>
                <?php if ($date_start): ?>
                    <p><strong>Date richieste:</strong> Dal <?php echo esc_html($date_start); ?> al <?php echo esc_html($date_end ?: '...'); ?></p>
                <?php endif; ?>
                <p><strong>Tipologia:</strong> <?php echo esc_html($travel_type ?: '—'); ?></p>
                <p><strong>Partenza da:</strong> <?php echo esc_html($departure_city ?: '—'); ?></p>
                <p><strong>Mezzo di arrivo:</strong> <?php echo esc_html($transport_mode ?: '—'); ?></p>
            </div>

            <!-- Destinazione & Esperienza -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px;">
                <h3 style="margin-top:0; border-bottom:2px solid #e6a532; padding-bottom:6px; color:#1b5e5f; font-size:15px;">📍 Destinazione & Gusti</h3>
                <p><strong>Destinazione:</strong> <span style="color:#b45309; font-weight:bold;"><?php echo esc_html($destination ?: '—'); ?></span></p>
                <?php if ($other_dest): ?>
                    <p><strong>Specifica Destinazione:</strong> <?php echo esc_html($other_dest); ?></p>
                <?php endif; ?>
                <p><strong>Preferenze:</strong> <?php echo esc_html(is_array($preferences) ? implode(', ', $preferences) : ($preferences ?: '—')); ?></p>
                <?php if ($other_preferences): ?>
                    <p><strong>Altre Proposte:</strong> <?php echo esc_html($other_preferences); ?></p>
                <?php endif; ?>
            </div>

            <?php if ($trip_type === 'outgoing'): ?>
            <!-- Alloggio & Budget (Outgoing) -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px;">
                <h3 style="margin-top:0; border-bottom:2px solid #e6a532; padding-bottom:6px; color:#1b5e5f; font-size:15px;">🏨 Alloggio & Budget</h3>
                <p><strong>Dove vuole dormire:</strong> <?php echo esc_html($accommodation ?: '—'); ?></p>
                <p><strong>Quando:</strong> <?php echo esc_html($when_option ?: '—'); ?></p>
                <p><strong>Budget stimato:</strong> 
                    <?php 
                    if ($budget_type === 'more_than') {
                        echo '> €' . esc_html($budget_more);
                    } elseif ($budget_min || $budget_max) {
                        echo 'Da €' . esc_html($budget_min) . ' a €' . esc_html($budget_max);
                    } else {
                        echo '—';
                    }
                    ?>
                </p>
            </div>
            <?php endif; ?>
        </div>

        <?php if ($notes): ?>
            <div style="background:#fffbeb; border:1px solid #fef3c7; border-left:4px solid #f59e0b; padding:14px; border-radius:6px; margin-bottom:16px;">
                <strong>📝 Note / Richieste particolari del cliente:</strong>
                <p style="margin:6px 0 0; white-space:pre-wrap;"><?php echo esc_html($notes); ?></p>
            </div>
        <?php endif; ?>

        <div style="text-align:right; margin-top:10px;">
            <a href="mailto:<?php echo esc_attr($email); ?>?subject=IncanTour%20-%20La%20tua%20richiesta%20di%20viaggio%20su%20misura" class="button button-primary" style="background:#1b5e5f; border-color:#1b5e5f; font-size:13px; padding:6px 14px;">
                Rispondi al Cliente via Email
            </a>
        </div>
    </div>
    <?php
}

/* ==========================================================================
   5. REGISTRAZIONE ENDPOINT REST API PER LA RICEZIONE DAL FORM NEXT.JS
   ========================================================================== */
add_action('rest_api_init', function() {
    register_rest_route('incantour/v1', '/custom-trip-request', array(
        'methods'             => WP_REST_Server::CREATABLE, // POST
        'callback'            => 'incantour_handle_custom_trip_submission',
        'permission_callback' => '__return_true', // Accessibile pubblicamente dal frontend
    ));
});

function incantour_handle_custom_trip_submission(WP_REST_Request $request) {
    $params = $request->get_json_params();
    if (empty($params)) {
        $params = $request->get_body_params();
    }

    // 1. Verifica Honeypot antispam
    if (!empty($params['website']) || !empty($params['hp_check']) || !empty($params['honeypot'])) {
        return new WP_REST_Response(array('success' => true, 'message' => 'Richiesta ricevuta.'), 200);
    }

    // 2. Estrazione e sanitizzazione campi
    $trip_type         = isset($params['trip_type']) && $params['trip_type'] === 'outgoing' ? 'outgoing' : 'incoming';
    $first_name        = sanitize_text_field($params['first_name'] ?? ($params['name'] ?? ''));
    $last_name         = sanitize_text_field($params['last_name'] ?? '');
    $email             = sanitize_email($params['email'] ?? '');
    $phone             = sanitize_text_field($params['phone'] ?? '');
    $address           = sanitize_text_field($params['address'] ?? '');
    $city              = sanitize_text_field($params['city'] ?? '');

    $expectations      = sanitize_text_field($params['travel_expectations'] ?? '');
    $travel_type       = sanitize_text_field($params['travel_type'] ?? '');
    $date_start        = sanitize_text_field($params['date_start'] ?? '');
    $date_end          = sanitize_text_field($params['date_end'] ?? '');
    $departure_city    = sanitize_text_field($params['departure_city'] ?? '');
    $transport_mode    = sanitize_text_field($params['transport_mode'] ?? '');

    $destination       = sanitize_text_field($params['destination'] ?? '');
    $other_dest        = sanitize_text_field($params['other_destination_text'] ?? '');

    $preferences_raw   = $params['preferences'] ?? '';
    if (is_array($preferences_raw)) {
        $preferences = array_map('sanitize_text_field', $preferences_raw);
    } else {
        $preferences = sanitize_text_field($preferences_raw);
    }
    $other_preferences = sanitize_textarea_field($params['other_preferences_notes'] ?? '');

    // Campi Outgoing
    $when_option       = sanitize_text_field($params['when_option'] ?? '');
    $accommodation     = sanitize_text_field($params['accommodation'] ?? '');
    $budget_type       = sanitize_text_field($params['budget_type'] ?? '');
    $budget_more_than  = floatval($params['budget_more_than'] ?? 0);
    $budget_min        = floatval($params['budget_min'] ?? 0);
    $budget_max        = floatval($params['budget_max'] ?? 0);

    $notes             = sanitize_textarea_field($params['notes'] ?? ($params['details'] ?? ''));

    // Validazione obbligatori
    if (empty($first_name) || empty($last_name) || empty($email) || empty($phone)) {
        return new WP_REST_Response(array(
            'success' => false,
            'error'   => 'Campi obbligatori mancanti (Nome, Cognome, Email, Telefono).'
        ), 400);
    }

    if (!is_email($email)) {
        return new WP_REST_Response(array(
            'success' => false,
            'error'   => 'Indirizzo email non valido.'
        ), 400);
    }

    // 3. Creazione post in WordPress
    $post_title = sprintf(
        '[%s] %s %s - %s',
        strtoupper($trip_type),
        $first_name,
        $last_name,
        date('d/m/Y H:i')
    );

    $post_content = "Richiesta viaggio su misura creata dal form online.\n\n" .
                    "Tipo: " . strtoupper($trip_type) . "\n" .
                    "Email: $email | Telefono: $phone\n" .
                    "Destinazione: $destination\n";

    $post_id = wp_insert_post(array(
        'post_title'   => $post_title,
        'post_content' => $post_content,
        'post_type'    => 'custom_trip_request',
        'post_status'  => 'publish',
    ));

    if (is_wp_error($post_id)) {
        return new WP_REST_Response(array('success' => false, 'error' => $post_id->get_error_message()), 500);
    }

    // 4. Salvataggio metadati (compatibile sia con ACF che con get_post_meta nativo)
    $fields = array(
        'trip_type'               => $trip_type,
        'first_name'              => $first_name,
        'last_name'               => $last_name,
        'email'                   => $email,
        'phone'                   => $phone,
        'address'                 => $address,
        'city'                    => $city,
        'travel_expectations'     => $expectations,
        'travel_type'             => $travel_type,
        'date_start'              => $date_start,
        'date_end'                => $date_end,
        'departure_city'          => $departure_city,
        'transport_mode'          => $transport_mode,
        'destination'             => $destination,
        'other_destination_text'  => $other_dest,
        'preferences'             => $preferences,
        'other_preferences_notes' => $other_preferences,
        'when_option'             => $when_option,
        'accommodation'           => $accommodation,
        'budget_type'             => $budget_type,
        'budget_more_than'        => $budget_more_than,
        'budget_min'              => $budget_min,
        'budget_max'              => $budget_max,
        'notes'                   => $notes,
        'privacy_accepted'        => 1,
        'submission_ip'           => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
        'submission_time'         => current_time('mysql'),
    );

    foreach ($fields as $meta_key => $meta_val) {
        update_post_meta($post_id, $meta_key, $meta_val);
        // Se ACF è attivo, aggiorna anche tramite update_field
        if (function_exists('update_field')) {
            update_field($meta_key, $meta_val, $post_id);
        }
    }

    // 5. Invio Email di notifica ad IncanTour
    $admin_email = get_option('admin_email');
    $agency_email = apply_filters('incantour_notification_email', $admin_email);

    $subject = sprintf('[Nuova Richiesta Viaggio %s] %s %s - IncanTour', strtoupper($trip_type), $first_name, $last_name);

    $pref_string = is_array($preferences) ? implode(', ', $preferences) : $preferences;
    $headers = array('Content-Type: text/html; charset=UTF-8', 'From: IncanTour Web <no-reply@incantour.it>');

    $email_body = "
    <div style='font-family:sans-serif; max-width:600px; margin:0 auto; padding:20px; border:1px solid #e2e8f0; border-radius:8px;'>
        <div style='background:#1b5e5f; padding:20px; text-align:center; border-radius:6px 6px 0 0;'>
            <h1 style='color:#e6a532; margin:0; font-size:22px;'>IncanTour - Viaggio su Misura</h1>
            <p style='color:#ffffff; margin:5px 0 0; font-size:14px;'>Nuova richiesta <strong>" . strtoupper($trip_type) . "</strong> ricevuta dal sito web</p>
        </div>
        <div style='padding:20px; background:#ffffff;'>
            <h3 style='color:#1b5e5f; border-bottom:2px solid #e6a532; padding-bottom:6px;'>Dati del Cliente</h3>
            <p><strong>Nome e Cognome:</strong> $first_name $last_name</p>
            <p><strong>Email:</strong> <a href='mailto:$email'>$email</a></p>
            <p><strong>Telefono:</strong> <a href='tel:$phone'>$phone</a></p>
            <p><strong>Indirizzo / Città:</strong> $address - $city</p>

            <h3 style='color:#1b5e5f; border-bottom:2px solid #e6a532; padding-bottom:6px; margin-top:20px;'>Dettagli Viaggio</h3>
            <p><strong>Tipo Richiesta:</strong> " . strtoupper($trip_type) . "</p>
            <p><strong>Destinazione:</strong> $destination " . ($other_dest ? "($other_dest)" : "") . "</p>
            <p><strong>Periodo / Attese:</strong> $expectations " . ($when_option ? "($when_option)" : "") . "</p>
            " . ($date_start ? "<p><strong>Date:</strong> Dal $date_start al " . ($date_end ?: '...') . "</p>" : "") . "
            <p><strong>Partenza da:</strong> $departure_city</p>
            <p><strong>Mezzo di arrivo:</strong> $transport_mode</p>
            <p><strong>Preferenze:</strong> $pref_string</p>
            " . ($accommodation ? "<p><strong>Alloggio desiderato:</strong> $accommodation</p>" : "") . "
            " . ($budget_type === 'more_than' ? "<p><strong>Budget:</strong> Più di €$budget_more_than</p>" : ($budget_min || $budget_max ? "<p><strong>Budget:</strong> Da €$budget_min a €$budget_max</p>" : "")) . "
            " . ($notes ? "<p><strong>Note Aggiuntive:</strong><br>" . nl2br($notes) . "</p>" : "") . "
        </div>
        <div style='background:#f8fafc; padding:15px; text-align:center; font-size:12px; color:#64748b; border-radius:0 0 6px 6px;'>
            Puoi visualizzare e gestire questa richiesta direttamente nel pannello di WordPress sotto la voce <strong>Viaggi su Misura</strong>.
        </div>
    </div>";

    @wp_mail($agency_email, $subject, $email_body, $headers);

    // 6. Invio Email di conferma automatica al cliente
    $client_subject = 'Grazie per aver scelto IncanTour - Abbiamo ricevuto la tua richiesta!';
    $client_body = "
    <div style='font-family:sans-serif; max-width:600px; margin:0 auto; padding:20px; border:1px solid #e2e8f0; border-radius:8px;'>
        <div style='background:#1b5e5f; padding:20px; text-align:center; border-radius:6px 6px 0 0;'>
            <h1 style='color:#e6a532; margin:0; font-size:22px;'>IncanTour - Viaggi su Misura</h1>
            <p style='color:#ffffff; margin:5px 0 0; font-size:14px;'>Disegna il TUO VIAGGIO</p>
        </div>
        <div style='padding:25px; background:#ffffff; color:#333; line-height:1.6;'>
            <p>Gentile <strong>$first_name $last_name</strong>,</p>
            <p>Grazie per aver condiviso con noi i tuoi desideri di viaggio per la destinazione <strong>$destination</strong>!</p>
            <div style='background:#fef3c7; border-left:4px solid #f59e0b; padding:12px 16px; margin:20px 0; border-radius:4px;'>
                <strong>Per il tuo viaggio su misura:</strong><br>
                Sarai contattato da un nostro <em>Travel Expert</em> dedicato entro <strong>24 ore</strong> per definire insieme ogni dettaglio del tuo itinerario esclusivo.
            </div>
            <p>Riepilogo rapido della tua richiesta:</p>
            <ul>
                <li><strong>Tipo di viaggio:</strong> " . ($trip_type === 'incoming' ? 'Incoming (Campania & Italia)' : 'Outgoing (Mondo & Grandi Mete)') . "</li>
                <li><strong>Destinazione:</strong> $destination</li>
                <li><strong>Periodo prescelto:</strong> $expectations " . ($when_option ? "($when_option)" : "") . "</li>
            </ul>
            <p>A presto,<br><strong>Il Team di IncanTour</strong><br>
            <a href='https://incantour.it' style='color:#1b5e5f;'>www.incantour.it</a> | Tel: +39 338 435 7143
            </p>
        </div>
    </div>";

    @wp_mail($email, $client_subject, $client_body, $headers);

    return new WP_REST_Response(array(
        'success' => true,
        'message' => 'Richiesta ricevuta con successo! Sarai ricontattato entro 24 ore.',
        'post_id' => $post_id,
    ), 200);
}
