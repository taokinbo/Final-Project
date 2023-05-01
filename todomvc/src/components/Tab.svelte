<script>
    export let tabs = [
      {title: '1', content: 'This is the content for Concern 1.'},
      {title: '2', content: 'This is the content for Concern 2.'},
      {title: '3', content: 'This is the content for Concern 3.'},
    ];
    
    export let activeTabIndex = 0;
  
    function activateTab(index) {
      activeTabIndex = index;
    }

    $: {
    console.log("tab");
    }
  </script>
  
  <div class="tab-container">
    <h3>Priority of Concern</h3>
    <div class="tab">
      <div class="tab-header">
        {#each tabs as tab, index}
          <div
            class="tab-header-item"
            class:active={activeTabIndex === index}
            on:click={() => activateTab(index)}
          >
            {tab.title}
          </div>
        {/each}
      </div>
      <div class="tab-content">
        {#each tabs as tab, index}
          {#if activeTabIndex === index}
            <div class="tab-content-item">
              {tab.content}
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
  
  <style>
    .tab-container {
      text-align: center;
      border: 1px solid black;
    }
    
    .tab {
      display: flex;
      flex-direction: column;
    }
  
    .tab-header {
      display: flex;
      justify-content: center;
    }
  
    .tab-header-item {
      padding: 8px;
      margin-right: 8px;
      border: 1px solid black;
      cursor: pointer;
    }
  
    .tab-header-item.active {
      background-color: #ddd;
    }
  
    .tab-content-item {
      padding: 8px;
      border: 1px solid black;
    }
  </style>
  