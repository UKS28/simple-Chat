const socket = io();
const textarea=document.querySelector('#textarea');
const message__area=document.querySelector('.message__area');

let client_name="";
do{
    client_name=prompt("enter your name");
}while(!client_name);

function appendMessage(mssg,type)
{
    const div=document.createElement('div');
    div.classList.add(type, 'message');

    let markup = `
    <h4>${mssg.name}</h4>
    <p>${mssg.message}</p>
`
    div.innerHTML=markup;
    message__area.appendChild(div);
    scrollTobottom();
}

function sendMessage(mssg)
{
    socket.emit("message",mssg);
}

// receive message
socket.on('message',(mssg)=>{
    appendMessage(mssg,"incoming");
    scrollTobottom();
})

function scrollTobottom(){
    message__area.scrollTop = message__area.scrollHeight;
}

textarea.addEventListener('keyup',(ev)=>{
    if(ev.key==="Enter")
    {
        let mssg=ev.target.value;
        // console.log(mssg);
        let message={
            "name":client_name,
            "message":mssg.trim()
        }
        textarea.value="";
        appendMessage(message,"outgoing");
        sendMessage(message);
    }
 
})
