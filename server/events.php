<?php
// Set file mime type event-stream
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
header('X-Accel-Buffering: no'); // Nginx: unbuffered responses suitable for Comet and HTTP streaming applications
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Credentials: true');

// Loop until the client close the stream
while (true) {

  // Echo time
  $time = date('r');
  echo "data: The server time is: {$time}\n\n";

  // Flush buffer (force sending data to client)
  flush();

  // Wait 2 seconds for the next message / event
  sleep(2);  
}
?>
