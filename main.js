toppings.forEach(topping => {
   let pizzaTopping = document.createElement("div");
   for(const k in topping) {
       pizzaTopping.setAttribute(k, topping[k])
   }

    let pizzaImg = document.createElement("img");
    pizzaImg.setAttribute('src', topping["path"]);

    let parent = document.getElementById('choice');
    let filling = parent.append(pizzaTopping);
    pizzaTopping.append(pizzaImg);



    console.log(parent.childNodes);
    //
    filling.addEventListener('click', function (e){console.log(e.target)} )
});




//
// console.log( toppings.find({ id: 1 }));
//
//
//
// function count(el) {
//     // let cost = document.getElementById("cost");
//     // let plus_cost = document.getElementById("plusCost");
//     // cost.innerHTML = +cost.innerHTML + +plus_cost.innerHTML;
//     // let id = get
//     alert(el.id);
//     let elementId = +el.id;
//     console.log( toppings.find({ id: 1 }));
//     console.log( toppings.find({ id: elementId }));
// }





// function f(el) {
//     alert("hello");
//     alert(el.id);
// }
