<?php
header('Content-type: text/json;charset=UTF-8');   //返回JSON数据格式
header('Access-Control-Allow-Origin:*');           //允许所有来源访问
header('Access-Control-Allow-Method:POST,GET');    //允许访问的方式

switch ($_GET['catalog']) {
    case 'Web':
        $sql = 'select * from web';
        break;
    case 'Data':
        $sql = 'select * from data';
        break;
    case 'Software':
        $sql = 'select * from software';
        break;
    case 'Motto':
        $sql = 'select * from motto';
        break;
    case 'Download':
        $sql = 'select * from download';
        break;
}

$db = new SQLite3('collection.sqlite3');
$statement = $db->prepare($sql);
$result = $statement->execute();

$data = array();
while ($row = $result->fetchArray()) {
    array_push($data,$row);
}
echo json_encode(array('data'=>$data), JSON_UNESCAPED_UNICODE);
