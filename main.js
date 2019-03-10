 $(document).ready(function(){
$('#btn_salary_result').on('click',function(){
    var sex = $('#sex').val();
    var birth = $('#birth').val();
    if(isNaN(birth) || !$.trim(birth).length>0 || $.trim(birth).length>4 || Number(birth)<1900){
        $('#birth').next().removeClass('allerted_text_none');
        $('#birth').addClass('calc_input_border-red');
    } else {
        $('#birth').next().addClass('allerted_text_none');
        $('#birth').removeClass('calc_input_border-red');
        birth = birth;
    };
    var count_age_children = $('#count_age_children').val();
    var count_age_retiree = $('#count_age_retiree').val();
    var count_month_retiree = $('#count_month_retiree').val();
    var count_day_retiree = $('#count_day_retiree').val();
    var count_age_military = $('#count_age_military').val();
    var count_month_military = $('#count_month_military').val();
    var count_day_military = $('#count_day_military').val();
    var count_not_turn = $('#count_not_turn').val();
    var hired_worker = $('.hired_worker:checked').val();
    var hired_age = $('#hired_age').val();
    var self_age = $('#self_age').val();
    var salary = $('#salary').val();
    var count_children = $('#count_children').val();
    var current_year = (new Date).getFullYear();

    var resultat_to_html = "";
    var staj = 0;
     var children_staj = 0;
     var current_salary_coef = "";
        
     var retiree_score = 0;
     var children_coef = 0;
    function construct_coef(cur_year,cur_coef,cur_salary) {
        this.cur_year = cur_year;
        this.cur_coef = cur_coef;
        this.cur_salary = cur_salary;
    }
    var index_salary_coef  = [
        new construct_coef(2019,87.24,5334.19),
        new construct_coef(2020,93,5686.25),
        new construct_coef(2021,98.86,6044.48),
        new construct_coef(2022,104.69,6401.10),
        new construct_coef(2023,110.55,6759.56),
        new construct_coef(2024,116.63,7131.34)
    ];
 
    if(current_year==2019) {
         current_salary_coef= index_salary_coef[0];
       
    } else if(current_year==2020) {
        current_salary_coef = index_salary_coef[1];
    } else if(current_year==2021) {
        current_salary_coef = index_salary_coef[2];
    } else if(current_year==2022) {
        currecurrent_salary_coefnt_salary_coef = index_salary_coef[3];
    } else if(current_year==2023) {
        current_salary_coef = index_salary_coef[4];
    } else {
        current_salary_coef = index_salary_coef[5];
    }
    var koeficient1 = 1; 
    if (count_not_turn ==  1.056) {
        koeficient1 = 1.07;
    } else if (count_not_turn == 1.12) {
        koeficient1=1.15;
    }  else if (count_not_turn == 1.19) {
        koeficient1=1.24;
    }  else if (count_not_turn == 1.27) {
        koeficient1=1.34;
    } else if (count_not_turn == 1.36) {
        koeficient1=1.45;
    } else if (count_not_turn == 1.46) {
        koeficient1=1.59;
    } else if (count_not_turn == 1.58) {
        koeficient1=1.74;
    } else if (count_not_turn == 1.73) {
        koeficient1=1.9;
    } else if (count_not_turn == 1.9) {
       koeficient1= 2.09;
    } else if (count_not_turn == 2.11) {
       koeficient1= 2.32;
    } else {
       koeficient1= 1;
    }

    if(count_age_children>1){
        children_coef = 1.5;
    } else if(count_age_children ==1) {
        children_coef = 1;
        
    }else {
        children_coef = 0;
    }

    if (count_children==0){
        retiree_score = retiree_score ;
    } else if (count_children ==1) {
        retiree_score = retiree_score+1.8*children_coef;
    } else if (count_children ==2){
        retiree_score = retiree_score+1.8*children_coef+3.6*children_coef;
    }else if(count_children==3) {
        retiree_score = retiree_score+1.8*children_coef+3.6*children_coef+5.4*children_coef;
    }else {
        retiree_score = retiree_score+1.8*children_coef+3.6*children_coef+5.4*children_coef+5.4*children_coef;  
    }

    retiree_score = retiree_score + 1.8*count_age_retiree; //balu za malogo i za invalida

    if(count_month_military>11){
        retiree_score =retiree_score + 1.8*count_age_military+1.8;
    } else {
        retiree_score =retiree_score + 1.8*count_age_military;
    };
    
    if (count_age_children<2) {
        children_staj = count_children;
    } else {
        children_staj = count_children * 1.5;
    }
    var mounth_to_year = 0;
    var day_to_mounth = Number(count_day_retiree) + Number(count_day_military);
    if(day_to_mounth>=12) {
        day_to_mounth = Math.floor(day_to_mounth/12);
    } else {
        day_to_mounth = 0;
    }
    mounth_to_year  = Number(count_month_retiree) + Number(count_month_military) + Number(day_to_mounth); 

    if (mounth_to_year>=12) {
        mounth_to_year = Math.floor(mounth_to_year/12);
    } else {
        mounth_to_year = 0;
    }
    if($('#hired').prop("checked") && ($.trim(salary).length<4) || isNaN(salary) || salary<11279) {
        $('#salary').addClass('calc_input_border-red');
        $('#salary').next().removeClass('allerted_text_none');
        hired_age = hired_age;
        self_age = 0;
    } else if ($('#self').prop('checked')) {
        hired_age = 0;
        self_age = self_age;
    } else {
        hired_age = hired_age;
        self_age = self_age;
    }
    staj =Number(self_age) + Number(count_age_retiree) + Number(count_age_military) + Number(hired_age) + Number(children_staj) + Number(mounth_to_year);
    staj = Math.floor(staj);
    var max_vznos_price = 1147; // from 2019 year
    // var max_vznos_price = 1021; //from 2018 year
    var min_zarplata = 11280;
    var kolichestvo_balov_work = 0;
    var ipk = 0;
    if(hired_age>0 && $('#hired').prop("checked")) {
        if(salary>=11280){
           
            kolichestvo_balov_work = ((salary-min_zarplata)/100*0.01+1.18)*hired_age;
            
        }
    }
    if(self_age>0 && $('#self').prop("checked")) {
        kolichestvo_balov_work = 3.45*self_age;
    }
    if (hired_age>0 && self_age>0 && $('#hired_self').prop('checked')){
        kol_bal_hired = ((salary-min_zarplata)/100*0.01+1.18)*hired_age;
        kol_bal_self = 3.45*self_age;
        kolichestvo_balov_work = kol_bal_hired + kol_bal_self;
    }

    ipk = ((salary*12*.16)/(max_vznos_price*1000*.16))*10;
    ipk = ipk.toFixed(3);
console.log(ipk);
    var polnuj_kolichestvo_balov = retiree_score+kolichestvo_balov_work;

    var pencya_children_invalid = polnuj_kolichestvo_balov*koeficient1*current_salary_coef.cur_coef + current_salary_coef.cur_salary * count_not_turn; //pencya za rebenka i invalida

     if(sex ==0 && polnuj_kolichestvo_balov*koeficient1<=30 && birth-current_year<65 && staj<15){
        pencya_children_invalid = current_salary_coef.cur_salary;
     } else if (sex ==1 && polnuj_kolichestvo_balov*koeficient1<=30 && birth-current_year<55 && staj<15 ){
        pencya_children_invalid = current_salary_coef.cur_salary;
     } else {
         pencya_children_invalid = pencya_children_invalid;
     }

     var  resultat_balu = polnuj_kolichestvo_balov*koeficient1;
     var resultat_pencya = pencya_children_invalid;
     var resultat_staj = staj;
     if(staj>=15 || resultat_balu>=30){
        resultat_to_html = "<p>Количество балов "+resultat_balu.toFixed(2)+"</p>"+"<p>Ваша пенсия "+resultat_pencya.toFixed(2)+" руб.</p>"+"<p>Ваш стаж "+resultat_staj+"</p>";
        $('#salary_result').html(resultat_to_html);
     } else {
         resultat_to_html = "<p>"+"Количество Ваших балов или стаж, ниже необходимого минимума, потому величина вашей пенсии составит минимальное допустимое значение"+"</p>"+ "<p> ВАША ПЕНСИЯ: "+pencya_children_invalid+" руб."+"</p>";
         $('#salary_result').html(resultat_to_html);
        }


// ajax form
function sendAjaxForm(ajax_form, url,res) {
   
    jQuery.ajax({
        url:     url, 
        type:     "POST", 
        dataType: "json",  
        data:{sex : sex,
              birth: birth,
              current_year:current_year,
              count_age_children:count_age_children,
              count_age_retiree:count_age_retiree,
              count_month_retiree:count_month_retiree,
              count_age_military:count_age_military,
              count_month_military:count_month_military,
              count_day_military:count_day_military,
              count_not_turn:count_not_turn,
              hired_age:hired_age,
              self_age:self_age,
              salary:salary,
              count_children:count_children,

        },
        success: function(response) { 
            result = jQuery.parseJSON(JSON.stringify(response));
  
            $('#'+res).html( '<p class="bolder">Ваш материнский капитал: '+result.mother_capital+" руб.</p>");
        },
        error: function(response) { 
            document.getElementById(res).innerHTML = "Во время подсчета случилась ошибка";
        }
    });
  };
});
})
