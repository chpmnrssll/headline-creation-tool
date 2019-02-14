export function splitLines(layerData) {
  let splitLines = []
  let lines = splitNewLines(layerData.text)

  lines.forEach(line => {
    splitLines.push(splitHandlebars(line))
  })

  return splitLines
}

function splitNewLines(text) {
  let newLines = text.split('<br/>')
  if (newLines.length <= 1) {
    newLines = text.split('\n')
  }

  return newLines
}

function splitHandlebars(text) {
  let handlebars = []
  let leftHandle = text.split('{{')

  leftHandle.forEach(string1 => {
    let rightHandle = string1.split('}}')
    if (rightHandle.length <= 1) {
      handlebars.push({
        text: string1,
        font: 'primary'
      })
    } else {
      rightHandle.forEach((string2, index) => {
        if (string2 !== '') {
          if (index % 2 === 0) {
            handlebars.push({
              text: string2,
              font: 'secondary'
            })
          } else {
            handlebars.push({
              text: string2,
              font: 'primary'
            })
          }
        }
      })
    }
  })

  return handlebars
}
