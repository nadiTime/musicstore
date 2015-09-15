<?php
class Validate {
	/**
	 * email validation.
	 * @param  string $e user email.
	 * @return bool    is email acceptable.
	 */
	public static function email($e){
		return filter_var($e, FILTER_VALIDATE_EMAIL);
	}

	/**
	 * passworf validation.
	 * @param  string $p user password.
	 * @return bool    is password alpha-num and between 8 to 14 chars.
	 */
	public static function password($p){
		$string = is_string($p);
		$alphanum = ctype_alnum($p);
		$length = (strlen($p) == 32) ? true : false;
		if($string && $alphanum && $length){
			return true;
		}
		return false;
	}

}

?>