<?php
require_once dirname( __FILE__ ) . '/Model.php';

class OrderModel extends Model {

	public function __construct() {
		parent::__construct();
	}

	/**
	 * remove from inventory
	 * @param  array $details order to checkout. $details['user_auth','user_id,'order_shipping_city','order_shipping_address','zipcode', 'data'[album_id','order_total']]
	 * @return bool          status.
	 */
	public function checkoutOrder( $details ) {
		$arr = array('success' => false);
		if(!isset($details['user_auth']) || !isset($details['user_id']) ){
			apiConf::$ERROR = 'missing data';
		}
		else{
			$user_auth = $this->escapeString($details['user_auth']);
			if($user_auth != Config::getUserAuth($details['user_id'])){
				apiConf::$ERROR = 'not authorized';	
			}
			else{
				$available_info = $this->checkAvilable($details);
				if(count($available_info) > 0){
					$arr['data'] = $available_info;
				}
				else{
					$shipping_city = $this->escapeString($details['order_shipping_city']);
					$shiping_address = $this->escapeString($details['order_shipping_address']);
					$zipcode = $this->escapeString($details['zipcode']);
					$user_id = $this->escapeString($details['user_id']);
					$total_amount = 0;
					foreach ($details['amount'] as $value) {
						$total_amount += $value;
					}
					if($total_amount == 0){
						apiConf::$ERROR = 'no amount pointed';
					}
					else{
						$order_query = 	"INSERT INTO orders
								(`user_id`, `order_created`, `order_shipping_city`, `order_shipping_address`, `order_shipping_zipcode`, `order_total`) 
								VALUES ('$user_id', DEFAULT, '$shipping_city', '$shiping_address', '$zipcode', '$total_amount')";
						$result = $this->_db->query($order_query);
						if(!$result){
							apiConf::$ERROR = 'order generating failed';
						}
						else{
							$order_id = $this->_db->insert_id;
							$album_to_order_query = "INSERT INTO orders_to_albums (`order_id`, `album_id`) VALUES ";
							$i = 0;
							$albums_count = count($details['albums']);
							foreach ($details['albums'] as $v) {
								$i++;
								$album_id = $v;
								$album_to_order_query .=  "('$order_id','$album_id')";
								if($i < $albums_count){
									$album_to_order_query .=", ";
								}
							}
							if(!$this->_db->query($album_to_order_query)){
								apiConf::$ERROR = 'add albums to order failed';
							}
							else{
								$arr['success'] = true;
								$arr['order_id'] = $order_id;
							}
						}
					}
				}
			}
		}
		return $arr;
	}

	/**
	 * check if albums are available.
	 * @param  object $data album ids and amount
	 * @return array       error data.
	 */
	private function checkAvilable($data) {
		$albums_ids = $this->escapeString($data['albums']);
		$albums_amount = $this->escapeString($data['amount']);
		$albums_count = count($albums_ids);
		if($albums_count < 0){
			apiConf::$ERROR = 'no ids found';
		}
		else{
			$query = 	"SELECT album_stock, album_id
						FROM albums_stock 
						WHERE ";
			$i = 0;
			foreach ($albums_ids as $value) {
				$i++;
				$query .= "album_id='$value'";
				if($i < $albums_count){
					$query .= " OR ";
				}
			}
			$available_data = $this->query($query);
			$available_data_count = count($available_data);
			if($available_data_count < 0){
				apiConf::$ERROR = 'no albums in lists';
			}
			else{
				$arr = array();
				$i = 0;
				foreach ($available_data as $value) {
					if($value['album_stock'] < $albums_amount[$i]){
						$arr[$i] = 'Only ' . $value['album_stock'] . ' more units in stack';
					}
				}
			}
		}
		return $arr;
	}

	private function sendMail( $details ) {
		return true;
	}
}