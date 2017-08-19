<?php
header('Content-type: application/json');
$lineName=array("Bull Market","Normal Market","Weak Market","Our Recommendation");
$input=array();
$input[0]=(int)($_POST['risk']);#risk
$input[1]=(int)($_POST['majorYearsOld']);#pur_time
$input[2]=(int)($_POST['majorMoney']);#purchase
$input[3]=(int)($_POST['majorMonthIncome']);#income
$input[4]=(int)($_POST['majorRecommendSaving']);#rec_topup
$input[5]=(int)($_POST['majorYourInvestment']);#initial
$input[6]=(int)($_POST['majorYourMonthSaving']);#topup
$input[7]=(int)($_POST['userSliderFlag']);#flag

if($input[7]==0){
exec("/usr/bin/python ./educationMajorPurchaseBefore.py $input[0] $input[2] $input[1] $input[3] $input[5] $input[6]",$out,$ret);}//直接执行,$out 返回值，$ret 返回状态
else {
exec("/usr/bin/python ./educationMajorPurchaseAfter.py $input[0] $input[2] $input[1] $input[3] $input[5] $input[6] $input[4]",$out,$ret);}//直接执行,$out 返回值，$ret 返回状态
if(strlen($out[0])>20)
  {
    array_shift($out);
  }
$lenth=(int)($out[3]);
$xYears=array();
$time=date('Y-m');
$xYears[]=$time;
for($x=0;$x<$lenth;$x++)
{
  $time=date('Y-m',strtotime("+1 month",strtotime($time)));
  $xYears[]=$time;
}
$retirementSavingSliderMax=(int)($out[0]);
$rec_initial=(int)($out[1]);
if($input[7]==0)
  $ini_rec_topup=(int)($out[2]);
else
  $ini_rec_topup=(int)($input[4]);

$linedata=array( array(),array(),array(),array());
$y=0;
for($x=5;$x<sizeof($out);++$x)
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
  'majorSavingSliderMax'=>$retirementSavingSliderMax,
  'majorInitMonthSaving'=>$ini_rec_topup,
  'majorRecommendInvestment'=>$rec_initial,
          'lineName' => $lineName,
          'xYears' => $xYears,
          'data' => array(
            array(
              'name' => 'Bull Market',
              'type'=>'line',
              'smooth'=>true,
              'showSymbol'=>false,
              //'areaStyle'=>$areaStyle,
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
            //  'areaStyle'=>$areaStyle,
              'data' => $linedata[2]
            ),
            array(
              'name' => 'Our Recommendation',
              'type'=>'line',
              'smooth'=>true,
              'showSymbol'=>false,
            //  'areaStyle'=>$areaStyle,
              'data' => $linedata[3]
            )
          )
    );

echo json_encode($result);
 ?>
