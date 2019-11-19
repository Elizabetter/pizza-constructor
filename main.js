'use strict';

(function () {
    const config = {
        cost: 4,
        calories: 150,
        weight: 300,
        selectedTopping: 0,
        topping: []
    };

    toppings.forEach(topping => {
        let pizzaTopping = document.createElement("div");


        for (const k in topping) {
            pizzaTopping.setAttribute(`data-${k}`, topping[k])
            pizzaTopping.setAttribute(`type`, 'button')
            pizzaTopping.setAttribute(`class`, "btn btn-dark")
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

    function processConfig(cost, calories, weight, id, operation) {
        const costAttr = +event.path[1].getAttribute(cost);
        const caloriesAttr = +event.path[1].getAttribute(calories);
        const weightAttr = +event.path[1].getAttribute(weight);
        const idAttr = event.path[1].getAttribute(id);
        if (operation === 'plus') {
            config.cost += costAttr;
            config.calories += caloriesAttr;
            config.weight += weightAttr;
            config.topping.push(idAttr);
        }
        if (operation === 'minus') {
            config.cost -= costAttr;
            config.calories -= caloriesAttr;
            config.weight -= weightAttr;
            const index = config.topping.indexOf(idAttr);
            if(index > -1) {
                config.topping.splice(index, 1)
            }
        }
    }

    function processToppings(event) {
        if (config.topping.length && !config.topping.includes(event.path[1].getAttribute('data-id'))) {
            processConfig('data-cost', 'data-calories', 'data-weight', 'data-id', 'plus');
        } else if (config.topping.includes(event.path[1].getAttribute('data-id'))) {
            processConfig('data-cost', 'data-calories', 'data-weight', 'data-id', 'minus');
        }
        else if (!config.topping.length) {
            processConfig('data-cost', 'data-calories', 'data-weight', 'data-id', 'plus')
        }
    }

    function createDomElements(event) {
        let pizza = document.getElementById('pizzaTopping');

        let pizzaToppingView = document.createElement("img");
        pizza.append(pizzaToppingView);


        toppings.forEach(topping => {
            let price = document.createElement("div");
            pizzaToppingView.append(price);
            price.innerHTML = topping["cost"];
            pizzaToppingView.append(price);
        });


        let pathImg;
        let productName = event.path[1].getAttribute('data-name');

        if (productName === null) {
            return
        } else {
            pathImg = `./assets/images/${productName}.svg`;
            pizzaToppingView.setAttribute('src', pathImg);
            pizzaToppingView.setAttribute('class', 'pizza-toppings')
        }


        // pizzaToppingView.style.position = 'absolute';
        // pizzaToppingView.style.position = 'absolute';
        // pizzaToppingView.style.justifyContent = 'center';

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
        processToppings(event);
        createDomElements(event);
    });
}());




