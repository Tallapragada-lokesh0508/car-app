<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Car Marketplace</title>

<style>
body { font-family: Arial; margin:0; background:#f5f5f5; }
.header { background:#222; color:white; padding:15px; text-align:center; }
.card {
  background:white; margin:10px; padding:15px;
  border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.1);
}
.btn {
  background:#007bff; color:white;
  padding:8px 12px; border:none;
  border-radius:6px; margin:5px; cursor:pointer;
}
input, select { padding:8px; margin:5px; width:90%; }
</style>

</head>
<body>

<div class="header">
<h2>🚗 Car Marketplace</h2>
</div>

<!-- SEARCH + FILTER -->
<div class="card">
<input id="search" placeholder="Search car...">
<select id="fuel">
<option value="">Fuel</option>
<option>Petrol</option>
<option>Diesel</option>
<option>Electric</option>
</select>
<button class="btn" onclick="filterCars()">Search</button>
</div>

<!-- CAR LIST -->
<div id="cars"></div>

<!-- BOOKING LIST -->
<div class="card">
<h3>📅 My Bookings</h3>
<div id="bookings"></div>
</div>

<script>

// CAR DATA
const cars = [
{
  name:"Tata Nexon EV",
  brand:"Tata",
  year:2024,
  type:"Electric",
  price:1500000,
  gst:28,
  discount:5,
  range:"465 km",
  battery:"40 kWh",
  transmission:"Automatic",
  image:"https://images.unsplash.com/photo-1619767886558-efdc259cde1a"
},
{
  name:"Hyundai Creta",
  brand:"Hyundai",
  year:2023,
  type:"Petrol",
  price:1250000,
  gst:28,
  discount:4,
  mileage:"17 km/l",
  engine:"1.5L",
  transmission:"Manual",
  image:"https://images.unsplash.com/photo-1603386329225-868f9b1ee6b3"
},
{
  name:"Tesla Model 3",
  brand:"Tesla",
  year:2025,
  type:"Electric",
  price:4500000,
  gst:28,
  discount:3,
  range:"500 km",
  battery:"60 kWh",
  transmission:"Automatic",
  image:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d"
}
];

// BOOKINGS STORAGE
let bookings = [];

// SHOW CARS
function showCars(list){
let html = "";

list.forEach((c,i)=>{

let finalPrice = c.price + (c.price*c.gst/100) - (c.price*c.discount/100);

html += `
<div class="card">
<img src="${c.image}" width="100%">
<h3>${c.name}</h3>
<p>${c.brand} • ${c.year}</p>
<p>₹${c.price} • ${c.type}</p>

<button class="btn" onclick="viewDetails(${i})">Details</button>
<button class="btn" onclick="book(${i})">Book Test Drive</button>
</div>
`;
});

document.getElementById("cars").innerHTML = html;
}

// FILTER
function filterCars(){
let search = document.getElementById("search").value.toLowerCase();
let fuel = document.getElementById("fuel").value;

let filtered = cars.filter(c =>
  c.name.toLowerCase().includes(search) &&
  (!fuel || c.type === fuel)
);

showCars(filtered);
}

// DETAILS
function viewDetails(i){
let c = cars[i];

let finalPrice = c.price + (c.price*c.gst/100) - (c.price*c.discount/100);

alert(
`Car: ${c.name}

Brand: ${c.brand}
Year: ${c.year}

Price: ₹${c.price}
GST: ${c.gst}%
Discount: ${c.discount}%
Final Price: ₹${finalPrice}

Mileage/Range: ${c.mileage || c.range}
Engine/Battery: ${c.engine || c.battery}
Transmission: ${c.transmission}`
);
}

// BOOKING
function book(i){
let location = prompt("Enter location:");
let showroom = prompt("Enter showroom:");
let date = prompt("Enter date:");
let time = prompt("Enter time:");

let booking = {
car: cars[i].name,
location,
showroom,
date,
time
};

bookings.push(booking);
showBookings();

alert("Booking Confirmed!");
}

// SHOW BOOKINGS
function showBookings(){
let html = "";

bookings.forEach((b,index)=>{
html += `
<div class="card">
<p>${b.car}</p>
<p>${b.showroom}</p>
<p>${b.date} ${b.time}</p>
<button class="btn" onclick="cancel(${index})">Cancel</button>
</div>
`;
});

document.getElementById("bookings").innerHTML = html;
}

// CANCEL
function cancel(i){
bookings.splice(i,1);
showBookings();
}

// INIT
showCars(cars);

</script>

</body>
</html>
