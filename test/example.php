<?php
$input=[1,2,3,4,5,1,1,1];
exec("/usr/bin/python ./example.py 1 2 3",$out,$ret);//直接执行，没有返回值
var_dump($out);

?>
