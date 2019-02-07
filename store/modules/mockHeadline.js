export default {
  name: 'mock headline',
  layers: [{
      anchor: {
        x: 0.5,
        y: 0.5
      },
      layerType: 'image',
      name: 'Random Image',
      image: 'https://picsum.photos/640/280/?random',
      zIndex: 0,
    },

    {
      anchor: {
        x: 0.5,
        y: 0.5
      },
      font: {
        primary: {
          color: '#ffdc45',
          family: 'Luckiest Guy',
          shadow: {
            blur: 12,
            color: '#000',
            offset: {
              x: 2,
              y: 4
            },
          },
          size: 52,
          style: {
            bold: false,
            italic: false,
            underline: false
          },
        }
      },
      layerType: 'text',
      name: 'Big Text',
      rotate: -5,
      text: 'Headline Creation Tool',
      translate: {
        x: 0,
        y: -60
      },
      zIndex: 2,
    },

    {
      anchor: {
        x: 0.5,
        y: 0.5
      },
      font: {
        primary: {
          color: '#bb99cc',
          family: 'Permanent Marker',
          shadow: {
            blur: 4,
            color: '#000',
            offset: {
              x: 2,
              y: 2
            },
          },
          size: 24,
          style: {
            bold: false,
            italic: false,
            underline: false
          },
        },
        secondary: {
          color: '#99ccbb',
          family: 'Luckiest Guy',
          shadow: {
            blur: 10,
            color: '#000',
            offset: {
              x: 2,
              y: 4
            },
          },
          size: 64,
          style: {
            bold: true,
            italic: false,
            underline: false
          },
        }
      },
      layerType: 'text',
      name: 'Little Text',
      rotate: -3,
      text: 'Now with {{99%}} More {{Canvas!!!}}',
      translate: {
        x: 0,
        y: 75
      },
      zIndex: 1,
    }
  ]
}
