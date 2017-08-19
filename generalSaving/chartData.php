<?php
header('Content-type: application/json');
$lineName=array("Bull Market","Normal Market","Weak Market","Deposit Only");
$input=array();
$input[0]=(int)($_POST['risk']);
$input[1]=(int)($_POST['generalPeriod']);
$input[2]=(int)($_POST['initialInvestment']);
$input[3]=(int)($_POST['mothlySaving']);

exec("/usr/bin/python ./generalSaving.py $input[0] $input[1] $input[2] $input[3]",$out,$ret);//直接执行,$out 返回值，$ret 返回状态
if(strlen($out[0])>20)
  {
    array_shift($out);
  }

$lenth=(int)($out[0]);

$xYears=array();
$time=date('Y-m');
$xYears[]=$time;
for($x=0;$x<$lenth;$x++)
{
  $time=date('Y-m',strtotime("+1 month",strtotime($time)));
  $xYears[]=$time;
}

$linedata=array( array(),array(),array(),array());
$y=0;
for($x=2;$x<sizeof($out);++$x)
{
  if($out[$x]!="flag"){
    $linedata[$y][]=(int)($out[$x]);
  }
  else {
      ++$y;
  }
}

$areaStyle = array("normal"=>array('type'=>'default'));
$result = array(
          'lineName' => $lineName,
          'xYears' => $xYears,
          'data' => array(
            array(
              'name' => 'Bull Market',
              'type'=>'line',
              'smooth'=>true,
              'showSymbol'=>false,
              //'itemSytle'=>$itemStyle,
              'data' => $linedata[0]
            ),
            array(
              'name' => 'Normal Market',
              'type'=>'line',
              'smooth'=>true,
              'showSymbol'=>false,
              'areaStyle'=>$areaStyle,
              'data' => $linedata[1]
            ),
            array(
              'name' => 'Weak Market',
              'type'=>'line',
              'smooth'=>true,
              'showSymbol'=>false,
              //'itemSytle'=>$itemStyle,
              'data' => $linedata[2]
            ),
            array(
              'name' => 'Deposit Only',
              'type'=>'line',
              'smooth'=>true,
              'showSymbol'=>false,
              //'itemSytle'=>$itemStyle,
              'data' => $linedata[3]
            )
          )
    );

echo json_encode($result);

 ?>
