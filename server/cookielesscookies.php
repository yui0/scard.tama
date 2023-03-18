<?php
	// http://lucb1e.com/rp/cookielesscookies/
	//require("config.php"); // for $secret.
//	$secret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
	$secret = "xxxxseek_kingdom_firstxxxxxxxxxxxxxxxxxxxxxxx";

//	$sessionsdir = "sessions/";
	$sessionsdir = "/home/users/1/pya.jp-berry/sessions/";

	// An ETag was sent to the webserver
	if (!empty($_SERVER["HTTP_IF_NONE_MATCH"])) {
		// This is what you would normally do
		$etag = substr(str_replace(".", "", str_replace("/", "", str_replace("\\", "", $_SERVER["HTTP_IF_NONE_MATCH"]))), 0, 18);
	}
	else { // No etag was sent. We need to generate one. Normally you would derive this from randomness.
		$etag = substr(sha1($secret . sha1($_SERVER["REMOTE_ADDR"]) . sha1($_SERVER["HTTP_USER_AGENT"])), 0, 18);
	}

	// Initialize a new or existing session given any etag.
	function initsession($etag, $force_reinit = false) {
		global $session, $sessionsdir;
		if (!$force_reinit && file_exists($sessionsdir . $etag)) {
			$session = unserialize(file_get_contents($sessionsdir . $etag));
		}
		else {
			$session = array("visits" => 1, "last_visit" => time(), "sUID" => "");
		}
	}

	function updatesession() {
		global $session;
		$session["visits"] += 1;
		$session["last_visit"] = time();
	}

	// Write any changes to the disk
	function storesession($etag) {
		global $session, $sessionsdir;
		$fid = fopen($sessionsdir . $etag, "w");
		fwrite($fid, serialize($session));
		fclose($fid);
	}

	function webbeacon() {
		header('Content-Type: image/gif');	// GIFに見せかける

		/*header('Expires:Fri, 10 May 2013 00:00:00 GMT');
		header('Cache-Control:private, no-cache, no-cache=Set-Cookie, must-revalidate');
		header('Pragma: no-cache');		// キャッシュされないようにヘッダを設定*/

		/*if (isset($_COOKIE['count'])) {
			$count = $_COOKIE['count'] + 1;
		} else {
			$count = 1;
		}*/

		//setcookie('count', $count, time() + 3600, "/");	// とりあえずCookieを使って訪問回数を記録する
		//setcookie('hoge', 'fuga', time() + 3600, "/");	// 他にもCookieで任意のkey, valueを保存させておくことができる

		// 最後に1x1の透過画像を返す（ここではbase64エンコードを使っている）
		echo base64_decode("R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D");
	}

	initsession($etag);

	// .htaccess rewrites to '?tracker' if the 'tracker.jpg' file is requested.
	if (isset($_GET["tracker"])) {
		// No ETag sent? Make sure we use a new session.
		if (empty($_SERVER["HTTP_IF_NONE_MATCH"])) {
			@unlink($sessionsdir . $etag); // may or may not exist
			unset($session);
			initsession($etag);
		}
		updatesession();
		storesession($etag);
		header("Cache-Control: private, must-revalidate, proxy-revalidate");
		header("ETag: " . substr($etag, 0, 18)); // our "cookie"
		/*header("Content-type: image/jpeg");
		header("Content-length: " . filesize("fingerprinting.jpg"));
		readfile("fingerprinting.jpg");*/
		header("Content-type: image/gif");
		header("Content-length: 45");
		echo base64_decode("R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D");
		exit;
	}

	// Vulnerable to CSRF attacks, I know. I didn't think it really mattered
	// since XSS is impossible and no important data is stored.
	/*if (isset($_POST["newstring"])) {
		$session["your_string"] = substr(htmlentities($_POST["newstring"]), 0, 500);
		storesession($etag);
		header("Location: ./");
		exit;
	}*/
?>
