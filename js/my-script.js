$(document).ready(function(d){
  updateChart("Italy");
  $('.mytable').keypress(function(e) {
    console.log(this);
    if (e.which == 13) {
        var row_index = $(this).parent().index();
        $(this).closest('tr').next().find('td').eq(row_index).focus();
        e.preventDefault();
    }
  });
  $('[data-toggle="tooltip"]').tooltip()
});

$(window).resize(function(){
  var h;
  var w;
  if(chart_areaspline){
    h = $(".chart-area").height();
    w = $(".chart-area").width();
    chart_areaspline.resize({height:h, width:w});
  }
  if(chart_bar){
    h = $(".chart-bar").height();
    w = $(".chart-bar").width();
    chart_bar.resize({height:h, width:w});
  }
  if(chart_donut){
    h = $(".chart-pie").height();
    w = $(".chart-pie").width();
    chart_donut.resize({height:h, width:w});
  }
  $("#suggestions").width($("#input-country").width());

  if ($(".chart-area").width() < 675 ) {
    $(".c3-axis-x > .tick").css("fill", "none");
  }else {
    $(".c3-axis-x > .tick").css("fill", "");
  }
  if ($(".chart-area").height()  < 320) {
     $(".c3-axis-y > .tick").css("fill", "none");
  }else {
    $(".c3-axis-y > .tick").css("fill", "");
  }

  $("#rank-table").css("max-height", $(".chart-bar").height());
  $("#card-donut").css("height", $("#card-bar").height());
});







// Auto aggiornamento donut chart NON FUNZIONANTE
// var t = 1;
// var tm_female = [];
// var tm_male = [];
// for(var i = 1; i < value_males.length; i++){
//   tm_female = value_females.splice(i, 1);
//   tm_female.unshift("Females");
//   tm_male = value_males.splice(i, 1);
//   tm_male.unshift("Males");
//   if(tm_male[1] !== ""){
//     t++;
//     console.log(tm_male);
//     console.log(tm_female);
//     setTimeout(function () {
//       chart_donut.unload({
//         ids: 'Males'
//       });
//       chart_donut.unload({
//         ids: 'Females'
//       });
//     }, t*400);
//     setTimeout(function () {
//       chart_donut.load({
//         columns: [
//           tm_male,
//           tm_female
//         ]
//       });
//     }, t*600);
//   }
// }
