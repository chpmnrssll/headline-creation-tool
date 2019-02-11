export default {
  name: 'Mock-up Headline',
  layers: [{
      anchor: {
        x: 0.5,
        y: 0.5
      },
      image: 'https://picsum.photos/640/320/?random',
      layerType: 'image',
      name: 'Random Image',
      rotation: 2.5,
      scale: {
        x: 1,
        y: 1
      },
      translate: {
        x: 0,
        y: 0
      },
      zIndex: 0,
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
          shadow: {
            blur: 2,
            color: '#271f2a',
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
          family: 'Luckiest+Guy:400',
          shadow: {
            blur: 4,
            color: '#3a4d47',
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
      name: 'Sub Heading',
      rotation: 357,
      text: 'Now with {{99%}} More Canvas!\nPlus multi-line support!',
      translate: {
        x: 0,
        y: 60
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
          color: '#ffdc45',
          family: 'Staatliches:400',
          shadow: {
            blur: 8,
            color: '#5a5000',
            offset: {
              x: 3,
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
          shadow: {
            blur: 12,
            color: '#000',
            offset: {
              x: 2,
              y: 4
            },
          },
          size: 1,
          style: {
            bold: false,
            italic: false,
            underline: false
          },
        }
      },
      layerType: 'text',
      name: 'Headline Text',
      rotation: 0,
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
          color: '#ff4f28',
          family: 'Staatliches:400',
          shadow: {
            blur: 2,
            color: '#642314',
            offset: {
              x: 2,
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
          shadow: {
            blur: 12,
            color: '#000',
            offset: {
              x: 2,
              y: 4
            },
          },
          size: 1,
          style: {
            bold: false,
            italic: false,
            underline: false
          },
        }
      },
      layerType: 'text',
      name: 'New Tag',
      rotation: 0,
      text: 'New & Improved',
      translate: {
        x: 220,
        y: -24
      },
      zIndex: 3,
    },
  ]
}
