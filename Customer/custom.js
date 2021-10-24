//fetch data from input
let task = document.querySelector('#task')
const heads = [
    { inForm: "Customname"},
    { inForm: "balance"}
]

//put at local storage

saveDataToLocalStorage = (data) =>{
    localStorage.setItem('dataDetails', JSON.stringify(data))

}

getDataFromStorage = () =>{
    let dataDetails
    try{
        dataDetails = JSON.parse(localStorage.getItem('dataDetails'))
        if (!Array.isArray(dataDetails)) throw new Error()
    }
    catch(e){

        dataDetails=[]
    }
    return dataDetails; 
}
 

const dataDetails = getDataFromStorage()
//redirect to index page

if(task){
    task.addEventListener('submit', function(e){
        e.preventDefault()
        let task={}
        heads.forEach(h => task[h.inForm] = this.elements[h.inForm].value)
        dataDetails.push(task)
        saveDataToLocalStorage(dataDetails)
        this.reset()
        window.location.replace("index.html")
    })
}

const forms = (btn,from,dataDetails)=>{
    btn.addEventListener('click', function(e){
        form.classList.remove('d-none')
        form.elements.Customname.value = dataDetails.Customname
        form.elements.balance.value = dataDetails.balance
        
        console.log(dataDetails.balance)
        console.log(form.elements.balance.value)
        localStorage.setItem('editIndex', i)
    })
}

const createMyOwnElements = (element, parent, txt = "", classes = "", attributes = "") => {
    let el = document.createElement(element)
    parent.appendChild(el)
    if (txt != '') el.textContent = txt
    if (classes != "") el.classList = classes
    return el
}
//let table = document.querySelector('table')
editForm=document.querySelector('#editForm')
let addedBalance=0;
const drawTable = (dataDetails) => {
    table.textContent=""
    let thead = createMyOwnElements('thead', table)
    createMyOwnElements('th', thead, '#')
    heads.forEach(h => createMyOwnElements("th", thead, h.inForm))
    createMyOwnElements('th', thead, 'actions')
    let tbody = createMyOwnElements('tbody', table)
    if (dataDetails.length == 0) {
        let tr = createMyOwnElements('tr', tbody)
        let td = createMyOwnElements('td', tr, "no data")
        td.colSpan = "3"
    }
    else {
        dataDetails.forEach((task, i) => {
            let tr = createMyOwnElements('tr', tbody)
            createMyOwnElements('td', tr, i+1)
            heads.forEach((h, i) => createMyOwnElements('td', tr, task[h.inForm]))
            let td = createMyOwnElements('td', tr)
            let delbtn = createMyOwnElements('button', td, "delete", "btn btn-danger mx-3")
            delbtn.addEventListener('click',  function() { deleteItem(i) } )
            let editBtn = createMyOwnElements('button', td, "add", "btn btn-warning mx-3")
            editBtn.addEventListener('click', function(e){
                editForm.classList.remove('d-none')
                editForm.elements.Customname.value = dataDetails[i].Customname
                editForm.elements.balance.value = dataDetails[i].balance
                
                console.log(dataDetails[i].balance)
                console.log(editForm.elements.balance.value)
                localStorage.setItem('editIndex', i)
            })
            
            let withdrawBtn = createMyOwnElements('button', td, "withdraw", "btn btn-warning")
            withdrawBtn.addEventListener('click', function(e){
                withDrawForm.classList.remove('d-none')
                withDrawForm.elements.Customname.value = dataDetails[i].Customname
                withDrawForm.elements.balance.value = ""
                
                console.log(dataDetails[i].balance)
                console.log(editForm.elements.balance.value)
                localStorage.setItem('editIndex', i)
            })
            
        })
    }
}

editForm.addEventListener('submit', function(e){
    e.preventDefault()
    let i = localStorage.getItem('editIndex')
    let addedBalance = parseInt(editForm.elements.balance.value) -parseInt(dataDetails[i].balance) 
    console.log(addedBalance)
    if(addedBalance<1000){
        let task = {
            Customname: editForm.elements.Customname.value,
            balance : editForm.elements.balance.value
        }
        dataDetails[i]=task
    saveDataToLocalStorage(dataDetails)
    editForm.classList.add('d-none')
    drawTable(dataDetails)
    
    }else{
        window.alert("Allowed Added Balance Excesseded")
    }
    editForm.classList.add('d-none')
})

withDrawForm.addEventListener('submit', function(e){
    e.preventDefault()
    let i = localStorage.getItem('editIndex')
    if(parseInt(withDrawForm.elements.balance.value)<parseInt(dataDetails[i].balance)){
        let task = {
            Customname: withDrawForm.elements.Customname.value,
            balance : parseInt(dataDetails[i].balance)-parseInt(withDrawForm.elements.balance.value)
        }
        dataDetails[i]=task
    saveDataToLocalStorage(dataDetails)
    
    
    }else{
        window.alert("Not Enough in account")
    }
    withDrawForm.classList.add('d-none')
    drawTable(dataDetails)
})

const deleteItem=(index)=>{
    dataDetails.splice(index,1)
    saveDataToLocalStorage(dataDetails)
    drawTable(dataDetails)
}

const table = document.querySelector('#tableData')
if(table){
    drawTable(dataDetails)
}






