<?php
$name = $_POST("Name");
$phone = filter_input(INPUT_POST, 'Phone', FILTER_SANITIZE_NUMBER_INT);
$email = strtolower(filter_input(INPUT_POST, 'Email', FILTER_SANITIZE_EMAIL));
$message = strtolower(filter_input(INPUT_POST, 'Message', FILTER_SANITIZE_STRING));

?>

<?php
$email_from = "drdkerroffice@gmail.com";

$email_subject = "New Feedback/Question for Dr. Kerr";

$email_body = "You have received a new message from $name.\n\n";

"Here is the message: \n $message";

?>

<?php

$to = "drdavidskerr@gmail.com";
$headers = "From: $email_from \r\n";
$headers .= "Repy-To: $email \r\n";
?>

<?php

function IsInjected($str)
{
    $injections = array('(\n+)',
           '(\r+)',
           '(\t+)',
           '(%0A+)',
           '(%0D+)',
           '(%08+)',
           '(%09+)'
           );
               
    $inject = join('|', $injections);
    $inject = "/$inject/i";
    
    if(preg_match($inject,$str))
    {
      return true;
    }
    else
    {
      return false;
    }
}

if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}

?>

<?php
mail($to,$email_subject,$email_body,$headers);
?>


