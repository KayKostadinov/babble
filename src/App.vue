<template>
  <div id="app">
    <header>
      <nav>
        <a>Chat</a>
        <a>Rooms</a>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
:root {
  --main: rgb(65, 184, 131);
  --accent: rgb(53, 73, 94);
}

html,
body,
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background: var(--accent);
}
a {
  background: none;
  text-decoration: none;
  color: var(--main);
}

li,
ul {
  list-style: none;
}

input {
  border: 1px solid var(--main);
  padding: 0.5em 1em;
  font: inherit;
  outline: none;
  border-radius: 7px;
  overflow: hidden;
  color: whitesmoke;
}

button,
.btn {
  padding: 0.5em 1em;
  border: 1px solid var(--main);
  border-radius: 7px;
  overflow: hidden;
  color: whitesmoke;
  background: rgba(65, 184, 131, 0.1);
  font-size: 1.1em;
  transition: all 0.2s ease-in-out;
  display: inline-block;
}

button:hover {
  cursor: pointer;
  background: rgba(65, 184, 131, 0.3);
  color: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
}
nav {
  padding: 0.5em 0;
  background: var(--main);
  font-weight: 700;
  font-size: 1.2em;
}
nav a {
  margin: 0 1em;
  color: whitesmoke;
}

.container {
  padding: 1em;
  max-width: 600px;
  margin: auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(6, auto);
  grid-template-rows: repeat(6, auto);
  column-gap: 1em;
}
</style>
