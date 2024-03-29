// import React, {Component} from 'react';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import SwipeableViews from 'react-swipeable-views';
// import Visual1 from './visualization1';
// import Visual2 from './visualization2';
// import Visual3 from './StateMap';
// import {Container} from 'react-bootstrap';

// import * as d3 from 'd3'


// class Visualization extends Component {
//     constructor(props) {
//         super(props);
  
//         this.state = {
//           vis1Loaded: false,
// 					vis1: undefined,
				
// 					vis2Loaded: false,
// 					vis2: undefined
					
// 				};
  
// 		}

//     componentDidMount() {
// 			fetch('/api/production?name=all')
// 					.then(response => response.json())
// 					.then(data => this.setState({vis1: data}));


// 			fetch('/api/country?name=all')
// 					.then(response => response.json())
// 					.then(data => this.setState({vis2: data}));
// 	}

// 		componentDidUpdate() {
// 				if (this.state.vis1 && !this.state.vis1Loaded) {
// 						this.state.vis1Loaded = true;
// 						this.renderVis1();
// 				}
// 				if (this.state.vis2 && !this.state.vis2Loaded) {
// 					this.state.vis2Loaded = true;
// 					this.renderVis2();
// 			}
// 		}


//     renderVis1() {
// 			var data  = {"name": "Production and Usage", "children": []};

// 			for (var i = 0; i < this.state.vis1.length; i++) {
// 					var obj = {};
// 					obj.name = this.state.vis1[i].Name;
// 					obj.value = this.state.vis1[i].Carbon_Emission + 100;

// 					data["children"].push(obj);
// 			}

// 			var color = d3.scaleLinear()
// 			.domain([0, 5])
// 			.range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
// 			.interpolate(d3.interpolateHcl);

// 				var rootNode = d3.hierarchy(data);
// 				var packLayout = d3.pack();
// 				packLayout.size([1000, 1000]);
// 				packLayout.padding(100)

// 				rootNode.sum(function(d) {
// 					return d.value;
// 				});

// 				packLayout(rootNode);

// 				var margin = {
// 					 top: 100, right: 0, bottom: 30, left: 200
// 				};

// 			var width = 1500 - margin.left - margin.right,
// 			height = 1500 - margin.top - margin.bottom;

// 			var svg = d3.select("#vis").append("svg")
// 						.attr("width", width + margin.left + margin.right)
// 						.attr("height", height + margin.top + margin.bottom)
// 						.append("g")
// 						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 						svg.append("text")
// 										.attr("x", (width / 2 - 100))
// 										.attr("y", 0 - (margin.top / 2))
// 										.attr("text-anchor", "middle")
// 										.style("font-size", "16px")
// 										.text("Carbon Emission of Energy Production and Usage");

// 				var nodes = d3.select("#vis svg g")
// 				.selectAll('g')
// 				.data(rootNode.descendants())
// 				.enter()
// 				.append('g')
// 				.attr('transform', function(d) {return 'translate(' + [d.x, d.y] + ')'})

// 			nodes
// 				.append('circle')
// 				.attr('r', function(d) { return d.r; })
// 					.attr("fill", d => color(d.height));

// 			nodes
// 			.append('text')
// 			.style("font", "10px sans-serif")
// 			.attr("text-anchor", "middle")
// 			.attr('dx', -nodes.length)
// 			.attr('dy', 4)
// 					.text(function(d) {
// 						return d.children === undefined ? d.data.name : '';
// 					})
// 	}



// 	renderVis2() {
// 		var data  = [];

// 		for (var i = 0; i < this.state.vis2.length; i++) {
// 				if (this.state.vis2[i].Name === "Wakanda") {
// 						continue;
// 				}
// 				var obj = {};
// 				obj.name = this.state.vis2[i].Name;
// 				obj.usage = -this.state.vis2[i].Total_Usage;
// 				obj.production = this.state.vis2[i].Total_Production - obj.usage;

// 				data.push(obj);
// 		}

// 			data = data.sort(function (a, b) {
// 								 return d3.ascending(b.production, a.production);
// 			})

// 			var series = d3.stack().keys(Object.keys(data[0]).slice(1))(data)

// 		//set up svg using margin conventions - we'll need plenty of room on the left for labels
// 		var margin = {
// 				top: 100, right: 0, bottom: 30, left: 100
// 		};

// 						 var width = 1000 - margin.left - margin.right,
// 								 height = 1000 - margin.top - margin.bottom;

// 		var x = d3.scaleLinear()
// 			.domain([-10000, 6000])
// 			.range([0, width]);

// 		var y = d3.scaleBand()
// 						.domain(data.map(d => d.name))
// 						.rangeRound([0, height])
// 						.padding(0.2);

// 		var color = d3.scaleOrdinal()
// 								.domain(series.map(d => d.key))
// 								.range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), series.length).reverse())
// 								.unknown("#ccc");


// 		var xAxis = g => g
// 		.attr("transform", `translate(0,${height - margin.bottom})`)
// 		.call(d3.axisBottom(x).tickSizeOuter(0))
// 		.call(g => g.selectAll(".domain").remove());

// 				var yAxis = g => g
// 		.attr("transform", `translate(${margin.left},0)`)
// 		.call(d3.axisLeft(y).ticks(null, "s"))
// 		.call(g => g.selectAll(".domain").remove());

// 		var legend = svg => {
// 		const g = svg
// 			.attr("font-family", "sans-serif")
// 			.attr("font-size", 10)
// 			.attr("text-anchor", "end")
// 			.attr("transform", `translate(${width - margin.right},${margin.top})`)
// 		.selectAll("g")
// 		.data(series.slice().reverse())
// 		.join("g")
// 			.attr("transform", (d, i) => `translate(0,${i * 20})`);

// 		g.append("rect")
// 			.attr("x", -19)
// 			.attr("width", 19)
// 			.attr("height", 19)
// 			.attr("fill", d => color(d.key));

// 		g.append("text")
// 			.attr("x", -24)
// 			.attr("y", 9.5)
// 			.attr("dy", "0.35em")
// 			.text(d => d.key);
// 		};

// 			var svg = d3.select("#vis").append("svg")
// 								 .attr("width", width + margin.left + margin.right)
// 								 .attr("height", height + margin.top + margin.bottom);


// 								 svg.append("g")
// 										.selectAll("g")
// 										.data(series)
// 										.join("g")
// 											.attr("fill", d => color(d.key))
// 										.selectAll("rect")
// 										.data(d => d)
// 										.join("rect")
// 											.attr("y", (d, i) => y(d.data.name))
// 											.attr("x", d => x(Math.min(0, d[1])))
// 											.attr("width", d => Math.abs(x(d[1]) - x(0)))
// 											.attr("height", y.bandwidth());

// 									svg.append("g")
// 											.call(xAxis);

// 									svg.append("g")
// 											.call(yAxis);

// 									svg.append("g")
// 											.call(legend);
// }





//   render() {
	


// 	console.log(this.state.vis1Loaded)

// 	return (
// 				<div>
// 					<div id="vis"></div>
// 					{/* <div id="vis"></div> */}

// 					{/* <div id="vis2"></div> */}
// 				</div>
// 	)
// }

//   }

  
//   export default Visualization;









// import React, {Component} from 'react';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import SwipeableViews from 'react-swipeable-views';
// import Visual1 from './visualization1';
// import Visual2 from './visualization2';
// import Visual3 from './StateMap';
// import {Container} from 'react-bootstrap';

// import * as d3 from 'd3'


// class Visualization extends Component {
//     constructor(props) {
//         super(props);
  
//         this.state = {
// 						value:0,
//         };
  
// 		}

// 	changeTab = (event, value) => {
//     	this.setState({value});
//   	}

//   	changeIndex = index => {
//   	    this.setState({ value: index });
//   	};




//     render(){
//         return (
          
					
// 					<div >
// 					<Container id="searchPage-container">



//                 <Tabs
// 		            value={this.state.value}
// 		            indicatorColor="primary"
// 		            textColor="primary"
// 		            variant="fullWidth"
// 								onChange={this.changeTab}
// 								centered

// 		          >
// 		            <Tab label="Visual 1" />
// 		            <Tab label="Visual 2" />
// 		            <Tab label="Visual 3" />


// 		        </Tabs>

//                 <SwipeableViews
// 								index={this.state.value}
// 								onChangeIndex={this.changeIndex}
// 								>
// 								<Visual1 />
// 								<Visual2 />
// 								<Visual3 />

// 		        	</SwipeableViews>



// 					</Container>

//           </div>
//         );
//     }

//   }

  
//   export default Visualization;








import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Visual1 from './visualization1';
import Visual2 from './visualization2';
import Visual3 from './StateMap';
import {Container} from 'react-bootstrap';

import * as d3 from 'd3'


class Visualization extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
						value:0,
        };
  
		}

	changeTab = (event, value) => {
    	this.setState({value});
  	}

  	changeIndex = index => {
  	    this.setState({ value: index });
  	};




    render(){
        return (
          
					
					<div >
					<Container id="searchPage-container">



                <Tabs
		            value={this.state.value}
		            indicatorColor="primary"
		            textColor="primary"
		            variant="fullWidth"
								onChange={this.changeTab}
								centered

		          >
		            <Tab label="Visual 1" />
		            <Tab label="Visual 2" />
		            <Tab label="Visual 3" />


		        </Tabs>

                <SwipeableViews
								index={this.state.value}
								onChangeIndex={this.changeIndex}
								>
								<Visual1 />
								<Visual2 />
								<Visual3 />

		        	</SwipeableViews>



					</Container>

          </div>
        );
    }

  }

  
  export default Visualization;
