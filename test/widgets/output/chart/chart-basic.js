define(['widget-test-base', 'jquery', 'jquery-ui', 'src/widgets/output/chart','flotlib'], function () {

    describe('widget(charts): ', function () {

        var  element;
        beforeEach(function () {
            var f = jasmine.getFixtures();
            f.load('test/widgets/output/chart/chart-basic.html');

            var s = jasmine.getStyleFixtures();
            s.appendLoad('dist/assets/bootstrap/bootstrap.css');
            s.appendLoad('dist/assets/font-awesome/font-awesome.css');
            s.appendLoad('dist/assets/richwidgets/output/chart.css');

            element = $('#chart');
        });




        it('creates line chart', function() {
            // given
            var options={
                data: [
                    {data:[[1990,19.1],[1991,18.9],[1992,18.6],[1993,19.5],[1994,19.5],[1995,19.3],[1996,19.4],[1997,19.7],[1998,19.5],[1999,19.5],[2000,20]],label:'USA'},
                    {data:[[1990,2.2],[1991,2.2],[1992,2.3],[1993,2.4],[1994,2.6],[1995,2.7],[1996,2.8],[1997,2.8],[1998,2.7],[1999,2.6],[2000,2.7]],label:'China'},
                    {data:[[1990,9.4],[1991,9.4],[1992,9.5],[1993,9.4],[1994,9.9],[1995,9.9],[1996,10.1],[1997,10.1],[1998,9.7],[1999,9.5],[2000,9.7]],label:'Japan'},
                    {data:[[1992,14],[1993,12.8],[1994,10.9],[1995,10.5],[1996,10.4],[1997,10],[1998,9.6],[1999,9.7],[2000,9.8]],label:'Russia'}
                ],
                tooltipOpts:{content:'%s [%x,%y.1]'},
                yaxis:{axisLabel:'metric tons of CO2 per capita'},ytype:'number',
                xaxis:{axisLabel:'year'},zoom:false,xtype:'number',
                charttype:'line'
            };
            expect(element.length).toBeGreaterThan(0);
            element.chart(options);

            // then
            expect($('.flot-base').length).toBeGreaterThan(0);
            expect($('.flot-overlay').length).toBeGreaterThan(0);
            expect($('.legend').length).toBeGreaterThan(0);
            //four records(series) in legend table
            expect($('.legend table tbody').first().children().length).toEqual(4);
            expect($('.yaxisLabel').first().text()).toEqual('metric tons of CO2 per capita');
            expect($('.xaxisLabel').first().text()).toEqual('year');

        });

        it('creates bar chart', function(){
            //given
            var options =  {
                data: [
                    {
                        bars: {show: true},
                        data: {'United States': 797, 'San Marino': 1263, 'Croatia': 380, 'Denmark': 480, 'Vietnam': 13}
                    }
                ],
                yaxis: {axisLabel: 'Motor vehicles per 1000 people'},
                ytype: 'number',
                xtype: 'string',
                charttype: 'bar'
            };
            expect(element.length).toBeGreaterThan(0);
            element.chart(options);

            //then
            expect($('.flot-base').length).toBeGreaterThan(0);
            expect($('.flot-overlay').length).toBeGreaterThan(0);
            expect($('.yaxisLabel').first().text()).toEqual('Motor vehicles per 1000 people');



        });

        it('creates pie chart', function(){
            //given
            var options = {
                data: [
                    [
                        {data: 12500746, label: 'Service sector'},
                        {data: 188217,   label: 'Agricultural sector'},
                        {data: 2995787, label:  'Industrial sector'}
                    ]
                ],
                legend:{sorted:'ascending'},
                charttype:'pie'
            };
            expect(element.length).toBeGreaterThan(0);
            element.chart(options);

            //then
            expect($('.flot-base').length).toBeGreaterThan(0);
            expect($('.flot-overlay').length).toBeGreaterThan(0);
            expect($('.legend').length).toBeGreaterThan(0);
            //three records(series) in legend table
            expect($('.legend table tbody').first().children().length).toEqual(3);

        });

    });
});