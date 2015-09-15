<?php

require_once dirname( __FILE__ ) . '/../../core/Controllers/AlbumController.php';

class AlbumRestController extends AlbumController {
	
	public function __construct() {
		parent::__construct();
	}

	/**
	 * RCgetAlbumsDetailsByAlbumId
	 * 
	 * get all abums details.
	 * 
	 * @param int $album_id album id.
	 *
	 * @return array album details. 
	 */
	public function RCgetAlbumsDetailsByAlbumId( $album_id ){
		return json_encode($this->CgetAlbumsDetailsByAlbumId($album_id));
	}

	/**
	* RCgetLatestAlbums
	* 
 	* get 9 latest albums.
 	* 
 	* @return array $albums / array
 	*/
	public function RCgetLatestAlbums() {
		return json_encode($this->CgetLatestAlbums());
	}

	/**
	* RCgetSongsInAlbumById
	* 
 	* get all songs in album by ID.
 	* 
 	* @param int album id.
 	* 
 	* @return array $songs / array
 	*/
	public function RCgetSongsInAlbumById( $album_id ) {
		return json_encode($this->CgetSongsInAlbumById($album_id));
	}

	/**
	* RCgetAlbumsByTerm
	* 
 	* get all albums that that contains name.
 	* 
 	* @param string $term the term to search.
 	* 
 	* @return array $albums / array 
 	*/
	public function RCgetAlbumsByTerm( $term ) {
		return json_encode($this->CgetAlbumsByTerm($term));
	}

	/**
	* RCgetAlbumsByids
	* 
 	* get all albums with specific ids.
 	* 
 	* @param array $ids albums ids.
 	* 
 	* @return array $albums / array 
 	*/
	public function RCgetAlbumsByids( $ids ) {
		return json_encode($this->CgetAlbumsByIds(json_decode($ids),true));
	}
} 