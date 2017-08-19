<?php
// header('Content-type: application/json');
// $a=array();
// $a[]='fuck';
// $a[]='fuck';
// $a[]='fuck';
// $a[]='fuck';
// $b=json_encode($a);
// $input=array();
// $input[0]=(int)($_POST['risk']);
// $input[1]=(int)($_POST['generalPeriod']);
// $input[2]=(int)($_POST['initialInvestment']);
// $input[3]=(int)($_POST['mothlySaving']);
// // print_r($a);
// // echo json_encode($input);
// echo date("Y,m,d")+date("0,1,0");
// // echo($b);
// echo date('Y').'-'.(date('m')+1).'-'.date('d');
// for($x=0;$x<500;$x++)
// {
//   $z=$x%12;
//   $y=int($x / 12);
//   $xYears[]=date('Y'+$y).'-'.(date('m')+$z).'-'.date('d');
// }
// $x=50;
// $input=array();
// $input[0]=(int)($_POST['risk']);#risk
// $input[1]=(int)($_POST['retirementYearsOld']);#age
// $input[2]=(int)($_POST['retirementIncome']);#income
// $input[3]=(int)($_POST['retirementRetireYearOld']);#re_age
// $input[4]=(int)($_POST['retirementSpend']);#payout
// $input[5]=(int)($_POST['retireSpendYears']);#after_time
// //$input[6]=(int)($_POST['retireRecommendInvestment']);#rec_initial需要计算
// $input[7]=(int)($_POST['retireRecommendSaving']);#rec_topup
// $input[8]=(int)($_POST['retireYourInvestment']);#initial
// $input[9]=(int)($_POST['retireYourMonthSaving']);#topup
$input=array(3,28,3000,60,2000,30,0,383,0,500);

exec("/usr/bin/python ./retirement_before.py $input[0] $input[2] $input[1] $input[3] $input[4] $input[5]  $input[8] $input[9] ",$out,$ret);//直接执行,$out 返回值，$ret 返回状态
var_dump($out);
// // 计算rec_initial
// print $input[4];
// print ($_POST['retirementSpend']);
// print "/usr/bin/python ./retirement.py $input[0] $input[1] $input[3] $input[4] $input[5] $input[7]";
// var_dump($input);

$rec_initial=0;
exec("/usr/bin/python ./retirement.py $input[0] $input[2] $input[1] $input[3] $input[4] $input[5] $input[7] $input[8] $input[9] $rec_initial",$out,$ret);//直接执行,$out 返回值，$ret 返回状态

// exec("/usr/bin/python ./test.py ",$out,$ret);//直接执行,
var_dump($out);
// $rec_initial = substr($rec_initial,0,strlen($rec_initial) - 1);
// var_dump((int)($rec_initial));

// echo date('Y-m-d',strtotime("+$x month"));
 ?>
