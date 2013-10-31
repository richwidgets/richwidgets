$('#zoom').chart(
  {
    data: [
      {color:'darkcyan',data:[[1,8],[2,12],[3,13],[4,14],[5,16],[6,18],[7,15],[8,20],[9,21],[10,15],[12,16],[13,18],[14,20]],
       lines:{show:true},label:'A product',points:{symbol:'square' ,show:true}},
      {color:'chocolate',data:[[2,6],[3,10],[4,11],[5,12],[6,15],[7,16],[8,14],[9,14],[10,14]],
       lines:{show:true},label:'B product',points:{show:true}},
      {color:'coral',data:[[2,6],[3,8],[5,4],[10,6],[14,8],[15,4]],
       lines:{show:true},label:'C product',points:{symbol:'diamond',show:true}}
    ],
    ytype:'number',
    legend:{sorted:'ascending'},
    zoom:true,
    xtype:'number',
    charttype:'line'
  }
);