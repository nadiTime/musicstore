<?php
require_once getcwd() . '/apiConf.php';
require_once dirname( __FILE__ ) . '/../../core/Controllers/UserController.php';

class UserRestController extends UserController {
	
	public function __construct() {
		parent::__construct();
	}

	/**
	 * RCloginReg
	 * 
	 * login for reular user.
	 * 
	 * @param  string $email    user email.
	 * 
	 * @param  string $password user password.
	 * 
	 * @return array details and auth or error.
	 */
	public function RCloginReg( $details_raw ) {
		$details = json_decode($details_raw, true);
		if(isset($details['email']) && isset($details['password'])){
			echo json_encode($this->CloginReg($details['email'], $details['password']));
		}
		else{
			apiConf::$ERROR = 'no params';
		}
	}

	/**
	 * RCloginFacebookUser
	 * 
	 * login facebook user.
	 * 
	 * @param  string $auth user facebook auth.
	 * 
	 * @return array success.
	 */
	public function RCloginFacebookUser( $details_raw ){
		$details = json_encode($details_raw, true);
		if(isset($details['token']) && isset($details['sign'])){
			echo json_encode($this->CloginFacebookUser($details['token'],$details['sign']));
		}
		else{
			apiConf::$ERROR = 'no params';
		}
	}

	/**
	 * RCaddRegUser
	 * 
	 * add new regular user.
	 * 
	 * @param string $email     user email.
	 * 
	 * @param string $firstname user first name.
	 * 
	 * @param string $lastname  user lasname.
	 * 
	 * @param string $password  user password.
	 */
	public function RCaddRegUser( $details_raw ) {
		$details = json_decode($details_raw, true);
		if(isset($details['email']) && isset($details['password']) && isset($details['lastname']) && isset($details['firstname'])){
			echo json_encode($this->CaddRegUser($details['email'],$details['firstname'],$details['lastname'],$details['password']));
		}
		else{
			apiConf::$ERROR = 'no params';
		}
		
	}

	/**
	 * RCaddFacebookUser
	 * 
	 * add user via facebook.
	 * 
	 * @param int $id        user facebook id.
	 * 
	 * @param string $token     token from facebook.
	 * 
	 * @param string $sign      string from facebook.
	 * 
	 * @param string $firstname user firstname.
	 * 
	 * @param string $lastname  user lastname.
	 * 
	 * @param string $email     user email
	 */
	public function RCaddFacebookUser( $details_raw ) {
		$details = json_decode($details_raw, true);
		if(isset($details['id']) && isset($details['token']) && isset($details['sign']) && isset($details['firstname']) && isset($details['lastname']) && isset($details['email'])){
			echo json_encode($this->CaddFacebookUser($details['id'],$details['token'],$details['sign'],$details['firstname'],$details['lastname'],$details['email']));
		}
		else{
			apiConf::$ERROR = 'no params';
		}		
	}
} 