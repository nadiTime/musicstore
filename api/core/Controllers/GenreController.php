<?php

require_once dirname( __FILE__ ) . '/../Models/GenreModel.php';

class GenreController extends GenreModel {
	
	public function __construct() {
		parent::__construct();
	}

	/**
	* CgetAllCategories
	* 
 	* get all the categories.
 	* 
 	* @return array $categories / array 
 	*/
	public function CgetAllCategories() {
		return $this->getAllCategories();
	}

	/**
	* CgetAlbumsInCategoryById
	* 
 	* get all albums in a given category ID.
 	* 
 	* @return array $albums / array
 	*/
	public function CgetAlbumsInCategoryById( $category_id ) {
		return $this->getAlbumsInCategoryById($category_id);
	}
} 