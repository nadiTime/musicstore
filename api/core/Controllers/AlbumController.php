<?php
require_once dirname( __FILE__ ) . '/../Models/AlbumModel.php';

class AlbumController extends AlbumModel {
	
	public function __construct() {
		parent::__construct();
	}
	/**
	 * CgetAlbumsDetailsByAlbumId
	 * 
	 * get all abums details.
	 * 
	 * @param int $album_id album id.
	 *
	 * @return array album details. 
	 */
	public function CgetAlbumsDetailsByAlbumId( $album_id ){
		return $this->getAlbumsDetailsByAlbumId($album_id);
	}

	/**
	* CgetLatestAlbums
	* 
 	* get 9 latest albums.
 	* 
 	* @return array $albums / array
 	*/
	public function CgetLatestAlbums() {
		return $this->getLatestAlbums();
	}

	/**
	* CgetSongsInAlbumById
	* 
 	* get all songs in album by ID.
 	* 
 	* @param int album id.
 	* 
 	* @return array $songs / array
 	*/
	public function CgetSongsInAlbumById( $album_id ) {
		return $this->getSongsInAlbumById($album_id);
	}

	/**
	* CgetAlbumsByTerm
	* 
 	* get all albums that that contains name.
 	* 
 	* @param string $term the term to search.
 	* 
 	* @return array $albums / array 
 	*/
	public function CgetAlbumsByTerm( $term ) {
		return $this->getAlbumsByTerm($term);
	}

	/**
	* CgetAlbumsByIds
	* 
 	* get albums for specific Ids.
 	* 
 	* @param array $ids albums ids.
 	* 
 	* @return array $albums / array 
 	*/
	public function CgetAlbumsByIds($ids){
		return $this->getAlbumsByIds($ids);
	}
} 