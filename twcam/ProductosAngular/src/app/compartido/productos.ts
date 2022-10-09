
import { Producto } from './producto';

export const PRODUCTOS: Producto[] = [
{
  id: 1,
  nombre: 'Producto 1',
  precio: 300,
  imagen: '/assets/images/movil1.jpg',
  comentarios: [
    {
      estrellas: 5,
      comentario: "Producto funciona perfectamente, envÌo perfecto",
      autor: "Juan GarcÌa",
      fecha: "2017-10-16T12:32:23.126094Z"
    },
    {
      estrellas: 4,
      comentario: "Producto correcto, envÌo con retraso",
      autor: "Emilio Fern·ndez",
      fecha: "2016-12-03T07:52:24.236094Z"
    }
  ]
},
{
  id: 2,
  nombre: 'Producto 2',
  precio: 400,
  imagen: '/assets/images/movil2.jpg',
  comentarios: [
    {
      estrellas: 4,
      comentario: "Producto funciona perfectamente, envÌo perfecto",
      autor: "Pedro GarcÌa",
      fecha: "2017-10-16T12:32:23.126094Z"
    },
    {
      estrellas: 3,
      comentario: "Producto correcto, envÌo con retraso",
      autor: "Lucas Fern·ndez",
      fecha: "2016-12-03T07:52:24.236094Z"
    }
  ]
},
{
  id: 3,
  nombre: 'Producto 3',
  precio: 500,
  imagen: '/assets/images/movil3.jpg',
  comentarios: [
    {
      estrellas: 5,
      comentario: "Producto funciona perfectamente, envÌo perfecto",
      autor: "Lara GarcÌa",
      fecha: "2017-10-16T12:32:23.126094Z"
    },
    {
      estrellas: 3,
      comentario: "Producto correcto, envÌo con retraso",
      autor: "Silvia Fern·ndez",
      fecha: "2016-12-03T07:52:24.236094Z"
    }
  ]
},
{
  id: 4,
  nombre: 'Producto 4',
  precio: 600,
  imagen: '/assets/images/movil4.jpg',
  comentarios: [
    {
      estrellas: 5,
      comentario: "Producto funciona perfectamente, envÌo perfecto",
      autor: "Teresa GarcÌa",
      fecha: "2017-10-16T12:32:23.126094Z"
    },
    {
      estrellas: 5,
      comentario: "Producto correcto",
      autor: "Joan Puigdemont",
      fecha: "2016-12-03T07:52:24.236094Z"
    }
  ]
}
];
