const dashboard = require('./')

const data = {
  name: 'play'
}

const element = dashboard(data)

document.body.appendChild(element)
