const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


let state = {}

function startGame() {
  state = {}
  showTextNode(1)

}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'There is a shadow lurking amongst the trees covered by an apocolypse of mist. Beneath you is a glowing orb.',
    options: [
      {
        text: 'Pick up the glowing orb',
        setState: { GlowingOrb: true },
        nextText: 2
      },
      {
        text: 'Leave the glowing orb where it is',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You carefully walk forward disapearing into the mist in search of answers to where you are when you come across a rusty gun and shield made from tin on the ground.',
    options: [
      {
        text: 'Drop the glowing orb for a gun',
        requiredState: (currentState) => currentState.GlowingOrb,
        setState: { GlowingOrb: false, sword: true },
        nextText: 3
      },
      {
        text: 'Drop the glowing orb for a shield',
        requiredState: (currentState) => currentState.GlowingOrb,
        setState: { GlowingOrb: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the gun',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'You look up. After seeing the shadow move you get spooked .',
    options: [
      {
        text: 'Hide behind nearest tree',
        nextText: 4
      },
      {
        text: 'Turn around and sprint through the mist away from the shadow',
        nextText: 5
      },
      {
        text: 'Approach the Shadow',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Silence apart from the howling of the wind, shivering, scared you wait curled up in a ball. Nothing is in sight. A monstor rips through your flesh eating your enternals with razor blade teeth. ',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'As you are sprinting your legs wrap around a fallen tree and your heart drops, blackness, forever you are falling through a void of nothing',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'As you advance on the shadow it becomes clearer, taller this is a strange creature .',
    options: [
      {
        text: 'Investigate',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While investigating the creatrue turns around.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Shoot it with your gun',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind a boulder covering yourself with a shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the glowing orb at it',
        requiredState: (currentState) => currentState.GlowingOrb,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'You foolishly run thinking you will get way, as you run further in the woods you stop. The shadow is there towering over you',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You get behind the creature and shoot it right in the back of its slimy head, slowy it turns, the smile with teeth like daggers invades its face. The creatrue laughs opening a infected mouth and shreads your face to pieces, eating your flesh like popcorn.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The creature laughed as you hid behind you a boulder and rolled the boulder over your small human body, squishing you like a pancake.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw the glowing orb at the creature and it squiled in ageny, churning with pain. The creature starts dissoliving until there was no more. Seeing your victory you decide to fall asleep in a strange hut in the woods.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()
