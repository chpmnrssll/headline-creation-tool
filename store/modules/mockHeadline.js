export default {
  name: 'Mock-up Headline',
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
          family: 'Staatliches:400',
          lineHeight: 48,
          shadow: {
            blur: 12,
            color: '#000',
            offset: {
              x: 2,
              y: 4
            },
          },
          size: 64,
          style: {
            bold: true,
            italic: true,
            underline: false
          },
        },
        secondary: {
          color: '#ffdc45',
          family: 'Arvo:400,400i,700,700i',
          lineHeight: 48,
          shadow: {
            blur: 12,
            color: '#000',
            offset: {
              x: 2,
              y: 4
            },
          },
          size: 64,
          style: {
            bold: true,
            italic: true,
            underline: false
          },
        }
      },
      layerType: 'text',
      name: 'Big Text',
      rotate: 0,
      text: 'Headline Creation Tool',
      translate: {
        x: 0,
        y: -60
      },
      zIndex: 1,
    },

    {
      anchor: {
        x: 0.5,
        y: 0.5
      },
      font: {
        primary: {
          color: '#ff4f28',
          family: 'Staatliches:400',
          lineHeight: 18,
          shadow: {
            blur: 2,
            color: '#000',
            offset: {
              x: 1,
              y: 2
            },
          },
          size: 18,
          style: {
            bold: false,
            italic: true,
            underline: false
          },
        },
        secondary: {
          color: '#ffdc45',
          family: 'Arvo:400,400i,700,700i',
          lineHeight: 32,
          shadow: {
            blur: 12,
            color: '#000',
            offset: {
              x: 2,
              y: 4
            },
          },
          size: 32,
          style: {
            bold: true,
            italic: true,
            underline: false
          },
        }
      },
      layerType: 'text',
      name: 'New Layer',
      rotate: 0,
      text: 'New & Improved',
      translate: {
        x: 220,
        y: -30
      },
      zIndex: 3,
    },



    {
      anchor: {
        x: 0.5,
        y: 0.5
      },
      font: {
        primary: {
          color: '#bb99cc',
          family: 'Permanent+Marker:400',
          lineHeight: 24,
          shadow: {
            blur: 2,
            color: '#000',
            offset: {
              x: 1,
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
          family: 'Luckiest+Guy:400',
          lineHeight: 24,
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
      text: 'Now with {{99%}} More Canvas!\nPlus multi-line support!',
      translate: {
        x: 0,
        y: 75
      },
      zIndex: 2,
    }
  ]
}
