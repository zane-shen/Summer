<?php
header('Content-Type:application/json;charset=utf-8');
$input=[];
for($x=0;$x<8;$x++)
{
	switch($_POST['answers'][$x])
	{
		case 'A':
			$input[$x]=1;
			break;
		case 'B':
			$input[$x]=2;
			break;
		case 'C':
			$input[$x]=3;
			break;
		case 'D':
			$input[$x]=4;
			break;
		case 'E':
			$input[$x]=5;
			break;
		default:
			break;
		}
}
exec("/usr/bin/python riskprofile.py $input[0] $input[1] $input[2] $input[3] $input[4] $input[5] $input[6] $input[7]",$out,$ret);//直接执行
if(strlen($out[0])>20)
  {
    array_shift($out);
  }
$result=array('barChart'=>array(
							'yourRisk'=>$out[0],
							'part_1_level'=>$out[1],
							'part_2_level'=>$out[2],
							'part_3_level'=>$out[3]
						),
						'recommendValue'=>$out[0],
						'text1'=>$out[4],
						'text2'=>$out[5],
						'text3'=>$out[6]
);
echo json_encode($result);
// var_dump($out);
?>
