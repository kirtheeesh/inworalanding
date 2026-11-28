<?php
/** @var array<string, string> $checks */
/** @var array<string, string> $ipHeaders */
?>
<div class="page-head">
  <h1>Diagnostics</h1>
  <span class="muted">Meta Conversions API readiness. Secrets are never shown here.</span>
</div>

<div class="card">
  <table>
    <tbody>
    <?php foreach ($checks as $label => $value): ?>
      <tr>
        <th style="width:260px"><?= e($label) ?></th>
        <td><code><?= e($value) ?></code></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>

<div class="card" style="margin-top:1.5rem">
  <h2 style="margin-top:0">IP headers on this request</h2>
  <p class="muted">Compare these with your own public IP. The header that shows it is the one to set as <code>client_ip_header</code> in the private config. Behind the Hostinger CDN, <code>REMOTE_ADDR</code> may be the CDN's address.</p>
  <table>
    <tbody>
    <?php foreach ($ipHeaders as $header => $value): ?>
      <tr>
        <th style="width:260px"><?= e($header) ?></th>
        <td><code><?= e($value) ?></code></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</div>
