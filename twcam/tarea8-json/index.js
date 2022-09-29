const urlProductos = "http://localhost:3000/";

window.onload = function () {
  fetchProductos();
};

const fetchProductos = () => {
  fetch(urlProductos + "productos")
    .then((res) => res.json())
    .then((productos) => mostrarProductos(productos));
};

const mostrarProductos = (productos) => document.getElementById("rowProductos").innerHTML = productos.reduce( (prev, curr) => prev + generarProducto(curr), "");

const generarProducto = (producto) => {
  const {id, nombre, precio, imagen } = producto;

  return `
  <div class="col-lg-3">
    <article
      id="${id}"
      class="d-flex flex-column justify-content-center align-items-center"
    >
      <img src="${imagen}" alt="imagen-${id}" />
      <p class="mt-2 nombreProducto">${nombre}</p>
      <p class="precioProducto">${precio}</p>
      <input
        type="number"
        class="form-control inputCantidad"
        placeholder="Cantidad"
        value="1"
      />
      <button
        type="button"
        class="btn btn-primary botonComprar mt-2"
        onclick="comprar(this.parentElement)"
      >
        Comprar
      </button>
    </article>
  </div>`;
};

const activar = (option) => {
  document
    .querySelectorAll(".nav-item .nav-link")
    .forEach((nl) => nl.classList.remove("active"));
  option.classList.add("active");
};

let carrito = {};
const comprar = (producto) => {
  const id = producto.getAttribute("id");
  const nombre = producto.querySelector(".nombreProducto").innerHTML;
  const precio = Number(producto.querySelector(".precioProducto").innerHTML);
  const cantidad = Number(producto.querySelector(".inputCantidad").value);

  if (isNaN(cantidad) || cantidad < 1) return;

  if (carrito[id]) {
    carrito[id].cantidad += cantidad;
  } else {
    carrito[id] = {
      nombre,
      precio,
      cantidad,
    };
  }

  actualizarCarrito();
  actualizarResumen();
};

const actualizarCarrito = () => {
  const lista = document.getElementById("productos");
  lista.innerHTML = "";

  Object.keys(carrito).forEach((producto) => {
    lista.innerHTML += crearElemento(carrito[producto], producto);
  });
};

const crearElemento = (item, index) => {
  const { nombre, precio, cantidad } = item;
  return `<li id="carrito-${index}">
    <div class="form-inline">
      <div>${nombre} - ${cantidad} - ${precio} <a href="#" onclick="borrar(\'${index}\')">&nbsp;x</a></div>
    </div>
  </li>`;
};

const actualizarResumen = () => {
  const productKeys = Object.keys(carrito);

  const cantidad = productKeys.reduce(
    (prev, curr) => prev + carrito[curr].cantidad,
    0
  );

  const total = productKeys.reduce(
    (prev, curr) => prev + carrito[curr].precio * carrito[curr].cantidad,
    0
  );

  document.getElementById(
    "resumen"
  ).innerHTML = `Productos ${cantidad} | Precio ${total}€`;
};

const borrar = (id) => {
  if (carrito[id]) delete carrito[id];

  actualizarCarrito();
  actualizarResumen();
};
