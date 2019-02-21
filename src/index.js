const csjs = require('csjs-inject')
const bel = require('bel')

module.exports = dashboard

function dashboard (opts) {
  const name = opts.name
  const pages = {
    modules: modules(),
    about: about(name),
    specification: specification(),
    roadmap: roadmap(),
  }
  const content = bel`<div class=${css.content}>${pages.about}</div>`
  const element = bel`<div class=${css.dashboard}>
    <div class=${css.menu}>
      <button class=${css.btn} onclick=${e => route(e, 'about')}> about </button>
      <button class=${css.btn} onclick=${e => route(e, 'specification')}> specification </button>
      <button class=${css.btn} onclick=${e => route(e, 'roadmap')}> roadmap </button>
      <button class=${css.btn} onclick=${e => route(e, 'modules')}> modules </button>
    </div>
    ${content}
  </div>`
  route({ currentTarget: element.children[0].children[0] }, 'about')
  return element

  function route ({ currentTarget: el, route = el.textContent.trim() }) {
    ;[...el.parentElement.children].forEach(el => el.classList.remove(css.marked))
    el.classList.add(css.marked)
    content.innerHTML = ''
    content.appendChild(pages[route])
  }
}
function about (name) {
  const css = csjs`
  .about {
    grid-area: header;
    background-color: green;
  }`
  return bel`<div class=${css.about}>
    <h1> ${name} organisation dashboard </h1>
    <h2> ...work in progress... </h2>
  </div>`
}
function modules () {
  const css = csjs`
  .modules {
    grid-area: header;
    background-color: yellow;
  }`
  return bel`<div class=${css.modules}>
    modules
  </div>`
}
function specification () {
  const css = csjs`
  .specification {
    background-color: blue;
  }`
  return bel`<div class=${css.specification}>
  specification
  </div>`
}
function roadmap () {
  const css = csjs`
  .roadmap {
    background-color: red;
  }`
  return bel`<div class=${css.roadmap}>
  roadmap
  </div>`
}
const css = csjs`
.dashboard {
  display: flex;
  flex-direction: column;
  height: 95vh;
}
.menu {
  border: 1px dashed black;
}
.btn {
  height: 30px;
}
.marked {
  border: 2px solid red;
}
.content {
  margin-top: 20px;
  border: 1px dashed black;
  display: grid;
  height: 100%;
  grid-template-areas: 'header';
  overflow: auto;
}`
