function copiarFormulario() {
    var tempTextArea = document.createElement("textarea");
    var titulo = $('#tick_titulo').val();
    var categoria = $('#cat_id option:selected').text();
    var subcategoria = $('#cats_id option:selected').text();
    var prioridad = $('#prio_id option:selected').text();
    var descripcion = $('#tick_descrip').summernote('code').replace(/<[^>]+>/g, '');
    var div = $('#tick_div').val();
    var correo = $('#usu_correo').val(); // Obtener el correo del input oculto
    // Obtener la fecha y hora actual
    var fecha = new Date();
    var dia = String(fecha.getDate()).padStart(2, '0');
    var mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    var anio = fecha.getFullYear();

    // Formatear la hora
    var horas = String(fecha.getHours()).padStart(2, '0');
    var minutos = String(fecha.getMinutes()).padStart(2, '0');
    var segundos = String(fecha.getSeconds()).padStart(2, '0');

    var fecha_formateada = dia + '/' + mes + '/' + anio; // Formato dd/mm/yyyy
    var hora_formateada = horas + ':' + minutos + ':' + segundos; // Formato HH:mm:ss

    var contenido = "💻🔧 *[Solicitud de reparación]*\n" +  // Título de solicitud de reparación
                    "*Fecha y hora*: " + fecha_formateada + " " + hora_formateada + "\n" +  // Agrega la fecha y hora formateadas
                    "*Sección*: " + div + "\n" +  // Ícono de herramienta y computadora
                    "*Título*: " + titulo + "\n" +  // Ícono de herramienta y computadora
                    "*Categoría*: " + categoria + "\n" +
                    "*Subcategoría*: " + subcategoria + "\n" +
                    "*P.C.*: " + prioridad + "\n" +
                    "*Usuario*: " + correo + "\n" +
                    "*Descripción*: " + descripcion;
                    
    tempTextArea.value = contenido;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);

    alert("Formulario copiado correctamente!");
}

function init() {
    $("#ticket_form").on("submit", function(e) {
        guardaryeditar(e);
    });

    // Agrega el evento para el botón copiar
    $("#btncopiar").click(function() {
        copiarFormulario();
    });
}

$(document).ready(function() {
    /* TODO: Inicializar SummerNote */
    $('#tick_descrip').summernote({
        height: 150,
        lang: "es-ES",
        popover: {
            image: [],
            link: [],
            air: []
        },
        callbacks: {
            onImageUpload: function(image) {
                console.log("Image detect...");
                myimagetreat(image[0]);
            },
            onPaste: function (e) {
                console.log("Text detect...");
            }
        },
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ]
    });

    /* TODO: Llenar Combo categoria */
    $.post("../../controller/categoria.php?op=combo", function(data, status) {
        $('#cat_id').html(data);
    });

    $("#cat_id").change(function() {
        cat_id = $(this).val();
        /* TODO: llenar Combo subcategoria segun cat_id */
        $.post("../../controller/subcategoria.php?op=combo", {cat_id: cat_id}, function(data, status) {
            $('#cats_id').html(data);
        });
    });

    /* TODO: Llenar combo Prioridad */
    $.post("../../controller/prioridad.php?op=combo", function(data, status) {
        $('#prio_id').html(data);
    });

    init();  // Llamamos a init aquí para inicializar todo
});

function guardaryeditar(e) {
    e.preventDefault();

    $('#btnguardar').prop("disabled", true);
    $('#btnguardar').html('<i class="fa fa-spinner fa-spin"></i> Espere..');

    /* TODO: Array del form ticket */
    var formData = new FormData($("#ticket_form")[0]);
    /* TODO: validamos si los campos tienen informacion antes de guardar */
    if ($('#tick_descrip').summernote('isEmpty') || $('#tick_titulo').val() == '' || $('#cats_id').val() == 0 || $('#cat_id').val() == 0 || $('#prio_id').val() == 0) {
        swal("Advertencia!", "Campos Vacios", "warning");
    } else {
        var totalfiles = $('#fileElem').val().length;
        for (var i = 0; i < totalfiles; i++) {
            formData.append("files[]", $('#fileElem')[0].files[i]);
        }

        /* TODO: Guardar Ticket */
        $.ajax({
            url: "../../controller/ticket.php?op=insert",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                console.log(data);
                data = JSON.parse(data);
                console.log(data[0].tick_id);

                /* TODO: Limpiar campos */
                $('#tick_titulo').val('');
                $('#tick_descrip').summernote('reset');
                /* TODO: Alerta de Confirmacion */
                swal("Correcto!", "Ticket Registrado Correctamente: Nro-" + data[0].tick_id, "success");

                $('#btnguardar').prop("disabled", false);
                $('#btnguardar').html('Guardar');
            }
        });
    }
}