let rainCount = 500

GameObjects.rain = []

for (let i = 0; i < rainCount; i++) {
  console.log('creating')

  GameObjects.rain[i] = new GameObject(
    getRandomInt(0, width),
    getRandomInt(-100, -500),
    30,
    3,
    '#006e99',
    `rain${i}`,
    'div',
    getRandomInt(1, 10)
  )

  document.getElementById('objects').appendChild(GameObjects.rain[i].element)
}

start()
