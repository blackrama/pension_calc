<?php
function calc_pensia() {
  if(isset($_POST["sex"]) && isset($_POST["birth"]) && isset($_POST["current_year"]) && isset($_POST["count_age_children"]) && isset($_POST["count_age_retiree"]) && isset($_POST["count_month_retiree"]) && isset($_POST[]) ?? isset($_POST["count_age_military"]) && isset($_POST["count_month_military"]) && isset($_POST["count_day_military"]) && isset($_POST["count_not_turn"]) && isset($_POST["hired_age"]) && isset($_POST["self_age"]) && isset($_POST["salary"]) && isset($_POST["count_children"])) {

    $sex = $_POST["sex"];
    $birth = $_POST["birth"];
    $current_year = $_POST["current_year"];
    $count_age_children =$_POST["count_age_children"];
    $count_age_retiree =$_POST["count_age_retiree"];
    $count_month_retiree = $_POST["count_month_retiree"];
    $count_age_military = $_POST["count_age_military"];
    $count_month_military = $_POST["count_age_military"];
    $count_day_military = $_POST["count_day_military"];
    $count_not_turn = $_POST["count_not_turn"];
    $hired_age = $_POST["hired_age"];
    $self_age = $_POST["self_age"];
    $salary = $_POST["salary"];
    $count_children = $_POST["count_children"];



    $resultat_to_html = "";
    $staj = 0;
     $children_staj = 0;
     $current_salary_coef = "";
        
     $retiree_score = 0;
     $children_coef = 0;

  $index_salary_coef = [
    0 => [
      "cur_year" => 2019,
      "cur_coef" => 87.24,
      "cur_salary" => 5334.19,
    ],
    1 => [
      "cur_year" => 2020,
      "cur_coef" => 93,
      "cur_salary" => 5686.25,
    ],
    2 => [
      "cur_year" => 2021,
      "cur_coef" => 98.86,
      "cur_salary" => 6044.48,
    ],
    3 => [
      "cur_year" => 2022,
      "cur_coef" => 104.69,
      "cur_salary" => 6401.10,
    ],
    4 => [
      "cur_year" => 2023,
      "cur_coef" => 110.55,
      "cur_salary" => 6759.56,
    ],
    5 => [
      "cur_year" => 2024,
      "cur_coef" => 116.63,
      "cur_salary" => 7131.34,
    ],
  ];
  if($current_year==2019) {
       $current_salary_coef= $index_salary_coef[0];
     
  } else if($current_year==2020) {
      $current_salary_coef = $index_salary_coef[1];
  } else if($current_year==2021) {
      $current_salary_coef = $index_salary_coef[2];
  } else if($current_year==2022) {
      $currecurrent_salary_coefnt_salary_coef = $index_salary_coef[3];
  } else if($current_year==2023) {
      $current_salary_coef = $index_salary_coef[4];
  } else {
      $current_salary_coef = $index_salary_coef[5];
  };

    $koeficient1 = 1; 
    if ($count_not_turn ==  1.056) {
        $koeficient1 = 1.07;
    } else if ($count_not_turn == 1.12) {
        $koeficient1=1.15;
    }  else if ($count_not_turn == 1.19) {
        $koeficient1=1.24;
    }  else if ($count_not_turn == 1.27) {
        $koeficient1=1.34;
    } else if ($count_not_turn == 1.36) {
        $koeficient1=1.45;
    } else if ($count_not_turn == 1.46) {
        $koeficient1=1.59;
    } else if ($count_not_turn == 1.58) {
        $koeficient1=1.74;
    } else if ($count_not_turn == 1.73) {
        $koeficient1=1.9;
    } else if ($count_not_turn == 1.9) {
       $koeficient1= 2.09;
    } else if ($count_not_turn == 2.11) {
       $koeficient1= 2.32;
    } else {
       $koeficient1= 1;
    };
    if($count_age_children>1){
      $children_coef = 1.5;
  } else if(count_age_children ==1) {
      $children_coef = 1;
      
  }else {
      $children_coef = 0;
  };
  if ($count_children==0){
    $retiree_score = $retiree_score ;
} else if ($count_children ==1) {
    $retiree_score = $retiree_score+1.8*$children_coef;
} else if (count_children ==2){
    $retiree_score = $retiree_score+1.8*$children_coef+3.6*$children_coef;
}else if(count_children==3) {
    $retiree_score = $retiree_score+1.8*$children_coef+3.6*$children_coef+5.4*$children_coef;
}else {
    $retiree_score = $retiree_score+1.8*$children_coef+3.6*$children_coef+5.4*$children_coef+5.4*$children_coef;  
};
$retiree_score = $retiree_score + 1.8*$count_age_retiree; //balu za malogo i za invalida
if($count_month_military>11){
  $retiree_score =$retiree_score + 1.8*$count_age_military+1.8;
} else {
  $retiree_score =$retiree_score + 1.8*$count_age_military;
};

if ($count_age_children<2) {
  $children_staj = $count_children;
} else {
  $children_staj = $count_children * 1.5;
};

$mounth_to_year = 0;
$day_to_mounth = Number($count_day_retiree) + Number($count_day_military);
if($day_to_mounth>=12) {
    $day_to_mounth = round($day_to_mounth/12);
} else {
    $day_to_mounth = 0;
};
$mounth_to_year  = Number($count_month_retiree) + Number($count_month_military) + Number($day_to_mounth); 

if ($mounth_to_year>=12) {
    $mounth_to_year = round($mounth_to_year/12);
} else {
    $mounth_to_year = 0;
};

 $staj =$self_age) + $count_age_retiree + $count_age_military + $hired_age + $children_staj + $mounth_to_year;
    $staj = round($staj);











  };
};







//result
if(isset($_POST["calc_name"])){
  $calc = $_POST["calc_name"];
}
$calc();
?>