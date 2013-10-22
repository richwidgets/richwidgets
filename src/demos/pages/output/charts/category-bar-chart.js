$('#category').chart(
    {
        data: [
            {
                bars:{show:true},
                data:{'United States':797,'San Marino':1263,'Croatia':380,'Denmark':480,'Vietnam':13}
            }
        ],
        yaxis:{axisLabel:'Motor vehicles per 1000 people'},
        ytype:'class java.lang.Number',
        xtype:'class java.lang.String',
        charttype:'bar'
    }

);