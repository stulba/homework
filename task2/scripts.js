const btn1 = document.querySelector('.js-get')
const btn2 = document.querySelector('.js-show-image')
const btn3 = document.querySelector('.js-create-human')

// Go to Google
btn1.onclick = function() {
  window.location = 'https://www.google.com/'
}

// Show image
btn2.onclick = function() {
  document.write('<img src="./image.jpg" alt="Red cat" />')
}

// Create and visualise Human object
btn3.onclick = function() {
  const human = {
    firstname: 'Siarhei',
    lastname: 'Stulba',
    email: 'placeholder@mail.com',
    age: 13,
    married: false,
  }

  const list = document.createElement('ul')

  for (let key in human) {
    const value = human[key]
    const listItem = document.createElement('li')

    listItem.textContent = `${key}: ${value}`
    list.appendChild(listItem)

    console.log(`${key}: ${value} `)
  }

  document.body.appendChild(list)
}