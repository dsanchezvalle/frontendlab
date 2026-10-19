---
proyecto: wedding-platform
estado: borrador
version: 1
actualizado: 2026-10-19
fuentes:
  - wedding-platform/docs/design-system/surfaces.md
  - wedding-platform/docs/save-the-date.md (contrato de ruta y componente)
  - wedding-platform/docs/save-the-date-decisiones.md
  - wedding-platform/docs/hallazgos-lista-invitados.md (recorrido funcional del 13 sep 2026)
  - wedding-platform historial de git (nov 2025 – oct 2026), PRs #17–#20
  - notas de David en la sesión del 2026-10-19
publicar: false
revisado_privacidad: false
---

<!--
BORRADOR v1. Igual que en Trotamundos, esta ficha es la FUENTE DE VERDAD completa; en
frontendlab se muestra organizada, no entera.
Marcas: [DECIDIR] [CONFIRMAR] [COMPLETAR] [EVIDENCIA]
Este repo es compartido: todo se leyó como fuente y no se escribió nada en él.
-->

# wedding-platform

**Una plataforma para organizar una boda, con dos interfaces: una herramienta de trabajo para quienes la organizan y una invitación para quienes la reciben.**

---

## Capa 1 · Resumen

Organizar una boda implica dos públicos muy distintos. Quienes la organizan necesitan gestionar listas de invitados, grupos, acompañantes, categorías y presupuesto. Quienes reciben la invitación necesitan algo que se sienta ceremonial, que puedan responder desde el celular en su propio idioma y sin crear una cuenta.

wedding-platform resuelve los dos casos en una sola aplicación (Laravel, Inertia, Vue y TypeScript) con **dos superficies: administración e invitados**. Comparten comportamiento y datos, pero cada una tiene su propia identidad visual. Hoy está en uso y en desarrollo activo. El objetivo de mediano plazo es que sirva a otras parejas y a wedding planners, no solo a esta boda.

**Equipo:** el proyecto lo lidera una tech lead; yo trabajo en el frontend y el design system. [DECIDIR: nombrarla, con su visto bueno]

**Mi rol:** el design system de superficies, la superficie de invitados completa (el save the date), las decisiones de UX y de redacción, y el contrato de datos entre la interfaz y el backend.

**Intención:** que la invitación se sintiera como un objeto impreso y la administración como una herramienta de trabajo, sin duplicar el comportamiento.

**Dos decisiones:**

> Para una aplicación con dos públicos opuestos, decidí que **una superficie fuera una capa de estilo y no de comportamiento**, y descarté separar la aplicación en dos. Así un botón sigue siendo el mismo botón en ambas superficies y solo cambian los tokens que consume, a cambio de una convención de nombres estricta, verificable con `grep`.

> Para invitados de cincuenta y sesenta y tantos años que responden desde el celular, decidí **guardar cada respuesta en el momento en que la marcan** y descarté el botón de enviar con su pantalla de confirmación. Así nadie pierde una respuesta por no terminar el formulario, a cambio de manejar en la interfaz el guardado optimista, los errores de red y el reintento.

**Una evidencia medida:** el dorado de la marca se separó en tres tokens según dónde se usa. Como texto sobre papel claro tiene 4,9:1 de contraste y como texto sobre el teal oscuro, 5,1:1. El primer intento de aclarar el color bajó su croma de 38 a 23 (se veía arena, no oro). El valor final sube a 45,6 de croma y mantiene 5,3:1.

**Enlaces:** demo con datos ficticios [EVIDENCIA] · registro de decisiones · [DECIDIR: el repositorio es compartido y privado; ¿qué se puede mostrar?]

---

## Capa 2 · Desarrollo

### Principios que surgieron del proyecto

1. **Una superficie es estilo, no comportamiento.** Lo que cambia entre administración e invitados es la apariencia, no la lógica.
2. **Lo compartido es el mínimo común denominador.** Ante la duda, algo va a una superficie: promoverlo después a compartido es barato, y degradarlo es caro.
3. **Un componente se bifurca cuando diverge su API, no su apariencia.** Si cambian las props, los slots o los eventos, va en una carpeta de superficie. Si solo cambia el estilo, se queda compartido.
4. **La invitación es un objeto impreso: se ve igual para todos.** No sigue el tema oscuro del dispositivo de cada invitado.
5. **La regla tiene que poder verificarse.** Si una convención no se comprueba con un `grep`, se termina rompiendo.

### El problema y sus restricciones

- **Fecha fija.** El evento no se mueve, así que cada módulo compite contra un calendario real.
- **Invitados diversos.** Hablan tres idiomas (español, portugués e inglés), van de familias completas a invitados que llegan solos, y muchos tienen entre cincuenta y sesenta y tantos años: para ellos, la presbicia es casi la norma.
- **Dos personas con roles distintos.** Una tech lead que define la arquitectura del backend, y yo, desde el frontend, el design system y la experiencia.
- **Un producto que debe servir después.** Lo que se construye para esta boda debería poder reutilizarse con otras parejas y con wedding planners.

### Decisión 1 · Dos superficies sobre una base compartida

**Elegí** tres capas:

| Capa | Qué contiene | Prefijo |
|---|---|---|
| Base compartida | Paleta primitiva, tokens semánticos, tipografía base, reglas globales | (ninguno) |
| Superficie de administración | Tipografía para etiquetas y datos, insignias de importancia, botón flotante, animación de edición, encabezados de tabla | `admin-*` |
| Superficie de invitados | Tipografía de display, títulos editoriales, hero, proporciones de galería, animaciones al entrar en pantalla | `guest-*` |

Las convenciones de nombres son `--<superficie>-<concepto>-<rol>` para los tokens y `.<superficie>-<concepto>-<variante>` para las utilidades. En los componentes, la carpeta hace de prefijo: `components/admin/Tabla.vue`, no `AdminTabla.vue`.

**Descarté:** dos aplicaciones separadas, o un único sistema de estilos con variantes por página. [CONFIRMAR: qué alternativas se consideraron de verdad] Separar la aplicación duplicaba la lógica. Las variantes por página mezclaban dos lenguajes visuales sin una frontera clara.

**Costo asumido:** disciplina con los nombres. Sacar algo de lo compartido hacia una superficie obliga a tocar cada archivo que lo usaba.

**Verificación:** una serie de `grep` documentados que deben devolver cero coincidencias: ninguna clase con forma de administración sin prefijo, ningún token sin prefijo. Una importación de `components/admin/` dentro de una página de invitados se detecta con un `grep`, sin herramientas adicionales.

### Decisión 2 · Organizar por superficie y no por tipo

**Elegí:** reorganizar los componentes por superficie: `admin/`, `guest/`, `language/` y `ui/`. El detonante fue concreto: `components/guest/` y `components/guests/` se diferenciaban en una letra y significaban cosas opuestas, la página pública y la gestión administrativa. Eso confundía al autocompletado y a cualquiera que leyera el código.

**La partición llegó al backend.** Después de esa reorganización, la tech lead separó en el backend los archivos de rutas, controladores, requests, recursos y pruebas de administración e invitados. La regla dejó de ser solo del frontend y pasó a ser de todo el proyecto. [CONFIRMAR: si fue una decisión conjunta o ella la tomó a partir de la estructura del frontend]

**Descarté:**

- **Poner las banderas en `components/ui/`.** Ese directorio lo genera shadcn-vue y es código de terceros con su propia forma. Además, las banderas no son primitivas de UI: son un conjunto cerrado atado al listado de idiomas.
- **Reorganizar `pages/`.** Inertia resuelve las páginas por ruta, y mover un archivo rompe el render. El espejo entre carpetas queda imperfecto a propósito.
- **Mover la imagen del sello a `public/`.** Importada como módulo, Vite le pone un hash de contenido y la compilación falla si la ruta se rompe. En `public/` el error sería un 404 silencioso en producción.

### Decisión 3 · El contrato primero

El save the date se construyó **antes de que existiera el backend que lo respalda.** En vez de esperar, escribí un contrato de ruta y componente con:

- las props que recibe la página y sus tipos;
- el endpoint de guardado y el cuerpo de cada petición;
- qué muestra la tarjeta ante cada respuesta del servidor (éxito, error de validación, 404, 500 o fallo de red).

La página se programó contra ese contrato, de modo que funcionaría en cuanto algo respondiera al endpoint. El endpoint de respuesta lo implementó después la tech lead.

**Descarté:** esperar al backend o simular datos sin un contrato escrito. Lo primero bloqueaba el calendario. Lo segundo dejaba la integración para el final, que es donde más cuesta.

**Lo que falló y cómo se corrigió:** el idioma se decidía dos veces. El servidor enviaba las etiquetas de las respuestas ya traducidas y el cliente tenía su propio diccionario. Al cargar, la página mostraba las opciones siempre en español, aunque el resto estuviera en inglés o portugués, y se corregían solas al tocar el selector de idioma. Fue un hallazgo de severidad alta, porque afectaba la primera impresión del invitado. Se resolvió con una sola fuente: las etiquetas salieron del payload y la plantilla las lee siempre del catálogo de idioma.

### Decisión 4 · Cada respuesta se guarda al marcarla

**Elegí:** no tener botón de enviar ni pantalla de confirmación. El comportamiento es este:

- la respuesta se marca de inmediato y se envía 400 ms después, así que cambiar de opinión varias veces seguidas gasta una sola petición;
- un contador por invitado descarta las respuestas que llegan desordenadas;
- si el guardado falla, la marca no se revierte: la tarjeta avisa "No se guardó" y ofrece reintentar;
- los fallos de red y de servidor se recogen en `onFinish`, porque en Inertia `onError` solo cubre la validación. Sin eso, la tarjeta se quedaba en "Guardando…" para siempre;
- se silencia el modal de error que trae Inertia por defecto, porque un volcado del servidor encima de una invitación no le sirve al invitado;
- el espacio del mensaje de estado siempre está reservado, para que aparecer y desaparecer no mueva el nombre.

**Descarté:** el formulario clásico con envío. Es más simple de implementar, pero con un grupo familiar alguien puede responder por todos y abandonar antes de enviar.

**Verificación:** en un recorrido funcional se probó el guardado contra un endpoint que todavía no existía. La marca quedó en dorado, llegó el 404, apareció "No se guardó · Reintentar" sin revertir la marca, y el reintento disparó una petición nueva. Nada se quedó en "Guardando…".

### Decisión 5 · Legibilidad para el público real

**Elegí:**

- ningún texto propio por debajo de 11 px ni por debajo de 4,5:1 de contraste;
- un tema claro fijo para la superficie de invitados, independiente del tema del dispositivo;
- tres dorados según el uso (relleno, texto sobre papel y texto sobre fondo oscuro), en lugar de uno solo para todo;
- instrucciones como "Desliza" sin mayúsculas ni tracking, porque esos recursos borran la silueta de la palabra justo cuando más ayuda. El tratamiento editorial se reserva para lo decorativo.

**Lo que costó fijar el tema:** al anclar los tokens al tema claro quedaron cuatro tokens que seguían resolviendo al oscuro, y el hover de las opciones mostraba un fondo casi negro bajo texto oscuro. Además, el menú del selector de idioma se renderiza fuera de la superficie, directamente en `<body>`, y heredaba el tema oscuro de la aplicación. Por eso los tokens de invitado viven en un selector compartido. La regla quedó documentada: todo token nuevo hay que fijarlo también ahí.

### Decisión 6 · La redacción también es diseño

- **La introducción hace una sola pregunta:** si pueden acompañarnos. La versión anterior apilaba tres atenuaciones, y en inglés ni siquiera sonaba natural.
- **Las opciones intermedias hablan de intención, no de probabilidad:** "casi seguro, por confirmar" o "difícil, revisaré si puedo".
- **El invitado que va solo recibe una versión en singular:** sin contador ("1 de 1 respuestas guardadas" no informa nada) y sin la marca "· Tú".
- **La ayuda explica lo que pasa de verdad:** cada respuesta se guarda al marcarla y se puede cambiar después.

### Decisión 7 · Priorizar por la fecha

**Elegí:** construir primero el módulo de invitados en la administración y el save the date en la superficie de invitados, porque es lo primero que la fecha del evento exige: saber quién viene. [COMPLETAR: qué quedó para después, por ejemplo la confirmación formal, el sitio del evento o la integración del presupuesto, y con qué criterio]

**Costo asumido:** [COMPLETAR: qué deuda se aceptó por llegar a tiempo]

### Decisión 8 · Abstraer pensando en otras parejas y en wedding planners

**El objetivo:** que la plataforma no quede atada a esta boda.

**Lo que ya existe:**

- un registro de eventos de usuario con un creador polimórfico, un tipo de evento y una configuración en JSON. Hoy registra las acciones de los invitados sobre la invitación;
- categorías de invitados como datos y no como código (por ejemplo, "padrinos");
- tres idiomas resueltos con catálogos y no con textos escritos en los componentes.

[CONFIRMAR: estas bases las diseñó la tech lead; precisar cuáles pensaron explícitamente para varias bodas]

**Lo que falta:** [COMPLETAR: qué sigue fijo para esta boda (datos del evento, tema visual, textos) y cómo se volvería configurable]

**Costo asumido:** abstraer temprano frente a entregar a tiempo. [DECIDIR: cómo se resolvió esa tensión]

### Recorridos funcionales: encontrar los problemas antes que los invitados

Antes de cerrar cada etapa hago un recorrido funcional con pasos definidos. El del panel de invitados tuvo siete pasos:

1. crear un titular;
2. añadirle un acompañante con nombre y otro anónimo;
3. intentar borrar el titular;
4. sacar al acompañante del grupo;
5. devolverlo;
6. disolver el grupo;
7. borrar al titular.

De cada recorrido salen dos listas: lo que falla y lo que se verificó como correcto.

**Hallazgos de ese recorrido:**

- **Contadores que no se refrescaban al borrar un invitado.** La recarga parcial pedía solo la lista y no los totales. El arreglo cabía en una línea.
- **Disolver un grupo borraba a los acompañantes anónimos sin pedir confirmación**, mientras que borrar un solo invitado sí la pedía. La asimetría no parecía deliberada, así que propuse dos opciones: confirmar diciendo cuántos se borran, o que disolver nunca borre.
- **Tres acciones distintas con el mismo `aria-label="edit"`.** Un lector de pantalla anunciaba tres botones idénticos con consecuencias muy diferentes.
- **Un marcador de posición sin terminar** ("Placeholder...") en un buscador.

[CONFIRMAR: cuáles se corrigieron y en qué PR]

### Colaboración con la tech lead

[COMPLETAR con tus palabras: cómo se reparten las decisiones, quién aprueba qué y cómo se ponen de acuerdo]

Lo que muestra el historial:

- **Reparto de trabajo:** yo trabajo en ramas de la superficie de invitados y del design system, y ella revisa e integra los PRs.
- **Ella construye la arquitectura del backend:** endpoints, separación de rutas y controladores, categorías, registro de eventos y pruebas.
- **El repositorio tiene su propio proceso:** formato y lint antes de integrar, y pruebas en CI. [CONFIRMAR]
- **Una decisión mía de proceso:** al integrar, reescribí los mensajes de mis commits a asuntos de una línea y conservé las razones completas en un documento de decisiones, con una rama de respaldo. [CONFIRMAR: si fue por convención del equipo]

### Descartado a propósito

- **Filete doble en la tarjeta:** es un recurso de papelería grabada. Lo probé y lo revertí porque no convencía.
- **Un sello de lacre en miniatura en cada tarjeta:** el lacre es el gesto de abrir la invitación, y repetirlo en pequeño lo abarata.
- **Un invitado por fila en escritorio:** no había ancho para las etiquetas largas, así que se mantiene la disposición apilada.
- **Las banderas en `ui/`, reorganizar `pages/` y el sello en `public/`:** ver la Decisión 2.

### Detalles de oficio

[DECIDIR: elegir 2 o 3 y acompañarlos con una demo comparativa pequeña]

- **El sobre conserva su proporción 3:2 en todos los tamaños.** Una media query lo forzaba a 1,35:1 y aparecían 12 px de banda vacía arriba y abajo. La solapa giraba alrededor del borde de la caja y no de su pliegue real, y al abrirse se despegaba del cuerpo.
- **La grieta del sello va a 35,75°,** que es la pendiente 430/600 del borde de la solapa. El sello se parte siguiendo el doblez que tiene debajo y, en reposo, se lee entero.
- **El sello se dimensiona en porcentaje del sobre, no del viewport.** Con un `clamp` contra el viewport se quedaba en su mínimo de 148 px y en celular salía al doble de su tamaño relativo.
- **El canto de barba del papel** es un filtro de turbulencia aplicado a un pseudo-elemento que solo lleva el fondo y la sombra. Si se aplicara a toda la tarjeta, ondularía también el texto. El filtro se declara una sola vez para toda la lista.
- **Banderas con `useId()`:** cada bandera genera su propio id de `clipPath`. Sin eso, dos instancias en la misma página compartían el id y se perdía el recorte circular.
- **Tipografía fluida en unidades de contenedor:** en escritorio el hero ocupa el 44 % del ancho, y medirlo contra la ventana lo desbordaba.
- **Áreas seguras en iOS:** sin `viewport-fit=cover`, los insets valen cero. En pantallas de menos de 700 px de alto, el hero empujaba el saludo fuera de la vista.

### Verificación

| Qué | Cómo | Estado |
|---|---|---|
| Partición de superficies | `grep` documentados con cero coincidencias esperadas | Manual, documentado |
| Contraste | Medido por token: 4,9:1, 5,1:1 y 5,3:1; mínimo de 4,5:1 en todo texto propio | Medido |
| Lógica de dominio | Pruebas con Pest (unitarias, de funcionalidad y de navegador) y CI de pruebas y lint | Automatizado [CONFIRMAR cobertura] |
| Recorridos funcionales | Pasos definidos, con lista de lo que falla y lo verificado | Manual, documentado |
| Tres idiomas | Cambio de idioma completo, incluidos los mensajes de error | Verificado en recorrido |
| Accesibilidad automatizada | [EVIDENCIA: axe sobre el save the date y la lista de invitados] | Pendiente |
| Rendimiento | [EVIDENCIA: Core Web Vitals del save the date en un celular de gama media] | Pendiente |

### Resultado

[COMPLETAR: cuántos invitados han respondido, en cuánto tiempo, qué proporción desde el celular y en qué idiomas. Sin nombres.]

### ¿Se sostuvo?

[COMPLETAR. Pistas: ¿la regla de superficies aguantó los módulos nuevos? ¿El contrato primero aceleró la integración o la complicó?]

### IA en este proyecto

En mi parte del proyecto definí el design system de superficies, el contrato de datos y cada decisión de UX y de redacción. La implementación se apoyó en agentes de IA. Ningún cambio entra sin pasar las pruebas, sin mi revisión y sin el proceso de integración del equipo.

---

## Capa 3 · Recibos

- El design system de superficies (`surfaces.md`), con reglas, convenciones y verificación.
- El contrato de ruta y componente del save the date.
- El documento de decisiones del save the date, incluida la sección de descartados.
- Los hallazgos del recorrido funcional, con reproducción, causa y arreglo.
- PRs representativos: #17 (superficie de invitados y save the date), #18 (separación de directorios), #19 (creación del save the date) y #20 (categorías de invitados). [DECIDIR: enlazarlos solo si el repositorio llega a ser público]
