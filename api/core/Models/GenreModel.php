<?php

require_once dirname( __FILE__ ) . '/Model.php';

class GenreModel extends Model {

	public function __construct() {
		parent::__construct();
	}
	/**
	* getAllCategories
	* 
 	* get all the categories.
 	* 
 	* @return array $categories / array 
 	*/
	public function getAllCategories() {
		$query = 	"SELECT * FROM genres";
		$results = $this->query($query);
		$results_count = count($results);
		if ($results_count > 0){
			$albums = array('data' => array());
			foreach ($results as $v) {
				array_push($albums['data'],$v);
			}
			$albums['success'] = true;
			return $albums;
		}
		apiConf::$ERROR = 'get all categories failed';
	}
	/**
	* getAlbumsInCategoryById
	* 
 	* get all albums in a given category ID.
 	* 
 	* @return array $albums / array
 	*/
	public function getAlbumsInCategoryById( $category_id ) {
		$cid = $this->escapeString($category_id);
		$query = 	"SELECT
					a.album_id,a.album_name,a.album_artist,a.album_description,a.album_price,
					a.album_release_year,i.image_path,i.image_title,g.genre_name
					FROM 
					albums AS a,
					images AS i,
					genres AS g,
					images_to_albums AS i_t_a,
					genres_to_albums AS g_t_a
					WHERE  g_t_a.genre_id = '$cid'
					AND  g.genre_id = g_t_a.genre_id
					AND a.album_id = g_t_a.album_id 
					AND i_t_a.album_id = a.album_id
					AND i.image_id = i_t_a.image_id";
		$results = $this->_db->query($query);
		$results_count = count($results); 
		if ( $results_count > 0 ) {
			$albums = array('data' => array());
			foreach($results as $v){
				array_push($albums['data'], $v);
			}
			
			$albums['success'] = true;
			return $albums;
		}
		apiConf::$ERROR = 'get albums in category failed';
	}
}
