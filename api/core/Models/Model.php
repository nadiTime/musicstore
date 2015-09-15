<?php
// namespace core\Model;
require_once dirname( __FILE__ ) . '/../lib/DB.class.php';
require_once dirname(dirname(__DIR__)) . '/apiConf.php';
require_once dirname(__DIR__) . '/config.php';
class Model {
	protected $_db;
	
	public function __construct() {
		$this->_db = DB::getInstance();
	}

	public function escapeString( $string_to_escape ){
		if(is_array($string_to_escape)){
			$array = array();
			foreach ($string_to_escape as $string) {
				$tmp = $this->_db->real_escape_string($string);
				array_push($array, $tmp);
			}
			return $array;
		}
		return $this->_db->real_escape_string($string_to_escape);	
	}

	public function query( $query ){
		$t = $this->_db->query($query);
		if($t){
			$arr = array();
			while($res = $t->fetch_assoc()){
				array_push($arr,$res);
			}
			return $arr;
		}
		return false;
	}
}
