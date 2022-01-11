<?php
 session_start();
/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Scripting/EmptyPHP.php to edit this template
 */
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message ="Name : ". $name."<br>"."Phone : ".$phone."<br>"."Mail ID : ".$email."<br>"."Messsage : ".$_POST['message'];
// Import PHPMailer classes into the global namespace 
use PHPMailer\PHPMailer\PHPMailer; 
//use PHPMailer\PHPMailer\Exception; 
 
require 'PHPMailer-master/src/Exception.php'; 
require 'PHPMailer-master/src/PHPMailer.php'; 
require 'PHPMailer-master/src/SMTP.php'; 
 
$mail = new PHPMailer; 
 
$mail->isSMTP();                      // Set mailer to use SMTP 
$mail->Host = 'secure.emailsrvr.com';       // Specify main and backup SMTP servers 
$mail->SMTPAuth = true;               // Enable SMTP authentication 
$mail->Username = 'hr@technocil.com';   // SMTP username 
$mail->Password = 'GrRda6yRbY21@';   // SMTP password 
$mail->SMTPSecure = 'tls';            // Enable TLS encryption, `ssl` also accepted 
$mail->Port = 587;                    // TCP port to connect to 
 
// Sender info 
$mail->setFrom('info@technocil.com', $name); 
$mail->addReplyTo($email, $name); 
 
// Add a recipient 
$mail->addAddress('hr@technocil.com'); 
 
//$mail->addCC('cc@example.com'); 
//$mail->addBCC('bcc@example.com'); 
 
// Set email format to HTML 
$mail->isHTML(true); 
 
// Mail subject 
$mail->Subject = $subject; 
 
// Mail body content 
//$bodyContent = '<h1>How to Send Email from Localhost using PHP by CodexWorld</h1>'; 
//$bodyContent .= '<p>This HTML email is sent from the localhost server using PHP by <b>CodexWorld</b></p>'; 
$mail->Body    = $message; 
 
// Send email 
if(!$mail->send()) { 
    //echo 'Message could not be sent. Mailer Error: '.$mail->ErrorInfo; 
     $_SESSION['flash_message'] = "Message could not be sent. Mailer Error. ";
} else { 
   // echo 'Message has been sent.'; 
    $_SESSION['flash_message'] = "Message sent successfully.";
} 
 header("Location: contact_us.php");