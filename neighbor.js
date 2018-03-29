
d3.csv("KolegiumVisEn.csv")
    .row(function(d){return {id: +d["ID"],level: +d["Оцініть ваш рівень задоволення життя разом з ними "]};})
    .get(function(error,data){

        var height = 500;
        var width = 1000;

        var maxID = d3.max(data, function(d){return d.id});
        var maxLevel = d3.max(data, function(d){return d.level});
        var y =d3.scaleLinear()
            .domain([1,maxLevel])
            .range([height,1]);
        var x = d3.scaleLinear()
            .domain([1,maxID])
            .range([0,width]);
        var yAxis = d3.axisLeft(y);
        var xAxis = d3.axisBottom(x);

        var svg = d3.select('body').append('svg')
            .attr("height", "100%")
            .attr("width", "100%");
        var chartGroup = svg.append('g').attr('transform','translate(50,50)');

        var line = d3.line()
            .x(function(d){return x(d.id)})
            .y(function(d){return y(d.level)});
        chartGroup.append('path').attr('d',line(data));
        chartGroup.append('g').attr('class','x axis').attr('transform','translate(0,'+height+')').call(xAxis);
        chartGroup.append('g').attr('class','y axis').call(yAxis);
});
