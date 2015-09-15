<?php 
require_once dirname( __FILE__ ) . '/../config.php';

class DB {
	private static $instance = NULL;

    public static function getInstance() {
		if ( !self::$instance ) {
			$connect_keys = Config::connectKeys();
			self::$instance = new mysqli($connect_keys['host'],$connect_keys['user'],$connect_keys['pass'],$connect_keys['database']);
		}

		return self::$instance;
    }

    private function __construct() {}

}
?>