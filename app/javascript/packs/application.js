// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import "channels"

Rails.start()
Turbolinks.start()

const toggleCheckbox = (event) => {
    const link = event.currentTarget
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    event.preventDefault()
    console.log('clicked')
    const url = event.currentTarget.href + '.json'
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
        },
        method: "POST"
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.completed) {
                link.innerHTML = "<i class='fa-solid fa-square-check checkbox'></i>"
            } else {
                link.innerHTML = "<i class='fa-solid fa-square checkbox'></i>"
            }
        })
}

document.addEventListener('turbolinks:load', (e) => {
    const checkboxes = document.querySelectorAll('#checkbox')
    console.log(checkboxes)
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', toggleCheckbox)
    })
})