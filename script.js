let menu = [
  { id: 1, name: "Burger", price: 200, stock: 10 },
  { id: 2, name: "Pizza", price: 500, stock: 5 },
  { id: 3, name: "Fries", price: 150, stock: 20 }
];

// SHOW MENU
let menuDiv = document.getElementById("menu");

function showMenu() {
  menuDiv.innerHTML = "";

  menu.forEach(m => {
    menuDiv.innerHTML += `
      <div class="card">
        <h3>${m.name}</h3>
        <p>Price: ${m.price}</p>
        <p>Stock: ${m.stock}</p>
      </div>
    `;
  });
}

// FILL DROPDOWN
let select = document.getElementById("itemSelect");

menu.forEach(m => {
  select.innerHTML += `<option value="${m.id}">${m.name}</option>`;
});

// PLACE ORDER
function placeOrder() {
  let customer = document.getElementById("customer").value;
  let itemId = select.value;
  let qty = document.getElementById("qty").value;

  let item = menu.find(m => m.id == itemId);

  if (!customer || !qty) {
    alert("Fill all fields");
    return;
  }

  if (item.stock < qty) {
    alert("Not enough stock!");
    return;
  }

  // reduce stock
  item.stock -= qty;

  let total = item.price * qty;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    customer,
    item: item.name,
    qty,
    total
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Order placed!");

  showOrders();
  showMenu();
}

// SHOW ORDERS
function showOrders() {
  let container = document.getElementById("orders");
  container.innerHTML = "";

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.forEach(o => {
    container.innerHTML += `
      <div class="card">
        <h3>${o.customer}</h3>
        <p>Item: ${o.item}</p>
        <p>Qty: ${o.qty}</p>
        <p>Total: ${o.total}</p>
      </div>
    `;
  });
}

// INIT
showMenu();
showOrders();