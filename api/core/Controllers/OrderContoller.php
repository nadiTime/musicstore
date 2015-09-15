<?php

require_once dirname( __FILE__ ) . '/../Models/OrderModel.php';

class OrderController extends OrderModel {
	
	public function __construct() {
		parent::__construct();
	}

	/**
	 * CcheckoutOrder
	 * 
	 * handles the order.
	 * 
	 * @param  $array $details order to checkout.
	 * 
	 * @return array          status.
	 */
	public function CcheckoutOrder( $details ) {
		return $this->checkoutOrder($details);
	}
} 