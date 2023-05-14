<script>
	// our interactive data
	import * as d3 from 'd3';
	export let todo_record = [];
	//export let width;
	//export let height;

	let arcGenerator = d3.arc()
		.innerRadius(10)
		.outerRadius(80)
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
		.range(["#f6fad4, #faffd1", "#db921d", "#b86a04", "#a65d29" ,"#6e3003"]) //, "#522302"
		.domain([0,3,7, 10, 23, 26, 30]);

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
		{response: "a traveling companion", count: 6},
		{response: "their coyote", count: 25},
        {response: "extermination groups", count: 9},
        {response: "organized crime", count: 38},
        {response: "police or armed forces", count: 29},
        {response: "groups dedicated to extracting natural resources", count: 2},
        {response: "something other than the groups listed", count: 22}
	]
    //#6	25	9	38	29	2	22
	arc_data = pieAngleGenerator(sample_data);
	console.log(JSON.stringify(arc_data));


	$: {
		// interactive data here
		console.log("todo");
		console.log(todo_record)
		console.log(JSON.stringify(todo_record));
		console.log("hi")
		console.log(arc_data[0])
		
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
<div class = "contain">
    <h2 style="width: 75%; ">Who is Responsible for Violence on the Journey?</h2>
<div class="visualization">
	<svg width="210" height="210">
		<g transform="translate(110, 110)">
			{#each arc_data as data, index}
			<path 
				d={arcGenerator({
					startAngle: data.startAngle,
					endAngle: data.endAngle
				})}
				fill={index === hovered ? "brown": arc_color(data.value)}
				on:mouseover={(event) => { 
					hovered = index;
					recorded_mouse_position = {
								x: event.pageX,
								y: event.pageY
							} }}
				on:mouseout={(event) => { hovered = -1; }}
			/>
			{/each}
		</g>
	</svg>
	<div
		class={hovered === -1 ? "tooltip-hidden": "tooltip-visible"}
		style="left: {recorded_mouse_position.x + 40}px; top: {recorded_mouse_position.y + 40}px"	
	>
		{#if hovered !== -1}
		    { arc_data[hovered].value }% experienced violence from  
			{arc_data[hovered].data.response}
		{/if}
	</div>


</div>
</div>




<style>
	.visualization {
		font: 25px sans-serif;
		margin: auto;
		margin-top: 1px;
		text-align: middle;
        margin-top: -10px;
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

    .contain {
		display: flex; 
        justify-content: center; 
        align-items: center;
        flex-direction: column;
	}

    h2 {
    margin-bottom: -10px;
    }
</style>