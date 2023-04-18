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
  

  
	
  let value;
  const steps = [
		 "<p>This is the <bold>first</bold> concern held by those migrating. <br> 1: Health <br> 2: Safety <br> 3: Monetary/Resources <br> 4: Other/None</p>",
    "<p>The second most pressing concern. <br> 1: Health <br> 2: Safety <br> 3: Monetary/Resources <br> 4: Other/None</p>",
    "<p>The third concern. <br> 1: Health <br> 2: Safety <br> 3: Monetary/Resources <br> 4: Other/None</p>"
  ];

  
    // console.log("Are these woring");
    // console.log(data2);
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
  <div class="section-container">
    <div class="steps-container">
      <Scroller bind:value>
        {#each steps as text, i}
          <div class="step" class:active={value === i}>
            <div class="step-content">{@html text}</div>
          </div>
        {/each}
        <div class="spacer" />
      </Scroller>
    </div>
    <div class="sticky">
      <Scatterplot step={value} />
    </div>
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
</style>