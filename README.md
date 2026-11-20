# Sabor Caribeño — Mojarritas

**Cocina caribeña auténtica, en tu casa.**

Plataforma web que conecta a personas interesadas en la cultura caribeña con chefs caribeños verificados, que llegan al hogar del usuario a cocinar en vivo. El usuario busca, reserva, paga y sigue su experiencia sin salir de casa.

Proyecto del grupo Mojarritas (Juan Riatiga, Nicole Salas y Juan Abello), Universidad Sergio Arboleda.

## 1. Problema

Muchas personas de entre 18 y 44 años, turistas y residentes en Santa Marta, quieren conocer la cultura caribeña a través de su gastronomía, pero hoy no tienen una forma cómoda y segura de hacerlo. Salir a comer no siempre cuenta la cultura; el domicilio permite probar un plato, pero no vivir la experiencia; y contratar un chef por cuenta propia genera desconfianza. Además, no cualquiera deja entrar a un chef desconocido a su casa, y el idioma, el precio y la poca disponibilidad de chefs dificultan la experiencia. Falta una forma de llevar una experiencia caribeña auténtica y segura directamente al hogar.

### Necesidades
- Conocer y disfrutar la cultura caribeña, especialmente su comida, desde un lugar cómodo.
- Sentirse seguro al recibir a un chef en su propio espacio.

### Dificultades
- Viajar o ir a restaurantes exige desplazarse y no siempre cuenta la cultura del lugar.
- Pedir comida a domicilio permite probar los platos, pero no ofrece una experiencia cultural completa; además, la comida suele llegar fría.
- Dejar entrar a un chef desconocido genera desconfianza si no hay verificación de identidad y certificación.
- El idioma, el precio y la disponibilidad de chefs pueden hacer difícil conseguir la experiencia.
- Algunos ingredientes caribeños son escasos o costosos fuera del Caribe, lo que encarece el servicio.

### Expectativas
- Contar con chefs caribeños verificados y con certificación culinaria.
- Reservar y pagar de forma sencilla, con el precio claro desde el inicio.
- Comunicarse sin barreras de idioma y coordinar un horario que se ajuste a su tiempo.
- Vivir una experiencia cultural auténtica, no solo recibir comida.

### Alternativas actuales

| Plataforma | Fortaleza | Limitación frente a este público |
|---|---|---|
| Eatwithme | Experiencias gastronómicas en hogares privados, con enfoque en el intercambio cultural | No se enfoca en cultura caribeña ni en chefs caribeños verificados que lleguen al hogar del usuario |
| Timeleft | Organiza cenas entre desconocidos sin que el usuario planee nada | Prioriza la conexión social sobre la experiencia cultural o gastronómica en casa |
| Meetup | Gran variedad de grupos y actividades, incluidas cultura y gastronomía | Las actividades son presenciales y obligan a desplazarse |
| Take a Chef | Chefs privados a domicilio en muchos países | No se enfoca en cocina caribeña ni en el mercado de Santa Marta |

Ninguna reúne en un mismo servicio chefs caribeños verificados, seguridad, comunicación clara, disponibilidad y una experiencia cultural auténtica desde casa.

## 2. Lo que encontramos con las personas

Hablamos con personas de otras ciudades y de otros países. Son muestras pequeñas, de conveniencia: sirven como señal preliminar, no como cifra de mercado.

- Cerca del 90 % tiene dificultades para conseguir comida típica de la costa, y el 53 % termina pidiendo a domicilio.
- El 76,5 % está interesado en usar la página.
- Lo que más confianza da para reservar: reseñas (31,6 %), fotos (26,3 %), pago protegido (15,8 %), certificación del chef (10,5 %), chat (10,5 %) y ver el precio total desde el inicio (5,3 %).
- Todas las personas que respondieron desde el exterior probarían los platos.
- El 79 % tiene entre 18 y 34 años; la ocasión más citada es reunirse con familia o amigos.

### Insight de las pruebas de uso

2 de 5 personas entendieron la app como un servicio de entrega de comida (tipo Rappi), no como un chef que cocina en vivo en casa. Un "error de interpretación" repetido no es ruido: es una demanda oculta que el equipo no había planeado cubrir.

Esto obliga a comunicar desde el primer vistazo que el chef llega a cocinar al hogar, y abre la puerta a explorar la comida caribeña a domicilio como una línea de servicio adicional en futuras versiones.

## 3. Concepto de solución

Una aplicación web que conecta a personas interesadas en la cultura caribeña con chefs caribeños verificados, y facilita la búsqueda, la reserva, el pago y el seguimiento del servicio. Se vende una experiencia cultural segura en casa, no solo comida.

| Característica | Atributo |
|---|---|
| Confianza y seguridad | Chefs con identidad y certificación culinaria verificadas, y perfil del comprador visible solo tras aceptar el pedido |
| Autenticidad | Chefs caribeños con perfil, fotos, menú detallado, años de experiencia y reseñas |
| Sencillez | Reserva y pago en pocos pasos, con desglose claro del precio |
| Accesibilidad | Precios en USD, EUR y COP, y filtros por plato, zona y rango de precio |
| Comunicación | Contacto directo con el chef por WhatsApp y avisos de cada fase del pedido |

## 4. Modelo de ingresos

Ejemplo con un plato de referencia de $60.000 por persona (tope fijado por el equipo, no un promedio medido):

| Concepto | Valor |
|---|---|
| Tarifa de servicio al comprador (15 %) | $9.000 |
| Comisión al chef (20 %) | $12.000 |
| Ingreso de la plataforma por persona | $21.000 |
| Costo variable (pasarela 3,5 % + $300) | $2.715 |
| Margen de contribución | $18.285 (87 %) |

## 5. MVP

Se valida primero con datos simulados y un registro real en hoja de cálculo, sin construir la plataforma completa.

| Componente | Cómo funciona |
|---|---|
| Catálogo de chefs | Lista filtrable por búsqueda de plato, precio y zona, con mapa de Santa Marta y perfiles simulados |
| Perfil del chef | Insignias de confianza, especialidad, certificación, publicaciones, reseñas y WhatsApp |
| Reserva | Fecha, hora, comensales y dirección, validando la agenda y el horario del chef |
| Pago | Resumen con menú, ingredientes y transporte, y tarifa de servicio; el cobro es una simulación |
| Panel del chef | Aceptar, denegar y completar pedidos, bloquear días en la agenda y publicar su trabajo |
| Seguimiento | Cuatro fases: reserva confirmada, chef aceptó, chef en camino, chef llegó |
| Base de datos | Cuentas y reservas llegan a una hoja de cálculo de Google |
| Ayuda | Mini tutorial según el rol (comprador o chef) |

### Hipótesis a validar
- Las personas están dispuestas a pagar por recibir a un chef caribeño en casa si hay verificación y seguridad.
- Hay suficientes chefs caribeños dispuestos a registrarse y atender.
- La propuesta se entiende como un chef que cocina en vivo y no como un servicio de entrega de comida.
- Las reservas pueden crecer cerca de 30 % al mes (supuesto del escenario optimista).

### Métricas de éxito
- Proporción de usuarios que entiende correctamente la propuesta de valor.
- Reservas completadas frente a reservas iniciadas.
- Pedidos aceptados por los chefs.
- Calificación promedio de las reseñas y usuarios que repiten.

## 6. Resumen financiero (escenario optimista)

- Inversión necesaria: cerca de $14,5 millones ($8,45 M de arranque + $6 M para cubrir el mayor faltante de caja, en el mes 6).
- El negocio pierde durante los primeros 6 meses y da utilidad desde el mes 7.
- Punto de equilibrio: 119 personas al mes; en el mes 12 se llega a 542.
- Utilidad líquida: $9,42 M en el año y $6,67 M en el mes 12; la inversión se recupera dentro del primer año.

Estas cifras dependen de supuestos del equipo que aún no están validados: crecimiento de 30 % mensual, plato de $60.000, equipo sin salario el primer año y capital de $16,5 M. Con el escenario base (comisión de 8,55 %, crecimiento de 15 % y equipo pagado) el negocio pierde dinero.

### Riesgo principal

La oferta de chefs y el costo de los ingredientes caribeños fuera del Caribe pueden limitar la disponibilidad y encarecer la experiencia. En el piloto se medirá cuántos chefs hay disponibles y cómo afecta el precio a la conversión.

### Siguientes pasos
- Encuestar a más personas.
- Conseguir cerca de $14,5 millones.
- Conectar una pasarela de pago real.
- Hacer un piloto en Santa Marta.

## 7. Estructura

```
├── index.html          página que presenta el proyecto
├── app.html            la app (búsqueda, reserva y panel del chef)
├── css/
│   ├── styles.css      estilos de la app
│   └── proyecto.css    estilos de la página del proyecto
├── js/
│   ├── 1-base.js       utilidades, estado, monedas y reservas
│   ├── 2-datos.js      chefs, platos, ofertas y ubicación
│   ├── 3-ui.js         cabecera, ventanas y buscador
│   ├── 4-inicio.js     inicio
│   ├── 5-resultados.js lista de chefs y mapa
│   ├── 6-perfil.js     perfil del chef y reserva
│   ├── 7-pago.js       pago y confirmación
│   ├── 8-cuentas.js    registro e inicio de sesión
│   ├── 9-chef.js       panel del chef
│   ├── ampliar.js      zoom de fotos
│   ├── ayuda.js        mini tutorial
│   ├── sheets.js       conexión con Google Sheets y correos
│   └── arranque.js     restauración de sesión (debe cargarse al final)
├── assets/             logos y fotos
└── README.md           este documento
```

El orden de los archivos .js importa: `arranque.js` debe cargarse al final.

## 8. Tecnologías

- HTML: estructura de las páginas.
- CSS: colores, tipografías y diseño adaptable a celular.
- JavaScript: catálogo, reservas, seguimiento y envío de datos, sin frameworks.
- Google Sheets y Apps Script: base de datos de cuentas y reservas, y envío de correos.
- Almacenamiento del navegador: datos de la sesión durante el MVP.
- GitHub: publicación de la app.
