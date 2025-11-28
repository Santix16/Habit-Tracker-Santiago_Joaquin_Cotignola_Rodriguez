# Proyecto: Habit Tracker

Alumno: Santiago Joaquin Cotignola Rodriguez

# Detalles de implementación, decisiones tomadas y dificultades encontradas

La aplicación la hice con Angular 20, usando componentes separados para el HTML, TypeScript y CSS, y un servicio para guardar los datos usando json-server.
Los datos se organizan con las interfaces Habit y HabitProgress, así todo está consistente en la app.

Para el diseño usé Bootstrap y algo de Angular Material, intentando que fuera fácil de leer y simple de usar.
Toda la lógica de CRUD está en un servicio con HttpClient, así los cambios se reflejan en la lista de hábitos en tiempo real.

Dificultades que me encontré:

    -Manejar el Datepicker y que no deje meter fechas futuras.

    -Que la lista se actualice correctamente cuando modificas los progresos.

    -Personalizar los estilos de Angular Material (inputs, selects) para que se parezcan al diseño.

    -Ordenar y filtrar datos y que siga funcionando bien con ambos.

    -Hacer las pestañas de detalles y editar hábito dentro del componente habit-show.

# Justificación de diseño

Las decisiones de diseño que tomé fueron:

    -Usar contraste alto para que se vea bien todo, tanto los inputs como las tarjetas.

    -Botones grandes y diferentes (Añadir, Editar, Borrar) para que sea difícil equivocarse.

    -Tener una distribución clara en secciones: información, notas, progreso e historial.

    -Elegir componentes que ayudan al usuario:

        -Datepicker así no hay errores con las fechas.

        -Selects para estado y categoría que evita que se escriba texto incorrecto.

    -Mensajes con Toast para avisar de acciones sin molestar al usuario.

    -Usar Bootstrap para que la interfaz sea flexible y responsive.


# Documentación técnica de los componentes visuales creados

1. HabitItem

Propósito:
Mostrar un hábito en el listado general y permitir ver los detalles rápido.

Inputs:

    -habit: Habit → información del hábito que se va a mostrar.

Outputs:

    -onSelect: se dispara al pulsar el botón “Detalles” para abrir la vista del hábito.

Funcionalidad:
Muestra una tarjeta con nombre, categoría, tipo de objetivo, estado, notas y último progreso. Incluye botón para abrir los detalles.

2. HabitDetail

Propósito:
Ver toda la información de un hábito seleccionado y gestionar su progreso.

Inputs:

    -habit: Habit → hábito completo con sus progresos.

Outputs:

    -onEdit: abre el formulario para editar el hábito.

    -onDelete: elimina el hábito definitivamente.

Eventos internos:

    -Añadir o eliminar progreso.

Funcionalidad:
Muestra tipo, categoría, estado, notas y el historial de progreso. Permite añadir nuevos registros y eliminar los existentes.

3. HabitAdd

Propósito:
Crear un hábito nuevo mediante un formulario.

Inputs:

    -Ninguno.

Outputs:

    -onCreate: devuelve el hábito creado.

    -onCancel: cierra el formulario sin guardar.

Funcionalidad:
Formulario para nombre, categoría, tipo de objetivo, estado y notas. Valida campos obligatorios y devuelve el hábito al componente padre.

4. HabitEdit

Propósito:
Editar un hábito existente.

Inputs:

    -habit: Habit → datos del hábito para pre-rellenar el formulario.

Outputs:

    -onUpdate: devuelve el hábito actualizado.

    -onCancel: cierra la edición sin aplicar cambios.

Funcionalidad:
Formulario igual al de creación, pero con datos cargados. Permite modificar nombre, tipo, estado, categoría y notas. Al confirmar, envía los cambios al componente padre.

5. HabitShow

Propósito:
Mostrar todos los hábitos y gestionar la navegación entre componentes (listar, añadir, editar, ver detalles).

Inputs:

    -Ninguno (recibe datos del servicio).

Outputs:

    -Ninguno directo (actúa como contenedor).

Funcionalidad:
Carga hábitos del servicio y los muestra usando HabitItemComponent. Gestiona acciones para:

    -Abrir un hábito en detalle.

    -Mostrar formulario de añadir.

    -Mostrar formulario de edición.

    -Actualizar o eliminar hábitos.

Es el componente principal que organiza la interfaz y conecta los demás componentes.

# Instrucciones para ejecutar la aplicación

1. Requisitos previos

Antes de ejecutar la app, asegúrate de tener instalado:

    -Node.js (v16 o superior)

    -npm (viene con Node)

    -Angular CLI

Para instalar Angular CLI globalmente:

    -npm install -g @angular/cli

2. Instalar dependencias del proyecto

Dentro de la carpeta principal del proyecto Angular:

    -npm install


Esto instalará todas las dependencias necesarias, incluyendo Angular Material y Electron.

3. Ejecutar el servidor JSON (json-server)

Dentro de la carpeta server/:

Instala las dependencias del servidor:

    -cd server
    -npm install


Inicia el servidor:

    -npm run db


El servidor se ejecutará en: http://localhost:3000/

Usará el archivo db.json como base de datos.

4. Ejecutar la aplicación Angular

En otra terminal, dentro de la carpeta principal del proyecto:

    -ng serve


La app se abrirá en: http://localhost:4200/

5. Ejecutar la aplicación en Electron

Si quieres abrirla como aplicación de escritorio:

    -npm run electron


Esto empaqueta la app Angular y la lanza en un entorno de escritorio.

# Validación de Requisitos.

Se cumplen los siguientes requisitos:

A. Funcionalidades Esenciales
Listado y Visualización: El listado debe actualizarse automáticamente con los cambios. El estado/progreso del hábito debe representarse visualmente con colores y/o iconos.
Añadir/Editar: Mostrará un formulario que debe ser validado y debe mostrar los errores.
La edición debe permitir cancelar y, si hay cambios, pedir confirmación al usuario.
Eliminar: Debe pedir confirmación al usuario antes de eliminar un elemento (hábito o progreso)
Cambiar Estado/Registrar: Debe haber un mecanismo simple para registrar el progreso diario o cambiar el estado del hábito.
Detalles: Al seleccionar un hábito, se debe desplegar una vista detallada con toda la información, incluyendo el historial de progreso.
Incluir Botones para "Editar" y "Borrar" el hábito.
Debe mostrar un formulario para agregar un nuevo progreso.
El historial de progresos debe mostrarse siempre ordenado, los más recientes primero.
Cada elemento de progreso incluirá un botón que permita borrarlo.
Sin Datos: Si no hay hábitos registrados, o no hay progresos dentro de un hábito, se debe mostrar un mensaje adecuado e instrucciones para añadir el primer hábito.

B. Filtrado y Ordenación
Filtros: Se deben poder combinar varios filtros: por Categoría, Tipo de Hábito, y Búsqueda textual (filtrando si el texto está contenido en el name o notes).
Debe existir un botón para limpiar filtros.
Si no hay resultados tras aplicar los filtros, se debe mostrar un mensaje adecuado.
Ordenar: Los elementos deben ser ordenables en orden ascendente y descendente por, al menos, tres atributos (ej. Nombre, Categoría y Estado).

C. Persistencia (API REST Simulada)
El almacenamiento se realiza mediante json-server (simulando una conexión asíncrona a la base de datos):

Servicio: Se deberá implementar un servicio de Angular para centralizar las llamadas al almacenamiento de datos.
Operaciones Asíncronas: Las operaciones de persistencia (C/R/U/D) deben realizarse en segundo plano, sin bloquear la interfaz.
Feedback: Se debe mostrar un mensaje de éxito o error después de cada operación de persistencia (leer, crear, modificar y borrar).
Llamadas HTTP: La aplicación Angular debe utilizar HttpClient para realizar peticiones (GET, POST, PUT/PATCH, DELETE) para gestionar los datos.

# Pruebas realizadas y resultados obtenidos.

1. Listado y visualización de hábitos

1.1 Prueba: Abrir la aplicación.
    Resultado: Todos los hábitos del db.json se muestran correctamente con nombre, categoría, tipo de objetivo, estado, notas y progreso histórico.

1.2 Prueba: Abrir un hábito con historial vacío.
    Resultado: Muestra mensaje “No hay progresos” o equivalente.

1.3 Prueba: Revisar colores e iconos de estado y progreso.
    Resultado: Visualmente consistente según diseño; textos y botones visibles.

2. Añadir hábito

2.1 Prueba: Crear un nuevo hábito con todos los campos completos.
    Resultado: Hábito aparece en el listado; mensaje de éxito visible.

2.2 Prueba: Crear un hábito con campos obligatorios vacíos.
    Resultado: Formulario no se envía; se muestran mensajes de error.

2.3 Prueba: Crear un hábito con caracteres excediendo límite.
    Resultado: Formulario no permite guardar; muestra mensaje de validación.

3. Editar hábito

3.1 Prueba: Modificar un hábito existente y pulsar “Guardar”.
    Resultado: Aparece confirmación: “¿Estás seguro de querer actualizar este hábito?”. Cambios reflejados en el listado.

3.2 Prueba: Pulsar “Cancelar” durante edición.
    Resultado: Ningún cambio aplicado; datos originales conservados.

3.3 Prueba: Editar y dejar campos inválidos.
    Resultado: Formulario no permite guardar; muestra mensajes de error.

4. Eliminar hábito

4.1 Prueba: Pulsar “Borrar” en un hábito.
    Resultado: Aparece confirmación. Tras confirmar, hábito desaparece del listado y aparece mensaje de éxito.

4.2 Prueba: Cancelar eliminación.
    Resultado: Hábito permanece en el listado; no hay cambios.

5. Añadir progreso

5.1 Prueba: Agregar progreso con fecha válida y estado seleccionado.
    Resultado: Se agrega al historial, mantiene orden descendente; toast de confirmación visible.

5.2 Prueba: Agregar progreso con fecha futura.
    Resultado: Formulario no permite guardar; mensaje de error visible.

5.3 Prueba: Agregar progreso a hábito sin historial previo.
    Resultado: Progreso se agrega correctamente; mensaje de éxito visible; historial ahora muestra al menos un elemento.

6. Eliminar progreso

6.1 Prueba: Borrar un progreso de un hábito.
    Resultado: Progreso desaparece del historial; toast de confirmación visible.

6.2 Prueba: Cancelar la eliminación.
    Resultado: Progreso permanece; historial intacto.

7. Filtrado y ordenación

7.1 Prueba: Filtrar por categoría.
    Resultado: Listado solo muestra hábitos de la categoría seleccionada.

7.2 Prueba: Filtrar por tipo de hábito.
    Resultado: Listado solo muestra hábitos con ese tipo de objetivo.

7.3 Prueba: Búsqueda textual (nombre o notas).
    Resultado: Listado muestra hábitos que contienen el texto buscado; si no hay coincidencias, mensaje visible.

7.4 Prueba: Combinar filtros (categoría + tipo + búsqueda).
    Resultado: Listado refleja correctamente todos los filtros aplicados.

7.5 Prueba: Ordenar por nombre, categoría o estado ascendente y descendente.
    Resultado: Listado se reorganiza correctamente según el criterio y dirección seleccionados.

7.6 Prueba: Limpiar filtros.
    Resultado: Listado vuelve a mostrar todos los hábitos.

8. Cambiar estado del hábito

8.1 Prueba: Cambiar el estado de un hábito (In Progress, Completed, Paused).
    Resultado: Estado se actualiza en la lista y en detalles; mensaje de éxito visible.

9. Visualización de detalles del hábito

9.1 Prueba: Seleccionar un hábito para ver detalles.
    Resultado: Se muestra toda la información, incluyendo notas y progreso histórico; botón “Editar” y “Borrar” visibles.

10. Validación de campos

10.1 Prueba: Campos obligatorios vacíos al guardar hábito o progreso.
     Resultado: Mensajes de error visibles; no se guardan datos.

10.2 Prueba: Campos con límite de caracteres excedido.
     Resultado: Formulario no permite guardar; mensaje de validación visible.

10.3 Prueba: Fecha inválida o futura.
     Resultado: No se permite guardar; mensaje de error visible.

11. Mensajes y toast

11.1 Prueba: Realizar acciones CRUD.
     Resultado: Toasts aparecen correctamente al crear, editar o eliminar hábitos/progreso; desaparecen automáticamente.

