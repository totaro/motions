import stocks from "/js/stocks.json" assert { type: "json" };

let stock = "<ul>";
stocks.map(
  (item) =>
    (stock += `<li class="${item.label}"><span class="company">${item.company}</span><span class="price">${item.price}</span><span class="change">${item.change}</span></li>`)
);
stock += "</ul><ul aria-hidden='true'>";
stocks.map(
  (item) =>
    (stock += `<li class="${item.label}"><span class="company">${item.company}</span><span class="price">${item.price}</span><span class="change">${item.change}</span></li>`)
);

stock += "</ul>";

document.getElementById("stockdata").innerHTML = stock;