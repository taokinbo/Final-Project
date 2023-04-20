<script>
	// our interactive data
	import * as d3 from 'd3';
	export let todo_record = [];
	//export let width;
	//export let height;

	let arcGenerator = d3.arc()
		.innerRadius(10)
		.outerRadius(100)
		.padAngle(.02)
		.cornerRadius(4);

	let recorded_mouse_position = {
		x: 0, y: 0
	};

	// let arc_data = [
	// 	{startAngle: 0, endAngle: 0.2},
	// 	{startAngle: 0.2, endAngle: 0.6},
	// 	{startAngle: 0.6, endAngle: 1.4},
	// 	{startAngle: 1.4, endAngle: 3},
	// 	{startAngle: 3, endAngle: 2*Math.PI}
	// ];

	// let pieAngleGenerator = d3.pie();
	// let sample_data = [1, 4, 5, 2, 4]
	// let arc_data = pieAngleGenerator(sample_data);
	// console.log(JSON.stringify(arc_data));

	// let pieAngleGenerator = d3.pie().value(d => d.count);
	// let sample_data = [
	// 	{animal: "cat", count: 1},
	// 	{animal: "dog", count: 4},
	// 	{animal: "rabbit", count: 5},
	// 	{animal: "hamster", count: 2},
	// 	{animal: "pony", count: 4}
	// ]
	// let arc_data = pieAngleGenerator(sample_data);
	// console.log(JSON.stringify(arc_data));









	
	let pieAngleGenerator = d3.pie().value( d => d.count );
	let arc_data = [];

	const arc_color = d3.scaleLinear()
		.range(["#faffd1", "#db921d", "#b86a04", "#a65d29" ,"#6e3003"])
		.domain([0,3,6,9,12]);

	let hovered = -1;

	/*
	arc_data = [
    { data: [10, 5], startAngle: 0, endAngle: Math.PI / 2 },
    { data: [5, 2], startAngle: Math.PI / 2, endAngle: Math.PI },
    { data: [3, 7], startAngle: Math.PI, endAngle: Math.PI * 1.5 },
    { data: [7, 8], startAngle: Math.PI * 1.5, endAngle: Math.PI * 2 },
  ];
  */

  let sample_data = [
		{animal: "cat", count: 1},
		{animal: "dog", count: 4},
		{animal: "rabbit", count: 5},
		{animal: "hamster", count: 2},
		{animal: "pony", count: 4}
	]
	arc_data = pieAngleGenerator(sample_data);
	console.log(JSON.stringify(arc_data));


	$: {
		// interactive data here
		console.log("todo");
		console.log(todo_record)
		console.log(JSON.stringify(todo_record));
		console.log("hi")
		
		/*
		let todo_count_by_size = d3.rollups(
			todo_record,
			v => v.length,
			d => d.size
		);
		*/

		//arc_data = pieAngleGenerator(todo_count_by_size);


		/*
		let sample_data = [
			{ data: [10, 5], startAngle: 0, endAngle: Math.PI / 2 },
    { data: [5, 2], startAngle: Math.PI / 2, endAngle: Math.PI },
    { data: [3, 7], startAngle: Math.PI, endAngle: Math.PI * 1.5 },
    { data: [7, 8], startAngle: Math.PI * 1.5, endAngle: Math.PI * 2 }
		 ]
		let arc_data = pieAngleGenerator(sample_data);
		console.log("arc_data", arc_data);
		*/
	}
	
	/*
	let pieAngleGenerator = d3.pie().value( d => d.count );
	let sample_data = [
		{animal: "cat", count: 1},
		{animal: "dog", count: 4},
		{animal: "rabbit", count: 5},
		{animal: "hamster", count: 2},
		{animal: "pony", count: 4}
	]
	let arc_data = pieAngleGenerator(sample_data);
	*/

	console.log("arc_data: ", arc_data);

</script>

<div class="visualization">
	<svg width="500" height="500">
		<g transform="translate(250, 250)">
			{#each arc_data as data, index}
			<path 
				d={arcGenerator({
					startAngle: data.startAngle,
					endAngle: data.endAngle
				})}
				fill={arc_color(data.value)}
			/>
			{/each}
		</g>
	</svg>
</div>





<style>
	.visualization {
		font: 25px sans-serif;
		margin: auto;
		text-align: middle;
	}

	/* dynamic classes for the tooltip */
	.tooltip-hidden {
		visibility: hidden;
		font-family: "Nunito", sans-serif;
		width: 200px;
		position: absolute;
	}

	.tooltip-visible {
		font: 25px sans-serif;
		font-family: "Nunito", sans-serif;
		visibility: visible;
		background-color: #f0dba8;
		border-radius: 10px;
		width: 200px;
		color: black;
		position: absolute;
		padding: 10px;
	}
</style>