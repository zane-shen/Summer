<?php
header('Content-type: application/json');
$lineName=array("Our Recommendation","Your Choice");
$input=array();
$input[0]=(int)($_POST['risk']);#risk
$input[1]=(int)($_POST['retirementYearsOld']);#age
$input[2]=(int)($_POST['retirementIncome']);#income
$input[3]=(int)($_POST['retirementRetireYearOld']);#re_age
$input[4]=(int)($_POST['retirementSpend']);#payout
$input[5]=(int)($_POST['retireSpendYears']);#after_time
$input[7]=(int)($_POST['retireRecommendSaving']);#rec_topup
$input[8]=(int)($_POST['retireYourInvestment']);#initial
$input[9]=(int)($_POST['retireYourMonthSaving']);#topup
$input[10]=(int)($_POST['userSliderFlag']);

if($input[10]==0){
  exec("/usr/bin/python ./retirement_before.py $input[0] $input[2] $input[1] $input[3] $input[4] $input[5]  $input[8] $input[9] ",$out,$ret);}//直接执行,$out 返回值，$ret 返回状态
else {
  exec("/usr/bin/python ./retirement_after.py $input[0] $input[2] $input[1] $input[3] $input[4] $input[5]  $input[8] $input[9] $input[7]",$out,$ret);}//直接执行,$out 返回值，$ret 返回状态

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
$linedata=array( array(),array());
$y=0;
$retirementSavingSliderMax=(int)($out[0]);
$rec_initial=(int)($out[1]);

if($input[10]==0)
  $ini_rec_topup=(int)($out[2]);
else
  $ini_rec_topup=(int)($input[7]);

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
          'retirementSavingSliderMax'=>$retirementSavingSliderMax,
          'retirementInitMonthSaving'=>$ini_rec_topup,
          'retireRecommendInvestment'=>$rec_initial,
          'lineName' => $lineName,
          'xYears' => $xYears,
          'data' => array(
            array(
              'name' => 'Our Recommendation',
              'type'=>'line',
              'smooth'=>true,
              'showSymbol'=>false,
              'areaStyle'=>$areaStyle,
              'data' => $linedata[0]
            ),
            array(
              'name' => 'Your Choice',
              'type'=>'line',
              'smooth'=>true,
              'showSymbol'=>false,
              'itemSytle'=>$itemStyle,
              'data' => $linedata[1]
            )
          )
    );
echo json_encode($result);
 ?>
