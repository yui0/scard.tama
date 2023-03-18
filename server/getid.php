<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

$secret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
$secret = "berry_japan_com_tracker_xxxxxxxxxxxxxxxxxxxxx";

// An ETag was sent to the webserver
if (!empty($_SERVER["HTTP_IF_NONE_MATCH"])) {
	// This is what you would normally do
	$etag = substr(str_replace(".", "", str_replace("/", "", str_replace("\\", "", $_SERVER["HTTP_IF_NONE_MATCH"]))), 0, 18);
}
else { // No etag was sent. We need to generate one. Normally you would derive this from randomness.
	$etag = substr(sha1($secret . sha1($_SERVER["REMOTE_ADDR"]) . sha1($_SERVER["HTTP_USER_AGENT"])), 0, 18);
}

echo $etag;
?>
