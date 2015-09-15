<?php

require_once dirname( __FILE__ ) . '/Model.php';

class AlbumModel extends Model {

	public function __construct() {
		parent::__construct();
	}
	/**
	* getAlbumsDetailsByAlbumId
	* 
 	* get album details by album id.
 	* 
 	* @param  int $album_id album id.
 	* 
 	* @return array $album / array 
 	*/
	public function getAlbumsDetailsByAlbumId( $album_id ) {
		$aid = $this->escapeString($album_id);
		$query = 	"SELECT
					a.album_name,a.album_artist,a.album_release_year,a.album_description,
					a.album_long_description,a.album_created,a.album_price,
					a_s.album_stock,i.image_path,i.image_title,g.genre_id
					FROM 
					albums AS a,
					albums_stock AS a_s, 
					images AS i,
					images_to_albums AS i_t_a,
					genres_to_albums AS g
					WHERE a.album_id = '$aid'
					AND g.album_id = a.album_id
					AND a_s.album_id = a.album_id
					AND i_t_a.album_id = a.album_id
					AND i.image_id = i_t_a.image_id";
		$results = $this->query($query);
		if (isset($results[0])) {
			$album = array('data' => $results[0],'success' => true);
			return $album;
		}
		apiConf::$ERROR = 'get album failed';
	}
	/**
	* getLatestAlbums
	* 
 	* get 9 latest albums.
 	* 
 	* @return array $albums / array
 	*/
	public function getLatestAlbums() {
		$query = 	"SELECT
					a.album_id,a.album_name,a.album_artist,
					i.image_path,i.image_title
					FROM 
					albums AS a,
					images AS i,
					images_to_albums AS i_t_a
					WHERE a.album_id = i_t_a.image_id
					AND i.image_id = i_t_a.image_id
					ORDER BY a.album_created DESC
					LIMIT 9
					";
		$results = $this->query($query);
		$results_count = count($results); 
		if ( $results_count > 0 ) {
			$albums = array('data' => array());
			foreach ($results as  $v) {
				array_push($albums['data'], $v);
			}
			$albums['success'] = true;
			return $albums;
		}
		apiConf::$ERROR = 'get latest albums failed';
	}
	/**
	* getSongsInAlbumById
	* 
 	* get all songs in album by ID.
 	* 
 	* @param int album id.
 	* 
 	* @return array $songs / array
 	*/
	public function getSongsInAlbumById( $album_id ) {
		$aid = $this->escapeString($album_id);
		$query = 	"SELECT s.song_id,s.song_name,s.song_duration,s.song_path 
					FROM songs AS s, 
					songs_to_albums AS s_t_a
					WHERE s_t_a.album_id = '$aid'
					AND s_t_a.song_id = s.song_id ";
		$results = $this->query($query);
		$results_count = count($results); 
		if ( $results_count > 0 ) {
			$songs = array('data' => array());
			foreach ($results as $v) {
				array_push($songs['data'], $v);
			}
			$songs['success'] = true;
			return $songs;
		}
		apiConf::$ERROR = 'get songs in album';
	}
	/**
	* getAlbumsByTerm
	* 
 	* get all albums that that contains name.
 	* 
 	* @param string $term the term to search.
 	* 
 	* @return array $albums / array 
 	*/
	public function getAlbumsByTerm( $term ) {
		$t = $this->escapeString($term);
		$query = 	"SELECT
					a.album_name,a.album_artist,a.album_release_year,a.album_id,i.image_path
					FROM 
					albums AS a,
					images AS i,
					images_to_albums AS i_t_a
					WHERE (a.album_name LIKE '%$t%'
					OR a.album_artist LIKE '%$t%')
					AND i_t_a.album_id = a.album_id
					AND i.image_id = i_t_a.image_id";
		$results = $this->query($query);
		$results_count = count($results); 
		if ( $results_count > 0 ) {
			$albums = array('data' => array());
			foreach ($results as $v) {
				array_push($albums['data'], $v);		
			}	
		
			$albums['success'] = true;
			return $albums;
		}
		apiConf::$ERROR = 'get album by term failed';
	}

	/**
	 * get albums by array of id's
	 * @param  array $arrayIds array of id's
	 * @return array           albums data.
	 */
	public function getAlbumsByIds($arrayIds){
		$array = $this->escapeString($arrayIds);
		$query = "SELECT
				a.album_id,a.album_name,a.album_artist,a.album_price,
				i.image_path,i.image_title
				FROM 
				albums AS a,
				images AS i,
				images_to_albums AS i_t_a
				WHERE a.album_id = i_t_a.image_id
				AND i.image_id = i_t_a.image_id
				AND (";
		$array_count = count($array);
		$i = 0;
		if($array_count < 0){
			apiConf::$ERROR = 'no ids found';
		}
		else{
			foreach ($array as $value) {
				$i++;
				$query .= "a.album_id='$value'";
				if($i < $array_count){
					$query .= " OR ";
				}
			}
			$query .= ")";
			$results = $this->query($query);
			$results_count = count($results); 
			if ( $results_count > 0 ) {
				$albums = array('data' => array());
				foreach ($results as $v) {
					array_push($albums['data'], $v);		
				}	
			
				$albums['success'] = true;
				return $albums;
			}
			apiConf::$ERROR = 'get albums failed';
		}
	}
}