
const wForm=document.querySelector('form')
const sElement=document.querySelector('input')
const message1=document.querySelector('#m1')
const message2=document.querySelector('#m2')


wForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=sElement.value
    message1.textContent='Loading...'
    message2.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        message1.textContent=data.error
        else{
            message2.textContent=data.forecast
            message1.textContent=data.location
        }
    })

})
})