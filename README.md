# Habit Tracker - Santiago Joaquin Cotignola Rodriguez

Aplicación web desarrollada en Angular para crear, organizar y hacer seguimiento de hábitos. Permite registrar objetivos diarios, semanales o mensuales, controlar el estado de cada hábito, añadir progresos y consultar su historial.

## ¿Qué es este proyecto?

Habit Tracker es una aplicación de gestión personal en la que el usuario puede registrar sus hábitos y revisar su evolución. Cada hábito contiene un nombre, una categoría, un tipo de objetivo, un estado, notas y una lista de progresos.

La mecánica principal consiste en:

- Crear hábitos nuevos con información obligatoria y opcional.
- Consultar los hábitos organizados en tarjetas.
- Filtrar la lista por categoría, tipo de objetivo y texto de búsqueda.
- Ordenar los hábitos por nombre, categoría o estado.
- Registrar el progreso de un hábito indicando una fecha y un estado.
- Editar los datos de un hábito existente.
- Eliminar hábitos y registros de progreso mediante confirmación.
- Guardar los cambios en una API REST local basada en JSON Server.

## Características principales

- Listado responsive de hábitos mediante tarjetas.
- Objetivos diarios, semanales y mensuales.
- Estados de hábito: En progreso, Completado y Pausado.
- Categorías personalizadas para organizar los hábitos.
- Campo de notas con información adicional.
- Vista de detalles con el historial completo de progreso.
- Datepicker en español para registrar fechas.
- Validación para evitar fechas futuras.
- Validación para evitar dos progresos en la misma fecha.
- Confirmaciones personalizadas para actualizar y eliminar.
- Mensajes de éxito y error mediante Angular Material SnackBar.
- Filtros combinables y búsqueda textual.
- Orden ascendente y descendente por tres atributos.
- Persistencia mediante operaciones HTTP con JSON Server.
- Ejecución en navegador y empaquetado opcional con Electron.

## Tecnologías utilizadas

- Angular 20.
- TypeScript.
- RxJS.
- Angular Material.
- Bootstrap 5.
- CSS.
- JSON Server.
- Electron.
- Karma y Jasmine para pruebas unitarias.

## Requisitos previos

Necesitarás tener instalado:

- Node.js 18 o superior.
- npm.
- Angular CLI, opcionalmente instalado de forma global.
- Un navegador web actualizado.
- Electron y sus dependencias se instalarán con `npm install` si se desea ejecutar la versión de escritorio.

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Santix16/Habit-Tracker-Santiago_Joaquin_Cotignola_Rodriguez.git
cd Habit-Tracker-Santiago_Joaquin_Cotignola_Rodriguez/Habit-Tracker
```

2. Instala las dependencias de la aplicación:

```bash
npm install
```

3. Instala las dependencias del servidor local:

```bash
cd server
npm install
cd ..
```

## Scripts disponibles

| Script | Comando | Descripción |
| --- | --- | --- |
| start | `npm start` | Inicia Angular en modo desarrollo. |
| build | `npm run build` | Compila la aplicación Angular. |
| watch | `npm run watch` | Compila Angular observando los cambios. |
| test | `npm test` | Ejecuta las pruebas unitarias con Karma y Jasmine. |
| dev | `npm run dev` | Ejecuta Angular y Electron en paralelo. |
| electron | `npm run electron` | Compila y abre la aplicación con Electron. |
| package | `npm run package` | Genera el paquete de escritorio. |
| package-win | `npm run package-win` | Genera el instalador para Windows. |
| package-linux | `npm run package-linux` | Genera el paquete para Linux. |
| db | `npm run db` desde `server/` | Inicia JSON Server en el puerto 3000. |

## Cómo ejecutar la aplicación

### 1) Levantar el servidor de datos


La aplicación utiliza JSON Server con `server/db.json` como base de datos local. Desde una terminal, dentro de `Habit-Tracker/server`, ejecuta:

```bash
npm run db
```

El backend queda disponible normalmente en `http://localhost:3000` y expone los hábitos en `http://localhost:3000/habits`.

También se puede iniciar manualmente con:

```bash
npx json-server --watch db.json --port 3000
```

### 2) Iniciar la aplicación web

En otra terminal, desde la carpeta `Habit-Tracker`, ejecuta:

```bash
npm start
```

La aplicación estará disponible normalmente en `http://localhost:4200/`.

### 3) Ejecutar pruebas

Desde la carpeta `Habit-Tracker`:

```bash
npm test
```

Para ejecutar las pruebas sin modo watch:

```bash
npx ng test --watch=false
```

### 4) Ejecutar en Electron

Con Angular y el servidor de datos configurados, ejecuta:

```bash
npm run electron
```

Este comando espera a que Angular esté disponible, genera el build con una ruta relativa y abre la aplicación mediante Electron.

## Detalles de implementación, decisiones tomadas y dificultades encontradas

La aplicación está desarrollada con Angular 20 utilizando componentes standalone. La interfaz está separada en plantillas HTML, clases TypeScript y hojas de estilos CSS. La información de los hábitos se modela mediante las interfaces `Habit` y `HabitProgress`.

La persistencia está centralizada en `HabitService`, que utiliza `HttpClient` y expone operaciones para obtener, crear, actualizar y eliminar hábitos mediante JSON Server.

Las principales dificultades fueron:

- Configurar el Datepicker de Angular Material en español.
- Evitar que se registren fechas futuras.
- Evitar que un hábito tenga dos progresos en la misma fecha.
- Mantener el historial ordenado con los progresos más recientes primero.
- Combinar búsqueda, filtros por categoría y tipo, y ordenamiento.
- Actualizar la lista después de crear, editar o eliminar un hábito.
- Personalizar los estilos de Angular Material y Bootstrap para conseguir una interfaz coherente.
- Crear confirmaciones personalizadas con CSS para editar y eliminar en lugar de utilizar únicamente los cuadros nativos del navegador.
- Mantener los formularios accesibles mediante etiquetas asociadas a sus controles.

## Justificación de diseño

Las decisiones de diseño tomadas fueron:

- Utilizar una paleta basada en verdes para transmitir organización y progreso.
- Usar tonos coral y rojo para advertencias y acciones destructivas.
- Mostrar cada hábito en una tarjeta para facilitar la lectura y la comparación.
- Diferenciar los estados mediante etiquetas de color.
- Separar la información general, las notas y el historial de progreso.
- Utilizar formularios visibles y controles select para reducir errores de entrada.
- Utilizar un Datepicker para facilitar la selección de fechas válidas.
- Mostrar las confirmaciones dentro de diálogos propios con fondo atenuado.
- Usar Bootstrap para la distribución responsive y Angular Material para tarjetas, botones, campos, selects, datepicker y notificaciones.
- Mantener los textos visibles de la interfaz en español.

## Documentación técnica de los componentes visuales creados

### 1. HabitItemComponent

**Propósito:**

Mostrar un hábito dentro del listado general y permitir abrir sus detalles.

**Input:**

- `habit: Habit`: información del hábito que se va a mostrar.

**Output:**

- `onViewDetails`: solicita abrir la vista detallada del hábito.

**Funcionalidad:**

Muestra el nombre, categoría, tipo de objetivo, estado, notas y último progreso registrado. El estado se representa visualmente mediante una etiqueta de color y cuenta con un botón **Detalles**.

### 2. HabitDetail

**Propósito:**

Mostrar toda la información de un hábito y gestionar su historial de progreso.

**Input:**

- `habit: Habit`: hábito seleccionado con sus datos y progresos.

**Outputs:**

- `detailClosed`: cierra la ventana de detalles.
- `habitDeleted`: informa de que el hábito fue eliminado.
- `editRequested`: solicita abrir la ventana de edición.

**Funcionalidad:**

Permite añadir progresos con fecha y estado, valida las fechas, evita duplicados, ordena el historial y permite eliminar registros de progreso. También incluye las acciones **Editar** y **Borrar**.

### 3. HabitAddComponent

**Propósito:**

Proporcionar el componente de creación de hábitos utilizado por la pantalla principal.

**Output:**

- `onAdd`: devuelve el hábito creado al componente contenedor.

**Funcionalidad:**

El componente dispone de la estructura de creación y trabaja junto al formulario principal para enviar los datos mediante `HabitService`.

### 4. EditHabit

**Propósito:**

Editar un hábito existente mediante un formulario precargado.

**Input:**

- `habit: Habit`: datos del hábito que se desea modificar.

**Outputs:**

- `editorClosed`: cierra la ventana de edición.
- `habitSaved`: devuelve el hábito actualizado después de la confirmación.

**Funcionalidad:**

Permite cambiar nombre, categoría, tipo, estado y notas. Antes de guardar muestra una confirmación personalizada con las opciones **Volver** y **Actualizar**.

### 5. HabitsShow

**Propósito:**

Actuar como contenedor principal del listado y coordinar los formularios y ventanas de la aplicación.

**Inputs y outputs:**

No necesita inputs externos y gestiona los eventos de sus componentes hijos.

**Funcionalidad:**

Carga los hábitos desde el servicio, muestra el formulario de creación, aplica filtros y ordenamiento, abre los detalles, abre la edición y actualiza el listado después de las operaciones CRUD.

### 6. HabitFilterPipe

**Propósito:**

Filtrar los hábitos según el texto introducido en el buscador.

**Funcionalidad:**

Busca coincidencias en el nombre, la categoría, las notas, el tipo de objetivo y el estado del hábito.

## Estructura del proyecto


```text
.
├── README.md
└── Habit-Tracker/
    ├── public/                    # Recursos públicos
    ├── server/
    │   ├── db.json                # Datos locales de los hábitos
    │   └── package.json            # Configuración de JSON Server
    ├── src/
    │   ├── app/
    │   │   ├── components/        # Componentes de creación, lista, detalle y edición
    │   │   ├── interfaces/        # Interfaces Habit y HabitProgress
    │   │   ├── pipes/              # Pipe de búsqueda y filtrado
    │   │   ├── services/           # Servicio HTTP de hábitos
    │   │   ├── app.config.ts       # Configuración principal de Angular
    │   │   ├── app.routes.ts       # Rutas de la aplicación
    │   │   ├── app.ts              # Componente raíz
    │   │   ├── app.html            # Plantilla raíz
    │   │   └── app.css             # Estilos del componente raíz
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css              # Estilos globales
    ├── angular.json
    ├── main.js                     # Entrada de Electron
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.app.json
    └── tsconfig.spec.json
```

## Cómo utilizar la aplicación

1. Inicia JSON Server y la aplicación Angular.
2. Pulsa **Nuevo hábito** para mostrar el formulario.
3. Introduce un nombre y una categoría, que son obligatorios.
4. Selecciona el tipo de objetivo: diario, semanal o mensual.
5. Selecciona el estado inicial y añade notas si es necesario.
6. Pulsa **Crear hábito**.
7. Utiliza los filtros o el buscador para encontrar hábitos.
8. Ordena la lista por nombre, categoría o estado.
9. Pulsa **Detalles** para consultar el hábito seleccionado.
10. Añade un progreso indicando fecha y estado.
11. Pulsa **Editar** para modificar los datos y confirma la actualización.
12. Pulsa **Borrar** y confirma la eliminación si deseas eliminar el hábito.

## Persistencia de datos

La aplicación utiliza JSON Server como API REST local. `HabitService` centraliza las llamadas HTTP realizadas desde Angular:

- `GET /habits`: obtener todos los hábitos.
- `GET /habits/:id`: obtener un hábito por su identificador.
- `POST /habits`: crear un hábito.
- `PUT /habits/:id`: actualizar un hábito.
- `DELETE /habits/:id`: eliminar un hábito.

Los datos se guardan en `Habit-Tracker/server/db.json`. El servidor debe estar activo para que la aplicación pueda cargar y modificar la información.

## Validación de requisitos

### A. Funcionalidades esenciales

- **Listado y visualización:** los hábitos se cargan desde JSON Server y se muestran en tarjetas.
- **Añadir:** existe un formulario con validación de nombre y categoría obligatorios.
- **Editar:** se pueden modificar los datos del hábito y confirmar o cancelar la operación.
- **Eliminar:** se solicita confirmación antes de borrar el hábito.
- **Registrar progreso:** existe un formulario para añadir fecha y estado.
- **Detalles:** cada hábito dispone de una ventana con información, notas e historial.
- **Historial:** los progresos se muestran ordenados de más reciente a más antiguo.
- **Eliminar progreso:** cada registro tiene su propio botón de eliminación.
- **Sin datos:** se muestra un mensaje cuando no hay hábitos que mostrar o no hay progresos.

### B. Filtrado y ordenación

- **Categoría:** permite seleccionar una categoría existente.
- **Tipo:** permite filtrar por objetivo diario, semanal o mensual.
- **Búsqueda:** permite buscar texto en los datos del hábito.
- **Limpiar filtros:** elimina la categoría, el tipo y el texto de búsqueda.
- **Ordenación:** permite ordenar ascendente y descendentemente por nombre, categoría y estado.

### C. Persistencia

- **Servicio:** `HabitService` centraliza las operaciones de datos.
- **Operaciones asíncronas:** las llamadas se realizan mediante observables de RxJS.
- **API REST simulada:** JSON Server proporciona los endpoints locales.
- **Operaciones CRUD:** se utilizan peticiones `GET`, `POST`, `PUT` y `DELETE`.
- **Feedback:** la interfaz muestra notificaciones para las operaciones y errores de conexión.

## Pruebas realizadas y resultados obtenidos

### 1. Listado y visualización de hábitos

**Prueba:** iniciar el servidor de datos y abrir la aplicación.

**Resultado:** los hábitos de `db.json` se muestran con nombre, categoría, objetivo, estado, notas y progreso.

### 2. Creación de hábitos

**Prueba:** crear un hábito con todos los campos completos.

**Resultado:** el hábito se añade al listado y se muestra una notificación de éxito.

**Prueba:** intentar crear un hábito sin nombre o categoría.

**Resultado:** la operación se detiene y se muestra un mensaje indicando que los campos son obligatorios.

### 3. Filtros y ordenamiento

**Prueba:** combinar categoría, tipo y búsqueda de texto.

**Resultado:** el listado se actualiza mostrando únicamente los hábitos coincidentes.

**Prueba:** ordenar por nombre, categoría y estado en ambas direcciones.

**Resultado:** los botones alternan entre orden ascendente y descendente.

### 4. Registro de progreso

**Prueba:** añadir un progreso con una fecha válida.

**Resultado:** el registro aparece en el historial ordenado por fecha.

**Prueba:** añadir una fecha futura o repetir una fecha existente.

**Resultado:** la aplicación rechaza la operación y muestra una notificación informativa.

### 5. Edición y eliminación

**Prueba:** editar un hábito y cancelar la confirmación.

**Resultado:** la ventana se cierra sin emitir el guardado.

**Prueba:** confirmar la edición o eliminar un hábito.

**Resultado:** se ejecuta la operación correspondiente y se actualiza la interfaz.

## Créditos

Proyecto desarrollado por Santiago Joaquin Cotignola Rodriguez como práctica de Angular, formularios, consumo de una API REST, persistencia con JSON Server, diseño responsive y empaquetado con Electron.
