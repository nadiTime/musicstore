<?php

/**
 * append error message to error var.
 * @param  string $error_msg erro message to append.
 * @return void
 */
function appendError($error_msg = ''){
	global $ERROR;
	if($ERROR !== ''){$ERROR .= "<br/>";}
	$ERROR .= $error_msg;
}

/**
 * append success success message to success var.
 * @param  string $success_msg message to append.
 * @return void
 */
function appendSuccess($success_msg = ''){
	global $SUCCESS;
	if($SUCCESS !== ''){$SUCCESS .= "<br/>";}
	$SUCCESS .= $success_msg;
}

/**
 * dumps var to local php file.
 * @param  variable $var_msg the variable to dump.
 * @return void
 */
function varDump($var_msg){
	global $OUTPUT_PATH;
	ob_start();
	var_dump($var);
	$output = ob_get_clean();
	$filehandle = fopen($OUTPUT_PATH, 'w') or die("File creation error.");
	fwrite($filehandle, $output);
	fclose($filehandle);
}

/**
 * clear all errors at the start of each page call.
 * @return void
 */
function clearErrors(){
	global $ERROR_LOG_PATH;
	file_put_contents($ERROR_LOG_PATH, "");
}

?>