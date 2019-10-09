<?php
// 文件存储于 /www/wwwroot/lixuan.xyz/home-data

header('Content-type: text/json;charset=UTF-8');
header('Access-Control-Allow-Origin:*');           //允许所有来源访问
header('Access-Control-Allow-Method:POST,GET');    //允许访问的方式

//根据路径查找json文件
$file_path = $_GET['file_path'];

//读取json文件
$str = '';
if(file_exists($file_path)){
	$fp = fopen($file_path,"r");
	$str = fread($fp,filesize($file_path));
	fclose($fp);
}

//返回json字符串
echo $str;
