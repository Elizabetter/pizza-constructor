'use strict';

(function() {
    toppings.forEach(topping => {
        let pizzaTopping = document.createElement("div");
        for(const k in topping) {
            pizzaTopping.setAttribute(`data-${k}`, topping[k])
        }

        let pizzaImg = document.createElement("img");
        pizzaImg.setAttribute('src', topping["path"]);
        console.log(pizzaTopping);

        let parent = document.getElementById('choice');
        let filling = parent.append(pizzaTopping);
        pizzaTopping.append(pizzaImg);
    });

    parent.addEventListener( 'click',function(event){
        config.cost += +event.path[1].getAttribute('data-cost');
        config.calories += +event.path[1].getAttribute('data-calories');
        config.weight += +event.path[1].getAttribute('data-weight');

            let pizza = document.getElementById('pizzaTopping');

            let pizzaToppingView = document.createElement("img");
            pizza.append(pizzaToppingView);

            let productName = event.path[1].getAttribute('data-name');
            let pathImg = `./assets/images/${productName}.svg`;
            pizzaToppingView.setAttribute('src', pathImg);
            pizzaToppingView.style.position = 'absolute';
            pizzaToppingView.style.justifyContent = 'center';

        for(const k in config){
            let listField1 = document.getElementById('cost');
            let listField2 = document.getElementById('calories');
            let listField3 = document.getElementById('weight');
            switch (k) {
                case 'cost':
                    listField1.innerText = config.cost.toFixed(2);
                    break;
                case 'calories':
                    listField2.innerText = config.calories;
                    break;
                case 'weight':
                    listField3.innerText = config.weight;
                    break;
            }
        }
    });



    let config = {
        cost : 4,
        calories: 150,
        weight: 300,
        selectedTopping: 0
    };
}());




