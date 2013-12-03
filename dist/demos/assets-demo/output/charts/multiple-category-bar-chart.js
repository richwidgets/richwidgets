$('#mulitplecategorybar').chart({
  data: [
    {bars:{show:true}, data:{Service:12500746,Agricultural:188217,Industrial:2995787}, label:'United States'},
    {bars:{show:true}, data:{Service:3669259,Agricultural:830931,Industrial:3726848}, label:'China'},
    {bars:{show:true}, data:{Service:4258274,Agricultural:71568,Industrial:1640091}, label:'Japan'},
    {bars:{show:true}, data:{Service:2417812,Agricultural:27205,NotKnown:955563}, label:'Other'}
  ],
  ytype:'number',
  legend: {sorted:'ascending'},
  xtype:'string',
  charttype:'bar'
});
