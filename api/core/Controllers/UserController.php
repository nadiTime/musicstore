<?php
require_once dirname( __FILE__ ) . '/../Models/UserModel.php';

class UserController extends UserModel {
	
	public function __construct() {
		parent::__construct();
	}

	/**
	 * CloginReg
	 * 
	 * login for reular user.
	 * 
	 * @param  string $email    user email.
	 * 
	 * @param  string $password user password.
	 * 
	 * @return array details and auth or error.
	 */
	public function CloginReg( $email , $password ) {
		return $this->loginReg($email,$password);
	}

	/**
	 * CloginFacebookUser
	 * 
	 * login facebook user.
	 * 
	 * @param  string $auth user facebook auth.
	 * 
	 * @return array success.
	 */
	public function CloginFacebookUser( $token , $sign ){
		return $this->loginFacebookUser($token,$sign);
	}

	/**
	 * CaddRegUser
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
	public function CaddRegUser( $email , $firstname , $lastname , $password ) {
		return $this->addRegUser($email,$firstname,$lastname,$password);
	}

	/**
	 * CaddFacebookUser
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
	public function CaddFacebookUser( $id, $token, $sign, $firstname, $lastname, $email ) {
		return $this->addFacebookUser($id,$token,$sign,$firstname,$lastname,$email);
	}
} 