<?php
header('Content-type: text/plain;charset=UTF-8');   //返回JSON数据格式
header('Access-Control-Allow-Origin:*');           //允许所有来源访问
header('Access-Control-Allow-Method:POST,GET');    //允许访问的方式

require_once '/www/wwwroot/lixuan.xyz/blog/wp-load.php';

if ( is_user_logged_in() ) {
  // wp_get_current_user();
  switch ($_POST['catalog']) {
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
  // 连接数据库
  $db = new SQLite3('collection.sqlite3');

  if ($table != 'motto') {
    // 网站，数据，软件
    $stmt = $db->prepare("
      update {$table}
      set
      name=:name,
      name_cn=:name_cn,
      url=:url,
      slogan=:slogan,
      establisher=:establisher,
      category=:category,
      type=:type,
      \"order\"=:order,
      visible=:visible,
      description_html=:description_html
      where id=:id
    ");
    $visible = $_POST['visible']? 1:0;
    $stmt->bindValue(':id',                $_POST['id'],                               SQLITE3_INTEGER);
    $stmt->bindValue(':name',              stripslashes($_POST['name']),               SQLITE3_TEXT);
    $stmt->bindValue(':name_cn',           stripslashes($_POST['name_cn']),            SQLITE3_TEXT);
    $stmt->bindValue(':url',               stripslashes($_POST['url']),                SQLITE3_TEXT);
    $stmt->bindValue(':slogan',            stripslashes($_POST['slogan']),             SQLITE3_TEXT);
    $stmt->bindValue(':establisher',       stripslashes($_POST['establisher']),        SQLITE3_TEXT);
    $stmt->bindValue(':category',          stripslashes($_POST['category']),           SQLITE3_TEXT);
    $stmt->bindValue(':type',              stripslashes($_POST['type']),               SQLITE3_TEXT);
    $stmt->bindValue(':order',             $_POST['order'],                            SQLITE3_INTEGER);
    $stmt->bindValue(':visible',           $visible,                                   SQLITE3_INTEGER);
    $stmt->bindValue(':description_html',  stripslashes($_POST['description_html']),   SQLITE3_TEXT);
  } else {
    // 格言
    $stmt = $db->prepare("
      update {$table}
      set
      user_id=:user_id,
      type=:type,
      source=:source,
      author=:author,
      tags=:tags,
      visible=:visible,
      content_html=:content_html
      where id=:id
    ");
    $visible = $_POST["visible"]? 1:0;
    $stmt->bindValue(':id',             stripslashes($_POST["id"]),               SQLITE3_INTEGER);
    $stmt->bindValue(':user_id',        $user_ID,                                 SQLITE3_INTEGER);
    $stmt->bindValue(':type',           stripslashes($_POST["type"]),             SQLITE3_TEXT);
    $stmt->bindValue(':source',         stripslashes($_POST["source"]),           SQLITE3_TEXT);
    $stmt->bindValue(':author',         stripslashes($_POST["author"]),           SQLITE3_TEXT);
    $stmt->bindValue(':tags',           stripslashes($_POST["tags"]),             SQLITE3_TEXT);
    $stmt->bindValue(':visible',        $visible,                                 SQLITE3_INTEGER);
    $stmt->bindValue(':content_html',   stripslashes($_POST["content_html"]),     SQLITE3_TEXT);
  }

  $result = $stmt->execute();
  if(!$result){
     echo '修改失败！\n';
     //echo $db->lastErrorMsg();
   } else {
     echo '已修改 '.$db->changes().' 记录！';
   }
  $db->close();
} else {
  echo '【未登录】<br>';
  echo '仅管理员和作者有此权限！';
}
