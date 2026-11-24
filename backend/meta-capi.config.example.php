<?php

/**
 * TEMPLATE for the private Meta Conversions API config. Do not put a real
 * token in this file, and do not upload it to the server.
 *
 * The real file lives OUTSIDE public_html, with permissions 600:
 *
 *   /home/<user>/domains/inwora.com/private/meta-capi.config.php
 *
 * It is read only by backend/src/MetaCapi.php. If it is missing, unreadable,
 * readable by other users or invalid, CAPI stays off and the site keeps
 * working. Check the result at /admin/diagnostics.
 */

return [
    // false = CAPI off (events are accepted and dropped). The instant kill switch.
    'enabled' => false,

    // Events Manager → Data sources → Pixel 1082744314811489 → Settings →
    // Conversions API → Generate access token. Paste it on the server only.
    'access_token' => '',

    // Meta Graph API version used for /events.
    'graph_version' => 'v26.0',

    // Only while testing: the code from Events Manager → Test events. Leave '' for real traffic.
    'test_event_code' => '',

    // Header that carries the visitor's real IP behind the CDN. Choose it from
    // /admin/diagnostics: REMOTE_ADDR, HTTP_X_FORWARDED_FOR, HTTP_X_REAL_IP,
    // HTTP_CF_CONNECTING_IP, HTTP_TRUE_CLIENT_IP or HTTP_X_CLIENT_IP.
    'client_ip_header' => 'REMOTE_ADDR',
];
