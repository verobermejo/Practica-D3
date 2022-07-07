const diCaprioBirthYear = 1974;
const age = function(year) { return year - diCaprioBirthYear}
const today = new Date().getFullYear()
const ageToday = age(today)

// ----------------------------------------------------------
// DEFINO CTES

const width = 800
const height = 600
const margin = {
    left: 40,
    right: 10,
    top: 10,
    bottom: 40
}

// DECLARO SVG 

const svg = d3.select("#chart").append("svg").attr("id","svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

// ESCALA 

let x = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(0.2)
let y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

// EJES

const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup")
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

//DATOS

d3.csv("data.csv").then(misDatos => {
    misDatos.map(d => {
        d.age = +d.age
        d.year = +d.year
    })
   // console.log(misDatos)

//AÑADIR EL DOMINIO DE LA ESCALA

x.domain(misDatos.map(d => d.year))
y.domain([d3.min(misDatos.map(d => d.age)), ageToday])
  //console.log(misDatos)

//LLAMO A LOS EJES

xAxisGroup.call(xAxis)
yAxisGroup.call(yAxis)


//DATA BINDING

//De la gráfica de barras

let bars = elementGroup.selectAll("rect").data(misDatos)
    bars.enter().append("rect") 
        .attr("class", "bar")
        .attr("x", d => x(d.year))
        .attr("y", d => y(d.age))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.age) - margin.bottom - margin.top)
       

//De la gráfica de línea

let line = elementGroup.datum(misDatos)
line.append("path")
.attr("id","misDatos")
.attr("d", d3.line()
    .x(d => x(`${d.year}`) + (x.bandwidth()/2))
    .y(d => y(age(d.year)))
    )

})








