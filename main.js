'use strict';

(function () {
    let pizza = document.getElementById('pizzaTopping');

    const config = {
        cost: 4,
        calories: 150,
        weight: 300,
        selectedTopping: 0,
        topping: []
    };

    function processConfig(cost, calories, weight, id, operation, e) {
        let pizzaToppingView = document.createElement("img");
        pizza.append(pizzaToppingView);

        const costAttr = +e.path[1].getAttribute(cost);
        const caloriesAttr = +e.path[1].getAttribute(calories);
        const weightAttr = +e.path[1].getAttribute(weight);
        const idAttr = e.path[1].getAttribute(id);
        if (operation === 'plus') {

            let productName = e.path[1].getAttribute('data-name');
            let productId = e.path[1].getAttribute('data-id');

            let pathImg = `./assets/images/${productName}.svg`;
            pizzaToppingView.setAttribute('src', pathImg);
            pizzaToppingView.setAttribute('class', 'pizza-toppings');
            pizzaToppingView.setAttribute('data-id', productId);

            config.cost += costAttr;
            config.calories += caloriesAttr;
            config.weight += weightAttr;
            config.topping.push(idAttr);

            toppings.forEach(topping => {
                let price = document.createElement("div");
                pizzaToppingView.append(price);
                price.innerHTML = topping["cost"];
                pizzaToppingView.append(price);
            });
        }
        if (operation === 'minus') {
            if (config.topping.includes(idAttr)) {
                for (const i in pizza.children) {
                    if (pizza.children[i].attributes && idAttr === pizza.children[i].getAttribute('data-id')) {
                        pizza.removeChild(pizza.children[i])
                    }
                }
            }
            config.cost -= costAttr;
            config.calories -= caloriesAttr;
            config.weight -= weightAttr;
            const index = config.topping.indexOf(idAttr);
            if(index > -1) {
                config.topping.splice(index, 1)
            }
        }
    }

    toppings.forEach(topping => {
        let pizzaTopping = document.createElement("div");

        for (const k in topping) {
            pizzaTopping.setAttribute(`data-${k}`, topping[k]);
            pizzaTopping.setAttribute(`type`, 'button');
            pizzaTopping.setAttribute(`class`, "btn btn-dark");
        }

        let pizzaImg = document.createElement("img");
        pizzaImg.setAttribute('src', topping["path"]);

        let price = document.createElement("div");
        price.innerHTML = topping["cost"] + " бел. руб";
        pizzaTopping.append(price);

        let parent = document.getElementById('choice');
        parent.append(pizzaTopping);
        pizzaTopping.append(pizzaImg);
    });



    function processToppings(event) {
        if (config.topping.length && !config.topping.includes(event.path[1].getAttribute('data-id'))) {
            processConfig('data-cost', 'data-calories', 'data-weight', 'data-id', 'plus', event);
        } else if (config.topping.includes(event.path[1].getAttribute('data-id'))) {
            processConfig('data-cost', 'data-calories', 'data-weight', 'data-id', 'minus', event);
        }
        else if (!config.topping.length) {
            processConfig('data-cost', 'data-calories', 'data-weight', 'data-id', 'plus', event)
        }
    }

    function createDomElements(event) {
        let productName = event.path[1].getAttribute('data-name');

        if (productName === null) {
            return
        } else {
            processToppings(event)

        }

        for (const k in config) {
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
    }

    parent.addEventListener('click', function (event) {
        createDomElements(event);
    });
}());
