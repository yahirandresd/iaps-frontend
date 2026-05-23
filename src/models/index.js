/**
 * @typedef {'CC'|'CE'|'TI'} TipoDocumento
 * @typedef {'contributivo'|'subsidiado'|'especial'} Regimen
 * @typedef {'green'|'orange'|'red'|'gray'|'blue'} StatusCls
 */

/**
 * @typedef {Object} User
 * @property {string}        nombre
 * @property {string}        initials
 * @property {TipoDocumento} tipoDoc
 * @property {string}        cedula
 * @property {string}        bday
 * @property {number}        edad
 * @property {string}        phone
 * @property {string}        email
 * @property {string}        eps
 * @property {Regimen}       regimen
 * @property {string}        ips
 * @property {string}        ipsDir
 * @property {string}        afiliado
 * @property {string}        emergContacto
 * @property {string}        emergTel
 */

/**
 * @typedef {Object} EstadoItem
 * @property {string}    label
 * @property {StatusCls} cls
 * @property {string}    [key]
 */

/**
 * @typedef {Object} Cita
 * @property {string}     id
 * @property {string}     tipo
 * @property {string}     medico
 * @property {string}     fecha
 * @property {string}     hora
 * @property {string}     lugar
 * @property {string}     [direccion]
 * @property {EstadoItem} estado
 */

/**
 * @typedef {Object} Autorizacion
 * @property {string}     id
 * @property {string}     tipo
 * @property {string}     solicitada
 * @property {string}     medico
 * @property {string}     radicado
 * @property {EstadoItem} estado
 * @property {string}     [motivo]
 */

/**
 * @typedef {Object} Medicamento
 * @property {string}  id
 * @property {string}  nombre
 * @property {string}  presentacion
 * @property {string}  indicacion
 * @property {string}  farmacia
 * @property {string}  disponible
 * @property {string}  vence
 * @property {boolean} alerta
 */

/**
 * @typedef {Object} RegistroHistorial
 * @property {string} id
 * @property {string} tipo
 * @property {string} medico
 * @property {string} fecha
 * @property {string} diagnostico
 * @property {string} resumen
 * @property {string} simple
 */

/**
 * @typedef {Object} CitasResponse
 * @property {Cita[]} proximas
 * @property {Cita[]} pasadas
 * @property {Cita[]} canceladas
 */

/**
 * @typedef {Object} LoginPayload
 * @property {string} cedula
 * @property {string} fechaExp
 * @property {string} password
 */

/**
 * @typedef {Object} RegisterPayload
 * @property {TipoDocumento} docType
 * @property {string}        numDoc
 * @property {string}        docDate
 * @property {string}        nombre
 * @property {string}        bday
 * @property {string}        gender
 * @property {string}        phone
 * @property {string}        email
 * @property {string}        eps
 * @property {Regimen}       regimen
 * @property {string}        [ips]
 * @property {string}        pwd
 */
