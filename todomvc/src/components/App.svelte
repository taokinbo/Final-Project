<!-- <script>
    import ToDo from '../components/ToDo.svelte';
    import Scroller from '../components/Scroller.svelte';
    import Graph from '../components/Graph.svelte';

    let placeholder = "What do you need to do?";
    let todo_text = "";

    let todos = [
        { id: "0", text: "Learn Svelte", completed: false },
        { id: "1", text: "Finish Lab", completed: false },
    ];

    let todo_record = [];
    let todo_len = 0;
    let todo_names = [];

    $: {
        todo_len = todos.length;
        
        // add the new todo and aggregate the current todo list
        // store them as an object and append it to the todo_record array
        if (todo_record.length == 0 || todo_len !== todo_record[todo_record.length-1].size) {
            todo_names = todos
                .map((todo) => todo.text)
                .reduce((names_as_string, new_todo)=> names_as_string + new_todo + ", ", "");
            todo_record.push(
                {
                    index: todo_record.length+1,
                    size: todo_len,
                    names: todo_names.slice(0,todo_names.length-2)
                }
            )
        }

        // mutating an array doesn' trigger interactivity
        // therefore, we need to assign it again 
        // to manually update the Graph component
        todo_record = todo_record; 
    }

    let next_id = 2;

    function add() {
        todos = todos.concat({
            id: next_id,
            text: todo_text,
            completed: false,
        });
        next_id = next_id + 1;
        todo_text = "";
    }

    function removeTodo(id) {
		todos = todos.filter((todo) => todo.id !== id);
	}
</script> -->



<!-- <main>

    <section class="todos">
        <h1>todos</h1>
        <form on:submit|preventDefault={add}>
            <input {placeholder} bind:value={todo_text} />
        </form>

        {#each todos as todo (todo.id)}
            <ToDo bind:todo={todo} {removeTodo}/>
        {/each}

        <div class="actions" />
    </section>

    <section class="graph">
        <h2 style="margin-top: 15px">todo pie</h2>
        <Graph bind:todo_record={todo_record}/>
    </section>

</main> -->

<!-- <style>
    @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700&display=swap");

    :root {
        --color-bg: #ffffff;
        --color-outline: #c2c2c2;
        --color-shadow: hsl(0, 0%, 0%, 0.1);
        --color-text: #3f4252;
        --color-bg-1: hsla(0, 0%, 0%, 0.2);
        --color-shadow-1: hsl(0, 0%, 96%);
    }

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    main {
        text-align: center;
        font-family: "Nunito", sans-serif;
        font-weight: 300;
        line-height: 2;
        font-size: 24px;
        color: var(--color-text);
        margin-top: 100px;
    }

    label,
    input,
    button {
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
        font-size: 24px;
        width: 100%;
    }

    input {
        padding-left: 40px;
        line-height: 72px;
        font-style: italic;
        border: none;
    }

    ::placeholder {
        color: #9e9e9e;
    }

    h1 {
        font-size: 72px;
        font-weight: 300;
        line-height: 2;
    }

    h2 {
        font-size: 30px;
        font-weight: 300;
        line-height: 1.5;
    }

    .todos {
        display: inline-block;
        vertical-align:top;
        width: 500px;
        background-color: var(--color-bg);
        border-radius: 5px;
        border: 1px solid var(--color-outline);
        box-shadow: 0 0 4px var(--color-shadow);
    }

    .graph {
        display: inline-block;
        margin-left: 50px;
    }

    .actions {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .actions:before {
        content: "";
        height: 40px;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        box-shadow: 0 1px 1px var(--color-shadow-1), 0 8px 0 -3px var(--color-shadow-1),
            0 9px 1px -3px var(--color-bg-1), 0 16px 0 -6px var(--color-shadow-1),
            0 17px 2px -6px var(--color-bg-1), 0 24px 0 -9px var(--color-shadow-1), 0 24px 3px -9px var(--color-bg-1);
        z-index: -1;
    }
</style> -->

<script>
	/* By Connor Rothschild https://twitter.com/CL_Rothschild
	Scrollytelling component from Russell Goldenberg https://twitter.com/codenberg/status/1432774653139984387 */
	
  import Scroller from "./Scroller.svelte";
  import Scatterplot from "./Scatterplot.svelte";
  import Graph from './Graph.svelte';
  import Tab from './Tab.svelte';
  import ViolentGraph from './Graph_violence.svelte';
  
  let concern_step = 0;
  let motive_step = 4;
  let finance_step = 14;
	let violence_step = 21;
  let arrival_step = 30;
  let conclusion_step = 33;
  let value;
  let valRatio;
  const steps = [
    "<p>Many migrants hold many concerns when deciding if migrating is the right choice for them</p>",
		 "<p>This is the <bold>primary</bold> concern held by those migrating. <br> 1: Health <br> 2: Safety <br> 3: Monetary/Resources <br> 4: Other/None</p>",
    "<p>The second most pressing concern. <br> 1: Health <br> 2: Safety <br> 3: Monetary/Resources <br> 4: Other/None</p>",
    "<p>The third concern. <br> 1: Health <br> 2: Safety <br> 3: Monetary/Resources <br> 4: Other/None</p>",

    "<p> Now we explore the many motivations for why migrants travel </p>",
    "<p>Were you motivated to migrate because of unemployment or to search for a better job, salary or working conditions? <br> 1: Yes <br> 2: No </p>",
    "<p>Were you motivated to migrate because of natural hazards? (floods, droughts, hurricanes, etc) <br> 1: Yes <br> 2: No </p>",
    "<p>Were you motivated to migrate because of loss of land from land use change? <br> 1: Yes <br> 2: No </p>",
    "<p>Were you motivated to migrate because of lack of money to buy food or other basic needs (health, education, housing, clothing, services, etc.)? <br> 1: Yes <br> 2: No </p>",
    "<p>Were you motivated to migrate to send remittances? <br> 1: Yes <br> 2: No </p>",
    "<p>Were you motivated to migrate for study? <br> 1: Yes <br> 2: No </p>",
    "<p>Were you motivated to migrate because of unsafety or domestic violence? <br> 1: Yes <br> 2: No </p>",
    "<p>Were you motivated to migrate for family reunification? <br> 1: Yes <br> 2: No </p>",
    "<p>Were you motivated to migrate for health reasons: treatments, surgeries or medical consultations, medicines, etc.? <br> 1: Yes <br> 2: No </p>",
    
    "<p> Now we explore the sources that migrants used to finance their journey </p>",
    "<p> Did you take out a loan? <br> 1: Yes <br> 2: No </p>",
    "<p> Did you mortage your house? <br> 1: Yes <br> 2: No </p>",
    "<p> Did you receive money from a friend or family member? <br> 1: Yes <br> 2: No </p>",
    "<p> Did you use your personal savings? <br> 1: Yes <br> 2: No </p>",
    "<p> Did you receive assistance from your work? <br> 1: Yes <br> 2: No </p>",
    "<p> Did you sell property to finance your trip? <br> 1: Yes <br> 2: No </p>",

    "<p> Now we explore the many challenges that occur during the migration journey, specifically violence along the way </p>",
    "<p>Did you experience violence via extortion? <br> 1: Yes <br> 2: No <br> 3: Did not answer </p>",
    "<p>Did you experience violence via theft? <br> 1: Yes <br> 2: No <br> 3: Did not answer </p>",
    "<p>Did you experience violence via armed robbery? <br> 1: Yes <br> 2: No <br> 3: Did not answer </p>",
    "<p>Did you experience violence via threat or intimidation? <br> 1: Yes <br> 2: No <br> 3: Did not answer </p>",
    "<p>Did you experience violence via physical aggression? <br> 1: Yes <br> 2: No <br> 3: Did not answer </p>",
    "<p>Did you experience violence via sexual harassment or assault? <br> 1: Yes <br> 2: No <br> 3: Did not answer </p>",
    "<p>Did you experience violence via kidnapping or attempted kidnapping? <br> 1: Yes <br> 2: No <br> 3: Did not answer </p>",
    "<p>Did you experience violence via attempted murder? <br> 1: Yes <br> 2: No <br> 3: Did not answer </p>",

    "<p>But given all this prep and money saved alongside the many hardships faced when traveling, how many of these migrants actually made the journey?</p>",
    "<p>Only 16% of migrants were able to succefully reach their destination country, but not all was solved when reached</p>",
    "<p>Many migrants are returned back to their home country or die once they reach their destination. <br> 1: Arrived to destination country <br> 2: Arrived but was returned <br>3: Died after arrival <br>4: Still in transit <br>5: Passed passed away or disappeared in trasnsit<br>6: Arrived in a different coutry</p>",

    "<p> Thank you for joining us on this interactive journey </p>"
  ];
 //<Graph bind:todo_record={todo_record}/>
  
    // console.log("Are these woring");
    // console.log(data2);
    function scrollToTarget() {
    const targetElement = document.getElementById("target");
    targetElement.scrollIntoView({ behavior: "smooth" });
  }
</script>

<section>
	<!-- <div class='hero'>
		<h1> 
			A Svelte Visualization Scrollytelling Starter Kit
		</h1>
		<h2>
			By <a href='https://twitter.com/CL_Rothschild' target="_blank" rel="noreferrer">Connor</a>
		</h2>
	</div> -->
  <div class="banner">
    <div class="hero-image">
      <div class="hero-text">
        <h1>Planning Ahead</h1>
        <h2>An Informational Guide to Central American Migration</h2>

        <button class="button-83" on:click={() => scrollToTarget()}>Skip to Interactive Portion</button>

      </div>
    </div>

  </div>

  <div class = "backgroundinfo"> 

    <h3>The Journey</h3>
    <p>
      Migration is a challenging journey that comes with numerous difficulties for people who go through it. It might be frightening and daunting to travel to a foreign place after leaving behind one's home, family, and friends. Migrants face a range of challenges throughout their journey, including dangers along the way, uncertainty upon arrival at the destination, and problems related to health, housing, and employment. However, as a migrant, you do not have to face these challenges alone.

    </p>
    <h3>The Mission</h3>
    <p>
      This website is here to provide you with valuable insights and data about the migration experience, by sharing statistics and information about what other migrants in similar situations are doing. Our hope is that by sharing this information and providing education about the migration experience, we can raise awareness of the challenges and opportunities that lie ahead, and empower you to make informed decisions that will enhance your journey. 
    </p>
    <h3>Empowering Migrants with Knowledge</h3>
    <p>
      We invite you to embark on a virtual journey through our interactive stream of dots. Each dot represents a migrant and their unique experience. As you explore our interactive stream of dots, you can scroll through to gain deeper insight into various aspects of the migration experience, from start to finish.
    </p>

  </div>

  


  <div id="target" class="section-container">
    <div class="steps-container">
      <Scroller bind:value bind:valRatio>
        {#each steps as text, i}
          <div class="step" class:active={value === i}>
            <div class="step-content" style="{!(value == concern_step ||value == motive_step || value == finance_step || value == violence_step || value == arrival_step)? 'font-size: 1rem;' : 'font-size: 1.5rem;'}">{@html text}</div>
              <div>
                <!-- violence_step = when violence data starts,
                     conclusion_step = when conclusion data starts -->
                {#if (value === violence_step && i === violence_step)}
                  <ViolentGraph/>
                {:else}
                  <!-- render nothing when dots are hidden -->
                {/if}
              </div>
            </div>
        {/each}
        <div class="spacer" />
      </Scroller>
    </div>
    <!-- {#if value !== 3} -->
      <div class={`sticky ${value >= conclusion_step ? "hide" : "show"}`}>
          <Scatterplot step={value} stepRatio={valRatio} />
      </div>
    <!-- {/if} -->
    
  </div>
	<!-- <div class='hero'>
		<h1> 
			Thanks!
		</h1>
		<h2>
			<a href='https://twitter.com/CL_Rothschild' target="_blank" rel="noreferrer">Questions and Tips</a>
		</h2>
	</div> -->
</section>

<style>
	:global(body) {
		overflow-x: hidden;
	}
	
	.hero {
		height: 60vh;
		display: flex;
		place-items: center;
		flex-direction: column;
		justify-content: center;
		text-align: center;
	}
	
	.hero h2 {
		margin-top: 0;
		font-weight: 200;
	}
	
  .spacer {
    height: 40vh;
  }

  .sticky {
    position: sticky;
    top: 10%;
		flex: 1 1 60%;
    width: 60%;
  }

  .hide {
    display: none;
  }

  .show {
    display: flex;
  }

  .section-container {
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
    display: flex;
  }

  .step {
    height: 80vh;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  .step-content {
    font-size: 1rem;
    background: whitesmoke;
    color: #ccc;
    border-radius: 5px;
    padding: .5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 500ms ease;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .2);
    text-align: left;
		width: 75%;
		margin: auto;
		max-width: 150px;
  }

	.step.active .step-content {
		background: white;
		color: black;
	}
	
  .steps-container,
  .sticky {
    height: 100%;
  }

  .steps-container {
    flex: 1 1 10%;
    z-index: 10;
  }

  .graph {
        display: inline-block;
        margin-left: 50px;
    }






    body, html {
    height: 100%;
}

/* The hero image */
.hero-image {
  /* ../../../banner.jpeg*/
  /* Use "linear-gradient" to add a darken background effect to the image (photographer.jpg). This will make the text easier to read */
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(255, 255, 0, 0.23)), url("../../banner.png");

  /* Set a specific height */
  height: 50%;

  /* Position and center the image to scale nicely on all screens */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

/* Place text in the middle of the image */
.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.banner {
  height: 1200px;
  margin-bottom: -32%;
}

.backgroundinfo {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5%;
}

h1 {
  font-family: 'Poppins';
  font-size: 100px;
}

h3 {
  font-family: 'Poppins';
  font-size: 40px;
}

p {
  margin-left: 10%;
  margin-right: 10%;
  font-size: 20px;
}
	
/* Comment out the following line to always make it 'text-on-top' */
  /* @media screen and (max-width: 768px) {
    .section-container {
      flex-direction: column-reverse;
    }
    .sticky {
      width: 95%;
			margin: auto;
    }
  } */





/* CSS */
.button-83 {
  appearance: button;
  background-color: transparent;
  background-image: linear-gradient(to bottom, #fff, #f8eedb);
  border: 0 solid #e5e7eb;
  border-radius: .5rem;
  box-sizing: border-box;
  color: #482307;
  column-gap: 1rem;
  cursor: pointer;
  font-family: ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 100%;
  font-weight: 700;
  line-height: 24px;
  margin: 0;
  outline: 2px solid transparent;
  padding: 1rem 1.5rem;
  text-align: center;
  text-transform: none;
  transition: all .1s cubic-bezier(.4, 0, .2, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  box-shadow: -6px 8px 10px rgba(81,41,10,0.1),0px 2px 2px rgba(81,41,10,0.2);
}

.button-83:active {
  background-color: #f3f4f6;
  box-shadow: -1px 2px 5px rgba(81,41,10,0.15),0px 1px 1px rgba(81,41,10,0.15);
  transform: translateY(0.125rem);
}

.button-83:focus {
  box-shadow: rgba(72, 35, 7, .46) 0 0 0 4px, -6px 8px 10px rgba(81,41,10,0.1), 0px 2px 2px rgba(81,41,10,0.2);
}

.container {
  position: relative;
}

.text {
  text-align: center;
  margin-bottom: 100px; /* adjust as needed */
}

.image {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>