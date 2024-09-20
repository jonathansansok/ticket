<div id="modalmantenimiento" class="modal fade bd-example-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="modal-close" data-dismiss="modal" aria-label="Close">
                    <i class="font-icon-close-2"></i>
                </button>
                <h4 class="modal-title" id="mdltitulo"></h4>
            </div>
            <form method="post" id="usuario_form">
                <div class="modal-body">
                    <input type="hidden" id="usu_id" name="usu_id">

                    <div class="form-group">
                        <label class="form-label" for="usu_nom">Nombre y apellido</label>
                        <input type="text" class="form-control" id="usu_nom" name="usu_nom" placeholder="Ingrese Nombre y apellido" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="usu_ape">Sección</label>
                        <select class="form-control" id="usu_ape" name="usu_ape" required>
                            <option value="">Seleccionar</option>
                            <option value="Dirección">Dirección</option>

                            <option value="Encargado General">Encargado General</option>
                            <option value="Dpto. de Reunión">Dpto. de Reunión</option>
                            <option value="Dpto. de Análisis">Dpto. de Análisis</option>
                            <option value="Dpto. de Riesgo">Dpto. de Riesgo</option>
                            <option value="Div. Seg. y Contr.">Div. Seg. y Contr.</option>
                            <option value="Sección R.R. H.H.">Sección R.R. H.H.</option>
                            <option value="Div. Administrativa">Div. Administrativa</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="usu_correo">Usuario</label>
                        <input type="email" class="form-control" id="usu_correo" name="usu_correo" placeholder="Ingrese usuario" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="usu_pass">Contraseña</label>
                        <input type="text" class="form-control" id="usu_pass" name="usu_pass" placeholder="************" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="rol_id">Rol</label>
                        <select class="select2" id="rol_id" name="rol_id">
                            <option value="1">Usuario</option>
                            <option value="2">Soporte</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="usu_telf">Teléfono de Sección</label>
                        <input type="text" class="form-control" id="usu_telf" name="usu_telf" placeholder="Ingrese Teléfono de Sección" required>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-rounded btn-default" data-dismiss="modal">Cerrar</button>
                    <button type="submit" name="action" id="#" value="add" class="btn btn-rounded btn-primary">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>