---
id: "0001"
fecha: 2026-10-19
proyecto: frontendlab
tipo: tecnica
estado: aceptada
publicar: false
revisado_privacidad: true
reemplaza: "La propuesta del informe: un archivo por decisión en docs/decisions/ de cada repo"
---

# El registro de decisiones vive en frontendlab, no en cada proyecto

**En una frase:** el registro de decisiones tiene que cubrir proyectos que no son solo míos, como wedding-platform, que es de uso y creación compartidos. Por eso decidí que las decisiones se escriban y se curen **dentro de frontendlab** y que cada proyecto solo se cite como fuente. Descarté guardarlas en cada repo. Así no le agrego elementos externos a un repo compartido y puedo dirigir lo que se publica, aceptando que la decisión publicada puede desincronizarse del código que la implementa.

## Contexto

El informe de investigación recomendaba un archivo Markdown por decisión en `docs/decisions/` de cada repo, un trailer `Decision:` en los commits y un build en frontendlab que los leyera por la API de GitHub. Ese esquema sigue la práctica de los ADR: la decisión vive junto al código.

Hay dos razones para no hacerlo así:

- wedding-platform se construye en colaboración y tiene su propio proceso. Meter carpetas, convenciones o trailers para alimentar mi portafolio sería imponer algo ajeno al proyecto.
- Lo que publico no es el registro crudo, sino una curaduría: elijo qué decisión contar, la anonimizo y la redacto para otro lector.

## Decisión

- Las fichas están en `docs/fichas/<proyecto>.md` y las decisiones sueltas en `docs/decisiones/NNNN-titulo.md`, ambas en frontendlab.
- Cada entrada cita sus fuentes (archivo, PR o commit del proyecto), sin copiar nada al repo de origen.
- Los repos de los proyectos no cambian. Sus documentos internos (especificaciones, notas, ADR) siguen siendo la fuente; frontendlab solo los lee.
- La captura es manual y dirigida: en una sesión de trabajo le digo a Claude "registra esta decisión" y se escribe aquí. No hay un recolector automático por ahora.

## Opciones consideradas

1. **Un archivo por decisión en cada repo y un build que los agrega** (lo que proponía el informe). Tiene la ventaja de que la decisión queda junto al código y no se desincroniza. Lo descarté porque invade repos compartidos.
2. **Centralizar en frontendlab** (elegida).
3. **Una herramienta externa** (Notion, Obsidian Publish). La descarté porque saca el contenido del sitio y no deja historial en git.

## Consecuencias

- **A favor:** no toca proyectos ajenos, todo el contenido está en un solo lugar y queda versionado en git. Además es más ágil, porque no hay que mantener una convención en tres repos.
- **En contra:** la decisión puede quedar desactualizada si el proyecto cambia. Lo mitigo con la fecha y el estado (`aceptada`, `superada`) en cada entrada, y citando el PR o el commit de origen.
- **Pendiente:** cuando haya tres fichas escritas a mano, volver a evaluar si vale la pena automatizar algo, por ejemplo un recordatorio semanal o una plantilla.

## Formato de cada entrada

El front matter de este archivo sirve como plantilla. El cuerpo lleva primero la frase de una línea (contexto, decisión, descarte, objetivo y coste) y luego, solo si hace falta, contexto, opciones y consecuencias.
