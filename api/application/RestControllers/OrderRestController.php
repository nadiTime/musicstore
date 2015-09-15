<?php
require_once getcwd() . '/apiConf.php';
require_once getcwd() . '/core/Controllers/OrderContoller.php';

class OrderRestController extends OrderController {
	
	public function __construct() {
		parent::__construct();
	}

	/**
	 * RCcheckoutOrder
	 * 
	 * handles the order.
	 * 
	 * @param  $array $details order to checkout.
	 * 
	 * @return array          status.
	 */
	public function RCcheckoutOrder( $details_raw ) {
		$details = json_decode($details_raw, true);
		echo json_encode($this->CcheckoutOrder($details));
	}
} 