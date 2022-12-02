const socket = io()
const username = prompt('Имя пользователя')
const chat = document.querySelector('.chat')
const input = document.getElementById('message')



document.getElementById('name').innerHTML = username
let form = document.querySelector('form')
form.onsubmit = (e) => {
    e.preventDefault()

    socket.emit('send_msg', {
        name: username,
        body: input.value
    })
    input.value = ''
}
socket.on('new_msg', obj => {
    const li = document.createElement('li')
    li.innerHTML = `
                    <div class="name">
                        ${obj.name}
                    </div>
                    <div class="text">${obj.body}</div>
    `;
    chat.appendChild(li)
})