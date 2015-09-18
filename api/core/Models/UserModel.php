<?php

require_once dirname( __FILE__ ) . '/Model.php';
require_once (dirname(__DIR__)) . '/lib/Validate.class.php';
require_once dirname(dirname(__DIR__)) . '/application/Vendors/Facebook/FBLogin.class.php';

class UserModel extends Model {

	public function __construct() {
		parent::__construct();
	}
	/**
	 * login for reular user.
	 * @param  string $email    user email.
	 * @param  string $password user password.
	 * @return array details and auth or error.
	 */
	public function loginReg( $email , $password ) {
		if(!Validate::email($email)){
			apiConf::$ERROR = 'email validation failed';
		}
		else if(!Validate::password($password)){
			apiConf::$ERROR = 'password validation failed';
		}
		else {
			$arr = $this->escapeString(array($email,$password));
			$e = $arr[0];
			$p = md5($arr[1]);
			$query = 	"SELECT user_id, user_firstname, user_lastname 
						FROM users WHERE user_email = '$e' 
						AND user_password = '$p' LIMIT 1";
			$results = $this->query($query);

			if (isset($results[0])) {
				$this->activateUser($results[0]['user_id']);
				Config::$USER_VERIFIED = true;
				$array = array();
				$array['user'] = $results[0];
				$array['auth'] = Config::$USER_AUTH;
				$array['success'] = true;
				$this->_db->close();
				return $array;
			}
			apiConf::$ERROR = 'non existing user';
		}
	}
	/**
	 * login facebook user.
	 * @param  string $auth user facebook auth.
	 * @return array success.
	 */
	public function loginFacebookUser( $token , $sign ){
		$fb = new FBLogin();
		$res = $fb->createSession($token,$sign);
		if($res){
			Config::$USER_VARIFIED = true;
			Config::$USER_AUTH = $token;
			return array('success' => true);
		}
		apiConf::$ERROR = 'facebook validatiion failed';
	}
	/**
	 * add new regular user
	 * @param string $email     user email.
	 * @param string $firstname user first name.
	 * @param string $lastname  user lasname.
	 * @param string $password  user password.
	 * @return array success
	 */
	public function addRegUser( $email , $firstname , $lastname , $password ) {
		if(Validate::email($email) && Validate::password($password)){
			$arr = $this->escapeString(array($email,$firstname,$lastname,$password));
			$e = $arr[0];
			$f = $arr[1];
			$l = $arr[2];
			$p = md5($arr[3]);
			$query = 	"INSERT INTO users (`user_email`, `user_password`, `user_firstname`, `user_lastname`) 
						VALUES ('$e', '$p', '$f', '$l')";
			if($this->_db->query($query)){
				return $this->loginReg($email,$password);
			}
			$this->_db->close();
			apiConf::$ERROR = 'facebook registration failed';
		}
		apiConf::$ERROR = 'validation failed';	
	}
	/**
	 * add user via facebook
	 * @param int $id        user facebook id.
	 * @param string $token     token from facebook.
	 * @param string $sign      string from facebook.
	 * @param string $firstname user firstname.
	 * @param string $lastname  user lastname.
	 * @param string $email     user email
	 */
	public function addFacebookUser( $id, $token, $sign, $firstname, $lastname, $email ) {
		$arr = $this->escapeString(array($token,$sign,$firstname,$lastname,$email,$id));
		$t = $arr[0];
		$s = $arr[1];
		$f = $arr[2];
		$l = $arr[3];
		$e = $arr[4];
		$i = $arr[5];
		$p = md5($arr[5]); // Password is md5(facebook id)
		$fb = new FBLogin();
		$res = $fb->createSession($t,$s);
		if($res){
			$query = 	"INSERT INTO users (`user_email`, `user_password`, `user_firstname`, `user_lastname`) 
						VALUES ('$e', '$p', '$f', '$l')";
			if($this->_db->query($query)){
				$user_id = $this->_db->insert_id;
				$query = "INSERT INTO fb_users (`user_id`, `user_fb_uid`) 
						VALUES ('$user_id', '$i')";

				if($this->_db->query($query)){
					Config::$USER_VARIFIED = true;
					$arr = array();
					$arr['success'] = true;
					$this->activateUser($e);
					$arr['auth'] = Config::$USER_AUTH;
					$this->_db->close();
					return $arr;
				}
				$this->_db->close();
				apiConf::$ERROR = 'facebook registary failed';
				
			}
			$this->_db->close();
			apiConf::$ERROR = 'regular facebook registration failed';
		}
		$this->_db->close();
		apiConf::$ERROR = 'facebook validation failed';
	}
	
	/**
	 * activate user and produce authentication for this session
	 * @return void
	 */
	private function activateUser($id){
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $characters_length = strlen($characters);
	    $random_string = '';
	    $length = 32;
	    for ($i = 0; $i < $length; $i++) {
	        $random_string .= $characters[rand(0, $characters_length - 1)];
	    }
	    Config::$USER_AUTH = $random_string;
	    Config::writeNewAuth($id,$random_string);
	}
}
