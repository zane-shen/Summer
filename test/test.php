<?php
/*
echo "fuck";
$data=json_encode($_POST);
echo $data;
echo "data";
echo "post";
echo $data['age'];
echo '</br>';
echo $_POST['score'];*/
echo "post</br>";
echo $_POST['age'][1];
// $result = array();

// 获得原始输入内容
// $json = file_get_contents("php://input");
//var_dump($input_str);

// JSON转换为PHP对象
// $obj = json_encode($_POST);
//$a = $obj->a; // var_dump($a);
//$b = $obj->b; // var_dump($b);
// echo "obj</br>";
// var_dump($obj);
// echo "post</br>";
// var_dump($_POST);
// echo "post</br>";

//$result["result"] = $a + $b;
echo json_encode($result, JSON_NUMERIC_CHECK);
?>
