const init = () => {
  alert("1.1 Revise su consola!");

  console.log("1.2 Parametros de la ventana: ");
  console.log("outerWidth", window.outerWidth);
  console.log("outerHeight", window.outerHeight);
  console.log("innerWidth", window.innerWidth);
  console.log("screen width", window.screen.width);
  console.log("screen height", window.screen.height);
  console.log("|---------------------|");

  console.log(
    "1.3, Contenido anterior: ",
    document.getElementById("inicio").innerHTML
  );
  document.getElementById("inicio").innerHTML = "Ejemplo 6 - DOM";
  console.log(
    "1.3, Elemento completo nuevo: ",
    document.getElementById("inicio").outerHTML
  );
  console.log("|---------------------|");

  console.log(
    "1.4, Elementos article",
    document.getElementsByTagName("article")
  );
  console.log(
    "1.4,(Alternativa) mi forma preferida para llamar a todos los elementos",
    document.querySelectorAll("article")
  );
  console.log("|---------------------|");

  console.log("1.5 Información del documento: ");
  console.log("characterSet", document.characterSet);
  console.log("charset", document.charset);
  console.log("compatMode", document.compatMode);
  console.log("dir", document.dir);
  console.log("domain", document.domain);
  console.log("lastModified", document.lastModified);
  console.log("referrer", document.referrer);
  console.log("title", document.title);
  console.log("|---------------------|");

  console.log("1.6 Información del location: ");
  console.log("protocol", document.location.protocol);
  console.log("host", document.location.host);
  console.log("hostname", document.location.hostname);
  console.log("port", document.location.port);
  console.log("pathname", document.location.pathname);
  console.log("|---------------------|");
};

window.onload = function () {
    init();
}

//Checkboxes
const comprobar = (e) => {
  const min = 1;
  const max = 3;

  const checkboxesSeleccionados = document
    .getElementById("formulario_checkboxes")
    .querySelectorAll("input:checked[type='checkbox']").length;

  if (checkboxesSeleccionados >= 1 && checkboxesSeleccionados <= 3)
    document.getElementById("boton").removeAttribute("disabled");
  else document.getElementById("boton").setAttribute("disabled", "true");
};

//Listas
const selects = (tipo) => {
  const izq = document.getElementById("select_izq");
  const der = document.getElementById("select_der");

  const single = (salida, entrada) => {
    if (salida.selectedIndex === -1) return;

    const opcion = salida.options[salida.selectedIndex];
    entrada.innerHTML += `<option>${opcion.text}</option>`;
    opcion.remove();
  };

  const full = (salida, entrada) => {
    const opciones = salida.innerHTML;
    entrada.innerHTML += opciones;
    salida.innerHTML = "";
  };

  const funciones = {
    1: () => single(izq, der),
    2: () => full(izq, der),
    3: () => full(der, izq),
    4: () => single(der, izq),
  };

  funciones[tipo]();
};

//Campos Obligatorios
const comprobar_obligatorio = () => {
  document
    .getElementById("form_obl")
    .querySelectorAll(".obl")
    .forEach(
      (inp) =>
        (inp.style.border = inp.value.trim() === "" ? "red solid 1px" : "")
    );
};

//Resaltar
const resaltar2 = (palabra) => (palabra.style.fontWeight = "bold");
const desresaltar2 = (palabra) => (palabra.style.fontWeight = "normal");

//Cajas

const cajas = (comando, valor) => {
  const selector = {
    M: "margin",
    B: "borderWidth",
    P: "padding",
  };
  document.querySelector(".caja").style[selector[comando]] = `${valor}px`;
};

//Zebra Stripe Table
const cambiafila = (tipo, valor) => {
  document.querySelectorAll(".zebraStripe tr").forEach((tr, i) => {
    if (
      ((tipo === "par" && i % 2 === 0) || (tipo === "impar" && i % 2 !== 0)) &&
      i !== 0
    )
      tr.querySelectorAll("td").forEach((td) => (td.style.background = valor));
  });
};

//Añadir texto a la capa pegar
function addTexto() {
  const texto = document.getElementById("texto");
  texto.select();
  texto.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(texto.value);
  document.getElementById("copiado").style.display ="block";

  setTimeout( () => {
    document.getElementById("copiado").style.display ="none"
  }, 1500)
}