    "use strict";
let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

function getTotal(){
    if (price.value != '') {
        let result = +price.value + +ads.value + +taxes.value - +discount.value;
        total.innerHTML = result;
        total.style.background = '#001b48';
    }
    else {
        total.innerHTML = '0.00';
        total.style.background = '#02457a'
    }
}
let datacreate ;
if (localStorage.product != null) {
    datacreate = JSON.parse(localStorage.product)
}
else {
    datacreate = [];
}

submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        ads:ads.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != '' && category.value != '' && newpro.count < 121)
    if(mood === 'create'){
        if(newpro.count > 1){
            for(let i = 0; i < newpro.count;i++ ){
                datacreate.push(newpro);
            }
        }
        else{
            datacreate.push(newpro);
        }
        cleardata() 
    }
    else{
        datacreate[tmp] = newpro;
        mood = 'create';
        submit.innerHTML= 'create';
    }

    localStorage.setItem('product' , JSON.stringify(datacreate))
    showdata()
    total.style.background = '#02457a';
}
function cleardata(){
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '0.00';
}
function showdata(){
    let table = '';
    for (let i = 0; i < datacreate.length;i++) {
        table +=
    `<tr>
        <td>${i + 1}</td>
        <td>${datacreate[i].title}</td>
        <td>${datacreate[i].price}</td>
        <td>${datacreate[i].taxes}</td>
        <td>${datacreate[i].ads}</td>
        <td>${datacreate[i].discount}</td>
        <td>${datacreate[i].total}</td>
        <td>${datacreate[i].category}</td>
        <td><button onclick="updated(${i})" id="update">Update</button></td>
        <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
    </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
}
showdata()

function deletedata(i)
{
    datacreate.splice(i,1);
    localStorage.product =JSON.stringify(datacreate);
    showdata()
}

function deleteall(){
    localStorage.clear();
    datacreate.splice(0);
    showdata();
}
function updated(i){
    title.value = datacreate[i].title;
    price.value = datacreate[i].price;
    taxes.value = datacreate[i].taxes;
    ads.value = datacreate[i].ads;
    discount.value = datacreate[i].discount;
    total.innerHTML = datacreate[i].total;
    category.value = datacreate[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    });
}
let searchmood = 'title';
function getsearchmood(id){
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchmood = 'title';
        search.placeholder = 'Search By Title'
    }
    else {
        searchmood = 'category';
        search.placeholder = 'Search By Category'
    }
    search.focus();
    search.value ='';
    showdata();
}
function searchdata(value){
    let table = '';
    if(searchmood == 'title') {
        for (let i = 0; i < datacreate.length;i++){
            if(datacreate[i].title.includes(value.toLowerCase())){
                table +=
                `<tr>
                    <td>${i + 1}</td>
                    <td>${datacreate[i].title}</td>
                    <td>${datacreate[i].price}</td>
                    <td>${datacreate[i].taxes}</td>
                    <td>${datacreate[i].ads}</td>
                    <td>${datacreate[i].discount}</td>
                    <td>${datacreate[i].total}</td>
                    <td>${datacreate[i].category}</td>
                    <td><button onclick="updated(${i})" id="update">Update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
                </tr>`;
            
            }
        }
    }
    else {
        for (let i = 0; i < datacreate.length;i++){
            if(datacreate[i].category.includes(value.toLowerCase())){
                table +=
                `<tr>
                    <td>${i + 1}</td>
                    <td>${datacreate[i].title}</td>
                    <td>${datacreate[i].price}</td>
                    <td>${datacreate[i].taxes}</td>
                    <td>${datacreate[i].ads}</td>
                    <td>${datacreate[i].discount}</td>
                    <td>${datacreate[i].total}</td>
                    <td>${datacreate[i].category}</td>
                    <td><button onclick="updated(${i})" id="update">Update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
                </tr>`;
            
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
