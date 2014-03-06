$('#pie').chart({
  data: [
          [
            {data: 12500746, label: 'Service sector'},
            {data: 188217,   label: 'Agricultural sector'},
            {data: 2995787, label:  'Industrial sector'}
          ]
        ],
  legend:{sorted:'ascending'},
  charttype:'pie'
});
