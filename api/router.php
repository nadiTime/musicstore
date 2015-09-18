<?php
require_once getcwd() . '/apiConf.php';
require 'application/REST/Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->contentType('application/json');

require_once dirname(__FILE__) . apiConf::$REST_PATH . 'AlbumRestController.php';
require_once dirname(__FILE__) . apiConf::$REST_PATH . 'GenreRestController.php';
require_once dirname(__FILE__) . apiConf::$REST_PATH . 'OrderRestController.php';
require_once dirname(__FILE__) . apiConf::$REST_PATH . 'UserRestController.php';
$album = new AlbumRestController();
$user = new UserRestController();
$genre = new GenreRestController();
$order = new OrderRestController();

$send = function($data) use ($app) {
	if ( apiConf::$ERROR != '' ) {
		$app->halt(400,apiConf::$ERROR);
		//$app->response->setStatus( 400 );
		//$app->response->write(apiConf::$ERROR );
	}
	else{
		echo $data;
	}
};

$app->get('/', function(){
	echo json_encode( array( "error" => 1, "msg" => "No method selected" ) );
});

//-----------------------------ALBUM----------------------------------//
$app->get( '/album/:id', function( $id ) use ( $send, $album ) {
	$send($album->RCgetAlbumsDetailsByAlbumId($id));
});

$app->get('/album/term/:term', function( $term ) use ( $send, $album ) {
	$send($album->RCgetAlbumsByTerm($term));
});

$app->get('/album/latest/', function() use ( $send, $album ) {
	$send($album->RCgetLatestAlbums());
});

$app->get('/album/songs/:id', function( $id ) use ( $send, $album ) {
	$send($album->RCgetSongsInAlbumById($id));
});

$app->post('/album/', function() use ( $send, $album, $app ) {
	$send($album->RCgetAlbumsByids($app->request->getBody()));
});

//-----------------------------CATEGORIES----------------------------------//
$app->get('/category/', function() use ( $send, $genre ) {
	$send($genre->RCgetAllCategories());
});

$app->get('/category/:id', function( $id ) use ( $send, $genre ) {
	$send($genre->RCgetAlbumsInCategoryById($id));
});

//-----------------------------USER----------------------------------//
$app->post('/user/login/', function() use ( $app, $send, $user ) {
	$send($user->RCloginReg($app->request->getBody()));
});

// TODO || this one
$app->post('/user/login/fb', function() use ( $app, $send, $user ) {
	$send($user->RCloginFacebookUser($app->request->getBody()));
});

$app->post('/user/add/reg', function() use ( $app, $send, $user ) {
	$send($user->RCaddRegUser($app->request->getBody()));
});
// TODO || this one
$app->post('/user/add/fb', function() use ( $app, $send, $user ) { 
	$send($user->RCloginReg($app->request->getBody()));
});

//-----------------------------ORDER----------------------------------//
$app->post('/order/checkout/', function() use ( $app, $send, $order ) { 
	$send($order->RCcheckoutOrder($app->request->getBody()));
});

$app->run();