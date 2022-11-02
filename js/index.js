/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function() {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider() {
    $("#rangoPrecio").ionRangeSlider({
        type: "double",
        grid: false,
        min: 0,
        max: 100000,
        from: 200,
        to: 80000,
        prefix: "$"
    });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll() {
    var ultimoScroll = 0,
        intervalRewind;
    var video = document.getElementById('vidFondo');
    $(window)
        .scroll((event) => {
            var scrollActual = $(window).scrollTop();
            if (scrollActual > ultimoScroll) {

            } else {
                //this.rewind(1.0, video, intervalRewind);
                // video.play();
            }
            ultimoScroll = scrollActual;
        })
        .scrollEnd(() => {
            //video.pause();
        }, 10)
}

inicializarSlider();
playVideoOnScroll();

async function cargarCombos() {
    let datos = await fetchData('data-1.json');
    let i
    let ciudades = new Array()
    let tipos = new Array()
    for (i in datos) {
        //validacion para llenar el array ciudades solo con las diferentes ciudades 
        if (!ciudades.includes(datos[i]['Ciudad'])) {
            ciudades.push(datos[i]['Ciudad'])
        } //validacion para llenar el array tipos solo con las diferentes tipos 
        if (!tipos.includes(datos[i]['Tipo'])) {
            tipos.push(datos[i]['Tipo'])
        }
    }

    //recorrer array de ciudades para llenar el combo

    for (j in ciudades) {
        $("#selectCiudad").append(`<option value="${ciudades[j]}">${ciudades[j]}</option>`)
        $("#lstCiudad").append(`<option value="${ciudades[j]}">${ciudades[j]}</option>`)
    } //recorrer array de tipos para llenar el combo
    for (l in tipos) {
        $("#selectTipo").append(`<option value="${tipos[l]}">${tipos[l]}</option>`)
        $("#lstTipo").append(`<option value="${tipos[l]}">${tipos[l]}</option>`)
    }
}

//funcion que hace el carga de los datos 
async function cargarDatosGenerales() {

    $("#contenido").html('')

    let datos = await fetchData('data-1.json');
    let i
    let tabla = ``;
    let selectCiudad = $("#selectCiudad").val();
    let selectTipo = $("#selectTipo").val();
    let ciudades = new Array()
    let tipos = new Array()
    tabla += `<table class="content-table"> `;

    //recorrer lista de datos que llegan del json

    if (selectCiudad == "" && selectTipo == "") {
        for (i in datos) {
            ciudades.push(datos[i]['Ciudad'])
            tabla += `
                <tr>
                  <td>
                    <img src="img/home.jpg" width="200" height="150">
                  </td>
                  <td>
                    Direccion: ${datos[i]['Direccion']}<input type="hidden" value=" ${datos[i]['Direccion']}" id="direccion${i}"><br>
                    Ciudad: ${datos[i]['Ciudad']}<input type="hidden" value=" ${datos[i]['Ciudad']}" id="ciudad${i}"><br>
                    Telefono: ${datos[i]['Telefono']}<input type="hidden" value=" ${datos[i]['Telefono']}" id="telefono${i}"><br>
                    Codigo Postal: ${datos[i]['Codigo_Postal']}<input type="hidden" value=" ${datos[i]['Codigo_Postal']}" id="codPostal${i}"><br>
                    Tipo: ${datos[i]['Tipo']}<input type="hidden" value=" ${datos[i]['Tipo']}" id="tipo${i}"><br>
                    Precio: ${datos[i]['Precio']}<input type="hidden" value=" ${datos[i]['Precio']}" id="precio${i}"><br>
                    <input type="button" value="Guardar" onclick="guardarBienes(${i},${datos[i]['Id']})">
                  </td>
                </tr>`;
        }
    } else {
        let nuevo = datos.filter(lista => lista.Ciudad == selectCiudad && lista.Tipo == selectTipo)
        for (j in nuevo) {
            tabla += ` <tr>
                        <td>
                            <img src="img/home.jpg" width="200" height="150">
                        </td>
                        <td>
                            Direccion: ${nuevo[j]['Direccion']}<input type="hidden" value=" ${nuevo[j]['Direccion']}" id="direccion${j}"><br>
                            Ciudad: ${nuevo[j]['Ciudad']}<input type="hidden" value=" ${nuevo[j]['Ciudad']}" id="ciudad${j}"><br>
                            Telefono: ${nuevo[j]['Telefono']}<input type="hidden" value=" ${nuevo[j]['Telefono']}" id="telefono${i}"><br>
                            Codigo Postal: ${nuevo[j]['Codigo_Postal']}<input type="hidden" value=" ${nuevo[j]['Codigo_Postal']}" id="codPostal${j}"><br>
                            Tipo: ${nuevo[j]['Tipo']}<input type="hidden" value=" ${nuevo[j]['Tipo']}" id="tipo${j}"><br>
                            Precio: ${nuevo[j]['Precio']}<input type="hidden" value=" ${nuevo[j]['Precio']}" id="precio${j}"><br>
                            <input type="button" value="Guardar" onclick="guardarBienes(${j},${nuevo[j]['Id']})">
                        </td>
                        </tr>`;
        }

    }


    tabla += ` </table>`;
    $("#contenido").html(tabla)

}



async function fetchData(URL) {
    try {
        let response = await fetch(URL);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("Entró al catch");
        console.error(error);
    }
}

function guardarBienes(i, Id) {
    let direccion = $("#direccion" + i).val();
    let ciudad = $("#ciudad" + i).val();
    let telefono = $("#telefono" + i).val();
    let codPostal = $("#codPostal" + i).val();
    let tipo = $("#tipo" + i).val();
    let precio = $("#precio" + i).val();
    $.ajax({
        async: true,
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controllers/controlador.php",
        data: { tipConsulta: 1, Id: Id, direccion: direccion, ciudad: ciudad, telefono: telefono, codPostal: codPostal, tipo: tipo, precio: precio },
        success: function(datos) {
            if (datos == 1) {
                alert("el registro se guardo con exito")
            } else if (datos == 2) {

                alert("el registro se edito con exito")
            } else {

                alert("ocurrio un error")
            }
        }
    });

}

function consultarBienes() {

    $("#contenidoGuardado").html('')
    $.ajax({
        async: true,
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controllers/controlador.php",
        data: { tipConsulta: 2 },
        success: function(datos) {
            var i = 0;
            var lista = $.parseJSON(datos);
            let tabla = ``;
            tabla += `<table class="content-table"> `;
            for (i in lista) {
                tabla += `<tr>
                                    <td>
                                        <img src="img/home.jpg" width="200" height="150">
                                    </td>
                                    <td>
                                        Direccion: ${lista[i]['direccion']}<br>
                                        Ciudad: ${lista[i]['ciudad']}<br>
                                        Telefono: ${lista[i]['telefono']}<br>
                                        Codigo Postal: ${lista[i]['codigo_postal']}<br>
                                        Tipo: ${lista[i]['tipo']}<br>
                                        Precio: ${lista[i]['precio']}<br>
                                        <input type="button" value="Eliminar" onclick="eliminarBienes(${lista[i]['id']})">
                                    </td>
                                    </tr>`;
            }

            tabla += ` </table>`;
            $("#contenidoGuardado").html(tabla)
        }
    });
}

function eliminarBienes(id) {

    $.ajax({
        async: true,
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        url: "controllers/controlador.php",
        data: { tipConsulta: 3, id: id },
        success: function() {
            alert("el registro se elimino con exito")
            consultarBienes()

        }
    });

}

function reportesBienes() {
    let ciudad = $("#lstCiudad").val();
    let tipo = $("#lstTipo").val();
    window.location = ('controllers/controlador.php?tipConsulta=4&ciudad=' + ciudad + '&tipo=' + tipo + '');
}