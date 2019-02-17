export let defaultLayer = {
  new: true,
  name: 'New Layer',
  layerType: 'text',
  anchor: {
    x: 0.5,
    y: 0.5
  },
  text: '',
  image: '',
  rotate: 0,
  size: {
    width: 0,
    height: 0
  },
  translate: {
    x: 0,
    y: 0
  },
  font: {
    primary: {
      color: '#000',
      family: 'Roboto',
      shadow: {
        blur: 0,
        color: '#000',
        offset: {
          x: 0,
          y: 0
        },
      },
      size: 16,
      style: {
        bold: false,
        italic: false,
        underline: false
      }
    },
    secondary: {
      color: '#000',
      family: 'Roboto',
      shadow: {
        blur: 0,
        color: '#000',
        offset: {
          x: 0,
          y: 0
        },
      },
      size: 16,
      style: {
        bold: false,
        italic: false,
        underline: false
      }
    }
  }
}
