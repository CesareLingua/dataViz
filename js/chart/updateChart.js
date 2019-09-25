function updateChart(s){
  $("#h1-title").text(s);
  var state = s.substr(0, s.length).toUpperCase();
  var area_w = $(".chart-area").width();
  var area_h = $(".chart-area").height();
  var donut_w = $(".chart-pie").width();
  var donut_h = $(".chart-pie").height();
  var bar_h = $(".chart-bar").height();
  var bar_w = $(".chart-bar").width();

  d3.csv("data/homicide.csv").then(function(data){
    var val_males;
    var val_females;
    var all_males = [];
    var all_females = [];
    var ranking_male = [];
    var ranking_female = [];
    data.forEach(function(d, i){
      if (Object.values(d)[18] === "Males"){
        all_males.push(Object.values(d).splice(0,17));
        var s = 0;
        for(var j = 0; j < 17; j++){
          if(!isNaN(Object.values(d)[j])){
            s += (+Object.values(d)[j]);
          }
        }
        ranking_male.push(Object.values(d)[17]);
        ranking_male.push(s);
      }
      if(Object.values(d)[18] === "Females"){
        all_females.push(Object.values(d).splice(0,17));
        var s = 0;
        for(var j = 0; j < 17; j++){
          if(!isNaN(Object.values(d)[j])){
            s += (+Object.values(d)[j]);
          }
        }
        ranking_female.push(Object.values(d)[17]);
        ranking_female.push(s);
      }
      if(Object.values(d)[17].substr(0, Object.values(d)[17].length).toUpperCase() === state){
        if (Object.values(d)[18] === "Males"){
          val_males = Object.values(d).splice(0,17);
        }
        if(Object.values(d)[18] === "Females"){
          val_females = Object.values(d).splice(0,17);
        }
      }
    });

    // killed man for every woman
    var top_man_danger = [];
    for (var i = 1; i < ranking_male.length; i=i+2) {
      var c, r;
      c = ranking_male[i-1];
      r = Math.round(((ranking_male[i]/ranking_female[i])*100)) /100; //quanti omicimi di maschi per un omicidio di donna
      if(!isNaN(r))
        top_man_danger.push({c, r});
    }
    top_man_danger.sort(function(a, b){return b.r - a.r});

    //killed woman for every man
    var top_woman_danger = [];
    for (var i = 1; i < ranking_male.length; i=i+2) {
      var c, r;
      c = ranking_male[i-1];
      r = Math.round(((ranking_female[i]/ranking_male[i])*100)) /100; //quanti omicimi di maschi per un omicidio di donna
      if(!isNaN(r))
        top_woman_danger.push({c, r});
    }
    top_woman_danger.sort(function(a, b){return b.r - a.r});

    var mean_perc_males = [];
    var mean_perc_females = [];
    var m
    var sum_male = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var sum_female = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i = 0; i < all_males.length; i++){
      for(var j = 0; j < all_males[i].length; j++){
        if(!isNaN(+(all_males[i][j])) && +(all_males[i][j]) !== 0 && !isNaN(+(all_females[i][j])) && +(all_females[i][j]) !== 0){
          sum_male[j] +=  (+all_males[i][j]);
          sum_female[j] += (+all_females[i][j]);
        }
      }
    }

    for (var z = 0; z < sum_male.length; z++) {
      mean_perc_males[z] = Math.round(sum_male[z]/(sum_male[z]+sum_female[z])*100).toString();
      mean_perc_females[z] = Math.round((sum_female[z]/(sum_male[z]+sum_female[z]))*100).toString();
    }
    // console.log(mean_perc_males);
    var indices = [];
    var idx = val_males.indexOf('');
    while (idx != -1) {
      indices.push(idx);
      idx = val_males.indexOf('', idx + 1);
    }
    var index = data.columns.splice(2);

    val_males.unshift("Men");
    val_females.unshift("Women");

    chart_areaspline = c3.generate({
      bindto: '#myAreaChart',
      size: {
        height: area_h,
        width: area_w
      },
      data: {
        columns:[
            val_males,
            val_females
        ],
        types: {
          Women: 'area-spline',
          Men: 'area-spline'
        },
        colors: {
          Men: '#00abff',
          Women: '#ff7495'
        }
      },
      axis: {
        x: {
          type: 'category',
          categories: index
        },
        y: {
          tick: {
                format: function(x) { return x % 1 === 0 ? x : ''; }
            }
        }
      },
      line: {
          connectNull: true,
      }
    });

    chart_donut = c3.generate({
      bindto: '#myPieChart',
      size: {
        height: donut_h,
        width: donut_w
      },
      data: {
        columns: [
          val_males,
          val_females
        ],
        type : 'donut',
        colors: {
          Men: '#00abff',
          Women: '#ff7495'
        },
        axis: {
          x: {
            type: 'category',
            categories: index
          }
        }
      },
      legend: {
        show: false
      },
      donut: {
        title: s
      }
    });
    $(".donut-descr").empty();
    $(".donut-descr").append('<b>'+s+'</b>');

    var perc_males = [];
    var perc_females = [];

    for(var i = 1; i < val_males.length; i++){
      perc_males.push(Math.round(((+val_males[i])/((+val_males[i]) + (+val_females[i])))*100).toString());
      perc_females.push(Math.round(((+val_females[i])/((+val_females[i]) + (+val_males[i])))*100).toString());
    }

    perc_males.unshift("Men");
    perc_females.unshift("Women");
    mean_perc_males.unshift("Mean Men");
    mean_perc_females.unshift("Mean Women");
    chart_bar = c3.generate({
      bindto: '#myBarChart',
      size: {
        height: bar_h,
        width: bar_w
      },
      data: {
        columns: [
          perc_males,
          perc_females,
          mean_perc_males,
          mean_perc_females
        ],
        types : {
            Men: 'bar',
            Women: 'bar',
            'Mean Men': 'spline',
            'Mean Women': 'spline'
        },
        groups: [
            // ['Males', 'Females']
        ],
        colors: {
          Men: '#00abff',
          Women: '#ff7495',
          'Mean Women': '#ff1493',
          'Mean Man': '#0000ff'
        },
      },  axis: {
          x: {
            type: 'category',
            categories: index
          },
          y: {
            show: false
          }
        },
    });

    // Table of ranking
    for (var i = 0; i < top_man_danger.length; i++) {
      if (top_woman_danger[i].r >= 1) {
        $("#dangerous-for-woman").append('<tr> <th scope="row">'+(i+1)+'</th> <td> <a class="tab-county alert-link" href="#">'+top_woman_danger[i].c +'</a></td> <td class="text-danger">'+top_woman_danger[i].r+'</td></tr>');
      }else {
        $("#dangerous-for-woman").append('<tr> <th scope="row">'+(i+1)+'</th> <td> <a class="tab-county alert-link" href="#">'+top_woman_danger[i].c +'</a></td> <td>'+top_woman_danger[i].r+'</td></tr>');
      }
      if (top_man_danger[i].r >= 1) {
        $("#dangerous-for-man").append('<tr> <th scope="row">'+(i+1)+'</th> <td> <a class="tab-county alert-link" href="#">'+top_man_danger[i].c +'</a></td> <td class="text-danger">'+top_man_danger[i].r+'</td></tr>');
      }else {
        $("#dangerous-for-man").append('<tr> <th scope="row">'+(i+1)+'</th> <td> <a class="tab-county alert-link" href="#">'+top_man_danger[i].c +'</a></td> <td>'+top_man_danger[i].r+'</td></tr>');
      }
    }

    $("#card-donut").css("height", $("#card-bar").height());
    $(document).ready(function($) {
        $(".tab-county").click(function(d,s) {
          updateChart(d.currentTarget.innerHTML);
          $(document).scrollTop( $("#page-top").offset().top );
          // $('html,body').animate({ scrollTop: 0 }, 'slow');
        });
    });
  });
}
