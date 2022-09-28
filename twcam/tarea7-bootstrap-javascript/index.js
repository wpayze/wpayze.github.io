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
