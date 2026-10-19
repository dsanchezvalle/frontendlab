---
proyecto: trotamundos
estado: borrador
version: 3
actualizado: 2026-10-19
fuentes:
  - trotamundos/docs/BENCHMARK_DISENO.md (D1–D14)
  - trotamundos/docs/NOTAS.md (notas de uso, hasta el 19 oct)
  - trotamundos/docs/FEEDBACK_FUENTES.md
  - trotamundos rama review/codex-informe (revisión adversarial H01–H10, prototipo B)
  - trotamundos PR #12 (correcciones de la revisión), PR #42 (rendimiento medido en un celular real)
  - notas de David en la sesión del 2026-10-19 (planeación previa con IA, soporte humano, canales)
publicar: false
revisado_privacidad: false
---

<!--
BORRADOR v3. Esta ficha es la FUENTE DE VERDAD del proyecto para frontendlab: está
completa a propósito. En el sitio no se muestra entera: ver las notas internas en
docs/fichas/_privado/ (no versionado).

Marcas pendientes:
  [DECIDIR]    una decisión tuya (qué contar, cómo nombrarlo)
  [CONFIRMAR]  un dato que inferí y tienes que verificar
  [COMPLETAR]  algo que solo tú sabes
  [EVIDENCIA]  una medición o captura que falta producir
-->

# Trotamundos

**Una guía de viaje para dos personas mayores de 65 años. Funciona sin internet y no les pide configurar nada.**

---

## Capa 1 · Resumen

Una pareja de pensionados, ambos mayores de 65 años, realiza un viaje de más de dos meses por más de una docena de ciudades de Europa y Asia. Usan Android, tienen un nivel digital intermedio y no van a configurar nada. En el camino se encuentran con aeropuertos sin señal, letreros en idiomas y escrituras que no conocen, y recepciones donde nadie habla español.

Trotamundos es una aplicación web instalable, sin framework, que **abre directamente en la guía del momento**: cómo llegar, qué hacer en el destino y cómo salir hacia el siguiente. Funciona sin internet desde la primera visita y hoy está en uso, a mitad del viaje.

Es la pieza visible de un sistema más amplio. Está la planeación y las reservas previas, hechas con apoyo de IA sobre fuentes de verdad documentadas. Y hay un acompañamiento de soporte humano durante todo el viaje.

El modelo es **híbrido**: la guía de cada destino empieza con información general y se va actualizando con lo que se confirma durante el viaje (vuelos, traslados, desplazamientos). Cubre todas las dimensiones del viaje: alojamiento, trámites, dinero, idioma, planes y servicios turísticos, y prevención de estafas comunes.

**Mi rol:** producto, investigación, diseño de interacción, especificación con criterios de aceptación y decisión final sobre cada cambio. La implementación la hice con agentes de IA (ver "IA en este proyecto").

**Intención:** que la complejidad quedara de nuestro lado y no del lado de los viajeros.

**Dos decisiones:**

> Para unos viajeros que llegan cansados a un lugar nuevo, decidí que la pantalla de inicio fuera **la guía del momento, que la aplicación elige según la hora y la etapa del viaje**, y no un catálogo de destinos. Así, abrir la guía cuesta un toque, a cambio de modelar cuándo empieza y termina cada etapa y de aceptar que ese modelo a veces falla.

> Para indicarle la dirección a un taxista en otro país, decidí mostrar **una sola dirección, en el idioma del lugar**, y descarté la versión transliterada. Así el conductor la entiende y el buscador de mapas la encuentra, a cambio de que los viajeros no puedan leerla.

**Una evidencia medida:** el registro de uso mostró que, en el celular de gama media de uno de los viajeros, cada toque tardaba en promedio entre 27 y 49 ms, con picos de 145 ms. La causa era un guardado síncrono dentro del toque. Lo saqué del toque y agregué una prueba que falla con el código anterior. [EVIDENCIA: medición después del arreglo, cuando se integre el PR #42]

**Enlaces:** demo con un itinerario ficticio [EVIDENCIA] · registro de decisiones · [DECIDIR: el repositorio es privado; ¿se publica una copia sin datos?]

---

## Capa 2 · Desarrollo

### Principios que surgieron del proyecto

No los definí al inicio. Aparecieron al repetirse en varias decisiones.

1. **Nada depende de que los viajeros configuren algo.** No hay cuentas, contraseñas, selector de tamaño de letra ni voces por descargar.
2. **Menos niveles, más información en la primera pantalla.** Cada nivel de navegación que se eliminó fue un toque menos y un lugar menos donde perderse.
3. **Una sola fuente de verdad, sin datos inventados y actualizable a medida que avanza el viaje.** Lo que no está confirmado aparece como "(pendiente)" y nunca como un dato. Cuando se confirma, se actualiza en un solo lugar y llega al celular de los viajeros sin que tengan que hacer nada. Así, una tarjeta pasa de información general a información confirmada.
4. **Los mismos componentes en todas partes.** Pocas tarjetas, siempre con el mismo comportamiento, se aprenden una sola vez.
5. **Hoy tiene que bastar de un vistazo; lo detallado queda disponible para quien lo busque.** Este principio salió de los datos de uso, no del diseño inicial.

### El problema y sus restricciones

Las aplicaciones de viaje más descargadas están pensadas para reservar y descubrir. Estos viajeros no reservan nada desde el celular: todo quedó reservado antes de salir. Lo que necesitan es **saber qué sigue en este momento** y tener a mano lo que les piden en un aeropuerto, en un taxi o en una recepción.

Hice un benchmark de las tres aplicaciones de viaje más descargadas en la categoría correspondiente de Google Play. Tomé dos patrones: organizar la aplicación alrededor del viaje en curso, y tener los datos del alojamiento reunidos y disponibles sin conexión. **Descarté a propósito** la búsqueda, las ofertas, los filtros, las cuentas, las reseñas, las notificaciones y la IA dentro de la aplicación.

La investigación sobre usuarios mayores de 65 años dejó una restricción que cambió la forma de trabajar: **cuando ya aprendieron una interfaz, un rediseño grande los lleva a abandonarla** (Nielsen Norman Group). El rediseño tenía que estar terminado antes de enviarles el enlace. Después solo caben cambios pequeños, y la navegación no se toca sin una decisión explícita.

### Antes de la aplicación: planeación con IA y fuentes de verdad

La aplicación es la última capa. Antes hubo un trabajo de planeación y reservas asistido por IA: vuelos, alojamientos, traslados, asistencia en aeropuertos y requisitos de entrada a cada país. Todo se apoyó en documentos de contexto y fuentes de verdad, no en la memoria de una conversación. [CONFIRMAR: alcance exacto de lo que se planeó con IA]

- **Datos del viaje:** un solo archivo con trayectos, alojamientos y contactos, del que se alimentan las guías, la aplicación y el PDF.
- **Documentos internos de referencia:** qué hacer cuando llega un dato nuevo, cómo se usan las salas VIP en cada aeropuerto, el formato de las guías y las reglas de contenido. La principal de esas reglas es no inventar horas, direcciones ni teléfonos.
- **Documentos personales:** viven fuera del repositorio, en almacenamiento con acceso restringido y en una carpeta física organizada por secciones. La aplicación solo indica en qué sección está cada papel.

Sobre esa base trabajan **dos personas como agentes de soporte humano: mi hermana y yo.** Consultamos las mismas fuentes que alimentan la aplicación, confirmamos cambios (un vuelo reprogramado, un traslado aprobado), los actualizamos y respondemos lo que la aplicación no alcanza a resolver.

**Hacia dónde puede crecer:** este esquema de fuentes de verdad, guía del momento y soporte humano con contexto compartido podría convertirse en un servicio de **agentes de viaje en vivo, tipo concierge**, para otros viajeros que necesiten acompañamiento. [DECIDIR: si lo mencionas como visión o lo dejas fuera]

### Un modelo híbrido: de lo general a lo confirmado

**Elegí:** que cada guía combinara dos tipos de información.

- **Información general**, preparada antes del viaje: cómo funciona el transporte en la ciudad, qué ver, cómo pagar, qué costumbres tener en cuenta.
- **Información confirmada**, que llega durante el viaje y reemplaza a la general en cuanto existe: el horario reconfirmado de un vuelo, una asistencia en el aeropuerto aprobada, el traslado coordinado con el alojamiento, la distancia real desde el hotel hasta un mirador.

**Cómo funciona:**

- Una tarjeta nace con lo que se sabe y marca lo demás como "(pendiente)".
- Cuando el soporte humano confirma un dato, se actualiza en la fuente de verdad y la tarjeta cambia en el celular de los viajeros, sin que tengan que hacer nada.
- En dos casos la información llega en tiempo real:
  - el aviso oficial de una actividad que depende del clima, que la aplicación consulta en la fuente oficial y explica en español, con la opción de volver a revisar;
  - lugares conocidos cerca de donde están, si ya dieron el permiso de ubicación.

  Sin conexión, la aplicación muestra lo guardado y dice a quién preguntar.

**Cuando el plan cambia:** si una actividad se cancela, la guía no se queda con el plan viejo. Se actualiza con la alternativa (por ejemplo, cómo ver la actividad desde un mirador en lugar de participar en ella) y con la hora límite para decidir.

**Descarté:**

- **Una guía cerrada antes de salir.** Es más simple de preparar, pero un viaje de dos meses cambia todos los días.
- **Mandar los cambios solo por mensajes.** Llegan rápido, pero se pierden en el chat y no quedan en el lugar donde los viajeros los van a buscar.

**Costo asumido:** el soporte humano tiene que confirmar y actualizar durante todo el viaje. Cada cambio pasa por la fuente de verdad, el build y las pruebas antes de publicarse.

### Las dimensiones del viaje

La guía no se limita a cómo llegar. Cada destino cubre las dimensiones que un viajero mayor necesita resolver por su cuenta:

| Dimensión | Qué resuelve | Cómo se presenta |
|---|---|---|
| Llegada y traslados | Del avión al alojamiento y del alojamiento al siguiente destino | Trayectos con formato de pase de abordar, migración paso a paso, asistencia en el aeropuerto |
| Alojamiento | Entrar, comunicarse y volver | Tarjeta con dirección en el idioma del lugar, "Mostrar al taxista", Llamar y WhatsApp |
| Trámites y documentos | Qué papel se necesita en cada momento | Papeles por etapa, con la sección de la carpeta física |
| Dinero | Pagar y retirar sin perder en la conversión | Casos de cajeros y terminales de pago, con ilustraciones y la recomendación de pagar en moneda local |
| Idioma | Hacerse entender | Frases con pronunciación, cajas "Para mostrar" en el idioma del país |
| Planes y servicios turísticos | Qué hacer y cómo llegar | Ideas con foto, duración y esfuerzo; lugares cerca; servicios contratados |
| Estafas comunes | Reconocerlas antes de caer | Secciones por destino donde son frecuentes, y avisos como "Nadie les va a pedir pagar ni dar la tarjeta por WhatsApp" |
| Movilidad | Moverse con autonomía | Casos desplegables, por ejemplo para manejar un carro alquilado: gasolina, parqueo, qué hacer si pasa algo |
| Salud y emergencias | Actuar rápido | Número de emergencias del país, seguro con mensaje listo y "¿Qué hacer si…?" |

**Por qué importa:** todas las dimensiones usan los mismos componentes (principio 4), así que una dimensión nueva no exige aprender una pantalla nueva.

### Decisión 1 · Eliminar niveles de navegación

**Elegí:**

- que Hoy muestre **la guía del momento completa**, elegida según la hora local y la etapa (Antes, Durante o Después de cada destino);
- que los documentos no tengan una sección propia, sino que cada etapa muestre **solo los papeles que se necesitan en ese momento**;
- que Emergencia y Herramientas se abran como **hojas sobre la pantalla actual**, para que "atrás" devuelva al mismo punto;
- quitar la pestaña "Viaje" de la barra inferior: los destinos se eligen en la parte superior de Hoy.

**Descarté:** un inicio con la lista de destinos (el patrón de catálogo). Tiene una ventaja real: es predecible y no se equivoca.

**Por qué:** en el diagnóstico de la primera versión, con letra Normal, el botón "Abrir la guía de hoy" quedaba al 86 % de la pantalla. Con letra Muy grande, el encabezado ocupaba el 62 % y el botón no se veía sin desplazarse. Dentro de una guía, el contenido empezaba al 67 % de la primera pantalla.

**Costo asumido:** hubo que definir reglas para el final de cada etapa. El Antes dura hasta que confirman su llegada al alojamiento, o hasta 6 horas después del aterrizaje. Cuando las reglas no alcanzan, la aplicación pregunta ("¿Ya llegaron al alojamiento?") en lugar de suponer.

**Verificación:** pruebas con Playwright en un Pixel 7, con fechas simuladas (en vuelo, a mitad de una ciudad, el día de salida y de regreso en casa). Una comprobación con `boundingBox` asegura que el título de la guía quede en la primera pantalla.

### Decisión 2 · Una sola fuente de verdad, actualizable durante el viaje

Los datos del viaje viven en un solo archivo. Cada guía es un archivo Markdown con una ruta fija (`guias/<destino>/<etapa>.md`). Un proceso de build convierte todo en JSON, y la aplicación solo lo presenta.

**Elegí:** construir la tarjeta del alojamiento, "Lo esencial" y los papeles **a partir de los datos**, no del texto de cada guía. El texto solo cambia con un dato confirmado. Lo que falta aparece como "(pendiente)" o "(por definir)", y se ocultan los botones que dependerían de ese dato.

**Descarté:** escribir los datos dentro de cada guía, como se hizo al comienzo. Era más rápido de redactar, pero una misma dirección terminaba en tres lugares distintos. [CONFIRMAR: un ejemplo concreto de inconsistencia]

**Costo asumido:** el build valida y advierte. Si falta un campo, la zona horaria no es válida o parece haber un PIN de reserva, lo señala sin detenerse. Lo que no pasa la validación no se publica.

**Por qué importa:** el viaje cambia mientras ocurre. Cuando llega un dato nuevo, se corrige en un solo lugar y se refleja igual en pantalla, en el PDF y sin conexión. En las dos primeras semanas hubo más de una docena de cambios de este tipo, cada uno en su propio commit. [CONFIRMAR: cifra]

### Decisión 3 · Los mismos componentes en todas las guías

**Elegí** un conjunto corto de piezas que se repiten en todas las guías:

- **"Para mostrar" / "Mostrar en grande":** una caja con el texto en el idioma del país, pensada para enseñarla a un tercero: un taxista, el personal de un aeropuerto, una farmacia. Se abre a pantalla completa, solo con Atrás y Cerrar.
- **Tarjetas de caso desplegables:** una situación concreta por tarjeta ("si se acaba la gasolina", "si pasa algo con el carro").
- **El alojamiento como componente:**
  - la dirección en el idioma del lugar;
  - "Mostrar al taxista";
  - Llamar y WhatsApp, con un mensaje modelo en el idioma del país;
  - "Ver en el mapa", que abre un punto y no una ruta.
- **Trayectos con formato de pase de abordar:** código, horas y aeropuertos, con la misma estructura en todos los destinos.

**Descarté:** un formato propio para cada guía, que es lo natural cuando se escribe ciudad por ciudad. Esa libertad obligaba a aprender cada pantalla de nuevo.

**Se sostuvo:**

- En una llegada, los viajeros le mostraron una caja "Para mostrar" al personal de asistencia del aeropuerto y recibieron de inmediato las indicaciones siguientes. Desde entonces se repite en cada llegada que necesita ayuda de un tercero.
- Uno de ellos leyó diez minutos seguidos sobre el carro alquilado y abrió las cuatro tarjetas de caso, cerca de un minuto cada una. Lo práctico funciona mejor en casos desplegables que en texto corrido.

**En la dirección descarté** la versión transliterada al alfabeto latino. Parecía más amable, pero el buscador de mapas no la encontraba y, en algunos idiomas, mezclaba palabras en español. Al conductor tampoco le servía.

### Decisión 4 · Funcionar sin internet de verdad

**Elegí:** un service worker que precarga toda la aplicación desde la primera visita, unos 2,4 MB en total:

- guías y datos;
- fotos de los planes, convertidas a WebP de 192 px en el build;
- tipografías e íconos.

No es necesario instalar la aplicación para que funcione sin conexión. La versión se calcula a partir del contenido, así que cada actualización solo descarga lo que cambió.

**Descarté:**

- guardar en la web los PDF de documentos personales para verlos sin conexión: son datos sensibles;
- pedirles que descargaran mapas o voces antes de viajar.

**Costo asumido:** sin conexión, un documento no se abre. La aplicación indica en qué sección de la carpeta física está. El mensaje "Todo guardado" era ambiguo y se ajustó para dejar claro qué funciona sin red.

**Se sostuvo:** en la segunda semana del viaje, uno de los viajeros usó la aplicación cuatro veces sin internet para consultar ideas de planes. Fue la primera vez que alguno la usó sin conexión, justo después de un recordatorio.

**Verificación:** pruebas con el service worker activo y sin red, y una prueba del ciclo de actualización sobre una copia temporal.

### Decisión 5 · Qué es transparente para los viajeros y qué no

No todo lo que hace la aplicación tiene que verse. La regla fue: **lo que no requiere una acción de ellos ocurre en silencio; lo que cambia lo que deben hacer se dice con claridad.**

**Ocurre sin que lo noten:**

- elegir la guía del momento;
- guardar todo para usar sin conexión y pedir almacenamiento persistente;
- recibir actualizaciones, que entran en el siguiente cambio de pantalla y nunca con una dirección en grande abierta o durante una impresión;
- la llave de acceso: tocan el mismo enlace de siempre y nunca escriben una clave;
- filtrar datos sensibles en el build;
- el registro de uso, que no cambia nada de la interfaz y del que se les informó.

**Se les dice de forma explícita:**

- lo que está "(pendiente)" o "(por definir)";
- "¿Ya llegaron al alojamiento?", cuando la aplicación no puede saberlo;
- que un documento necesita internet y en qué sección de la carpeta física está;
- que se acerca una estafa conocida: "Nadie les va a pedir pagar ni dar la tarjeta por WhatsApp".

**Descarté:** avisos de estado permanentes, como "Todo guardado para usar sin internet" en el encabezado. Eran información sobre la aplicación, no sobre el viaje, y competían con lo importante.

### Decisión 6 · Canales de soporte donde ya están los viajeros

La aplicación no intenta resolverlo todo. Su papel es **llevar a los viajeros al canal correcto con el menor esfuerzo**.

- **El grupo de WhatsApp del viaje,** con la imagen de los viajeros como foto del grupo [CONFIRMAR]. Es el canal principal con el soporte humano. En los textos de las guías, "grupo Trotamundos" se convierte en un enlace directo, y ningún texto nombra a una persona como responsable: siempre "escriban al grupo".
- **"¡Estamos bien!":** un botón que envía al grupo un mensaje con la ubicación y la hora local.
- **El alojamiento:** Llamar y WhatsApp con el mensaje modelo ya redactado en el idioma del país.
- **La mensajería interna de las plataformas de reserva,** para lo que corresponde al anfitrión o al hotel. [COMPLETAR: cómo se decidió cuándo usar cada canal]
- **Emergencia:** el número de emergencias del país, el seguro de viaje con un mensaje listo y los contactos de la familia, a un toque desde cualquier pantalla.

**Descarté:** un chat propio dentro de la aplicación. Duplicaba un canal que ellos ya dominan y exigía servidor, cuentas y notificaciones.

### Decisión 7 · Legibilidad por encima del mínimo

**Elegí:**

- contraste de 7:1 para el texto de lectura (WCAG AA exige 4,5:1);
- áreas táctiles de 48 px como mínimo y de 56 px en los botones principales (WCAG 2.5.8 exige 24 px);
- un tamaño de letra fijo y grande.

**Descarté:** el selector de tamaño de letra dentro de la aplicación, que llegó a existir. Era una configuración más, y el ajuste de tamaño de letra de Android sigue funcionando si hace falta.

| Elemento | Antes | Después |
|---|---|---|
| Texto secundario | 4,19:1 | 6,1:1 |
| Chip de sección (texto blanco) | 3,88:1 | 5,8:1 |
| Etiquetas "Próximamente" | 3,30:1 | ≥ 6:1 |
| Texto más pequeño | 12–13 px | 14 px como mínimo |
| Avisos temporales | 2,5–6 s | ≥ 6 s, y se cierran al tocarlos |

**Verificación:** axe con 0 violaciones *serious* o *critical* en las pantallas principales, más pruebas con la letra al 200 % y con un ancho de 360 px, sin desplazamiento horizontal. [EVIDENCIA: salida real de axe]

**Lo que axe no detecta:** la revisión adversarial encontró que la tecla Tab salía de las hojas modales hacia el fondo, aunque tuvieran `aria-modal`. Se corrigió aislando el fondo y devolviendo el foco al control que abrió la hoja. Falta probarlo con TalkBack en un Android real. [EVIDENCIA]

### Decisión 8 · Acceso privado sin contraseñas

**Elegí:** una llave incluida en el enlace que ya está fijado en el grupo de WhatsApp. Un middleware la valida, guarda una cookie con su HMAC (nunca la llave en texto plano) y la retira de la dirección. Sin conexión, el service worker entrega lo guardado y la llave no interviene.

**Descarté:** cuentas, contraseñas y códigos de un solo uso. Son más robustos, pero son una fricción que no iban a superar.

**Costo asumido:** si el enlace se filtra o se pierde un celular, hay que rotar la llave, volver a desplegar y fijar el enlace nuevo. El procedimiento está documentado en pocos pasos.

**Verificación:**

- pruebas unitarias del middleware;
- una prueba de punta a punta con el middleware real: primera entrada, cookie perdida, llave vencida y sin conexión;
- un filtro en el build que bloquea PIN de reservas y números de documentos.

### Decidir en tiempo real: cómo se aprende de los viajeros

Preguntarle a alguien de la familia tiene un sesgo documentado: tiende a calificar mejor de lo que es (*"Yours is better!"*, CHI 2012). Por eso se combinaron tres fuentes:

- notas de voz por WhatsApp, cuando quieran enviarlas;
- el registro de uso;
- una revisión, junto con ellos, de su propia línea de tiempo.

Cada hallazgo queda en un archivo de notas con fecha, pantalla y lo ocurrido. También queda su estado: "funciona", "por decidir", "no se hará: por qué" o el PR que lo resolvió. Nada se borra; lo que resultó falso se tacha.

**Hallazgos de las dos primeras semanas:**

- **Funciona:** enviarles un enlace directo a una idea concreta. Fue la primera vez que uno de ellos leyó una guía completa, más de tres minutos seguidos.
- **Dos formas de usar la misma aplicación.** Uno consulta de un vistazo: en 18 de 30 usos solo abrió Hoy, sin tocar nada, y casi la mitad de sus toques fueron para cambiar de destino. La otra lee y planea: abrió 17 ideas y 11 secciones, y es la única que comparte contenido. **De ahí salió el principio 5.**
- **No funciona:** el día de viaje buscaban el siguiente destino tocando "Después" varias veces. Para ellos, "Después" significa "lo que sigue", no "después de esta ciudad", y en toda la semana nadie usó la flecha "Siguiente". **Es un error en mi modelo mental** y sigue abierto (ver "¿Se sostuvo?").
- **Una hipótesis propia que los datos refutaron.** Uno de ellos abría "Lo esencial" tres veces en pocos segundos. Supuse que el bloque se desplazaba al abrirse y el botón cambiaba de lugar. Para comprobarlo agregué al registro la posición de desplazamiento de cada toque, y la hipótesis no se sostuvo: casi siempre eran apartados distintos. Los toques repetidos reales ocurren en el mismo punto y con la página quieta, ya sea por costumbre o porque el toque tardó en responder.
- **Esa demora fue la pista** que llevó al arreglo de rendimiento de la Capa 1.

### Una revisión adversarial antes de la entrega

Antes de enviarles el enlace, encargué una revisión adversarial a otro agente de IA, con un método explícito:

- escenarios reproducidos en Chromium con emulación de Android, en dos tamaños de pantalla y con la letra al 200 %;
- separación entre hechos reproducidos y juicios del revisor;
- límites declarados: no probó TalkBack ni una aplicación instalada en un teléfono real.

Encontró diez problemas, cuatro de severidad alta. Entre ellos:

- el service worker impedía recuperar una cookie perdida;
- "¡Estamos bien!" abría dos páginas externas;
- la lista de papeles para entrar a un país omitía documentos que la propia guía pedía.

La mayoría se corrigió el mismo día, en un solo PR.

**La decisión de navegación fue mía.** La revisión propuso dos alternativas:

- **A,** dejar solo dos pestañas: la descarté porque cambiaba hábitos y empeoraba la orientación cuando se pierden;
- **B,** mantener las tres pestañas y contraer lo secundario: la construí como un prototipo detrás de un parámetro, sin llevarla a producción. [CONFIRMAR: qué se tomó de B para el rediseño de Hoy]

La IA puede proponer y medir. Decidir qué alternativa respeta la restricción de no cambiarles la interfaz es criterio de producto.

### Descartado a propósito

- **Revelar las tarjetas de la guía según la hora del día.** Si ya pasó la hora de algo que todavía piensan hacer, la tarjeta desaparece y pierden el hilo. En su lugar, las secciones aparecen contraídas.
- **Emergencias dentro de "Lo esencial".** Están siempre en el botón rojo de la barra, desde cualquier pantalla.
- **Audios pregrabados para las frases.** Las lee la voz del celular. Si falta la voz del idioma, aparece "Léanlo así para sonar parecido:" con la pronunciación.
- **Recortar el texto de una guía para que el PDF ocupe menos hojas.** Es preferible una hoja adicional legible, sin bajar de 9,6 pt.
- **Modo oscuro, cuentas, notificaciones, búsqueda e IA dentro de la aplicación.** Quedaron fuera del alcance desde la especificación.

### Decisiones que cambié

- **El botón Atrás quedó solo como ícono,** en un botón de 56 px y con la palabra en `aria-label`. Funciona para estos viajeros porque ya lo conocían, pero dejé registrado que **para otras personas mayores conviene volver a mostrar la palabra.** Es una decisión para estos usuarios, no una regla general.
- **El rediseño de Hoy se hizo en un par de días,** antes de enviar el enlace, con cerca de una docena de ajustes sobre la especificación: la ubicación del botón de WhatsApp, qué se contrae, qué sale del PDF. Cada ajuste quedó registrado en la misma especificación con su fecha y su razón.

### Detalles de oficio

[DECIDIR: elegir 2 o 3 y acompañarlos de una demo comparativa pequeña]

- **La barra inferior nunca tapa contenido:** el `padding-bottom` del `body` se ajusta a la altura real de la barra con `ResizeObserver`, también con la letra al 200 %.
- **Rutas con `#`:** la aplicación funciona sin servidor y respeta el botón Atrás de Android. Hoy siempre queda al fondo del historial.
- **PDF a dos columnas:** un algoritmo distribuye las cajas en hojas tamaño carta. Si la última hoja queda ocupada por debajo del 30 %, prueba un espaciado más compacto.
- **Guardado fuera del toque:** el registro de uso guarda con `requestIdleCallback` y mantiene un solo guardado pendiente a la vez.

### Verificación

| Qué | Cómo | Estado |
|---|---|---|
| Primera pantalla | Playwright, Pixel 7, fechas simuladas, `boundingBox` | Automatizado |
| Accesibilidad | axe con 0 *serious*/*critical*; foco contenido en las hojas | Automatizado [EVIDENCIA: salida] |
| Letra al 200 % y 360 px | Sin desplazamiento horizontal ni texto cortado | Automatizado |
| Toques por tarea | Cada tarea cumple la meta de toques | Automatizado |
| Sin conexión | Service worker activo y sin red | Automatizado |
| Privacidad | Sin PIN ni números de documento en la salida del build | Automatizado |
| Llave | Unitarias, de punta a punta y `curl` después del despliegue | Automatizado |
| Rendimiento por toque | Registro de uso en un celular real: 27–49 ms en promedio, picos de 145 ms | Medido; falta la medición posterior [EVIDENCIA] |
| Carga en gama media | [EVIDENCIA: Lighthouse o WebPageTest con throttling declarado] | Pendiente |

### Resultado

[COMPLETAR al terminar el viaje: cuántos días se usó y qué resolvieron sin escribir al soporte humano. Incluir lo que dijeron en sus notas de voz, sin fechas ni lugares.]

### ¿Se sostuvo?

- **Sí:** la guía del momento, los enlaces directos, las tarjetas de caso, "Para mostrar" y el uso sin conexión.
- **No:** el paso a la siguiente etapa el día de viaje. Corregirlo choca con la restricción de no cambiar la navegación después de la entrega. [DECIDIR y COMPLETAR: qué se hizo y por qué]

### IA en este proyecto

Definí el problema, investigué, escribí la especificación con criterios de aceptación y tomé cada decisión de producto, UX y privacidad. La planeación previa, la implementación y una revisión adversarial se apoyaron en agentes de IA que trabajan sobre fuentes de verdad documentadas. Ningún cambio entra sin pasar las pruebas y sin mi aprobación.


---

## Capa 3 · Recibos

[EVIDENCIA: los genera el sensor de frontendlab; mientras tanto, se arman a mano]

- La especificación D1–D14, con sus criterios de aceptación y los ajustes fechados. [DECIDIR: publicar una versión anonimizada]
- La revisión adversarial: hallazgos H01–H10, método y límites.
- Las notas de uso, cada una con su estado ("funciona", "por decidir", "no se hará", PR).
- PRs representativos:
  - #12: correcciones de la revisión;
  - #27: versión calculada a partir del contenido;
  - #28: registro de uso;
  - #37: enlaces que abren en Hoy;
  - #42: rendimiento por toque.
- Las técnicas de feedback y sus fuentes.
