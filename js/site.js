function generatingComponent(vardata){
  var reqs = dc.rowChart('#rd') ;
  var use = dc.rowChart('#pp') ;
  var Rstate = dc.pieChart ('#State') ;
  var Rstatus = dc.pieChart ('#Status') ;
  var colors = ['#FAE61E','#03a9f4','#E67800','#C80000','#E6E6FA', '#023858', '#a6bddb','#3690c0'] ;

  var cf = crossfilter(vardata);
  var all = cf.groupAll();
  var colors = ['#2C5197','#0B0B61'] ;
var stateDim = cf.dimension(function(d) { return d.state});
var stateGroup = stateDim.group();
var statusDim = cf.dimension(function(d) {return d.status});
var statusGroup = statusDim.group();
var reqDim = cf.dimension(function(d) {return d.request_dataset});
var reqGroup = reqDim.group();
var useDim = cf.dimension(function(d) {return d.purposes});
var useGroup = useDim.group();

   
   Rstate.width($('#State').width()).height(150)
        .dimension(statusDim)
        .group(stateGroup);
  
   Rstatus.width($('#status').width()).height(150)
        .dimension(statusDim)
        .group(statusGroup); 
// rowCharts
  reqs.width(600).height(350)
            .dimension(reqDim)
            .group(reqGroup)
             .elasticX(true)
             .data(function(group) {
                return group.top(15);
            })
            .colors('#2b8cbe')
            .colorAccessor(function(d, i){return 0;});
            /*reqs.renderVerticalGridLines(false);
            reqs.renderVerticalGridLines(false);*/

  use.width(600)
     .height(350)
            .dimension(useDim)
            .group(useGroup)
            .elasticX(true)
            .data(function(group) {
                return group.top(15);
            })
            .colors('#2b8cbe')
            .colorAccessor(function(d, i){return 0;});
            /*use.renderVerticalGridLines(false);
            use.renderVerticalGridLines(false);*/
            
            
                

  dc.dataCount('count-info')

    .dimension(cf)

    .group(all);

  
  dc.renderAll();
     

}

var dataCall = $.ajax({

    type: 'GET',

    url: 'data/data.json',

    dataType: 'json',

});

var geomCall = $.ajax({

    type: 'GET',

    url: 'data/cmr.geojson',

    dataType: 'json',

});

$.when(dataCall, geomCall).then(function(dataArgs, geomArgs){

    var geom = geomArgs[0];

    geom.features.forEach(function(e){

        e.properties['NAME'] = String(e.properties['NAME']);

    });

    generatingComponent(dataArgs[0],geom);

});
