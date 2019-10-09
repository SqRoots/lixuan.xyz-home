<?php
header('Content-type: text/plain;charset=UTF-8');   //返回JSON数据格式
header('Access-Control-Allow-Origin:*');           //允许所有来源访问
header('Access-Control-Allow-Method:POST,GET');    //允许访问的方式

require_once '/www/wwwroot/lixuan.xyz/blog/wp-load.php';
if (  is_user_logged_in() ) {
  switch ($_GET['catalog']) {
      case 'Web':
          $table = 'web';
          break;
      case 'Data':
          $table = 'data';
          break;
      case 'Software':
          $table = 'software';
          break;
      case 'Motto':
          $table = 'motto';
          break;
      case 'Download':
          $table = 'download';
          break;
  }

  $db = new SQLite3('collection.sqlite3');
        $statement = $db->prepare("delete FROM {$table} WHERE id = :id");
        $statement->bindValue(':id', $_GET["id"]);
        $result = $statement->execute();
        //var_dump($result);
        $db->close();
  echo "id={$_GET['id']}的项目已删除！";
} else {
  echo '【未登录】<br>';
  echo '仅管理员和作者有此权限！';
}
