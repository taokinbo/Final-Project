<script>
    import { onMount } from "svelte"
    import * as d3 from "d3"
    import { 
	randomInt,
	randomNormal, 
	randomLogNormal, 
	randomBates, 
	randomExponential,
	randomBinomial } from 'd3-random';
    import Graph from '../components/Graph.svelte';
    export let step;
    let oldStep = -1;
    // export let data2;

    import { readString } from 'svelte-csv';

    let showDots = true;
    const results = [
        {
            id: 0,
            preocupaciones_first: 5,
            preocupaciones_second: 1,
            preocupaciones_third: 9
        },
        {
            id: 1,
            preocupaciones_first: 1,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 2,
            preocupaciones_first: 4,
            preocupaciones_second: 1,
            preocupaciones_third: 3
        },
        {
            id: 3,
            preocupaciones_first: 1,
            preocupaciones_second: 2,
            preocupaciones_third: 4
        },
        {
            id: 4,
            preocupaciones_first: 6,
            preocupaciones_second: 1,
            preocupaciones_third: 2
        },
        {
            id: 5,
            preocupaciones_first: 6,
            preocupaciones_second: 3,
            preocupaciones_third: 15
        },
        {
            id: 6,
            preocupaciones_first: 1,
            preocupaciones_second: 14,
            preocupaciones_third: 9
        },
        {
            id: 7,
            preocupaciones_first: 15,
            preocupaciones_second: 0,
            preocupaciones_third: 0
        },
        {
            id: 8,
            preocupaciones_first: 5,
            preocupaciones_second: 6,
            preocupaciones_third: 8
        },
        {
            id: 9,
            preocupaciones_first: 5,
            preocupaciones_second: 1,
            preocupaciones_third: 9
        },
        {
            id: 10,
            preocupaciones_first: 4,
            preocupaciones_second: 1,
            preocupaciones_third: 3
        },
        {
            id: 11,
            preocupaciones_first: 4,
            preocupaciones_second: 8,
            preocupaciones_third: 14
        },
        {
            id: 12,
            preocupaciones_first: 4,
            preocupaciones_second: 7,
            preocupaciones_third: 5
        },
        {
            id: 13,
            preocupaciones_first: 8,
            preocupaciones_second: 7,
            preocupaciones_third: 15
        },
        {
            id: 14,
            preocupaciones_first: 8,
            preocupaciones_second: 4,
            preocupaciones_third: 14
        },
        {
            id: 15,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 10
        },
        {
            id: 16,
            preocupaciones_first: 1,
            preocupaciones_second: 2,
            preocupaciones_third: 9
        },
        {
            id: 17,
            preocupaciones_first: 1,
            preocupaciones_second: 3,
            preocupaciones_third: 4
        },
        {
            id: 18,
            preocupaciones_first: 1,
            preocupaciones_second: 2,
            preocupaciones_third: 4
        },
        {
            id: 19,
            preocupaciones_first: 4,
            preocupaciones_second: 5,
            preocupaciones_third: 3
        },
        {
            id: 20,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 5
        },
        {
            id: 21,
            preocupaciones_first: 5,
            preocupaciones_second: 3,
            preocupaciones_third: 4
        },
        {
            id: 22,
            preocupaciones_first: 3,
            preocupaciones_second: 6,
            preocupaciones_third: 8
        },
        {
            id: 23,
            preocupaciones_first: 4,
            preocupaciones_second: 3,
            preocupaciones_third: 13
        },
        {
            id: 24,
            preocupaciones_first: 1,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 25,
            preocupaciones_first: 5,
            preocupaciones_second: 3,
            preocupaciones_third: 15
        },
        {
            id: 26,
            preocupaciones_first: 13,
            preocupaciones_second: 5,
            preocupaciones_third: 15
        },
        {
            id: 27,
            preocupaciones_first: 1,
            preocupaciones_second: 5,
            preocupaciones_third: 4
        },
        {
            id: 28,
            preocupaciones_first: 15,
            preocupaciones_second: 0,
            preocupaciones_third: 0
        },
        {
            id: 29,
            preocupaciones_first: 4,
            preocupaciones_second: 1,
            preocupaciones_third: 15
        },
        {
            id: 30,
            preocupaciones_first: 3,
            preocupaciones_second: 13,
            preocupaciones_third: 4
        },
        {
            id: 31,
            preocupaciones_first: 3,
            preocupaciones_second: 4,
            preocupaciones_third: 5
        },
        {
            id: 32,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 5
        },
        {
            id: 33,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 5
        },
        {
            id: 34,
            preocupaciones_first: 1,
            preocupaciones_second: 5,
            preocupaciones_third: 4
        },
        {
            id: 35,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 11
        },
        {
            id: 36,
            preocupaciones_first: 1,
            preocupaciones_second: 2,
            preocupaciones_third: 11
        },
        {
            id: 37,
            preocupaciones_first: 1,
            preocupaciones_second: 2,
            preocupaciones_third: 11
        },
        {
            id: 38,
            preocupaciones_first: 4,
            preocupaciones_second: 3,
            preocupaciones_third: 2
        },
        {
            id: 39,
            preocupaciones_first: 1,
            preocupaciones_second: 3,
            preocupaciones_third: 4
        },
        {
            id: 40,
            preocupaciones_first: 4,
            preocupaciones_second: 3,
            preocupaciones_third: 1
        },
        {
            id: 41,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 3
        },
        {
            id: 42,
            preocupaciones_first: 4,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 43,
            preocupaciones_first: 1,
            preocupaciones_second: 14,
            preocupaciones_third: 15
        },
        {
            id: 44,
            preocupaciones_first: 3,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 45,
            preocupaciones_first: 1,
            preocupaciones_second: 13,
            preocupaciones_third: 15
        },
        {
            id: 46,
            preocupaciones_first: 3,
            preocupaciones_second: 4,
            preocupaciones_third: 13
        },
        {
            id: 47,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 3
        },
        {
            id: 48,
            preocupaciones_first: 1,
            preocupaciones_second: 3,
            preocupaciones_third: 5
        },
        {
            id: 49,
            preocupaciones_first: 1,
            preocupaciones_second: 2,
            preocupaciones_third: 4
        },
        {
            id: 50,
            preocupaciones_first: 3,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 51,
            preocupaciones_first: 6,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 52,
            preocupaciones_first: 4,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 53,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 15
        },
        {
            id: 54,
            preocupaciones_first: 9,
            preocupaciones_second: 3,
            preocupaciones_third: 15
        },
        {
            id: 55,
            preocupaciones_first: 4,
            preocupaciones_second: 1,
            preocupaciones_third: 15
        },
        {
            id: 56,
            preocupaciones_first: 15,
            preocupaciones_second: 0,
            preocupaciones_third: 0
        },
        {
            id: 57,
            preocupaciones_first: 1,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 58,
            preocupaciones_first: 1,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 59,
            preocupaciones_first: 11,
            preocupaciones_second: 1,
            preocupaciones_third: 15
        },
        {
            id: 60,
            preocupaciones_first: 3,
            preocupaciones_second: 11,
            preocupaciones_third: 4
        },
        {
            id: 61,
            preocupaciones_first: 4,
            preocupaciones_second: 14,
            preocupaciones_third: 3
        },
        {
            id: 62,
            preocupaciones_first: 11,
            preocupaciones_second: 6,
            preocupaciones_third: 4
        },
        {
            id: 63,
            preocupaciones_first: 5,
            preocupaciones_second: 6,
            preocupaciones_third: 8
        },
        {
            id: 64,
            preocupaciones_first: 1,
            preocupaciones_second: 5,
            preocupaciones_third: 11
        },
        {
            id: 65,
            preocupaciones_first: 3,
            preocupaciones_second: 1,
            preocupaciones_third: 15
        },
        {
            id: 66,
            preocupaciones_first: 4,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 67,
            preocupaciones_first: 15,
            preocupaciones_second: 0,
            preocupaciones_third: 0
        },
        {
            id: 68,
            preocupaciones_first: 1,
            preocupaciones_second: 11,
            preocupaciones_third: 4
        },
        {
            id: 69,
            preocupaciones_first: 4,
            preocupaciones_second: 3,
            preocupaciones_third: 8
        },
        {
            id: 70,
            preocupaciones_first: 15,
            preocupaciones_second: 0,
            preocupaciones_third: 0
        },
        {
            id: 71,
            preocupaciones_first: 1,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 72,
            preocupaciones_first: 4,
            preocupaciones_second: 3,
            preocupaciones_third: 9
        },
        {
            id: 73,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 15
        },
        {
            id: 74,
            preocupaciones_first: 5,
            preocupaciones_second: 14,
            preocupaciones_third: 15
        },
        {
            id: 75,
            preocupaciones_first: 15,
            preocupaciones_second: 0,
            preocupaciones_third: 0
        },
        {
            id: 76,
            preocupaciones_first: 5,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 77,
            preocupaciones_first: 1,
            preocupaciones_second: 2,
            preocupaciones_third: 4
        },
        {
            id: 78,
            preocupaciones_first: 1,
            preocupaciones_second: 2,
            preocupaciones_third: 4
        },
        {
            id: 79,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 2
        },
        {
            id: 80,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 9
        },
        {
            id: 81,
            preocupaciones_first: 1,
            preocupaciones_second: 5,
            preocupaciones_third: 6
        },
        {
            id: 82,
            preocupaciones_first: 1,
            preocupaciones_second: 5,
            preocupaciones_third: 15
        },
        {
            id: 83,
            preocupaciones_first: 3,
            preocupaciones_second: 4,
            preocupaciones_third: 14
        },
        {
            id: 84,
            preocupaciones_first: 6,
            preocupaciones_second: 14,
            preocupaciones_third: 15
        },
        {
            id: 85,
            preocupaciones_first: 14,
            preocupaciones_second: 8,
            preocupaciones_third: 15
        },
        {
            id: 86,
            preocupaciones_first: 5,
            preocupaciones_second: 9,
            preocupaciones_third: 14
        },
        {
            id: 87,
            preocupaciones_first: 3,
            preocupaciones_second: 4,
            preocupaciones_third: 1
        },
        {
            id: 88,
            preocupaciones_first: 7,
            preocupaciones_second: 3,
            preocupaciones_third: 11
        },
        {
            id: 89,
            preocupaciones_first: 14,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 90,
            preocupaciones_first: 5,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 91,
            preocupaciones_first: 1,
            preocupaciones_second: 4,
            preocupaciones_third: 2
        },
        {
            id: 92,
            preocupaciones_first: 4,
            preocupaciones_second: 9,
            preocupaciones_third: 15
        },
        {
            id: 93,
            preocupaciones_first: 1,
            preocupaciones_second: 2,
            preocupaciones_third: 3
        },
        {
            id: 94,
            preocupaciones_first: 4,
            preocupaciones_second: 7,
            preocupaciones_third: 9
        },
        {
            id: 95,
            preocupaciones_first: 2,
            preocupaciones_second: 4,
            preocupaciones_third: 3
        },
        {
            id: 96,
            preocupaciones_first: 1,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 97,
            preocupaciones_first: 1,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        },
        {
            id: 98,
            preocupaciones_first: 1,
            preocupaciones_second: 15,
            preocupaciones_third: 0
        }
]
        //Anaylisys of categories
    results.forEach(function (value) {
        //HEALTH
        let val = value.preocupaciones_first;
        if (val === 1 || val === 2 || val === 8 || val === 9) {
            value.preocupaciones_first = 1
        } //SAFETY
        else if(val === 5 || val === 12 || val === 13) {
            value.preocupaciones_first = 2;
        } //MONETARY/RESOURCES
        else if (val === 3 || val === 4 || val === 6 || val === 7 || val === 10 || val === 11) {
            value.preocupaciones_first = 3;
        }//OTHER
        else {
            value.preocupaciones_first = 4;
        }

        val = value.preocupaciones_second;
        if (val === 1 || val === 2 || val === 8 || val === 9) {
            value.preocupaciones_second = 1
        } //SAFETY
        else if(val === 5 || val === 12 || val === 13) {
            value.preocupaciones_second = 2;
        } //MONETARY/RESOURCES
        else if (val === 3 || val === 4 || val === 6 || val === 7 || val === 10 || val === 11) {
            value.preocupaciones_second = 3;
        }//OTHER
        else {
            value.preocupaciones_second = 4;
        }

        val = value.preocupaciones_third;
        if (val === 1 || val === 2 || val === 8 || val === 9) {
            value.preocupaciones_third = 1
        } //SAFETY
        else if(val === 5 || val === 12 || val === 13) {
            value.preocupaciones_third = 2;
        } //MONETARY/RESOURCES
        else if (val === 3 || val === 4 || val === 6 || val === 7 || val === 10 || val === 11) {
            value.preocupaciones_third = 3;
        }
        else {
            value.preocupaciones_third = 4;
        }


    });

    // const results = readString(str);
    console.log(results);

    // let data_file = "https://raw.githubusercontent.com/vis-society/lab-7-taokinbo/main/todomvc/src/components/concerns.csv?token=GHSAT0AAAAAACBEB7SUJXLW47R7DMJEGZ4MZBS335A";
    // let data2;

    // onMount(
	// 	async () => {
    //         d3.csv(data_file).then(function (d) {
    //             data2 = d;
    //             data2.forEach(function (value) {
    //                 if (value.preocupaciones_first === "") value.preocupaciones_first = 0;
    //                 if (value.preocupaciones_third === "") value.preocupaciones_third = 0;
    //                 if (value.preocupaciones_second === "") value.preocupaciones_second = 0;
    //                 value.preocupaciones_first = parseInt(value.preocupaciones_first);
    //                 value.preocupaciones_second = parseInt(value.preocupaciones_second);
    //                 value.preocupaciones_third = parseInt(value.preocupaciones_third);
    //                 // console.log(value);
    //             }); 
    //         });
	// 		// data2 = await d3.csv('https://raw.githubusercontent.com/vis-society/lab-7-taokinbo/68067ef981364b4df6692df0989316ae9d873acd/todomvc/src/components/concerns.csv?token=GHSAT0AAAAAACBEB7SUQBSRZW54TF52CBTIZBSYZ5Q');
	// 	}
	// )
    results.forEach(function (value) {
        value.height = 0;
        value.speed = 0;
    });
    
    let fallSpeed = 20;
    let extra_margin = 50;

 	
  
    let data = [
      { foo: 4, bar: 0, swag: 7 },
      { foo: 1, bar: 3, swag: 3 },
      { foo: 9, bar: 5, swag: 4 },
      { foo: 2, bar: 5, swag: 5 },
      { foo: 10, bar: 4, swag: 6 },
      { foo: 9, bar: 5, swag: 7 },
      { foo: 5, bar: 3, swag: 8 },
      { foo: 4, bar: 15, swag: 9 },
      { foo: 1, bar: 6, swag: 10 },
    ];
      
    import { scaleLinear, scaleSqrt } from "d3-scale";
    import { extent, min, max } from "d3-array";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";
  
    let width;
  let height;
  let fallingSet = false;
  let newMax = -1;

  const margin = { top: 30, bottom: 30, left: 30, right: 30 };

  const tweenOptions = {
    delay: 0,
    duration: 3000,
    easing: cubicOut,
  };

  const tweenedX = tweened(
    results.map((d) => d.preocupaciones_first),
    tweenOptions
  );

  const tweenedY = tweened(
    results.map((d) => d.id),
    tweenOptions
  );

  newMax = extent(results.map((d) => d.id))[1];


  $: tweenedData = results.map((d, index) => ({
    x: $tweenedX[index],
    y: $tweenedY[index]
  }));

  function setTween(dimension, key, jitter = 0) {
    dimension.set(results.map((d) => (+d[key] + (Math.random()-0.5)*jitter * 2)));
  }

  const hideDots = () => {
    
    showDots = false;
    /*
    d3.selectAll(".dot")
    .transition()
    .duration(500)
    .style("opacity", 0)
    .remove();
   /*
    d3.selectAll('.dot')
    .transition()
    .duration(500)
    .style('opacity', 0)
    .on('end', () => {
      showDots = false;
    });
    */
  };

  const unhideDots = () => {
    showDots = true;
  };

  $: {
    if (step == 0) {
      unhideDots();
      setTween(tweenedY, "height",);
      setTween(tweenedX, "preocupaciones_first", 0.25);
      setScale("preocupaciones_first", "height");
    }
    if (step == 1) {
      unhideDots();
      setTween(tweenedY, "height");
      setTween(tweenedX, "preocupaciones_second", 0.25);
      setScale("preocupaciones_second", "height");

    }
    if (step == 2) {
      unhideDots();
      setTween(tweenedY, "height");
      setTween(tweenedX, "preocupaciones_third", 0.25);
      setScale("preocupaciones_third", "height");

    }
    
    if (step == 3) {
      hideDots();
      console.log("width")
      console.log(width)
      console.log("height")
      console.log(height)


    }
  }

  let xScale = scaleLinear()
    .domain(extent($tweenedX, (d) => d))
    .range([margin.left, width - margin.right]);
  let yScale = scaleLinear()
    .domain(extent($tweenedY, (d) => d))
    .range([height - margin.top, margin.bottom]);

  $: if(oldStep!== step) {
    oldStep = step;
    console.log("updating scale");
    xScale = scaleLinear()
    .domain(extent($tweenedX, (d) => d))
    .range([margin.left, width - margin.right]);

    yScale = scaleLinear()
    .domain(extent($tweenedY, (d) => d))
    .range([height - margin.top, margin.bottom]);
  }

  function setScale(key1, key2) {
    xScale = scaleLinear()
    .domain(extent(results.map((d) => (+d[key1]))))
    .range([margin.left, width - margin.right]);

    yScale = scaleLinear()
    .domain(extent(results.map((d) => (+d[key2]))))
    .range([height - margin.top, margin.bottom]);

    newMax = extent(results.map((d) => (+d[key2])))[1];
    console.log(newMax)
  }

  $: {
    console.log("width: ");
    console.log(width);
    console.log("height: ");
    console.log(height);

    if (width && height && !fallingSet) {
        fallingSet = true;
        results.forEach(function (value) {
            value.height = Math.random() * height;
            value.speed = Math.random() * fallSpeed + fallSpeed * .5;
        });

    }
  }

  setInterval(() => {
    results.forEach(function (value, index) {
        if (true){
            value.height -= value.speed;
            if (height && yScale(value.height) > height + extra_margin) {
                value.height = newMax - extra_margin;
            }
        }
    });
    setTween(tweenedY, "height",);
  }, 1000)

</script>
  
<div
class="chart-container"
bind:offsetWidth={width}
bind:offsetHeight={height}
>
<svg width={width + margin.right + margin.left} {height}>
    {#if showDots}
  {#each tweenedData as d}
    <circle
      cx={xScale(d.x)}
      cy={yScale(d.y)}
      r={10}
      fill="orange"
      opacity=".9"
    />
  {/each}
  {:else}
  <div class="transparent"></div>
  <!-- render nothing when dots are hidden -->
  {/if}
</svg>
</div>

<style>
.chart-container {
  height: 80vh;
  max-width: 100%;
      background: linear-gradient(to bottom right, orange -100%, white 100%);
      border-radius: 5px;
      box-shadow: 1px 1px 6px #cecece;
}

.transparent {
        background: transparent;
        opacity: 0;
      }
</style>