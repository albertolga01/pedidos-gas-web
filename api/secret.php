<?php
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
\Stripe\Stripe::setApiKey('sk_test_51M8RIcEmIUTHssjB7dxeDXVxyh28r6SP0lwW5yTVBGDpWSsVkTamfKXxuDDtZmpNLXDIqRXZ9iFdtO6FM32XM5SI00vbMPkgkl');

$intent = \Stripe\PaymentIntent::create([
  'amount' => 1099,
  'currency' => 'mxn',
  // Verify your integration in this guide by including this parameter
  'metadata' => ['integration_check' => 'accept_a_payment'],
]);

?>