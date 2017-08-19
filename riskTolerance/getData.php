<?php
header('Content-type: application/json');
$name=array("US NASDQ","US Large Cap","Emerging Market","Developed Market","Real Estate","Gold","US Long-term Treasury Bond", "US Corporate Bond","US Total Bond Market");
$text1Area=array("PowerShares QQQ<br>Expense Ratio: 0.20%","Vanguard Total US Stock Market<br>Expense Ratio: 0.04%","Vanguard FTSE Emerging Markets ETF<br>Expense Ratio: 0.14%",
"Vanguard FTSE Developed Markets ETF<br>Expense Ratio: 0.07%","Vanguard U.S. REIT fund<br>Expense Ratio: 0.14%","SPDR Gold Trust<br>Expense Ratio: 0.40%",
"iShares 20+ Year Treasury Bond ETF<br>Expense Ratio: 0.15%","iShares iBoxx $ Investment Grade Corporate Bond ETF<br>Expense Ratio: 0.15%",
"Vanguard Total Bond Market ETF<br>Expense Ratio: 0.05%");
$text2Area=array( "It tracks a modified-market-cap-weighted index of 100 <br>NASDAQ-listed stocks. The fund only invests in nonfinancial  <br>stocks listed on NASDAQ, which has large tech exposure.",
                  "It tracks a cap-weighted index that measures the investable <br> US equities market, encompassing the entire market-cap <br> spectrum.",
                  "It tracks a market-cap-weighted index of emerging-market <br> stocks, excluding South Korea. It has more space for China, <br> Brazil, India and the rest of the emerging nations compared <br>with  MSCI benchmark.",
                  "It tracks a market-cap weighted index of large-, mid- and <br> small-cap stocks from developed markets outside the US. ",
                  "It tracks a market-cap-weighted index of emerging-market <br> stocks, excluding South Korea. It has more space for China, <br> Brazil, India and the rest of the emerging nations compared <br>with  MSCI benchmark.",
                  "It tracks the gold spot price, less expenses and liabilities, <br> using gold bars held in London vaults. It is the largest <br> ETF to invest directly in physical gold.",
                  "It tracks a market-weighted index of debt issued by the US  <br>Treasury with remaining maturities of 20 years or more. <br> It effectively captures the far end of the Treasury curve in a  <br>liquid package.",
                  "It tracks a market-weighted index of US corporate investment-grade <br> bonds across the maturity spectrum.",
                  "It tracks a broad, market-value-weighted index of US dollar-denominated,  <br>investment-grade, taxable, fixed-income  <br>securities with maturities of at least one year."
);
$value=array(0,0,0,0,0,0,0,0,0);
switch($_POST['risk'])
{
  case '1':
    $value=array(0.107428972,0.014716185,0.045746439,0.038226326,0.148548531,0.162668612,0.482664935);
    $nameArea=array($name[1],$name[2],$name[3],$name[4],$name[5],$name[6],$name[8]);
    $text1=array($text1Area[1],$text1Area[2],$text1Area[3],$text1Area[4],$text1Area[5],$text1Area[6],$text1Area[8]);
    $text2=array($text2Area[1],$text2Area[2],$text2Area[3],$text2Area[4],$text2Area[5],$text2Area[6],$text2Area[8]);
    $result=array(
        "nameArea"=>$nameArea,
      'pieChartData'=>array(
      array("value"=>$value[0] , "name"=>$nameArea[0] , 'text1'=>$text1[0] , 'text2'=>$text2[0] ),
      array("value"=>$value[1] , "name"=>$nameArea[1] , 'text1'=>$text1[1] , 'text2'=>$text2[1] ),
      array("value"=>$value[2] , "name"=>$nameArea[2] , 'text1'=>$text1[2] , 'text2'=>$text2[2] ),
      array("value"=>$value[3] , "name"=>$nameArea[3] , 'text1'=>$text1[3] , 'text2'=>$text2[3] ),
      array("value"=>$value[4] , "name"=>$nameArea[4] , 'text1'=>$text1[4] , 'text2'=>$text2[4] ),
      array("value"=>$value[5] , "name"=>$nameArea[5] , 'text1'=>$text1[5] , 'text2'=>$text2[5] ),
      array("value"=>$value[6] , "name"=>$nameArea[6] , 'text1'=>$text1[6] , 'text2'=>$text2[6] )

    ));
    break;
  case '2':
    $value=array(0.168513587,0.023083877,0.071758077,0.059961994,0.142305546,0.217877482,0.07516697,0.241332468);
    $nameArea=array($name[1],$name[2],$name[3],$name[4],$name[5],$name[6],$name[7],$name[8]);
    $text1=array($text1Area[1],$text1Area[2],$text1Area[3],$text1Area[4],$text1Area[5],$text1Area[6],$text1Area[7],$text1Area[8]);
    $text2=array($text2Area[1],$text2Area[2],$text2Area[3],$text2Area[4],$text2Area[5],$text2Area[6],$text2Area[7],$text2Area[8]);
    $result=array(
        "nameArea"=>$nameArea,
      'pieChartData'=>array(
      array("value"=>$value[0] , "name"=>$nameArea[0] , 'text1'=>$text1[0] , 'text2'=>$text2[0] ),
      array("value"=>$value[1] , "name"=>$nameArea[1] , 'text1'=>$text1[1] , 'text2'=>$text2[1] ),
      array("value"=>$value[2] , "name"=>$nameArea[2] , 'text1'=>$text1[2] , 'text2'=>$text2[2] ),
      array("value"=>$value[3] , "name"=>$nameArea[3] , 'text1'=>$text1[3] , 'text2'=>$text2[3] ),
      array("value"=>$value[4] , "name"=>$nameArea[4] , 'text1'=>$text1[4] , 'text2'=>$text2[4] ),
      array("value"=>$value[5] , "name"=>$nameArea[5] , 'text1'=>$text1[5] , 'text2'=>$text2[5] ),
      array("value"=>$value[6] , "name"=>$nameArea[6] , 'text1'=>$text1[6] , 'text2'=>$text2[6] ),
      array("value"=>$value[7] , "name"=>$nameArea[7] , 'text1'=>$text1[7] , 'text2'=>$text2[7] )
    ));
    break;
  case '3':
    $value=array(0.229598203,0.031451569,0.097769716,0.081697662,0.13606256,0.273086352,0.150333939);
    $nameArea=array($name[1],$name[2],$name[3],$name[4],$name[5],$name[6],$name[7]);
    $text1=array($text1Area[1],$text1Area[2],$text1Area[3],$text1Area[4],$text1Area[5],$text1Area[6],$text1Area[7]);
    $text2=array($text2Area[1],$text2Area[2],$text2Area[3],$text2Area[4],$text2Area[5],$text2Area[6],$text2Area[7]);
    $result=array(
        "nameArea"=>$nameArea,
      'pieChartData'=>array(
      array("value"=>$value[0] , "name"=>$nameArea[0] , 'text1'=>$text1[0] , 'text2'=>$text2[0] ),
      array("value"=>$value[1] , "name"=>$nameArea[1] , 'text1'=>$text1[1] , 'text2'=>$text2[1] ),
      array("value"=>$value[2] , "name"=>$nameArea[2] , 'text1'=>$text1[2] , 'text2'=>$text2[2] ),
      array("value"=>$value[3] , "name"=>$nameArea[3] , 'text1'=>$text1[3] , 'text2'=>$text2[3] ),
      array("value"=>$value[4] , "name"=>$nameArea[4] , 'text1'=>$text1[4] , 'text2'=>$text2[4] ),
      array("value"=>$value[5] , "name"=>$nameArea[5] , 'text1'=>$text1[5] , 'text2'=>$text2[5] ),
      array("value"=>$value[6] , "name"=>$nameArea[6] , 'text1'=>$text1[6] , 'text2'=>$text2[6] )

    ));
    break;
  case '4':
    $value=array(0.150036904,0.114799101,0.040286881,0.125234989,0.104648006,0.113083521,0.226965934,0.124944665);
    $nameArea=array($name[0],$name[1],$name[2],$name[3],$name[4],$name[5],$name[6], $name[7]);
    $text1=array($text1Area[0],$text1Area[1],$text1Area[2],$text1Area[3],$text1Area[4],$text1Area[5],$text1Area[6], $text1Area[7]);
    $text2=array($text2Area[0],$text2Area[1],$text2Area[2],$text2Area[3],$text2Area[4],$text2Area[5],$text2Area[6], $text2Area[7]);
    $result=array(
        "nameArea"=>$nameArea,
      'pieChartData'=>array(
      array("value"=>$value[0] , "name"=>$nameArea[0] , 'text1'=>$text1[0] , 'text2'=>$text2[0] ),
      array("value"=>$value[1] , "name"=>$nameArea[1] , 'text1'=>$text1[1] , 'text2'=>$text2[1] ),
      array("value"=>$value[2] , "name"=>$nameArea[2] , 'text1'=>$text1[2] , 'text2'=>$text2[2] ),
      array("value"=>$value[3] , "name"=>$nameArea[3] , 'text1'=>$text1[3] , 'text2'=>$text2[3] ),
      array("value"=>$value[4] , "name"=>$nameArea[4] , 'text1'=>$text1[4] , 'text2'=>$text2[4] ),
      array("value"=>$value[5] , "name"=>$nameArea[5] , 'text1'=>$text1[5] , 'text2'=>$text2[5] ),
      array("value"=>$value[6] , "name"=>$nameArea[6] , 'text1'=>$text1[6] , 'text2'=>$text2[6] ),
      array("value"=>$value[7] , "name"=>$nameArea[7] , 'text1'=>$text1[7] , 'text2'=>$text2[7] )
    ));
    break;
  case '5':
    $value=array(0.300073807,0.049122193,0.152700262,0.12759835,0.090104481,0.180845516,0.099555392);
    $nameArea=array($name[0],$name[2],$name[3],$name[4],$name[5],$name[6], $name[7]);
    $text1=array($text1Area[0],$text1Area[2],$text1Area[3],$text1Area[4],$text1Area[5],$text1Area[6], $text1Area[7]);
    $text2=array($text2Area[0],$text2Area[2],$text2Area[3],$text2Area[4],$text2Area[5],$text2Area[6], $text2Area[7]);
    $result=array(
        "nameArea"=>$nameArea,
      'pieChartData'=>array(
      array("value"=>$value[0] , "name"=>$nameArea[0] , 'text1'=>$text1[0] , 'text2'=>$text2[0] ),
      array("value"=>$value[1] , "name"=>$nameArea[1] , 'text1'=>$text1[1] , 'text2'=>$text2[1] ),
      array("value"=>$value[2] , "name"=>$nameArea[2] , 'text1'=>$text1[2] , 'text2'=>$text2[2] ),
      array("value"=>$value[3] , "name"=>$nameArea[3] , 'text1'=>$text1[3] , 'text2'=>$text2[3] ),
      array("value"=>$value[4] , "name"=>$nameArea[4] , 'text1'=>$text1[4] , 'text2'=>$text2[4] ),
      array("value"=>$value[5] , "name"=>$nameArea[5] , 'text1'=>$text1[5] , 'text2'=>$text2[5] ),
      array("value"=>$value[6] , "name"=>$nameArea[6] , 'text1'=>$text1[6] , 'text2'=>$text2[6] )

    ));
    break;
  default:
    break;
}

echo json_encode($result);
// echo json_encode("fuck");
?>
