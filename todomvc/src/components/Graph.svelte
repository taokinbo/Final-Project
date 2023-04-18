<script>
	// our interactive data
	import * as d3 from 'd3';
	export let todo_record = [];

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

	let pieAngleGenerator = d3.pie().value(d => d[1]);
	let arc_data = [];

	const arc_color = d3.scaleLinear()
		.range(["#faffd1", "#db921d", "#b86a04", "#a65d29" ,"#6e3003"])
		.domain([0,3,6,9,12]);

	let hovered = -1;

	$: {
		// interactive data here
		console.log(JSON.stringify(todo_record));

		let todo_count_by_size = d3.rollups(
			todo_record,
			v => v.length,
			d => d.size
		);

		arc_data = pieAngleGenerator(todo_count_by_size);
	}

</script>

<div class="visualization">
	<svg width="500" height="500">
		<g transform="translate(250, 120)">
			{#each arc_data as data, index}
			<path
				d={arcGenerator({
					startAngle: data.startAngle,
					endAngle: data.endAngle
				})}
				fill={index === hovered ? "brown" : arc_color(data.data[0])}
				on:mouseover={(event) => {
					hovered = index;
					recorded_mouse_position = {
						x: event.pageX,
						y:event.pageY
					}
				}}
				on:mouseout={(event) => {hovered = -1}}
				
			/>
			{/each}
		</g>
	</svg>
	<div class={hovered === -1 ? "tooltip-hidden" : "tooltip-visible"}
	style="left: {recorded_mouse_position.x + 40}px; top:{recorded_mouse_position.y + 40}px"
	> 
		{#if hovered !== -1}
			There are {arc_data[hovered].data[1] }
			record{ arc_data[hovered].data[1]===1 ? "" : "s" }
			where you have {arc_data[hovered].data[0] } todo items.
		{/if}

	</div>
</div>

<style>
	.visualization {
		font: 25px sans-serif;
		margin: auto;
		margin-top: 1px;
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