<?php

require_once dirname( __FILE__ ) . '/../../core/Controllers/GenreController.php';

class GenreRestController extends GenreController {
	
	public function __construct() {
		parent::__construct();
	}

	/**
	* RCgetAllCategories
	* 
 	* get all the categories.
 	* 
 	* @return array $categories / array 
 	*/
	public function RCgetAllCategories() {
		echo json_encode($this->CgetAllCategories());
	}

	/**
	* RCgetAlbumsInCategoryById
	* 
 	* get all albums in a given category ID.
 	* 
 	* @return array $albums / array
 	*/
	public function RCgetAlbumsInCategoryById( $category_id ) {
		echo json_encode($this->CgetAlbumsInCategoryById($category_id));
	}
} 