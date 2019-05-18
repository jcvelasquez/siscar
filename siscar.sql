-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2019 a las 19:43:33
-- Versión del servidor: 10.1.36-MariaDB
-- Versión de PHP: 7.2.10

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `siscar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adjuntos_contratos`
--

CREATE TABLE `adjuntos_contratos` (
  `idadjuntos_contratos` int(11) NOT NULL,
  `contratos_idcontratos` int(11) NOT NULL,
  `archivo_contrato` varchar(250) DEFAULT NULL,
  `size_archivo_contrato` int(11) DEFAULT NULL,
  `estado_adjunto` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `adjuntos_contratos`
--

INSERT INTO `adjuntos_contratos` (`idadjuntos_contratos`, `contratos_idcontratos`, `archivo_contrato`, `size_archivo_contrato`, `estado_adjunto`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 18, 'CONTRATO0132016SE.pdf', 354086, 1, '2017-06-14 18:42:57', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adjuntos_evaluaciones`
--

CREATE TABLE `adjuntos_evaluaciones` (
  `idadjuntos_evaluaciones` int(11) NOT NULL,
  `idevaluaciones_x_servicios` int(11) NOT NULL,
  `archivo_evaluacion` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adjuntos_factura`
--

CREATE TABLE `adjuntos_factura` (
  `idadjuntos_factura` int(11) NOT NULL,
  `facturas_idfacturas` int(11) NOT NULL,
  `archivo_factura` varchar(250) DEFAULT NULL,
  `size_archivo_factura` int(11) DEFAULT NULL,
  `estado_adjunto` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adjuntos_ordenes_compra`
--

CREATE TABLE `adjuntos_ordenes_compra` (
  `idadjuntos_ordenes_compra` int(11) NOT NULL,
  `ordenes_compra_idordenes_compra` int(11) NOT NULL,
  `archivo_oc` varchar(250) DEFAULT NULL,
  `size_archivo_oc` int(11) DEFAULT NULL,
  `estado_adjunto` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adjuntos_usuarios`
--

CREATE TABLE `adjuntos_usuarios` (
  `idadjuntos_usuarios` int(11) NOT NULL,
  `usuarios_idusuarios` int(11) NOT NULL,
  `adjunto_usuario` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adjuntos_vehiculos`
--

CREATE TABLE `adjuntos_vehiculos` (
  `idadjuntos_vehiculos` int(11) NOT NULL,
  `vehiculos_idvehiculos` int(11) NOT NULL,
  `archivo_vehiculo` blob,
  `size_archivo_vehiculo` int(11) DEFAULT NULL,
  `isImage` int(11) DEFAULT NULL,
  `estado_adjunto` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `adjuntos_vehiculos`
--

INSERT INTO `adjuntos_vehiculos` (`idadjuntos_vehiculos`, `vehiculos_idvehiculos`, `archivo_vehiculo`, `size_archivo_vehiculo`, `isImage`, `estado_adjunto`, `fecha_creacion`, `usuario_creacion`) VALUES
(1, 1, 0x3032362e6a706567, 51805, NULL, 1, '2017-06-27 09:48:37', ''),
(2, 1, 0x3032362e312e6a706567, 75204, NULL, 1, '2017-06-27 09:48:38', ''),
(3, 1, 0x3032362e322e6a706567, 88220, NULL, 1, '2017-06-27 09:48:38', ''),
(4, 1, 0x3032362e332e6a706567, 56357, NULL, 1, '2017-06-27 09:48:38', ''),
(5, 8, 0x3330352e6a706567, 57311, NULL, 1, '2017-06-27 09:53:04', ''),
(6, 8, 0x3330352e322e6a706567, 76797, NULL, 1, '2017-06-27 09:53:05', ''),
(7, 8, 0x3330352e332e6a706567, 114249, NULL, 1, '2017-06-27 09:53:05', ''),
(8, 14, 0x3936392e312e6a706567, 82255, NULL, 1, '2017-06-27 09:53:32', ''),
(9, 14, 0x3936392e322e6a706567, 71316, NULL, 1, '2017-06-27 09:53:32', ''),
(10, 14, 0x3936392e332e6a706567, 60061, NULL, 1, '2017-06-27 09:53:32', ''),
(11, 14, 0x3936392e6a706567, 107687, NULL, 1, '2017-06-27 09:53:32', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `idareas` int(11) NOT NULL,
  `sedes_idsedes` int(11) NOT NULL,
  `nombre_area` varchar(250) DEFAULT NULL,
  `prioridad_area` int(11) DEFAULT NULL,
  `estado_area` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`idareas`, `sedes_idsedes`, `nombre_area`, `prioridad_area`, `estado_area`) VALUES
(1, 9, 'OFICINA DE ASESORÃA JURÃDICA', 1, 1),
(2, 9, 'PRESIDENCIA EJECUTIVA', 1, 1),
(4, 9, 'GERENCIA GENERAL', 1, 1),
(5, 9, 'OFICINA DE ADMINISTRACIÃ“N', 1, 1),
(8, 9, 'OFICINA DE PLANEAMIENTO PRESUPUESTO Y MODERNIZACIÃ“N', 1, 1),
(9, 9, 'OFICINA DE MONITOREO Y EVALUACION', 1, 1),
(10, 9, 'DIRECCIÃ“N DE DESARROLLO DE PLANES DE NEGOCIO Y PROYECTOS PRODUCTIVOS', 1, 1),
(11, 9, 'DIRECCIÃ“N DE FOMENTO Y DESARROLLO DE NEGOCIOS', 1, 1),
(12, 9, 'DIRECCIÃ“N DE EMPRENDIMIENTO INVERSIÃ“N E INNOVACION', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chofer`
--

CREATE TABLE `chofer` (
  `idchofer` int(11) NOT NULL,
  `sedes_idsedes` int(11) NOT NULL,
  `vehiculos_idvehiculos` int(11) DEFAULT NULL,
  `nombres_chofer` varchar(100) DEFAULT NULL,
  `apellidos_chofer` varchar(100) DEFAULT NULL,
  `idtipo_identificacion` int(11) NOT NULL,
  `nro_identificacion` varchar(45) DEFAULT NULL,
  `idtipo_licencia` int(11) NOT NULL,
  `nro_licencia` varchar(45) DEFAULT NULL,
  `email_chofer` varchar(250) DEFAULT NULL,
  `usuario_chofer` varchar(45) DEFAULT NULL,
  `clave_chofer` varchar(45) DEFAULT NULL,
  `foto_chofer` varchar(250) DEFAULT NULL,
  `estado_chofer` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `chofer`
--

INSERT INTO `chofer` (`idchofer`, `sedes_idsedes`, `vehiculos_idvehiculos`, `nombres_chofer`, `apellidos_chofer`, `idtipo_identificacion`, `nro_identificacion`, `idtipo_licencia`, `nro_licencia`, `email_chofer`, `usuario_chofer`, `clave_chofer`, `foto_chofer`, `estado_chofer`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 9, 20, 'LUIS ', 'QUIÃ‘ONEZ CALMET', 1, '00000000', 2, '00000000', 'logistica@sierraexportadora.gob.pe', 'lquinones', '123456', '', 1, '2017-05-12 16:28:46', 'jvelasquez', '2017-07-31 16:04:53', ''),
(2, 9, 23, 'MIGUEL', 'CANEPA CARLOS', 1, '00000000', 2, '00000000', 'logistica@sierraexportadora.gob.pe', 'mcanepa', '123456', '', 1, '2017-05-12 16:29:00', 'jvelasquez', '2017-08-04 08:58:23', ''),
(3, 9, 14, 'OMAR', 'TREVEJO ARANA', 1, '00000000', 2, '00000000', 'logistica@sierraexportadora.gob.pe', 'otrevejo', '123456', '', 1, '2017-05-12 16:29:11', 'jvelasquez', '2017-08-04 09:04:18', ''),
(4, 9, 1, 'DIEGO FERNANDO', 'CABALLERO CHAMORRO', 1, '00000000', 2, '00000000', 'logistica@sierraexportadora.gob.pe', 'DCABALLERO', '123456', '', 0, '2017-05-12 16:29:27', 'jvelasquez', '2017-06-20 11:55:46', 'jvelasquez'),
(5, 9, 1, 'SEBASTIAN SALVADOR', 'ORTIZ CACERES', 1, '00000000', 2, '00000000', 'logistica@sierraexportadora.gob.pe', 'sebastian', '123456', '', 1, '2017-05-12 16:29:44', 'jvelasquez', '2017-07-31 16:04:35', ''),
(11, 9, 22, 'EDWIN (1)', 'GONZALES DE LA PEÃ‘A', 1, '0000', 2, '00000', 'EGONZALES@SIERRAEXPORTADORA.GOB.PE', 'ygonzales', '12345', '', 1, '2017-06-20 11:56:49', 'jvelasquez', '2017-08-04 09:03:40', ''),
(13, 9, 8, 'EDWIN (2)', 'GONZALES DE LA PEÃ‘A', 1, '10226660', 1, 'Q10226660', 'EGONZALES@SIERRAEXPORTADORA.GOB.PE', 'ygonzales', '12345', '', 1, '2017-08-04 09:03:21', '', '2017-08-04 09:04:26', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion_parametros`
--

CREATE TABLE `configuracion_parametros` (
  `idconfiguracion_parametros` int(11) NOT NULL,
  `nombre_parametro` varchar(100) DEFAULT NULL,
  `valor_parametro` double DEFAULT NULL,
  `estado_parametro` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `configuracion_parametros`
--

INSERT INTO `configuracion_parametros` (`idconfiguracion_parametros`, `nombre_parametro`, `valor_parametro`, `estado_parametro`) VALUES
(1, 'MINIMO_HORAS_ANTICIPACION', 1, 1),
(2, 'MINIMO_HORAS_DURACION', 1, 1),
(3, 'MAXIMO_HORAS_DURACION', 2, 1),
(4, 'MAXIMO_MINUTOS_TOLERANCIA', 15, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratos`
--

CREATE TABLE `contratos` (
  `idcontratos` int(11) NOT NULL,
  `usuarios_idusuarios` int(11) NOT NULL,
  `sedes_idsedes` int(11) NOT NULL,
  `proveedores_idproveedores` int(11) NOT NULL,
  `nombre_contrato` varchar(250) DEFAULT NULL,
  `nro_contrato` varchar(250) DEFAULT NULL,
  `monto_contrato` double DEFAULT NULL,
  `fecha_contrato` date DEFAULT NULL,
  `plazo_desde` date DEFAULT NULL,
  `plazo_hasta` date DEFAULT NULL,
  `estado_contrato` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `contratos`
--

INSERT INTO `contratos` (`idcontratos`, `usuarios_idusuarios`, `sedes_idsedes`, `proveedores_idproveedores`, `nombre_contrato`, `nro_contrato`, `monto_contrato`, `fecha_contrato`, `plazo_desde`, `plazo_hasta`, `estado_contrato`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(18, 1, 9, 1, 'SUMINISTRO DE COMBUSTIBLE PARA LA FLOTA VEHICULAR DE LA SEDE CENTRAL DE SIERRA EXPORTADORA', '013-2016-SE', 75500, '2016-08-11', '2016-08-12', '2017-08-11', 1, '2017-05-11 10:06:26', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratos_item_adjudicados`
--

CREATE TABLE `contratos_item_adjudicados` (
  `id_item_adjudicados` int(11) NOT NULL,
  `contratos_idcontratos` int(11) NOT NULL,
  `idmedida_combustible` int(11) NOT NULL,
  `idtipo_combustible` int(11) NOT NULL,
  `cantidad` double DEFAULT NULL,
  `precio_unitario` double DEFAULT NULL,
  `precio_total` double DEFAULT NULL,
  `ficha_tecnica` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `contratos_item_adjudicados`
--

INSERT INTO `contratos_item_adjudicados` (`id_item_adjudicados`, `contratos_idcontratos`, `idmedida_combustible`, `idtipo_combustible`, `cantidad`, `precio_unitario`, `precio_total`, `ficha_tecnica`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 18, 1, 3, 4230, 13.6643026004, 57800, 'A1510150600146104', '2017-05-11 10:08:14', 'jvelasquez', NULL, NULL),
(2, 18, 1, 6, 1680, 10.5357142857, 17700, 'A150150500233280', '2017-05-11 10:11:43', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `idempresas` int(11) NOT NULL,
  `razon_social` text,
  `ruc` varchar(45) DEFAULT NULL,
  `direccion_fiscal_uno` varchar(250) DEFAULT NULL,
  `direccion_fiscal_dos` varchar(250) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `estado_empresa` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`idempresas`, `razon_social`, `ruc`, `direccion_fiscal_uno`, `direccion_fiscal_dos`, `telefono`, `estado_empresa`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 'SIERRA Y SELVA EXPORTADORA', '20514859559', '', NULL, '', 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluaciones_x_servicios`
--

CREATE TABLE `evaluaciones_x_servicios` (
  `idevaluaciones_x_servicios` int(11) NOT NULL,
  `idmantenimiento_evaluaciones` int(11) NOT NULL,
  `idservicios_x_solicitudes` int(11) NOT NULL,
  `talleres_idtalleres` int(11) NOT NULL,
  `descripcion_diagnostico` text,
  `descripcion_accion` text,
  `costo_accion` double DEFAULT NULL,
  `es_cambio_componente` int(11) DEFAULT NULL,
  `motivo_cambio_componente` text,
  `es_taller_seleccionado` int(11) DEFAULT NULL,
  `motivo_taller_seleccionado` text,
  `es_evaluacion_aprobada` int(11) DEFAULT NULL,
  `fecha_aprobacion` datetime DEFAULT NULL,
  `usuario_aprobacion` varchar(45) DEFAULT NULL,
  `estado_evaluacion_x_servicio` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `evaluaciones_x_servicios`
--

INSERT INTO `evaluaciones_x_servicios` (`idevaluaciones_x_servicios`, `idmantenimiento_evaluaciones`, `idservicios_x_solicitudes`, `talleres_idtalleres`, `descripcion_diagnostico`, `descripcion_accion`, `costo_accion`, `es_cambio_componente`, `motivo_cambio_componente`, `es_taller_seleccionado`, `motivo_taller_seleccionado`, `es_evaluacion_aprobada`, `fecha_aprobacion`, `usuario_aprobacion`, `estado_evaluacion_x_servicio`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(27, 1, 1, 6, 'SE EVALUO LA BATERIA Y SE COMPROBO QUE EFECTIVAMENTE PRESENTA PROBLEMAS DE CARGA', 'CAMBIO DE BATERIA', 380, 1, 'LA BATERIA YA NO CARGA', 1, 'LOS TALLERES FRENOS ICAM SA VIENE REALIZANDO UN EFICIENTE TRABAJO CON LAS CAMIONETAS DE LA INSTITUCION', NULL, NULL, NULL, 1, '2017-05-23 00:07:41', 'jvelasquez', NULL, NULL),
(28, 5, 2, 7, ' SE VERIFICO EL DESGASTE DE LAS LLANTAS POR USO NORMAL', 'CAMBIO DE LLANTAS', 2136, 1, 'LAS LLANTAS PRESENTAN DESGASTE. SE RECOMIENDAN CAMBIAR UNAS LLANTAS 265/70R16 WRANGLER ADVENTURE 112S', 1, 'EL PROVEEDOR TIENE LAS TARIFAS MAS COMODAS.', NULL, NULL, NULL, 1, '2017-05-23 00:36:21', 'jvelasquez', NULL, 'jvelasquez'),
(29, 8, 34, 6, 'SE COMPROBO LA PERDIDA DE PRESION EN LA MANGUERA DE PRESION', 'CAMBIO DE MANGUERAS', 200, 1, 'PERDIDA DE PRESION', 1, 'EL TALLER REGISTRA UN BUEN SERVICIO', NULL, NULL, NULL, 1, '2017-05-25 00:44:21', 'jvelasquez', NULL, NULL),
(30, 8, 35, 6, 'SE COMPROBO LA PERDIDA DE PRESION EN LA MANGUERA DE PRESION', 'CAMBIO DE MANGUERA DE PRESION', 70, 1, 'PERDIDA DE PRESION', 1, 'EL TALLER REGISTRA UN BUEN SERVICIO', NULL, NULL, NULL, 1, '2017-05-25 00:48:10', 'jvelasquez', NULL, NULL),
(31, 8, 36, 6, 'SE REQUIERE CAMBIAR LA ABRAZADERA PARA UNA MEJOR COMPATIBILIDAD DE LOS COMPONENTES INSTALADOS, AL SER NUEVOS MANTIENE UN MEJOR AJUSTE DE LAS MANGUERAS CAMBIADAS.', 'CAMBIO DE ABRAZADERAS', 30, 1, 'MEJOR COMPATIBILIDAD DE LOS COMPONENTES', 1, 'EL TALLER ICAMSA REGISTRA UN BUEN MANTENIMIENTO', NULL, NULL, NULL, 1, '2017-05-25 01:16:40', 'jvelasquez', NULL, NULL),
(38, 11, 41, 8, 'SE EVALUA QUE EL ACEITE YA ESTA GASTADO', 'CAMBIO DE ACEITE', 125, 1, 'EL CAMBIO DE REQUIERE PORQUE YA CUMPLIO EL CICLO DE USO DE 5000 KM', 0, NULL, 0, NULL, NULL, 1, '2017-06-23 16:12:58', 'jvelasquez', NULL, NULL),
(42, 42, 105, 6, 'se verifico que escapa el agua', 'rectificar culata', 1230, 0, NULL, 0, NULL, 0, NULL, NULL, 1, '2017-08-07 18:37:15', '', NULL, NULL),
(43, 42, 105, 8, 'se evauo oooo', 'cambio de xxxx', 2300, 0, NULL, 1, 'el proveedor trabaja bien a pesar que cobra caro', 1, '2017-08-07 18:47:16', NULL, 1, '2017-08-07 18:39:25', '', NULL, NULL),
(44, 42, 106, 7, 'xxxx', 'xxxxx', 5400, 0, NULL, 1, 'xxxxx', 1, '2017-08-07 18:55:20', NULL, 1, '2017-08-07 18:39:52', '', NULL, NULL),
(45, 43, 107, 6, 'xxxx', 'xxxx', 123.2, 0, NULL, 1, 'xxxxx', 1, '2017-08-09 16:08:59', NULL, 1, '2017-08-09 16:08:11', '', NULL, NULL),
(46, 43, 107, 6, 'dddd', 'ddd', 3343, 0, NULL, 0, NULL, 0, NULL, NULL, 1, '2017-08-09 16:08:20', '', NULL, NULL),
(47, 43, 109, 8, 'xxxxxx', 'xxxxx', 52.3, 0, NULL, 1, 'xxxxxx', 1, '2017-08-09 16:14:46', NULL, 1, '2017-08-09 16:11:17', '', NULL, NULL),
(48, 43, 110, 7, 'xxx', 'xxx', 1000, 0, NULL, 1, 'xxxx', 1, '2017-08-09 16:12:18', NULL, 1, '2017-08-09 16:11:28', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `idfacturas` int(11) NOT NULL,
  `ordenes_compra_idordenes_compra` int(11) NOT NULL,
  `descrip_factura` text,
  `fecha_factura` date DEFAULT NULL,
  `nro_factura` varchar(50) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modficacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`idfacturas`, `ordenes_compra_idordenes_compra`, `descrip_factura`, `fecha_factura`, `nro_factura`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modficacion`) VALUES
(1, 7, 'GASOHOL 95 PLUS', '2017-02-07', '210-0047551', '2017-05-12 15:53:07', 'jvelasquez', '2017-05-26 18:12:39', NULL),
(2, 8, 'GASOHOL 95 PLUS', '2017-02-07', '210-0047553', '2017-05-26 18:11:39', 'jvelasquez', '2017-05-26 18:12:59', NULL),
(3, 9, 'GASOHOL 95 PLUS', '2017-02-07', '210-0047554', '2017-05-26 18:13:56', 'jvelasquez', '2017-05-26 18:18:46', NULL),
(5, 10, 'GASOHOL 95 PLUS', '2017-02-07', '210-0047555', '2017-05-26 18:23:48', '', NULL, NULL),
(6, 11, 'DIESEL B5 - S 50 UV / GASOHOL 95 PLUS', '2017-02-07', '210-0047556', '2017-05-26 18:25:38', '', '2017-05-26 18:25:54', NULL),
(7, 28, 'DIESEL B5 - S 50 UV / GASOHOL 95 PLUS', '2017-03-07', '210-0047853', '2017-05-26 18:27:34', '', NULL, NULL),
(8, 29, 'DIESEL B5 - S 50 UV / GASOHOL 95 PLUS', '2017-03-07', '210-0047854', '2017-05-26 18:30:50', '', '2017-05-26 18:35:09', NULL),
(9, 27, 'GASOHOL 95 PLUS', '2017-03-07', '210-0047855', '2017-05-26 18:35:01', '', NULL, NULL),
(10, 40, 'LIQUIDACION DE CONSUMO DIESEL DB5-S50 UV', '2017-04-26', '0013-12578', '2017-06-26 09:53:07', '', NULL, NULL),
(11, 39, 'GASOHOL 95 PLUS', '2017-05-02', '210-0048360', '2017-06-26 12:28:12', '', NULL, NULL),
(12, 6, 'GASOHOL 95 PLUS', '2017-05-04', '210-0048394', '2017-06-26 12:45:54', '', NULL, NULL),
(13, 5, 'GASOHOL 95 PLUS', '2017-06-26', '210-0048393', '2017-06-26 12:54:16', '', '2017-06-26 12:55:45', NULL),
(14, 4, 'GASOHOL 95 PLUS', '2017-05-04', '210-0048392', '2017-06-26 17:24:16', '', NULL, NULL),
(15, 38, 'GASOHOL 95 PLUS', '2017-05-02', '210-0048359', '2017-06-26 17:32:44', '', NULL, NULL),
(16, 37, 'GASOHOL 95 PLUS', '2017-05-02', '210-0048358', '2017-06-26 17:41:06', '', NULL, NULL),
(17, 3, 'DIESEL B5 - S 50 UV - GL', '2017-05-04', '210-0048389', '2017-06-27 12:23:50', '', NULL, NULL),
(18, 35, 'GASOHOL 95 PLUS', '2017-03-07', '210-0047856', '2017-06-27 15:54:03', '', NULL, NULL),
(19, 36, 'DIESEL B5 - S 50 UV - GL', '2017-05-02', '210-0048357', '2017-06-27 16:10:24', '', NULL, NULL),
(20, 41, 'xxxxx', '2017-08-22', '25091986', '2017-08-23 15:26:21', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas_combustible`
--

CREATE TABLE `facturas_combustible` (
  `idfacturas_combustible` int(11) NOT NULL,
  `idvehiculos` int(11) NOT NULL,
  `idtipo_combustible` int(11) NOT NULL,
  `chofer_idchofer` int(11) NOT NULL,
  `nro_factura` varchar(45) DEFAULT NULL,
  `ruc_factura` varchar(45) DEFAULT NULL,
  `fecha_factura` date DEFAULT NULL,
  `nombre_proveedor` varchar(250) DEFAULT NULL,
  `direccion_proveedor` varchar(45) DEFAULT NULL,
  `kilometraje_factura` int(11) DEFAULT NULL,
  `nro_meta` varchar(45) DEFAULT NULL,
  `cantidad_combustible` double DEFAULT NULL,
  `precio_unitario_combustible` double DEFAULT NULL,
  `importe_total_combustible` double DEFAULT NULL,
  `es_tanque_lleno` int(11) DEFAULT NULL,
  `estado_factura_combustible` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento_alertas`
--

CREATE TABLE `mantenimiento_alertas` (
  `idmantenimiento_alertas` int(11) NOT NULL,
  `vehiculos_idvehiculos` int(11) NOT NULL,
  `idmantenimiento_servicios` int(11) NOT NULL,
  `usuarios_idusuarios` int(11) NOT NULL,
  `id_medida_uso` int(11) DEFAULT NULL,
  `kilometraje_ultimo_mantenimiento` int(11) DEFAULT NULL,
  `descripcion_alerta` varchar(250) DEFAULT NULL,
  `is_custom_alerta` int(11) DEFAULT NULL,
  `ciclo_alerta` int(11) DEFAULT NULL,
  `ejecucion_alerta` int(11) DEFAULT NULL,
  `estado_alerta` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mantenimiento_alertas`
--

INSERT INTO `mantenimiento_alertas` (`idmantenimiento_alertas`, `vehiculos_idvehiculos`, `idmantenimiento_servicios`, `usuarios_idusuarios`, `id_medida_uso`, `kilometraje_ultimo_mantenimiento`, `descripcion_alerta`, `is_custom_alerta`, `ciclo_alerta`, `ejecucion_alerta`, `estado_alerta`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(2, 22, 10, 5, 1, 100000, 'ALERTA DE CAMBIO DE ACEITE DE MOTOR POR CADA 5000 KM', 1, 5000, 80, 1, '2017-08-09 16:00:02', 'jvelasquez', '2017-08-23 18:11:36', 'jvelasquez'),
(5, 8, 9, 5, 1, 100000, 'ALERTA DE CAMBIO DE FILTRO DE ACEITE POR CADA 5000 KM', 1, 5000, 80, 1, '2017-08-23 14:59:57', 'jvelasquez', '2017-08-23 19:07:07', 'jvelasquez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento_componentes`
--

CREATE TABLE `mantenimiento_componentes` (
  `idmantenimiento_componentes` int(11) NOT NULL,
  `idmantenimiento_sistemas` int(11) NOT NULL,
  `cod_componente` varchar(45) DEFAULT NULL,
  `nombre_componente` varchar(45) DEFAULT NULL,
  `estado_componente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mantenimiento_componentes`
--

INSERT INTO `mantenimiento_componentes` (`idmantenimiento_componentes`, `idmantenimiento_sistemas`, `cod_componente`, `nombre_componente`, `estado_componente`) VALUES
(2, 6, 'BAT13', 'BATERIA DE 13 PLACAS', 1),
(4, 7, 'LLANTA265', 'LLANTA 265/70R16 GOODYEAR', 1),
(5, 1, 'EMPAQMOTOR', 'JUEGO DE EMPAQUETADURA DE MOTOR', 1),
(6, 1, 'VALESCA', 'VALVULA DE ESCAPE', 1),
(7, 1, 'VALVADM', 'VALVULA DE ADMISION', 1),
(8, 1, 'ACEIMOT', 'ACEITE DE MOTOR', 1),
(9, 1, 'FILACE', 'FILTRO DE ACEITE', 1),
(10, 1, 'GALREFRI', 'REFRIGERENTE', 1),
(11, 1, 'MEGAGREY', 'SILICONA MEGA GREY', 1),
(12, 8, 'BOMBAGUA', 'BOMBA DE AGUA', 1),
(13, 8, 'FAJACCES', 'FAJA DE ACCESORIOS', 1),
(14, 8, 'MANGAGUA', 'MANGUERAS DE AGUA', 1),
(15, 8, 'TARADIA', 'TAPA DE RADIADOR', 1),
(16, 8, 'TERMOSW', 'TERMOSWITCH', 1),
(17, 1, 'CULATA', 'CULATA', 1),
(18, 1, 'RETENES', 'RETENES', 1),
(19, 1, 'NINGUNO', 'NINGUNO', 1),
(20, 1, 'MOTOR', 'MOTOR', 1),
(21, 1, 'ASIVALV', 'ASIENTOS DE VALVULAS', 1),
(22, 8, 'RADIA', 'RADIADOR', 1),
(23, 8, 'VENTILA', 'VENTILADOR', 1),
(24, 8, 'CIRCUIREFRIMOT', 'CIRCUITO DE REFRIGERACION DE MOTOR', 1),
(25, 1, 'COMP', 'COMPUTADORA A BORDO', 1),
(26, 7, 'CINSEG', 'CINTURON DE SEGURIDAD', 1),
(27, 7, 'CHAPCONTACTO', 'CHAPA DE CONTACTO', 1),
(28, 5, 'MANGPRES', 'MANGUERA DE PRESION', 1),
(29, 5, 'MANGRET', 'MANGUERA DE RETORNO', 1),
(30, 5, 'DIRECABRAZA', 'ABRAZADERA', 1),
(31, 1, '20W50', 'ACEITE 20W50', 1),
(32, 1, '80W90', 'GALON DE ACEITE 80W90', 1),
(33, 1, '85W140', 'GALON DE ACEITE 85W140', 1),
(34, 1, 'AIRE', 'FILTRO DE AIRE', 1),
(35, 1, 'FILGAS', 'FILTRO DE GASOLINA', 1),
(36, 1, 'LIMPENG', 'LIMPIEZA Y ENGRASE', 1),
(37, 5, 'SUSPDIREC', 'CAMBIO DE ROTULAS DE SUSPENSIÃ“N', 1),
(38, 5, 'SUSPDIREC', 'CAMBIO DE ROTULAS DE SUSPENSIÃ“N', 1),
(39, 5, 'SUSPDIREC', 'SUSPENSION', 1),
(40, 5, 'BALANC', 'SERVICIO DE BALANCEO', 1),
(41, 5, 'SERVALINA', 'SERVICIO DE ALINAMIENTO', 1),
(42, 8, 'AIREACONDI', 'AIRE ACONDICIONADO', 1),
(43, 3, 'CALIPER', 'D/M Y MANTENIMIENTO DE CALIPER DE FRENO', 1),
(44, 6, 'ARRANCADOR', 'REPARACIONDE ARRANCADOR Y SELEINODE', 1),
(45, 1, 'SERVMOTO', 'SOPORTE CAJA LATERALES MOTOR, FAJA', 1),
(46, 2, 'SERVTRANSM', 'SISTEMA DE TRANSMISIÃ“N', 1),
(47, 1, 'EMBRAGUE', 'DISCO DE EMBRAGUE,PLATO,COLLARIN DE EMBRAGUE,', 1),
(48, 3, 'PASBOMTAM', 'PASTILLAS, BOMBA MASTER, TAMBORES, ', 1),
(49, 2, 'RODCRUCETA', 'RODAJES CENTRAL Y CRUCETAS', 1),
(50, 4, 'AMIORDELANT', 'AMORTIGUADORES DELANTEROS', 1),
(51, 5, 'SERVDIREC', 'BARRA CENTRAL, TERMINALES INT Y EXTERIOR, ROT', 1),
(52, 1, 'AFINMOTO', 'BUJIAS, ', 1),
(53, 7, 'CARROCE', 'VENTANA, PARABRISA, SOLDADURA DE PARACHOQUE, ', 1),
(54, 5, 'EMBPLADIS', 'EMBRAGUE, PLATO, DISCO Y COLLARIN', 1),
(55, 1, 'ALTERNA', 'JUEGO DE CARBONES,RODAJE GRANDE ALTERNADOR,RO', 1),
(56, 5, 'PASBOMTAM', 'PASTILLAS, BOMBA MASTER, TAMBORES, ', 1),
(57, 5, 'PASBOMTAM', 'PASTILLAS, BOMBA MASTER, TAMBORES, ROTULAS, T', 1),
(58, 2, 'PALRODAJ', 'PALIERES, RODAJES, CAJA DE 4X4,RODAJES INT Y ', 1),
(59, 1, 'BOMINYEC', 'BOMBA DE INUYECCÃ“N, ACEITE DE CORONA, ', 1),
(60, 6, 'FOCCAB', 'FOCOS, CABLEADO, INSTALACION', 1),
(61, 1, 'VALANCI', 'TAPA DE VALANCINES, ', 1),
(62, 2, 'CARDAN', 'SOPORTE DE CARDAN', 1),
(63, 2, 'EMDISPLACOLL', 'KIT DE EMBRAGUE-DISCO EMBRAGUE-PLATO EMBRAGUE', 1),
(64, 1, 'OBTURAD', 'OBTURADOR, FLUJOMETRO, METACLEANER, REGULACIO', 1),
(65, 7, 'RESONSILE', 'RESONADOR,SILENCIADOR POSTERIOR,SUJETADOR SIL', 1),
(66, 6, 'PANPILOTO', 'PANEL DE PUERTA PILOTO, CENTRAL DE COMANDO (P', 1),
(67, 1, 'ENGRA', 'ENGRANAJE', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento_evaluaciones`
--

CREATE TABLE `mantenimiento_evaluaciones` (
  `idmantenimiento_evaluaciones` int(11) NOT NULL,
  `idmantenimiento_solicitudes` int(11) NOT NULL,
  `usuarios_idusuarios` int(11) NOT NULL,
  `descripcion_evaluacion` text,
  `is_aprobado_evaluacion` int(11) DEFAULT NULL,
  `fecha_evaluacion` date DEFAULT NULL,
  `estado_evaluacion` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mantenimiento_evaluaciones`
--

INSERT INTO `mantenimiento_evaluaciones` (`idmantenimiento_evaluaciones`, `idmantenimiento_solicitudes`, `usuarios_idusuarios`, `descripcion_evaluacion`, `is_aprobado_evaluacion`, `fecha_evaluacion`, `estado_evaluacion`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 3, 1, 'PRESUPUESTO #0044502016-FISA', NULL, '2016-12-22', 0, '2017-05-22 04:32:15', 'jvelasquez', '2017-05-23 15:26:58', 'jvelasquez'),
(5, 4, 1, 'EVALUACION DE CAMBIO DE LLANTAS 265/70R16', NULL, '2016-12-22', NULL, '2017-05-23 00:17:42', 'jvelasquez', '2017-05-24 23:54:26', 'jvelasquez'),
(6, 5, 1, 'PRESUPUESTO #003035-2016-FISA', NULL, '2016-12-20', 0, '2017-05-23 12:57:15', 'jvelasquez', '2017-05-23 15:11:41', 'jvelasquez'),
(8, 7, 1, 'PRESUPUESTO #004595-2016-FISA', NULL, '2016-12-22', 0, '2017-05-25 00:16:08', 'jvelasquez', '2017-05-25 01:03:23', 'jvelasquez'),
(11, 12, 1, 'EVALUACIÃ“N FACTORÃA REYS MOTORS 0001-0005165', 0, '2017-01-25', 0, '2017-06-23 16:08:45', 'jvelasquez', NULL, NULL),
(12, 11, 1, 'MEMORANDUM N 053-2017-MINAGRI-SSE OA/SSGG', 0, '2017-01-24', 0, '2017-06-26 05:35:03', '', NULL, NULL),
(13, 14, 1, 'MANTENIMIENTO PREVENTIVO', NULL, '2017-01-24', 0, '2017-06-26 06:01:23', '', '2017-06-26 06:01:51', ''),
(14, 15, 1, 'MANTENIMIENTO PREVENTIVO DE 285000 KM', 0, '2017-02-10', 0, '2017-06-26 06:13:59', '', NULL, NULL),
(15, 16, 1, 'MANTENIMIENTO PREVENTIVO', 0, '2017-02-14', 0, '2017-06-26 06:29:43', '', NULL, NULL),
(16, 12, 1, 'MANTENIMIENTO PREVENTIVO', 0, '2017-02-24', 0, '2017-06-26 06:50:11', '', NULL, NULL),
(17, 5, 1, 'MANTENIMIENTO CORRECTIVO', 0, '2017-02-07', 0, '2017-06-26 07:10:09', '', NULL, NULL),
(18, 19, 1, 'MANTENIMIENTO CORRECTIVO DE LA TOYOTA S1D-850', 0, '2017-02-07', 0, '2017-06-26 07:39:54', '', NULL, NULL),
(19, 20, 1, 'SERVICIO MANTENIMIENTO CORRECTIVO DEL SISTEMA DE AIRE ACONDICIONADO Y ARRANCADOR', 0, '2017-02-07', 0, '2017-06-26 07:52:48', '', NULL, NULL),
(20, 21, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHÃCULO  EGT-082 DE 175.000 KM', 0, '2017-02-10', 0, '2017-06-26 07:58:43', '', NULL, NULL),
(21, 22, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO LGY-453', 0, '2017-02-24', 0, '2017-06-26 08:17:54', '', NULL, NULL),
(22, 22, 1, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD LGY-453', 0, '2017-02-24', 0, '2017-06-26 08:28:48', '', NULL, NULL),
(23, 24, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGN-927', 0, '2017-03-27', 0, '2017-06-26 08:36:26', '', NULL, NULL),
(24, 25, 1, 'MANTENIMIENTO CORRECTIVO DE L VEHICULO EGR-563', 0, '2017-03-03', 0, '2017-06-26 08:46:53', '', NULL, NULL),
(25, 26, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGQ-911', 0, '2017-03-13', 0, '2017-06-26 08:51:05', '', NULL, NULL),
(26, 27, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO EGS-278', 0, '2017-02-24', 0, '2017-06-26 09:20:39', '', NULL, NULL),
(27, 28, 1, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-017', 0, '2017-02-27', 0, '2017-06-26 09:52:41', '', NULL, NULL),
(28, 29, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGR-017 DE 299.762 KM', 0, '2017-02-27', 0, '2017-06-26 09:57:48', '', NULL, NULL),
(29, 30, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO EGS-278', 0, '2017-03-24', 0, '2017-06-26 10:00:02', '', NULL, NULL),
(30, 31, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGR-565', 0, '2017-04-04', 0, '2017-06-26 10:06:54', '', NULL, NULL),
(31, 32, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO EGR-036', 0, '2017-03-27', 0, '2017-06-26 10:30:02', '', NULL, NULL),
(32, 33, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO AEP-892', 0, '2017-03-24', 0, '2017-06-26 10:53:42', '', NULL, NULL),
(33, 34, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHÃCULO AEP-892', 0, '2017-03-24', 0, '2017-06-26 10:57:22', '', NULL, NULL),
(34, 35, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGR-564', 0, '2017-03-23', 0, '2017-06-26 11:13:47', '', NULL, NULL),
(35, 36, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGR-564', 0, '2017-03-23', 0, '2017-06-26 11:20:57', '', NULL, NULL),
(36, 37, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO EGQ-911', 0, '2017-04-20', 0, '2017-06-26 11:24:54', '', NULL, NULL),
(37, 38, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGT-082 DE 180.000 KM', 0, '2017-04-11', 0, '2017-06-26 11:30:12', '', NULL, NULL),
(38, 39, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGR-305', 0, '2017-05-04', 0, '2017-06-26 11:51:25', '', NULL, NULL),
(39, 40, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGR-305', 0, '2017-05-04', 0, '2017-06-26 11:58:41', '', NULL, NULL),
(40, 22, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO LGY-453', NULL, '2017-05-26', 0, '2017-06-26 12:35:34', '', '2017-06-26 12:39:09', ''),
(42, 44, 1, 'EVALUACION DEL TALLER ICAM FRENOS SAC #44646', 0, '2017-08-07', 0, '2017-08-07 18:35:48', 'jvelasquez', NULL, NULL),
(43, 45, 1, 'evaluacion #545454', 0, '2017-08-09', 0, '2017-08-09 16:04:56', 'jvelasquez', NULL, NULL),
(44, 45, 1, 'ccccc', 0, '2017-08-09', 0, '2017-08-09 16:05:40', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento_servicios`
--

CREATE TABLE `mantenimiento_servicios` (
  `idmantenimiento_servicios` int(11) NOT NULL,
  `idmantenimiento_sistemas` int(11) NOT NULL,
  `idmantenimiento_tipos_servicios` int(11) NOT NULL,
  `id_medida_uso` int(11) DEFAULT NULL,
  `cod_servicio` varchar(45) DEFAULT NULL,
  `nombre_servicio` varchar(250) DEFAULT NULL,
  `descripcion_servicio` text,
  `estado_servicio` int(11) DEFAULT NULL,
  `ciclo_alerta` int(11) DEFAULT NULL,
  `ejecucion_alerta` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mantenimiento_servicios`
--

INSERT INTO `mantenimiento_servicios` (`idmantenimiento_servicios`, `idmantenimiento_sistemas`, `idmantenimiento_tipos_servicios`, `id_medida_uso`, `cod_servicio`, `nombre_servicio`, `descripcion_servicio`, `estado_servicio`, `ciclo_alerta`, `ejecucion_alerta`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 6, 2, 1, 'BATERIA', 'CAMBIO DE BATERIA', 'Cambio de baterÃ­a por desgaste de uso normal', 1, 30000, 70, '2017-05-22 03:25:57', 'jvelasquez', NULL, NULL),
(2, 7, 1, NULL, 'LLANTAS', 'CAMBIO DE LLANTAS', 'Cambio de llantas por desgaste en uso normal', 1, NULL, NULL, '2017-05-23 00:13:00', 'jvelasquez', NULL, NULL),
(3, 1, 1, NULL, 'DMCULATA', 'DESMONTAR CULATA', 'No registrada', 1, NULL, NULL, '2017-05-23 10:28:39', 'jvelasquez', '2017-05-23 11:15:14', 'jvelasquez'),
(4, 1, 1, NULL, 'DESCULATA', 'DESCARBONIZADO DE CULATA', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:42:32', 'jvelasquez', NULL, NULL),
(5, 1, 1, NULL, 'EMPAQ', 'CAMBIO DE EMPAQUETADURA DE MOTOR', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:45:13', 'jvelasquez', NULL, NULL),
(6, 1, 1, NULL, 'RETENESVAL', 'CAMBIO DE RETENES DE VALVULAS', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:45:48', 'jvelasquez', NULL, NULL),
(7, 1, 1, NULL, 'VALVADM', 'CAMBIO DE VALVULAS DE ADMISION', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:50:03', 'jvelasquez', NULL, NULL),
(8, 1, 1, NULL, 'VALVESCA', 'CAMBIO DE VALVULAS DE ESCAPE', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:51:42', 'jvelasquez', '2017-05-23 14:17:29', 'jvelasquez'),
(9, 1, 1, NULL, 'FILTACE', 'CAMBIO DE FILTRO DE ACEITE', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:52:27', 'jvelasquez', NULL, NULL),
(10, 1, 1, NULL, 'ACEITMOT', 'CAMBIO DE ACEITE DE MOTOR', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:52:50', 'jvelasquez', NULL, NULL),
(11, 1, 1, NULL, 'REFRI', 'CAMBIO DE REFRIGERANTE', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:53:16', 'jvelasquez', NULL, NULL),
(12, 1, 1, NULL, 'SINCROMOT', 'SINCRONIZADO DE MOTOR', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:53:51', 'jvelasquez', NULL, NULL),
(13, 1, 1, NULL, 'PULVMOT', 'PULVERIZADO DE MOTOR', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:54:15', 'jvelasquez', '2017-05-23 10:54:22', 'jvelasquez'),
(14, 1, 1, NULL, 'PRUEBHERM', 'PRUEBA DE HERMETICIDAD', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:55:03', 'jvelasquez', NULL, NULL),
(15, 1, 1, NULL, 'RECTASVAL', 'RECTIFICAR ASIENTOS DE VALVULAS', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 10:55:38', 'jvelasquez', NULL, NULL),
(16, 8, 1, NULL, 'DESMRADIA', 'DESMONTAR RADIADOR', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:17:17', 'jvelasquez', '2017-05-23 11:18:19', 'jvelasquez'),
(17, 8, 1, NULL, 'SONRADI', 'SONDEO DE RADIADOR', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:17:46', 'jvelasquez', '2017-05-23 11:17:58', 'jvelasquez'),
(18, 8, 1, NULL, 'MANELECVENT', 'MANTENIMIENTO SISTEMA ELECTRICO DEL VENTILADOR', 'NO REGISTR', 1, NULL, NULL, '2017-05-23 11:20:55', 'jvelasquez', NULL, NULL),
(19, 8, 1, NULL, 'REFRMOTOR', 'LIMPIEZA DE CIRCUITO DE REFRIGERACION DE MOTOR', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:21:55', 'jvelasquez', NULL, NULL),
(20, 8, 1, NULL, 'CAMBOMBAGUA', 'CAMBIO DE BOMBA DE AGUA', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:22:27', 'jvelasquez', NULL, NULL),
(21, 8, 1, NULL, 'MANGUA', 'CAMBIO DE MANGUERAS DE AGUA', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:23:31', 'jvelasquez', NULL, NULL),
(22, 8, 1, NULL, 'FAJACCESO', 'CAMBIO DE FAJA DE ACCESORIOS', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:24:08', 'jvelasquez', NULL, NULL),
(23, 8, 1, NULL, 'TERMOSWITCH', 'CAMBIO DE TERMOSWITCH', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:24:35', 'jvelasquez', NULL, NULL),
(24, 8, 1, NULL, 'CAMBRADIA', 'CAMBIO DE TAPA RADIADOR', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:24:59', 'jvelasquez', NULL, NULL),
(25, 1, 1, NULL, 'ESCANEOAUT', 'ESCANEO DEL AUTOMOVIL', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:34:37', 'jvelasquez', NULL, NULL),
(26, 7, 1, NULL, 'CINTPILO', 'DESMONTAR ACCESORIO DE CINTURON DE PILOTO', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:37:19', 'jvelasquez', NULL, NULL),
(27, 7, 1, NULL, 'DMCINPOST', 'DESMONTAR ACCESORIO DE CINTURON POSTERIOR', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:37:46', 'jvelasquez', NULL, NULL),
(28, 7, 1, NULL, 'MANTCHAPACONT', 'MANTENIMIENTO DE CHAPA DE CONTACTO', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 11:38:11', 'jvelasquez', NULL, NULL),
(29, 5, 1, NULL, 'MAGPRES', 'CAMBIO DE MANGUERA DE PRESION', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 20:56:54', 'jvelasquez', NULL, NULL),
(30, 5, 1, NULL, 'MANGRETORNO', 'CAMBIO DE MANGUERA DE RETORNO', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 20:57:48', 'jvelasquez', '2017-05-23 21:00:57', 'jvelasquez'),
(31, 5, 1, NULL, 'CAMABRA', 'CAMBIO DE ABRAZADERAS', 'NO REGISTRA', 1, NULL, NULL, '2017-05-23 21:01:53', 'jvelasquez', NULL, NULL),
(32, 1, 1, NULL, 'FILTRO AIRE', 'CAMBIO DE FILTRO DE AIRE', 'CAMBIO', 1, NULL, NULL, '2017-06-23 16:02:16', 'jvelasquez', NULL, NULL),
(33, 1, 1, NULL, 'FILGAS', 'CAMBIO DE FILTRO DE GASOLINA', 'CAMBIO DE FILTRO', 1, NULL, NULL, '2017-06-23 16:05:08', 'jvelasquez', NULL, NULL),
(34, 1, 1, NULL, 'LAVENG', 'SERVICIO DE LAVADO Y ENGRASE', 'SERVICIO DE LIMPIEZA DE MOTOR', 1, NULL, NULL, '2017-06-23 16:06:08', 'jvelasquez', NULL, NULL),
(35, 5, 2, NULL, 'SUSPDIREC', 'SUSPENSIÃ“N', 'CAMBIO DE ROTULA DE SUSPENSIÃ“N', 1, NULL, NULL, '2017-06-26 07:02:40', '', NULL, NULL),
(36, 5, 2, NULL, 'BALANC', 'BALANCEO', 'SERVICIO DE BALANCEO', 1, NULL, NULL, '2017-06-26 07:05:54', '', NULL, NULL),
(37, 5, 2, NULL, 'SERVDIREC', 'SERVICIO DE DIRECCIÃ“N', 'INCLINACIÃ“N,SUSPENSION, ALINAMIENTO DE DIRECCION, AJUSTE SUPENSION, BALANCEO', 1, NULL, NULL, '2017-06-26 07:17:14', '', NULL, NULL),
(38, 5, 2, NULL, 'SERVALINA', 'ALINAMIENTO', 'SERVICIO DE ALINAMIENTO DE DIRECCIÃ“N', 1, NULL, NULL, '2017-06-26 07:19:37', '', NULL, NULL),
(39, 5, 2, NULL, 'SERVSUSPE', 'SUSPENSION', 'SERVICIO DE AJUSTE DE SUSPENSION', 1, NULL, NULL, '2017-06-26 07:21:40', '', NULL, NULL),
(40, 5, 2, NULL, 'SERVBALANCE', 'BALANCEO', 'SERVICIO DE BALANCEO', 1, NULL, NULL, '2017-06-26 07:23:05', '', NULL, NULL),
(41, 5, 2, NULL, 'SERVBALANCE', 'BALANCEO', 'SERVICIO DE BALANCEO', 1, NULL, NULL, '2017-06-26 07:23:30', '', NULL, NULL),
(42, 8, 2, NULL, 'AIREACOND', 'SISTEMA DE AIRE AIRE ACONDICIONADO', 'SERVICIO AIRE ACONDICIONADO', 1, NULL, NULL, '2017-06-26 07:29:08', '', NULL, NULL),
(43, 3, 2, NULL, 'CALIPER', 'CALIPER', 'SERVICIO Y MANTENIMIENTO DE CALIPER DE FRENO', 1, NULL, NULL, '2017-06-26 07:34:16', '', NULL, NULL),
(44, 6, 2, NULL, 'SERVARRANC', 'ARRANCADOR ', 'SERVICIO ELECTRICO', 1, NULL, NULL, '2017-06-26 07:48:32', '', NULL, NULL),
(45, 1, 2, NULL, 'SERVMEC', 'SISTEMA MECANICA', 'SERVICIO MECANICA', 1, NULL, NULL, '2017-06-26 08:02:22', '', NULL, NULL),
(46, 2, 2, NULL, 'SERVTRANSM', 'TRANSMISIÃ“N', 'SERVICIO DE TRANSMISIÃ“N', 1, NULL, NULL, '2017-06-26 08:07:36', '', NULL, NULL),
(47, 6, 2, NULL, 'SERVBENDIX', 'SISTEMA DE ENCENDIDO', 'SERVICIO DEL BENDIX', 1, NULL, NULL, '2017-06-26 08:13:38', '', NULL, NULL),
(48, 1, 2, NULL, 'EMBRAGUE', 'SISTEMA DE EMBRAGUE', 'SERVICIO DE EMBRAGUE', 1, NULL, NULL, '2017-06-26 08:43:18', '', NULL, NULL),
(49, 3, 2, NULL, 'SERVFREN', 'SISTEMA DE FRENIO', 'SERVICIO DE FRENO', 1, NULL, NULL, '2017-06-26 09:24:14', '', NULL, NULL),
(50, 4, 2, NULL, 'SUSPDIREC', 'SISTEMA DE SUSPENSION', 'SERVICIO DE SUSPENSION', 1, NULL, NULL, '2017-06-26 09:39:18', '', NULL, NULL),
(51, 1, 2, NULL, 'AFINAMOTO', 'SISTEMA DE MOTOR', 'AFINAMIENTO MAYOR', 1, NULL, NULL, '2017-06-26 09:45:39', '', NULL, NULL),
(52, 7, 2, NULL, 'CARROSE', 'SISTEMA DE CORROCERIA Y CHASIS', 'SERVICIO DE CARROCERIA', 1, NULL, NULL, '2017-06-26 09:47:37', '', NULL, NULL),
(53, 1, 2, NULL, 'ALTERN', 'SISTEMA DE MOTOR', 'SERVICIO DE ALTERNADOR', 1, NULL, NULL, '2017-06-26 10:24:52', '', NULL, NULL),
(54, 1, 2, NULL, 'ALTERNA', 'SISTEMA DE MOTOR', 'SERVICIO DE ALTERNADOR', 1, NULL, NULL, '2017-06-26 10:27:03', '', NULL, NULL),
(55, 1, 2, NULL, 'ALTERNA', 'SERVICIO DE ALTERNADOR', 'SERVICIO DE ALTERNADOR', 1, NULL, NULL, '2017-06-26 10:27:54', '', NULL, NULL),
(56, 5, 2, NULL, 'FRENO', 'SERVICIO DE FRENO', 'REVISION Y REGULAR CUATRO RUEDAS, PASTILLAS', 1, NULL, NULL, '2017-06-26 10:35:34', '', NULL, NULL),
(57, 2, 2, NULL, 'TRANSM', 'SERVICIO DE TRANSMISIÃ“N', 'SERVICIO DE TRANSMISION', 1, NULL, NULL, '2017-06-26 10:45:37', '', NULL, NULL),
(58, 1, 2, NULL, 'ALIMENT', 'SERVICIO DE ALIMENTACIÃ“N', 'SERVICIO DE ALIMENTACIÃ“N, BOMBA DE INYECCION', 1, NULL, NULL, '2017-06-26 10:49:04', '', NULL, NULL),
(59, 6, 2, NULL, 'SERVELEC', 'SERVICIO ELECTRICO', 'SERVICIO ELECTRICO', 1, NULL, NULL, '2017-06-26 10:51:40', '', NULL, NULL),
(60, 1, 2, NULL, 'VALANCI', 'SERVICIO DE EMPAQUETADURA DE TAPA DE VALANCINES', 'SERVICIO DE EMPAQUETADURA DE TAPA DE VALANCINES', 1, NULL, NULL, '2017-06-26 11:03:31', '', NULL, NULL),
(61, 1, 2, NULL, 'ADMISION', 'SERVICIO DE ADMISION', 'SERVICIO DE ADMISIÃ“N', 1, NULL, NULL, '2017-06-26 12:01:44', '', NULL, NULL),
(62, 7, 2, NULL, 'TUBESCAPE', 'SERVICIO DE TUBO DE ESCAPE', 'SERVICIO DE TUBO DE ESCAPE', 1, NULL, NULL, '2017-06-26 12:08:30', '', NULL, NULL),
(63, 1, 2, NULL, 'ENGRA-CAMBIO', 'CAMBIO DE ENGRANAJES DE CAJA DE CAMBIOS', 'Servicio de cambio de engranajes ', 1, NULL, NULL, '2017-08-03 22:34:06', 'jvelasquez', NULL, NULL),
(64, 1, 2, NULL, 'SERVCULA', 'SERVICIO DE RECTIFICACION DE CULATA', 'servicio de rectificacion', 1, NULL, NULL, '2017-08-07 18:31:15', 'adminti', NULL, NULL),
(65, 1, 2, NULL, '7878', 'gggg', 'ttt', 1, 1000, NULL, '2017-08-23 11:14:50', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento_sistemas`
--

CREATE TABLE `mantenimiento_sistemas` (
  `idmantenimiento_sistemas` int(11) NOT NULL,
  `cod_sistema` varchar(45) DEFAULT NULL,
  `nombre_sistema` varchar(250) DEFAULT NULL,
  `estado_sistema` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mantenimiento_sistemas`
--

INSERT INTO `mantenimiento_sistemas` (`idmantenimiento_sistemas`, `cod_sistema`, `nombre_sistema`, `estado_sistema`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 'SISMOT', 'SISTEMA DE MOTOR', 1, '2017-05-08 18:11:24', 'jvelasquez', NULL, NULL),
(2, 'SISTRA', 'SISTEMA DE TRANSMISION', 1, '2017-05-08 18:11:33', 'jvelasquez', NULL, NULL),
(3, 'SISFRE', 'SISTEMA DE FRENOS', 1, '2017-05-08 18:11:46', 'jvelasquez', '2017-05-08 18:12:04', 'jvelasquez'),
(4, 'SISSUS', 'SISTEMA DE SUSPENSION', 1, '2017-05-08 18:11:55', 'jvelasquez', '2017-05-08 18:12:01', 'jvelasquez'),
(5, 'SISDIR', 'SISTEMA DE DIRECCION', 1, '2017-05-08 18:12:13', 'jvelasquez', NULL, NULL),
(6, 'SISELE', 'SISTEMA ELECTRICO', 1, '2017-05-08 18:12:29', 'jvelasquez', NULL, NULL),
(7, 'SISCHA', 'SISTEMA DE CARROCERIA Y CHASIS', 1, '2017-05-08 18:12:48', 'jvelasquez', NULL, NULL),
(8, 'SISENFRI', 'SISTEMA DE ENFRIAMIENTO', 1, '2017-05-23 11:15:36', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento_solicitudes`
--

CREATE TABLE `mantenimiento_solicitudes` (
  `idmantenimiento_solicitudes` int(11) NOT NULL,
  `vehiculos_idvehiculos` int(11) NOT NULL,
  `usuarios_idusuarios` int(11) NOT NULL,
  `descripcion_solicitud` text,
  `is_aprobado_solicitud` int(11) DEFAULT NULL,
  `estado_solicitud` int(11) DEFAULT NULL,
  `fecha_solicitud` date DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mantenimiento_solicitudes`
--

INSERT INTO `mantenimiento_solicitudes` (`idmantenimiento_solicitudes`, `vehiculos_idvehiculos`, `usuarios_idusuarios`, `descripcion_solicitud`, `is_aprobado_solicitud`, `estado_solicitud`, `fecha_solicitud`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(3, 8, 1, 'CAMBIO DE BATERIA PARA LA UNIDAD NISSAN FRONTIER CON PLACA EGR-305', 0, 0, '2016-12-21', '2017-05-22 03:39:02', 'jvelasquez', '2017-05-22 04:16:39', 'jvelasquez'),
(4, 22, 1, 'CAMBIO DE 4 LLANTAS PARA LA UNIDAD CON PLACA S1D-850', 0, 0, '2016-12-22', '2017-05-23 00:15:08', 'jvelasquez', NULL, NULL),
(5, 1, 1, 'SERVICIO DE MANTENIMIENTO CORRECTIVO DE VEHICULO POOL  CGU-026DE SSE', 0, 0, '2016-12-20', '2017-05-23 10:10:28', 'jvelasquez', NULL, NULL),
(6, 14, 1, 'SERVICIO DE MANTENIMIENTO CORRECTIVO DE LA UNIDAD ECQ-969', 0, 0, '2016-12-20', '2017-05-23 16:25:48', 'jvelasquez', NULL, NULL),
(7, 20, 1, 'CAMBIO DE MANGUERAS DE PRESION, DE RETORNO Y ABRAZADERAS', 0, 0, '2016-12-20', '2017-05-23 21:44:56', 'jvelasquez', '2017-05-25 00:37:07', 'jvelasquez'),
(11, 17, 1, 'SERVICIO DE MANTENIMIENTO CORRECTIVO PARA LA CAMIONETA DE PLACA EGR-562', 0, 1, '2017-01-20', '2017-06-23 15:51:03', 'jvelasquez', NULL, NULL),
(12, 11, 1, 'SOLICITUD DE MANTENIMIENTO PREVENTIVO PARA VEHICULO AAD-804 - SEDE AYACUCHO', 0, 1, '2017-01-25', '2017-06-23 15:54:38', 'jvelasquez', '2017-06-23 15:55:09', 'jvelasquez'),
(13, 17, 1, 'MANTENIMIENTO CORRECTIVO', 0, 1, '2017-01-24', '2017-06-26 05:30:14', '', NULL, NULL),
(14, 17, 1, 'MANTENIMIENTO PREVENTIVO', 0, 1, '2017-01-24', '2017-06-26 05:35:48', '', '2017-06-26 05:53:21', ''),
(15, 2, 1, 'MANTENIMIENTO PREVENTIVO DE 285000 KM', 0, 1, '2017-02-10', '2017-06-26 06:03:28', '', '2017-06-26 06:12:01', ''),
(16, 21, 1, 'MANTENIMIENTO PREVENTIVO', 0, 1, '2017-02-14', '2017-06-26 06:17:31', '', NULL, NULL),
(17, 11, 1, 'MANTENIMIENTO PREVENTIVO', 0, 1, '2017-02-24', '2017-06-26 06:31:14', '', NULL, NULL),
(18, 1, 1, 'MANTENIMIENTO CORRECTIVO', 0, 1, '2017-02-07', '2017-06-26 06:55:10', '', NULL, NULL),
(19, 22, 1, 'MANTENIMIENTO CORRECTIVO', 0, 1, '2017-02-07', '2017-06-26 07:14:04', '', NULL, NULL),
(20, 1, 1, 'MANTENIMIENTO CORRECTIVO DEL SISTEMA DE AIRE ACONDICIONADO Y ARRANCADOR', 0, 1, '2017-02-07', '2017-06-26 07:41:18', '', '2017-06-26 07:43:12', ''),
(21, 7, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHÃCULO EGT-082 DE 175.000 KM', 0, 1, '2017-02-10', '2017-06-26 07:54:55', '', '2017-06-26 07:55:27', ''),
(22, 20, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO LGY-453', 0, 1, '2017-02-24', '2017-06-26 08:00:16', '', NULL, NULL),
(23, 20, 1, 'MANTENIMIENTO CORRECTIVO', 0, 1, '2017-02-24', '2017-06-26 08:19:04', '', NULL, NULL),
(24, 23, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHÃCULO EGN-927', 0, 1, '2017-03-27', '2017-06-26 08:30:08', '', NULL, NULL),
(25, 16, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGR-563', 0, 1, '2017-03-03', '2017-06-26 08:37:54', '', NULL, NULL),
(26, 2, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGQ-911 DE 290.000 KM', 0, 1, '2017-03-13', '2017-06-26 08:48:05', '', '2017-06-26 08:48:39', ''),
(27, 3, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGS-278', 0, 1, '2017-02-24', '2017-06-26 08:52:43', '', NULL, NULL),
(28, 12, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGR-017', 0, 1, '2017-02-27', '2017-06-26 09:21:46', '', '2017-06-26 09:53:22', ''),
(29, 12, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGR-017 DE 299.762 KM', 0, 1, '2017-02-27', '2017-06-26 09:54:37', '', '2017-06-26 09:56:29', ''),
(30, 3, 1, 'MANTENIMIENTO COREECTIVO DEL VEHICULO EGS-278', 0, 1, '2017-03-24', '2017-06-26 09:58:56', '', NULL, NULL),
(31, 21, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHÃCULO EGR-565', 0, 1, '2017-04-04', '2017-06-26 10:02:58', '', NULL, NULL),
(32, 13, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGR-036', 0, 1, '2017-03-27', '2017-06-26 10:12:15', '', '2017-06-26 10:18:16', ''),
(33, 9, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO AEP-892', 0, 1, '2017-03-24', '2017-06-26 10:33:18', '', NULL, NULL),
(34, 9, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHÃCULO AEP-892', 0, 1, '2017-03-24', '2017-06-26 10:54:34', '', NULL, NULL),
(35, 18, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO EGR-564', 0, 1, '2017-03-23', '2017-06-26 10:58:26', '', '2017-06-26 11:01:04', ''),
(36, 18, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGR-564', 0, 1, '2017-03-23', '2017-06-26 11:14:36', '', NULL, NULL),
(37, 2, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGQ-911', 0, 1, '2017-04-20', '2017-06-26 11:21:55', '', NULL, NULL),
(38, 7, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGT-082 DE 180.000 KM', 0, 1, '2017-04-11', '2017-06-26 11:26:46', '', '2017-06-26 11:27:13', ''),
(39, 8, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGR-305', 0, 1, '2017-05-04', '2017-06-26 11:31:18', '', NULL, NULL),
(40, 8, 1, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGR-305', 0, 1, '2017-05-04', '2017-06-26 11:53:01', '', NULL, NULL),
(41, 22, 1, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO S1D-850', 0, 1, '2017-05-26', '2017-06-26 11:59:43', '', NULL, NULL),
(44, 8, 104, 'RECTIFICACIÃ“N DE CULATA POR CALENTAMIENTO GLOBAL', 0, 1, '2017-08-07', '2017-08-07 18:28:44', 'adminti', NULL, NULL),
(45, 22, 1, 'SOLICITUD DE MANTENIMIENTO DEL SENTRO DEL CHICHO', 0, 1, '2017-08-09', '2017-08-09 16:00:23', 'jvelasquez', '2017-08-09 16:10:00', 'jvelasquez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento_tipos_servicios`
--

CREATE TABLE `mantenimiento_tipos_servicios` (
  `idmantenimiento_tipos_servicios` int(11) NOT NULL,
  `tipo_servicio_mantenimiento` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mantenimiento_tipos_servicios`
--

INSERT INTO `mantenimiento_tipos_servicios` (`idmantenimiento_tipos_servicios`, `tipo_servicio_mantenimiento`) VALUES
(1, 'MANTENIMIENTO PREVENTIVO'),
(2, 'MANTENIMIENTO CORRECTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas_vehiculos`
--

CREATE TABLE `marcas_vehiculos` (
  `idmarcas_vehiculos` int(11) NOT NULL,
  `marca_vehiculo` varchar(250) DEFAULT NULL,
  `estado_marca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `marcas_vehiculos`
--

INSERT INTO `marcas_vehiculos` (`idmarcas_vehiculos`, `marca_vehiculo`, `estado_marca`) VALUES
(1, 'NISSAN', 1),
(2, 'TOYOTA', 1),
(3, 'FORD', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medida_combustible`
--

CREATE TABLE `medida_combustible` (
  `idmedida_combustible` int(11) NOT NULL,
  `medida_combustible` varchar(45) DEFAULT NULL,
  `estado_medida_combustible` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `medida_combustible`
--

INSERT INTO `medida_combustible` (`idmedida_combustible`, `medida_combustible`, `estado_medida_combustible`) VALUES
(1, 'GALONES', 1),
(2, 'LITROS', 1),
(3, 'M3', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medida_uso`
--

CREATE TABLE `medida_uso` (
  `id_medida_uso` int(11) NOT NULL,
  `medida_uso` varchar(45) DEFAULT NULL,
  `estado_medida_uso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `medida_uso`
--

INSERT INTO `medida_uso` (`id_medida_uso`, `medida_uso`, `estado_medida_uso`) VALUES
(1, 'KILOMETRO(S)', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelos_vehiculos`
--

CREATE TABLE `modelos_vehiculos` (
  `idmodelos_vehiculos` int(11) NOT NULL,
  `idmarcas_vehiculos` int(11) NOT NULL,
  `modelo_vehiculo` varchar(100) DEFAULT NULL,
  `estado_modelo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `modelos_vehiculos`
--

INSERT INTO `modelos_vehiculos` (`idmodelos_vehiculos`, `idmarcas_vehiculos`, `modelo_vehiculo`, `estado_modelo`) VALUES
(1, 3, 'SCORT', 1),
(2, 2, 'HILUX', 1),
(3, 1, 'FRONTIER', 1),
(4, 1, 'X-TRAIL', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelos_x_servicios`
--

CREATE TABLE `modelos_x_servicios` (
  `idmodelos_x_servicios` int(11) NOT NULL,
  `idmantenimiento_servicios` int(11) NOT NULL,
  `idmodelos_vehiculos` int(11) NOT NULL,
  `estado_modelo_x_servicio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `modelos_x_servicios`
--

INSERT INTO `modelos_x_servicios` (`idmodelos_x_servicios`, `idmantenimiento_servicios`, `idmodelos_vehiculos`, `estado_modelo_x_servicio`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1),
(3, 1, 4, 1),
(4, 1, 3, 1),
(5, 65, 2, 1),
(6, 65, 1, 1),
(7, 65, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_compra`
--

CREATE TABLE `ordenes_compra` (
  `idordenes_compra` int(11) NOT NULL,
  `contratos_idcontratos` int(11) DEFAULT NULL,
  `sedes_idsedes` int(11) DEFAULT NULL,
  `proveedores_idproveedores` int(11) DEFAULT NULL,
  `tiene_contrato` int(11) DEFAULT NULL,
  `nro_orden_compra` varchar(50) DEFAULT NULL,
  `monto_orden_compra` double DEFAULT NULL,
  `descripcion_orden_compra` text,
  `fecha_orden_compra` date DEFAULT NULL,
  `estado_orden_compra` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ordenes_compra`
--

INSERT INTO `ordenes_compra` (`idordenes_compra`, `contratos_idcontratos`, `sedes_idsedes`, `proveedores_idproveedores`, `tiene_contrato`, `nro_orden_compra`, `monto_orden_compra`, `descripcion_orden_compra`, `fecha_orden_compra`, `estado_orden_compra`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(3, 18, 9, 1, 1, '0000087', 1218.37, 'SUMINISTRO DE COMBUSTIBLE\r\nCORRESPONDIENTE AL PERIODO DEL 03/04/2017 AL 28/04/2017 \r\nUNIDAD VEHICULAR: S1D-850', '2017-04-28', 1, '2017-05-11 10:50:58', 'jvelasquez', NULL, NULL),
(4, 18, 9, 1, 1, '0000088', 1307.26, 'SUMINISTRO DE COMBUSTIBLE', '2017-04-28', 1, '2017-05-11 10:51:37', 'jvelasquez', '2017-05-26 18:49:00', ''),
(5, 18, 9, 1, 1, '0000089', 542.13, 'SUMINISTRO DE COMBUSTIBLE', '2017-04-28', 1, '2017-05-11 10:53:26', 'jvelasquez', '2017-05-26 18:51:50', ''),
(6, 18, 9, 1, 1, '0000090', 1184.64, 'SUMINISTRO DE COMBUSTIBLE SEDE CENTRAL SSE', '2017-04-28', 1, '2017-05-11 10:54:19', 'jvelasquez', '2017-05-26 18:52:18', ''),
(7, 18, 9, 1, 1, '0000017', 1364.14, 'SUMINISTRO DE COMBUSTIBLE\r\nCORRESPONDIENTE AL PERIODO DEL 02/01/2017 AL 27/01/2017\r\nUNIDAD VEHICULAR: S1D-850\r\nSUMINISTRO DE COMBUSTIBLE\r\nPERIODO: 02/01/2017 AL 03/01/2017\r\nUNIDAD VEHICULAR: EGN-927 / CGU-026', '2017-01-04', 1, '2017-05-11 12:04:27', 'jvelasquez', NULL, NULL),
(8, 18, 9, 1, 1, '0000018', 1804.23, 'SUMINISTRO DE COMBUSTIBLE\r\nPERIODO: DEL 04/01/2017 AL 18/01/2017\r\nUNIDAD VEHICULAR: EGN-927 / EGR-305 / CGU-026 / EGQ-969 ', '2017-01-18', 1, '2017-05-11 12:06:55', 'jvelasquez', NULL, NULL),
(9, 18, 9, 1, 1, '0000019', 931.58, 'SUMINISTRO DE COMBUSTIBLE\r\nPERIODO: DEL 18/01/2017 AL 25/01/2017\r\nUNIDADES: EGN-927 / EGR-305 / EGQ-969 / CGU-026', '2017-01-25', 1, '2017-05-11 12:08:34', 'jvelasquez', NULL, NULL),
(10, 18, 9, 1, 1, '0000020', 455.52, 'SUMINISTRO DE COMBUSTIBLE\r\nPERIODO: 25/01/2017 AL 26/01/2017\r\nUNIDADES VEHICULARES: EGR-305 / EGQ-969', '2017-01-26', 1, '2017-05-11 12:09:31', 'jvelasquez', NULL, NULL),
(11, 18, 9, 1, 1, '0000021', 1093.22, 'SUMINISTRO DE COMBUSTIBLE\r\nPERIODO: DEL 31/01/2017\r\nUNIDAD VEHICULAR: S1D-850\r\n\r\nSUMINISTRO DE COMBUSTIBLE\r\nPERIODO: DEL 28/01/2017 AL 31/01/2017\r\nUNIDADES VEHICULARES: EGN-927 / EGQ-969 / CGU-026 / EGR-305', '2017-01-31', 1, '2017-05-11 12:10:55', 'jvelasquez', NULL, NULL),
(12, 18, 9, 1, 1, '0000209', 2582.38, 'GASOLINA 95 OCTANOS', '2016-10-06', 1, '2017-05-15 15:34:14', 'jvelasquez', NULL, NULL),
(13, 18, 9, 1, 1, '0000219', 159.98, 'DIESEL B5 S50', '2016-10-21', 1, '2017-05-15 15:35:21', 'jvelasquez', NULL, NULL),
(14, 18, 9, 1, 1, '0000224', 1259.22, 'GASOLINA 95 OCTANOS', '2016-10-31', 1, '2017-05-15 15:35:57', 'jvelasquez', NULL, NULL),
(15, 18, 9, 1, 1, '0000225', 1057.42, 'GASOLINA DE 95 OCTANOS', '2016-10-31', 1, '2017-05-15 15:36:38', 'jvelasquez', NULL, NULL),
(16, 18, 9, 1, 1, '0000223', 1039.88, 'GASOLINA DE 95 OCTANOS', '2016-10-31', 1, '2017-05-15 15:37:16', 'jvelasquez', NULL, NULL),
(17, 18, 9, 1, 1, '0000226', 489.96, 'GASOLINA DE 95 OCTANOS', '2016-10-31', 1, '2017-05-15 15:37:48', 'jvelasquez', NULL, NULL),
(18, 18, 9, 1, 1, '0000187', 9036.15, 'GASOLINA DE 95 OCTANOS', '2016-08-10', 1, '2017-05-15 15:38:13', 'jvelasquez', NULL, NULL),
(20, 18, 9, 1, 1, '0000208', 2091.43, 'GASOLINA DE 95 OCTANOS', '2016-10-05', 1, '2017-05-15 15:39:20', 'jvelasquez', NULL, NULL),
(21, 18, 9, 1, 1, '0000211', 456.41, 'DIESEL B5 S50', '2016-10-07', 1, '2017-05-15 15:40:26', 'jvelasquez', NULL, NULL),
(22, 18, 9, 1, 1, '0000212', 167.16, 'DIESEL B5 S50', '2016-10-07', 1, '2017-05-15 15:41:01', 'jvelasquez', NULL, NULL),
(23, 18, 9, 1, 1, '0000218', 509.13, 'DIESEL B5 S50', '2016-10-21', 1, '2017-05-15 15:41:22', 'jvelasquez', NULL, NULL),
(24, 18, 9, 1, 1, '0000210', 626.93, 'GASOLINA DE 95 OCTANOS', '2016-10-07', 1, '2017-05-15 15:41:49', 'jvelasquez', '2017-05-15 15:42:01', 'jvelasquez'),
(25, 18, 9, 1, 1, '0000222', 611.37, 'GASOLINA DE 95 OCTANOS', '2016-10-31', 1, '2017-05-15 15:42:42', 'jvelasquez', NULL, NULL),
(26, 18, 9, 1, 1, '0000207', 1161.81, 'GASOLINA DE 95 OCTANOS', '2016-10-04', 1, '2017-05-15 15:43:09', 'jvelasquez', NULL, NULL),
(27, 18, 9, 1, 1, '0000045', 1856.4, 'GASOLINA DE 95 OCTANOS', '2017-02-28', 1, '2017-05-15 17:33:06', 'jvelasquez', NULL, NULL),
(28, 18, 9, 1, 1, '0000043', 941.16, 'DIESEL B5 S50 / GASOLINA DE 95 OCTANOS', '2017-02-28', 1, '2017-05-15 17:33:42', 'jvelasquez', NULL, NULL),
(29, 18, 9, 1, 1, '0000044', 1149.71, 'DIESEL B5 S50 / GASOLINA DE 95 OCTANOS', '2017-02-28', 1, '2017-05-15 17:34:19', 'jvelasquez', NULL, NULL),
(30, 18, 9, 1, 1, '0000233', 352.25, 'DIESEL B5 S50', '2016-12-01', 1, '2017-05-15 17:34:50', 'jvelasquez', NULL, NULL),
(31, 18, 9, 1, 1, '0000232', 1177.97, 'GASOLINA DE 95 OCTANOS', '2016-12-01', 1, '2017-05-15 17:35:16', 'jvelasquez', NULL, NULL),
(32, 18, 9, 1, 1, '0000231', 671.73, 'GASOLINA DE 95 OCTANOS', '2016-12-01', 1, '2017-05-15 17:35:43', 'jvelasquez', NULL, NULL),
(33, 18, 9, 1, 1, '0000230', 1183.16, 'GASOLINA DE 95 OCTANOS', '2016-12-01', 1, '2017-05-15 17:36:10', 'jvelasquez', NULL, NULL),
(34, 18, 9, 1, 1, '0000229', 950.45, 'GASOLINA DE 95 OCTANOS', '2016-12-01', 1, '2017-05-15 17:36:37', 'jvelasquez', NULL, NULL),
(35, 18, 9, 1, 1, '0000046', 707.24, 'GASOLINA DE 95 OCTANOS', '2017-02-28', 1, '2017-05-15 17:37:05', 'jvelasquez', NULL, NULL),
(36, 18, 9, 1, 1, '0000070', 1155.99, 'SUMINISTRO DE COMBUSTIBLE', '2017-04-03', 1, '2017-05-26 17:43:14', '', '2017-06-27 16:08:36', ''),
(37, 18, 9, 1, 1, '0000071', 2021.81, 'SUMINISTRO DE COMBUSTIBLE PARA LA FLOTA VEHICULAR DE LA SEDE CENTRAL DE SSE', '2017-04-03', 1, '2017-05-26 18:38:41', '', NULL, NULL),
(38, 18, 9, 1, 1, '0000072', 604.24, 'SUMINISTRO DE COMBUSTIBLE SEDE CENTRAL SSE', '2017-04-03', 1, '2017-05-26 18:42:36', '', '2017-05-26 18:43:58', ''),
(39, 18, 9, 1, 1, '0000073', 1386.96, 'SUMINISTRO COMBUSTIBLE SEDE CENTRAL SSE', '2017-04-03', 1, '2017-05-26 18:44:50', '', NULL, NULL),
(40, NULL, 7, 3, 0, '0000011', 2240, 'SUMINISTRO DE COMBUSTIBLE PARA LA UNIDAD VEHICULAR PARA LA SEDE DESCONCENTRADA DE HUANUCO', '2017-01-02', 1, '2017-06-26 09:38:09', 'jvelasquez', '2017-06-26 09:49:32', ''),
(41, NULL, 2, 1, 0, '15', 4160, 'SUMINISTRO DE COMBUSTIBLE', '2017-01-02', 1, '2017-08-23 15:24:43', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_compra_items`
--

CREATE TABLE `ordenes_compra_items` (
  `idordenes_compra_item` int(11) NOT NULL,
  `idordenes_compra` int(11) NOT NULL,
  `id_item_adjudicados` int(11) DEFAULT NULL,
  `idtipo_combustible` int(11) DEFAULT NULL,
  `idmedida_combustible` int(11) DEFAULT NULL,
  `cantidad_item` double DEFAULT NULL,
  `precio_unitario_item` double DEFAULT NULL,
  `importe_total_item` double DEFAULT NULL,
  `periodo_desde` date DEFAULT NULL,
  `periodo_hasta` date DEFAULT NULL,
  `descripcion_item_oc` text,
  `estado_item_oc` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ordenes_compra_items`
--

INSERT INTO `ordenes_compra_items` (`idordenes_compra_item`, `idordenes_compra`, `id_item_adjudicados`, `idtipo_combustible`, `idmedida_combustible`, `cantidad_item`, `precio_unitario_item`, `importe_total_item`, `periodo_desde`, `periodo_hasta`, `descripcion_item_oc`, `estado_item_oc`) VALUES
(3, 28, 1, NULL, NULL, 6.046, 15.239828, 92.14, '2017-02-01', '2017-02-01', 'UNIDAD VEHICULAR CGU-026', 1),
(4, 28, 2, NULL, NULL, 75.334, 11.270077, 849.02, '2017-02-02', '2017-02-20', 'UNIDAD VEHICULAR S1D-850', 1),
(5, 29, 2, NULL, NULL, 17.114, 11.219469, 192.01, '2017-02-27', '2017-02-27', 'S1D-850', 1),
(6, 29, 1, NULL, NULL, 63.592, 15.06007, 957.7, '2017-02-02', '2017-02-08', 'EGN-927 | EGQ-969 | EGR-305 | CGU-026 | LGY-453', 1),
(7, 27, 1, NULL, NULL, 124.007, 14.970123, 1856.4, '2017-02-08', '2017-02-23', 'CGU-026 | EGQ-969 | EGR-305 | EGN-927', 1),
(8, 34, 1, NULL, NULL, 64.61, 14.710571, 950.45, '2016-11-03', '2016-11-08', 'EGN-927 | EGR-305 | EGQ-969', 1),
(9, 7, 1, NULL, NULL, 12.2, 15.340164, 187.15, '2017-01-02', '2017-01-03', 'UNIDAD VEHICULAR: EGN-927 / CGU-026', 1),
(10, 7, 2, NULL, NULL, 104.158, 11.300044, 1176.99, '2017-01-02', '2017-01-27', 'UNIDAD VEHICULAR: S1D-850', 1),
(11, 8, 1, NULL, NULL, 116.326, 15.510118, 1804.23, '2017-01-04', '2017-01-18', 'UNIDAD VEHICULAR: EGN-927 / EGR-305 / CGU-026 / EGQ-969 ', 1),
(12, 9, 1, NULL, NULL, 60.414, 15.419936, 931.58, '2017-01-18', '2017-01-25', 'UNIDADES: EGN-927 / EGR-305 / EGQ-969 / CGU-026', 1),
(13, 10, 1, NULL, NULL, 29.831, 15.270021, 455.52, '2017-01-25', '2017-01-26', 'UNIDADES VEHICULARES: EGR-305 / EGQ-969', 1),
(14, 11, 2, NULL, NULL, 19.043, 11.269758, 214.61, '2017-01-31', '2017-01-31', 'UNIDADES VEHICULARES: EGN-927 / EGQ-969 / CGU-026 / EGR-305', 1),
(15, 11, 1, NULL, NULL, 57.651, 15.240152, 878.61, '2017-01-28', '0017-01-31', 'UNIDADES VEHICULARES: EGN-927 / EGQ-969 / CGU-026 / EGR-305', 1),
(16, 35, 1, NULL, NULL, 47.433, 14.910295, 707.24, '2017-02-27', '2017-02-28', 'UNIDAD VEHICULAR: EGR-305, EGN-927, CGU-026, EGQ-969.', 1),
(17, 36, 2, NULL, NULL, 103.029, 11.220045, 1155.99, '2017-03-02', '2017-03-31', 'UNIDAD VEHICULAR : S1D-850', 1),
(18, 6, 1, NULL, NULL, 78.194, 15.150012, 1184.64, '2017-04-22', '2017-04-28', 'UNIDAD VEHICULAR : EGN-927 / EGQ-969 / LGY-453', 1),
(19, 37, 1, NULL, NULL, 135.6, 14.910103, 2021.81, '2017-03-02', '2017-03-16', 'UNIDAD VEHICULAR: EGN-927 / CGU-026 / EGR-305 / LGY-453', 1),
(20, 38, 1, NULL, NULL, 40.799, 14.810167, 604.24, '2017-03-17', '2017-03-21', 'UNIDAD VEHICULAR : EGQ-969 / LGY-453 / EGN-927', 1),
(21, 39, 1, NULL, NULL, 94.415, 14.690039, 1386.96, '2017-03-23', '2017-03-31', 'UNIDAD VEHICULAR : LGY-453 / EGN-927 / EGQ-969 / CGU-026', 1),
(22, 3, 2, NULL, NULL, 108.589, 11.220013, 1218.37, '2017-04-03', '2017-04-28', 'UNIDAD VEHICULAR: S1D-850', 1),
(23, 4, 1, NULL, NULL, 88.89, 14.689965, 1307.26, '2017-04-03', '2017-04-11', 'UNIDAD VEHICULAR: CGU-026 / LGY-453 / EGN-927 / EGQ-969', 1),
(24, 5, 1, NULL, NULL, 36.142, 15, 542.13, '2017-04-15', '2017-04-19', 'UNIDAD VEHICULAR: EGN-927 / LGY-453 ', 1),
(25, 40, NULL, 6, 1, 200, 11.2, 2240, '2017-01-02', '2017-07-31', 'vigencia contractual: hasta agotar el monto contratado y/o vencimiento del contrato, lo que siceda primero.', 1),
(26, 18, 1, NULL, 1, 535, 16.89, 9036.15, '2016-07-01', '2016-08-16', 'GASOLINA DE 95 OCTANOS', 1),
(27, 26, 1, NULL, 1, 85.053, 13.659835, 1161.81, '2016-08-18', '2016-08-24', 'GASOLINA DE 95 OCTANOS', 1),
(28, 20, 1, NULL, 1, 147.179, 14.210111, 2091.43, '2016-09-01', '2016-09-12', 'GASOLINA DE 95 OCTANOS', 1),
(29, 12, 1, NULL, 1, 184.455, 14.000054, 2582.38, '2016-09-15', '2016-09-28', 'GASOLINA DE 95 OCTANOS', 1),
(30, 24, 1, NULL, 1, 44.526, 14.080088, 626.93, '2016-09-28', '2016-09-30', 'GASOLINA DE 95 OCTANOS', 1),
(31, 22, 2, NULL, 1, 13.029, 12.83, 167.16, '2016-08-10', '2016-08-10', 'DIESEL B5 S50', 1),
(32, 21, 2, NULL, 1, 35.574, 12.829875, 456.41, '2016-07-12', '2016-07-25', 'DIESEL B5 S50', 1),
(33, 23, 2, NULL, 1, 47.986, 10.609969, 509.13, '2016-10-05', '2016-10-27', 'DIESEL B5 S50', 1),
(34, 13, 2, NULL, 1, 14.439, 11.08, 159.98, '2016-10-28', '2016-10-28', 'DIESEL B5 S50', 1),
(35, 25, 1, NULL, 1, 43.42, 14.080377, 611.37, '2016-10-02', '2016-10-05', 'GASOLINA DE 95 OCTANOS', 1),
(36, 17, 1, NULL, 1, 33.31, 14.709096, 489.96, '2016-10-28', '2016-10-29', 'GASOLINA DE 95 OCTANOS', 1),
(37, 16, 1, NULL, 1, 72.92, 14.260559, 1039.88, '2016-10-06', '2016-10-12', 'GASOLINA DE 95 OCTANOS', 1),
(38, 15, 1, NULL, 1, 71.59, 14.770498, 1057.42, '2016-10-20', '2016-10-28', 'GASOLINA DE 95 OCTANOS', 1),
(39, 14, 1, NULL, 1, 85.54, 14.720832, 1259.22, '2016-10-13', '2016-10-19', 'GASOLINA DE 95 OCTANOS', 1),
(40, 33, 1, NULL, 1, 81.65, 14.49063, 1183.16, '2016-11-10', '2016-11-16', 'GASOLINA DE 95 OCTANOS', 1),
(41, 32, 1, NULL, 1, 47.14, 14.249681, 671.73, '2016-11-18', '2016-11-23', 'GASOLINA DE 95 OCTANOS', 1),
(42, 31, 1, NULL, 1, 83.78, 14.060276, 1177.97, '2016-11-23', '2016-11-29', 'GASOLINA DE 95 OCTANOS', 1),
(43, 30, 2, NULL, 1, 31.48, 11.189644, 352.25, '2016-11-25', '2016-11-30', 'DIESEL B5 S50', 1),
(44, 41, NULL, 2, 1, 145.2, 15.2, 4160, '2017-08-22', '2017-08-30', 'xxxxxxx', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_trabajo`
--

CREATE TABLE `orden_trabajo` (
  `idorden_trabajo` int(11) NOT NULL,
  `idmantenimiento_evaluaciones` int(11) NOT NULL,
  `usuarios_idusuarios` int(11) NOT NULL,
  `nro_orden_sigap` varchar(45) DEFAULT NULL,
  `kilometraje_internamiento` int(11) DEFAULT NULL,
  `descripcion_orden_trabajo` text,
  `fecha_orden_trabajo` date DEFAULT NULL,
  `fecha_estimada_inicio` date DEFAULT NULL,
  `fecha_estimada_fin` date DEFAULT NULL,
  `is_aprobado_orden_trabajo` int(11) DEFAULT NULL,
  `estado_orden_trabajo` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `orden_trabajo`
--

INSERT INTO `orden_trabajo` (`idorden_trabajo`, `idmantenimiento_evaluaciones`, `usuarios_idusuarios`, `nro_orden_sigap`, `kilometraje_internamiento`, `descripcion_orden_trabajo`, `fecha_orden_trabajo`, `fecha_estimada_inicio`, `fecha_estimada_fin`, `is_aprobado_orden_trabajo`, `estado_orden_trabajo`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(2, 5, 1, NULL, NULL, '04 llantas modelo: 265/70R16 goodyear para la unidad con placa S1D-850', '2016-12-22', '2017-05-22', '2017-05-22', 0, 1, '2017-05-23 00:38:54', 'jvelasquez', '2017-05-23 00:39:38', 'jvelasquez'),
(4, 42, 1, NULL, NULL, 'XXXX', '2017-08-03', '2017-08-23', '2017-08-24', 0, 1, '2017-08-07 18:54:44', '', NULL, NULL),
(5, 43, 1, NULL, NULL, 'ORDEN DE TRABAJO PARA EL CARRO DEL CHICHO', '2017-08-09', '2017-08-22', '2017-08-31', 0, 1, '2017-08-09 16:15:26', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `idproveedores` int(11) NOT NULL,
  `razon_social` varchar(250) DEFAULT NULL,
  `ruc_proveedor` varchar(45) DEFAULT NULL,
  `telefono_proveedor` varchar(50) DEFAULT NULL,
  `celular_proveedor` varchar(45) DEFAULT NULL,
  `domicilio_fiscal` varchar(250) DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `representante_legal` varchar(250) DEFAULT NULL,
  `dni_representante_legal` varchar(10) DEFAULT NULL,
  `estado_proveedor` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`idproveedores`, `razon_social`, `ruc_proveedor`, `telefono_proveedor`, `celular_proveedor`, `domicilio_fiscal`, `correo_electronico`, `representante_legal`, `dni_representante_legal`, `estado_proveedor`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 'ABA SINGER & CIA. SAC', '20100032881', '0000', '000', 'CALLE MONTE ROSA 240 OFICINA 1002 URBANIZACION CHACARILLA DEL ESTANQUE-SANTIAGO DE SURCO', 'abasinger@abasinger.com', 'JORGE ANTONIO VALENTE AZURZA', '09435042', 1, '2017-05-10 19:36:01', 'jvelasquez', NULL, NULL),
(3, 'ESTACION DE SERVICIOS PASTOR SRL', '20285579814', '062516500', 'NO REGISTRA', 'CARRETERA HUANUCO, TINGO MARIA', 'pastor@gmail.com', 'NO REGISTRA', '0', 1, '2017-06-26 09:35:37', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idroles` int(11) NOT NULL,
  `nombre_rol` varchar(45) DEFAULT NULL,
  `descripcion_rol` varchar(250) DEFAULT NULL,
  `cod_rol` char(3) DEFAULT NULL,
  `estado_rol` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idroles`, `nombre_rol`, `descripcion_rol`, `cod_rol`, `estado_rol`) VALUES
(1, 'ADMINISTRADOR', 'Este rol tiene accesos para todo el sistema', 'ADM', 1),
(4, 'USUARIO', 'Rol de usuario de sistema', 'USU', 1),
(5, 'CHOFER', 'Rol para los choferes', 'CHO', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `idsedes` int(11) NOT NULL,
  `empresas_idempresas` int(11) NOT NULL,
  `nombre_sede` varchar(250) DEFAULT NULL,
  `direccion_uno` varchar(250) DEFAULT NULL,
  `direccion_dos` varchar(250) DEFAULT NULL,
  `telefono_sede` varchar(50) DEFAULT NULL,
  `celular_sede` varchar(45) DEFAULT NULL,
  `correo_sede` varchar(45) DEFAULT NULL,
  `coordenadas_sede` varchar(100) DEFAULT NULL,
  `estado_sede` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sedes`
--

INSERT INTO `sedes` (`idsedes`, `empresas_idempresas`, `nombre_sede`, `direccion_uno`, `direccion_dos`, `telefono_sede`, `celular_sede`, `correo_sede`, `coordenadas_sede`, `estado_sede`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 1, 'SEDE AMAZONAS', 'Triunfo 778, Chachapoyas, Amazonas, PerÃº.', NULL, '(041) 478869', '941729266', 'vrondinel@sierraexportadora.gob.pe', '-6.23065, -77.87097', 1, '2017-05-05 14:09:11', 'jvelasquez', NULL, NULL),
(2, 1, 'SEDE ANCASH', 'Jr. Manuel Eulogio del RÃ­o 1243 - Barrio La Soledad - Huaraz', NULL, '(043) 422780', '943529219', 'jguerra@sierraexportadora.gob.pe', '-9.53406, -77.52539', 1, '2017-05-05 14:10:12', 'jvelasquez', NULL, NULL),
(3, 1, 'SEDE PIURA', 'Calle Las Carolinas Mz. H1, Lote 13 UrbanizaciÃ³n Miraflores (Frente al pozo de agua de Miraflores) - Piura', NULL, '(073) 403591', '962701968', 'piura@sierraexportadora.gob.pe', '-5.183604, -80.619033', 1, '2017-05-05 14:12:05', 'jvelasquez', NULL, NULL),
(4, 1, 'SEDE LAMBAYEQUE', 'AndrÃ©s Avelino CÃ¡ceres 566 Oficina 201 -UrbanizaciÃ³n Santa VÃ­ctoria - Chiclayo', NULL, '(074) 272414', '993535886', 'csaavedra@sierraexportadora.gob.pe', '-6.78131, -79.833236', 1, '2017-05-05 14:12:45', 'jvelasquez', NULL, NULL),
(5, 1, 'SEDE CAJAMARCA', 'Jr. Cumbe Mayo 335 - Cajamarca', NULL, '(076) 367175', '989248217', 'rbarreto@sierraexportadora.gob.pe', '-7.16151, -78.50656', 1, '2017-05-05 14:13:29', 'jvelasquez', NULL, NULL),
(6, 1, 'SEDE LA LIBERTAD', 'Av. 28 de Julio 166, Of. 501, Urb. El Recreo, Trujillo', NULL, '(044) 206484', '993-535917', 'ljeri@sierraexportadora.gob.pe', '-8.11738, -79.029', 1, '2017-05-05 14:14:51', 'jvelasquez', NULL, NULL),
(7, 1, 'SEDE HUANUCO', 'Jr. 28 de Julio 1557 Huanuco', NULL, '(062) 512488', '958790964', 'dpereyra@sierraexportadora.gob.pe', '-9.92973, -76.23924', 1, '2017-05-05 14:15:41', 'jvelasquez', NULL, NULL),
(8, 1, 'SEDE PASCO', 'Av. Chontabamba s/n- Chontabamba -Oxapampa - Pasco', NULL, '(01) 7267294', '993535884', 'jlatorre@sierraexportadora.gob.pe', '-10.573481, -75.402829', 1, '2017-05-05 14:16:22', 'jvelasquez', NULL, NULL),
(9, 1, 'SEDE CENTRAL', 'Calle los Zorzales 160- 4to Piso, San Isidro,  PerÃº', NULL, '(01) 215 0730 - 200', 'No registra', 'sierrainforma@sierraexportadora.gob.pe', '-12.10009, -77.01856', 1, '2017-05-05 14:17:19', 'jvelasquez', NULL, NULL),
(10, 1, 'SEDE JUNIN', 'Calle Real NÂº 582 (OF. 202 Y 203) - El Tambo - Huancayo', NULL, '(064)-601348 (oficina) - 064-601349 (oficina Ing. ', '964258082', 'siexsedejunin@gmail.com', '-12.0692, -75.20982', 1, '2017-05-05 14:18:57', 'jvelasquez', NULL, NULL),
(11, 1, 'SEDE HUANCAVELICA', 'Calle Manuel Ubalde 103 - AscensiÃ³n - Huancavelica ', NULL, '(067) 452409', '993585218 ', 'culfe@sierraexportadora.gob.pe', '-12.78411, -74.97741', 1, '2017-05-05 14:19:42', 'jvelasquez', NULL, NULL),
(12, 1, 'SEDE AYACUCHO', 'Jr. 28 de Julio NÂ° 699, piso 02- Huamanga - Ayacucho Oficina en el VRAEM: Municipalidad de Distrito de Pichari - La Convencion - Cusco.', NULL, '318859', '988004208', 'whuarcaya@sierraexportadora.gob.pe', '-13.168261, -74.227402', 1, '2017-05-05 14:20:36', 'jvelasquez', NULL, NULL),
(13, 1, 'SEDE APURIMAC', 'Jr. ApurÃ­mac NÂ° 420 -3er Piso - Abancay', NULL, '(083) 322490', '983701879', 'nccoicca@sierraexportadora.gob.pe', '-13.63464, -72.87891', 1, '2017-05-05 14:21:27', 'jvelasquez', NULL, NULL),
(14, 1, 'SEDE CUSCO', 'Parque EspaÃ±a E-4 UrbanizaciÃ³n Santa MÃ³nica - Cusco', NULL, '(084) 236293', '984704703', 'renan.alfaro@sierraexportadora.gob.pe', '-13.527097, -71.95036', 1, '2017-05-05 14:22:04', 'jvelasquez', NULL, NULL),
(15, 1, 'SEDE AREQUIPA', 'Av. EjÃ©rcito 101 - Oficina 605, Yanahuara, Arequipa', NULL, '(054) 340292', '959742466', 'avasquez@sierraexportadora.gob.pe', '-16.3924, -71.54107', 1, '2017-05-05 14:23:02', 'jvelasquez', NULL, NULL),
(16, 1, 'SEDE MOQUEGUA', 'Av. Simon Bolivar D-6, Moquegua', NULL, '(053) 463637', '978000952', 'ymamani@sierraexportadora.gob.pe', '-17.188585, -70.933074', 1, '2017-05-05 14:23:42', 'jvelasquez', NULL, NULL),
(17, 1, 'SEDE PUNO', 'JirÃ³n JosÃ© Moral NÂ° 215 Piso 3 - Puno', NULL, '(051) 369231', '989317730', 'eventura@sierraexportadora.gob.pe', '-15.844896, -70.025333', 1, '2017-05-05 15:44:17', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_cierre_chofer`
--

CREATE TABLE `servicios_cierre_chofer` (
  `idservicios_cierre_chofer` int(11) NOT NULL,
  `idservicio_solicitud` int(11) NOT NULL,
  `fecha_inicio_real` datetime DEFAULT NULL,
  `fecha_fin_real` datetime DEFAULT NULL,
  `kilometraje_inicio` int(11) DEFAULT NULL,
  `kilometraje_fin` int(11) DEFAULT NULL,
  `observaciones_chofer` text,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicios_cierre_chofer`
--

INSERT INTO `servicios_cierre_chofer` (`idservicios_cierre_chofer`, `idservicio_solicitud`, `fecha_inicio_real`, `fecha_fin_real`, `kilometraje_inicio`, `kilometraje_fin`, `observaciones_chofer`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 24, '2017-08-07 08:40:00', '2017-08-07 11:20:00', 156230, 156290, 'NINGUNA TODO BIEN', '2017-08-23 14:12:13', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_cierre_usuario`
--

CREATE TABLE `servicios_cierre_usuario` (
  `idservicios_cierre` int(11) NOT NULL,
  `idservicio_solicitud` int(11) NOT NULL,
  `usuarios_idusuarios` int(11) NOT NULL,
  `calificacion_usuario` int(11) DEFAULT NULL,
  `observaciones_usuario` text,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicios_cierre_usuario`
--

INSERT INTO `servicios_cierre_usuario` (`idservicios_cierre`, `idservicio_solicitud`, `usuarios_idusuarios`, `calificacion_usuario`, `observaciones_usuario`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(2, 24, 1, 3, 'xxxxxxxxx', '2017-08-28 07:19:53', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_comisionados`
--

CREATE TABLE `servicios_comisionados` (
  `idservicios_comisionados` int(11) NOT NULL,
  `idservicio_solicitud` int(11) NOT NULL,
  `usuarios_idusuarios` int(11) NOT NULL,
  `estado_comisionado` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicios_comisionados`
--

INSERT INTO `servicios_comisionados` (`idservicios_comisionados`, `idservicio_solicitud`, `usuarios_idusuarios`, `estado_comisionado`, `fecha_creacion`, `usuario_creacion`) VALUES
(28, 23, 88, 1, '2017-08-04 08:52:42', 'dortiz'),
(29, 24, 99, 1, '2017-08-04 18:06:55', 'dortiz'),
(30, 24, 94, 1, '2017-08-04 18:06:55', 'dortiz'),
(31, 24, 28, 1, '2017-08-04 18:06:55', 'dortiz'),
(32, 25, 3, 1, '2017-11-20 18:11:44', 'jvelasquez'),
(33, 26, 3, 1, '2017-11-20 18:13:03', 'jvelasquez'),
(34, 27, 1, 1, '2017-11-20 18:14:29', 'jvelasquez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_destinos`
--

CREATE TABLE `servicios_destinos` (
  `idservicios_destinos` int(11) NOT NULL,
  `idservicio_solicitud` int(11) NOT NULL,
  `ubigeo_idubigeo` int(11) NOT NULL,
  `lugar_destino` varchar(45) DEFAULT NULL,
  `direccion_destino` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_escala_movilidades`
--

CREATE TABLE `servicios_escala_movilidades` (
  `idservicios_escala_movilidades` int(11) NOT NULL,
  `destino` varchar(250) DEFAULT NULL,
  `monto` double DEFAULT NULL,
  `estado_escala` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicios_escala_movilidades`
--

INSERT INTO `servicios_escala_movilidades` (`idservicios_escala_movilidades`, `destino`, `monto`, `estado_escala`) VALUES
(1, 'PUENTE PIEDRA', 50, 1),
(2, 'CARABAYLLO', 50, 1),
(3, 'COMAS', 50, 1),
(4, 'VENTANILLA', 50, 1),
(5, 'LURIN', 50, 1),
(6, 'PACHACAMAC', 50, 1),
(7, 'VILLA EL SALVADOR', 50, 1),
(8, 'CIENEGUILLA', 50, 1),
(9, 'CALLAO', 50, 1),
(10, 'BELLAVISTA', 50, 1),
(11, 'CARMEN DE LA LEGUA', 50, 1),
(12, 'LA PERLA', 50, 1),
(13, 'LA PUNTA', 50, 1),
(14, 'LOS OLIVOS', 50, 1),
(15, 'SAN JUAN DE LURIGANCHO', 50, 1),
(16, 'INDEPENDENCIA', 50, 1),
(17, 'SAN MARTIN DE PORRES', 50, 1),
(18, 'ZARATE', 50, 1),
(19, 'VILLA MARIA DEL TRIUNFIO', 50, 1),
(20, 'SAN JUAN DE MIRAFLORES', 40, 1),
(21, 'ATE - VITARTE', 40, 1),
(22, 'SANTA ANITA', 40, 1),
(23, 'LA MOLINA', 40, 1),
(24, 'CHORRILLOS', 40, 1),
(25, 'SAN MIGUEL', 40, 1),
(26, 'RIMAC', 40, 1),
(27, 'BARRIOS ALTOS', 40, 1),
(28, 'PUEBLO LIBRE', 30, 1),
(29, 'MAGDALENA', 30, 1),
(30, 'BREÑA', 30, 1),
(31, 'SURCO', 30, 1),
(32, 'BARRANCO', 30, 1),
(33, 'CENTRO DE LIMA', 30, 1),
(34, 'JESUS MARIA', 20, 1),
(35, 'LA VICTORIA', 20, 1),
(36, 'SAN LUIS', 20, 1),
(37, 'SAN BORJA', 20, 1),
(38, 'LINCE', 20, 1),
(39, 'SAN ISIDRO', 15, 1),
(40, 'SURQUILLO', 15, 1),
(41, 'MIRAFLORES', 15, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_estados`
--

CREATE TABLE `servicios_estados` (
  `idservicios_estados` int(11) NOT NULL,
  `idservicio_solicitud` int(11) NOT NULL,
  `estado_servicio` varchar(50) DEFAULT NULL,
  `observaciones_estado` text,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicios_estados`
--

INSERT INTO `servicios_estados` (`idservicios_estados`, `idservicio_solicitud`, `estado_servicio`, `observaciones_estado`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(3, 23, 'CANCELADO', 'PRUEBA DEL SERVICIO', '2017-08-04 08:53:47', 'dortiz', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_incidencias`
--

CREATE TABLE `servicios_incidencias` (
  `idservicios_incidencias` int(11) NOT NULL,
  `idservicio_solicitud` int(11) NOT NULL,
  `tipo_incidencia` varchar(100) DEFAULT NULL,
  `descripcion_incidencia` text,
  `fecha_incidencia` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_solicitud`
--

CREATE TABLE `servicios_solicitud` (
  `idservicio_solicitud` int(11) NOT NULL,
  `chofer_idchofer` int(11) DEFAULT NULL,
  `usuarios_idusuarios` int(11) NOT NULL,
  `vehiculos_idvehiculos` int(11) DEFAULT NULL,
  `idtipos_vehiculo` int(11) NOT NULL,
  `ubigeo_idubigeo` int(11) NOT NULL,
  `lugar_destino` varchar(250) DEFAULT NULL,
  `direccion_destino` varchar(250) DEFAULT NULL,
  `usuario_chofer` varchar(45) DEFAULT NULL,
  `usuario_solicita` varchar(45) DEFAULT NULL,
  `motivo_comision` text,
  `idevent` int(11) DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `start_date` int(11) DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `end_date` int(11) DEFAULT NULL,
  `es_ida_vuelta` int(11) DEFAULT NULL,
  `es_aprobado` int(11) DEFAULT NULL,
  `es_asignado` int(11) DEFAULT NULL,
  `es_cancelado` int(11) DEFAULT NULL,
  `es_espera` int(11) DEFAULT NULL,
  `es_vale` int(11) DEFAULT NULL,
  `es_finalizado` int(11) DEFAULT NULL,
  `estado_servicio_solicitud` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicios_solicitud`
--

INSERT INTO `servicios_solicitud` (`idservicio_solicitud`, `chofer_idchofer`, `usuarios_idusuarios`, `vehiculos_idvehiculos`, `idtipos_vehiculo`, `ubigeo_idubigeo`, `lugar_destino`, `direccion_destino`, `usuario_chofer`, `usuario_solicita`, `motivo_comision`, `idevent`, `fecha_inicio`, `start_date`, `fecha_fin`, `end_date`, `es_ida_vuelta`, `es_aprobado`, `es_asignado`, `es_cancelado`, `es_espera`, `es_vale`, `es_finalizado`, `estado_servicio_solicitud`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(23, 1, 5, 20, 2, 2986, 'MINAGRI', 'AV. LA UNIVERSIDAD NÂ° 200', 'lquinones', 'dortiz', 'TRANSPORTE DE PERSONAL GG', 1501854762, '2017-08-04 15:00:00', 1501876800, '2017-08-04 16:00:00', 1501880400, 0, 1, 1, 1, 0, 0, 1, 1, '2017-08-04 08:52:42', 'dortiz', '2017-08-04 08:53:47', 'dortiz'),
(24, 5, 5, 1, 2, 2986, 'SANTA ANITA, SURCO, STA BEATRIZ', 'SANTA ANITA, SURCO, STA BEATRIZ', 'sebastian', 'dortiz', 'VISITA TIENDAS ANDINAS STA ANITA-SURCO Y CANAL 7', 1501888015, '2017-08-07 08:30:00', 1502112600, '2017-08-07 11:00:00', 1502121600, 0, 1, 1, 0, 0, 0, 1, 1, '2017-08-04 18:06:55', 'dortiz', '2017-08-23 14:12:13', 'jvelasquez'),
(25, 1, 1, 20, 1, 2506, 'ddd', 'ddd', 'lquinones', '', 'ddddddd', 1511219504, '2017-11-21 06:30:00', 1511263800, '2017-11-21 09:30:00', 1511274600, 0, 1, 1, 0, 0, 0, 0, 1, '2017-11-20 18:11:44', 'jvelasquez', NULL, NULL),
(26, 3, 1, 14, 1, 2505, 'xxx', 'xxx', 'otrevejo', '', 'xxxx', 1511219583, '2017-11-21 06:30:00', 1511263800, '2017-11-21 08:30:00', 1511271000, 0, 1, 1, 0, 0, 0, 0, 1, '2017-11-20 18:13:03', 'jvelasquez', NULL, NULL),
(27, 3, 1, 23, 1, 2505, 'ssss', 'ss', 'lquinones', '', 'ssss', 1511219669, '2017-11-22 06:00:00', 1511348400, '2017-11-24 11:00:00', 1511539200, 0, 1, 1, 0, 0, 0, 0, 1, '2017-11-20 18:14:29', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_vales`
--

CREATE TABLE `servicios_vales` (
  `idservicios_vales` int(11) NOT NULL,
  `idservicio_solicitud` int(11) NOT NULL,
  `idservicios_escala_movilidades` int(11) NOT NULL,
  `concepto_vale` text,
  `nro_meta` varchar(45) DEFAULT NULL,
  `nro_correlativo` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_x_solicitudes`
--

CREATE TABLE `servicios_x_solicitudes` (
  `idservicios_x_solicitudes` int(11) NOT NULL,
  `idmantenimiento_solicitudes` int(11) NOT NULL,
  `idmantenimiento_servicios` int(11) NOT NULL,
  `idmantenimiento_componentes` int(11) NOT NULL,
  `idmantenimiento_tipos_servicios` int(11) NOT NULL,
  `idmantenimiento_alertas` int(11) DEFAULT NULL,
  `descripcion_problema` text,
  `is_alerta` int(11) DEFAULT NULL,
  `estado_servicio_x_solicitud` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicios_x_solicitudes`
--

INSERT INTO `servicios_x_solicitudes` (`idservicios_x_solicitudes`, `idmantenimiento_solicitudes`, `idmantenimiento_servicios`, `idmantenimiento_componentes`, `idmantenimiento_tipos_servicios`, `idmantenimiento_alertas`, `descripcion_problema`, `is_alerta`, `estado_servicio_x_solicitud`, `fecha_creacion`, `usuario_creacion`) VALUES
(1, 3, 1, 2, 2, NULL, 'LA BATERIA DE 13 PLACAS DEL VEHICULO ESTA PRESENTANDO PROBLEMAS DE CARGA, POR LO QUE SE SOLICITA EL CAMBIO', 0, 0, '2017-05-22 04:17:48', 'jvelasquez'),
(2, 4, 2, 4, 2, NULL, 'LAS LLANTAS PRESENTAN DESGASTES POR EL USO NORMAL DEL VEHICULO', 0, 0, '2017-05-23 00:15:44', 'jvelasquez'),
(7, 5, 6, 18, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:01:32', 'jvelasquez'),
(8, 5, 5, 5, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:03:29', 'jvelasquez'),
(9, 5, 4, 17, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:04:05', 'jvelasquez'),
(10, 5, 3, 17, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:05:20', 'jvelasquez'),
(11, 5, 7, 7, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:06:39', 'jvelasquez'),
(12, 5, 8, 6, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:08:19', 'jvelasquez'),
(13, 5, 9, 9, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:09:28', 'jvelasquez'),
(14, 5, 10, 8, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:09:59', 'jvelasquez'),
(15, 5, 11, 10, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:10:58', 'jvelasquez'),
(17, 5, 12, 20, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:13:44', 'jvelasquez'),
(18, 5, 13, 20, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:14:07', 'jvelasquez'),
(19, 5, 14, 20, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:14:34', 'jvelasquez'),
(20, 5, 15, 21, 2, NULL, 'NO ESPECIFICA	', 0, 0, '2017-05-23 12:27:11', 'jvelasquez'),
(21, 5, 16, 22, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:44:20', 'jvelasquez'),
(22, 5, 17, 22, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:44:36', 'jvelasquez'),
(23, 5, 18, 23, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:45:44', 'jvelasquez'),
(24, 5, 19, 24, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:47:30', 'jvelasquez'),
(25, 5, 20, 12, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:47:57', 'jvelasquez'),
(26, 5, 21, 14, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:51:00', 'jvelasquez'),
(27, 5, 22, 13, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:51:21', 'jvelasquez'),
(28, 5, 23, 16, 2, NULL, 'NO ESPECIFICA	', 0, 0, '2017-05-23 12:51:40', 'jvelasquez'),
(29, 5, 24, 15, 2, NULL, 'NO ESPECIFICA	', 0, 0, '2017-05-23 12:51:58', 'jvelasquez'),
(30, 5, 25, 25, 2, NULL, 'NO ESPECIFICA	NO ESPECIFICA', 0, 0, '2017-05-23 12:54:11', 'jvelasquez'),
(31, 5, 26, 26, 2, NULL, 'NO ESPECIFICA	NO ESPECIFICA', 0, 0, '2017-05-23 12:55:07', 'jvelasquez'),
(32, 5, 27, 26, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:55:22', 'jvelasquez'),
(33, 5, 28, 27, 2, NULL, 'NO ESPECIFICA', 0, 0, '2017-05-23 12:56:13', 'jvelasquez'),
(34, 7, 29, 28, 2, NULL, 'PRESENTE UN PROBLEMA DE PERDIDA DE PRESION', 0, 0, '2017-05-25 00:07:35', 'jvelasquez'),
(35, 7, 30, 29, 2, NULL, 'PRESENTE UN PROBLEMA DE PERDIDA DE PRESION EN LA SECCION DE RETORNO', 0, 0, '2017-05-25 00:10:38', 'jvelasquez'),
(36, 7, 31, 30, 2, NULL, 'SE CAMBIAN LAS ABRAZADERAS PARA AJUSTE DE NUEVAS MANGUERAS POR MEDIDAS DE SEGURIDAD', 0, 0, '2017-05-25 00:11:46', 'jvelasquez'),
(41, 12, 10, 31, 1, NULL, 'MANTENIMIENTO PREVENTIVO POR KM', 0, 0, '2017-06-23 15:58:43', 'jvelasquez'),
(42, 12, 10, 32, 1, NULL, 'MANTENIMIENTO PREVENTIVO POR KM', 0, 0, '2017-06-23 15:59:53', 'jvelasquez'),
(43, 12, 10, 33, 1, NULL, 'MANTENIMIENTO PREVENTIVO POR KM', 0, 0, '2017-06-23 16:00:58', 'jvelasquez'),
(44, 12, 9, 9, 1, NULL, 'MANTENIMIENTO PREVENTIVO POR KM', 0, 0, '2017-06-23 16:01:33', 'jvelasquez'),
(45, 12, 32, 34, 1, NULL, 'MANTENIMIENTO PREVENTIVO POR KM', 0, 0, '2017-06-23 16:03:02', 'jvelasquez'),
(46, 12, 33, 35, 1, NULL, 'MANTENIMIENTO PREVENTIVO POR KM', 0, 0, '2017-06-23 16:05:26', 'jvelasquez'),
(47, 12, 11, 10, 1, NULL, 'MANTENIMIENTO PREVENTIVO POR KM', 0, 0, '2017-06-23 16:05:43', 'jvelasquez'),
(48, 12, 34, 36, 1, NULL, 'MANTENIMIENTO PREVENTIVO POR KM', 0, 0, '2017-06-23 16:06:38', 'jvelasquez'),
(49, 16, 32, 34, 1, NULL, 'SE HIZO EL MANTENIMIENTO PREVENTIVO, CAMBIANDO LOS REPUESTOS  FILTRO DE ACEITE, DE AIRE, COMBUSTIBLE, PREVENCIÃ“N DE FRENOS, ENGRASE DE MUELLES Y GRILLETES INSPECCIÃ“N DE NIVELES', 0, 0, '2017-06-26 06:28:03', ''),
(50, 17, 9, 9, 1, NULL, 'SE HIZO MANTENIMIENTO PREVENTIVO CAMBIO DE ACEITE, LOS FILTROS, ACEITE, GASOLINA, AIRE, REFRIGERANTE', 0, 0, '2017-06-26 06:45:35', ''),
(51, 17, 10, 31, 1, NULL, 'CAMBIO DE ACEITE, CON LOS COMPONENTES RESPECTIVOS', 0, 0, '2017-06-26 06:46:43', ''),
(52, 17, 17, 22, 1, NULL, 'SE HIZO SONDEO DEL RADIADOR Y MANTENIMIENTO SE CAMBIO EL REFRIGERANTE', 0, 0, '2017-06-26 06:48:54', ''),
(53, 18, 35, 39, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA DIRECCIÃ“N: CAMBIO DE ROTULA DE SUSPENSION,, CAMBIO DE TERMINALES INTERIOR DE SUSPENSION, CORRECCIÃ“N DE ANGULO DE INCLINACIÃ“N LH Y RH ALINEAMIENTO DE DIRECCIÃ“N', 0, 0, '2017-06-26 07:02:42', ''),
(54, 18, 36, 40, 2, NULL, 'SERVICIO DE BALANCEO DE 2 RUEDAS DELANTERAS, DESENLLANTE Y ENLLANTE 04 RUEDAS', 0, 0, '2017-06-26 07:08:56', ''),
(55, 19, 37, 39, 2, NULL, 'MANTENIMIENTO CORRECTIVO EN EL SISTEMA DE DIRECCIÃ“N: SUSPENSIÃ“N, ALUNAMIENTO, BALANCEO, ', 0, 0, '2017-06-26 07:18:39', ''),
(56, 19, 38, 41, 2, NULL, 'MANTENIMIENTO CORRECTIVO EN EL SISTEMA DE DIRECCIÃ“N: SUSPENSIÃ“N, ALUNAMIENTO, BALANCEO,', 0, 0, '2017-06-26 07:20:32', ''),
(58, 19, 41, 40, 2, NULL, 'MANTENIMIENTO CORRECTIVO EN EL SISTEMA DE DIRECCIÃ“N: SUSPENSIÃ“N, ALUNAMIENTO, BALANCEO, DESMONTAJE DE LAS LLANTAS Y ENLLANTE , BALANCEO DE 2 AROS DE ALEACIÃ“N.', 0, 0, '2017-06-26 07:25:00', ''),
(59, 19, 42, 42, 2, NULL, 'MANTENIMIENTO CORRECTIVO EN EL SISTEMA DE AIRE ACONDICIONADO: DESMONTAJE Y CAMBIO DE CONDENSADOR AIRE ACONDICIONADO, CAMBIO DE SELLOS Y ORINGS, CAMBIO DE ACEITE COMPRESOR, CARGA DE GAS AIRE ACONDICIONADO, CAMBIO DE FILTRO DE AIRE ACONDICIONADO, DESMONTAJE Y MANTENIMIENTO DE EVAPORADOR,', 0, 0, '2017-06-26 07:32:37', ''),
(60, 19, 43, 43, 2, NULL, 'MANTENIMIENTO CORRECTIVO EN EL SISTEMA DE FRENO: CAMBIO DE ESPARRAGO DE RUEDA, D/M Y MANTENIMIENTO DE 02 CALIPER DE FRENO.', 0, 0, '2017-06-26 07:36:32', ''),
(61, 20, 42, 42, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL SISTEMA DE AIRE ACONDICIONADO DE LA UNIDAD CGU-026, D/M CONSOLA CENTRAL, REPARACIÃ“N LINEA DE MODULO AIRE ACONDICIONADO, CAMBIO DE ACEITE COMPRESOR AIRE ACONDICIONADO, CARGA DE GAS ACONDICIONADO', 0, 0, '2017-06-26 07:44:49', ''),
(62, 20, 44, 44, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL SISTEMA ELÃ‰CTRICO LA UNIDAD CGU-026, D/M DEL ARRANCADOR, CAMBIO DE SELENOIDE DE ARRANCADOR, INSTALACIÃ“N DEL KIT AUXILIAR DE ARRANQUE, REPARACIÃ“N DE LA LA BASE DE GUANTERA.', 0, 0, '2017-06-26 07:51:21', ''),
(63, 21, 9, 9, 1, NULL, 'SERVICIO DE MANTENIMIENTO PREVENTIVO DE LA UNIDAD EGT-082 DE 175.000 KM : CAMBIO DE ACEITE, DE FILTRO DE ACEITE, DE AIRE, DE GASOLINA, Y CAMBIO DE ARANDELA DE CARTER.', 0, 0, '2017-06-26 07:57:10', ''),
(64, 22, 45, 45, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL SISTEMA DE MECANICA : SOPORTE DE CAJA LATERAL,FAJA Y ACCESORIOS, SWITCH DE ACEITE DE MOTOR, HIDROLINA, SISTEMA DE TRANSMISION, SISTEMA DE ENCENDIDO, SISTEMA DE REFRIGERACIÃ“N.', 0, 0, '2017-06-26 08:06:50', ''),
(65, 22, 46, 46, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL SISTEMA DE TRANSMISIÃ“N :  D/m BOMBA DE EMBRAGUE HIDRAULICO, D/M BOMBIN AUXILIAR DE EMBRAGUE HIDRAULICO, CAMBIO DE MANGUERA HIDRAULICA, D/M CAJA DE CAMBIO 4X4, CAMBIO DE DISCO DE EMBRAGUE, CAMBIO DE RETENES LATERALES DE COLA DE CAJA, CAMBIO DE TRANSMISION.', 0, 0, '2017-06-26 08:11:50', ''),
(66, 22, 47, 44, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL SISTEMA DE ENCENDIDO : AUTOMÃTICO, BENDIX, JUEGO DE CARBONES.', 0, 0, '2017-06-26 08:15:02', ''),
(67, 22, 16, 22, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL SISTEMA DE REFRIGERACIÃ“N : D/M RADIADOR, CAMBIO DE RADIADOR, CAMBIO DE MOTOR VENTILADOR, CAMBIO TERMOSTATO, CAMBIO DE TERMOSWITH DE VENTILADOR.', 0, 0, '2017-06-26 08:16:43', ''),
(68, 23, 43, 43, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD LGY-453 : CAMBIO JUEGO DE PASTILLAS DELANTERAS, POSTERIOR, KIT CALIPER DELANTERO, KIT CALIPER POSTERIOR, LIQUIDO DE FRENO, LUBRICANTE.', 0, 0, '2017-06-26 08:21:33', ''),
(69, 23, 35, 39, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD LGY-453 DEL SISTEMA DE DIRECCIÃ“N: D/M SUSPENSION, CAMBIO DE TERMINAL, CAMBIO DE BARRA DE ACOPLE, CAMBIO DE BIELETAS DELANTERAS, CAMBIO DE JEBE DE BARRA ESTABILIZADORA, CORREGIR CAMBER AMBOS LADOS, ALINEAMIENTO.', 0, 0, '2017-06-26 08:24:17', ''),
(70, 23, 42, 42, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD LGY-453 SISTEMA AIRE ACONDICIONADO:  MANTENIMIENTO SISTEMA AIRE ACONDICIONADO, CAMBIO DE FILTRO, REPARACION, CAMBIO DE ACEITE AL COMPRESOR, CAMBIO DE ORINGS, CAMBIO DE GAS DE A/C ECOLÃ“GICO R134.', 0, 0, '2017-06-26 08:27:38', ''),
(71, 24, 10, 9, 1, NULL, 'MANTENIMIENTO PREVENTIVO DE LA UNIDAD EGN-927 DE 70.000 KM : ARANDELAS, FILTRO DE ACEITE, FILTRO DE AIRE, ', 0, 0, '2017-06-26 08:35:34', ''),
(72, 25, 48, 47, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-563 DEL SISTEMA DE EMBRAGUE: CAMBIO DE DISCO DE EMBRAGUE, PLATO DE EMBRAGUE, COLLARIN DE EMBRAGUE, SEGURO HORQUILLA, BOMBA DE EMBRAGUE, SERVICIO DE KIT DE EMBRAGUE, CAMBIO DE BOMBA DE EMBRAGUE.', 0, 0, '2017-06-26 08:45:51', ''),
(73, 26, 10, 9, 1, NULL, 'MANTENIMIENTO PREVENTIVO DE LA UNIDAD EGQ-911 : CAMBIO DE ACEITE, FILTRO DE ACEITE, FILTRO DE AIRE, FILTRO DE GASOLINA, ', 0, 0, '2017-06-26 08:50:02', ''),
(74, 28, 49, 48, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-017 SISTEMA DE FRENO: REVISIÃ“N Y REGULACIÃ“N DE LA 4 RUEDAS, PASTILLAS, TAMBORES, ACCESORIOS DE BOMBA MASTER, LIQUIDO DE FRENO, MANTENIMIENTO- SISTEMA DE TRANSMISIÃ“N: RODAJES CENTRAL, CRUCETAS - SISTEMA DE SUSPENSIÃ“N: AMORTIGUADORES - SISTEMA DE DIRECCIÃ“N: BARRA CENTRAL, TERMINALES INTERIOR Y EXTERIOR, ROTULAS, EMBOCINADO DE BRAZO GIRATORIO-SISTEMA DE ALINEAMIENTO Y BALANCEO- SISTEMA DE ENFRIAMIENTO: VENTILADOR, REFRIGERANTE-SISTEMA ELÃ‰CTRICO: FOCOS TABLEROS, FAROS- SISTEMA MOTOR: AFINAMIENTO MAYOR, BUJIAS-CARROCERÃA: REAJUSTE PARACHOQUE, SOLDAR, , TOLBA, SOLDAR ANTOVUELCO Y ASIENTO, , VENTANAS.', 0, 0, '2017-06-26 09:36:42', ''),
(75, 28, 46, 49, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-017 SISTEMA DE FRENO: REVISIÃ“N Y REGULACIÃ“N DE LA 4 RUEDAS, PASTILLAS, TAMBORES, ACCESORIOS DE BOMBA MASTER, LIQUIDO DE FRENO, MANTENIMIENTO- SISTEMA DE TRANSMISIÃ“N: RODAJES CENTRAL, CRUCETAS - SISTEMA DE SUSPENSIÃ“N: AMORTIGUADORES - SISTEMA DE DIRECCIÃ“N: BARRA CENTRAL, TERMINALES INTERIOR Y EXTERIOR, ROTULAS, EMBOCINADO DE BRAZO GIRATORIO-SISTEMA DE ALINEAMIENTO Y BALANCEO- SISTEMA DE ENFRIAMIENTO: VENTILADOR, REFRIGERANTE-SISTEMA ELÃ‰CTRICO: FOCOS TABLEROS, FAROS- SISTEMA MOTOR: AFINAMIENTO MAYOR, BUJIAS-CARROCERÃA: REAJUSTE PARACHOQUE, SOLDAR, , TOLBA, SOLDAR ANTOVUELCO Y ASIENTO, , VENTANAS.', 0, 0, '2017-06-26 09:38:20', ''),
(76, 28, 50, 50, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-017 SISTEMA DE FRENO: REVISIÃ“N Y REGULACIÃ“N DE LA 4 RUEDAS, PASTILLAS, TAMBORES, ACCESORIOS DE BOMBA MASTER, LIQUIDO DE FRENO, MANTENIMIENTO- SISTEMA DE TRANSMISIÃ“N: RODAJES CENTRAL, CRUCETAS - SISTEMA DE SUSPENSIÃ“N: AMORTIGUADORES - SISTEMA DE DIRECCIÃ“N: BARRA CENTRAL, TERMINALES INTERIOR Y EXTERIOR, ROTULAS, EMBOCINADO DE BRAZO GIRATORIO-SISTEMA DE ALINEAMIENTO Y BALANCEO- SISTEMA DE ENFRIAMIENTO: VENTILADOR, REFRIGERANTE-SISTEMA ELÃ‰CTRICO: FOCOS TABLEROS, FAROS- SISTEMA MOTOR: AFINAMIENTO MAYOR, BUJIAS-CARROCERÃA: REAJUSTE PARACHOQUE, SOLDAR, , TOLBA, SOLDAR ANTOVUELCO Y ASIENTO, , VENTANAS', 0, 0, '2017-06-26 09:40:31', ''),
(77, 28, 37, 51, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-017 SISTEMA DE FRENO: REVISIÃ“N Y REGULACIÃ“N DE LA 4 RUEDAS, PASTILLAS, TAMBORES, ACCESORIOS DE BOMBA MASTER, LIQUIDO DE FRENO, MANTENIMIENTO- SISTEMA DE TRANSMISIÃ“N: RODAJES CENTRAL, CRUCETAS - SISTEMA DE SUSPENSIÃ“N: AMORTIGUADORES - SISTEMA DE DIRECCIÃ“N: BARRA CENTRAL, TERMINALES INTERIOR Y EXTERIOR, ROTULAS, EMBOCINADO DE BRAZO GIRATORIO-SISTEMA DE ALINEAMIENTO Y BALANCEO- SISTEMA DE ENFRIAMIENTO: VENTILADOR, REFRIGERANTE-SISTEMA ELÃ‰CTRICO: FOCOS TABLEROS, FAROS- SISTEMA MOTOR: AFINAMIENTO MAYOR, BUJIAS-CARROCERÃA: REAJUSTE PARACHOQUE, SOLDAR, , TOLBA, SOLDAR ANTOVUELCO Y ASIENTO, , VENTANAS', 0, 0, '2017-06-26 09:42:55', ''),
(78, 28, 18, 23, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-017 SISTEMA DE FRENO: REVISIÃ“N Y REGULACIÃ“N DE LA 4 RUEDAS, PASTILLAS, TAMBORES, ACCESORIOS DE BOMBA MASTER, LIQUIDO DE FRENO, MANTENIMIENTO- SISTEMA DE TRANSMISIÃ“N: RODAJES CENTRAL, CRUCETAS - SISTEMA DE SUSPENSIÃ“N: AMORTIGUADORES - SISTEMA DE DIRECCIÃ“N: BARRA CENTRAL, TERMINALES INTERIOR Y EXTERIOR, ROTULAS, EMBOCINADO DE BRAZO GIRATORIO-SISTEMA DE ALINEAMIENTO Y BALANCEO- SISTEMA DE ENFRIAMIENTO: VENTILADOR, REFRIGERANTE-SISTEMA ELÃ‰CTRICO: FOCOS TABLEROS, FAROS- SISTEMA MOTOR: AFINAMIENTO MAYOR, BUJIAS-CARROCERÃA: REAJUSTE PARACHOQUE, SOLDAR, , TOLBA, SOLDAR ANTOVUELCO Y ASIENTO, , VENTANAS', 0, 0, '2017-06-26 09:44:15', ''),
(79, 28, 51, 52, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-017 SISTEMA DE FRENO: REVISIÃ“N Y REGULACIÃ“N DE LA 4 RUEDAS, PASTILLAS, TAMBORES, ACCESORIOS DE BOMBA MASTER, LIQUIDO DE FRENO, MANTENIMIENTO- SISTEMA DE TRANSMISIÃ“N: RODAJES CENTRAL, CRUCETAS - SISTEMA DE SUSPENSIÃ“N: AMORTIGUADORES - SISTEMA DE DIRECCIÃ“N: BARRA CENTRAL, TERMINALES INTERIOR Y EXTERIOR, ROTULAS, EMBOCINADO DE BRAZO GIRATORIO-SISTEMA DE ALINEAMIENTO Y BALANCEO- SISTEMA DE ENFRIAMIENTO: VENTILADOR, REFRIGERANTE-SISTEMA ELÃ‰CTRICO: FOCOS TABLEROS, FAROS- SISTEMA MOTOR: AFINAMIENTO MAYOR, BUJIAS-CARROCERÃA: REAJUSTE PARACHOQUE, SOLDAR, , TOLBA, SOLDAR ANTOVUELCO Y ASIENTO, , VENTANAS', 0, 0, '2017-06-26 09:46:33', ''),
(80, 28, 52, 53, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-017 SISTEMA DE FRENO: REVISIÃ“N Y REGULACIÃ“N DE LA 4 RUEDAS, PASTILLAS, TAMBORES, ACCESORIOS DE BOMBA MASTER, LIQUIDO DE FRENO, MANTENIMIENTO- SISTEMA DE TRANSMISIÃ“N: RODAJES CENTRAL, CRUCETAS - SISTEMA DE SUSPENSIÃ“N: AMORTIGUADORES - SISTEMA DE DIRECCIÃ“N: BARRA CENTRAL, TERMINALES INTERIOR Y EXTERIOR, ROTULAS, EMBOCINADO DE BRAZO GIRATORIO-SISTEMA DE ALINEAMIENTO Y BALANCEO- SISTEMA DE ENFRIAMIENTO: VENTILADOR, REFRIGERANTE-SISTEMA ELÃ‰CTRICO: FOCOS TABLEROS, FAROS- SISTEMA MOTOR: AFINAMIENTO MAYOR, BUJIAS-CARROCERÃA: REAJUSTE PARACHOQUE, SOLDAR, , TOLBA, SOLDAR ANTOVUELCO Y ASIENTO, , VENTANAS', 0, 0, '2017-06-26 09:50:01', ''),
(81, 29, 10, 9, 1, NULL, 'MANTENIMIENTO PREVENTIVO DE LA UNIDAD EGR-017: CAMBIO DE ACEITE, FILTRO DE ACEITE, DE AIRE, DE GASOLINA,DE 299.762 KM', 0, 0, '2017-06-26 09:56:38', ''),
(82, 31, 10, 9, 1, NULL, 'MANTENIMIENTO PREVENTIVO DE LA UNIDAD EGR-565 : CAMBIO DE ACEITE, CAMBIO DE FILTRO DE ACEITE, DE AIRE, COMBUSTIBLE, ENGRASE MUELLES Y GRILLETES ROT Y CARD LIMPIEZA DE ADMISIÃ“N, INSPECCIÃ“N DE NIVELES (CAJA CORONA)RELLENO DE BATERÃA.', 0, 0, '2017-06-26 10:06:01', ''),
(83, 32, 37, 54, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGR-036 SISTEMA DE DIRECCIÃ“N: KIT DE EMBRAGUE (PLATO, DISCO Y COLLARIN) SITEMA DE MOTOR: JUEGO DE CARBONES DE AALTERNADOR, RODAJE GRANDE DE ALTERNADOR, RODAJE CHICO DE ALTERNADOR.', 0, 0, '2017-06-26 10:22:00', ''),
(84, 32, 55, 55, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGR-036 SISTEMA DE DIRECCIÃ“N: KIT DE EMBRAGUE (PLATO, DISCO Y COLLARIN) SITEMA DE MOTOR: JUEGO DE CARBONES DE AALTERNADOR, RODAJE GRANDE DE ALTERNADOR, RODAJE CHICO DE ALTERNADOR.', 0, 0, '2017-06-26 10:28:56', ''),
(85, 33, 56, 56, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO AEP-892, SISTEMA DE DIRECCIÃ“N: ROTULA, TERMINALES,  FRENOS, REVISIÃ“N Y REGULACIÃ“N DE LAS CUATRO RUEDAS, JUEGO DE PASTILLAS, ZAPATAS- SISTEMA DE TRANSMISIÃ“N:  2 PALIERES, 2 RODAJES POSTERIOR, 2 RODAJES INTERIOR Y EXT, ACCESORIOS - SISTEMA DE ALIMENTACIÃ“N: BOMBA DE INYECCIÃ“N, ACEITE DE CORONA, -SISTEMA DE SUSPENSIÃ“N : AMORTIGUADORES, MUELLES, PERNOS CENTRALES-SISTEMA DE ENFRIAMIENTO:  REFRIGERANTE- SISTEMA ELÃ‰CTRICO: FOCOS, CONTACTO, CABLE FAROS, ', 0, 0, '2017-06-26 10:42:37', ''),
(86, 33, 37, 57, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO AEP-892, SISTEMA DE DIRECCIÃ“N: ROTULA, TERMINALES, FRENOS, REVISIÃ“N Y REGULACIÃ“N DE LAS CUATRO RUEDAS, JUEGO DE PASTILLAS, ZAPATAS- SISTEMA DE TRANSMISIÃ“N: 2 PALIERES, 2 RODAJES POSTERIOR, 2 RODAJES INTERIOR Y EXT, ACCESORIOS - SISTEMA DE ALIMENTACIÃ“N: BOMBA DE INYECCIÃ“N, ACEITE DE CORONA, -SISTEMA DE SUSPENSIÃ“N : AMORTIGUADORES, MUELLES, PERNOS CENTRALES-SISTEMA DE ENFRIAMIENTO: REFRIGERANTE- SISTEMA ELÃ‰CTRICO: FOCOS, CONTACTO, CABLE FAROS,', 0, 0, '2017-06-26 10:44:49', ''),
(87, 33, 57, 58, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO AEP-892, SISTEMA DE DIRECCIÃ“N: ROTULA, TERMINALES, FRENOS, REVISIÃ“N Y REGULACIÃ“N DE LAS CUATRO RUEDAS, JUEGO DE PASTILLAS, ZAPATAS- SISTEMA DE TRANSMISIÃ“N: 2 PALIERES, 2 RODAJES POSTERIOR, 2 RODAJES INTERIOR Y EXT, ACCESORIOS - SISTEMA DE ALIMENTACIÃ“N: BOMBA DE INYECCIÃ“N, ACEITE DE CORONA, -SISTEMA DE SUSPENSIÃ“N : AMORTIGUADORES, MUELLES, PERNOS CENTRALES-SISTEMA DE ENFRIAMIENTO: REFRIGERANTE- SISTEMA ELÃ‰CTRICO: FOCOS, CONTACTO, CABLE FAROS,', 0, 0, '2017-06-26 10:47:21', ''),
(88, 33, 58, 59, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHÃCULO AEP-892, SISTEMA DE DIRECCIÃ“N: ROTULA, TERMINALES, FRENOS, REVISIÃ“N Y REGULACIÃ“N DE LAS CUATRO RUEDAS, JUEGO DE PASTILLAS, ZAPATAS- SISTEMA DE TRANSMISIÃ“N: 2 PALIERES, 2 RODAJES POSTERIOR, 2 RODAJES INTERIOR Y EXT, ACCESORIOS - SISTEMA DE ALIMENTACIÃ“N: BOMBA DE INYECCIÃ“N, ACEITE DE CORONA, -SISTEMA DE SUSPENSIÃ“N : AMORTIGUADORES, MUELLES, PERNOS CENTRALES-SISTEMA DE ENFRIAMIENTO: REFRIGERANTE- SISTEMA ELÃ‰CTRICO: FOCOS, CONTACTO, CABLE FAROS,', 0, 0, '2017-06-26 10:50:36', ''),
(89, 34, 10, 9, 1, NULL, 'MANTENIMIENTO PREVENTIVO DEL VEHÃCULO AEP-892:  CAMBIO DE ACEITE, CAMBIO DE FILTRO DE ACEITE, DE AIRE, DE COMBUSTIBLE, SEDIMENTO, ACEITE MOTOR, ', 0, 0, '2017-06-26 10:56:28', ''),
(90, 35, 60, 61, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-564: SISTEMA DE MOTOR : EMPAQUETADURA DE TAPA DE VALANCINES-SISTEMA DE TRANSMISIÃ“N: SOPORTE DE CARDAN- SISTEMA DE ENFRIAMIENTO: TAPA DE RADIADOR - SISTEMA DE DIRECCIÃ“N: ROTULAS, TERMINALES Y PALIERES- SISTEMA DE FRENO: EMBOCINADO DE CALIPER , GRASA.', 0, 0, '2017-06-26 11:09:07', ''),
(91, 35, 57, 62, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-564: SISTEMA DE MOTOR : EMPAQUETADURA DE TAPA DE VALANCINES-SISTEMA DE TRANSMISIÃ“N: SOPORTE DE CARDAN- SISTEMA DE ENFRIAMIENTO: TAPA DE RADIADOR - SISTEMA DE DIRECCIÃ“N: ROTULAS, TERMINALES Y PALIERES- SISTEMA DE FRENO: EMBOCINADO DE CALIPER , GRASA.', 0, 0, '2017-06-26 11:10:10', ''),
(92, 35, 24, 22, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-564: SISTEMA DE MOTOR : EMPAQUETADURA DE TAPA DE VALANCINES-SISTEMA DE TRANSMISIÃ“N: SOPORTE DE CARDAN- SISTEMA DE ENFRIAMIENTO: TAPA DE RADIADOR - SISTEMA DE DIRECCIÃ“N: ROTULAS, TERMINALES Y PALIERES- SISTEMA DE FRENO: EMBOCINADO DE CALIPER , GRASA.', 0, 0, '2017-06-26 11:10:58', ''),
(93, 35, 37, 57, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-564: SISTEMA DE MOTOR : EMPAQUETADURA DE TAPA DE VALANCINES-SISTEMA DE TRANSMISIÃ“N: SOPORTE DE CARDAN- SISTEMA DE ENFRIAMIENTO: TAPA DE RADIADOR - SISTEMA DE DIRECCIÃ“N: ROTULAS, TERMINALES Y PALIERES- SISTEMA DE FRENO: EMBOCINADO DE CALIPER , GRASA.', 0, 0, '2017-06-26 11:12:15', ''),
(94, 35, 43, 43, 2, NULL, 'MANTENIMIENTO CORRECTIVO DE LA UNIDAD EGR-564: SISTEMA DE MOTOR : EMPAQUETADURA DE TAPA DE VALANCINES-SISTEMA DE TRANSMISIÃ“N: SOPORTE DE CARDAN- SISTEMA DE ENFRIAMIENTO: TAPA DE RADIADOR - SISTEMA DE DIRECCIÃ“N: ROTULAS, TERMINALES Y PALIERES- SISTEMA DE FRENO: EMBOCINADO DE CALIPER , GRASA.', 0, 0, '2017-06-26 11:12:42', ''),
(95, 36, 10, 9, 1, NULL, 'MANTENIMIENTO PREVENTIVO DE LA UNIDAD EGR-564: CAMBIO DE ACEITE, CAMBIO DE FILTRO DE ACEITE, DE AIRE, DE COMBUSTIBLE, REFRIGERANTE.', 0, 0, '2017-06-26 11:20:01', ''),
(96, 38, 10, 9, 1, NULL, 'MANTENIMIENTO PREVENTIVO DEL VEHICULO EGT-082 DE 180.000 KM : CAMBIO DE ACEITE, CAMBIO DE FILTRO DE ACEITE, DE COMBUSTIBLE, DE AIRE, FILTRO SEDIMENTADOR.', 0, 0, '2017-06-26 11:29:05', ''),
(97, 39, 57, 63, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGR-305: SISTEMA DE TRANSMISION: D/M KIT DE EMBRAGUE, CAMBIO DE DISCO DE EMBRAGUE, CAMBIO DE PLATO DE EMBRAGUE, CAMBIO DE COLLARIN, D/M VOLANTE, D7M BOMBA DE EMBRAGUE HIDRAULICO, D/M BOMBIN AUXILIAR DE EMBRAGUE HIDRÃULICO, CAMBIO DE RETEN DE CIGUEÃ‘AL POSTERIOR, CAMBIO DE RODAJE DE VOLANTE - SISTEMA DE DIRECCIÃ“N Y SUSPENSIÃ“N: CAMBIO DE AMORTIGUADORES DELANTEROS, CAMBIO DE BOCINA DE TRAPECIO SUPERIOR, CAMBIO DE TERMINALES, CAMBIO DE BOCINA DE BRAZO GIRATORIO, CAMBIO DE TOPES DE DIRECCIÃ“N, CAMBIO DE JEBE DE BARRA CENTRAL, CAMBIO DE JEBES TEMPLADORES, CORREGIR CAMBER AMBOS LADOS- ALINEAMIENTO', 0, 0, '2017-06-26 11:46:21', ''),
(98, 39, 35, 51, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO EGR-305: SISTEMA DE TRANSMISION: D/M KIT DE EMBRAGUE, CAMBIO DE DISCO DE EMBRAGUE, CAMBIO DE PLATO DE EMBRAGUE, CAMBIO DE COLLARIN, D/M VOLANTE, D7M BOMBA DE EMBRAGUE HIDRAULICO, D/M BOMBIN AUXILIAR DE EMBRAGUE HIDRÃULICO, CAMBIO DE RETEN DE CIGUEÃ‘AL POSTERIOR, CAMBIO DE RODAJE DE VOLANTE - SISTEMA DE DIRECCIÃ“N Y SUSPENSIÃ“N: CAMBIO DE AMORTIGUADORES DELANTEROS, CAMBIO DE BOCINA DE TRAPECIO SUPERIOR, CAMBIO DE TERMINALES, CAMBIO DE BOCINA DE BRAZO GIRATORIO, CAMBIO DE TOPES DE DIRECCIÃ“N, CAMBIO DE JEBE DE BARRA CENTRAL, CAMBIO DE JEBES TEMPLADORES, CORREGIR CAMBER AMBOS LADOS- ALINEAMIENTO', 0, 0, '2017-06-26 11:50:13', ''),
(99, 40, 10, 9, 1, NULL, 'MANTENIMIENTO PREVENTIVO DEL VEHÃCULO EGR-305: CAMBIO DE ACEITE, CAMBIO DE FILTRO DE ACEITE, CAMBIO DE FILTRO DE AIRE, CAMBIO DE FILTRO DE COMBUSTIBLE, BUJIAS, ORINES DE INYECTORES, ', 0, 0, '2017-06-26 11:55:40', ''),
(100, 41, 61, 64, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO S1D-850: SISTEMA DE ADMISION: D/M OBTURADOR, D/M FLUJOMETRO, LIMPIEZA DE METACLEANER, REGULACIÃ“N OBTURADOR, CALIBRAR SENSOR ELECTRÃ“NICO CON SCANER,- SISTEMA DE TUBO DE ESCAPE: CAMBIO DE RESONADOR, ENDEREZAR SILENCIADOR POSTERIOR, ENDEREZAR SUJETADOR DE SILENCIADOR, SOLDAR Y REFORZAR COSTURA DE SILENCIADOR. - SISTEMA ELÃ‰CTRICO: D/M PANEL  DE PUERTA PILOTO, REPARAR CENTRAL DE COMANDO (PILOTO) REPARACIÃ“N DEL SISTEMA DE FUNSION ONE TOUCH DE LAS PUERTAS DELANTERAS Y POSTERIOR DERECHO.', 0, 0, '2017-06-26 12:07:36', ''),
(101, 41, 62, 65, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO S1D-850: SISTEMA DE ADMISION: D/M OBTURADOR, D/M FLUJOMETRO, LIMPIEZA DE METACLEANER, REGULACIÃ“N OBTURADOR, CALIBRAR SENSOR ELECTRÃ“NICO CON SCANER,- SISTEMA DE TUBO DE ESCAPE: CAMBIO DE RESONADOR, ENDEREZAR SILENCIADOR POSTERIOR, ENDEREZAR SUJETADOR DE SILENCIADOR, SOLDAR Y REFORZAR COSTURA DE SILENCIADOR. - SISTEMA ELÃ‰CTRICO: D/M PANEL DE PUERTA PILOTO, REPARAR CENTRAL DE COMANDO (PILOTO) REPARACIÃ“N DEL SISTEMA DE FUNSION ONE TOUCH DE LAS PUERTAS DELANTERAS Y POSTERIOR DERECHO.	\r\n', 0, 0, '2017-06-26 12:09:55', ''),
(102, 41, 59, 66, 2, NULL, 'MANTENIMIENTO CORRECTIVO DEL VEHICULO S1D-850: SISTEMA DE ADMISION: D/M OBTURADOR, D/M FLUJOMETRO, LIMPIEZA DE METACLEANER, REGULACIÃ“N OBTURADOR, CALIBRAR SENSOR ELECTRÃ“NICO CON SCANER,- SISTEMA DE TUBO DE ESCAPE: CAMBIO DE RESONADOR, ENDEREZAR SILENCIADOR POSTERIOR, ENDEREZAR SUJETADOR DE SILENCIADOR, SOLDAR Y REFORZAR COSTURA DE SILENCIADOR. - SISTEMA ELÃ‰CTRICO: D/M PANEL DE PUERTA PILOTO, REPARAR CENTRAL DE COMANDO (PILOTO) REPARACIÃ“N DEL SISTEMA DE FUNSION ONE TOUCH DE LAS PUERTAS DELANTERAS Y POSTERIOR DERECHO', 0, 0, '2017-06-26 12:11:59', ''),
(105, 44, 64, 17, 2, NULL, 'Se verifica que el motor presenta fugas de agua por recalentamiento de la culata', 0, 0, '2017-08-07 18:31:58', 'adminti'),
(106, 44, 4, 17, 2, NULL, 'se necesita descarbonizar por fuga de agua', 0, 0, '2017-08-07 18:33:50', 'adminti'),
(107, 45, 9, 9, 2, 2, 'se necesaitra el ', 1, 0, '2017-08-09 16:02:04', 'jvelasquez'),
(108, 45, 50, 50, 2, NULL, 'problema de suspension', 0, 0, '2017-08-09 16:10:08', 'jvelasquez'),
(109, 45, 32, 34, 1, NULL, 'cambio por desgaste', 0, 0, '2017-08-09 16:10:26', 'jvelasquez'),
(110, 45, 47, 60, 1, NULL, 'no prende un foco', 0, 0, '2017-08-09 16:10:46', 'jvelasquez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `soat`
--

CREATE TABLE `soat` (
  `idsoat` int(11) NOT NULL,
  `vehiculos_idvehiculos` int(11) NOT NULL,
  `numero_poliza` varchar(100) DEFAULT NULL,
  `vigencia_desde` date DEFAULT NULL,
  `vigencia_hasta` date DEFAULT NULL,
  `categoria_clase` varchar(100) DEFAULT NULL,
  `uso_vehiculo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursales`
--

CREATE TABLE `sucursales` (
  `idsucursales` int(11) NOT NULL,
  `proveedores_idproveedores` int(11) NOT NULL,
  `nombre_sucursal` varchar(250) DEFAULT NULL,
  `direccion_sucursal` varchar(250) DEFAULT NULL,
  `encargado_sucursal` varchar(250) DEFAULT NULL,
  `telefono_sucursal` varchar(50) DEFAULT NULL,
  `estado_sucursal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `sucursales`
--

INSERT INTO `sucursales` (`idsucursales`, `proveedores_idproveedores`, `nombre_sucursal`, `direccion_sucursal`, `encargado_sucursal`, `telefono_sucursal`, `estado_sucursal`) VALUES
(1, 1, 'GRIFO CACERES', 'AV. MARISCAL CACERES Y RICARDO PALMA - MIRAFLORES - LIMA - PERU', 'NR', 'NR', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talleres`
--

CREATE TABLE `talleres` (
  `idtalleres` int(11) NOT NULL,
  `nombre_taller` varchar(250) DEFAULT NULL,
  `descripcion_taller` text,
  `direccion_taller` varchar(250) DEFAULT NULL,
  `telefono_taller` varchar(50) DEFAULT NULL,
  `email_taller` varchar(100) DEFAULT NULL,
  `ruc_taller` varchar(50) DEFAULT NULL,
  `estado_taller` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `talleres`
--

INSERT INTO `talleres` (`idtalleres`, `nombre_taller`, `descripcion_taller`, `direccion_taller`, `telefono_taller`, `email_taller`, `ruc_taller`, `estado_taller`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(6, 'FRENOS ICAM SA', 'ESPECIALIDADES: FRENOS, DIRECCION, SUSPENSION, TUBO DE ESCAPE', 'MLC. DE LA MARINA #1240 DPTO 1', '0', NULL, '20100985056', 1, NULL, NULL, NULL, NULL),
(7, 'ALFREDO PIMENTEL SEVILLA S.A.', 'LIDERANDO A TODA RUEDA', 'AV. ANGAMOS ESTE 1795 - SURQUILLO ', '4468393', 'surquillo@pimentel.com.pe', '20100025915', 1, NULL, NULL, NULL, NULL),
(8, 'FACTORIA REY MOTOR\'S', 'VENTA DE REPUESTOS LUBRICANTES Y ACCESORIOS, REPARACION EN GENERAL', 'JR JOSE SANTOS CHOCANO 383 - JESUS NAZARENO - AYACUCHO', '066314280', 'FACTORIAREYMOTORSSAC@GMAIL.COM', '20452454891', 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjetas_combustible`
--

CREATE TABLE `tarjetas_combustible` (
  `idtarjetas_combustible` int(11) NOT NULL,
  `vehiculos_idvehiculos` int(11) NOT NULL,
  `proveedores_idproveedores` int(11) NOT NULL,
  `id_item_adjudicados` int(11) NOT NULL,
  `nro_tarjeta` varchar(45) DEFAULT NULL,
  `estado_tarjeta` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tarjetas_combustible`
--

INSERT INTO `tarjetas_combustible` (`idtarjetas_combustible`, `vehiculos_idvehiculos`, `proveedores_idproveedores`, `id_item_adjudicados`, `nro_tarjeta`, `estado_tarjeta`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 20, 1, 1, '1653', 1, '2017-05-12 15:55:35', 'jvelasquez', NULL, NULL),
(2, 22, 1, 2, '1655', 1, '2017-05-12 16:11:21', 'jvelasquez', '2017-08-04 08:30:22', ''),
(3, 14, 1, 1, '1656', 1, '2017-05-12 16:12:11', 'jvelasquez', NULL, NULL),
(4, 23, 1, 1, '1652', 1, '2017-05-12 16:12:43', 'jvelasquez', NULL, NULL),
(5, 1, 1, 1, '1651', 1, '2017-05-12 16:13:36', 'jvelasquez', '2017-08-04 08:16:05', ''),
(6, 8, 1, 1, '1654', 1, '2017-05-12 16:14:00', 'jvelasquez', '2017-05-15 17:57:51', 'jvelasquez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjeta_propiedad`
--

CREATE TABLE `tarjeta_propiedad` (
  `idtarjeta_propiedad` int(11) NOT NULL,
  `vehiculos_idvehiculos` int(11) NOT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `serie_motor` varchar(100) DEFAULT NULL,
  `serie_chasis` varchar(100) DEFAULT NULL,
  `ano_fabricacion` int(11) DEFAULT NULL,
  `ano_modelo` int(11) DEFAULT NULL,
  `carroceria` varchar(100) DEFAULT NULL,
  `placa_nueva` varchar(50) DEFAULT NULL,
  `placa_anterior` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets_combustible`
--

CREATE TABLE `tickets_combustible` (
  `idticket_combustible` int(11) NOT NULL,
  `idvehiculos` int(11) NOT NULL,
  `idtipo_combustible` int(11) NOT NULL,
  `idsucursales` int(11) NOT NULL,
  `chofer_idchofer` int(11) NOT NULL,
  `idtarjetas_combustible` int(11) DEFAULT NULL,
  `sedes_idsedes` int(11) DEFAULT NULL,
  `nro_ticket` varchar(100) DEFAULT NULL,
  `fecha_ticket` date DEFAULT NULL,
  `hora_ticket` varchar(20) DEFAULT NULL,
  `saldo_combustible` double DEFAULT NULL,
  `cantidad_combustible` double DEFAULT NULL,
  `precio_unitario_combustible` double DEFAULT NULL,
  `importe_total_combustible` double DEFAULT NULL,
  `kilometraje` int(11) DEFAULT NULL,
  `es_tanque_lleno` int(11) DEFAULT NULL,
  `es_reset` int(11) DEFAULT NULL,
  `es_ticket` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tickets_combustible`
--

INSERT INTO `tickets_combustible` (`idticket_combustible`, `idvehiculos`, `idtipo_combustible`, `idsucursales`, `chofer_idchofer`, `idtarjetas_combustible`, `sedes_idsedes`, `nro_ticket`, `fecha_ticket`, `hora_ticket`, `saldo_combustible`, `cantidad_combustible`, `precio_unitario_combustible`, `importe_total_combustible`, `kilometraje`, `es_tanque_lleno`, `es_reset`, `es_ticket`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(3, 23, 3, 1, 4, 4, 9, '0520000452', '2017-01-04', '6:41 PM', 0, 8.783, 15.51, 136.22, 66484, 0, 1, 1, '2017-05-12 17:29:29', 'jvelasquez', NULL, NULL),
(4, 8, 3, 1, 1, 6, 9, '0510000362', '2017-01-05', '11:07 AM', 0, 14.853, 15.51, 230.37, 196399, 0, 1, 1, '2017-05-12 17:33:55', 'jvelasquez', NULL, NULL),
(5, 1, 3, 1, 2, 5, 9, '0520000690', '2017-01-06', '12:11 PM', 0, 8.699, 15.51, 134.92, 145651, 0, 1, 1, '2017-05-12 17:37:42', 'jvelasquez', NULL, NULL),
(6, 23, 3, 1, 4, 4, 9, '0520001074', '2017-01-09', '12:55 PM', 0, 7.739, 15.51, 120.03, 66648, 0, 1, 1, NULL, NULL, '2017-05-12 19:06:30', 'jvelasquez'),
(7, 1, 3, 1, 5, 5, 9, '0510000760', '2017-01-10', '6:42 AM', 0, 8.4, 15.51, 130.29, 145758, 0, 1, 1, '2017-05-12 17:53:28', 'jvelasquez', NULL, NULL),
(8, 14, 3, 1, 3, 3, 9, '0520001323', '2017-01-11', '4:46 AM', 0, 10.578, 15.51, 164.07, 221952, 0, 1, 1, '2017-05-12 17:57:01', 'jvelasquez', NULL, NULL),
(9, 23, 3, 1, 4, 4, 9, '0520001399', '2017-01-11', '2:50 AM', 0, 6.869, 15.51, 106.54, 66808, 0, 1, 1, '2017-05-12 18:00:57', 'jvelasquez', NULL, NULL),
(10, 1, 3, 1, 5, 5, 9, '0520001406', '2017-01-11', '4:13 PM', 0, 7.912, 15.51, 122.72, 145882, 0, 1, 1, NULL, NULL, '2017-05-12 18:46:40', 'jvelasquez'),
(11, 1, 3, 1, 5, 5, 9, '0520001639', '2017-01-01', '6:51 AM', 0, 5.324, 15.51, 82.57, 145950, 0, 1, 1, '2017-05-12 18:26:41', 'jvelasquez', NULL, NULL),
(12, 23, 3, 1, 4, 4, 9, '0520001652', '2017-01-01', '7:59 AM', 0, 4.54, 15.51, 70.41, 66893, 0, 1, 1, '2017-05-12 18:31:32', 'jvelasquez', NULL, NULL),
(13, 8, 3, 1, 1, 6, 9, '0520001706', '2017-01-01', '12:09 PM', 0, 17.4, 15.51, 269.88, 196762, 0, 1, 1, '2017-05-12 18:36:57', 'jvelasquez', NULL, NULL),
(14, 23, 3, 1, 4, 4, 9, '0520001918', '2017-01-02', '7:07 PM', 0, 7.117, 15.51, 110.39, 64114, 0, 1, 1, '2017-05-12 18:40:48', 'jvelasquez', NULL, NULL),
(15, 1, 3, 1, 5, 5, 9, '0520002282', '2017-01-06', '6:24 AM', 0, 8.112, 15.51, 125.82, 146066, 0, 1, 1, '2017-05-12 18:44:14', 'jvelasquez', NULL, NULL),
(16, 22, 6, 1, 3, 2, 9, '0520004050', '2017-01-07', '8:08 AM', 0, 19.043, 11.27, 214.61, 108894, 0, 1, 1, '2017-05-14 17:47:37', 'jvelasquez', NULL, NULL),
(17, 22, 6, 1, 1, 2, 9, '0520000068', '2017-01-02', '6:27 AM', 0, 11.625, 11.3, 131.36, 104841, 0, 1, 1, '2017-05-14 17:51:44', 'jvelasquez', NULL, NULL),
(18, 22, 6, 1, 2, 2, 9, '0520000407', '2017-01-04', '12:49 PM', 0, 16.677, 11.3, 188.45, 105360, 0, 1, 1, '2017-05-14 17:55:07', 'jvelasquez', NULL, NULL),
(19, 22, 6, 1, 2, 2, 9, '0520001174', '2017-01-10', '7:53 AM', 0, 17.678, 11.3, 199.77, 106450, 0, 1, 1, NULL, NULL, '2017-06-16 18:51:42', 'jvelasquez'),
(20, 22, 6, 1, 2, 2, 9, '0520001679', '2017-01-13', '9:57 AM', 0, 13.133, 11.3, 148.4, 106860, 0, 1, 1, '2017-05-14 18:18:01', 'jvelasquez', NULL, NULL),
(21, 22, 6, 1, 2, 2, 9, '0510001806', '2017-01-08', '4:12 PM', 0, 19.608, 11.3, 221.57, 107345, 0, 1, 1, NULL, NULL, '2017-06-15 13:00:04', 'jvelasquez'),
(22, 22, 6, 1, 2, 2, 9, '0520003060', '2017-01-12', '6:11 AM', 0, 11.449, 11.3, 129.38, 107738, 0, 1, 1, '2017-05-14 18:22:26', 'jvelasquez', NULL, NULL),
(23, 22, 6, 1, 3, 2, 9, '0520003594', '2017-01-03', '1:21 AM', 0, 13.988, 11.3, 158.06, 108181, 0, 1, 1, '2017-05-14 18:24:42', 'jvelasquez', NULL, NULL),
(24, 23, 3, 1, 4, 4, 9, '0520000083', '2017-01-02', '8:01 AM', 0, 5.043, 15.34, 77.36, 66292, 0, 1, 1, '2017-05-14 18:31:06', 'jvelasquez', NULL, NULL),
(25, 1, 3, 1, 5, 5, 9, '0520000214', '2017-01-03', '7:21 AM', 0, 7.157, 15.34, 109.79, 145650, 0, 1, 1, '2017-05-14 18:35:40', 'jvelasquez', NULL, NULL),
(26, 23, 3, 1, 4, 4, 9, '0520002372', '2017-01-06', '4:25 PM', 0, 7.904, 15.42, 121.88, 67264, 0, 1, 1, '2017-05-14 18:46:10', 'jvelasquez', NULL, NULL),
(27, 8, 3, 1, 3, 6, 9, '0520002490', '2017-01-06', '10:36 AM', 0, 13.72, 15.42, 211.56, 197061, 0, 1, 1, NULL, NULL, '2017-06-16 12:47:50', 'jvelasquez'),
(28, 14, 3, 1, 1, 3, 9, '0520002567', '2017-01-07', '8:48 AM', 0, 14.453, 15.42, 222.87, 222237, 0, 1, 1, '2017-05-14 19:30:07', 'jvelasquez', NULL, NULL),
(29, 23, 3, 1, 4, 4, 9, '0520002643', '2017-01-08', '3:36 PM', 0, 7.85, 15.42, 121.05, 67432, 0, 1, 1, '2017-05-14 19:32:23', 'jvelasquez', NULL, NULL),
(30, 1, 3, 1, 5, 5, 9, '0520003130', '2017-01-12', '2:29 PM', 0, 7.605, 15.42, 117.26, 146167, 0, 1, 1, '2017-05-14 20:22:22', 'jvelasquez', NULL, NULL),
(31, 23, 3, 1, 4, 4, 9, '0520003212', '2017-01-25', '8:16 AM', 0, 8.882, 15.42, 136.96, 67643, 0, 1, 1, NULL, NULL, '2017-06-16 12:42:12', 'jvelasquez'),
(32, 8, 3, 1, 1, 6, 9, '0510002185', '2017-01-01', '4:15 PM', 0, 16.778, 15.27, 256.2, 197418, 0, 1, 1, '2017-05-14 20:25:36', 'jvelasquez', NULL, NULL),
(34, 23, 3, 1, 4, 4, 9, '0520003783', '2017-01-28', '5:50 PM', 0, 7.189, 15.24, 109.56, 67758, 0, 1, 1, NULL, NULL, '2017-06-22 11:43:35', 'jvelasquez'),
(35, 14, 3, 1, 4, 3, 9, '0520003883', '2017-01-30', '6:05 AM', 0, 8.478, 15.24, 129.21, 68029, 0, 1, 1, NULL, NULL, '2017-06-22 11:43:48', 'jvelasquez'),
(36, 14, 3, 1, 3, 3, 9, '0520003935', '2017-01-30', '12:23 PM', 0, 11.406, 15.24, 173.83, 222701, 0, 1, 1, NULL, NULL, '2017-06-22 11:44:17', 'jvelasquez'),
(37, 1, 3, 1, 5, 5, 9, '0520004019', '2017-01-30', '8:55 PM', 0, 9.094, 15.24, 138.6, 146252, 0, 1, 1, NULL, NULL, '2017-06-22 11:44:29', 'jvelasquez'),
(38, 23, 3, 1, 4, 4, 9, '0520004049', '2017-01-31', '7:46 PM', 0, 8.243, 15.24, 125.62, 68278, 0, 1, 1, NULL, NULL, '2017-06-22 11:44:55', 'jvelasquez'),
(39, 8, 3, 1, 2, 6, 9, '0510002727', '2017-01-31', '2:59 PM', 0, 13.241, 15.24, 201.79, 197698, 0, 1, 1, NULL, NULL, '2017-06-22 11:45:56', 'jvelasquez'),
(43, 14, 3, 1, 5, 3, 9, '0520003358', '2017-01-26', '6:49 AM', 0, 13.053, 15.27, 199.32, 222484, 0, 1, 1, '2017-06-16 13:59:56', '', NULL, NULL),
(44, 22, 6, 1, 3, 2, 9, '0520007917', '2017-03-02', '6:24 PM', 0, 11.959, 11.22, 134.18, 112198, 0, 1, 1, NULL, NULL, '2017-06-28 11:28:28', 'jvelasquez'),
(45, 22, 6, 1, 1, 2, 9, '0510005982', '2017-03-02', '8:54 AM', 0, 11.959, 11.22, 181.45, 112612, 0, 1, 1, '2017-06-22 20:38:45', '', NULL, NULL),
(46, 22, 6, 1, 5, 2, 9, '0520009139', '2017-03-13', '6:07 AM', 0, 13.967, 11.22, 156.71, 113103, 0, 1, 1, '2017-06-22 20:44:28', '', NULL, NULL),
(47, 22, 6, 1, 5, 2, 9, '0520009549', '2017-03-16', '6:37 AM', 0, 14.974, 11.22, 168.01, 113377, 0, 1, 1, '2017-06-22 20:53:51', '', NULL, NULL),
(48, 22, 6, 1, 5, 2, 9, '0520010276', '2017-03-22', '6:25 AM', 0, 15.294, 11.22, 171.6, 113630, 0, 1, 1, '2017-06-22 20:56:08', '', NULL, NULL),
(49, 22, 6, 1, 5, 2, 9, '0520011326', '2017-03-30', '6:26 AM', 0, 14.376, 11.22, 161.3, 113916, 0, 1, 1, '2017-06-22 20:57:41', '', NULL, NULL),
(50, 22, 6, 1, 3, 2, 9, '0520011592', '2017-03-31', '6:48 PM', 0, 16.287, 11.22, 182.74, 114389, 0, 1, 1, NULL, NULL, '2017-06-26 12:29:25', 'jvelasquez'),
(51, 1, 3, 1, 5, 5, 9, '0520007830', '2017-03-02', '6:31 AM', 0, 8.715, 14.91, 129.94, 146916, 0, 1, 1, '2017-06-22 21:05:24', '', NULL, NULL),
(52, 1, 3, 1, 5, 5, 9, '0520008255', '2017-03-06', '6:08 AM', 0, 8.817, 14.91, 131.46, 147005, 0, 1, 1, '2017-06-22 21:19:08', 'jvelasquez', NULL, NULL),
(53, 23, 3, 1, 2, 4, 9, '0520008271', '2017-03-06', '7:50 AM', 0, 12.429, 14.91, 185.32, 69702, 0, 1, 1, '2017-06-22 21:39:26', 'jvelasquez', NULL, NULL),
(54, 8, 3, 1, 1, 6, 9, '0520008341', '2017-03-06', '5:02 PM', 0, 15.666, 14.91, 233.58, 199186, 0, 1, 1, '2017-06-22 21:41:14', 'jvelasquez', NULL, NULL),
(55, 1, 3, 1, 5, 5, 9, '0520008515', '2017-03-08', '6:16 AM', 0, 6.753, 14.91, 100.69, 147074, 0, 1, 1, '2017-06-22 22:05:20', 'jvelasquez', NULL, NULL),
(56, 22, 6, 1, 3, 2, 9, '0520004329', '2017-02-02', '4:50 AM', 0, 7.252, 11.27, 81.73, 109131, 0, 1, 1, '2017-06-22 22:07:07', 'jvelasquez', NULL, NULL),
(57, 23, 3, 1, 2, 4, 9, '0520008633', '2017-03-08', '10:05 PM', 0, 12.979, 14.91, 193.52, 69913, 0, 1, 1, '2017-06-22 22:07:14', 'jvelasquez', NULL, NULL),
(58, 1, 3, 1, 5, 5, 9, '0520008697', '2017-03-09', '2:53 PM', 0, 1.44, 14.91, 21.47, 147142, 0, 1, 1, NULL, NULL, '2017-06-22 22:16:30', 'jvelasquez'),
(59, 1, 3, 1, 5, 5, 9, '0520008698', '2017-03-09', '2:56 PM', 0, 6.177, 14.91, 92.1, 147142, 0, 1, 1, '2017-06-22 22:11:30', '', NULL, NULL),
(60, 8, 3, 1, 3, 6, 9, '0520008927', '2017-03-09', '2:56 PM', 0, 15.275, 14.91, 227.75, 199483, 0, 1, 1, '2017-06-22 22:14:56', '', NULL, NULL),
(61, 22, 6, 1, 3, 2, 9, '0520004860', '2017-02-06', '12:42 PM', 0, 20, 11.27, 225.4, 110304, 0, 1, 1, '2017-06-22 22:15:45', 'jvelasquez', NULL, NULL),
(62, 23, 3, 1, 2, 4, 9, '0510006280', '2017-03-13', '6:19 AM', 0, 11.064, 14.91, 164.97, 70060, 0, 1, 1, '2017-06-22 22:18:26', '', NULL, NULL),
(63, 22, 6, 1, 3, 2, 9, '0520005517', '2017-02-10', '6:32 PM', 0, 10.247, 11.27, 115.49, 110490, 0, 1, 1, '2017-06-22 22:19:44', 'jvelasquez', NULL, NULL),
(64, 22, 6, 1, 3, 2, 9, '0520005744', '2017-02-13', '11:10 PM', 0, 20.64, 11.27, 232.62, 111170, 0, 1, 1, NULL, NULL, '2017-06-22 22:29:02', 'jvelasquez'),
(65, 22, 6, 1, 3, 2, 9, '0520006643', '2017-02-20', '10:24 AM', 0, 17.195, 11.27, 193.78, 111554, 0, 1, 1, NULL, NULL, '2017-06-22 22:29:50', 'jvelasquez'),
(66, 22, 6, 1, 3, 2, 9, '0520007482', '2017-02-27', '9:13 AM', 0, 17.114, 11.22, 192.01, 111938, 0, 1, 1, NULL, NULL, '2017-06-22 22:30:17', 'jvelasquez'),
(67, 1, 3, 1, 3, 5, 9, '0520004196', '2017-02-01', '6:25 AM', 0, 6.046, 15.24, 92.14, 146314, 0, 1, 1, NULL, NULL, '2017-06-22 22:30:56', 'jvelasquez'),
(68, 23, 3, 1, 4, 4, 9, '0520004386', '2017-02-02', '11:32 AM', 0, 6.922, 15.06, 104.25, 68395, 0, 1, 1, '2017-06-22 22:32:32', 'jvelasquez', NULL, NULL),
(69, 14, 3, 1, 5, 3, 9, '0520004468', '2017-02-03', '6:47 PM', 0, 9.762, 15.06, 147.02, 222873, 0, 1, 1, '2017-06-22 22:37:08', 'jvelasquez', NULL, NULL),
(70, 23, 3, 1, 4, 4, 9, '0520004799', '2017-02-06', '5:57 PM', 0, 6.926, 15.06, 104.3, 68508, 0, 1, 1, '2017-06-22 22:39:35', 'jvelasquez', NULL, NULL),
(71, 20, 3, 1, 1, 1, 9, '0520009235', '2017-03-13', '6:54 PM', 0, 12.611, 14.91, 188.03, 146083, 1, 1, 1, '2017-06-22 22:40:18', '', NULL, NULL),
(72, 8, 3, 1, 5, 6, 9, '0520004803', '2017-02-06', '6:54 PM', 0, 15.367, 15.06, 231.43, 197959, 0, 1, 1, '2017-06-22 22:40:59', 'jvelasquez', NULL, NULL),
(73, 20, 3, 1, 3, 1, 9, '0520009481', '2017-03-15', '2:30 PM', 0, 10.596, 14.91, 157.99, 146289, 0, 1, 1, '2017-06-22 22:42:05', '', NULL, NULL),
(74, 23, 3, 1, 2, 4, 9, '0520009572', '2017-03-16', '8:50 AM', 0, 13.078, 14.91, 194.99, 70219, 0, 1, 1, '2017-06-22 22:44:03', '', NULL, NULL),
(75, 23, 3, 1, 4, 4, 9, '0520004906', '2017-02-06', '5:00 PM', 0, 8.031, 15.06, 120.95, 68751, 0, 1, 1, NULL, NULL, '2017-06-22 22:46:02', 'jvelasquez'),
(76, 14, 3, 1, 3, 3, 9, '0520009796', '2017-03-17', '6:55 PM', 0, 13.245, 14.81, 196.16, 223852, 0, 1, 1, '2017-06-22 22:46:09', '', NULL, NULL),
(77, 20, 3, 1, 1, 1, 9, '05200010170', '2017-03-21', '10:22 AM', 0, 14.113, 14.81, 209.02, 146520, 0, 1, 1, '2017-06-22 22:47:59', '', NULL, NULL),
(78, 23, 3, 1, 2, 4, 9, '0510006990', '2017-03-21', '11:00 AM', 0, 13.441, 14.81, 199.06, 70426, 0, 1, 1, '2017-06-22 22:49:48', '', NULL, NULL),
(79, 20, 3, 1, 3, 1, 9, '0520010485', '2017-03-23', '2:10 PM', 0, 10.185, 14.69, 149.61, 146759, 0, 1, 1, NULL, NULL, '2017-06-26 10:09:56', 'jvelasquez'),
(80, 23, 3, 1, 2, 4, 9, '0510007173', '2017-03-23', '2:26 PM', 0, 11.01, 14.69, 161.74, 10601, 0, 1, 1, '2017-06-22 22:53:36', '', NULL, NULL),
(81, 14, 3, 1, 1, 3, 9, '0520010914', '2017-03-27', '8:54 AM', 0, 13.686, 14.69, 201.05, 224144, 0, 1, 1, '2017-06-22 22:55:28', '', NULL, NULL),
(82, 1, 3, 1, 1, 5, 9, '0520011042', '2017-03-28', '6:21 AM', 0, 7.37, 14.69, 108.27, 147188, 0, 1, 1, NULL, NULL, '2017-06-22 22:58:22', 'jvelasquez'),
(83, 20, 3, 1, 3, 1, 9, '0520011113', '2017-03-28', '3:20 PM', 0, 11.007, 11.007, 161.7, 146917, 0, 1, 1, '2017-06-22 22:59:52', '', NULL, NULL),
(84, 23, 3, 1, 2, 4, 9, '0520011117', '2017-03-28', '3:45 PM', 0, 9.971, 14.69, 146.47, 70761, 0, 1, 1, '2017-06-22 23:01:50', '', NULL, NULL),
(85, 1, 3, 1, 5, 5, 9, '0520011178', '2017-03-29', '6:22 AM', 0, 6.464, 14.69, 94.95, 147253, 0, 1, 1, '2017-06-22 23:04:01', '', NULL, NULL),
(86, 20, 3, 1, 3, 1, 9, '0510007716', '2017-03-30', '10:37 PM', 0, 10.457, 14.69, 153.62, 147135, 0, 1, 1, '2017-06-22 23:05:36', '', NULL, NULL),
(87, 23, 3, 1, 2, 4, 9, '0520011581', '2017-03-31', '5:41 PM', 0, 14.265, 14.69, 209.55, 7969, 0, 1, 1, '2017-06-22 23:07:10', '', NULL, NULL),
(88, 22, 6, 1, 5, 2, 9, '0520011797', '2017-04-03', '5:03 AM', 0, 14.767, 11.22, 165.69, 114842, 0, 1, 1, NULL, NULL, '2017-06-27 12:36:12', 'jvelasquez'),
(89, 22, 6, 1, 5, 2, 9, '0520011927', '2017-04-04', '6:28 AM', 0, 14.688, 11.22, 164.8, 115445, 0, 1, 1, NULL, NULL, '2017-06-27 12:37:50', 'jvelasquez'),
(90, 22, 6, 1, 5, 2, 9, '0520012197', '2017-04-06', '5:53 AM', 0, 13.352, 11.22, 149.81, 115618, 0, 1, 1, NULL, NULL, '2017-06-23 00:33:28', 'jvelasquez'),
(91, 22, 6, 1, 2, 2, 9, '0510008416', '2017-04-08', '10:04 PM', 0, 15.079, 11.22, 169.19, 116003, 0, 1, 1, '2017-06-23 00:09:25', '', NULL, NULL),
(92, 22, 6, 1, 5, 2, 9, '0520012964', '2017-04-12', '6:29 AM', 0, 11.238, 11.22, 126.09, 116267, 0, 1, 1, '2017-06-23 00:14:03', '', NULL, NULL),
(94, 22, 6, 1, 5, 2, 9, '0520013601', '2017-04-19', '6:21 AM', 0, 15.314, 11.22, 171.82, 116592, 0, 1, 1, '2017-06-23 00:19:07', '', NULL, NULL),
(95, 1, 3, 1, 5, 5, 9, '0520004965', '2017-02-07', '7:02 PM', 0, 6.584, 15.06, 99.15, 146382, 0, 1, 1, '2017-06-23 00:20:59', 'jvelasquez', NULL, NULL),
(96, 22, 6, 1, 5, 2, 9, '0520014282', '2017-04-24', '6:51 AM', 0, 10.96, 11.22, 122.97, 116816, 0, 1, 1, '2017-06-23 00:22:34', '', NULL, NULL),
(99, 1, 3, 1, 1, 5, 9, '0520011866', '2017-04-03', '3:52 AM', 0, 10.507, 14.69, 154.35, 147359, 0, 1, 1, '2017-06-23 00:35:24', '', NULL, NULL),
(100, 20, 3, 1, 1, 1, 9, '0520011957', '2017-04-04', '9:41 AM', 0, 10.577, 14.69, 155.37, 147339, 0, 1, 1, '2017-06-23 01:02:36', '', NULL, NULL),
(101, 23, 3, 1, 2, 4, 9, '0520012183', '2017-04-05', '10:46 PM', 0, 14.902, 14.69, 218.91, 71233, 0, 1, 1, '2017-06-23 01:06:43', '', NULL, NULL),
(102, 14, 3, 1, 1, 3, 9, '0510008315', '2017-04-07', '12:41 PM', 0, 14.456, 14.69, 212.36, 224446, 0, 1, 1, '2017-06-23 01:07:55', '', NULL, NULL),
(103, 20, 3, 1, 3, 1, 9, '0520012435', '2017-04-07', '12:41 PM', 0, 12.928, 14.69, 189.91, 147578, 0, 1, 1, '2017-06-23 01:09:12', '', NULL, NULL),
(104, 23, 3, 1, 2, 4, 9, '0520012862', '2017-04-11', '9:37 AM', 0, 14.184, 14.69, 208.36, 71468, 0, 1, 1, '2017-06-23 01:10:25', '', NULL, NULL),
(105, 23, 3, 1, 2, 4, 9, '0510008828', '2017-04-15', '9:44 AM', 0, 11.026, 15, 165.39, 71670, 0, 1, 1, '2017-06-23 01:15:15', '', NULL, NULL),
(106, 20, 3, 1, 3, 1, 9, '0520013525', '2017-04-18', '2:22 PM', 0, 12.792, 15, 191.88, 148118, 0, 1, 1, '2017-06-23 01:18:02', '', NULL, NULL),
(107, 23, 3, 1, 2, 4, 9, '0510009080', '2017-04-19', '11:52 AM', 0, 12.324, 15, 184.86, 71857, 0, 1, 1, '2017-06-23 01:19:46', '', NULL, NULL),
(108, 20, 3, 1, 2, 1, 9, '0510008620', '2017-04-11', '6:03 PM', 0, 11.436, 14.69, 168, 147853, 0, 1, 1, '2017-06-23 01:20:08', '', NULL, NULL),
(109, 23, 3, 1, 2, 4, 9, '0520014144', '2017-04-22', '4:16 PM', 0, 14.592, 15.15, 221.07, 72116, 0, 1, 1, '2017-06-23 01:23:51', '', NULL, NULL),
(110, 14, 3, 1, 3, 3, 9, '0510009440', '2017-04-24', '6:54 AM', 0, 13.139, 15.15, 199.06, 224710, 0, 1, 1, '2017-06-23 01:25:45', '', NULL, NULL),
(111, 20, 3, 1, 1, 1, 9, '0520014291', '2017-04-24', '8:05 AM', 0, 14.02, 15.15, 212.4, 14842, 0, 1, 1, '2017-06-23 01:26:52', '', NULL, NULL),
(112, 23, 3, 1, 2, 4, 9, '0520014653', '2017-04-27', '12:55 AM', 0, 13.543, 15.15, 205.18, 72390, 0, 1, 1, '2017-06-23 01:27:59', '', NULL, NULL),
(113, 20, 3, 1, 1, 1, 9, '0520014738', '2017-04-27', '3:42 PM', 0, 11.674, 15.15, 176.86, 148646, 0, 1, 1, '2017-06-23 01:30:46', '', NULL, NULL),
(114, 14, 3, 1, 5, 3, 9, '0510009779', '2017-04-28', '6:09 AM', 0, 11.226, 15.15, 170.07, 224917, 0, 1, 1, '2017-06-23 01:32:10', '', NULL, NULL),
(115, 22, 6, 1, 3, 2, 9, '0520014796', '2017-04-28', '6:02 AM', 0, 13.191, 11.22, 148, 117082, 0, 1, 1, '2017-06-27 12:42:26', '', NULL, NULL),
(116, 8, 3, 1, 5, 6, 9, '0520007463', '2017-02-27', '6:21 AM', 0, 10.491, 14.91, 156.42, 198956, 0, 1, 1, '2017-06-27 15:58:13', '', NULL, NULL),
(117, 23, 3, 1, 4, 4, 9, '0520007471', '2017-02-27', '7:55 AM', 0, 6.233, 14.91, 92.94, 69406, 0, 1, 1, '2017-06-27 15:59:36', '', NULL, NULL),
(118, 1, 3, 1, 5, 5, 9, '0520007495', '2017-02-27', '10:46 AM', 0, 11.419, 14.91, 170.26, 146828, 0, 1, 1, NULL, NULL, '2017-06-27 16:05:35', 'jvelasquez'),
(119, 14, 3, 1, 3, 3, 9, '0520007629', '2017-02-28', '11:34 AM', 0, 12.771, 14.91, 190.42, 223589, 0, 1, 1, '2017-06-27 16:02:10', '', NULL, NULL),
(120, 23, 3, 1, 4, 4, 9, '0510005149', '2017-02-28', '3:22 AM', 0, 6.519, 14.91, 97.2, 69530, 0, 1, 1, '2017-06-27 16:03:07', '', NULL, NULL),
(121, 20, 3, 1, 3, 1, 9, '0520005129', '2017-02-08', '9:21 AM', 0, 10, 15.06, 150.6, 145982, 0, 1, 1, '2017-06-28 12:01:49', '', NULL, NULL),
(122, 1, 3, 1, 5, 5, 9, '0510003510', '2017-02-08', '6:28 PM', 0, 7.945, 14.97, 118.94, 146468, 0, 1, 1, '2017-06-28 12:09:29', '', NULL, NULL),
(123, 14, 3, 1, 3, 3, 9, '0520005299', '2017-02-09', '10:04 AM', 0, 10.975, 14.97, 164.29, 223095, 0, 1, 1, '2017-06-28 12:13:10', '', NULL, NULL),
(124, 8, 3, 1, 1, 6, 9, '0520005313', '2017-02-09', '11:33 AM', 0, 13.23, 14.97, 198.05, 198200, 0, 1, 1, '2017-06-28 12:16:31', '', NULL, NULL),
(125, 23, 3, 1, 4, 4, 9, '0520005427', '2017-02-10', '8:09 AM', 0, 9.024, 14.97, 135.09, 68894, 0, 1, 1, '2017-06-28 12:18:23', '', NULL, NULL),
(126, 1, 3, 1, 5, 5, 9, '0520005717', '2017-02-13', '6:47 AM', 0, 8.459, 14.97, 126.64, 146584, 0, 1, 1, '2017-06-28 12:20:07', '', NULL, NULL),
(127, 23, 3, 1, 4, 4, 9, '0510003970', '2017-02-14', '11:31 AM', 0, 6.891, 14.97, 103.16, 69024, 0, 1, 1, '2017-06-28 12:21:47', '', NULL, NULL),
(128, 1, 3, 1, 5, 5, 9, '0520006009', '2017-02-15', '6:15 AM', 0, 14.97, 14.97, 96.74, 146668, 0, 1, 1, '2017-06-28 12:24:25', '', NULL, NULL),
(129, 8, 3, 1, 5, 6, 9, '0520006321', '2017-02-14', '6:38 AM', 0, 14.176, 14.97, 212.26, 520006321, 0, 1, 1, '2017-06-28 12:34:22', '', NULL, NULL),
(130, 14, 3, 1, 3, 3, 9, '0520006707', '2017-02-20', '6:44 PM', 0, 13.387, 14.97, 200.41, 223343, 0, 1, 1, '2017-06-28 12:37:46', '', NULL, NULL),
(131, 8, 3, 1, 5, 6, 9, '0520006744', '2017-02-21', '6:33 AM', 0, 11.144, 14.97, 166.83, 198620, 0, 1, 1, '2017-06-28 12:40:14', '', NULL, NULL),
(132, 23, 3, 1, 4, 4, 9, '0520006859', '2017-02-21', '10:03 AM', 0, 7.692, 14.97, 115.15, 69175, 0, 1, 1, '2017-06-28 12:52:06', '', NULL, NULL),
(133, 8, 3, 1, 5, 6, 9, '0520007011', '2017-02-23', '6:26 AM', 0, 9.767, 14.97, 146.21, 198772, 0, 1, 1, '2017-06-28 12:54:57', '', NULL, NULL),
(134, 23, 3, 1, 4, 4, 9, '0520007094', '2017-02-23', '5:21 AM', 0, 4.852, 14.97, 72.63, 69268, 0, 1, 1, '2017-06-28 12:56:39', '', NULL, NULL),
(139, 22, 6, 1, 1, 2, 9, '0510010260', '2017-05-04', '3:10 PM', 9980.37129, 18.629, 11.21, 208.83, 117622, 0, 1, 1, '2017-08-04 08:32:34', 'dortiz', NULL, NULL),
(140, 22, 6, 1, 11, 2, 9, '0510015474', '2017-07-10', '4:56 PM', 0, 12.978, 10.81, 140.3, 121988, 0, 1, 1, '2017-08-09 15:16:41', 'dortiz', NULL, NULL),
(141, 22, 6, 1, 5, 2, 9, '0510016644', '2017-07-21', '5:20 PM', 0, 5.367, 10.81, 58.02, 122143, 0, 1, 1, '2017-08-09 15:19:41', 'dortiz', NULL, NULL),
(142, 22, 6, 1, 11, 2, 9, '0520026008', '2017-07-24', '2:17 PM', 0, 13.8, 10.81, 149.18, 122571, 0, 1, 1, '2017-08-09 15:22:36', 'dortiz', NULL, NULL),
(143, 23, 3, 1, 2, 4, 9, '0510014947', '2017-07-03', '10:01 PM', 0, 8, 14.55, 116.4, 76932, 0, 1, 1, '2017-08-09 15:27:54', 'dortiz', NULL, NULL),
(144, 14, 3, 1, 3, NULL, NULL, '0510015048', '2017-08-05', '12:15 PM', 0, 13.326, 14.55, 193.9, 227259, 0, 1, 0, NULL, NULL, '2017-08-09 15:36:27', 'jvelasquez'),
(145, 14, 3, 1, 3, 3, 9, '0510015048', '2017-07-05', '12:15 PM', 0, 13.326, 14.55, 193.9, 227259, 0, 1, 1, '2017-08-09 15:41:08', 'dortiz', NULL, NULL),
(151, 20, 2, 1, 1, 1, 9, '000000000', '2017-08-22', '2:10 AM', 423.012, 123.2, 12.52, 1542.46, 456456, 0, 1, 1, NULL, NULL, '2017-08-23 19:22:40', 'jvelasquez'),
(152, 14, 2, 1, 2, 3, 9, '0000000000', '2017-08-22', '1:05 ', 342.3, 122.23, 15.2, 1857.89, 45834, 0, 1, 1, '2017-08-23 19:24:09', 'jvelasquez', NULL, NULL),
(153, 2, 2, 1, 2, NULL, 2, '000000', '2017-08-23', '1:05 AM', 4561, 123.2, 12.5, 1540, 14264, 0, 1, 0, '2017-08-23 19:25:54', 'jvelasquez', NULL, NULL),
(155, 2, 2, 1, 2, NULL, 2, '000000000', '2017-08-23', '2:15 PM', 1212.2, 498.9, 1, 498.9, 45645646, 0, 1, 0, NULL, NULL, '2017-08-23 20:21:53', 'jvelasquez'),
(156, 2, 2, 1, 2, NULL, 2, '00000000', '2017-08-23', '1:05 AM', 456123, 123.2, 15.2, 1872.64, 123456, 0, 1, 0, '2017-08-23 19:34:14', 'jvelasquez', NULL, NULL),
(157, 2, 2, 1, 2, NULL, 2, '000000', '2017-08-21', '2:10 AM', 123465, 12.3, 20.2, 248.46, 14565464, 0, 1, 0, NULL, NULL, '2017-08-23 20:13:19', 'jvelasquez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets_combustible_adjuntos`
--

CREATE TABLE `tickets_combustible_adjuntos` (
  `idtickets_combustible_adjuntos` int(11) NOT NULL,
  `adjunto_ticket` blob,
  `tickets_combustible_idticket_combustible` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets_x_factura_cabecera`
--

CREATE TABLE `tickets_x_factura_cabecera` (
  `idtickets_x_factura_cabecera` int(11) NOT NULL,
  `facturas_idfacturas` int(11) NOT NULL,
  `descripcion_cabecera` varchar(45) DEFAULT NULL,
  `nro_cabecera_generado` varchar(50) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets_x_factura_detalle`
--

CREATE TABLE `tickets_x_factura_detalle` (
  `idtickets_x_factura_detalle` int(11) NOT NULL,
  `idtickets_x_factura_cabecera` int(11) NOT NULL,
  `idticket_combustible` int(11) NOT NULL,
  `fecha_asignacion` datetime DEFAULT NULL,
  `estado_asignacion` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_combustible`
--

CREATE TABLE `tipo_combustible` (
  `idtipo_combustible` int(11) NOT NULL,
  `tipo_combustible` varchar(150) DEFAULT NULL,
  `estado_tipo_combustible` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_combustible`
--

INSERT INTO `tipo_combustible` (`idtipo_combustible`, `tipo_combustible`, `estado_tipo_combustible`) VALUES
(2, 'GASOHOL 90', 1),
(3, 'GASOHOL 95', 1),
(6, 'DB5-S50 UV', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_identificacion`
--

CREATE TABLE `tipo_identificacion` (
  `idtipo_identificacion` int(11) NOT NULL,
  `tipo_identificacion` varchar(45) DEFAULT NULL,
  `estado_tipo_identificacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_identificacion`
--

INSERT INTO `tipo_identificacion` (`idtipo_identificacion`, `tipo_identificacion`, `estado_tipo_identificacion`) VALUES
(1, 'DOCUMENTO NACIONAL IDENTIDAD (D.N.I.)', 1),
(2, 'REGISTRO UNICO AL CONTRIBUYENTE (R.U.C.)', 1),
(3, 'CARNET DE EXTRANJERIA (C.E.)', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_licencia`
--

CREATE TABLE `tipo_licencia` (
  `idtipo_licencia` int(11) NOT NULL,
  `tipo_licencia` varchar(100) DEFAULT NULL,
  `estado_tipo_licencia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_licencia`
--

INSERT INTO `tipo_licencia` (`idtipo_licencia`, `tipo_licencia`, `estado_tipo_licencia`) VALUES
(1, 'CLASE A - CATEGORIA II-a', 1),
(2, 'CLASE A - CATEGORIA II-b', 1),
(3, 'CLASE A - CATEGORIA III-a', 1),
(4, 'CLASE A - CATEGORIA III-b', 1),
(5, 'CLASE A - CATEGORIA III-c', 1),
(6, 'CLASE A - CATEGORIA I-a', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_vehiculo`
--

CREATE TABLE `tipo_vehiculo` (
  `idtipos_vehiculo` int(11) NOT NULL,
  `tipo_vehiculo` varchar(250) DEFAULT NULL,
  `estado_tipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipo_vehiculo`
--

INSERT INTO `tipo_vehiculo` (`idtipos_vehiculo`, `tipo_vehiculo`, `estado_tipo`) VALUES
(1, 'AUTO SEDÃN', 1),
(2, 'CAMIONETA PICK-UP', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajos_x_evaluaciones`
--

CREATE TABLE `trabajos_x_evaluaciones` (
  `idtrabajos_x_evaluaciones` int(11) NOT NULL,
  `idorden_trabajo` int(11) NOT NULL,
  `idevaluaciones_x_servicios` int(11) NOT NULL,
  `calificacion_trabajo_ejecutado` int(11) DEFAULT NULL,
  `comentarios_trabajo_ejecutado` text,
  `porcentaje_trabajo_ejecutado` int(11) DEFAULT NULL,
  `se_ejecuto_trabajo` int(11) DEFAULT NULL,
  `motivo_no_ejecuto` text,
  `fecha_trabajo_ejecutado` datetime DEFAULT NULL,
  `estado_trabajo_x_evaluacion` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `trabajos_x_evaluaciones`
--

INSERT INTO `trabajos_x_evaluaciones` (`idtrabajos_x_evaluaciones`, `idorden_trabajo`, `idevaluaciones_x_servicios`, `calificacion_trabajo_ejecutado`, `comentarios_trabajo_ejecutado`, `porcentaje_trabajo_ejecutado`, `se_ejecuto_trabajo`, `motivo_no_ejecuto`, `fecha_trabajo_ejecutado`, `estado_trabajo_x_evaluacion`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 2, 28, 5, 'SE CAMBIARON CORRECTAMENTE LAS LLANTAS', 100, 1, NULL, '2016-12-22 00:00:00', NULL, NULL, NULL, NULL, NULL),
(12, 4, 44, 3, 'sdfsfsdfs', 48, 1, NULL, '2017-08-29 00:00:00', NULL, NULL, NULL, NULL, NULL),
(13, 4, 43, 3, 'cxcxcx', 59, 1, NULL, '2017-08-17 00:00:00', NULL, NULL, NULL, NULL, NULL),
(14, 5, 45, 5, 'xxxxxxx', 50, 1, NULL, '2017-08-31 00:00:00', NULL, NULL, NULL, NULL, NULL),
(15, 5, 47, 5, 'xxxxxxxx', 49, 1, NULL, '2017-08-03 00:00:00', NULL, NULL, NULL, NULL, NULL),
(16, 5, 48, 3, 'xxxxx', 100, 1, NULL, '2017-08-23 00:00:00', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubigeo`
--

CREATE TABLE `ubigeo` (
  `idubigeo` int(11) NOT NULL,
  `cod_ubigeo` varchar(70) NOT NULL,
  `departamento` varchar(70) NOT NULL,
  `provincia` varchar(70) NOT NULL,
  `distrito` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ubigeo`
--

INSERT INTO `ubigeo` (`idubigeo`, `cod_ubigeo`, `departamento`, `provincia`, `distrito`) VALUES
(1851, '1111', 'AMAZONAS', 'CHACHAPOYAS', 'CHACHAPOYAS'),
(1852, '2112', 'AMAZONAS', 'CHACHAPOYAS', 'ASUNCION'),
(1853, '3113', 'AMAZONAS', 'CHACHAPOYAS', 'BALSAS'),
(1854, '4114', 'AMAZONAS', 'CHACHAPOYAS', 'CHETO'),
(1855, '5115', 'AMAZONAS', 'CHACHAPOYAS', 'CHILIQUIN'),
(1856, '6116', 'AMAZONAS', 'CHACHAPOYAS', 'CHUQUIBAMBA'),
(1857, '7117', 'AMAZONAS', 'CHACHAPOYAS', 'GRANADA'),
(1858, '8118', 'AMAZONAS', 'CHACHAPOYAS', 'HUANCAS'),
(1859, '9119', 'AMAZONAS', 'CHACHAPOYAS', 'LA JALCA'),
(1860, '22121', 'AMAZONAS', 'BAGUA', 'LA PECA'),
(1861, '23122', 'AMAZONAS', 'BAGUA', 'ARAMANGO'),
(1862, '24123', 'AMAZONAS', 'BAGUA', 'COPALLIN'),
(1863, '25124', 'AMAZONAS', 'BAGUA', 'EL PARCO'),
(1864, '26126', 'AMAZONAS', 'BAGUA', 'IMAZA'),
(1865, '27131', 'AMAZONAS', 'BONGARA', 'JUMBILLA'),
(1866, '28132', 'AMAZONAS', 'BONGARA', 'COROSHA'),
(1867, '29133', 'AMAZONAS', 'BONGARA', 'CUISPES'),
(1868, '30134', 'AMAZONAS', 'BONGARA', 'CHISQUILLA'),
(1869, '31135', 'AMAZONAS', 'BONGARA', 'CHURUJA'),
(1870, '32136', 'AMAZONAS', 'BONGARA', 'FLORIDA'),
(1871, '33137', 'AMAZONAS', 'BONGARA', 'RECTA'),
(1872, '34138', 'AMAZONAS', 'BONGARA', 'SAN CARLOS'),
(1873, '35139', 'AMAZONAS', 'BONGARA', 'SHIPASBAMBA'),
(1874, '39141', 'AMAZONAS', 'LUYA', 'LAMUD'),
(1875, '40142', 'AMAZONAS', 'LUYA', 'CAMPORREDONDO'),
(1876, '41143', 'AMAZONAS', 'LUYA', 'COCABAMBA'),
(1877, '42144', 'AMAZONAS', 'LUYA', 'COLCAMAR'),
(1878, '43145', 'AMAZONAS', 'LUYA', 'CONILA'),
(1879, '44146', 'AMAZONAS', 'LUYA', 'INGUILPATA'),
(1880, '45147', 'AMAZONAS', 'LUYA', 'LONGUITA'),
(1881, '46148', 'AMAZONAS', 'LUYA', 'LONYA CHICO'),
(1882, '47149', 'AMAZONAS', 'LUYA', 'LUYA'),
(1883, '62151', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'SAN NICOLAS'),
(1884, '63152', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'COCHAMAL'),
(1885, '64153', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'CHIRIMOTO'),
(1886, '65154', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'HUAMBO'),
(1887, '66155', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'LIMABAMBA'),
(1888, '67156', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'LONGAR'),
(1889, '68157', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'MILPUC'),
(1890, '69158', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'MCAL BENAVIDES'),
(1891, '70159', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'OMIA'),
(1892, '74161', 'AMAZONAS', 'CONDORCANQUI', 'NIEVA'),
(1893, '75162', 'AMAZONAS', 'CONDORCANQUI', 'RIO SANTIAGO'),
(1894, '76163', 'AMAZONAS', 'CONDORCANQUI', 'EL CENEPA'),
(1895, '77171', 'AMAZONAS', 'UTCUBAMBA', 'BAGUA GRANDE'),
(1896, '78172', 'AMAZONAS', 'UTCUBAMBA', 'CAJARURO'),
(1897, '79173', 'AMAZONAS', 'UTCUBAMBA', 'CUMBA'),
(1898, '80174', 'AMAZONAS', 'UTCUBAMBA', 'EL MILAGRO'),
(1899, '81175', 'AMAZONAS', 'UTCUBAMBA', 'JAMALCA'),
(1900, '82176', 'AMAZONAS', 'UTCUBAMBA', 'LONYA GRANDE'),
(1901, '83177', 'AMAZONAS', 'UTCUBAMBA', 'YAMON'),
(1902, '84211', 'ANCASH', 'HUARAZ', 'HUARAZ'),
(1903, '85212', 'ANCASH', 'HUARAZ', 'INDEPENDENCIA'),
(1904, '86213', 'ANCASH', 'HUARAZ', 'COCHABAMBA'),
(1905, '87214', 'ANCASH', 'HUARAZ', 'COLCABAMBA'),
(1906, '88215', 'ANCASH', 'HUARAZ', 'HUANCHAY'),
(1907, '89216', 'ANCASH', 'HUARAZ', 'JANGAS'),
(1908, '90217', 'ANCASH', 'HUARAZ', 'LA LIBERTAD'),
(1909, '91218', 'ANCASH', 'HUARAZ', 'OLLEROS'),
(1910, '92219', 'ANCASH', 'HUARAZ', 'PAMPAS'),
(1911, '96221', 'ANCASH', 'AIJA', 'AIJA'),
(1912, '97223', 'ANCASH', 'AIJA', 'CORIS'),
(1913, '98225', 'ANCASH', 'AIJA', 'HUACLLAN'),
(1914, '99226', 'ANCASH', 'AIJA', 'LA MERCED'),
(1915, '100228', 'ANCASH', 'AIJA', 'SUCCHA'),
(1916, '101110', 'AMAZONAS', 'CHACHAPOYAS', 'LEIMEBAMBA'),
(1917, '101231', 'ANCASH', 'BOLOGNESI', 'CHIQUIAN'),
(1918, '102232', 'ANCASH', 'BOLOGNESI', 'A PARDO LEZAMETA'),
(1919, '103234', 'ANCASH', 'BOLOGNESI', 'AQUIA'),
(1920, '104235', 'ANCASH', 'BOLOGNESI', 'CAJACAY'),
(1921, '111111', 'AMAZONAS', 'CHACHAPOYAS', 'LEVANTO'),
(1922, '116241', 'ANCASH', 'CARHUAZ', 'CARHUAZ'),
(1923, '117242', 'ANCASH', 'CARHUAZ', 'ACOPAMPA'),
(1924, '118243', 'ANCASH', 'CARHUAZ', 'AMASHCA'),
(1925, '119244', 'ANCASH', 'CARHUAZ', 'ANTA'),
(1926, '120245', 'ANCASH', 'CARHUAZ', 'ATAQUERO'),
(1927, '121112', 'AMAZONAS', 'CHACHAPOYAS', 'MAGDALENA'),
(1928, '121246', 'ANCASH', 'CARHUAZ', 'MARCARA'),
(1929, '122247', 'ANCASH', 'CARHUAZ', 'PARIAHUANCA'),
(1930, '123248', 'ANCASH', 'CARHUAZ', 'SAN MIGUEL DE ACO'),
(1931, '124249', 'ANCASH', 'CARHUAZ', 'SHILLA'),
(1932, '127251', 'ANCASH', 'CASMA', 'CASMA'),
(1933, '128252', 'ANCASH', 'CASMA', 'BUENA VISTA ALTA'),
(1934, '129253', 'ANCASH', 'CASMA', 'COMANDANTE NOEL'),
(1935, '130255', 'ANCASH', 'CASMA', 'YAUTAN'),
(1936, '131113', 'AMAZONAS', 'CHACHAPOYAS', 'MARISCAL CASTILLA'),
(1937, '131261', 'ANCASH', 'CORONGO', 'CORONGO'),
(1938, '132262', 'ANCASH', 'CORONGO', 'ACO'),
(1939, '133263', 'ANCASH', 'CORONGO', 'BAMBAS'),
(1940, '134264', 'ANCASH', 'CORONGO', 'CUSCA'),
(1941, '135265', 'ANCASH', 'CORONGO', 'LA PAMPA'),
(1942, '136266', 'ANCASH', 'CORONGO', 'YANAC'),
(1943, '137267', 'ANCASH', 'CORONGO', 'YUPAN'),
(1944, '138271', 'ANCASH', 'HUAYLAS', 'CARAZ'),
(1945, '139272', 'ANCASH', 'HUAYLAS', 'HUALLANCA'),
(1946, '140273', 'ANCASH', 'HUAYLAS', 'HUATA'),
(1947, '141114', 'AMAZONAS', 'CHACHAPOYAS', 'MOLINOPAMPA'),
(1948, '141274', 'ANCASH', 'HUAYLAS', 'HUAYLAS'),
(1949, '142275', 'ANCASH', 'HUAYLAS', 'MATO'),
(1950, '143276', 'ANCASH', 'HUAYLAS', 'PAMPAROMAS'),
(1951, '144277', 'ANCASH', 'HUAYLAS', 'PUEBLO LIBRE'),
(1952, '145278', 'ANCASH', 'HUAYLAS', 'SANTA CRUZ'),
(1953, '146279', 'ANCASH', 'HUAYLAS', 'YURACMARCA'),
(1954, '148281', 'ANCASH', 'HUARI', 'HUARI'),
(1955, '149282', 'ANCASH', 'HUARI', 'CAJAY'),
(1956, '150283', 'ANCASH', 'HUARI', 'CHAVIN DE HUANTAR'),
(1957, '151115', 'AMAZONAS', 'CHACHAPOYAS', 'MONTEVIDEO'),
(1958, '151284', 'ANCASH', 'HUARI', 'HUACACHI'),
(1959, '152285', 'ANCASH', 'HUARI', 'HUACHIS'),
(1960, '153286', 'ANCASH', 'HUARI', 'HUACCHIS'),
(1961, '154287', 'ANCASH', 'HUARI', 'HUANTAR'),
(1962, '155288', 'ANCASH', 'HUARI', 'MASIN'),
(1963, '156289', 'ANCASH', 'HUARI', 'PAUCAS'),
(1964, '161116', 'AMAZONAS', 'CHACHAPOYAS', 'OLLEROS'),
(1965, '164291', 'ANCASH', 'MARISCAL LUZURIAGA', 'PISCOBAMBA'),
(1966, '165292', 'ANCASH', 'MARISCAL LUZURIAGA', 'CASCA'),
(1967, '166293', 'ANCASH', 'MARISCAL LUZURIAGA', 'LUCMA'),
(1968, '167294', 'ANCASH', 'MARISCAL LUZURIAGA', 'FIDEL OLIVAS ESCUDERO'),
(1969, '168295', 'ANCASH', 'MARISCAL LUZURIAGA', 'LLAMA'),
(1970, '169296', 'ANCASH', 'MARISCAL LUZURIAGA', 'LLUMPA'),
(1971, '170297', 'ANCASH', 'MARISCAL LUZURIAGA', 'MUSGA'),
(1972, '171117', 'AMAZONAS', 'CHACHAPOYAS', 'QUINJALCA'),
(1973, '171298', 'ANCASH', 'MARISCAL LUZURIAGA', 'ELEAZAR GUZMAN BARRON'),
(1974, '181118', 'AMAZONAS', 'CHACHAPOYAS', 'SAN FCO DE DAGUAS'),
(1975, '191119', 'AMAZONAS', 'CHACHAPOYAS', 'SAN ISIDRO DE MAINO'),
(1976, '201120', 'AMAZONAS', 'CHACHAPOYAS', 'SOLOCO'),
(1977, '211121', 'AMAZONAS', 'CHACHAPOYAS', 'SONCHE'),
(1978, '250311', 'APURIMAC', 'ABANCAY', 'ABANCAY'),
(1979, '251312', 'APURIMAC', 'ABANCAY', 'CIRCA'),
(1980, '252313', 'APURIMAC', 'ABANCAY', 'CURAHUASI'),
(1981, '253314', 'APURIMAC', 'ABANCAY', 'CHACOCHE'),
(1982, '254315', 'APURIMAC', 'ABANCAY', 'HUANIPACA'),
(1983, '255316', 'APURIMAC', 'ABANCAY', 'LAMBRAMA'),
(1984, '256317', 'APURIMAC', 'ABANCAY', 'PICHIRHUA'),
(1985, '257318', 'APURIMAC', 'ABANCAY', 'SAN PEDRO DE CACHORA'),
(1986, '258319', 'APURIMAC', 'ABANCAY', 'TAMBURCO'),
(1987, '259321', 'APURIMAC', 'AYMARAES', 'CHALHUANCA'),
(1988, '260322', 'APURIMAC', 'AYMARAES', 'CAPAYA'),
(1989, '261323', 'APURIMAC', 'AYMARAES', 'CARAYBAMBA'),
(1990, '262324', 'APURIMAC', 'AYMARAES', 'COLCABAMBA'),
(1991, '263325', 'APURIMAC', 'AYMARAES', 'COTARUSE'),
(1992, '264326', 'APURIMAC', 'AYMARAES', 'CHAPIMARCA'),
(1993, '265327', 'APURIMAC', 'AYMARAES', 'IHUAYLLO'),
(1994, '266328', 'APURIMAC', 'AYMARAES', 'LUCRE'),
(1995, '267329', 'APURIMAC', 'AYMARAES', 'POCOHUANCA'),
(1996, '276331', 'APURIMAC', 'ANDAHUAYLAS', 'ANDAHUAYLAS'),
(1997, '277332', 'APURIMAC', 'ANDAHUAYLAS', 'ANDARAPA'),
(1998, '278333', 'APURIMAC', 'ANDAHUAYLAS', 'CHIARA'),
(1999, '279334', 'APURIMAC', 'ANDAHUAYLAS', 'HUANCARAMA'),
(2000, '280335', 'APURIMAC', 'ANDAHUAYLAS', 'HUANCARAY'),
(2001, '281336', 'APURIMAC', 'ANDAHUAYLAS', 'KISHUARA'),
(2002, '282337', 'APURIMAC', 'ANDAHUAYLAS', 'PACOBAMBA'),
(2003, '283338', 'APURIMAC', 'ANDAHUAYLAS', 'PAMPACHIRI'),
(2004, '284339', 'APURIMAC', 'ANDAHUAYLAS', 'SAN ANTONIO DE CACHI'),
(2005, '295341', 'APURIMAC', 'ANTABAMBA', 'ANTABAMBA'),
(2006, '296342', 'APURIMAC', 'ANTABAMBA', 'EL ORO'),
(2007, '297343', 'APURIMAC', 'ANTABAMBA', 'HUAQUIRCA'),
(2008, '298344', 'APURIMAC', 'ANTABAMBA', 'JUAN ESPINOZA MEDRANO'),
(2009, '299345', 'APURIMAC', 'ANTABAMBA', 'OROPESA'),
(2010, '300346', 'APURIMAC', 'ANTABAMBA', 'PACHACONAS'),
(2011, '301347', 'APURIMAC', 'ANTABAMBA', 'SABAINO'),
(2012, '302351', 'APURIMAC', 'COTABAMBAS', 'TAMBOBAMBA'),
(2013, '303352', 'APURIMAC', 'COTABAMBAS', 'COYLLURQUI'),
(2014, '304353', 'APURIMAC', 'COTABAMBAS', 'COTABAMBAS'),
(2015, '305354', 'APURIMAC', 'COTABAMBAS', 'HAQUIRA'),
(2016, '306355', 'APURIMAC', 'COTABAMBAS', 'MARA'),
(2017, '307356', 'APURIMAC', 'COTABAMBAS', 'CHALLHUAHUACHO'),
(2018, '308361', 'APURIMAC', 'GRAU', 'CHUQUIBAMBILLA'),
(2019, '309362', 'APURIMAC', 'GRAU', 'CURPAHUASI'),
(2020, '310363', 'APURIMAC', 'GRAU', 'HUAILLATI'),
(2021, '311364', 'APURIMAC', 'GRAU', 'MAMARA'),
(2022, '312365', 'APURIMAC', 'GRAU', 'MARISCAL GAMARRA'),
(2023, '313366', 'APURIMAC', 'GRAU', 'MICAELA BASTIDAS'),
(2024, '314367', 'APURIMAC', 'GRAU', 'PROGRESO'),
(2025, '315368', 'APURIMAC', 'GRAU', 'PATAYPAMPA'),
(2026, '316369', 'APURIMAC', 'GRAU', 'SAN ANTONIO'),
(2027, '322371', 'APURIMAC', 'CHINCHEROS', 'CHINCHEROS'),
(2028, '323372', 'APURIMAC', 'CHINCHEROS', 'ONGOY'),
(2029, '324373', 'APURIMAC', 'CHINCHEROS', 'OCOBAMBA'),
(2030, '325374', 'APURIMAC', 'CHINCHEROS', 'COCHARCAS'),
(2031, '326375', 'APURIMAC', 'CHINCHEROS', 'ANCO HUALLO'),
(2032, '327376', 'APURIMAC', 'CHINCHEROS', 'HUACCANA'),
(2033, '328377', 'APURIMAC', 'CHINCHEROS', 'URANMARCA'),
(2034, '329378', 'APURIMAC', 'CHINCHEROS', 'RANRACANCHA'),
(2035, '330411', 'AREQUIPA', 'AREQUIPA', 'AREQUIPA'),
(2036, '331412', 'AREQUIPA', 'AREQUIPA', 'CAYMA'),
(2037, '332413', 'AREQUIPA', 'AREQUIPA', 'CERRO COLORADO'),
(2038, '333414', 'AREQUIPA', 'AREQUIPA', 'CHARACATO'),
(2039, '334415', 'AREQUIPA', 'AREQUIPA', 'CHIGUATA'),
(2040, '335416', 'AREQUIPA', 'AREQUIPA', 'LA JOYA'),
(2041, '336417', 'AREQUIPA', 'AREQUIPA', 'MIRAFLORES'),
(2042, '337418', 'AREQUIPA', 'AREQUIPA', 'MOLLEBAYA'),
(2043, '338419', 'AREQUIPA', 'AREQUIPA', 'PAUCARPATA'),
(2044, '359421', 'AREQUIPA', 'CAYLLOMA', 'CHIVAY'),
(2045, '360422', 'AREQUIPA', 'CAYLLOMA', 'ACHOMA'),
(2046, '361310', 'AMAZONAS', 'BONGARA', 'VALERA'),
(2047, '361423', 'AREQUIPA', 'CAYLLOMA', 'CABANACONDE'),
(2048, '362424', 'AREQUIPA', 'CAYLLOMA', 'CAYLLOMA'),
(2049, '363425', 'AREQUIPA', 'CAYLLOMA', 'CALLALLI'),
(2050, '364426', 'AREQUIPA', 'CAYLLOMA', 'COPORAQUE'),
(2051, '365427', 'AREQUIPA', 'CAYLLOMA', 'HUAMBO'),
(2052, '366428', 'AREQUIPA', 'CAYLLOMA', 'HUANCA'),
(2053, '367429', 'AREQUIPA', 'CAYLLOMA', 'ICHUPAMPA'),
(2054, '371311', 'AMAZONAS', 'BONGARA', 'YAMBRASBAMBA'),
(2055, '379431', 'AREQUIPA', 'CAMANA', 'CAMANA'),
(2056, '380432', 'AREQUIPA', 'CAMANA', 'JOSE MARIA QUIMPER'),
(2057, '381312', 'AMAZONAS', 'BONGARA', 'JAZAN'),
(2058, '381433', 'AREQUIPA', 'CAMANA', 'MARIANO N VALCARCEL'),
(2059, '382434', 'AREQUIPA', 'CAMANA', 'MARISCAL CACERES'),
(2060, '383435', 'AREQUIPA', 'CAMANA', 'NICOLAS DE PIEROLA'),
(2061, '384436', 'AREQUIPA', 'CAMANA', 'OCOÑA'),
(2062, '385437', 'AREQUIPA', 'CAMANA', 'QUILCA'),
(2063, '386438', 'AREQUIPA', 'CAMANA', 'SAMUEL PASTOR'),
(2064, '387441', 'AREQUIPA', 'CARAVELI', 'CARAVELI'),
(2065, '388442', 'AREQUIPA', 'CARAVELI', 'ACARI'),
(2066, '389443', 'AREQUIPA', 'CARAVELI', 'ATICO'),
(2067, '390444', 'AREQUIPA', 'CARAVELI', 'ATIQUIPA'),
(2068, '391445', 'AREQUIPA', 'CARAVELI', 'BELLA UNION'),
(2069, '392446', 'AREQUIPA', 'CARAVELI', 'CAHUACHO'),
(2070, '393447', 'AREQUIPA', 'CARAVELI', 'CHALA'),
(2071, '394448', 'AREQUIPA', 'CARAVELI', 'CHAPARRA'),
(2072, '395449', 'AREQUIPA', 'CARAVELI', 'HUANUHUANU'),
(2073, '400451', 'AREQUIPA', 'CASTILLA', 'APLAO'),
(2074, '401452', 'AREQUIPA', 'CASTILLA', 'ANDAGUA'),
(2075, '402453', 'AREQUIPA', 'CASTILLA', 'AYO'),
(2076, '403454', 'AREQUIPA', 'CASTILLA', 'CHACHAS'),
(2077, '404455', 'AREQUIPA', 'CASTILLA', 'CHILCAYMARCA'),
(2078, '405456', 'AREQUIPA', 'CASTILLA', 'CHOCO'),
(2079, '406457', 'AREQUIPA', 'CASTILLA', 'HUANCARQUI'),
(2080, '407458', 'AREQUIPA', 'CASTILLA', 'MACHAGUAY'),
(2081, '408459', 'AREQUIPA', 'CASTILLA', 'ORCOPAMPA'),
(2082, '414461', 'AREQUIPA', 'CONDESUYOS', 'CHUQUIBAMBA'),
(2083, '415462', 'AREQUIPA', 'CONDESUYOS', 'ANDARAY'),
(2084, '416463', 'AREQUIPA', 'CONDESUYOS', 'CAYARANI'),
(2085, '417464', 'AREQUIPA', 'CONDESUYOS', 'CHICHAS'),
(2086, '418465', 'AREQUIPA', 'CONDESUYOS', 'IRAY'),
(2087, '419466', 'AREQUIPA', 'CONDESUYOS', 'SALAMANCA'),
(2088, '420467', 'AREQUIPA', 'CONDESUYOS', 'YANAQUIHUA'),
(2089, '421468', 'AREQUIPA', 'CONDESUYOS', 'RIO GRANDE'),
(2090, '422471', 'AREQUIPA', 'ISLAY', 'MOLLENDO'),
(2091, '423472', 'AREQUIPA', 'ISLAY', 'COCACHACRA'),
(2092, '424473', 'AREQUIPA', 'ISLAY', 'DEAN VALDIVIA'),
(2093, '425474', 'AREQUIPA', 'ISLAY', 'ISLAY'),
(2094, '426475', 'AREQUIPA', 'ISLAY', 'MEJIA'),
(2095, '427476', 'AREQUIPA', 'ISLAY', 'PUNTA DE BOMBON'),
(2096, '428481', 'AREQUIPA', 'LA UNION', 'COTAHUASI'),
(2097, '429482', 'AREQUIPA', 'LA UNION', 'ALCA'),
(2098, '430483', 'AREQUIPA', 'LA UNION', 'CHARCANA'),
(2099, '431484', 'AREQUIPA', 'LA UNION', 'HUAYNACOTAS'),
(2100, '432485', 'AREQUIPA', 'LA UNION', 'PAMPAMARCA'),
(2101, '433486', 'AREQUIPA', 'LA UNION', 'PUYCA'),
(2102, '434487', 'AREQUIPA', 'LA UNION', 'QUECHUALLA'),
(2103, '435488', 'AREQUIPA', 'LA UNION', 'SAYLA'),
(2104, '436489', 'AREQUIPA', 'LA UNION', 'TAURIA'),
(2105, '439511', 'AYACUCHO', 'HUAMANGA', 'AYACUCHO'),
(2106, '440512', 'AYACUCHO', 'HUAMANGA', 'ACOS VINCHOS'),
(2107, '441513', 'AYACUCHO', 'HUAMANGA', 'CARMEN ALTO'),
(2108, '442514', 'AYACUCHO', 'HUAMANGA', 'CHIARA'),
(2109, '443515', 'AYACUCHO', 'HUAMANGA', 'QUINUA'),
(2110, '444516', 'AYACUCHO', 'HUAMANGA', 'SAN JOSE DE TICLLAS'),
(2111, '445517', 'AYACUCHO', 'HUAMANGA', 'SAN JUAN BAUTISTA'),
(2112, '446518', 'AYACUCHO', 'HUAMANGA', 'SANTIAGO DE PISCHA'),
(2113, '447519', 'AYACUCHO', 'HUAMANGA', 'VINCHOS'),
(2114, '454521', 'AYACUCHO', 'CANGALLO', 'CANGALLO'),
(2115, '455524', 'AYACUCHO', 'CANGALLO', 'CHUSCHI'),
(2116, '456526', 'AYACUCHO', 'CANGALLO', 'LOS MOROCHUCOS'),
(2117, '457527', 'AYACUCHO', 'CANGALLO', 'PARAS'),
(2118, '458528', 'AYACUCHO', 'CANGALLO', 'TOTOS'),
(2119, '460531', 'AYACUCHO', 'HUANTA', 'HUANTA'),
(2120, '461532', 'AYACUCHO', 'HUANTA', 'AYAHUANCO'),
(2121, '462533', 'AYACUCHO', 'HUANTA', 'HUAMANGUILLA'),
(2122, '463534', 'AYACUCHO', 'HUANTA', 'IGUAIN'),
(2123, '464535', 'AYACUCHO', 'HUANTA', 'LURICOCHA'),
(2124, '465537', 'AYACUCHO', 'HUANTA', 'SANTILLANA'),
(2125, '466538', 'AYACUCHO', 'HUANTA', 'SIVIA'),
(2126, '467539', 'AYACUCHO', 'HUANTA', 'LLOCHEGUA'),
(2127, '467540', 'AYACUCHO', 'HUANTA', 'PUCACOLPA'),
(2128, '468541', 'AYACUCHO', 'LA MAR', 'SAN MIGUEL'),
(2129, '469542', 'AYACUCHO', 'LA MAR', 'ANCO'),
(2130, '470543', 'AYACUCHO', 'LA MAR', 'AYNA'),
(2131, '471544', 'AYACUCHO', 'LA MAR', 'CHILCAS'),
(2132, '472545', 'AYACUCHO', 'LA MAR', 'CHUNGUI'),
(2133, '473546', 'AYACUCHO', 'LA MAR', 'TAMBO'),
(2134, '474547', 'AYACUCHO', 'LA MAR', 'LUIS CARRANZA'),
(2135, '475548', 'AYACUCHO', 'LA MAR', 'SANTA ROSA'),
(2136, '476551', 'AYACUCHO', 'LUCANAS', 'PUQUIO'),
(2137, '477552', 'AYACUCHO', 'LUCANAS', 'AUCARA'),
(2138, '478553', 'AYACUCHO', 'LUCANAS', 'CABANA'),
(2139, '479554', 'AYACUCHO', 'LUCANAS', 'CARMEN SALCEDO'),
(2140, '480556', 'AYACUCHO', 'LUCANAS', 'CHAVIÑA'),
(2141, '481410', 'AMAZONAS', 'LUYA', 'LUYA VIEJO'),
(2142, '481558', 'AYACUCHO', 'LUCANAS', 'CHIPAO'),
(2143, '491411', 'AMAZONAS', 'LUYA', 'MARIA'),
(2144, '497561', 'AYACUCHO', 'PARINACOCHAS', 'CORACORA'),
(2145, '498564', 'AYACUCHO', 'PARINACOCHAS', 'CORONEL CASTAÑEDA'),
(2146, '499565', 'AYACUCHO', 'PARINACOCHAS', 'CHUMPI'),
(2147, '500568', 'AYACUCHO', 'PARINACOCHAS', 'PACAPAUSA'),
(2148, '501412', 'AMAZONAS', 'LUYA', 'OCALLI'),
(2149, '505571', 'AYACUCHO', 'VICTOR FAJARDO', 'HUANCAPI'),
(2150, '506572', 'AYACUCHO', 'VICTOR FAJARDO', 'ALCAMENCA'),
(2151, '507573', 'AYACUCHO', 'VICTOR FAJARDO', 'APONGO'),
(2152, '508574', 'AYACUCHO', 'VICTOR FAJARDO', 'CANARIA'),
(2153, '509576', 'AYACUCHO', 'VICTOR FAJARDO', 'CAYARA'),
(2154, '510577', 'AYACUCHO', 'VICTOR FAJARDO', 'COLCA'),
(2155, '511413', 'AMAZONAS', 'LUYA', 'OCUMAL'),
(2156, '511578', 'AYACUCHO', 'VICTOR FAJARDO', 'HUAYA'),
(2157, '512579', 'AYACUCHO', 'VICTOR FAJARDO', 'HUAMANQUIQUIA'),
(2158, '517581', 'AYACUCHO', 'HUANCA SANCOS', 'SANCOS'),
(2159, '518582', 'AYACUCHO', 'HUANCA SANCOS', 'SACSAMARCA'),
(2160, '519583', 'AYACUCHO', 'HUANCA SANCOS', 'SANTIAGO DE LUCANAMARCA'),
(2161, '520584', 'AYACUCHO', 'HUANCA SANCOS', 'CARAPO'),
(2162, '521414', 'AMAZONAS', 'LUYA', 'PISUQUIA'),
(2163, '521591', 'AYACUCHO', 'VILCAS HUAMAN', 'VILCAS HUAMAN'),
(2164, '522592', 'AYACUCHO', 'VILCAS HUAMAN', 'VISCHONGO'),
(2165, '523593', 'AYACUCHO', 'VILCAS HUAMAN', 'ACCOMARCA'),
(2166, '524594', 'AYACUCHO', 'VILCAS HUAMAN', 'CARHUANCA'),
(2167, '525595', 'AYACUCHO', 'VILCAS HUAMAN', 'CONCEPCION'),
(2168, '526596', 'AYACUCHO', 'VILCAS HUAMAN', 'HUAMBALPA'),
(2169, '527597', 'AYACUCHO', 'VILCAS HUAMAN', 'SAURAMA'),
(2170, '528598', 'AYACUCHO', 'VILCAS HUAMAN', 'INDEPENDENCIA'),
(2171, '531415', 'AMAZONAS', 'LUYA', 'SAN CRISTOBAL'),
(2172, '541416', 'AMAZONAS', 'LUYA', 'SAN FRANCISCO DE YESO'),
(2173, '550611', 'CAJAMARCA', 'CAJAMARCA', 'CAJAMARCA'),
(2174, '551417', 'AMAZONAS', 'LUYA', 'SAN JERONIMO'),
(2175, '551612', 'CAJAMARCA', 'CAJAMARCA', 'ASUNCION'),
(2176, '552613', 'CAJAMARCA', 'CAJAMARCA', 'COSPAN'),
(2177, '553614', 'CAJAMARCA', 'CAJAMARCA', 'CHETILLA'),
(2178, '554615', 'CAJAMARCA', 'CAJAMARCA', 'ENCAÑADA'),
(2179, '555616', 'CAJAMARCA', 'CAJAMARCA', 'JESUS'),
(2180, '556617', 'CAJAMARCA', 'CAJAMARCA', 'LOS BAÑOS DEL INCA'),
(2181, '557618', 'CAJAMARCA', 'CAJAMARCA', 'LLACANORA'),
(2182, '558619', 'CAJAMARCA', 'CAJAMARCA', 'MAGDALENA'),
(2183, '561418', 'AMAZONAS', 'LUYA', 'SAN JUAN DE LOPECANCHA'),
(2184, '562621', 'CAJAMARCA', 'CAJABAMBA', 'CAJABAMBA'),
(2185, '563622', 'CAJAMARCA', 'CAJABAMBA', 'CACHACHI'),
(2186, '564623', 'CAJAMARCA', 'CAJABAMBA', 'CONDEBAMBA'),
(2187, '565625', 'CAJAMARCA', 'CAJABAMBA', 'SITACOCHA'),
(2188, '566631', 'CAJAMARCA', 'CELENDIN', 'CELENDIN'),
(2189, '567632', 'CAJAMARCA', 'CELENDIN', 'CORTEGANA'),
(2190, '568633', 'CAJAMARCA', 'CELENDIN', 'CHUMUCH'),
(2191, '569634', 'CAJAMARCA', 'CELENDIN', 'HUASMIN'),
(2192, '570635', 'CAJAMARCA', 'CELENDIN', 'JORGE CHAVEZ'),
(2193, '571419', 'AMAZONAS', 'LUYA', 'SANTA CATALINA'),
(2194, '571636', 'CAJAMARCA', 'CELENDIN', 'JOSE GALVEZ'),
(2195, '572637', 'CAJAMARCA', 'CELENDIN', 'MIGUEL IGLESIAS'),
(2196, '573638', 'CAJAMARCA', 'CELENDIN', 'OXAMARCA'),
(2197, '574639', 'CAJAMARCA', 'CELENDIN', 'SOROCHUCO'),
(2198, '578641', 'CAJAMARCA', 'CONTUMAZA', 'CONTUMAZA'),
(2199, '579643', 'CAJAMARCA', 'CONTUMAZA', 'CHILETE'),
(2200, '580644', 'CAJAMARCA', 'CONTUMAZA', 'GUZMANGO'),
(2201, '581420', 'AMAZONAS', 'LUYA', 'SANTO TOMAS'),
(2202, '581645', 'CAJAMARCA', 'CONTUMAZA', 'SAN BENITO'),
(2203, '582646', 'CAJAMARCA', 'CONTUMAZA', 'CUPISNIQUE'),
(2204, '583647', 'CAJAMARCA', 'CONTUMAZA', 'TANTARICA'),
(2205, '584648', 'CAJAMARCA', 'CONTUMAZA', 'YONAN'),
(2206, '585649', 'CAJAMARCA', 'CONTUMAZA', 'STA CRUZ DE TOLEDO'),
(2207, '586651', 'CAJAMARCA', 'CUTERVO', 'CUTERVO'),
(2208, '587652', 'CAJAMARCA', 'CUTERVO', 'CALLAYUC'),
(2209, '588653', 'CAJAMARCA', 'CUTERVO', 'CUJILLO'),
(2210, '589654', 'CAJAMARCA', 'CUTERVO', 'CHOROS'),
(2211, '590655', 'CAJAMARCA', 'CUTERVO', 'LA RAMADA'),
(2212, '591421', 'AMAZONAS', 'LUYA', 'TINGO'),
(2213, '591656', 'CAJAMARCA', 'CUTERVO', 'PIMPINGOS'),
(2214, '592657', 'CAJAMARCA', 'CUTERVO', 'QUEROCOTILLO'),
(2215, '593658', 'CAJAMARCA', 'CUTERVO', 'SAN ANDRES DE CUTERVO'),
(2216, '594659', 'CAJAMARCA', 'CUTERVO', 'SAN JUAN DE CUTERVO'),
(2217, '601422', 'AMAZONAS', 'LUYA', 'TRITA'),
(2218, '601661', 'CAJAMARCA', 'CHOTA', 'CHOTA'),
(2219, '602662', 'CAJAMARCA', 'CHOTA', 'ANGUIA'),
(2220, '603663', 'CAJAMARCA', 'CHOTA', 'COCHABAMBA'),
(2221, '604664', 'CAJAMARCA', 'CHOTA', 'CONCHAN'),
(2222, '605665', 'CAJAMARCA', 'CHOTA', 'CHADIN'),
(2223, '606666', 'CAJAMARCA', 'CHOTA', 'CHIGUIRIP'),
(2224, '607667', 'CAJAMARCA', 'CHOTA', 'CHIMBAN'),
(2225, '608668', 'CAJAMARCA', 'CHOTA', 'HUAMBOS'),
(2226, '609669', 'CAJAMARCA', 'CHOTA', 'LAJAS'),
(2227, '611423', 'AMAZONAS', 'LUYA', 'PROVIDENCIA'),
(2228, '620671', 'CAJAMARCA', 'HUALGAYOC', 'BAMBAMARCA'),
(2229, '621672', 'CAJAMARCA', 'HUALGAYOC', 'CHUGUR'),
(2230, '622673', 'CAJAMARCA', 'HUALGAYOC', 'HUALGAYOC'),
(2231, '623681', 'CAJAMARCA', 'JAEN', 'JAEN'),
(2232, '624682', 'CAJAMARCA', 'JAEN', 'BELLAVISTA'),
(2233, '625683', 'CAJAMARCA', 'JAEN', 'COLASAY'),
(2234, '626684', 'CAJAMARCA', 'JAEN', 'CHONTALI'),
(2235, '627685', 'CAJAMARCA', 'JAEN', 'POMAHUACA'),
(2236, '628686', 'CAJAMARCA', 'JAEN', 'PUCARA'),
(2237, '629687', 'CAJAMARCA', 'JAEN', 'SALLIQUE'),
(2238, '630688', 'CAJAMARCA', 'JAEN', 'SAN FELIPE'),
(2239, '631689', 'CAJAMARCA', 'JAEN', 'SAN JOSE DEL ALTO'),
(2240, '635691', 'CAJAMARCA', 'SANTA CRUZ', 'SANTA CRUZ'),
(2241, '636692', 'CAJAMARCA', 'SANTA CRUZ', 'CATACHE'),
(2242, '637693', 'CAJAMARCA', 'SANTA CRUZ', 'CHANCAIBAÑOS'),
(2243, '638694', 'CAJAMARCA', 'SANTA CRUZ', 'LA ESPERANZA'),
(2244, '639695', 'CAJAMARCA', 'SANTA CRUZ', 'NINABAMBA'),
(2245, '640696', 'CAJAMARCA', 'SANTA CRUZ', 'PULAN'),
(2246, '641697', 'CAJAMARCA', 'SANTA CRUZ', 'SEXI'),
(2247, '642698', 'CAJAMARCA', 'SANTA CRUZ', 'UTICYACU'),
(2248, '643699', 'CAJAMARCA', 'SANTA CRUZ', 'YAUYUCAN'),
(2249, '677711', 'CUSCO', 'CUSCO', 'CUSCO'),
(2250, '678712', 'CUSCO', 'CUSCO', 'CCORCA'),
(2251, '679713', 'CUSCO', 'CUSCO', 'POROY'),
(2252, '680714', 'CUSCO', 'CUSCO', 'SAN JERONIMO'),
(2253, '681715', 'CUSCO', 'CUSCO', 'SAN SEBASTIAN'),
(2254, '682716', 'CUSCO', 'CUSCO', 'SANTIAGO'),
(2255, '683717', 'CUSCO', 'CUSCO', 'SAYLLA'),
(2256, '684718', 'CUSCO', 'CUSCO', 'WANCHAQ'),
(2257, '685721', 'CUSCO', 'ACOMAYO', 'ACOMAYO'),
(2258, '686722', 'CUSCO', 'ACOMAYO', 'ACOPIA'),
(2259, '687723', 'CUSCO', 'ACOMAYO', 'ACOS'),
(2260, '688724', 'CUSCO', 'ACOMAYO', 'POMACANCHI'),
(2261, '689725', 'CUSCO', 'ACOMAYO', 'RONDOCAN'),
(2262, '690726', 'CUSCO', 'ACOMAYO', 'SANGARARA'),
(2263, '691727', 'CUSCO', 'ACOMAYO', 'MOSOC LLACTA'),
(2264, '692731', 'CUSCO', 'ANTA', 'ANTA'),
(2265, '693732', 'CUSCO', 'ANTA', 'CHINCHAYPUJIO'),
(2266, '694733', 'CUSCO', 'ANTA', 'HUAROCONDO'),
(2267, '695734', 'CUSCO', 'ANTA', 'LIMATAMBO'),
(2268, '696735', 'CUSCO', 'ANTA', 'MOLLEPATA'),
(2269, '697736', 'CUSCO', 'ANTA', 'PUCYURA'),
(2270, '698737', 'CUSCO', 'ANTA', 'ZURITE'),
(2271, '699738', 'CUSCO', 'ANTA', 'CACHIMAYO'),
(2272, '700739', 'CUSCO', 'ANTA', 'ANCAHUASI'),
(2273, '701741', 'CUSCO', 'CALCA', 'CALCA'),
(2274, '702742', 'CUSCO', 'CALCA', 'COYA'),
(2275, '703743', 'CUSCO', 'CALCA', 'LAMAY'),
(2276, '704744', 'CUSCO', 'CALCA', 'LARES'),
(2277, '705745', 'CUSCO', 'CALCA', 'PISAC'),
(2278, '706746', 'CUSCO', 'CALCA', 'SAN SALVADOR'),
(2279, '707747', 'CUSCO', 'CALCA', 'TARAY'),
(2280, '708748', 'CUSCO', 'CALCA', 'YANATILE'),
(2281, '709751', 'CUSCO', 'CANAS', 'YANAOCA'),
(2282, '710752', 'CUSCO', 'CANAS', 'CHECCA'),
(2283, '711510', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'SANTA ROSA'),
(2284, '711753', 'CUSCO', 'CANAS', 'KUNTURKANKI'),
(2285, '712754', 'CUSCO', 'CANAS', 'LANGUI'),
(2286, '713755', 'CUSCO', 'CANAS', 'LAYO'),
(2287, '714756', 'CUSCO', 'CANAS', 'PAMPAMARCA'),
(2288, '715757', 'CUSCO', 'CANAS', 'QUEHUE'),
(2289, '716758', 'CUSCO', 'CANAS', 'TUPAC AMARU'),
(2290, '717761', 'CUSCO', 'CANCHIS', 'SICUANI'),
(2291, '718762', 'CUSCO', 'CANCHIS', 'COMBAPATA'),
(2292, '719763', 'CUSCO', 'CANCHIS', 'CHECACUPE'),
(2293, '720764', 'CUSCO', 'CANCHIS', 'MARANGANI'),
(2294, '721511', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'TOTORA'),
(2295, '721765', 'CUSCO', 'CANCHIS', 'PITUMARCA'),
(2296, '722766', 'CUSCO', 'CANCHIS', 'SAN PABLO'),
(2297, '723767', 'CUSCO', 'CANCHIS', 'SAN PEDRO'),
(2298, '724768', 'CUSCO', 'CANCHIS', 'TINTA'),
(2299, '725771', 'CUSCO', 'CHUMBIVILCAS', 'SANTO TOMAS'),
(2300, '726772', 'CUSCO', 'CHUMBIVILCAS', 'CAPACMARCA'),
(2301, '727773', 'CUSCO', 'CHUMBIVILCAS', 'COLQUEMARCA'),
(2302, '728774', 'CUSCO', 'CHUMBIVILCAS', 'CHAMACA'),
(2303, '729775', 'CUSCO', 'CHUMBIVILCAS', 'LIVITACA'),
(2304, '730776', 'CUSCO', 'CHUMBIVILCAS', 'LLUSCO'),
(2305, '731512', 'AMAZONAS', 'RODRIGUEZ DE MENDOZA', 'VISTA ALEGRE'),
(2306, '731777', 'CUSCO', 'CHUMBIVILCAS', 'QUIÑOTA'),
(2307, '732778', 'CUSCO', 'CHUMBIVILCAS', 'VELILLE'),
(2308, '733781', 'CUSCO', 'ESPINAR', 'ESPINAR'),
(2309, '734782', 'CUSCO', 'ESPINAR', 'CONDOROMA'),
(2310, '735783', 'CUSCO', 'ESPINAR', 'COPORAQUE'),
(2311, '736784', 'CUSCO', 'ESPINAR', 'OCORURO'),
(2312, '737785', 'CUSCO', 'ESPINAR', 'PALLPATA'),
(2313, '738786', 'CUSCO', 'ESPINAR', 'PICHIGUA'),
(2314, '739787', 'CUSCO', 'ESPINAR', 'SUYKUTAMBO'),
(2315, '740788', 'CUSCO', 'ESPINAR', 'ALTO PICHIGUA'),
(2316, '741791', 'CUSCO', 'LA CONVENCION', 'SANTA ANA'),
(2317, '742792', 'CUSCO', 'LA CONVENCION', 'ECHARATE'),
(2318, '743793', 'CUSCO', 'LA CONVENCION', 'HUAYOPATA'),
(2319, '744794', 'CUSCO', 'LA CONVENCION', 'MARANURA'),
(2320, '745795', 'CUSCO', 'LA CONVENCION', 'OCOBAMBA'),
(2321, '746796', 'CUSCO', 'LA CONVENCION', 'SANTA TERESA'),
(2322, '747797', 'CUSCO', 'LA CONVENCION', 'VILCABAMBA'),
(2323, '748798', 'CUSCO', 'LA CONVENCION', 'QUELLOUNO'),
(2324, '749799', 'CUSCO', 'LA CONVENCION', 'KIMBIRI'),
(2325, '785811', 'HUANCAVELICA', 'HUANCAVELICA', 'HUANCAVELICA'),
(2326, '786812', 'HUANCAVELICA', 'HUANCAVELICA', 'ACOBAMBILLA'),
(2327, '787813', 'HUANCAVELICA', 'HUANCAVELICA', 'ACORIA'),
(2328, '788814', 'HUANCAVELICA', 'HUANCAVELICA', 'CONAYCA'),
(2329, '789815', 'HUANCAVELICA', 'HUANCAVELICA', 'CUENCA'),
(2330, '790816', 'HUANCAVELICA', 'HUANCAVELICA', 'HUACHOCOLPA'),
(2331, '791818', 'HUANCAVELICA', 'HUANCAVELICA', 'HUAYLLAHUARA'),
(2332, '792819', 'HUANCAVELICA', 'HUANCAVELICA', 'IZCUCHACA'),
(2333, '804821', 'HUANCAVELICA', 'ACOBAMBA', 'ACOBAMBA'),
(2334, '805822', 'HUANCAVELICA', 'ACOBAMBA', 'ANTA'),
(2335, '806823', 'HUANCAVELICA', 'ACOBAMBA', 'ANDABAMBA'),
(2336, '807824', 'HUANCAVELICA', 'ACOBAMBA', 'CAJA'),
(2337, '808825', 'HUANCAVELICA', 'ACOBAMBA', 'MARCAS'),
(2338, '809826', 'HUANCAVELICA', 'ACOBAMBA', 'PAUCARA'),
(2339, '810827', 'HUANCAVELICA', 'ACOBAMBA', 'POMACOCHA'),
(2340, '811828', 'HUANCAVELICA', 'ACOBAMBA', 'ROSARIO'),
(2341, '812831', 'HUANCAVELICA', 'ANGARAES', 'LIRCAY'),
(2342, '813832', 'HUANCAVELICA', 'ANGARAES', 'ANCHONGA'),
(2343, '814833', 'HUANCAVELICA', 'ANGARAES', 'CALLANMARCA'),
(2344, '815834', 'HUANCAVELICA', 'ANGARAES', 'CONGALLA'),
(2345, '816835', 'HUANCAVELICA', 'ANGARAES', 'CHINCHO'),
(2346, '817836', 'HUANCAVELICA', 'ANGARAES', 'HUAYLLAY GRANDE'),
(2347, '818837', 'HUANCAVELICA', 'ANGARAES', 'HUANCA HUANCA'),
(2348, '819838', 'HUANCAVELICA', 'ANGARAES', 'JULCAMARCA'),
(2349, '820839', 'HUANCAVELICA', 'ANGARAES', 'SAN ANTONIO DE ANTAPARCO'),
(2350, '824841', 'HUANCAVELICA', 'CASTROVIRREYNA', 'CASTROVIRREYNA'),
(2351, '825842', 'HUANCAVELICA', 'CASTROVIRREYNA', 'ARMA'),
(2352, '826843', 'HUANCAVELICA', 'CASTROVIRREYNA', 'AURAHUA'),
(2353, '827845', 'HUANCAVELICA', 'CASTROVIRREYNA', 'CAPILLAS'),
(2354, '828846', 'HUANCAVELICA', 'CASTROVIRREYNA', 'COCAS'),
(2355, '829848', 'HUANCAVELICA', 'CASTROVIRREYNA', 'CHUPAMARCA'),
(2356, '830849', 'HUANCAVELICA', 'CASTROVIRREYNA', 'HUACHOS'),
(2357, '837851', 'HUANCAVELICA', 'TAYACAJA', 'PAMPAS'),
(2358, '838852', 'HUANCAVELICA', 'TAYACAJA', 'ACOSTAMBO'),
(2359, '839853', 'HUANCAVELICA', 'TAYACAJA', 'ACRAQUIA'),
(2360, '840854', 'HUANCAVELICA', 'TAYACAJA', 'AHUAYCHA'),
(2361, '841856', 'HUANCAVELICA', 'TAYACAJA', 'COLCABAMBA'),
(2362, '842859', 'HUANCAVELICA', 'TAYACAJA', 'DANIEL HERNANDEZ'),
(2363, '853861', 'HUANCAVELICA', 'HUAYTARA', 'AYAVI'),
(2364, '854862', 'HUANCAVELICA', 'HUAYTARA', 'CORDOVA'),
(2365, '855863', 'HUANCAVELICA', 'HUAYTARA', 'HUAYACUNDO ARMA'),
(2366, '856864', 'HUANCAVELICA', 'HUAYTARA', 'HUAYTARA'),
(2367, '857865', 'HUANCAVELICA', 'HUAYTARA', 'LARAMARCA'),
(2368, '858866', 'HUANCAVELICA', 'HUAYTARA', 'OCOYO'),
(2369, '859867', 'HUANCAVELICA', 'HUAYTARA', 'PILPICHACA'),
(2370, '860868', 'HUANCAVELICA', 'HUAYTARA', 'QUERCO'),
(2371, '861869', 'HUANCAVELICA', 'HUAYTARA', 'QUITO ARMA'),
(2372, '869871', 'HUANCAVELICA', 'CHURCAMPA', 'CHURCAMPA'),
(2373, '870872', 'HUANCAVELICA', 'CHURCAMPA', 'ANCO'),
(2374, '871873', 'HUANCAVELICA', 'CHURCAMPA', 'CHINCHIHUASI'),
(2375, '872874', 'HUANCAVELICA', 'CHURCAMPA', 'EL CARMEN'),
(2376, '873875', 'HUANCAVELICA', 'CHURCAMPA', 'LA MERCED'),
(2377, '874876', 'HUANCAVELICA', 'CHURCAMPA', 'LOCROJA'),
(2378, '875877', 'HUANCAVELICA', 'CHURCAMPA', 'PAUCARBAMBA'),
(2379, '876878', 'HUANCAVELICA', 'CHURCAMPA', 'SAN MIGUEL DE MAYOC'),
(2380, '877879', 'HUANCAVELICA', 'CHURCAMPA', 'SAN PEDRO DE CORIS'),
(2381, '879911', 'HUANUCO', 'HUANUCO', 'HUANUCO'),
(2382, '880912', 'HUANUCO', 'HUANUCO', 'CHINCHAO'),
(2383, '881913', 'HUANUCO', 'HUANUCO', 'CHURUBAMBA'),
(2384, '882914', 'HUANUCO', 'HUANUCO', 'MARGOS'),
(2385, '883915', 'HUANUCO', 'HUANUCO', 'QUISQUI'),
(2386, '884916', 'HUANUCO', 'HUANUCO', 'SAN FCO DE CAYRAN'),
(2387, '885917', 'HUANUCO', 'HUANUCO', 'SAN PEDRO DE CHAULAN'),
(2388, '886918', 'HUANUCO', 'HUANUCO', 'STA MARIA DEL VALLE'),
(2389, '887919', 'HUANUCO', 'HUANUCO', 'YARUMAYO'),
(2390, '890921', 'HUANUCO', 'AMBO', 'AMBO'),
(2391, '891922', 'HUANUCO', 'AMBO', 'CAYNA'),
(2392, '892923', 'HUANUCO', 'AMBO', 'COLPAS'),
(2393, '893924', 'HUANUCO', 'AMBO', 'CONCHAMARCA'),
(2394, '894925', 'HUANUCO', 'AMBO', 'HUACAR'),
(2395, '895926', 'HUANUCO', 'AMBO', 'SAN FRANCISCO'),
(2396, '896927', 'HUANUCO', 'AMBO', 'SAN RAFAEL'),
(2397, '897928', 'HUANUCO', 'AMBO', 'TOMAY KICHWA'),
(2398, '898931', 'HUANUCO', 'DOS DE MAYO', 'LA UNION'),
(2399, '899937', 'HUANUCO', 'DOS DE MAYO', 'CHUQUIS'),
(2400, '907941', 'HUANUCO', 'HUAMALIES', 'LLATA'),
(2401, '908942', 'HUANUCO', 'HUAMALIES', 'ARANCAY'),
(2402, '909943', 'HUANUCO', 'HUAMALIES', 'CHAVIN DE PARIARCA'),
(2403, '910944', 'HUANUCO', 'HUAMALIES', 'JACAS GRANDE'),
(2404, '911945', 'HUANUCO', 'HUAMALIES', 'JIRCAN'),
(2405, '912946', 'HUANUCO', 'HUAMALIES', 'MIRAFLORES'),
(2406, '913947', 'HUANUCO', 'HUAMALIES', 'MONZON'),
(2407, '914948', 'HUANUCO', 'HUAMALIES', 'PUNCHAO'),
(2408, '915949', 'HUANUCO', 'HUAMALIES', 'PUÑOS'),
(2409, '918951', 'HUANUCO', 'MARAÑON', 'HUACRACHUCO'),
(2410, '919952', 'HUANUCO', 'MARAÑON', 'CHOLON'),
(2411, '920955', 'HUANUCO', 'MARAÑON', 'SAN BUENAVENTURA'),
(2412, '921961', 'HUANUCO', 'LEONCIO PRADO', 'RUPA RUPA'),
(2413, '922962', 'HUANUCO', 'LEONCIO PRADO', 'DANIEL ALOMIA ROBLES'),
(2414, '923963', 'HUANUCO', 'LEONCIO PRADO', 'HERMILIO VALDIZAN'),
(2415, '924964', 'HUANUCO', 'LEONCIO PRADO', 'LUYANDO'),
(2416, '925965', 'HUANUCO', 'LEONCIO PRADO', 'MARIANO DAMASO BERAUN'),
(2417, '926966', 'HUANUCO', 'LEONCIO PRADO', 'JOSE CRESPO Y CASTILLO'),
(2418, '927971', 'HUANUCO', 'PACHITEA', 'PANAO'),
(2419, '928972', 'HUANUCO', 'PACHITEA', 'CHAGLLA'),
(2420, '929974', 'HUANUCO', 'PACHITEA', 'MOLINO'),
(2421, '930976', 'HUANUCO', 'PACHITEA', 'UMARI'),
(2422, '931981', 'HUANUCO', 'PUERTO INCA', 'HONORIA'),
(2423, '932110', 'ANCASH', 'HUARAZ', 'PARIACOTO'),
(2424, '932982', 'HUANUCO', 'PUERTO INCA', 'PUERTO INCA'),
(2425, '933983', 'HUANUCO', 'PUERTO INCA', 'CODO DEL POZUZO'),
(2426, '934984', 'HUANUCO', 'PUERTO INCA', 'TOURNAVISTA'),
(2427, '935985', 'HUANUCO', 'PUERTO INCA', 'YUYAPICHIS'),
(2428, '936991', 'HUANUCO', 'HUACAYBAMBA', 'HUACAYBAMBA'),
(2429, '937992', 'HUANUCO', 'HUACAYBAMBA', 'PINRA'),
(2430, '938993', 'HUANUCO', 'HUACAYBAMBA', 'CANCHABAMBA'),
(2431, '939994', 'HUANUCO', 'HUACAYBAMBA', 'COCHABAMBA'),
(2432, '942111', 'ANCASH', 'HUARAZ', 'PIRA'),
(2433, '952112', 'ANCASH', 'HUARAZ', 'TARICA'),
(2434, '1052310', 'ANCASH', 'BOLOGNESI', 'HUAYLLACAYAN'),
(2435, '1062311', 'ANCASH', 'BOLOGNESI', 'HUASTA'),
(2436, '1072313', 'ANCASH', 'BOLOGNESI', 'MANGAS'),
(2437, '1082315', 'ANCASH', 'BOLOGNESI', 'PACLLON'),
(2438, '1092317', 'ANCASH', 'BOLOGNESI', 'SAN MIGUEL DE CORPANQUI'),
(2439, '1102320', 'ANCASH', 'BOLOGNESI', 'TICLLOS'),
(2440, '1112321', 'ANCASH', 'BOLOGNESI', 'ANTONIO RAIMONDI'),
(2441, '1122322', 'ANCASH', 'BOLOGNESI', 'CANIS'),
(2442, '1132323', 'ANCASH', 'BOLOGNESI', 'COLQUIOC'),
(2443, '1142324', 'ANCASH', 'BOLOGNESI', 'LA PRIMAVERA'),
(2444, '1152325', 'ANCASH', 'BOLOGNESI', 'HUALLANCA'),
(2445, '1252410', 'ANCASH', 'CARHUAZ', 'TINCO'),
(2446, '1262411', 'ANCASH', 'CARHUAZ', 'YUNGAR'),
(2447, '1472710', 'ANCASH', 'HUAYLAS', 'SANTO TORIBIO'),
(2448, '1572810', 'ANCASH', 'HUARI', 'PONTO'),
(2449, '1582811', 'ANCASH', 'HUARI', 'RAHUAPAMPA'),
(2450, '1592812', 'ANCASH', 'HUARI', 'RAPAYAN'),
(2451, '1602813', 'ANCASH', 'HUARI', 'SAN MARCOS'),
(2452, '1612814', 'ANCASH', 'HUARI', 'SAN PEDRO DE CHANA'),
(2453, '1622815', 'ANCASH', 'HUARI', 'UCO'),
(2454, '1632816', 'ANCASH', 'HUARI', 'ANRA'),
(2455, '1722101', 'ANCASH', 'PALLASCA', 'CABANA'),
(2456, '1732102', 'ANCASH', 'PALLASCA', 'BOLOGNESI'),
(2457, '1742103', 'ANCASH', 'PALLASCA', 'CONCHUCOS'),
(2458, '1752104', 'ANCASH', 'PALLASCA', 'HUACASCHUQUE'),
(2459, '1762105', 'ANCASH', 'PALLASCA', 'HUANDOVAL'),
(2460, '1772106', 'ANCASH', 'PALLASCA', 'LACABAMBA'),
(2461, '1782107', 'ANCASH', 'PALLASCA', 'LLAPO'),
(2462, '1792108', 'ANCASH', 'PALLASCA', 'PALLASCA'),
(2463, '1802109', 'ANCASH', 'PALLASCA', 'PAMPAS'),
(2464, '1832111', 'ANCASH', 'POMABAMBA', 'POMABAMBA'),
(2465, '1834125', 'AMAZONAS', 'BAGUA', 'BAGUA'),
(2466, '1842112', 'ANCASH', 'POMABAMBA', 'HUAYLLAN'),
(2467, '1852113', 'ANCASH', 'POMABAMBA', 'PAROBAMBA'),
(2468, '1862114', 'ANCASH', 'POMABAMBA', 'QUINUABAMBA'),
(2469, '1872121', 'ANCASH', 'RECUAY', 'RECUAY'),
(2470, '1882122', 'ANCASH', 'RECUAY', 'COTAPARACO'),
(2471, '1892123', 'ANCASH', 'RECUAY', 'HUAYLLAPAMPA'),
(2472, '1902124', 'ANCASH', 'RECUAY', 'MARCA'),
(2473, '1912125', 'ANCASH', 'RECUAY', 'PAMPAS CHICO'),
(2474, '1922126', 'ANCASH', 'RECUAY', 'PARARIN'),
(2475, '1932127', 'ANCASH', 'RECUAY', 'TAPACOCHA'),
(2476, '1942128', 'ANCASH', 'RECUAY', 'TICAPAMPA'),
(2477, '1952129', 'ANCASH', 'RECUAY', 'LLACLLIN'),
(2478, '1972131', 'ANCASH', 'SANTA', 'CHIMBOTE'),
(2479, '1982132', 'ANCASH', 'SANTA', 'CACERES DEL PERU'),
(2480, '1992133', 'ANCASH', 'SANTA', 'MACATE'),
(2481, '2002134', 'ANCASH', 'SANTA', 'MORO'),
(2482, '2012135', 'ANCASH', 'SANTA', 'NEPEÑA'),
(2483, '2022136', 'ANCASH', 'SANTA', 'SAMANCO'),
(2484, '2032137', 'ANCASH', 'SANTA', 'SANTA'),
(2485, '2042138', 'ANCASH', 'SANTA', 'COISHCO'),
(2486, '2052139', 'ANCASH', 'SANTA', 'NUEVO CHIMBOTE'),
(2487, '2062141', 'ANCASH', 'SIHUAS', 'SIHUAS'),
(2488, '2072142', 'ANCASH', 'SIHUAS', 'ALFONSO UGARTE'),
(2489, '2082143', 'ANCASH', 'SIHUAS', 'CHINGALPO'),
(2490, '2092144', 'ANCASH', 'SIHUAS', 'HUAYLLABAMBA'),
(2491, '2102145', 'ANCASH', 'SIHUAS', 'QUICHES'),
(2492, '2112146', 'ANCASH', 'SIHUAS', 'SICSIBAMBA'),
(2493, '2122147', 'ANCASH', 'SIHUAS', 'ACOBAMBA'),
(2494, '2132148', 'ANCASH', 'SIHUAS', 'CASHAPAMPA'),
(2495, '2142149', 'ANCASH', 'SIHUAS', 'RAGASH'),
(2496, '2162151', 'ANCASH', 'YUNGAY', 'YUNGAY'),
(2497, '2172152', 'ANCASH', 'YUNGAY', 'CASCAPARA'),
(2498, '2182153', 'ANCASH', 'YUNGAY', 'MANCOS'),
(2499, '2192154', 'ANCASH', 'YUNGAY', 'MATACOTO'),
(2500, '2202155', 'ANCASH', 'YUNGAY', 'QUILLO'),
(2501, '2212156', 'ANCASH', 'YUNGAY', 'RANRAHIRCA'),
(2502, '2222157', 'ANCASH', 'YUNGAY', 'SHUPLUY'),
(2503, '2232158', 'ANCASH', 'YUNGAY', 'YANAMA'),
(2504, '2242161', 'ANCASH', 'ANTONIO RAIMONDI', 'LLAMELLIN'),
(2505, '2252162', 'ANCASH', 'ANTONIO RAIMONDI', 'ACZO'),
(2506, '2262163', 'ANCASH', 'ANTONIO RAIMONDI', 'CHACCHO'),
(2507, '2272164', 'ANCASH', 'ANTONIO RAIMONDI', 'CHINGAS'),
(2508, '2282165', 'ANCASH', 'ANTONIO RAIMONDI', 'MIRGAS'),
(2509, '2292166', 'ANCASH', 'ANTONIO RAIMONDI', 'SAN JUAN DE RONTOY'),
(2510, '2302171', 'ANCASH', 'CARLOS FERMIN FITZCARRALD', 'SAN LUIS'),
(2511, '2312172', 'ANCASH', 'CARLOS FERMIN FITZCARRALD', 'YAUYA'),
(2512, '2322173', 'ANCASH', 'CARLOS FERMIN FITZCARRALD', 'SAN NICOLAS'),
(2513, '2332181', 'ANCASH', 'ASUNCION', 'CHACAS'),
(2514, '2342182', 'ANCASH', 'ASUNCION', 'ACOCHACA'),
(2515, '2352191', 'ANCASH', 'HUARMEY', 'HUARMEY'),
(2516, '2362192', 'ANCASH', 'HUARMEY', 'COCHAPETI'),
(2517, '2372193', 'ANCASH', 'HUARMEY', 'HUAYAN'),
(2518, '2382194', 'ANCASH', 'HUARMEY', 'MALVAS'),
(2519, '2392195', 'ANCASH', 'HUARMEY', 'CULEBRAS'),
(2520, '2402201', 'ANCASH', 'OCROS', 'ACAS'),
(2521, '2412202', 'ANCASH', 'OCROS', 'CAJAMARQUILLA'),
(2522, '2422203', 'ANCASH', 'OCROS', 'CARHUAPAMPA'),
(2523, '2432204', 'ANCASH', 'OCROS', 'COCHAS'),
(2524, '2442205', 'ANCASH', 'OCROS', 'CONGAS'),
(2525, '2452206', 'ANCASH', 'OCROS', 'LLIPA'),
(2526, '2462207', 'ANCASH', 'OCROS', 'OCROS'),
(2527, '2472208', 'ANCASH', 'OCROS', 'SAN CRISTOBAL DE RAJAN'),
(2528, '2482209', 'ANCASH', 'OCROS', 'SAN PEDRO'),
(2529, '2683210', 'APURIMAC', 'AYMARAES', 'SAÑAICA'),
(2530, '2693211', 'APURIMAC', 'AYMARAES', 'SORAYA'),
(2531, '2703212', 'APURIMAC', 'AYMARAES', 'TAPAIRIHUA'),
(2532, '2713213', 'APURIMAC', 'AYMARAES', 'TINTAY'),
(2533, '2723214', 'APURIMAC', 'AYMARAES', 'TORAYA'),
(2534, '2733215', 'APURIMAC', 'AYMARAES', 'YANACA'),
(2535, '2743216', 'APURIMAC', 'AYMARAES', 'SAN JUAN DE CHACÑA'),
(2536, '2753217', 'APURIMAC', 'AYMARAES', 'JUSTO APU SAHUARAURA'),
(2537, '2853310', 'APURIMAC', 'ANDAHUAYLAS', 'SAN JERONIMO'),
(2538, '2863311', 'APURIMAC', 'ANDAHUAYLAS', 'TALAVERA'),
(2539, '2873312', 'APURIMAC', 'ANDAHUAYLAS', 'TURPO'),
(2540, '2883313', 'APURIMAC', 'ANDAHUAYLAS', 'PACUCHA'),
(2541, '2893314', 'APURIMAC', 'ANDAHUAYLAS', 'POMACOCHA'),
(2542, '2903315', 'APURIMAC', 'ANDAHUAYLAS', 'STA MARIA DE CHICMO'),
(2543, '2913316', 'APURIMAC', 'ANDAHUAYLAS', 'TUMAY HUARACA'),
(2544, '2923317', 'APURIMAC', 'ANDAHUAYLAS', 'HUAYANA'),
(2545, '2933318', 'APURIMAC', 'ANDAHUAYLAS', 'SAN MIGUEL DE CHACCRAMPA'),
(2546, '2943319', 'APURIMAC', 'ANDAHUAYLAS', 'KAQUIABAMBA'),
(2547, '3173610', 'APURIMAC', 'GRAU', 'TURPAY'),
(2548, '3183611', 'APURIMAC', 'GRAU', 'VILCABAMBA'),
(2549, '3193612', 'APURIMAC', 'GRAU', 'VIRUNDO'),
(2550, '3203613', 'APURIMAC', 'GRAU', 'SANTA ROSA'),
(2551, '3213614', 'APURIMAC', 'GRAU', 'CURASCO'),
(2552, '3394110', 'AREQUIPA', 'AREQUIPA', 'POCSI'),
(2553, '3404111', 'AREQUIPA', 'AREQUIPA', 'POLOBAYA'),
(2554, '3414112', 'AREQUIPA', 'AREQUIPA', 'QUEQUEÑA'),
(2555, '3424113', 'AREQUIPA', 'AREQUIPA', 'SABANDIA'),
(2556, '3434114', 'AREQUIPA', 'AREQUIPA', 'SACHACA'),
(2557, '3444115', 'AREQUIPA', 'AREQUIPA', 'SAN JUAN DE SIGUAS'),
(2558, '3454116', 'AREQUIPA', 'AREQUIPA', 'SAN JUAN DE TARUCANI'),
(2559, '3464117', 'AREQUIPA', 'AREQUIPA', 'SANTA ISABEL DE SIGUAS'),
(2560, '3474118', 'AREQUIPA', 'AREQUIPA', 'STA RITA DE SIGUAS'),
(2561, '3484119', 'AREQUIPA', 'AREQUIPA', 'SOCABAYA'),
(2562, '3494120', 'AREQUIPA', 'AREQUIPA', 'TIABAYA'),
(2563, '3504121', 'AREQUIPA', 'AREQUIPA', 'UCHUMAYO'),
(2564, '3514122', 'AREQUIPA', 'AREQUIPA', 'VITOR'),
(2565, '3524123', 'AREQUIPA', 'AREQUIPA', 'YANAHUARA'),
(2566, '3534124', 'AREQUIPA', 'AREQUIPA', 'YARABAMBA'),
(2567, '3544125', 'AREQUIPA', 'AREQUIPA', 'YURA'),
(2568, '3554126', 'AREQUIPA', 'AREQUIPA', 'MARIANO MELGAR'),
(2569, '3564127', 'AREQUIPA', 'AREQUIPA', 'JACOBO HUNTER'),
(2570, '3574128', 'AREQUIPA', 'AREQUIPA', 'ALTO SELVA ALEGRE'),
(2571, '3584129', 'AREQUIPA', 'AREQUIPA', 'JOSE LUIS BUSTAMANTE Y RIVERO'),
(2572, '3684210', 'AREQUIPA', 'CAYLLOMA', 'LARI'),
(2573, '3694211', 'AREQUIPA', 'CAYLLOMA', 'LLUTA'),
(2574, '3704212', 'AREQUIPA', 'CAYLLOMA', 'MACA'),
(2575, '3714213', 'AREQUIPA', 'CAYLLOMA', 'MADRIGAL'),
(2576, '3724214', 'AREQUIPA', 'CAYLLOMA', 'SAN ANTONIO DE CHUCA'),
(2577, '3734215', 'AREQUIPA', 'CAYLLOMA', 'SIBAYO'),
(2578, '3744216', 'AREQUIPA', 'CAYLLOMA', 'TAPAY'),
(2579, '3754217', 'AREQUIPA', 'CAYLLOMA', 'TISCO'),
(2580, '3764218', 'AREQUIPA', 'CAYLLOMA', 'TUTI'),
(2581, '3774219', 'AREQUIPA', 'CAYLLOMA', 'YANQUE'),
(2582, '3784220', 'AREQUIPA', 'CAYLLOMA', 'MAJES'),
(2583, '3964410', 'AREQUIPA', 'CARAVELI', 'JAQUI'),
(2584, '3974411', 'AREQUIPA', 'CARAVELI', 'LOMAS'),
(2585, '3984412', 'AREQUIPA', 'CARAVELI', 'QUICACHA'),
(2586, '3994413', 'AREQUIPA', 'CARAVELI', 'YAUCA'),
(2587, '4094510', 'AREQUIPA', 'CASTILLA', 'PAMPACOLCA'),
(2588, '4104511', 'AREQUIPA', 'CASTILLA', 'TIPAN'),
(2589, '4114512', 'AREQUIPA', 'CASTILLA', 'URACA'),
(2590, '4124513', 'AREQUIPA', 'CASTILLA', 'UÑON'),
(2591, '4134514', 'AREQUIPA', 'CASTILLA', 'VIRACO'),
(2592, '4374810', 'AREQUIPA', 'LA UNION', 'TOMEPAMPA'),
(2593, '4384811', 'AREQUIPA', 'LA UNION', 'TORO'),
(2594, '4485110', 'AYACUCHO', 'HUAMANGA', 'TAMBILLO'),
(2595, '4495111', 'AYACUCHO', 'HUAMANGA', 'ACOCRO'),
(2596, '4505112', 'AYACUCHO', 'HUAMANGA', 'SOCOS'),
(2597, '4515113', 'AYACUCHO', 'HUAMANGA', 'OCROS'),
(2598, '4525114', 'AYACUCHO', 'HUAMANGA', 'PACAYCASA'),
(2599, '4535115', 'AYACUCHO', 'HUAMANGA', 'JESUS NAZARENO'),
(2600, '4595211', 'AYACUCHO', 'CANGALLO', 'MARIA PARADO DE BELLIDO'),
(2601, '4825510', 'AYACUCHO', 'LUCANAS', 'HUAC-HUAS'),
(2602, '4835511', 'AYACUCHO', 'LUCANAS', 'LARAMATE'),
(2603, '4845512', 'AYACUCHO', 'LUCANAS', 'LEONCIO PRADO'),
(2604, '4855513', 'AYACUCHO', 'LUCANAS', 'LUCANAS'),
(2605, '4865514', 'AYACUCHO', 'LUCANAS', 'LLAUTA'),
(2606, '4875516', 'AYACUCHO', 'LUCANAS', 'OCAÑA'),
(2607, '4885517', 'AYACUCHO', 'LUCANAS', 'OTOCA'),
(2608, '4895520', 'AYACUCHO', 'LUCANAS', 'SANCOS'),
(2609, '4905521', 'AYACUCHO', 'LUCANAS', 'SAN JUAN'),
(2610, '4915522', 'AYACUCHO', 'LUCANAS', 'SAN PEDRO'),
(2611, '4925524', 'AYACUCHO', 'LUCANAS', 'STA ANA DE HUAYCAHUACHO'),
(2612, '4935525', 'AYACUCHO', 'LUCANAS', 'SANTA LUCIA'),
(2613, '4945529', 'AYACUCHO', 'LUCANAS', 'SAISA'),
(2614, '4955531', 'AYACUCHO', 'LUCANAS', 'SAN PEDRO DE PALCO'),
(2615, '4965532', 'AYACUCHO', 'LUCANAS', 'SAN CRISTOBAL'),
(2616, '5015611', 'AYACUCHO', 'PARINACOCHAS', 'PULLO'),
(2617, '5025612', 'AYACUCHO', 'PARINACOCHAS', 'PUYUSCA'),
(2618, '5035615', 'AYACUCHO', 'PARINACOCHAS', 'SAN FCO DE RAVACAYCO'),
(2619, '5045616', 'AYACUCHO', 'PARINACOCHAS', 'UPAHUACHO'),
(2620, '5135710', 'AYACUCHO', 'VICTOR FAJARDO', 'HUANCARAYLLA'),
(2621, '5145713', 'AYACUCHO', 'VICTOR FAJARDO', 'SARHUA'),
(2622, '5155714', 'AYACUCHO', 'VICTOR FAJARDO', 'VILCANCHOS'),
(2623, '5165715', 'AYACUCHO', 'VICTOR FAJARDO', 'ASQUIPATA'),
(2624, '5295101', 'AYACUCHO', 'PAUCAR DEL SARA SARA', 'PAUSA'),
(2625, '5305102', 'AYACUCHO', 'PAUCAR DEL SARA SARA', 'COLTA'),
(2626, '5315103', 'AYACUCHO', 'PAUCAR DEL SARA SARA', 'CORCULLA'),
(2627, '5325104', 'AYACUCHO', 'PAUCAR DEL SARA SARA', 'LAMPA'),
(2628, '5335105', 'AYACUCHO', 'PAUCAR DEL SARA SARA', 'MARCABAMBA'),
(2629, '5345106', 'AYACUCHO', 'PAUCAR DEL SARA SARA', 'OYOLO'),
(2630, '5355107', 'AYACUCHO', 'PAUCAR DEL SARA SARA', 'PARARCA'),
(2631, '5365108', 'AYACUCHO', 'PAUCAR DEL SARA SARA', 'SAN JAVIER DE ALPABAMBA'),
(2632, '5375109', 'AYACUCHO', 'PAUCAR DEL SARA SARA', 'SAN JOSE DE USHUA'),
(2633, '5395111', 'AYACUCHO', 'SUCRE', 'QUEROBAMBA'),
(2634, '5405112', 'AYACUCHO', 'SUCRE', 'BELEN'),
(2635, '5415113', 'AYACUCHO', 'SUCRE', 'CHALCOS'),
(2636, '5425114', 'AYACUCHO', 'SUCRE', 'SAN SALVADOR DE QUIJE'),
(2637, '5435115', 'AYACUCHO', 'SUCRE', 'PAICO'),
(2638, '5445116', 'AYACUCHO', 'SUCRE', 'SANTIAGO DE PAUCARAY'),
(2639, '5455117', 'AYACUCHO', 'SUCRE', 'SAN PEDRO DE LARCAY'),
(2640, '5465118', 'AYACUCHO', 'SUCRE', 'SORAS'),
(2641, '5475119', 'AYACUCHO', 'SUCRE', 'HUACAÑA'),
(2642, '5596110', 'CAJAMARCA', 'CAJAMARCA', 'MATARA'),
(2643, '5606111', 'CAJAMARCA', 'CAJAMARCA', 'NAMORA'),
(2644, '5616112', 'CAJAMARCA', 'CAJAMARCA', 'SAN JUAN'),
(2645, '5756310', 'CAJAMARCA', 'CELENDIN', 'SUCRE'),
(2646, '5766311', 'CAJAMARCA', 'CELENDIN', 'UTCO'),
(2647, '5776312', 'CAJAMARCA', 'CELENDIN', 'LA LIBERTAD DE PALLAN'),
(2648, '5956510', 'CAJAMARCA', 'CUTERVO', 'SAN LUIS DE LUCMA'),
(2649, '5966511', 'CAJAMARCA', 'CUTERVO', 'SANTA CRUZ'),
(2650, '5976512', 'CAJAMARCA', 'CUTERVO', 'SANTO DOMINGO DE LA CAPILLA'),
(2651, '5986513', 'CAJAMARCA', 'CUTERVO', 'SANTO TOMAS'),
(2652, '5996514', 'CAJAMARCA', 'CUTERVO', 'SOCOTA'),
(2653, '6006515', 'CAJAMARCA', 'CUTERVO', 'TORIBIO CASANOVA'),
(2654, '6106610', 'CAJAMARCA', 'CHOTA', 'LLAMA'),
(2655, '6116611', 'CAJAMARCA', 'CHOTA', 'MIRACOSTA'),
(2656, '6126612', 'CAJAMARCA', 'CHOTA', 'PACCHA'),
(2657, '6136613', 'CAJAMARCA', 'CHOTA', 'PION'),
(2658, '6146614', 'CAJAMARCA', 'CHOTA', 'QUEROCOTO'),
(2659, '6156615', 'CAJAMARCA', 'CHOTA', 'TACABAMBA'),
(2660, '6166616', 'CAJAMARCA', 'CHOTA', 'TOCMOCHE'),
(2661, '6176617', 'CAJAMARCA', 'CHOTA', 'SAN JUAN DE LICUPIS'),
(2662, '6186618', 'CAJAMARCA', 'CHOTA', 'CHOROPAMPA'),
(2663, '6196619', 'CAJAMARCA', 'CHOTA', 'CHALAMARCA'),
(2664, '6326810', 'CAJAMARCA', 'JAEN', 'SANTA ROSA'),
(2665, '6336811', 'CAJAMARCA', 'JAEN', 'LAS PIRIAS'),
(2666, '6346812', 'CAJAMARCA', 'JAEN', 'HUABAL'),
(2667, '6446910', 'CAJAMARCA', 'SANTA CRUZ', 'ANDABAMBA'),
(2668, '6456911', 'CAJAMARCA', 'SANTA CRUZ', 'SAUCEPAMPA'),
(2669, '6466101', 'CAJAMARCA', 'SAN MIGUEL', 'SAN MIGUEL'),
(2670, '6476102', 'CAJAMARCA', 'SAN MIGUEL', 'CALQUIS'),
(2671, '6486103', 'CAJAMARCA', 'SAN MIGUEL', 'LA FLORIDA'),
(2672, '6496104', 'CAJAMARCA', 'SAN MIGUEL', 'LLAPA'),
(2673, '6506105', 'CAJAMARCA', 'SAN MIGUEL', 'NANCHOC'),
(2674, '6516106', 'CAJAMARCA', 'SAN MIGUEL', 'NIEPOS'),
(2675, '6526107', 'CAJAMARCA', 'SAN MIGUEL', 'SAN GREGORIO'),
(2676, '6536108', 'CAJAMARCA', 'SAN MIGUEL', 'SAN SILVESTRE DE COCHAN'),
(2677, '6546109', 'CAJAMARCA', 'SAN MIGUEL', 'EL PRADO'),
(2678, '6596111', 'CAJAMARCA', 'SAN IGNACIO', 'SAN IGNACIO'),
(2679, '6606112', 'CAJAMARCA', 'SAN IGNACIO', 'CHIRINOS'),
(2680, '6616113', 'CAJAMARCA', 'SAN IGNACIO', 'HUARANGO'),
(2681, '6626114', 'CAJAMARCA', 'SAN IGNACIO', 'NAMBALLE'),
(2682, '6636115', 'CAJAMARCA', 'SAN IGNACIO', 'LA COIPA'),
(2683, '6646116', 'CAJAMARCA', 'SAN IGNACIO', 'SAN JOSE DE LOURDES'),
(2684, '6656117', 'CAJAMARCA', 'SAN IGNACIO', 'TABACONAS'),
(2685, '6666121', 'CAJAMARCA', 'SAN MARCOS', 'PEDRO GALVEZ'),
(2686, '6676122', 'CAJAMARCA', 'SAN MARCOS', 'ICHOCAN'),
(2687, '6686123', 'CAJAMARCA', 'SAN MARCOS', 'GREGORIO PITA'),
(2688, '6696124', 'CAJAMARCA', 'SAN MARCOS', 'JOSE MANUEL QUIROZ'),
(2689, '6706125', 'CAJAMARCA', 'SAN MARCOS', 'EDUARDO VILLANUEVA'),
(2690, '6716126', 'CAJAMARCA', 'SAN MARCOS', 'JOSE SABOGAL'),
(2691, '6726127', 'CAJAMARCA', 'SAN MARCOS', 'CHANCAY'),
(2692, '6736131', 'CAJAMARCA', 'SAN PABLO', 'SAN PABLO'),
(2693, '6746132', 'CAJAMARCA', 'SAN PABLO', 'SAN BERNARDINO'),
(2694, '6756133', 'CAJAMARCA', 'SAN PABLO', 'SAN LUIS'),
(2695, '6766134', 'CAJAMARCA', 'SAN PABLO', 'TUMBADEN'),
(2696, '7507910', 'CUSCO', 'LA CONVENCION', 'PICHARI'),
(2697, '7517101', 'CUSCO', 'PARURO', 'PARURO'),
(2698, '7527102', 'CUSCO', 'PARURO', 'ACCHA'),
(2699, '7537103', 'CUSCO', 'PARURO', 'CCAPI'),
(2700, '7547104', 'CUSCO', 'PARURO', 'COLCHA'),
(2701, '7557105', 'CUSCO', 'PARURO', 'HUANOQUITE'),
(2702, '7567106', 'CUSCO', 'PARURO', 'OMACHA'),
(2703, '7577107', 'CUSCO', 'PARURO', 'YAURISQUE'),
(2704, '7587108', 'CUSCO', 'PARURO', 'PACCARITAMBO'),
(2705, '7597109', 'CUSCO', 'PARURO', 'PILLPINTO'),
(2706, '7607111', 'CUSCO', 'PAUCARTAMBO', 'PAUCARTAMBO'),
(2707, '7617112', 'CUSCO', 'PAUCARTAMBO', 'CAICAY'),
(2708, '7627113', 'CUSCO', 'PAUCARTAMBO', 'COLQUEPATA'),
(2709, '7637114', 'CUSCO', 'PAUCARTAMBO', 'CHALLABAMBA'),
(2710, '7647115', 'CUSCO', 'PAUCARTAMBO', 'COSÑIPATA'),
(2711, '7657116', 'CUSCO', 'PAUCARTAMBO', 'HUANCARANI'),
(2712, '7667121', 'CUSCO', 'QUISPICANCHI', 'URCOS'),
(2713, '7677122', 'CUSCO', 'QUISPICANCHI', 'ANDAHUAYLILLAS'),
(2714, '7687123', 'CUSCO', 'QUISPICANCHI', 'CAMANTI'),
(2715, '7697124', 'CUSCO', 'QUISPICANCHI', 'CCARHUAYO'),
(2716, '7707125', 'CUSCO', 'QUISPICANCHI', 'CCATCA'),
(2717, '7717126', 'CUSCO', 'QUISPICANCHI', 'CUSIPATA'),
(2718, '7727127', 'CUSCO', 'QUISPICANCHI', 'HUARO'),
(2719, '7737128', 'CUSCO', 'QUISPICANCHI', 'LUCRE'),
(2720, '7747129', 'CUSCO', 'QUISPICANCHI', 'MARCAPATA'),
(2721, '7787131', 'CUSCO', 'URUBAMBA', 'URUBAMBA'),
(2722, '7797132', 'CUSCO', 'URUBAMBA', 'CHINCHERO'),
(2723, '7807133', 'CUSCO', 'URUBAMBA', 'HUAYLLABAMBA'),
(2724, '7817134', 'CUSCO', 'URUBAMBA', 'MACHUPICCHU'),
(2725, '7827135', 'CUSCO', 'URUBAMBA', 'MARAS'),
(2726, '7837136', 'CUSCO', 'URUBAMBA', 'OLLANTAYTAMBO'),
(2727, '7847137', 'CUSCO', 'URUBAMBA', 'YUCAY'),
(2728, '7938110', 'HUANCAVELICA', 'HUANCAVELICA', 'LARIA'),
(2729, '7948111', 'HUANCAVELICA', 'HUANCAVELICA', 'MANTA'),
(2730, '7958112', 'HUANCAVELICA', 'HUANCAVELICA', 'MARISCAL CACERES'),
(2731, '7968113', 'HUANCAVELICA', 'HUANCAVELICA', 'MOYA'),
(2732, '7978114', 'HUANCAVELICA', 'HUANCAVELICA', 'NUEVO OCCORO'),
(2733, '7988115', 'HUANCAVELICA', 'HUANCAVELICA', 'PALCA'),
(2734, '7998116', 'HUANCAVELICA', 'HUANCAVELICA', 'PILCHACA'),
(2735, '8008117', 'HUANCAVELICA', 'HUANCAVELICA', 'VILCA'),
(2736, '8018118', 'HUANCAVELICA', 'HUANCAVELICA', 'YAULI'),
(2737, '8028119', 'HUANCAVELICA', 'HUANCAVELICA', 'ASCENSION'),
(2738, '8038120', 'HUANCAVELICA', 'HUANCAVELICA', 'HUANDO'),
(2739, '8218310', 'HUANCAVELICA', 'ANGARAES', 'STO TOMAS DE PATA'),
(2740, '8228311', 'HUANCAVELICA', 'ANGARAES', 'SECCLLA'),
(2741, '8238312', 'HUANCAVELICA', 'ANGARAES', 'CCOCHACCASA'),
(2742, '8318410', 'HUANCAVELICA', 'CASTROVIRREYNA', 'HUAMATAMBO'),
(2743, '8328414', 'HUANCAVELICA', 'CASTROVIRREYNA', 'MOLLEPAMPA'),
(2744, '8338422', 'HUANCAVELICA', 'CASTROVIRREYNA', 'SAN JUAN'),
(2745, '8348427', 'HUANCAVELICA', 'CASTROVIRREYNA', 'TANTARA'),
(2746, '8358428', 'HUANCAVELICA', 'CASTROVIRREYNA', 'TICRAPO'),
(2747, '8368429', 'HUANCAVELICA', 'CASTROVIRREYNA', 'SANTA ANA'),
(2748, '8438511', 'HUANCAVELICA', 'TAYACAJA', 'HUACHOCOLPA'),
(2749, '8448512', 'HUANCAVELICA', 'TAYACAJA', 'HUARIBAMBA'),
(2750, '8458515', 'HUANCAVELICA', 'TAYACAJA', 'ÑAHUIMPUQUIO'),
(2751, '8468517', 'HUANCAVELICA', 'TAYACAJA', 'PAZOS'),
(2752, '8478518', 'HUANCAVELICA', 'TAYACAJA', 'QUISHUAR'),
(2753, '8488519', 'HUANCAVELICA', 'TAYACAJA', 'SALCABAMBA'),
(2754, '8498520', 'HUANCAVELICA', 'TAYACAJA', 'SAN MARCOS DE ROCCHAC'),
(2755, '8508523', 'HUANCAVELICA', 'TAYACAJA', 'SURCUBAMBA'),
(2756, '8518525', 'HUANCAVELICA', 'TAYACAJA', 'TINTAY PUNCU'),
(2757, '8528526', 'HUANCAVELICA', 'TAYACAJA', 'SALCAHUASI'),
(2758, '8528527', 'HUANCAVELICA', 'TAYACAJA', 'QUICHUAS'),
(2759, '8628610', 'HUANCAVELICA', 'HUAYTARA', 'SAN ANTONIO DE CUSICANCHA'),
(2760, '8638611', 'HUANCAVELICA', 'HUAYTARA', 'SAN FRANCISCO DE SANGAYAICO'),
(2761, '8648612', 'HUANCAVELICA', 'HUAYTARA', 'SAN ISIDRO'),
(2762, '8658613', 'HUANCAVELICA', 'HUAYTARA', 'SANTIAGO DE CHOCORVOS'),
(2763, '8668614', 'HUANCAVELICA', 'HUAYTARA', 'SANTIAGO DE QUIRAHUARA'),
(2764, '8678615', 'HUANCAVELICA', 'HUAYTARA', 'SANTO DOMINGO DE CAPILLAS'),
(2765, '8688616', 'HUANCAVELICA', 'HUAYTARA', 'TAMBO'),
(2766, '8788710', 'HUANCAVELICA', 'CHURCAMPA', 'PACHAMARCA'),
(2767, '8889110', 'HUANUCO', 'HUANUCO', 'AMARILIS'),
(2768, '8899111', 'HUANUCO', 'HUANUCO', 'PILLCO MARCA'),
(2769, '9009312', 'HUANUCO', 'DOS DE MAYO', 'MARIAS'),
(2770, '9019314', 'HUANUCO', 'DOS DE MAYO', 'PACHAS'),
(2771, '9029316', 'HUANUCO', 'DOS DE MAYO', 'QUIVILLA'),
(2772, '9039317', 'HUANUCO', 'DOS DE MAYO', 'RIPAN'),
(2773, '9049321', 'HUANUCO', 'DOS DE MAYO', 'SHUNQUI'),
(2774, '9059322', 'HUANUCO', 'DOS DE MAYO', 'SILLAPATA'),
(2775, '9069323', 'HUANUCO', 'DOS DE MAYO', 'YANAS'),
(2776, '9169410', 'HUANUCO', 'HUAMALIES', 'SINGA'),
(2777, '9179411', 'HUANUCO', 'HUAMALIES', 'TANTAMAYO'),
(2778, '9409101', 'HUANUCO', 'LAURICOCHA', 'JESUS'),
(2779, '9419102', 'HUANUCO', 'LAURICOCHA', 'BAÑOS'),
(2780, '9429103', 'HUANUCO', 'LAURICOCHA', 'SAN FRANCISCO DE ASIS'),
(2781, '9439104', 'HUANUCO', 'LAURICOCHA', 'QUEROPALCA'),
(2782, '9449105', 'HUANUCO', 'LAURICOCHA', 'SAN MIGUEL DE CAURI'),
(2783, '9459106', 'HUANUCO', 'LAURICOCHA', 'RONDOS'),
(2784, '9469107', 'HUANUCO', 'LAURICOCHA', 'JIVIA'),
(2785, '9479111', 'HUANUCO', 'YAROWILCA', 'CHAVINILLO'),
(2786, '9489112', 'HUANUCO', 'YAROWILCA', 'APARICIO POMARES (CHUPAN);'),
(2787, '9499113', 'HUANUCO', 'YAROWILCA', 'CAHUAC'),
(2788, '9509114', 'HUANUCO', 'YAROWILCA', 'CHACABAMBA'),
(2789, '9519115', 'HUANUCO', 'YAROWILCA', 'JACAS CHICO'),
(2790, '9529116', 'HUANUCO', 'YAROWILCA', 'OBAS'),
(2791, '9539117', 'HUANUCO', 'YAROWILCA', 'PAMPAMARCA'),
(2792, '9549118', 'HUANUCO', 'YAROWILCA', 'CHORAS'),
(2793, '9551011', 'ICA', 'ICA', 'ICA'),
(2794, '9561012', 'ICA', 'ICA', 'LA TINGUIÑA'),
(2795, '9571013', 'ICA', 'ICA', 'LOS AQUIJES'),
(2796, '9581014', 'ICA', 'ICA', 'PARCONA'),
(2797, '9591015', 'ICA', 'ICA', 'PUEBLO NUEVO'),
(2798, '9601016', 'ICA', 'ICA', 'SALAS'),
(2799, '9611017', 'ICA', 'ICA', 'SAN JOSE DE LOS MOLINOS'),
(2800, '9621018', 'ICA', 'ICA', 'SAN JUAN BAUTISTA'),
(2801, '9631019', 'ICA', 'ICA', 'SANTIAGO'),
(2802, '9691021', 'ICA', 'CHINCHA', 'CHINCHA ALTA'),
(2803, '9701022', 'ICA', 'CHINCHA', 'CHAVIN'),
(2804, '9711023', 'ICA', 'CHINCHA', 'CHINCHA BAJA'),
(2805, '9721024', 'ICA', 'CHINCHA', 'EL CARMEN'),
(2806, '9731025', 'ICA', 'CHINCHA', 'GROCIO PRADO'),
(2807, '9741026', 'ICA', 'CHINCHA', 'SAN PEDRO DE HUACARPANA'),
(2808, '9751027', 'ICA', 'CHINCHA', 'SUNAMPE'),
(2809, '9761028', 'ICA', 'CHINCHA', 'TAMBO DE MORA'),
(2810, '9771029', 'ICA', 'CHINCHA', 'ALTO LARAN'),
(2811, '9801031', 'ICA', 'NAZCA', 'NAZCA'),
(2812, '9811032', 'ICA', 'NAZCA', 'CHANGUILLO'),
(2813, '9821033', 'ICA', 'NAZCA', 'EL INGENIO'),
(2814, '9831034', 'ICA', 'NAZCA', 'MARCONA'),
(2815, '9841035', 'ICA', 'NAZCA', 'VISTA ALEGRE'),
(2816, '9851041', 'ICA', 'PISCO', 'PISCO'),
(2817, '9861042', 'ICA', 'PISCO', 'HUANCANO'),
(2818, '9871043', 'ICA', 'PISCO', 'HUMAY'),
(2819, '9881044', 'ICA', 'PISCO', 'INDEPENDENCIA'),
(2820, '9891045', 'ICA', 'PISCO', 'PARACAS'),
(2821, '9901046', 'ICA', 'PISCO', 'SAN ANDRES'),
(2822, '9911047', 'ICA', 'PISCO', 'SAN CLEMENTE'),
(2823, '9921048', 'ICA', 'PISCO', 'TUPAC AMARU INCA'),
(2824, '9931051', 'ICA', 'PALPA', 'PALPA'),
(2825, '9941052', 'ICA', 'PALPA', 'LLIPATA'),
(2826, '9951053', 'ICA', 'PALPA', 'RIO GRANDE'),
(2827, '9961054', 'ICA', 'PALPA', 'SANTA CRUZ'),
(2828, '9971055', 'ICA', 'PALPA', 'TIBILLO'),
(2829, '9981111', 'JUNIN', 'HUANCAYO', 'HUANCAYO'),
(2830, '9991113', 'JUNIN', 'HUANCAYO', 'CARHUACALLANGA'),
(2831, '10001114', 'JUNIN', 'HUANCAYO', 'COLCA'),
(2832, '10011115', 'JUNIN', 'HUANCAYO', 'CULLHUAS'),
(2833, '10021116', 'JUNIN', 'HUANCAYO', 'CHACAPAMPA'),
(2834, '10031117', 'JUNIN', 'HUANCAYO', 'CHICCHE'),
(2835, '10041118', 'JUNIN', 'HUANCAYO', 'CHILCA'),
(2836, '10051119', 'JUNIN', 'HUANCAYO', 'CHONGOS ALTO'),
(2837, '10261121', 'JUNIN', 'CONCEPCION', 'CONCEPCION'),
(2838, '10271122', 'JUNIN', 'CONCEPCION', 'ACO'),
(2839, '10281123', 'JUNIN', 'CONCEPCION', 'ANDAMARCA'),
(2840, '10291124', 'JUNIN', 'CONCEPCION', 'COMAS'),
(2841, '10301125', 'JUNIN', 'CONCEPCION', 'COCHAS'),
(2842, '10311126', 'JUNIN', 'CONCEPCION', 'CHAMBARA'),
(2843, '10321127', 'JUNIN', 'CONCEPCION', 'HEROINAS TOLEDO'),
(2844, '10331128', 'JUNIN', 'CONCEPCION', 'MANZANARES'),
(2845, '10341129', 'JUNIN', 'CONCEPCION', 'MCAL CASTILLA'),
(2846, '10411131', 'JUNIN', 'JAUJA', 'JAUJA'),
(2847, '10421132', 'JUNIN', 'JAUJA', 'ACOLLA'),
(2848, '10431133', 'JUNIN', 'JAUJA', 'APATA'),
(2849, '10441134', 'JUNIN', 'JAUJA', 'ATAURA'),
(2850, '10451135', 'JUNIN', 'JAUJA', 'CANCHAILLO'),
(2851, '10461136', 'JUNIN', 'JAUJA', 'EL MANTARO'),
(2852, '10471137', 'JUNIN', 'JAUJA', 'HUAMALI'),
(2853, '10481138', 'JUNIN', 'JAUJA', 'HUARIPAMPA'),
(2854, '10491139', 'JUNIN', 'JAUJA', 'HUERTAS'),
(2855, '10751141', 'JUNIN', 'JUNIN', 'JUNIN'),
(2856, '10761142', 'JUNIN', 'JUNIN', 'CARHUAMAYO'),
(2857, '10771143', 'JUNIN', 'JUNIN', 'ONDORES'),
(2858, '10781144', 'JUNIN', 'JUNIN', 'ULCUMAYO'),
(2859, '10791151', 'JUNIN', 'TARMA', 'TARMA'),
(2860, '10801152', 'JUNIN', 'TARMA', 'ACOBAMBA'),
(2861, '10811153', 'JUNIN', 'TARMA', 'HUARICOLCA'),
(2862, '10821154', 'JUNIN', 'TARMA', 'HUASAHUASI'),
(2863, '10831155', 'JUNIN', 'TARMA', 'LA UNION'),
(2864, '10841156', 'JUNIN', 'TARMA', 'PALCA'),
(2865, '10851157', 'JUNIN', 'TARMA', 'PALCAMAYO'),
(2866, '10861158', 'JUNIN', 'TARMA', 'SAN PEDRO DE CAJAS'),
(2867, '10871159', 'JUNIN', 'TARMA', 'TAPO'),
(2868, '10881161', 'JUNIN', 'YAULI', 'LA OROYA'),
(2869, '10891162', 'JUNIN', 'YAULI', 'CHACAPALPA'),
(2870, '10901163', 'JUNIN', 'YAULI', 'HUAY HUAY'),
(2871, '10911164', 'JUNIN', 'YAULI', 'MARCAPOMACOCHA'),
(2872, '10921165', 'JUNIN', 'YAULI', 'MOROCOCHA'),
(2873, '10931166', 'JUNIN', 'YAULI', 'PACCHA'),
(2874, '10941167', 'JUNIN', 'YAULI', 'STA BARBARA DE CARHUACAYAN'),
(2875, '10951168', 'JUNIN', 'YAULI', 'SUITUCANCHA'),
(2876, '10961169', 'JUNIN', 'YAULI', 'YAULI'),
(2877, '10981171', 'JUNIN', 'SATIPO', 'SATIPO'),
(2878, '10991172', 'JUNIN', 'SATIPO', 'COVIRIALI'),
(2879, '11001173', 'JUNIN', 'SATIPO', 'LLAYLLA'),
(2880, '11011174', 'JUNIN', 'SATIPO', 'MAZAMARI'),
(2881, '11021175', 'JUNIN', 'SATIPO', 'PAMPA HERMOSA'),
(2882, '11031176', 'JUNIN', 'SATIPO', 'PANGOA'),
(2883, '11041177', 'JUNIN', 'SATIPO', 'RIO NEGRO'),
(2884, '11051178', 'JUNIN', 'SATIPO', 'RIO TAMBO'),
(2885, '11061181', 'JUNIN', 'CHANCHAMAYO', 'CHANCHAMAYO'),
(2886, '11071182', 'JUNIN', 'CHANCHAMAYO', 'SAN RAMON'),
(2887, '11081183', 'JUNIN', 'CHANCHAMAYO', 'VITOC'),
(2888, '11091184', 'JUNIN', 'CHANCHAMAYO', 'SAN LUIS DE SHUARO'),
(2889, '11101185', 'JUNIN', 'CHANCHAMAYO', 'PICHANAQUI'),
(2890, '11111186', 'JUNIN', 'CHANCHAMAYO', 'PERENE'),
(2891, '11121191', 'JUNIN', 'CHUPACA', 'CHUPACA'),
(2892, '11131192', 'JUNIN', 'CHUPACA', 'AHUAC'),
(2893, '11141193', 'JUNIN', 'CHUPACA', 'CHONGOS BAJO'),
(2894, '11151194', 'JUNIN', 'CHUPACA', 'HUACHAC'),
(2895, '11161195', 'JUNIN', 'CHUPACA', 'HUAMANCACA CHICO'),
(2896, '11171196', 'JUNIN', 'CHUPACA', 'SAN JUAN DE ISCOS'),
(2897, '11181197', 'JUNIN', 'CHUPACA', 'SAN JUAN DE JARPA'),
(2898, '11191198', 'JUNIN', 'CHUPACA', 'TRES DE DICIEMBRE'),
(2899, '11201199', 'JUNIN', 'CHUPACA', 'YANACANCHA'),
(2900, '11211211', 'LA LIBERTAD', 'TRUJILLO', 'TRUJILLO'),
(2901, '11221212', 'LA LIBERTAD', 'TRUJILLO', 'HUANCHACO'),
(2902, '11231213', 'LA LIBERTAD', 'TRUJILLO', 'LAREDO'),
(2903, '11241214', 'LA LIBERTAD', 'TRUJILLO', 'MOCHE'),
(2904, '11251215', 'LA LIBERTAD', 'TRUJILLO', 'SALAVERRY'),
(2905, '11261216', 'LA LIBERTAD', 'TRUJILLO', 'SIMBAL'),
(2906, '11271217', 'LA LIBERTAD', 'TRUJILLO', 'VICTOR LARCO HERRERA'),
(2907, '11281219', 'LA LIBERTAD', 'TRUJILLO', 'POROTO'),
(2908, '11321221', 'LA LIBERTAD', 'BOLIVAR', 'BOLIVAR'),
(2909, '11331222', 'LA LIBERTAD', 'BOLIVAR', 'BAMBAMARCA'),
(2910, '11341223', 'LA LIBERTAD', 'BOLIVAR', 'CONDORMARCA'),
(2911, '11351224', 'LA LIBERTAD', 'BOLIVAR', 'LONGOTEA'),
(2912, '11361225', 'LA LIBERTAD', 'BOLIVAR', 'UCUNCHA'),
(2913, '11371226', 'LA LIBERTAD', 'BOLIVAR', 'UCHUMARCA'),
(2914, '11381231', 'LA LIBERTAD', 'SANCHEZ CARRION', 'HUAMACHUCO'),
(2915, '11391232', 'LA LIBERTAD', 'SANCHEZ CARRION', 'COCHORCO'),
(2916, '11401233', 'LA LIBERTAD', 'SANCHEZ CARRION', 'CURGOS'),
(2917, '11411234', 'LA LIBERTAD', 'SANCHEZ CARRION', 'CHUGAY'),
(2918, '11421235', 'LA LIBERTAD', 'SANCHEZ CARRION', 'MARCABAL'),
(2919, '11431236', 'LA LIBERTAD', 'SANCHEZ CARRION', 'SANAGORAN'),
(2920, '11441237', 'LA LIBERTAD', 'SANCHEZ CARRION', 'SARIN'),
(2921, '11451238', 'LA LIBERTAD', 'SANCHEZ CARRION', 'SARTIMBAMBA'),
(2922, '11461241', 'LA LIBERTAD', 'OTUZCO', 'OTUZCO'),
(2923, '11471242', 'LA LIBERTAD', 'OTUZCO', 'AGALLPAMPA'),
(2924, '11481243', 'LA LIBERTAD', 'OTUZCO', 'CHARAT'),
(2925, '11491244', 'LA LIBERTAD', 'OTUZCO', 'HUARANCHAL'),
(2926, '11501245', 'LA LIBERTAD', 'OTUZCO', 'LA CUESTA'),
(2927, '11511248', 'LA LIBERTAD', 'OTUZCO', 'PARANDAY'),
(2928, '11521249', 'LA LIBERTAD', 'OTUZCO', 'SALPO'),
(2929, '11561251', 'LA LIBERTAD', 'PACASMAYO', 'SAN PEDRO DE LLOC'),
(2930, '11571253', 'LA LIBERTAD', 'PACASMAYO', 'GUADALUPE'),
(2931, '11581254', 'LA LIBERTAD', 'PACASMAYO', 'JEQUETEPEQUE'),
(2932, '11591256', 'LA LIBERTAD', 'PACASMAYO', 'PACASMAYO'),
(2933, '11601258', 'LA LIBERTAD', 'PACASMAYO', 'SAN JOSE'),
(2934, '11611261', 'LA LIBERTAD', 'PATAZ', 'TAYABAMBA'),
(2935, '11621262', 'LA LIBERTAD', 'PATAZ', 'BULDIBUYO'),
(2936, '11631263', 'LA LIBERTAD', 'PATAZ', 'CHILLIA'),
(2937, '11641264', 'LA LIBERTAD', 'PATAZ', 'HUAYLILLAS'),
(2938, '11651265', 'LA LIBERTAD', 'PATAZ', 'HUANCASPATA'),
(2939, '11661266', 'LA LIBERTAD', 'PATAZ', 'HUAYO'),
(2940, '11671267', 'LA LIBERTAD', 'PATAZ', 'ONGON'),
(2941, '11681268', 'LA LIBERTAD', 'PATAZ', 'PARCOY'),
(2942, '11691269', 'LA LIBERTAD', 'PATAZ', 'PATAZ'),
(2943, '11741271', 'LA LIBERTAD', 'SANTIAGO DE CHUCO', 'SANTIAGO DE CHUCO'),
(2944, '11751272', 'LA LIBERTAD', 'SANTIAGO DE CHUCO', 'CACHICADAN'),
(2945, '11761273', 'LA LIBERTAD', 'SANTIAGO DE CHUCO', 'MOLLEBAMBA'),
(2946, '11771274', 'LA LIBERTAD', 'SANTIAGO DE CHUCO', 'MOLLEPATA'),
(2947, '11781275', 'LA LIBERTAD', 'SANTIAGO DE CHUCO', 'QUIRUVILCA'),
(2948, '11791276', 'LA LIBERTAD', 'SANTIAGO DE CHUCO', 'SANTA CRUZ DE CHUCA'),
(2949, '11801277', 'LA LIBERTAD', 'SANTIAGO DE CHUCO', 'SITABAMBA'),
(2950, '11811278', 'LA LIBERTAD', 'SANTIAGO DE CHUCO', 'ANGASMARCA'),
(2951, '11821281', 'LA LIBERTAD', 'ASCOPE', 'ASCOPE'),
(2952, '11831282', 'LA LIBERTAD', 'ASCOPE', 'CHICAMA'),
(2953, '11841283', 'LA LIBERTAD', 'ASCOPE', 'CHOCOPE'),
(2954, '11851284', 'LA LIBERTAD', 'ASCOPE', 'SANTIAGO DE CAO'),
(2955, '11861285', 'LA LIBERTAD', 'ASCOPE', 'MAGDALENA DE CAO'),
(2956, '11871286', 'LA LIBERTAD', 'ASCOPE', 'PAIJAN'),
(2957, '11881287', 'LA LIBERTAD', 'ASCOPE', 'RAZURI'),
(2958, '11891288', 'LA LIBERTAD', 'ASCOPE', 'CASA GRANDE'),
(2959, '11901291', 'LA LIBERTAD', 'CHEPEN', 'CHEPEN'),
(2960, '11911292', 'LA LIBERTAD', 'CHEPEN', 'PACANGA'),
(2961, '11921293', 'LA LIBERTAD', 'CHEPEN', 'PUEBLO NUEVO'),
(2962, '12041311', 'LAMBAYEQUE', 'CHICLAYO', 'CHICLAYO'),
(2963, '12051312', 'LAMBAYEQUE', 'CHICLAYO', 'CHONGOYAPE'),
(2964, '12061313', 'LAMBAYEQUE', 'CHICLAYO', 'ETEN'),
(2965, '12071314', 'LAMBAYEQUE', 'CHICLAYO', 'ETEN PUERTO'),
(2966, '12081315', 'LAMBAYEQUE', 'CHICLAYO', 'LAGUNAS'),
(2967, '12091316', 'LAMBAYEQUE', 'CHICLAYO', 'MONSEFU'),
(2968, '12101317', 'LAMBAYEQUE', 'CHICLAYO', 'NUEVA ARICA'),
(2969, '12111318', 'LAMBAYEQUE', 'CHICLAYO', 'OYOTUN'),
(2970, '12121319', 'LAMBAYEQUE', 'CHICLAYO', 'PICSI'),
(2971, '12241321', 'LAMBAYEQUE', 'FERREÑAFE', 'FERREÑAFE'),
(2972, '12251322', 'LAMBAYEQUE', 'FERREÑAFE', 'INCAHUASI'),
(2973, '12261323', 'LAMBAYEQUE', 'FERREÑAFE', 'CAÑARIS'),
(2974, '12271324', 'LAMBAYEQUE', 'FERREÑAFE', 'PITIPO'),
(2975, '12281325', 'LAMBAYEQUE', 'FERREÑAFE', 'PUEBLO NUEVO'),
(2976, '12291326', 'LAMBAYEQUE', 'FERREÑAFE', 'MANUEL ANTONIO MESONES MURO'),
(2977, '12301331', 'LAMBAYEQUE', 'LAMBAYEQUE', 'LAMBAYEQUE'),
(2978, '12311332', 'LAMBAYEQUE', 'LAMBAYEQUE', 'CHOCHOPE'),
(2979, '12321333', 'LAMBAYEQUE', 'LAMBAYEQUE', 'ILLIMO'),
(2980, '12331334', 'LAMBAYEQUE', 'LAMBAYEQUE', 'JAYANCA'),
(2981, '12341335', 'LAMBAYEQUE', 'LAMBAYEQUE', 'MOCHUMI'),
(2982, '12351336', 'LAMBAYEQUE', 'LAMBAYEQUE', 'MORROPE'),
(2983, '12361337', 'LAMBAYEQUE', 'LAMBAYEQUE', 'MOTUPE'),
(2984, '12371338', 'LAMBAYEQUE', 'LAMBAYEQUE', 'OLMOS'),
(2985, '12381339', 'LAMBAYEQUE', 'LAMBAYEQUE', 'PACORA'),
(2986, '12421411', 'LIMA', 'LIMA', 'LIMA'),
(2987, '12431412', 'LIMA', 'LIMA', 'ANCON'),
(2988, '12441413', 'LIMA', 'LIMA', 'ATE'),
(2989, '12451414', 'LIMA', 'LIMA', 'BRENA'),
(2990, '12461415', 'LIMA', 'LIMA', 'CARABAYLLO'),
(2991, '12471416', 'LIMA', 'LIMA', 'COMAS'),
(2992, '12481417', 'LIMA', 'LIMA', 'CHACLACAYO'),
(2993, '12491418', 'LIMA', 'LIMA', 'CHORRILLOS'),
(2994, '12501419', 'LIMA', 'LIMA', 'LA VICTORIA'),
(2995, '12851421', 'LIMA', 'CAJATAMBO', 'CAJATAMBO'),
(2996, '12861425', 'LIMA', 'CAJATAMBO', 'COPA'),
(2997, '12871426', 'LIMA', 'CAJATAMBO', 'GORGOR'),
(2998, '12881427', 'LIMA', 'CAJATAMBO', 'HUANCAPON'),
(2999, '12891428', 'LIMA', 'CAJATAMBO', 'MANAS'),
(3000, '12901431', 'LIMA', 'CANTA', 'CANTA'),
(3001, '12911432', 'LIMA', 'CANTA', 'ARAHUAY'),
(3002, '12921433', 'LIMA', 'CANTA', 'HUAMANTANGA'),
(3003, '12931434', 'LIMA', 'CANTA', 'HUAROS'),
(3004, '12941435', 'LIMA', 'CANTA', 'LACHAQUI'),
(3005, '12951436', 'LIMA', 'CANTA', 'SAN BUENAVENTURA'),
(3006, '12961437', 'LIMA', 'CANTA', 'SANTA ROSA DE QUIVES'),
(3007, '12971441', 'LIMA', 'CAÑETE', 'SAN VICENTE DE CAÑETE'),
(3008, '12981442', 'LIMA', 'CAÑETE', 'CALANGO'),
(3009, '12991443', 'LIMA', 'CAÑETE', 'CERRO AZUL'),
(3010, '13001444', 'LIMA', 'CAÑETE', 'COAYLLO'),
(3011, '13011445', 'LIMA', 'CAÑETE', 'CHILCA'),
(3012, '13021446', 'LIMA', 'CAÑETE', 'IMPERIAL'),
(3013, '13031447', 'LIMA', 'CAÑETE', 'LUNAHUANA'),
(3014, '13041448', 'LIMA', 'CAÑETE', 'MALA'),
(3015, '13051449', 'LIMA', 'CAÑETE', 'NUEVO IMPERIAL'),
(3016, '13131451', 'LIMA', 'HUAURA', 'HUACHO'),
(3017, '13141452', 'LIMA', 'HUAURA', 'AMBAR'),
(3018, '13151454', 'LIMA', 'HUAURA', 'CALETA DE CARQUIN'),
(3019, '13161455', 'LIMA', 'HUAURA', 'CHECRAS'),
(3020, '13171456', 'LIMA', 'HUAURA', 'HUALMAY'),
(3021, '13181457', 'LIMA', 'HUAURA', 'HUAURA'),
(3022, '13191458', 'LIMA', 'HUAURA', 'LEONCIO PRADO'),
(3023, '13201459', 'LIMA', 'HUAURA', 'PACCHO'),
(3024, '13251461', 'LIMA', 'HUAROCHIRI', 'MATUCANA'),
(3025, '13261462', 'LIMA', 'HUAROCHIRI', 'ANTIOQUIA'),
(3026, '13271463', 'LIMA', 'HUAROCHIRI', 'CALLAHUANCA'),
(3027, '13281464', 'LIMA', 'HUAROCHIRI', 'CARAMPOMA'),
(3028, '13291465', 'LIMA', 'HUAROCHIRI', 'CASTA'),
(3029, '13301466', 'LIMA', 'HUAROCHIRI', 'SAN JOSE DE LOS CHORRILLOS'),
(3030, '13311467', 'LIMA', 'HUAROCHIRI', 'CHICLA'),
(3031, '13321468', 'LIMA', 'HUAROCHIRI', 'HUANZA'),
(3032, '13331469', 'LIMA', 'HUAROCHIRI', 'HUAROCHIRI'),
(3033, '13571471', 'LIMA', 'YAUYOS', 'YAUYOS'),
(3034, '13581472', 'LIMA', 'YAUYOS', 'ALIS'),
(3035, '13591473', 'LIMA', 'YAUYOS', 'AYAUCA'),
(3036, '13601474', 'LIMA', 'YAUYOS', 'AYAVIRI'),
(3037, '13611475', 'LIMA', 'YAUYOS', 'AZANGARO'),
(3038, '13621476', 'LIMA', 'YAUYOS', 'CACRA'),
(3039, '13631477', 'LIMA', 'YAUYOS', 'CARANIA'),
(3040, '13641478', 'LIMA', 'YAUYOS', 'COCHAS'),
(3041, '13651479', 'LIMA', 'YAUYOS', 'COLONIA'),
(3042, '13901481', 'LIMA', 'HUARAL', 'HUARAL'),
(3043, '13911482', 'LIMA', 'HUARAL', 'ATAVILLOS ALTO'),
(3044, '13921483', 'LIMA', 'HUARAL', 'ATAVILLOS BAJO'),
(3045, '13931484', 'LIMA', 'HUARAL', 'AUCALLAMA'),
(3046, '13941485', 'LIMA', 'HUARAL', 'CHANCAY'),
(3047, '13951486', 'LIMA', 'HUARAL', 'IHUARI'),
(3048, '13961487', 'LIMA', 'HUARAL', 'LAMPIAN'),
(3049, '13971488', 'LIMA', 'HUARAL', 'PACARAOS'),
(3050, '13981489', 'LIMA', 'HUARAL', 'SAN MIGUEL DE ACOS'),
(3051, '14021491', 'LIMA', 'BARRANCA', 'BARRANCA'),
(3052, '14031492', 'LIMA', 'BARRANCA', 'PARAMONGA'),
(3053, '14041493', 'LIMA', 'BARRANCA', 'PATIVILCA'),
(3054, '14051494', 'LIMA', 'BARRANCA', 'SUPE'),
(3055, '14061495', 'LIMA', 'BARRANCA', 'SUPE PUERTO'),
(3056, '14131511', 'LORETO', 'MAYNAS', 'IQUITOS'),
(3057, '14141512', 'LORETO', 'MAYNAS', 'ALTO NANAY'),
(3058, '14151513', 'LORETO', 'MAYNAS', 'FERNANDO LORES'),
(3059, '14161514', 'LORETO', 'MAYNAS', 'LAS AMAZONAS'),
(3060, '14171515', 'LORETO', 'MAYNAS', 'MAZAN'),
(3061, '14181516', 'LORETO', 'MAYNAS', 'NAPO'),
(3062, '14191517', 'LORETO', 'MAYNAS', 'PUTUMAYO'),
(3063, '14201518', 'LORETO', 'MAYNAS', 'TORRES CAUSANA'),
(3064, '14261521', 'LORETO', 'ALTO AMAZONAS', 'YURIMAGUAS'),
(3065, '14271522', 'LORETO', 'ALTO AMAZONAS', 'BALSAPUERTO'),
(3066, '14281525', 'LORETO', 'ALTO AMAZONAS', 'JEBEROS'),
(3067, '14291526', 'LORETO', 'ALTO AMAZONAS', 'LAGUNAS'),
(3068, '14321531', 'LORETO', 'LORETO', 'NAUTA'),
(3069, '14331532', 'LORETO', 'LORETO', 'PARINARI'),
(3070, '14341533', 'LORETO', 'LORETO', 'TIGRE'),
(3071, '14351534', 'LORETO', 'LORETO', 'URARINAS'),
(3072, '14361535', 'LORETO', 'LORETO', 'TROMPETEROS'),
(3073, '14371541', 'LORETO', 'REQUENA', 'REQUENA'),
(3074, '14381542', 'LORETO', 'REQUENA', 'ALTO TAPICHE'),
(3075, '14391543', 'LORETO', 'REQUENA', 'CAPELO'),
(3076, '14401544', 'LORETO', 'REQUENA', 'EMILIO SAN MARTIN'),
(3077, '14411545', 'LORETO', 'REQUENA', 'MAQUIA'),
(3078, '14421546', 'LORETO', 'REQUENA', 'PUINAHUA'),
(3079, '14431547', 'LORETO', 'REQUENA', 'SAPUENA'),
(3080, '14441548', 'LORETO', 'REQUENA', 'SOPLIN'),
(3081, '14451549', 'LORETO', 'REQUENA', 'TAPICHE'),
(3082, '14481551', 'LORETO', 'UCAYALI', 'CONTAMANA'),
(3083, '14491552', 'LORETO', 'UCAYALI', 'VARGAS GUERRA'),
(3084, '14501553', 'LORETO', 'UCAYALI', 'PADRE MARQUEZ'),
(3085, '14511554', 'LORETO', 'UCAYALI', 'PAMPA HERMOZA'),
(3086, '14521555', 'LORETO', 'UCAYALI', 'SARAYACU'),
(3087, '14531556', 'LORETO', 'UCAYALI', 'INAHUAYA'),
(3088, '14541561', 'LORETO', 'MARISCAL RAMON CASTILLA', 'MARISCAL RAMON CASTILLA'),
(3089, '14551562', 'LORETO', 'MARISCAL RAMON CASTILLA', 'PEBAS'),
(3090, '14561563', 'LORETO', 'MARISCAL RAMON CASTILLA', 'YAVARI'),
(3091, '14571564', 'LORETO', 'MARISCAL RAMON CASTILLA', 'SAN PABLO'),
(3092, '14581571', 'LORETO', 'DATEM DEL MARAÑON', 'BARRANCA'),
(3093, '14591572', 'LORETO', 'DATEM DEL MARAÑON', 'ANDOAS'),
(3094, '14601573', 'LORETO', 'DATEM DEL MARAÑON', 'CAHUAPANAS'),
(3095, '14611574', 'LORETO', 'DATEM DEL MARAÑON', 'MANSERICHE'),
(3096, '14621575', 'LORETO', 'DATEM DEL MARAÑON', 'MORONA'),
(3097, '14631576', 'LORETO', 'DATEM DEL MARAÑON', 'PASTAZA'),
(3098, '14641611', 'MADRE DE DIOS', 'TAMBOPATA', 'TAMBOPATA'),
(3099, '14651612', 'MADRE DE DIOS', 'TAMBOPATA', 'INAMBARI'),
(3100, '14661613', 'MADRE DE DIOS', 'TAMBOPATA', 'LAS PIEDRAS'),
(3101, '14671614', 'MADRE DE DIOS', 'TAMBOPATA', 'LABERINTO'),
(3102, '14681621', 'MADRE DE DIOS', 'MANU', 'MANU'),
(3103, '14691622', 'MADRE DE DIOS', 'MANU', 'FITZCARRALD'),
(3104, '14701623', 'MADRE DE DIOS', 'MANU', 'MADRE DE DIOS'),
(3105, '14711624', 'MADRE DE DIOS', 'MANU', 'HUEPETUHE'),
(3106, '14721631', 'MADRE DE DIOS', 'TAHUAMANU', 'IÑAPARI'),
(3107, '14731632', 'MADRE DE DIOS', 'TAHUAMANU', 'IBERIA'),
(3108, '14741633', 'MADRE DE DIOS', 'TAHUAMANU', 'TAHUAMANU'),
(3109, '14751711', 'MOQUEGUA', 'MARISCAL NIETO', 'MOQUEGUA'),
(3110, '14761712', 'MOQUEGUA', 'MARISCAL NIETO', 'CARUMAS'),
(3111, '14771713', 'MOQUEGUA', 'MARISCAL NIETO', 'CUCHUMBAYA'),
(3112, '14781714', 'MOQUEGUA', 'MARISCAL NIETO', 'SAN CRISTOBAL'),
(3113, '14791715', 'MOQUEGUA', 'MARISCAL NIETO', 'TORATA'),
(3114, '14801716', 'MOQUEGUA', 'MARISCAL NIETO', 'SAMEGUA'),
(3115, '14811721', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'OMATE'),
(3116, '14821722', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'COALAQUE'),
(3117, '14831723', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'CHOJATA'),
(3118, '14841724', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'ICHUÑA'),
(3119, '14851725', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'LA CAPILLA'),
(3120, '14861726', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'LLOQUE'),
(3121, '14871727', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'MATALAQUE'),
(3122, '14881728', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'PUQUINA'),
(3123, '14891729', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'QUINISTAQUILLAS'),
(3124, '14921731', 'MOQUEGUA', 'ILO', 'ILO'),
(3125, '14931732', 'MOQUEGUA', 'ILO', 'EL ALGARROBAL'),
(3126, '14941733', 'MOQUEGUA', 'ILO', 'PACOCHA'),
(3127, '14951811', 'PASCO', 'PASCO', 'CHAUPIMARCA'),
(3128, '14961813', 'PASCO', 'PASCO', 'HUACHON'),
(3129, '14971814', 'PASCO', 'PASCO', 'HUARIACA'),
(3130, '14981815', 'PASCO', 'PASCO', 'HUAYLLAY'),
(3131, '14991816', 'PASCO', 'PASCO', 'NINACACA'),
(3132, '15001817', 'PASCO', 'PASCO', 'PALLANCHACRA'),
(3133, '15011818', 'PASCO', 'PASCO', 'PAUCARTAMBO'),
(3134, '15021819', 'PASCO', 'PASCO', 'SAN FCO DE ASIS DE YARUSYACAN'),
(3135, '15081821', 'PASCO', 'DANIEL ALCIDES CARRION', 'YANAHUANCA'),
(3136, '15091822', 'PASCO', 'DANIEL ALCIDES CARRION', 'CHACAYAN'),
(3137, '15101823', 'PASCO', 'DANIEL ALCIDES CARRION', 'GOYLLARISQUIZGA'),
(3138, '15111824', 'PASCO', 'DANIEL ALCIDES CARRION', 'PAUCAR'),
(3139, '15121825', 'PASCO', 'DANIEL ALCIDES CARRION', 'SAN PEDRO DE PILLAO'),
(3140, '15131826', 'PASCO', 'DANIEL ALCIDES CARRION', 'SANTA ANA DE TUSI'),
(3141, '15141827', 'PASCO', 'DANIEL ALCIDES CARRION', 'TAPUC'),
(3142, '15151828', 'PASCO', 'DANIEL ALCIDES CARRION', 'VILCABAMBA'),
(3143, '15161831', 'PASCO', 'OXAPAMPA', 'OXAPAMPA'),
(3144, '15171832', 'PASCO', 'OXAPAMPA', 'CHONTABAMBA'),
(3145, '15181833', 'PASCO', 'OXAPAMPA', 'HUANCABAMBA'),
(3146, '15191834', 'PASCO', 'OXAPAMPA', 'PUERTO BERMUDEZ'),
(3147, '15201835', 'PASCO', 'OXAPAMPA', 'VILLA RICA'),
(3148, '15211836', 'PASCO', 'OXAPAMPA', 'POZUZO'),
(3149, '15221837', 'PASCO', 'OXAPAMPA', 'PALCAZU'),
(3150, '15231911', 'PIURA', 'PIURA', 'PIURA'),
(3151, '15241913', 'PIURA', 'PIURA', 'CASTILLA'),
(3152, '15251914', 'PIURA', 'PIURA', 'CATACAOS'),
(3153, '15261915', 'PIURA', 'PIURA', 'LA ARENA'),
(3154, '15271916', 'PIURA', 'PIURA', 'LA UNION'),
(3155, '15281917', 'PIURA', 'PIURA', 'LAS LOMAS'),
(3156, '15291919', 'PIURA', 'PIURA', 'TAMBO GRANDE'),
(3157, '15321921', 'PIURA', 'AYABACA', 'AYABACA'),
(3158, '15331922', 'PIURA', 'AYABACA', 'FRIAS'),
(3159, '15341923', 'PIURA', 'AYABACA', 'LAGUNAS'),
(3160, '15351924', 'PIURA', 'AYABACA', 'MONTERO'),
(3161, '15361925', 'PIURA', 'AYABACA', 'PACAIPAMPA'),
(3162, '15371926', 'PIURA', 'AYABACA', 'SAPILLICA'),
(3163, '15381927', 'PIURA', 'AYABACA', 'SICCHEZ'),
(3164, '15391928', 'PIURA', 'AYABACA', 'SUYO'),
(3165, '15401929', 'PIURA', 'AYABACA', 'JILILI'),
(3166, '15421931', 'PIURA', 'HUANCABAMBA', 'HUANCABAMBA'),
(3167, '15431932', 'PIURA', 'HUANCABAMBA', 'CANCHAQUE'),
(3168, '15441933', 'PIURA', 'HUANCABAMBA', 'HUARMACA'),
(3169, '15451934', 'PIURA', 'HUANCABAMBA', 'SONDOR'),
(3170, '15461935', 'PIURA', 'HUANCABAMBA', 'SONDORILLO'),
(3171, '15471936', 'PIURA', 'HUANCABAMBA', 'EL CARMEN DE LA FRONTERA'),
(3172, '15481937', 'PIURA', 'HUANCABAMBA', 'SAN MIGUEL DE EL FAIQUE'),
(3173, '15491938', 'PIURA', 'HUANCABAMBA', 'LALAQUIZ'),
(3174, '15501941', 'PIURA', 'MORROPON', 'CHULUCANAS'),
(3175, '15511942', 'PIURA', 'MORROPON', 'BUENOS AIRES'),
(3176, '15521943', 'PIURA', 'MORROPON', 'CHALACO'),
(3177, '15531944', 'PIURA', 'MORROPON', 'MORROPON'),
(3178, '15541945', 'PIURA', 'MORROPON', 'SALITRAL'),
(3179, '15551946', 'PIURA', 'MORROPON', 'SANTA CATALINA DE MOSSA'),
(3180, '15561947', 'PIURA', 'MORROPON', 'SANTO DOMINGO'),
(3181, '15571948', 'PIURA', 'MORROPON', 'LA MATANZA'),
(3182, '15581949', 'PIURA', 'MORROPON', 'YAMANGO'),
(3183, '15601951', 'PIURA', 'PAITA', 'PAITA'),
(3184, '15611952', 'PIURA', 'PAITA', 'AMOTAPE'),
(3185, '15621953', 'PIURA', 'PAITA', 'ARENAL'),
(3186, '15631954', 'PIURA', 'PAITA', 'LA HUACA'),
(3187, '15641955', 'PIURA', 'PAITA', 'PUEBLO NUEVO DE COLAN'),
(3188, '15651956', 'PIURA', 'PAITA', 'TAMARINDO'),
(3189, '15661957', 'PIURA', 'PAITA', 'VICHAYAL'),
(3190, '15671961', 'PIURA', 'SULLANA', 'SULLANA'),
(3191, '15681962', 'PIURA', 'SULLANA', 'BELLAVISTA'),
(3192, '15691963', 'PIURA', 'SULLANA', 'LANCONES'),
(3193, '15701964', 'PIURA', 'SULLANA', 'MARCAVELICA'),
(3194, '15711965', 'PIURA', 'SULLANA', 'MIGUEL CHECA'),
(3195, '15721966', 'PIURA', 'SULLANA', 'QUERECOTILLO'),
(3196, '15731967', 'PIURA', 'SULLANA', 'SALITRAL'),
(3197, '15741968', 'PIURA', 'SULLANA', 'IGNACIO ESCUDERO'),
(3198, '15751971', 'PIURA', 'TALARA', 'PARIÑAS'),
(3199, '15761972', 'PIURA', 'TALARA', 'EL ALTO'),
(3200, '15771973', 'PIURA', 'TALARA', 'LA BREA'),
(3201, '15781974', 'PIURA', 'TALARA', 'LOBITOS'),
(3202, '15791975', 'PIURA', 'TALARA', 'MANCORA'),
(3203, '15801976', 'PIURA', 'TALARA', 'LOS ORGANOS'),
(3204, '15811981', 'PIURA', 'SECHURA', 'SECHURA'),
(3205, '15821982', 'PIURA', 'SECHURA', 'VICE'),
(3206, '15831983', 'PIURA', 'SECHURA', 'BERNAL'),
(3207, '15841984', 'PIURA', 'SECHURA', 'BELLAVISTA DE LA UNION'),
(3208, '15851985', 'PIURA', 'SECHURA', 'CRISTO NOS VALGA'),
(3209, '15861986', 'PIURA', 'SECHURA', 'RINCONADA LLICUAR'),
(3210, '15872011', 'PUNO', 'PUNO', 'PUNO'),
(3211, '15882012', 'PUNO', 'PUNO', 'ACORA'),
(3212, '15892013', 'PUNO', 'PUNO', 'ATUNCOLLA'),
(3213, '15902014', 'PUNO', 'PUNO', 'CAPACHICA'),
(3214, '15912015', 'PUNO', 'PUNO', 'COATA'),
(3215, '15922016', 'PUNO', 'PUNO', 'CHUCUITO'),
(3216, '15932017', 'PUNO', 'PUNO', 'HUATA'),
(3217, '15942018', 'PUNO', 'PUNO', 'MAÑAZO'),
(3218, '15952019', 'PUNO', 'PUNO', 'PAUCARCOLLA'),
(3219, '16022021', 'PUNO', 'AZANGARO', 'AZANGARO'),
(3220, '16032022', 'PUNO', 'AZANGARO', 'ACHAYA'),
(3221, '16042023', 'PUNO', 'AZANGARO', 'ARAPA'),
(3222, '16052024', 'PUNO', 'AZANGARO', 'ASILLO'),
(3223, '16062025', 'PUNO', 'AZANGARO', 'CAMINACA'),
(3224, '16072026', 'PUNO', 'AZANGARO', 'CHUPA'),
(3225, '16082027', 'PUNO', 'AZANGARO', 'JOSE DOMINGO CHOQUEHUANCA'),
(3226, '16092028', 'PUNO', 'AZANGARO', 'MUÑANI'),
(3227, '16172031', 'PUNO', 'CARABAYA', 'MACUSANI'),
(3228, '16182032', 'PUNO', 'CARABAYA', 'AJOYANI'),
(3229, '16192033', 'PUNO', 'CARABAYA', 'AYAPATA'),
(3230, '16202034', 'PUNO', 'CARABAYA', 'COASA'),
(3231, '16212035', 'PUNO', 'CARABAYA', 'CORANI'),
(3232, '16222036', 'PUNO', 'CARABAYA', 'CRUCERO'),
(3233, '16232037', 'PUNO', 'CARABAYA', 'ITUATA'),
(3234, '16242038', 'PUNO', 'CARABAYA', 'OLLACHEA'),
(3235, '16252039', 'PUNO', 'CARABAYA', 'SAN GABAN'),
(3236, '16272041', 'PUNO', 'CHUCUITO', 'JULI'),
(3237, '16282042', 'PUNO', 'CHUCUITO', 'DESAGUADERO'),
(3238, '16292043', 'PUNO', 'CHUCUITO', 'HUACULLANI'),
(3239, '16302046', 'PUNO', 'CHUCUITO', 'PISACOMA'),
(3240, '16312047', 'PUNO', 'CHUCUITO', 'POMATA'),
(3241, '16342051', 'PUNO', 'HUANCANE', 'HUANCANE'),
(3242, '16352052', 'PUNO', 'HUANCANE', 'COJATA'),
(3243, '16362054', 'PUNO', 'HUANCANE', 'INCHUPALLA'),
(3244, '16372056', 'PUNO', 'HUANCANE', 'PUSI'),
(3245, '16382057', 'PUNO', 'HUANCANE', 'ROSASPATA'),
(3246, '16392058', 'PUNO', 'HUANCANE', 'TARACO'),
(3247, '16402059', 'PUNO', 'HUANCANE', 'VILQUE CHICO'),
(3248, '16422061', 'PUNO', 'LAMPA', 'LAMPA'),
(3249, '16432062', 'PUNO', 'LAMPA', 'CABANILLA'),
(3250, '16442063', 'PUNO', 'LAMPA', 'CALAPUJA'),
(3251, '16452064', 'PUNO', 'LAMPA', 'NICASIO'),
(3252, '16462065', 'PUNO', 'LAMPA', 'OCUVIRI'),
(3253, '16472066', 'PUNO', 'LAMPA', 'PALCA'),
(3254, '16482067', 'PUNO', 'LAMPA', 'PARATIA'),
(3255, '16492068', 'PUNO', 'LAMPA', 'PUCARA'),
(3256, '16502069', 'PUNO', 'LAMPA', 'SANTA LUCIA'),
(3257, '16522071', 'PUNO', 'MELGAR', 'AYAVIRI'),
(3258, '16532072', 'PUNO', 'MELGAR', 'ANTAUTA'),
(3259, '16542073', 'PUNO', 'MELGAR', 'CUPI'),
(3260, '16552074', 'PUNO', 'MELGAR', 'LLALLI'),
(3261, '16562075', 'PUNO', 'MELGAR', 'MACARI'),
(3262, '16572076', 'PUNO', 'MELGAR', 'NUÑOA'),
(3263, '16582077', 'PUNO', 'MELGAR', 'ORURILLO'),
(3264, '16592078', 'PUNO', 'MELGAR', 'SANTA ROSA'),
(3265, '16602079', 'PUNO', 'MELGAR', 'UMACHIRI'),
(3266, '16612081', 'PUNO', 'SANDIA', 'SANDIA'),
(3267, '16622083', 'PUNO', 'SANDIA', 'CUYOCUYO'),
(3268, '16632084', 'PUNO', 'SANDIA', 'LIMBANI'),
(3269, '16642085', 'PUNO', 'SANDIA', 'PHARA'),
(3270, '16652086', 'PUNO', 'SANDIA', 'PATAMBUCO'),
(3271, '16662087', 'PUNO', 'SANDIA', 'QUIACA'),
(3272, '16672088', 'PUNO', 'SANDIA', 'SAN JUAN DEL ORO'),
(3273, '16712091', 'PUNO', 'SAN ROMAN', 'JULIACA'),
(3274, '16722092', 'PUNO', 'SAN ROMAN', 'CABANA'),
(3275, '16732093', 'PUNO', 'SAN ROMAN', 'CABANILLAS'),
(3276, '16742094', 'PUNO', 'SAN ROMAN', 'CARACOTO'),
(3277, '16962111', 'SAN MARTIN', 'MOYOBAMBA', 'MOYOBAMBA'),
(3278, '16972112', 'SAN MARTIN', 'MOYOBAMBA', 'CALZADA'),
(3279, '16982113', 'SAN MARTIN', 'MOYOBAMBA', 'HABANA'),
(3280, '16992114', 'SAN MARTIN', 'MOYOBAMBA', 'JEPELACIO'),
(3281, '17002115', 'SAN MARTIN', 'MOYOBAMBA', 'SORITOR'),
(3282, '17012116', 'SAN MARTIN', 'MOYOBAMBA', 'YANTALO'),
(3283, '17022121', 'SAN MARTIN', 'HUALLAGA', 'SAPOSOA'),
(3284, '17032122', 'SAN MARTIN', 'HUALLAGA', 'PISCOYACU'),
(3285, '17042123', 'SAN MARTIN', 'HUALLAGA', 'SACANCHE'),
(3286, '17052124', 'SAN MARTIN', 'HUALLAGA', 'TINGO DE SAPOSOA'),
(3287, '17062125', 'SAN MARTIN', 'HUALLAGA', 'ALTO SAPOSOA'),
(3288, '17072126', 'SAN MARTIN', 'HUALLAGA', 'EL ESLABON'),
(3289, '17082131', 'SAN MARTIN', 'LAMAS', 'LAMAS'),
(3290, '17092133', 'SAN MARTIN', 'LAMAS', 'BARRANQUITA'),
(3291, '17102134', 'SAN MARTIN', 'LAMAS', 'CAYNARACHI'),
(3292, '17112135', 'SAN MARTIN', 'LAMAS', 'CUÑUMBUQUI'),
(3293, '17122136', 'SAN MARTIN', 'LAMAS', 'PINTO RECODO'),
(3294, '17132137', 'SAN MARTIN', 'LAMAS', 'RUMISAPA'),
(3295, '17192141', 'SAN MARTIN', 'MARISCAL CACERES', 'JUANJUI'),
(3296, '17202142', 'SAN MARTIN', 'MARISCAL CACERES', 'CAMPANILLA'),
(3297, '17212143', 'SAN MARTIN', 'MARISCAL CACERES', 'HUICUNGO'),
(3298, '17222144', 'SAN MARTIN', 'MARISCAL CACERES', 'PACHIZA'),
(3299, '17232145', 'SAN MARTIN', 'MARISCAL CACERES', 'PAJARILLO'),
(3300, '17242151', 'SAN MARTIN', 'RIOJA', 'RIOJA'),
(3301, '17252152', 'SAN MARTIN', 'RIOJA', 'POSIC'),
(3302, '17262153', 'SAN MARTIN', 'RIOJA', 'YORONGOS'),
(3303, '17272154', 'SAN MARTIN', 'RIOJA', 'YURACYACU'),
(3304, '17282155', 'SAN MARTIN', 'RIOJA', 'NUEVA CAJAMARCA'),
(3305, '17292156', 'SAN MARTIN', 'RIOJA', 'ELIAS SOPLIN'),
(3306, '17302157', 'SAN MARTIN', 'RIOJA', 'SAN FERNANDO'),
(3307, '17312158', 'SAN MARTIN', 'RIOJA', 'PARDO MIGUEL'),
(3308, '17322159', 'SAN MARTIN', 'RIOJA', 'AWAJUN'),
(3309, '17332161', 'SAN MARTIN', 'SAN MARTIN', 'TARAPOTO'),
(3310, '17342162', 'SAN MARTIN', 'SAN MARTIN', 'ALBERTO LEVEAU'),
(3311, '17352164', 'SAN MARTIN', 'SAN MARTIN', 'CACATACHI'),
(3312, '17362166', 'SAN MARTIN', 'SAN MARTIN', 'CHAZUTA'),
(3313, '17372167', 'SAN MARTIN', 'SAN MARTIN', 'CHIPURANA'),
(3314, '17382168', 'SAN MARTIN', 'SAN MARTIN', 'EL PORVENIR'),
(3315, '17392169', 'SAN MARTIN', 'SAN MARTIN', 'HUIMBAYOC'),
(3316, '17472171', 'SAN MARTIN', 'BELLAVISTA', 'BELLAVISTA'),
(3317, '17482172', 'SAN MARTIN', 'BELLAVISTA', 'SAN RAFAEL'),
(3318, '17492173', 'SAN MARTIN', 'BELLAVISTA', 'SAN PABLO'),
(3319, '17502174', 'SAN MARTIN', 'BELLAVISTA', 'ALTO BIAVO'),
(3320, '17512175', 'SAN MARTIN', 'BELLAVISTA', 'HUALLAGA'),
(3321, '17522176', 'SAN MARTIN', 'BELLAVISTA', 'BAJO BIAVO'),
(3322, '17532181', 'SAN MARTIN', 'TOCACHE', 'TOCACHE'),
(3323, '17542182', 'SAN MARTIN', 'TOCACHE', 'NUEVO PROGRESO'),
(3324, '17552183', 'SAN MARTIN', 'TOCACHE', 'POLVORA'),
(3325, '17562184', 'SAN MARTIN', 'TOCACHE', 'SHUNTE'),
(3326, '17572185', 'SAN MARTIN', 'TOCACHE', 'UCHIZA'),
(3327, '17582191', 'SAN MARTIN', 'PICOTA', 'PICOTA'),
(3328, '17592192', 'SAN MARTIN', 'PICOTA', 'BUENOS AIRES'),
(3329, '17602193', 'SAN MARTIN', 'PICOTA', 'CASPIZAPA'),
(3330, '17612194', 'SAN MARTIN', 'PICOTA', 'PILLUANA'),
(3331, '17622195', 'SAN MARTIN', 'PICOTA', 'PUCACACA'),
(3332, '17632196', 'SAN MARTIN', 'PICOTA', 'SAN CRISTOBAL'),
(3333, '17642197', 'SAN MARTIN', 'PICOTA', 'SAN HILARION'),
(3334, '17652198', 'SAN MARTIN', 'PICOTA', 'TINGO DE PONASA'),
(3335, '17662199', 'SAN MARTIN', 'PICOTA', 'TRES UNIDOS'),
(3336, '17732211', 'TACNA', 'TACNA', 'TACNA'),
(3337, '17742212', 'TACNA', 'TACNA', 'CALANA'),
(3338, '17752214', 'TACNA', 'TACNA', 'INCLAN'),
(3339, '17762217', 'TACNA', 'TACNA', 'PACHIA'),
(3340, '17772218', 'TACNA', 'TACNA', 'PALCA'),
(3341, '17782219', 'TACNA', 'TACNA', 'POCOLLAY'),
(3342, '17832221', 'TACNA', 'TARATA', 'TARATA'),
(3343, '17842225', 'TACNA', 'TARATA', 'HEROES ALBARRACIN'),
(3344, '17852226', 'TACNA', 'TARATA', 'ESTIQUE'),
(3345, '17862227', 'TACNA', 'TARATA', 'ESTIQUE PAMPA'),
(3346, '17912231', 'TACNA', 'JORGE BASADRE', 'LOCUMBA'),
(3347, '17922232', 'TACNA', 'JORGE BASADRE', 'ITE'),
(3348, '17932233', 'TACNA', 'JORGE BASADRE', 'ILABAYA'),
(3349, '17942241', 'TACNA', 'CANDARAVE', 'CANDARAVE'),
(3350, '17952242', 'TACNA', 'CANDARAVE', 'CAIRANI'),
(3351, '17962243', 'TACNA', 'CANDARAVE', 'CURIBAYA'),
(3352, '17972244', 'TACNA', 'CANDARAVE', 'HUANUARA'),
(3353, '17982245', 'TACNA', 'CANDARAVE', 'QUILAHUANI'),
(3354, '17992246', 'TACNA', 'CANDARAVE', 'CAMILACA'),
(3355, '18002311', 'TUMBES', 'TUMBES', 'TUMBES'),
(3356, '18012312', 'TUMBES', 'TUMBES', 'CORRALES'),
(3357, '18022313', 'TUMBES', 'TUMBES', 'LA CRUZ'),
(3358, '18032314', 'TUMBES', 'TUMBES', 'PAMPAS DE HOSPITAL'),
(3359, '18042315', 'TUMBES', 'TUMBES', 'SAN JACINTO'),
(3360, '18052316', 'TUMBES', 'TUMBES', 'SAN JUAN DE LA VIRGEN'),
(3361, '18062321', 'TUMBES', 'CONTRALMIRANTE VILLAR', 'ZORRITOS'),
(3362, '18072322', 'TUMBES', 'CONTRALMIRANTE VILLAR', 'CASITAS'),
(3363, '18082323', 'TUMBES', 'CONTRALMIRANTE VILLAR', 'CANOAS DE PUNTA SAL'),
(3364, '18092331', 'TUMBES', 'ZARUMILLA', 'ZARUMILLA'),
(3365, '18102332', 'TUMBES', 'ZARUMILLA', 'MATAPALO'),
(3366, '18112333', 'TUMBES', 'ZARUMILLA', 'PAPAYAL'),
(3367, '18121010', 'ANCASH', 'PALLASCA', 'SANTA ROSA'),
(3368, '18122334', 'TUMBES', 'ZARUMILLA', 'AGUAS VERDES'),
(3369, '18132411', 'REGION CALLAO', 'CALLAO', 'CALLAO'),
(3370, '18142412', 'REGION CALLAO', 'CALLAO', 'BELLAVISTA'),
(3371, '18152413', 'REGION CALLAO', 'CALLAO', 'LA PUNTA'),
(3372, '18162414', 'REGION CALLAO', 'CALLAO', 'CARMEN DE LA LEGUA-REYNOSO'),
(3373, '18172415', 'REGION CALLAO', 'CALLAO', 'LA PERLA'),
(3374, '18182416', 'REGION CALLAO', 'CALLAO', 'VENTANILLA'),
(3375, '18192511', 'UCAYALI', 'CORONEL PORTILLO', 'CALLERIA'),
(3376, '18202512', 'UCAYALI', 'CORONEL PORTILLO', 'YARINACOCHA'),
(3377, '18212513', 'UCAYALI', 'CORONEL PORTILLO', 'MASISEA'),
(3378, '18221011', 'ANCASH', 'PALLASCA', 'TAUCA'),
(3379, '18222514', 'UCAYALI', 'CORONEL PORTILLO', 'CAMPOVERDE'),
(3380, '18232515', 'UCAYALI', 'CORONEL PORTILLO', 'IPARIA'),
(3381, '18242516', 'UCAYALI', 'CORONEL PORTILLO', 'NUEVA REQUENA'),
(3382, '18252517', 'UCAYALI', 'CORONEL PORTILLO', 'MANANTAY'),
(3383, '18262521', 'UCAYALI', 'PADRE ABAD', 'PADRE ABAD'),
(3384, '18272522', 'UCAYALI', 'PADRE ABAD', 'YRAZOLA'),
(3385, '18282523', 'UCAYALI', 'PADRE ABAD', 'CURIMANA'),
(3386, '18292531', 'UCAYALI', 'ATALAYA', 'RAIMONDI'),
(3387, '18302532', 'UCAYALI', 'ATALAYA', 'TAHUANIA'),
(3388, '18312533', 'UCAYALI', 'ATALAYA', 'YURUA'),
(3389, '18322534', 'UCAYALI', 'ATALAYA', 'SEPAHUA'),
(3390, '18332541', 'UCAYALI', 'PURUS', 'PURUS'),
(3391, '19621210', 'ANCASH', 'RECUAY', 'CATAC'),
(3392, '21521410', 'ANCASH', 'SIHUAS', 'SAN JUAN'),
(3393, '24922010', 'ANCASH', 'OCROS', 'SANTIAGO DE CHILCAS'),
(3394, '53851010', 'AYACUCHO', 'PAUCAR DEL SARA SARA', 'SARA SARA'),
(3395, '54851110', 'AYACUCHO', 'SUCRE', 'CHILCAYOC'),
(3396, '54951111', 'AYACUCHO', 'SUCRE', 'MORCOLLA'),
(3397, '65561010', 'CAJAMARCA', 'SAN MIGUEL', 'UNION AGUA BLANCA'),
(3398, '65661011', 'CAJAMARCA', 'SAN MIGUEL', 'TONGOD'),
(3399, '65761012', 'CAJAMARCA', 'SAN MIGUEL', 'CATILLUC'),
(3400, '65861013', 'CAJAMARCA', 'SAN MIGUEL', 'BOLIVAR'),
(3401, '77571210', 'CUSCO', 'QUISPICANCHI', 'OCONGATE'),
(3402, '77671211', 'CUSCO', 'QUISPICANCHI', 'OROPESA'),
(3403, '77771212', 'CUSCO', 'QUISPICANCHI', 'QUIQUIJANA'),
(3404, '96410110', 'ICA', 'ICA', 'SUBTANJALLA'),
(3405, '96510111', 'ICA', 'ICA', 'YAUCA DEL ROSARIO'),
(3406, '96610112', 'ICA', 'ICA', 'TATE'),
(3407, '96710113', 'ICA', 'ICA', 'PACHACUTEC'),
(3408, '96810114', 'ICA', 'ICA', 'OCUCAJE'),
(3409, '97810210', 'ICA', 'CHINCHA', 'PUEBLO NUEVO'),
(3410, '97910211', 'ICA', 'CHINCHA', 'SAN JUAN DE YANAC'),
(3411, '100611112', 'JUNIN', 'HUANCAYO', 'CHUPURO'),
(3412, '100711113', 'JUNIN', 'HUANCAYO', 'EL TAMBO'),
(3413, '100811114', 'JUNIN', 'HUANCAYO', 'HUACRAPUQUIO'),
(3414, '100911116', 'JUNIN', 'HUANCAYO', 'HUALHUAS'),
(3415, '101011118', 'JUNIN', 'HUANCAYO', 'HUANCAN'),
(3416, '101111119', 'JUNIN', 'HUANCAYO', 'HUASICANCHA'),
(3417, '101211120', 'JUNIN', 'HUANCAYO', 'HUAYUCACHI'),
(3418, '101311121', 'JUNIN', 'HUANCAYO', 'INGENIO'),
(3419, '101411122', 'JUNIN', 'HUANCAYO', 'PARIAHUANCA'),
(3420, '101511123', 'JUNIN', 'HUANCAYO', 'PILCOMAYO'),
(3421, '101611124', 'JUNIN', 'HUANCAYO', 'PUCARA'),
(3422, '101711125', 'JUNIN', 'HUANCAYO', 'QUICHUAY'),
(3423, '101811126', 'JUNIN', 'HUANCAYO', 'QUILCAS'),
(3424, '101911127', 'JUNIN', 'HUANCAYO', 'SAN AGUSTIN'),
(3425, '102011128', 'JUNIN', 'HUANCAYO', 'SAN JERONIMO DE TUNAN'),
(3426, '102111131', 'JUNIN', 'HUANCAYO', 'STO DOMINGO DE ACOBAMBA'),
(3427, '102211132', 'JUNIN', 'HUANCAYO', 'SAÑO'),
(3428, '102311133', 'JUNIN', 'HUANCAYO', 'SAPALLANGA'),
(3429, '102411134', 'JUNIN', 'HUANCAYO', 'SICAYA'),
(3430, '102511136', 'JUNIN', 'HUANCAYO', 'VIQUES'),
(3431, '103511210', 'JUNIN', 'CONCEPCION', 'MATAHUASI'),
(3432, '103611211', 'JUNIN', 'CONCEPCION', 'MITO'),
(3433, '103711212', 'JUNIN', 'CONCEPCION', 'NUEVE DE JULIO'),
(3434, '103811213', 'JUNIN', 'CONCEPCION', 'ORCOTUNA'),
(3435, '103911214', 'JUNIN', 'CONCEPCION', 'STA ROSA DE OCOPA'),
(3436, '104011215', 'JUNIN', 'CONCEPCION', 'SAN JOSE DE QUERO'),
(3437, '105011310', 'JUNIN', 'JAUJA', 'JANJAILLO'),
(3438, '105111311', 'JUNIN', 'JAUJA', 'JULCAN'),
(3439, '105211312', 'JUNIN', 'JAUJA', 'LEONOR ORDOÑEZ'),
(3440, '105311313', 'JUNIN', 'JAUJA', 'LLOCLLAPAMPA'),
(3441, '105411314', 'JUNIN', 'JAUJA', 'MARCO'),
(3442, '105511315', 'JUNIN', 'JAUJA', 'MASMA'),
(3443, '105611316', 'JUNIN', 'JAUJA', 'MOLINOS'),
(3444, '105711317', 'JUNIN', 'JAUJA', 'MONOBAMBA'),
(3445, '105811318', 'JUNIN', 'JAUJA', 'MUQUI'),
(3446, '105911319', 'JUNIN', 'JAUJA', 'MUQUIYAUYO'),
(3447, '106011320', 'JUNIN', 'JAUJA', 'PACA'),
(3448, '106111321', 'JUNIN', 'JAUJA', 'PACCHA'),
(3449, '106211322', 'JUNIN', 'JAUJA', 'PANCAN'),
(3450, '106311323', 'JUNIN', 'JAUJA', 'PARCO'),
(3451, '106411324', 'JUNIN', 'JAUJA', 'POMACANCHA'),
(3452, '106511325', 'JUNIN', 'JAUJA', 'RICRAN'),
(3453, '106611326', 'JUNIN', 'JAUJA', 'SAN LORENZO'),
(3454, '106711327', 'JUNIN', 'JAUJA', 'SAN PEDRO DE CHUNAN'),
(3455, '106811328', 'JUNIN', 'JAUJA', 'SINCOS'),
(3456, '106911329', 'JUNIN', 'JAUJA', 'TUNAN MARCA'),
(3457, '107011330', 'JUNIN', 'JAUJA', 'YAULI'),
(3458, '107111331', 'JUNIN', 'JAUJA', 'CURICACA'),
(3459, '107211332', 'JUNIN', 'JAUJA', 'MASMA CHICCHE'),
(3460, '107311333', 'JUNIN', 'JAUJA', 'SAUSA'),
(3461, '107411334', 'JUNIN', 'JAUJA', 'YAUYOS'),
(3462, '109711610', 'JUNIN', 'YAULI', 'STA ROSA DE SACCO'),
(3463, '112912110', 'LA LIBERTAD', 'TRUJILLO', 'EL PORVENIR'),
(3464, '113012111', 'LA LIBERTAD', 'TRUJILLO', 'LA ESPERANZA'),
(3465, '113112112', 'LA LIBERTAD', 'TRUJILLO', 'FLORENCIA DE MORA'),
(3466, '115312410', 'LA LIBERTAD', 'OTUZCO', 'SINSICAP'),
(3467, '115412411', 'LA LIBERTAD', 'OTUZCO', 'USQUIL'),
(3468, '115512413', 'LA LIBERTAD', 'OTUZCO', 'MACHE'),
(3469, '117012610', 'LA LIBERTAD', 'PATAZ', 'PIAS'),
(3470, '117112611', 'LA LIBERTAD', 'PATAZ', 'TAURIJA'),
(3471, '117212612', 'LA LIBERTAD', 'PATAZ', 'URPAY'),
(3472, '117312613', 'LA LIBERTAD', 'PATAZ', 'SANTIAGO DE CHALLAS'),
(3473, '119312101', 'LA LIBERTAD', 'JULCAN', 'JULCAN'),
(3474, '119412102', 'LA LIBERTAD', 'JULCAN', 'CARABAMBA'),
(3475, '119512103', 'LA LIBERTAD', 'JULCAN', 'CALAMARCA'),
(3476, '119612104', 'LA LIBERTAD', 'JULCAN', 'HUASO'),
(3477, '119712111', 'LA LIBERTAD', 'GRAN CHIMU', 'CASCAS'),
(3478, '119812112', 'LA LIBERTAD', 'GRAN CHIMU', 'LUCMA'),
(3479, '119912113', 'LA LIBERTAD', 'GRAN CHIMU', 'MARMOT'),
(3480, '120012114', 'LA LIBERTAD', 'GRAN CHIMU', 'SAYAPULLO'),
(3481, '120112121', 'LA LIBERTAD', 'VIRU', 'VIRU'),
(3482, '120212122', 'LA LIBERTAD', 'VIRU', 'CHAO'),
(3483, '120312123', 'LA LIBERTAD', 'VIRU', 'GUADALUPITO'),
(3484, '121313110', 'LAMBAYEQUE', 'CHICLAYO', 'PIMENTEL'),
(3485, '121413111', 'LAMBAYEQUE', 'CHICLAYO', 'REQUE'),
(3486, '121513112', 'LAMBAYEQUE', 'CHICLAYO', 'JOSE LEONARDO ORTIZ'),
(3487, '121613113', 'LAMBAYEQUE', 'CHICLAYO', 'SANTA ROSA'),
(3488, '121713114', 'LAMBAYEQUE', 'CHICLAYO', 'SAÑA'),
(3489, '121813115', 'LAMBAYEQUE', 'CHICLAYO', 'LA VICTORIA'),
(3490, '121913116', 'LAMBAYEQUE', 'CHICLAYO', 'CAYALTI'),
(3491, '122013117', 'LAMBAYEQUE', 'CHICLAYO', 'PATAPO'),
(3492, '122113118', 'LAMBAYEQUE', 'CHICLAYO', 'POMALCA'),
(3493, '122213119', 'LAMBAYEQUE', 'CHICLAYO', 'PUCALA'),
(3494, '122313120', 'LAMBAYEQUE', 'CHICLAYO', 'TUMAN'),
(3495, '123913310', 'LAMBAYEQUE', 'LAMBAYEQUE', 'SALAS'),
(3496, '124013311', 'LAMBAYEQUE', 'LAMBAYEQUE', 'SAN JOSE'),
(3497, '124113312', 'LAMBAYEQUE', 'LAMBAYEQUE', 'TUCUME'),
(3498, '125114110', 'LIMA', 'LIMA', 'LA MOLINA'),
(3499, '125214111', 'LIMA', 'LIMA', 'LINCE'),
(3500, '125314112', 'LIMA', 'LIMA', 'LURIGANCHO'),
(3501, '125414113', 'LIMA', 'LIMA', 'LURIN'),
(3502, '125514114', 'LIMA', 'LIMA', 'MAGDALENA DEL MAR'),
(3503, '125614115', 'LIMA', 'LIMA', 'MIRAFLORES'),
(3504, '125714116', 'LIMA', 'LIMA', 'PACHACAMAC'),
(3505, '125814117', 'LIMA', 'LIMA', 'PUEBLO LIBRE'),
(3506, '125914118', 'LIMA', 'LIMA', 'PUCUSANA'),
(3507, '126014119', 'LIMA', 'LIMA', 'PUENTE PIEDRA'),
(3508, '126114120', 'LIMA', 'LIMA', 'PUNTA HERMOSA'),
(3509, '126214121', 'LIMA', 'LIMA', 'PUNTA NEGRA'),
(3510, '126314122', 'LIMA', 'LIMA', 'RIMAC'),
(3511, '126414123', 'LIMA', 'LIMA', 'SAN BARTOLO'),
(3512, '126514124', 'LIMA', 'LIMA', 'SAN ISIDRO'),
(3513, '126614125', 'LIMA', 'LIMA', 'BARRANCO'),
(3514, '126714126', 'LIMA', 'LIMA', 'SAN MARTIN DE PORRES'),
(3515, '126814127', 'LIMA', 'LIMA', 'SAN MIGUEL'),
(3516, '126914128', 'LIMA', 'LIMA', 'STA MARIA DEL MAR'),
(3517, '127014129', 'LIMA', 'LIMA', 'SANTA ROSA'),
(3518, '127114130', 'LIMA', 'LIMA', 'SANTIAGO DE SURCO'),
(3519, '127214131', 'LIMA', 'LIMA', 'SURQUILLO'),
(3520, '127314132', 'LIMA', 'LIMA', 'VILLA MARIA DEL TRIUNFO'),
(3521, '127414133', 'LIMA', 'LIMA', 'JESUS MARIA'),
(3522, '127514134', 'LIMA', 'LIMA', 'INDEPENDENCIA'),
(3523, '127614135', 'LIMA', 'LIMA', 'EL AGUSTINO'),
(3524, '127714136', 'LIMA', 'LIMA', 'SAN JUAN DE MIRAFLORES'),
(3525, '127814137', 'LIMA', 'LIMA', 'SAN JUAN DE LURIGANCHO'),
(3526, '127914138', 'LIMA', 'LIMA', 'SAN LUIS'),
(3527, '128014139', 'LIMA', 'LIMA', 'CIENEGUILLA'),
(3528, '128114140', 'LIMA', 'LIMA', 'SAN BORJA'),
(3529, '128214141', 'LIMA', 'LIMA', 'VILLA EL SALVADOR'),
(3530, '128314142', 'LIMA', 'LIMA', 'LOS OLIVOS'),
(3531, '128414143', 'LIMA', 'LIMA', 'SANTA ANITA'),
(3532, '130614410', 'LIMA', 'CAÑETE', 'PACARAN'),
(3533, '130714411', 'LIMA', 'CAÑETE', 'QUILMANA'),
(3534, '130814412', 'LIMA', 'CAÑETE', 'SAN ANTONIO'),
(3535, '130914413', 'LIMA', 'CAÑETE', 'SAN LUIS'),
(3536, '131014414', 'LIMA', 'CAÑETE', 'SANTA CRUZ DE FLORES'),
(3537, '131114415', 'LIMA', 'CAÑETE', 'ZUÑIGA'),
(3538, '131214416', 'LIMA', 'CAÑETE', 'ASIA'),
(3539, '132114511', 'LIMA', 'HUAURA', 'SANTA LEONOR'),
(3540, '132214512', 'LIMA', 'HUAURA', 'SANTA MARIA'),
(3541, '132314513', 'LIMA', 'HUAURA', 'SAYAN'),
(3542, '132414516', 'LIMA', 'HUAURA', 'VEGUETA'),
(3543, '133414610', 'LIMA', 'HUAROCHIRI', 'LAHUAYTAMBO'),
(3544, '133514611', 'LIMA', 'HUAROCHIRI', 'LANGA'),
(3545, '133614612', 'LIMA', 'HUAROCHIRI', 'MARIATANA'),
(3546, '133714613', 'LIMA', 'HUAROCHIRI', 'RICARDO PALMA'),
(3547, '133814614', 'LIMA', 'HUAROCHIRI', 'SAN ANDRES DE TUPICOCHA'),
(3548, '133914615', 'LIMA', 'HUAROCHIRI', 'SAN ANTONIO'),
(3549, '134014616', 'LIMA', 'HUAROCHIRI', 'SAN BARTOLOME'),
(3550, '134114617', 'LIMA', 'HUAROCHIRI', 'SAN DAMIAN'),
(3551, '134214618', 'LIMA', 'HUAROCHIRI', 'SANGALLAYA'),
(3552, '134314619', 'LIMA', 'HUAROCHIRI', 'SAN JUAN DE TANTARANCHE'),
(3553, '134414620', 'LIMA', 'HUAROCHIRI', 'SAN LORENZO DE QUINTI'),
(3554, '134514621', 'LIMA', 'HUAROCHIRI', 'SAN MATEO'),
(3555, '134614622', 'LIMA', 'HUAROCHIRI', 'SAN MATEO DE OTAO'),
(3556, '134714623', 'LIMA', 'HUAROCHIRI', 'SAN PEDRO DE HUANCAYRE'),
(3557, '134814624', 'LIMA', 'HUAROCHIRI', 'SANTA CRUZ DE COCACHACRA'),
(3558, '134914625', 'LIMA', 'HUAROCHIRI', 'SANTA EULALIA'),
(3559, '135014626', 'LIMA', 'HUAROCHIRI', 'SANTIAGO DE ANCHUCAYA'),
(3560, '135114627', 'LIMA', 'HUAROCHIRI', 'SANTIAGO DE TUNA'),
(3561, '135214628', 'LIMA', 'HUAROCHIRI', 'SANTO DOMINGO DE LOS OLLEROS'),
(3562, '135314629', 'LIMA', 'HUAROCHIRI', 'SURCO'),
(3563, '135414630', 'LIMA', 'HUAROCHIRI', 'HUACHUPAMPA'),
(3564, '135514631', 'LIMA', 'HUAROCHIRI', 'LARAOS'),
(3565, '135614632', 'LIMA', 'HUAROCHIRI', 'SAN JUAN DE IRIS'),
(3566, '136614710', 'LIMA', 'YAUYOS', 'CHOCOS'),
(3567, '136714711', 'LIMA', 'YAUYOS', 'HUAMPARA'),
(3568, '136814712', 'LIMA', 'YAUYOS', 'HUANCAYA'),
(3569, '136914713', 'LIMA', 'YAUYOS', 'HUANGASCAR'),
(3570, '137014714', 'LIMA', 'YAUYOS', 'HUANTAN'),
(3571, '137114715', 'LIMA', 'YAUYOS', 'HUAÑEC'),
(3572, '137214716', 'LIMA', 'YAUYOS', 'LARAOS'),
(3573, '137314717', 'LIMA', 'YAUYOS', 'LINCHA'),
(3574, '137414718', 'LIMA', 'YAUYOS', 'MIRAFLORES'),
(3575, '137514719', 'LIMA', 'YAUYOS', 'OMAS'),
(3576, '137614720', 'LIMA', 'YAUYOS', 'QUINCHES'),
(3577, '137714721', 'LIMA', 'YAUYOS', 'QUINOCAY'),
(3578, '137814722', 'LIMA', 'YAUYOS', 'SAN JOAQUIN'),
(3579, '137914723', 'LIMA', 'YAUYOS', 'SAN PEDRO DE PILAS'),
(3580, '138014724', 'LIMA', 'YAUYOS', 'TANTA'),
(3581, '138114725', 'LIMA', 'YAUYOS', 'TAURIPAMPA'),
(3582, '138214726', 'LIMA', 'YAUYOS', 'TUPE'),
(3583, '138314727', 'LIMA', 'YAUYOS', 'TOMAS'),
(3584, '138414728', 'LIMA', 'YAUYOS', 'VIÑAC'),
(3585, '138514729', 'LIMA', 'YAUYOS', 'VITIS'),
(3586, '138614730', 'LIMA', 'YAUYOS', 'HONGOS'),
(3587, '138714731', 'LIMA', 'YAUYOS', 'MADEAN'),
(3588, '138814732', 'LIMA', 'YAUYOS', 'PUTINZA'),
(3589, '138914733', 'LIMA', 'YAUYOS', 'CATAHUASI'),
(3590, '139914810', 'LIMA', 'HUARAL', 'VEINTISIETE DE NOVIEMBRE'),
(3591, '140014811', 'LIMA', 'HUARAL', 'STA CRUZ DE ANDAMARCA'),
(3592, '140114812', 'LIMA', 'HUARAL', 'SUMBILCA'),
(3593, '140714101', 'LIMA', 'OYON', 'OYON'),
(3594, '140814102', 'LIMA', 'OYON', 'NAVAN'),
(3595, '140914103', 'LIMA', 'OYON', 'CAUJUL'),
(3596, '141014104', 'LIMA', 'OYON', 'ANDAJES'),
(3597, '141114105', 'LIMA', 'OYON', 'PACHANGARA'),
(3598, '141214106', 'LIMA', 'OYON', 'COCHAMARCA'),
(3599, '142115110', 'LORETO', 'MAYNAS', 'INDIANA'),
(3600, '142215111', 'LORETO', 'MAYNAS', 'PUNCHANA'),
(3601, '142315112', 'LORETO', 'MAYNAS', 'BELEN'),
(3602, '142415113', 'LORETO', 'MAYNAS', 'SAN JUAN BAUTISTA'),
(3603, '142515114', 'LORETO', 'MAYNAS', 'TNTE MANUEL CLAVERO'),
(3604, '143015210', 'LORETO', 'ALTO AMAZONAS', 'SANTA CRUZ'),
(3605, '143115211', 'LORETO', 'ALTO AMAZONAS', 'TNTE CESAR LOPEZ ROJAS'),
(3606, '144615410', 'LORETO', 'REQUENA', 'JENARO HERRERA'),
(3607, '144715411', 'LORETO', 'REQUENA', 'YAQUERANA'),
(3608, '149017210', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'UBINAS'),
(3609, '149117211', 'MOQUEGUA', 'GENERAL SANCHEZ CERRO', 'YUNGA'),
(3610, '150318110', 'PASCO', 'PASCO', 'SIMON BOLIVAR'),
(3611, '150418111', 'PASCO', 'PASCO', 'TICLACAYAN'),
(3612, '150518112', 'PASCO', 'PASCO', 'TINYAHUARCO'),
(3613, '150618113', 'PASCO', 'PASCO', 'VICCO'),
(3614, '150718114', 'PASCO', 'PASCO', 'YANACANCHA'),
(3615, '153019113', 'PIURA', 'PIURA', 'CURA MORI'),
(3616, '153119114', 'PIURA', 'PIURA', 'EL TALLAN'),
(3617, '154119210', 'PIURA', 'AYABACA', 'PAIMAS'),
(3618, '155919410', 'PIURA', 'MORROPON', 'SAN JUAN DE BIGOTE'),
(3619, '159620110', 'PUNO', 'PUNO', 'PICHACANI'),
(3620, '159720111', 'PUNO', 'PUNO', 'SAN ANTONIO'),
(3621, '159820112', 'PUNO', 'PUNO', 'TIQUILLACA'),
(3622, '159920113', 'PUNO', 'PUNO', 'VILQUE'),
(3623, '160020114', 'PUNO', 'PUNO', 'PLATERIA'),
(3624, '160120115', 'PUNO', 'PUNO', 'AMANTANI'),
(3625, '161020210', 'PUNO', 'AZANGARO', 'POTONI'),
(3626, '161120212', 'PUNO', 'AZANGARO', 'SAMAN'),
(3627, '161220213', 'PUNO', 'AZANGARO', 'SAN ANTON'),
(3628, '161320214', 'PUNO', 'AZANGARO', 'SAN JOSE'),
(3629, '161420215', 'PUNO', 'AZANGARO', 'SAN JUAN DE SALINAS'),
(3630, '161520216', 'PUNO', 'AZANGARO', 'STGO DE PUPUJA'),
(3631, '161620217', 'PUNO', 'AZANGARO', 'TIRAPATA'),
(3632, '162620310', 'PUNO', 'CARABAYA', 'USICAYOS'),
(3633, '163220410', 'PUNO', 'CHUCUITO', 'ZEPITA'),
(3634, '163320412', 'PUNO', 'CHUCUITO', 'KELLUYO'),
(3635, '164120511', 'PUNO', 'HUANCANE', 'HUATASANI'),
(3636, '165120610', 'PUNO', 'LAMPA', 'VILAVILA'),
(3637, '166820810', 'PUNO', 'SANDIA', 'YANAHUAYA'),
(3638, '166920811', 'PUNO', 'SANDIA', 'ALTO INAMBARI'),
(3639, '167020812', 'PUNO', 'SANDIA', 'SAN PEDRO DE PUTINA PUNCO'),
(3640, '167520101', 'PUNO', 'YUNGUYO', 'YUNGUYO'),
(3641, '167620102', 'PUNO', 'YUNGUYO', 'UNICACHI'),
(3642, '167720103', 'PUNO', 'YUNGUYO', 'ANAPIA'),
(3643, '167820104', 'PUNO', 'YUNGUYO', 'COPANI'),
(3644, '167920105', 'PUNO', 'YUNGUYO', 'CUTURAPI'),
(3645, '168020106', 'PUNO', 'YUNGUYO', 'OLLARAYA'),
(3646, '168120107', 'PUNO', 'YUNGUYO', 'TINICACHI'),
(3647, '168220111', 'PUNO', 'SAN ANTONIO DE PUTINA', 'PUTINA'),
(3648, '168320112', 'PUNO', 'SAN ANTONIO DE PUTINA', 'PEDRO VILCA APAZA'),
(3649, '168420113', 'PUNO', 'SAN ANTONIO DE PUTINA', 'QUILCA PUNCU'),
(3650, '168520114', 'PUNO', 'SAN ANTONIO DE PUTINA', 'ANANEA'),
(3651, '168620115', 'PUNO', 'SAN ANTONIO DE PUTINA', 'SINA'),
(3652, '168720121', 'PUNO', 'EL COLLAO', 'ILAVE'),
(3653, '168820122', 'PUNO', 'EL COLLAO', 'PILCUYO'),
(3654, '168920123', 'PUNO', 'EL COLLAO', 'SANTA ROSA'),
(3655, '169020124', 'PUNO', 'EL COLLAO', 'CAPASO'),
(3656, '169120125', 'PUNO', 'EL COLLAO', 'CONDURIRI'),
(3657, '169220131', 'PUNO', 'MOHO', 'MOHO'),
(3658, '169320132', 'PUNO', 'MOHO', 'CONIMA'),
(3659, '169420133', 'PUNO', 'MOHO', 'TILALI'),
(3660, '169520134', 'PUNO', 'MOHO', 'HUAYRAPATA'),
(3661, '171421311', 'SAN MARTIN', 'LAMAS', 'SHANAO'),
(3662, '171521313', 'SAN MARTIN', 'LAMAS', 'TABALOSOS'),
(3663, '171621314', 'SAN MARTIN', 'LAMAS', 'ZAPATERO'),
(3664, '171721315', 'SAN MARTIN', 'LAMAS', 'ALONSO DE ALVARADO'),
(3665, '171821316', 'SAN MARTIN', 'LAMAS', 'SAN ROQUE DE CUMBAZA'),
(3666, '174021610', 'SAN MARTIN', 'SAN MARTIN', 'JUAN GUERRA'),
(3667, '174121611', 'SAN MARTIN', 'SAN MARTIN', 'MORALES'),
(3668, '174221612', 'SAN MARTIN', 'SAN MARTIN', 'PAPAPLAYA'),
(3669, '174321616', 'SAN MARTIN', 'SAN MARTIN', 'SAN ANTONIO'),
(3670, '174421619', 'SAN MARTIN', 'SAN MARTIN', 'SAUCE'),
(3671, '174521620', 'SAN MARTIN', 'SAN MARTIN', 'SHAPAJA'),
(3672, '174621621', 'SAN MARTIN', 'SAN MARTIN', 'LA BANDA DE SHILCAYO'),
(3673, '176721910', 'SAN MARTIN', 'PICOTA', 'SHAMBOYACU'),
(3674, '176821101', 'SAN MARTIN', 'EL DORADO', 'SAN JOSE DE SISA'),
(3675, '176921102', 'SAN MARTIN', 'EL DORADO', 'AGUA BLANCA'),
(3676, '177021103', 'SAN MARTIN', 'EL DORADO', 'SHATOJA'),
(3677, '177121104', 'SAN MARTIN', 'EL DORADO', 'SAN MARTIN'),
(3678, '177221105', 'SAN MARTIN', 'EL DORADO', 'SANTA ROSA'),
(3679, '177922110', 'TACNA', 'TACNA', 'SAMA'),
(3680, '178022111', 'TACNA', 'TACNA', 'ALTO DE LA ALIANZA'),
(3681, '178122112', 'TACNA', 'TACNA', 'CIUDAD NUEVA'),
(3682, '178222113', 'TACNA', 'TACNA', 'CORONEL GREGORIO ALBARRACIN L.'),
(3683, '178722210', 'TACNA', 'TARATA', 'SITAJARA'),
(3684, '178822211', 'TACNA', 'TARATA', 'SUSAPAYA'),
(3685, '178922212', 'TACNA', 'TARATA', 'TARUCACHI'),
(3686, '179022213', 'TACNA', 'TARATA', 'TICACO'),
(3687, '179022218', 'LA LIBERTAD', 'OTUZCO', 'CHARAT-CALLANCAS'),
(3688, '179022219', 'LIMA', 'CALLAO', 'BELLAVISTA'),
(3689, '179022220', 'LIMA', 'CALLAO', 'CARMEN DE LA LEGUA REYNOSO'),
(3690, '179022221', 'LIMA', 'CALLAO', 'LA PERLA'),
(3691, '179022222', 'LIMA', 'CALLAO', 'LA PUNTA'),
(3692, '179022223', 'LIMA', 'CALLAO', 'VENTANILLA'),
(3693, '179022224', 'APURIMAC', 'ANDAHUAYLAS', 'JOSE MARIA ARGUEDAS'),
(3694, '179022225', 'APURIMAC', 'CHINCHEROS', 'ROCCHACC'),
(3695, '179022226', 'APURIMAC', 'CHINCHEROS', 'PORVENIR'),
(3696, '179022227', 'CUSCO', 'CUSCO', 'MANCOMUNIDAD VALLE SUR CUSCO'),
(3697, '179022228', 'HUANUCO', 'HUANUCO', 'YACUS'),
(3698, '179022229', 'PIURA', 'PIURA', '26 DE OCTUBRE'),
(3699, '179022230', 'HUANCAVELICA', 'CHURCAMPA', 'COSME'),
(3700, '179022231', 'PASCO', 'OXAPAMPA', 'CONSTITUCION');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuarios` int(11) NOT NULL,
  `roles_idroles` int(11) NOT NULL,
  `areas_idareas` int(11) NOT NULL,
  `nombres` varchar(250) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `sexo` char(10) DEFAULT NULL,
  `idtipo_identificacion` int(11) NOT NULL,
  `nro_identificacion` varchar(100) DEFAULT NULL,
  `idtipo_licencia` int(11) NOT NULL,
  `nro_licencia` varchar(100) DEFAULT NULL,
  `direccion_uno` varchar(250) DEFAULT NULL,
  `direccion_dos` varchar(250) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `codigo` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `clave` varchar(45) DEFAULT NULL,
  `prioridad` int(11) DEFAULT NULL,
  `estado_usuario` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuarios`, `roles_idroles`, `areas_idareas`, `nombres`, `apellidos`, `sexo`, `idtipo_identificacion`, `nro_identificacion`, `idtipo_licencia`, `nro_licencia`, `direccion_uno`, `direccion_dos`, `telefono`, `email`, `codigo`, `usuario`, `clave`, `prioridad`, `estado_usuario`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 1, 4, 'Jose Claudio', 'Velasquez Boyer', 'M', 1, '43764109', 1, '0000', 'Calle Los Zorzales 160', NULL, '967994927', 'informatica1@sierraexportadora.gob.pe', 'PERS0000398', 'jvelasquez', '', 1, 1, '2017-05-11 10:01:34', 'jvelasquez', '2017-08-24 17:58:24', ''),
(2, 4, 5, 'Fernando joaquin                   ', 'Luyo Chung', 'M', 1, '0', 1, '0', 'Av. Javier Prado Este Nro. 3505 Dpto. 301', NULL, '---', 'fluyo@sierraexportadora.gob.pe', 'PERS0000176', 'fluyo', 'Joaquin005fl', 2, 1, '2017-07-25 11:34:29', 'jvelasquez', '2017-07-25 17:09:21', ''),
(3, 1, 5, 'Cristian                           ', 'Malpartida Huarcaya', 'M', 1, '0', 1, '0', 'Sec. Alfonso Ugarte Mz I-1 Lote 15- Pamplona Alta', NULL, '993585212', 'cmalpartida@sierraexportadora.gob.pe', 'PERS0000268', 'cmalpartida', '123456', 2, 1, '2017-07-25 11:34:40', 'jvelasquez', '2017-08-09 16:40:00', ''),
(4, 4, 5, 'Jaime Medardo                      ', 'Flores Vilchez', 'M', 1, '0', 1, '0', 'sector 2 - grupo 4 mz a lote 19', NULL, '995666063', 'jflores@sierraexportadora.gob.pe', 'PERS0000264', 'informatica3', '', 2, 0, '2017-07-25 11:35:07', 'jvelasquez', '2017-08-24 17:13:41', ''),
(5, 1, 5, 'Dante Amnes                        ', 'Ortiz Tello', 'M', 1, '0', 1, '0', 'Calles Las Higueras NÂº 274 Dpto. 302 - Resid. Monterrico â€“ La Molina Lima', NULL, '949979080', 'dortiz@sierraexportadora.gob.pe', 'PERS0000208', 'dortiz', 'Dortiz', 2, 1, '2017-07-31 15:11:40', 'jvelasquez', '2017-08-23 18:12:06', ''),
(6, 4, 5, 'Jorge luis                         ', 'Feliciano Amado', 'M', 1, '0', 1, '0', 'Pomabamba 374-201', NULL, '975521992', 'aproducir@gmail.com', 'PERS0000234', 'jfeliciano', 'fiorella', 2, 1, '2017-07-31 15:45:04', 'jvelasquez', NULL, NULL),
(7, 4, 5, 'Renan sebastian                    ', 'Alfaro Quispe', 'M', 1, '0', 1, '0', 'Calle Roque SaenzpeÃ±a NÂº 455 - Urb. Los Ficus', NULL, '988040757', 'ralfaro@sierraexportadora.gob.pe', 'PERS0000110', 'ralfaro', 'renan', 2, 1, '2017-08-03 13:31:21', 'jvelasquez', NULL, NULL),
(8, 4, 5, 'Luis alberto                       ', 'Alfaro Garfias', 'M', 1, '0', 1, '0', 'Calle Verdi NÂº 199, Dpto. NÂº 502', NULL, '998552823', '----', 'PERS0000175', 'lalfaro', 'A00752344a', 2, 1, '2017-08-03 13:31:27', 'jvelasquez', NULL, NULL),
(9, 4, 5, 'OMAR ARMANDO                       ', 'MORENO LEVEAU', 'M', 1, '0', 1, '0', 'PUNO NRO. 245 DPTO. 211 (P2) LIMA - LIMA - LIMA', NULL, '-', 'omoreno@sierraexportadora.gob.pe', 'PERS0000277', 'omoreno', 'omorenol', 2, 1, '2017-08-03 13:33:35', 'jvelasquez', NULL, NULL),
(10, 4, 5, 'Guillermo jose                     ', 'Parodi Macedo', 'M', 1, '0', 1, '0', 'Calle Mangos 440 Int. 9B Urb. El Golf', NULL, '962895444', 'gemojoe@yahoo.es', 'PERS0000218', 'gparodi', 'antarki47', 2, 1, '2017-08-03 13:33:41', 'jvelasquez', NULL, NULL),
(11, 4, 5, 'Veronica magaly                    ', 'Pezantes Palomino', 'F', 1, '0', 1, '0', 'calle Guillermo Geraldino 122 Urb Sta. Luzmila', NULL, '991828696', 'veca26_9@hotmail.com', 'PERS0000207', 'vpezantes', '1125MAGALYfer', 2, 1, '2017-08-03 13:33:55', 'jvelasquez', NULL, NULL),
(12, 4, 5, 'Vicente Antonio                    ', 'Zegarra Suarez', 'M', 1, '0', 1, '0', 'Jr.Pablo Risso 551 - Urbanizacion San Pablo', NULL, '964643312', 'vicente4560@hotmail.com', 'PERS0000327', 'vzegarra', 'roxanitaZ18', 2, 1, '2017-08-03 13:43:54', 'jvelasquez', NULL, NULL),
(13, 4, 5, 'Elmer Radich                       ', 'Ventura Flores', 'M', 1, '0', 1, '0', 'JR. VILLASOL PISTO 4to, BARRIO VALLECITO', NULL, '960513508', 'ventura.er@gmail.com', 'PERS0000391', 'eventura', '*_030029', 2, 1, '2017-08-03 13:44:00', 'jvelasquez', NULL, NULL),
(14, 4, 5, 'Alfonso felipe                     ', 'Velasquez Tuesta', 'M', 1, '0', 1, '0', 'Av.  Alameda de la Floresta NÂº 163, Urb. Chacarilla', NULL, '993535877', 'alfonso.velasquez@sierraexportadora.gob.pe', 'PERS0000159', 'alfonso.velasquez', 'Alfonso14', 2, 1, '2017-08-03 13:44:03', 'jvelasquez', NULL, NULL),
(15, 4, 5, 'Hugo Jorge                         ', 'Valdez Osorio', 'M', 1, '0', 1, '0', 'Calle Raul Vera Collahuaso NÂ° 163 Urb. Humboldt', NULL, '998131291', 'huval_per@yahoo.com', 'PERS0000323', 'hvaldez', '86241105xxIV*', 2, 1, '2017-08-03 13:44:06', 'jvelasquez', NULL, NULL),
(16, 4, 5, 'Mirtha Yvonne                      ', 'Vasquez Chavez', 'F', 1, '0', 1, '0', 'CALLE SALAMANCA 201 DPTO. 402, SAN ISIDRO', NULL, '992523008	', 'yvonnepiscis@gmail.com', 'PERS0000337', 'mvasquez', 'mvasquez72', 2, 1, '2017-08-03 13:44:08', 'jvelasquez', NULL, NULL),
(17, 4, 5, 'Esteban                            ', 'SullÃ³n Nizama', 'M', 1, '0', 1, '0', 'Jr. Chiclayo NÂº 165 - Canchaque.', NULL, '073-968887036', 'esullon@sierraexportadora.gob.pe', 'PERS0000096', 'esullon', 'Esullon', 2, 1, '2017-08-03 13:44:12', 'jvelasquez', NULL, NULL),
(18, 4, 5, 'Julio Cesar                        ', 'Sipan Velasquez', 'M', 1, '0', 1, '0', 'AV. PASEO DE LA REPUBLICA 6255, DPTO. 301, MIRAFLORES	', NULL, '988583999', 'jsipan@sierraexportadora.gob.pe	', 'PERS0000363', 'jsipan', 'juli7777', 2, 1, '2017-08-03 13:44:17', 'jvelasquez', NULL, NULL),
(19, 4, 5, 'Elisa Victoria                     ', 'Alonso Sanchez', 'F', 1, '0', 1, '0', 'Residencial San Felipe torre 4C departamento 903', NULL, '938429889', 'elisa.victoria.as@gmail.com	', 'PERS0000381', 'ealonso', 'ealonso2017', 2, 1, '2017-08-03 13:44:55', 'jvelasquez', NULL, NULL),
(20, 4, 5, 'Cindy Jael                         ', 'Arancibia Salinas', 'F', 1, '0', 1, '0', 'AV. ALFONSO UGARTE NÂº 1391', NULL, '#984579316	', 'yare_cindy@hotmail.com', 'PERS0000321', 'carancibia', 'Yare123*', 2, 1, '2017-08-03 13:44:59', 'jvelasquez', NULL, NULL),
(21, 4, 5, 'Sandra Pamela                      ', 'Aranda Holff', 'F', 1, '0', 1, '0', '-', NULL, '990826970	', '-', 'PERS0000373', 'saranda', 'saranda2016', 2, 1, '2017-08-03 13:45:02', 'jvelasquez', NULL, NULL),
(22, 4, 5, 'Lucy esperanza                     ', 'Arias Alarcon', 'F', 1, '0', 1, '0', 'Calle Naturaleza NÂº103 Urb. San Luis - Chiclayo', NULL, '979133228', 'larias@sierraexportadora.gob.pe', 'PERS0000229', 'larias', '@gosto4r3x', 2, 1, '2017-08-03 13:45:06', 'jvelasquez', NULL, NULL),
(23, 4, 5, 'FLORA                              ', 'ARRIETA ASCARATE DE JARA', 'F', 1, '0', 1, '0', 'CALLE HUASTA 4857 CONDOMINIO PARQUE  LOS OLIVOS DPTO. E - 105', NULL, '998000941', 'floricienta3010@hotmail.com', 'PERS0000382', 'FARRIETA', 'flora1511', 2, 1, '2017-08-03 13:45:10', 'jvelasquez', NULL, NULL),
(24, 4, 5, 'Andrea del Pilar                   ', 'Baldeon Abantes', 'F', 1, '0', 1, '0', '-', NULL, '-', 'abaldeon@sierraexportadora.gob.pe', 'PERS0000366', 'abaldeon', 'abaldeon', 2, 1, '2017-08-03 13:45:13', 'jvelasquez', NULL, NULL),
(25, 4, 5, 'Randy Willard                      ', 'Barreto AlegrÃ­a', 'M', 1, '0', 1, '0', 'Jr. PrÃ³ceres 363', NULL, '999600115', 'barretorandy@yahoo.com', 'PERS0000273', 'rbarreto', 'rbarreto%2017', 2, 1, '2017-08-03 13:45:17', 'jvelasquez', NULL, NULL),
(26, 4, 5, 'MARIA VICTORIA NOEMI               ', 'BEDOYA WALLACE', 'F', 1, '0', 1, '0', 'CALLE JUAN DE LA FUENTE 541', NULL, '998072645', 'vbedoya@yahoo.com', 'PERS0000389', 'mbedoya', 'vickita2602', 2, 1, '2017-08-03 13:45:20', 'jvelasquez', NULL, NULL),
(27, 4, 5, 'SAMANTHA NICOLLE                   ', 'BISETTI RIVERA', 'F', 1, '0', 1, '0', 'JIRON COSME BUENO 166 - SALAMANCA', NULL, '922203647', 'samanthabisetti@hotmail.com', 'PERS0000384', 'sbisetti', 'bisettirivera1', 2, 1, '2017-08-03 13:45:23', 'jvelasquez', NULL, NULL),
(28, 4, 5, 'FIORELLA TATIANA                   ', 'BONILLA ALIAGA', 'F', 1, '0', 1, '0', 'AV. EL PARQUE 529', NULL, '996475126', 'tiana_fba@yahoo.com', 'PERS0000328', 'fbonilla', 'Fbonilla', 2, 1, '2017-08-03 13:45:25', 'jvelasquez', NULL, NULL),
(29, 4, 5, 'Maria Elena                        ', 'Borda Gudiel', 'F', 1, '0', 1, '0', 'Jr. Mariscal Gamarra NÂ° 205', NULL, '974799308', 'megudiel@hotmail.com', 'PERS0000280', 'mborda', 'borda14', 2, 1, '2017-08-03 13:45:30', 'jvelasquez', NULL, NULL),
(30, 4, 5, 'Angelo Paolo                       ', 'Caballero Canales', 'M', 1, '0', 1, '0', '-', NULL, '-', '-', 'PERS0000346', 'acaballero', 'CAMUCHA2015', 2, 1, '2017-08-03 13:45:34', 'jvelasquez', NULL, NULL),
(31, 4, 5, 'Jean Yves                          ', 'Cadalen -', 'M', 1, '0', 1, '0', 'LA PERCHE 24500 EYMET FRANCE', NULL, '-', 'registro@sierraexportadora.gob.pe', 'PERS0000334', 'jcadalen', 'jcadalen', 2, 1, '2017-08-03 13:45:37', 'jvelasquez', NULL, NULL),
(32, 4, 5, 'Carlos Alfonso                     ', 'Calderon UreÃ±a', 'M', 1, '0', 1, '0', 'Calle Las Gaviotas #338 Urb. San JosÃ©', NULL, '995006804	', 'ccalderon@sierraexportadora.gob.pe', 'PERS0000358', 'ccalderon', 'ccalderon55', 2, 1, '2017-08-03 13:45:40', 'jvelasquez', NULL, NULL),
(33, 5, 5, 'Miguel Antonio                     ', 'Canepa Carlo', 'M', 1, '0', 1, '0', 'AV SEBASTIAN LORENTE 534 CERCADO DE LIMA', NULL, '945 712 559', 'mikecanepa@gmail.com', 'PERS0000275', 'mcanepa', 'mcanepa', 2, 1, '2017-08-03 13:45:43', 'jvelasquez', '2017-08-11 10:39:40', ''),
(34, 4, 5, 'Gina Deysi                         ', 'Carbajal Mallqui', 'M', 1, '0', 1, '0', 'Calle Ingeniero GraÃ±a 167 - Torres de Limatambo', NULL, '949254868', 'gcarbajal@sierraexportadora.gob.pe', 'PERS0000298', 'gcarbajal', 'carbajal2014', 2, 1, '2017-08-03 13:45:46', 'jvelasquez', NULL, NULL),
(35, 4, 5, 'Julio                              ', 'Caroli Acuy ', 'M', 1, '0', 1, '0', 'Nicanor Arteaga NÂº 639', NULL, '995040028', 'jcaroli05@hotmail.com', 'PERS0000230', 'jcaroli', 'JCA15061955', 2, 1, '2017-08-03 13:45:49', 'jvelasquez', NULL, NULL),
(36, 4, 5, 'Victor Andres                      ', 'Castellano De los Santos', 'M', 1, '0', 1, '0', 'Mones Quintela 1663, Bella UniÃ³n, Artigas, Uruguay.', NULL, '598-4779-3404', 'castellanovic@msn.com', 'PERS0000326', 'vcastellano', 'vcastellano', 2, 1, '2017-08-03 13:45:53', 'jvelasquez', NULL, NULL),
(37, 4, 5, 'Juan adalberto                     ', 'Castillo Oca&ntilde;a', 'M', 1, '0', 1, '0', 'Maria Goretty Mz. K - Lote 11 Castilla', NULL, '073-969649695', 'jaco1_05@hotmail.com', 'PERS0000127', 'jcastillo', 'castillo', 2, 1, '2017-08-03 13:45:56', 'jvelasquez', NULL, NULL),
(38, 4, 5, 'Erick Leonardo                     ', 'cayo Gutierrez', 'M', 1, '0', 1, '0', 'av san felipe 687', NULL, '997228306', 'erickcayo@gmail.com', 'PERS0000368', 'ecayo', 'ecayo76', 2, 1, '2017-08-03 13:45:58', 'jvelasquez', NULL, NULL),
(39, 4, 5, 'nilo                               ', 'ccoicca ccorahua', 'M', 1, '0', 1, '0', 'jr. 28 de julio 241', NULL, '983773617	', 'nilocc1@hotmail.com', 'PERS0000387', 'nccoicca', '10685268', 2, 1, '2017-08-03 13:46:00', 'jvelasquez', NULL, NULL),
(40, 4, 5, 'Andres William                     ', 'Chavesta Guerrero', 'M', 1, '0', 1, '0', 'Pueblo Joven El Monserrate Mz â€œCâ€ Lt. 01 / Trujillo â€“ Trujillo - La Libertad', NULL, '-', 'william_chg@live.com', 'PERS0000406', 'achavesta', 'Achavesta', 2, 1, '2017-08-03 13:46:02', 'jvelasquez', NULL, NULL),
(41, 4, 5, 'Maria Manoli                       ', 'Chia Chong', 'F', 1, '0', 1, '0', 'JR. CARLOS OQUENDO DE AMAT NÂ°172, URB. LA ARBOLEDA DE MARANGA - SAN MIGUEL', NULL, '950950402', 'manolichong1983@hotmail.com', 'PERS0000352', 'mchia', 'mchia81', 2, 1, '2017-08-03 13:46:05', 'jvelasquez', NULL, NULL),
(42, 4, 5, 'Alexander manuel                   ', 'Chire Bernedo', 'M', 1, '0', 1, '0', 'Calle Miguel Grau N167207 - Urb. Cerro Salaverry 	', NULL, '959859344', 'achire@sierraexportadora.gob.pe', 'PERS0000245', 'achire', 'chire5$', 2, 1, '2017-08-03 13:46:09', 'jvelasquez', NULL, NULL),
(43, 4, 5, 'Jose Antonio                       ', 'Chiu Mayuri', 'M', 1, '0', 1, '0', 'Av. Estados unidos 998', NULL, '979662894', 'jachm@hotmail.com', 'PERS0000329', 'jchiu', 'jantoniochm4$', 2, 1, '2017-08-03 13:46:13', 'jvelasquez', NULL, NULL),
(44, 4, 5, 'Landy Siumey                       ', 'Chong Bartra', 'F', 1, '0', 1, '0', 'Mz H  Lt 12 Urb. El Totoral II', NULL, '999941788', 'lchong@sierraexportadora.gob.pe', 'PERS0000319', 'lchong', 'lchong88', 2, 1, '2017-08-03 13:46:19', 'jvelasquez', NULL, NULL),
(45, 4, 5, 'Alejandro miguel                   ', 'Chunga Chiarella', 'M', 1, '0', 1, '0', 'ave nicolas de pierola NRO 343 int \"C\" URB San Ignacio', NULL, '974639443', 'janoch10@gmail.com', 'PERS0000255', 'achunga', 'ale&=1', 2, 1, '2017-08-03 13:46:23', 'jvelasquez', NULL, NULL),
(46, 4, 5, 'Virginia                           ', 'Condo Ortega', 'F', 1, '0', 1, '0', 'Calle Manuel Ferreyros Mz. C lote 17', NULL, '993535880', 'vcondo@sierraexportadora.gob.pe', 'PERS0000320', 'vcondo', 'virginia', 2, 1, '2017-08-03 13:46:25', 'jvelasquez', NULL, NULL),
(47, 4, 5, 'Miguel Francisco                   ', 'Cordano Rodriguez', 'M', 1, '0', 1, '0', 'Av. Guardia Chalaca 996', NULL, '993535915', 'miguel.cordano@sierraexportadora.gob.pe', 'PERS0000158', 'miguel.cordano', 'Ruc25554491', 2, 1, '2017-08-03 13:46:29', 'jvelasquez', NULL, NULL),
(48, 4, 5, 'Victor Guillermo                   ', 'Cortez Zapata', 'M', 1, '0', 1, '0', 'Los Tulipanes nÂ° 150; Lima 32', NULL, '988150359', 'vcortez@sierraexportadora.gob.pe', 'PERS0000379', 'vcortez', 'Vin198901$', 2, 1, '2017-08-03 13:46:32', 'jvelasquez', NULL, NULL),
(49, 4, 5, 'Karlos Augusto                     ', 'Cussianovich Aguirre', 'M', 1, '0', 1, '0', '-', NULL, '-', '-', 'PERS0000400', 'destilados', 'temporal_destilados', 2, 1, '2017-08-03 13:46:36', 'jvelasquez', NULL, NULL),
(50, 4, 5, 'Yolanda                            ', 'DamiÃ¡n Gonzales', 'F', 1, '0', 1, '0', 'Madrid 371 Dep 701 Miraflores', NULL, '978918109', 'ydgvasquez05@hotmail.com', 'PERS0000205', 'ydamian', 'claudina100pre', 2, 1, '2017-08-03 13:46:41', 'jvelasquez', NULL, NULL),
(51, 4, 5, 'Margarita                          ', 'Diaz Tapia', 'F', 1, '0', 1, '0', 'Jr. Union 916', NULL, '995806434', 'margareth205@hotmail.com', 'PERS0000197', 'mdiaz', 'Ftephano', 2, 1, '2017-08-03 13:46:44', 'jvelasquez', NULL, NULL),
(52, 4, 5, 'Pamela Francis                     ', 'Diaz HuamanÃ±ahui', 'F', 1, '0', 1, '0', 'jose leal 1073 lince', NULL, '987105927', 'pameladiazgp@gmail.com', 'PERS0000386', 'dpnpp1', 'Temporal2017', 2, 1, '2017-08-03 13:46:47', 'jvelasquez', NULL, NULL),
(53, 4, 5, 'Martin                             ', 'Falcon Padilla', 'M', 1, '0', 1, '0', '-', NULL, '-', 'mfalcon@sierraexportadora.gob.pe', 'PERS0000388', 'mfalcon', 'Mfalcon', 2, 1, '2017-08-03 13:46:49', 'jvelasquez', NULL, NULL),
(54, 4, 5, 'Cesar                              ', 'Fernandez Fernandez', 'M', 1, '0', 1, '0', '-', NULL, '-', 'visitante@sierraexportadora.gob.pe', 'PERS0000325', 'cfernandez', 'cfernandez', 2, 1, '2017-08-03 13:46:54', 'jvelasquez', NULL, NULL),
(55, 4, 5, 'Hugo Augusto                       ', 'Flores Echegaray', 'M', 1, '0', 1, '0', 'Jr. Chota 1444', NULL, '988133621', 'hugo.flores88@outlook.com.pe', 'PERS0000291', 'hflores', 'Sierra$$88', 2, 1, '2017-08-03 13:46:57', 'jvelasquez', NULL, NULL),
(56, 4, 5, 'Roxana                             ', 'Garay Castillo', 'F', 1, '0', 1, '0', 'av constelacion 2549 urb santa elizabeth', NULL, '993293270', 'oppm2@sierraexportadora.gob.pe', 'PERS0000374', 'oppm2', 'cendoc_1978', 2, 1, '2017-08-03 13:47:01', 'jvelasquez', NULL, NULL),
(57, 4, 5, 'katia Paola                        ', 'Goicochea Toribio', 'M', 1, '0', 1, '0', 'Urb. Manzanilla Block G 27 Dpto 205 - Lima', NULL, '963544747	', 'katia.goicochea.toribio@gmail.com', 'PERS0000403', 'oga2', 'temporal2017', 2, 1, '2017-08-03 13:47:03', 'jvelasquez', NULL, NULL),
(58, 5, 5, 'Yanco Edwin                        ', 'Gonzales De la PeÃ±a', 'M', 1, '0', 1, '0', 'Asoc. San Francisco de Asis Mz L - Lt 10', NULL, '965727572', 'yanco_edwin67@hotmail.com', 'PERS0000395', 'ygonzales', 'Secreto2017', 2, 1, '2017-08-03 13:47:06', 'jvelasquez', '2017-08-11 10:40:10', ''),
(59, 4, 5, 'Vanessa anais                      ', 'Gonzales Boyer', 'F', 1, '0', 1, '0', 'Calle Alcanfores 1132, depto 302', NULL, '956341592', 'vangonzal@hotmail.com', 'PERS0000209', 'vgonzales', 'Quechua2013', 2, 1, '2017-08-03 13:47:09', 'jvelasquez', NULL, NULL),
(60, 4, 5, 'Vicente                            ', 'Granadino -', 'M', 1, '0', 1, '0', '-', NULL, '-', '-', 'PERS0000313', 'vgranadino', 'vgrana2015', 2, 1, '2017-08-03 13:47:20', 'jvelasquez', NULL, NULL),
(61, 4, 5, 'Jesus                              ', 'Guerra Quilca', 'M', 1, '0', 1, '0', '-', NULL, '-', '-', 'PERS0000378', 'jguerra-lamb', 'Temporal2017', 2, 1, '2017-08-03 13:47:23', 'jvelasquez', NULL, NULL),
(62, 4, 5, 'Jesus                              ', 'Guerra Quilca', 'M', 1, '0', 1, '0', 'Los Amautas 481 B - Urb. Zarate', NULL, '997606204', 'jguerraq@yahoo.com', 'PERS0000137', 'jguerra', 'Ancashjgq@1', 2, 1, '2017-08-03 13:47:25', 'jvelasquez', NULL, NULL),
(63, 4, 5, 'ANTONIETTA ORNELLA                 ', 'GUTIERREZ ROSATI', 'F', 1, '0', 1, '0', 'AV. LA MOLINA 2135, SOL DE LA MOLINA', NULL, '997215654', '9977215654', 'PERS0000318', 'agutierrez', 'Gutierr3z', 2, 1, '2017-08-03 13:47:53', 'jvelasquez', NULL, NULL),
(64, 4, 5, 'Karina                             ', 'Guzman Jurado', 'F', 1, '0', 1, '0', 'Jr. Mercurio S/N Yananaco', NULL, '996623430', 'kguzman@sierraexportadora.gob.pe', 'PERS0000307', 'kguzman', 'guzman2015', 2, 1, '2017-08-03 13:47:57', 'jvelasquez', NULL, NULL),
(65, 4, 5, 'Jean marco                         ', 'Guzman Jacobo', 'M', 1, '0', 1, '0', 'Urb. AmpliaciÃ³n Socabaya T-17', NULL, '9935358845', 'jguzman@sierraexportadora.gob.pe', 'PERS0000132', 'jguzman', 'guzman', 2, 1, '2017-08-03 13:48:01', 'jvelasquez', NULL, NULL),
(66, 4, 5, 'Carmen Cecilia                     ', 'Hernandez Minaya', 'F', 1, '0', 1, '0', 'AV. GRAU 454 DPTO 606', NULL, '945097015	', 'CECILIAHERZ@GMAIL.COM', 'PERS0000338', 'chernandez', 'Happyvalentine2017', 2, 1, '2017-08-03 13:48:06', 'jvelasquez', NULL, NULL),
(67, 4, 5, 'Alberto                            ', 'Huaman Condori', 'M', 1, '0', 1, '0', 'Jr. Yuracc Rumi s/n Santa Barbara', NULL, '967988723', 'ahc_285@hotmail.com', 'PERS0000342', 'ahuaman', '4huaman85', 2, 1, '2017-08-03 13:48:12', 'jvelasquez', NULL, NULL),
(68, 4, 5, 'Wilfredo                           ', 'Huarcaya MartÃ­nez', 'M', 1, '0', 1, '0', 'Jr. 22 de junio NÂ° 452', NULL, '988004208	', 'wilfredohm@hotmail.com', 'PERS0000390', 'whuarcaya', 'w1h1m1w1', 2, 1, '2017-08-03 13:48:14', 'jvelasquez', NULL, NULL),
(69, 4, 5, 'Tatiana                            ', 'Jauregui Rosas', 'F', 1, '0', 1, '0', 'Urb. Leoncio Prado Mz C, Lte. 15', NULL, '062-962604434', 'tjauregui@sierraexportadora.gob.pe', 'PERS0000087', 'tjauregui', '14a0721', 2, 1, '2017-08-03 13:48:19', 'jvelasquez', NULL, NULL),
(70, 4, 5, 'Lucy Sulma                         ', 'Jeri Campana', 'F', 1, '0', 1, '0', 'Santiago Antunez de Mayolo B-55, Depto 102, Urb Pablo Bonner', NULL, '980249047', 'zulma.jeri@hotmail.com	', 'PERS0000274', 'ljeri', 'nacho139287$', 2, 1, '2017-08-03 13:48:22', 'jvelasquez', NULL, NULL),
(71, 4, 5, 'IVAN ENRIQUE                       ', 'JUSCAMAITA PALACIOS', 'M', 1, '0', 1, '0', 'CALLE CARTAVIO NÂ° 105 MONTERRICO', NULL, '985289430', 'IVANJUS@LIVE.COM', 'PERS0000317', 'ijuscamaita', 'Ijuscamait4', 2, 1, '2017-08-03 13:48:24', 'jvelasquez', NULL, NULL),
(72, 4, 5, 'Flor veronica                      ', 'Kam Moron', 'F', 1, '0', 1, '0', 'CALLE OCEANO PACIFICO N. 124 DPTO. 301 ', NULL, '997598099', 'fvkamm@hotmail.com', 'PERS0000244', 'fkam', 'Fkam13', 2, 1, '2017-08-03 13:48:26', 'jvelasquez', NULL, NULL),
(73, 4, 5, 'Wuendelin                          ', 'Krauchiner Fabian', 'M', 1, '0', 1, '0', 'Jr. Gustavson cdra. 7', NULL, '945155302', 'krauchiner@outlook.com', 'PERS0000332', 'wkrauchiner', 'wkr2015', 2, 1, '2017-08-03 13:48:30', 'jvelasquez', NULL, NULL),
(74, 4, 5, 'Juan Carlos                        ', 'La Torre Moscoso', 'M', 1, '0', 1, '0', 'Av. Capitan Soto 802', NULL, '959074932', 'juanclatorre@hotmail.com', 'PERS0000314', 'jlatorre', 'latorre2015', 2, 1, '2017-08-03 13:48:34', 'jvelasquez', NULL, NULL),
(75, 4, 5, 'Melodi levit                       ', 'Landazuri Padilla', 'F', 1, '0', 1, '0', 'Valdelomar 550 - Dpto. 302', NULL, '993102290', 'mlandazuri@sierraexportadora.gob.pe', 'PERS0000246', 'mlandazuri', 'Melodi1', 2, 1, '2017-08-03 13:48:36', 'jvelasquez', NULL, NULL),
(76, 4, 5, 'Jose alberto                       ', 'Laos Espinoza', 'M', 1, '0', 1, '0', 'Jr. Maynas 354, Int. 208', NULL, '995758352', 'jlaos@sierraexportadora.gob.pe', 'PERS0000066', 'jlaos', 'Sonqori31', 2, 1, '2017-08-03 13:48:38', 'jvelasquez', NULL, NULL),
(77, 4, 5, 'Gustavo                            ', 'Larios Riquelme', 'M', 1, '0', 1, '0', 'AV. ANGAMOS ESTE 2135', NULL, '-', 'glarios@sierraexportadora.gob.pe', 'PERS0000290', 'glarios', 'Larios1!', 2, 1, '2017-08-03 13:48:41', 'jvelasquez', NULL, NULL),
(78, 4, 5, 'Yesenia Karina                     ', 'Laura Flores', 'F', 1, '0', 1, '0', 'CALLE AREQUIPA NÂº1037', NULL, '953621150	', 'KAT_14442@HOTMAIL.COM', 'PERS0000405', 'ylaura', 'ylaura010228*', 2, 1, '2017-08-03 13:48:44', 'jvelasquez', NULL, NULL),
(79, 4, 5, 'Silvana Jeannette                  ', 'Lindo Alvarado', 'F', 1, '0', 1, '0', 'Calle Alfredo Novoa 160 * Urbanizacion Vista Alegre', NULL, '981708600', 'silvana.lindo@hotmail.com', 'PERS0000333', 'slindo', 'slindo36', 2, 1, '2017-08-03 13:48:47', 'jvelasquez', NULL, NULL),
(80, 4, 5, 'Carlos Estuardo                    ', 'Lizarzaburu Menchola', 'M', 1, '0', 1, '0', 'calle arenales 366 p. joven diego ferre', NULL, '990766622', '-', 'PERS0000393', 'clizarzaburu', 'se2017', 2, 1, '2017-08-03 13:48:49', 'jvelasquez', NULL, NULL),
(81, 4, 5, 'Merli yair                         ', 'Mamani Calizaya', 'M', 1, '0', 1, '0', 'Calle Siglo 396', NULL, '#978000952', 'ymamani@sierraexportadora.gob.pe', 'PERS0000101', 'ymamani', '09a7896', 2, 1, '2017-08-03 13:48:54', 'jvelasquez', NULL, NULL),
(82, 4, 5, 'Ysabela karina                     ', 'Manrique Nu&ntilde;ez', 'F', 1, '0', 1, '0', 'Urb. Dolores E21', NULL, '958004640', 'ysabela_karina@hotmail.com', 'PERS0000190', 'ymanrique', 'Ymanrique', 2, 1, '2017-08-03 13:48:58', 'jvelasquez', NULL, NULL),
(83, 4, 5, 'Patricia                           ', 'Mansilla Pizarro', 'F', 1, '0', 1, '0', 'Urb. Bancopata g - 9', NULL, '975755405', 'patricia.mansillap@gmail.com', 'PERS0000296', 'pmansilla', 'Pmans1lla', 2, 1, '2017-08-03 13:49:02', 'jvelasquez', NULL, NULL),
(84, 4, 5, 'Zoila consuelo                     ', 'Marchena Mendoza', 'F', 1, '0', 1, '0', 'Av. Gral. Canevaro 1119', NULL, '993535896', 'lita2806@gmail.com', 'PERS0000240', 'zmarchena', 'tais2', 2, 1, '2017-08-03 13:49:05', 'jvelasquez', NULL, NULL),
(85, 4, 5, 'Ada Clavelia                       ', 'Marquina Prado', 'F', 1, '0', 1, '0', 'Asoc. Buenos Aires Mz B Lot 4', NULL, '966053896', 'adamarquina1@hotmail.com', 'PERS0000311', 'amarquina', 'adamarp2017$', 2, 1, '2017-08-03 13:49:09', 'jvelasquez', NULL, NULL),
(86, 4, 5, 'Ivan Edgardo                       ', 'Meza Oyague', 'M', 1, '0', 1, '0', 'garcilazo de la vega 491 2do piso Urb san agustin', NULL, '983442986', 'imeza@sierraexportadora.gob.pe', 'PERS0000299', 'imeza', 'imeza', 2, 1, '2017-08-03 13:49:12', 'jvelasquez', NULL, NULL),
(87, 4, 5, 'Felipe Cesar                       ', 'Meza Millan', 'M', 1, '0', 1, '0', 'Av. Elmer Faucett 571', NULL, '980543373', 'fmeza@sierraexportadora.gob.pe', 'PERS0000375', 'fmeza', 'Dokybrando#', 2, 1, '2017-08-03 13:49:15', 'jvelasquez', NULL, NULL),
(88, 4, 5, 'Edgar Antonio                      ', 'Miranda Valdivia', 'M', 1, '0', 1, '0', 'La venturosa 396 Chama', NULL, '996290444', 'emirando@gmail.com', 'PERS0000162', 'emiranda', 'cmv0021', 2, 1, '2017-08-03 13:49:24', 'jvelasquez', NULL, NULL),
(89, 4, 5, 'Jose william                       ', 'Mondragon Guerrero', 'M', 1, '0', 1, '0', 'Jr. Chinchaysuyo 119 - Urb. Maranga', NULL, '973814060', 'jwmg1989@gmail.com', 'PERS0000252', 'jmondragon', 'Jmon4)', 2, 1, '2017-08-03 13:49:27', 'jvelasquez', NULL, NULL),
(90, 4, 5, 'Patricia elizabeth                 ', 'Monzon Zavaleta', 'F', 1, '0', 1, '0', 'Urb. El Bosque A-18 Nuevo Chimbote', NULL, '943528482', 'pmonzon@sierraexportadora.gob.pe', 'PERS0000123', 'pmonzon', 'patricia', 2, 1, '2017-08-03 13:49:30', 'jvelasquez', NULL, NULL),
(91, 4, 5, 'Cinthya Brendalit                  ', 'MuÃ±oz Hidalgo', 'F', 1, '0', 1, '0', '-', NULL, '-', 'cmunoz@sierraexportadora.gob.pe', 'PERS0000304', 'bmunoz', 'bmunoz', 2, 1, '2017-08-03 13:49:35', 'jvelasquez', NULL, NULL),
(92, 4, 5, 'Maria olimpia                      ', 'Olarte Ambia', 'F', 1, '0', 1, '0', 'Jr. Vargas Machuca 204 D San Antonio - Miraflores', NULL, '994792867', 'olartemary7@hotmail.com', 'PERS0000226', 'molarte', '77777', 2, 1, '2017-08-03 13:49:38', 'jvelasquez', NULL, NULL),
(93, 5, 5, 'Sebastian salvador                 ', 'Ort&iacute;z Caceres', 'M', 1, '0', 1, '0', 'Calle Monte Cedro Mz.01 - Lt.32 Urb. Monterrico', NULL, '993535892', 'sortiz@sierraexportadora.gob.pe', 'PERS0000072', 'sebastian', 'sebastian', 2, 1, '2017-08-03 13:49:41', 'jvelasquez', '2017-08-11 10:40:24', ''),
(94, 4, 5, 'Julio Guillermo                    ', 'Ortega Tumba', 'M', 1, '0', 1, '0', '-', NULL, '-', 'jortega@sierraexportadora.gob.pe', 'PERS0000278', 'jortega', 'jortega', 2, 1, '2017-08-03 13:49:44', 'jvelasquez', NULL, NULL),
(95, 4, 5, 'Veronica Patricia                  ', 'Pachas Pachas', 'F', 1, '0', 1, '0', 'Precursores 485-102', NULL, '940607327', 'presidencia4@sierraexportadora.gob.pe', 'PERS0000192', 'vpachas', 'vpachas', 2, 1, '2017-08-03 13:49:50', 'jvelasquez', NULL, NULL),
(96, 4, 5, 'Luis jorge                         ', 'Paz Silva', 'M', 1, '0', 1, '0', 'Luis Felipe VillarÃ¡n NÂº 383, Distrito de San Isidro', NULL, '995038824', 'ljpaz@terra.com.pe', 'PERS0000166', 'luis.paz', 'luis.paz', 2, 1, '2017-08-03 13:49:56', 'jvelasquez', NULL, NULL),
(97, 4, 5, 'Jose Carlos                        ', 'Peralta Cruces', 'M', 1, '0', 1, '0', 'Mz. I3 Lt. 3 Alt. 10 de Las Flores SJL', NULL, '992080021', 'jose.peraltabusiness6@hotmail.com', 'PERS0000316', 'jperalta', 'temporal2015', 2, 1, '2017-08-03 13:49:59', 'jvelasquez', NULL, NULL),
(98, 4, 5, 'Dennis Marwin                      ', 'Pereyra Diaz', 'M', 1, '0', 1, '0', 'AV. UCAYALI 1036 TINGO MARIA', NULL, '962084484', 'dpereyra38@gmail.com', 'PERS0000367', 'dpereyra', 'dpereyra67', 2, 1, '2017-08-03 13:50:01', 'jvelasquez', NULL, NULL),
(99, 4, 5, 'SeÃ±orita Silvia Michaella       ', 'Perez Bartra', 'F', 1, '0', 1, '0', 'Calle Fe y AlegrÃ­a 304 Urb. Condevilla SeÃ±or de los Milagros Sct 026.', NULL, '984380031', 'bartra.silvia@gmail.com', 'PERS0000270', 'sperez', 'sperez123', 2, 1, '2017-08-03 13:50:04', 'jvelasquez', NULL, NULL),
(100, 4, 5, 'Oma Stevens                        ', 'Pezo Clark', 'M', 1, '0', 1, '0', '-', NULL, '-', 'omarpezo@gmail.com', 'PERS0000394', 'opezo', 'Joselyn84', 2, 1, '2017-08-03 13:50:09', 'jvelasquez', NULL, NULL),
(101, 4, 5, 'Cesar Hugo Armando                 ', 'PiÃ±arreta Mezones', 'M', 1, '0', 1, '0', 'Jr. Tambogrande 752 - Urb. Santa Ana', NULL, '966957620', 'hpmezones@gmail.com', 'PERS0000306', 'cpinarreta', 'cpinarreta56', 2, 1, '2017-08-03 13:50:12', 'jvelasquez', NULL, NULL),
(102, 4, 5, 'PORFIRIO FIDEL                     ', 'PLASENCIA ALVAREZ', 'M', 1, '0', 1, '0', 'JR. SANTA VICTORIA NÂ° 167 - CAJAMARCA', NULL, '976005888', 'fidel_95_20@hotmail.com', 'PERS0000330', 'pplasencia', 'pl4senci4', 2, 1, '2017-08-03 13:50:15', 'jvelasquez', NULL, NULL),
(103, 4, 5, 'David Wilfredo                     ', 'Plasencia Quevedo', 'M', 1, '0', 1, '0', 'Calle Parra Del Riego 264 Urb. Palermo', NULL, '973086905', 'davidplasencia29@gmail.com', 'PERS0000402', 'dplasencia', 'Dplasencia$$', 2, 1, '2017-08-03 13:50:17', 'jvelasquez', NULL, NULL),
(104, 4, 5, 'Administrador                      ', 'Principal Ti', 'M', 1, '0', 1, '0', 'Av. La Marina 886 int 31 A', NULL, '995544498', 'ti@sierraexportadora.gob.pe', 'PERS0000001', 'adminti', '123456', 2, 1, '2017-08-03 13:50:21', 'jvelasquez', '2017-08-07 16:38:43', ''),
(105, 5, 5, 'Luis enrique                       ', 'Qui&ntilde;ones Calmet', 'M', 1, '0', 1, '0', 'Av. Angamos Este 1901', NULL, '956175510', 'kikin3110@hotmail.com', 'PERS0000164', 'lquinones', 'Calmet7', 2, 1, '2017-08-03 13:50:24', 'jvelasquez', '2017-08-11 10:40:34', ''),
(106, 4, 5, 'Alexandra                          ', 'Quincot Portocarrero', 'F', 1, '0', 1, '0', 'Rousseau 214', NULL, '94004007', 'aquincot@sierraexportadora.gob.pe', 'PERS0000286', 'aquincot', 'Temporal', 2, 1, '2017-08-03 13:50:30', 'jvelasquez', NULL, NULL),
(107, 4, 5, 'Sheila                             ', 'Rafael Martinez', 'F', 1, '0', 1, '0', 'Calle Mayta capac 511 - Piura', NULL, '998435315', 'sheramar@gmail.com', 'PERS0000324', 'srafael', 'mafasa062228', 2, 1, '2017-08-03 13:50:32', 'jvelasquez', NULL, NULL),
(108, 4, 5, 'Manuel                             ', 'Rafael Terreros', 'M', 1, '0', 1, '0', 'Urb. Ingenieria Mz D Lt. 18', NULL, '989614459', 'mrafaelte@hotmail.com', 'PERS0000380', 'coordinadorhuanuco', 'Coordinador$', 2, 1, '2017-08-03 13:50:35', 'jvelasquez', NULL, NULL),
(109, 4, 5, 'Karin joselyna                     ', 'Ramirez Tuya', 'F', 1, '0', 1, '0', 'Urb. Villa Sol Mz. I, Lte. 9, Barrio De Huaripampa', NULL, '043-943284108', 'kramirez@sierraexportadora.gob.pe', 'PERS0000065', 'kramirez', '19a1938', 2, 1, '2017-08-03 13:50:37', 'jvelasquez', NULL, NULL),
(110, 4, 5, 'Wilfredo Angel                     ', 'Ramos  Paucar', 'M', 1, '0', 1, '0', 'Av. Los Libertadores NÂº 207 ', NULL, '381744326', 'wilangramos@yahoo.es', 'PERS0000156', 'wramos', 'wilfredo', 2, 1, '2017-08-03 13:50:40', 'jvelasquez', NULL, NULL),
(111, 4, 5, 'Neria                              ', 'Ramos Phocco', 'F', 1, '0', 1, '0', 'Psj. Salazar Bondy NÂ° 328 Barrio 4 de Noviembre', NULL, '996065399', 'nramos@sierraexportadora.gob.pe', 'PERS0000310', 'nramos', 'nr2015', 2, 1, '2017-08-03 13:50:44', 'jvelasquez', NULL, NULL),
(112, 4, 5, 'ROBERTO GILBERTO                   ', 'RICHARDSON MIRANDA', 'M', 1, '0', 1, '0', 'CALLE ZECILLA 117 DPTO. 201 URB. MACARENA - LA PERLA', NULL, '979355848', 'rogilrichardson@yahoo.es', 'PERS0000383', 'RRICHARDSON', '0402rr', 2, 1, '2017-08-03 13:50:46', 'jvelasquez', NULL, NULL),
(113, 4, 5, 'Elizabeth Janet                    ', 'Rodriguez Figueroa', 'F', 1, '0', 1, '0', 'Calle Las OropÃ©ndolas 275', NULL, '987528895', '-', 'PERS0000312', 'erodriguezf', 'temporal2017', 2, 1, '2017-08-03 13:50:51', 'jvelasquez', NULL, NULL),
(114, 4, 5, 'Sandra Mariela                     ', 'Roldan Abantes', 'F', 1, '0', 1, '0', '-', NULL, '-', 'sroldan@sierraexportadora.gob.pe', 'PERS0000361', 'sroldan', 'sroldanS16', 2, 1, '2017-08-03 13:50:53', 'jvelasquez', NULL, NULL),
(115, 4, 5, 'Sandra Mariela                     ', 'Roldan Abantes', 'F', 1, '0', 1, '0', '-', NULL, '-', '-', 'PERS0000404', 'sroldangg', 'temporal', 2, 1, '2017-08-03 13:50:56', 'jvelasquez', NULL, NULL),
(116, 4, 5, 'Victor raul                        ', 'Rondinel Barcena', 'M', 1, '0', 1, '0', 'Jr. Juan De Rada NÂº 492', NULL, '044-948442731', 'vrondinel@sierraexportadora.gob.pe', 'PERS0000061', 'vrondinel', 'victor', 2, 1, '2017-08-03 13:50:58', 'jvelasquez', NULL, NULL),
(117, 4, 5, 'MARIA FERNANDA                     ', 'RUBIO ALVAREZ', 'F', 1, '0', 1, '0', 'LAS DALIAS 103 DPTO. 403 URB. PARQUES DE MONTERRICO', NULL, '985719107', 'ferrubioalvarez@gmail.com', 'PERS0000385', 'mrubio', 'fERNANDITA1217', 2, 1, '2017-08-03 13:51:02', 'jvelasquez', NULL, NULL),
(118, 4, 5, 'Cruz Gerardo                       ', 'Saavedra Colmenares', 'M', 1, '0', 1, '0', 'Calle Jose QuiÃ±ones 113 Interior 09, Pimentel 3 Malecon', NULL, '925970278', 'csaavedra@sierraexportadora.gob.pe', 'PERS0000376', 'csaavedra', '4118cucho', 2, 1, '2017-08-03 13:51:05', 'jvelasquez', NULL, NULL),
(119, 4, 5, 'Modesto                            ', 'Salinas Carranza', 'M', 1, '0', 1, '0', 'Manzana F, Lote 17,  Santa Rosa de Monserrate - Trujillo	', NULL, '948396209', 'msalinas@sierraexportadora.gob.pe', 'PERS0000305', 'msalinas', 'msalinas2014', 2, 1, '2017-08-03 13:51:06', 'jvelasquez', NULL, NULL),
(120, 4, 5, 'Aylin Natali                       ', 'Sanchez Saavedra	', 'M', 1, '0', 1, '0', 'Mario urteaga 596 - Cajamarca', NULL, '949660207', 'aylin_nss@hotmail.com', 'PERS0000399', 'asanchez', 'Asanchez', 2, 1, '2017-08-03 13:51:08', 'jvelasquez', NULL, NULL),
(121, 4, 5, 'Auditores                          ', 'Sandoval Quiroz', 'M', 1, '0', 1, '0', 'lima peru ', NULL, '----', 'auditoria_externa@sierraexportadora.gob.pe', 'PERS0000267', 'auditoria_externa', 'auditoria2017', 2, 1, '2017-08-03 13:51:10', 'jvelasquez', NULL, NULL),
(122, 4, 5, 'Blanca giuliana                    ', 'Scerpella Cevallos', 'F', 1, '0', 1, '0', 'Jr. Baltazar La Torre 110, Dpto. 301', NULL, '999719066', 'gscerpella@sierraexportadora.gob.pe', 'PERS0000128', 'gscerpella', '261160', 2, 1, '2017-08-03 13:51:13', 'jvelasquez', NULL, NULL),
(123, 4, 5, 'Raquel celestina                   ', 'Sedano Orrego', 'F', 1, '0', 1, '0', 'Mariscal Gamarra NÂº 270, La Florida', NULL, '964879827', 'rsedano@sierraexportadora.gob.pe', 'PERS0000058', 'rsedano', 'raquel', 2, 1, '2017-08-03 13:51:19', 'jvelasquez', NULL, NULL),
(124, 4, 5, 'Elsa luzmila                       ', 'Sotomayor Bianco', 'F', 1, '0', 1, '0', 'Elias Aguirre  280 ', NULL, '979703125', 'elsa_kt@yahoo.es', 'PERS0000238', 'esotomayor', 'elsa123456*', 2, 1, '2017-08-03 13:51:24', 'jvelasquez', NULL, NULL),
(125, 1, 5, 'Christian john                     ', 'Tantachuco Moya', 'M', 1, '0', 1, '0', 'Av. Los Virreyes Mz. D lote 6', NULL, '956214446', 'ctantachuco@gmail.com', 'PERS0000186', 'ctantachuco', '123456', 2, 1, '2017-08-03 13:51:27', 'jvelasquez', '2017-08-09 17:16:19', ''),
(126, 4, 5, 'Luz Marina                         ', 'Tapia Torres', 'F', 1, '0', 1, '0', '-', NULL, '-', 'mtapia@sierraexportadora.gob.pe', 'PERS0000300', 'mtapia', 'mtapia', 2, 1, '2017-08-03 13:51:31', 'jvelasquez', NULL, NULL),
(127, 4, 5, 'Gabina Lourdes                     ', 'Tealdo De Rivero', 'M', 1, '0', 1, '0', '-', NULL, '997312570	', 'g.tealdo@gmail.com', 'PERS0000365', 'gtealdo', 'Gabina$2017', 2, 1, '2017-08-03 13:51:34', 'jvelasquez', NULL, NULL),
(128, 4, 5, 'Romy gisselly                      ', 'Tello Chavez de Lugigo', 'F', 1, '0', 1, '0', 'Calle Las Margaritas G-29, 4to piso, Urb. Santa MarÃ­a del Pinar- Piura	', NULL, '#945087201', 'romytellochavez@outlook.com', 'PERS0000261', 'rtello', 'rtello2016', 2, 1, '2017-08-03 13:51:38', 'jvelasquez', NULL, NULL),
(129, 4, 5, 'Wagner                             ', 'Torres Lopez', 'M', 1, '0', 1, '0', '-', NULL, '-', 'coodinadorucayali@sierraexportadora.gob.pe', 'PERS0000392', 'coordinadorucayali', 'negritaliliana2016', 2, 1, '2017-08-03 13:51:41', 'jvelasquez', NULL, NULL),
(130, 5, 5, 'Omar emilio                        ', 'Trevejo Aranda', 'M', 1, '0', 1, '0', 'Jr. Venus #580 Urb. El Trebol', NULL, '980987453', 'omartreve@hotmail.com', 'PERS0000116', 'otrevejo', 'Otrevejo', 2, 1, '2017-08-03 13:51:43', 'jvelasquez', '2017-08-11 10:38:31', ''),
(131, 4, 5, 'Carlos Eduardo                     ', 'Ulfe Herrera', 'M', 1, '0', 1, '0', 'Calle Trece NÂ° 167', NULL, '985552840', 'carlosulfeh@yahoo.com', 'PERS0000339', 'culfe', 'Cuh35349', 2, 1, '2017-08-03 13:51:45', 'jvelasquez', NULL, NULL),
(132, 4, 5, 'Anibal Francisco Vicente           ', 'VÃ¡squez Chicata', 'M', 1, '0', 1, '0', 'Alfonso Ugarte NÂº 207', NULL, '054959742466', 'avasquez@sierraexportadora.gob.pe', 'PERS0000055', 'avasquez', 'anibal', 2, 1, '2017-08-03 13:51:47', 'jvelasquez', NULL, NULL),
(133, 4, 5, 'Milagros Judith                    ', 'Vargas Fierro', 'F', 1, '0', 1, '0', 'Jr Miguel Soto Valle 281 Dpto 203', NULL, '973 586 636', 'judithvargasf@yahoo.com', 'PERS0000271', 'jvargas', 'Judith01', 2, 1, '2017-08-03 13:51:54', 'jvelasquez', NULL, NULL),
(134, 4, 5, 'Gladys Noemi                       ', 'Bernal Barzola', 'F', 1, '0', 1, '0', 'AV. ALAMEDA DEL CORREGIDOR 2154', NULL, '993339796	', 'gladysbernalb@gmail.com', 'PERS0000407', 'gbernal', 'gbernal', 2, 1, '2017-08-09 16:33:17', 'jvelasquez', NULL, NULL),
(135, 4, 5, 'Jaime Medardo                      ', 'Flores Vilchez', 'M', 1, '0', 1, '0', 'sector 2 - grupo 4 mz a lote 19', NULL, '995666063', 'jflores@sierraexportadora.gob.pe', 'PERS0000264', 'jflores', '', 2, 1, '2017-08-24 17:12:41', 'jvelasquez', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `idvehiculos` int(11) NOT NULL,
  `sedes_idsedes` int(11) NOT NULL,
  `idtipos_vehiculo` int(11) NOT NULL,
  `idtipo_combustible` int(11) NOT NULL,
  `idmedida_combustible` int(11) NOT NULL,
  `idmedida_uso` int(11) NOT NULL,
  `idmodelos_vehiculos` int(11) NOT NULL,
  `descripcion_vehiculo` varchar(250) DEFAULT NULL,
  `color_calendario` varchar(45) DEFAULT NULL,
  `placa_vehiculo` varchar(45) DEFAULT NULL,
  `kilometraje_inicio` int(11) DEFAULT NULL,
  `nro_serie` varchar(50) DEFAULT NULL,
  `nro_motor` varchar(50) DEFAULT NULL,
  `ano_fabricacion` int(11) DEFAULT NULL,
  `vencimiento_soat` date DEFAULT NULL,
  `clase_transparencia` int(11) DEFAULT NULL,
  `es_pool` int(11) DEFAULT NULL,
  `estado_vehiculo` int(11) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `usuario_creacion` varchar(45) DEFAULT NULL,
  `fecha_modificacion` datetime DEFAULT NULL,
  `usuario_modificacion` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`idvehiculos`, `sedes_idsedes`, `idtipos_vehiculo`, `idtipo_combustible`, `idmedida_combustible`, `idmedida_uso`, `idmodelos_vehiculos`, `descripcion_vehiculo`, `color_calendario`, `placa_vehiculo`, `kilometraje_inicio`, `nro_serie`, `nro_motor`, `ano_fabricacion`, `vencimiento_soat`, `clase_transparencia`, `es_pool`, `estado_vehiculo`, `fecha_creacion`, `usuario_creacion`, `fecha_modificacion`, `usuario_modificacion`) VALUES
(1, 9, 1, 2, 1, 1, 1, 'Vehiculo - Sede Central', '#b0002f', 'CGU-026', 0, '3FAFP15P3WR258206', '3FAFP15P3WR258206', 1998, '2017-12-31', 3, 1, 1, '2017-05-05 15:15:25', 'jvelasquez', '2017-08-09 17:42:56', ''),
(2, 2, 2, 2, 1, 1, 3, 'Vehiculo - Sede Ancash', '#2450e0', 'EGQ-911', 285000, 'JN1CNUD227A716025', 'ZD30080871K', 2006, '2017-12-31', 4, 0, 1, '2017-05-05 15:18:27', 'jvelasquez', '2017-07-31 17:25:59', ''),
(3, 13, 2, 2, 1, 1, 3, 'Vehiculo - Sede Apurimac', '#a8148f', 'EGS-278', 224000, 'JN1CNUD227A716064', 'ZD30081490K', 2006, '2017-12-31', 4, 0, 1, '2017-05-05 15:25:32', 'jvelasquez', '2017-07-31 17:25:38', ''),
(4, 15, 2, 2, 1, 1, 3, 'Vehiculo - Sede Arequipa', '#17d5e6', 'AEW-846', 380000, 'JN1CNUD227A716051', 'ZD30081453K', 2006, '2017-12-31', 4, 0, 1, '2017-05-05 15:27:37', 'jvelasquez', '2017-07-31 17:26:35', ''),
(5, 5, 2, 2, 1, 1, 3, 'Vehiculo - Sede Cajamarca', '#844ee0', 'AEE-705', 236713, 'JN1CNUD227A716051', 'ZD30081453K', 2006, '2017-12-31', 4, 0, 1, '2017-05-05 15:30:20', 'jvelasquez', '2017-07-31 17:24:37', ''),
(6, 14, 2, 2, 1, 1, 3, 'Vehiculo - Sede Cusco', '#508518', 'EGR-018', 277874, 'JN1CNUD227A716180', 'ZD30083194K', 2006, '2017-12-31', 4, 0, 1, '2017-05-05 15:31:54', 'jvelasquez', '2017-07-31 17:24:08', ''),
(7, 7, 2, 2, 1, 1, 3, 'Vehiculo - Sede Huanuco', '#294ee3', 'EGT-082', 175000, 'JN1CNUD227A716052', 'ZD30081225K', 2006, '2017-12-31', 4, 0, 1, '2017-05-05 15:33:38', 'jvelasquez', '2017-07-31 17:22:56', ''),
(8, 9, 2, 2, 1, 1, 3, 'Vehiculo - Sede Central', '#bf1ce8', 'EGR-305', 0, 'JN1CDGD227X471201', 'KA24828621Y', 2006, '2017-12-31', 3, 1, 1, '2017-05-05 15:38:59', 'jvelasquez', '2017-08-23 16:04:25', ''),
(9, 8, 2, 2, 1, 1, 3, 'Vehiculo - Sede Pasco', '#c43225', 'AEP-892', 179951, 'JN1CNUD227A716049', 'ZD30081476K', 2006, '2017-12-31', 4, 0, 1, '2017-05-05 15:41:08', 'jvelasquez', '2017-07-31 17:21:04', ''),
(10, 17, 2, 2, 1, 1, 3, 'Vehiculo - Sede Puno', '#06aab3', 'EGR-786', 348983, 'JN1CNUD227A716183', 'ZD30082879K', 2006, '2017-12-31', 4, 0, 1, '2017-05-05 15:45:34', 'jvelasquez', '2017-07-31 17:20:29', ''),
(11, 12, 2, 2, 1, 1, 3, 'Vehiculo - Sede Ayacucho', '#3da893', 'AAD-804', 209394, 'JN1CDGD227X471209', 'KA24830881Y', 2007, '2017-12-31', 4, 0, 1, '2017-05-05 15:46:31', 'jvelasquez', '2017-07-31 17:19:48', ''),
(12, 10, 2, 2, 1, 1, 3, 'Vehiculo - Sede Junin', '#858344', 'EGR-017', 300226, 'JN1CDGD227X471197', 'KA24823775Y', 2007, '2017-12-31', 4, 0, 1, '2017-05-05 15:48:34', 'jvelasquez', '2017-07-31 17:18:46', ''),
(13, 4, 2, 2, 1, 1, 3, 'Vehiculo - Sede Lambayeque', '#d4a190', 'EGR-036', 264479, 'JN1CDGD227X471192', 'KA24822231Y', 2007, '2017-12-31', 4, 0, 1, '2017-05-05 15:49:18', 'jvelasquez', '2017-07-31 17:18:57', ''),
(14, 9, 2, 2, 1, 1, 3, 'Vehiculo - Sede Central', '#f0d71d', 'EGQ-969', 0, 'JN1CDGD227X471191', 'KA24821577Y', 2007, '2017-12-31', 3, 1, 1, '2017-05-05 15:50:09', 'jvelasquez', '2017-07-31 17:19:08', ''),
(15, 3, 2, 2, 1, 1, 3, 'Vehiculo - Sede Piura', '#cccf99', 'EGT-196', 281230, 'JN1CDGD227X471196', 'KA24822830Y', 2007, '2017-12-31', 4, 0, 1, '2017-05-05 15:50:55', 'jvelasquez', '2017-07-31 17:17:13', ''),
(16, 14, 2, 2, 1, 1, 3, 'Vehiculo - Sede Cusco', '#a2c98c', 'EGR-563', 134667, 'JN1CPGD229X471855', 'YD25266722A', 2008, '2017-12-31', 4, 0, 1, '2017-05-05 16:06:41', 'jvelasquez', '2017-07-31 17:15:02', ''),
(17, 1, 2, 2, 1, 1, 3, 'Vehiculo - Sede Amazonas', '#8d9ee3', 'EGR-562', 191000, 'JN1CNUD229X466270', 'ZD30217035K', 2009, '2017-12-31', 4, 0, 1, '2017-05-05 16:19:36', 'jvelasquez', '2017-07-31 17:13:51', ''),
(18, 11, 2, 2, 1, 1, 3, 'Vehiculo - Sede Huancavelica', '#97d1a2', 'EGR-564', 236713, 'JN1CNUD229X466298', 'ZD30218062K', 2009, '2017-12-31', 4, 0, 1, '2017-05-05 16:35:26', 'jvelasquez', '2017-07-31 17:13:29', ''),
(19, 16, 2, 2, 1, 1, 3, 'Vehiculo - Sede Moquegua', '#de8ea1', 'EGR-566', 205000, 'JN1CNUD229X466288', 'ZD30217593K', 2009, '2017-12-31', 4, 0, 1, '2017-05-05 16:47:29', 'jvelasquez', '2017-07-31 17:11:44', ''),
(20, 9, 2, 2, 1, 1, 4, 'Vehiculo - Sede Central', '#0ef059', 'LGY-453', 0, 'JN1TBNT309W120930', 'QR25768561A', 2009, '2017-12-31', 3, 1, 1, '2017-05-05 16:48:18', 'jvelasquez', '2017-08-22 21:57:06', ''),
(21, 6, 2, 2, 1, 1, 3, 'Vehiculo - Sede La Libertad', '#c28bc4', 'EGR-565', 236713, 'JN1CNUD229X466271', 'ZD30217001K ', 2009, '2017-12-31', 4, 0, 1, '2017-05-05 16:49:06', 'jvelasquez', '2017-07-31 14:22:47', ''),
(22, 9, 2, 2, 1, 1, 2, 'Vehiculo Pool - Sede Central', '#3e1af0', 'S1D-850', 0, 'MR0FZ22G3A1037479', '1KD5065980', 2010, '2017-12-31', 3, 1, 1, '2017-05-05 16:50:01', 'jvelasquez', '2017-07-31 14:26:00', ''),
(23, 9, 2, 2, 1, 1, 4, 'VehÃ­culo de Presidencia', '#f01818', 'EGN-927', 0, 'JN1TANT31EW752707', 'QR25723870B', 2013, '2017-12-31', 4, 0, 1, '2017-05-05 16:50:42', 'jvelasquez', '2017-08-22 21:56:58', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adjuntos_contratos`
--
ALTER TABLE `adjuntos_contratos`
  ADD PRIMARY KEY (`idadjuntos_contratos`),
  ADD KEY `fk_adjuntos_contratos_contratos1_idx` (`contratos_idcontratos`);

--
-- Indices de la tabla `adjuntos_evaluaciones`
--
ALTER TABLE `adjuntos_evaluaciones`
  ADD PRIMARY KEY (`idadjuntos_evaluaciones`),
  ADD KEY `fk_adjuntos_evaluaciones_evaluaciones_x_servicios1_idx` (`idevaluaciones_x_servicios`);

--
-- Indices de la tabla `adjuntos_factura`
--
ALTER TABLE `adjuntos_factura`
  ADD PRIMARY KEY (`idadjuntos_factura`),
  ADD KEY `fk_adjuntos_factura_facturas1_idx` (`facturas_idfacturas`);

--
-- Indices de la tabla `adjuntos_ordenes_compra`
--
ALTER TABLE `adjuntos_ordenes_compra`
  ADD PRIMARY KEY (`idadjuntos_ordenes_compra`),
  ADD KEY `fk_adjuntos_ordenes_compra_ordenes_compra1_idx` (`ordenes_compra_idordenes_compra`);

--
-- Indices de la tabla `adjuntos_usuarios`
--
ALTER TABLE `adjuntos_usuarios`
  ADD PRIMARY KEY (`idadjuntos_usuarios`),
  ADD KEY `fk_adjuntos_usuarios_usuarios1_idx` (`usuarios_idusuarios`);

--
-- Indices de la tabla `adjuntos_vehiculos`
--
ALTER TABLE `adjuntos_vehiculos`
  ADD PRIMARY KEY (`idadjuntos_vehiculos`),
  ADD KEY `fk_adjuntos_vehiculos_idx` (`vehiculos_idvehiculos`);

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`idareas`),
  ADD KEY `fk_areas_sedes1_idx` (`sedes_idsedes`);

--
-- Indices de la tabla `chofer`
--
ALTER TABLE `chofer`
  ADD PRIMARY KEY (`idchofer`),
  ADD KEY `fk_chofer_tipo_identificacion1_idx` (`idtipo_identificacion`),
  ADD KEY `fk_chofer_tipo_licencia1_idx` (`idtipo_licencia`),
  ADD KEY `fk_chofer_sedes1_idx` (`sedes_idsedes`),
  ADD KEY `fk_chofer_vehiculos1_idx` (`vehiculos_idvehiculos`);

--
-- Indices de la tabla `configuracion_parametros`
--
ALTER TABLE `configuracion_parametros`
  ADD PRIMARY KEY (`idconfiguracion_parametros`);

--
-- Indices de la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD PRIMARY KEY (`idcontratos`),
  ADD KEY `fk_contratos_usuarios1_idx` (`usuarios_idusuarios`),
  ADD KEY `fk_contratos_sedes1_idx` (`sedes_idsedes`),
  ADD KEY `fk_contratos_proveedores1_idx` (`proveedores_idproveedores`);

--
-- Indices de la tabla `contratos_item_adjudicados`
--
ALTER TABLE `contratos_item_adjudicados`
  ADD PRIMARY KEY (`id_item_adjudicados`),
  ADD KEY `fk_contratos_item_adjudicados_contratos1_idx` (`contratos_idcontratos`),
  ADD KEY `fk_contratos_item_adjudicados_medida_combustible1_idx` (`idmedida_combustible`),
  ADD KEY `fk_contratos_item_adjudicados_tipo_combustible1_idx` (`idtipo_combustible`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`idempresas`);

--
-- Indices de la tabla `evaluaciones_x_servicios`
--
ALTER TABLE `evaluaciones_x_servicios`
  ADD PRIMARY KEY (`idevaluaciones_x_servicios`),
  ADD KEY `fk_evaluaciones_x_servicios_servicios_x_solicitudes1_idx` (`idservicios_x_solicitudes`),
  ADD KEY `fk_evaluaciones_x_servicios_mantenimiento_evaluaciones1_idx` (`idmantenimiento_evaluaciones`),
  ADD KEY `fk_evaluaciones_x_servicios_talleres1_idx` (`talleres_idtalleres`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`idfacturas`),
  ADD KEY `fk_facturas_ordenes_compra1_idx` (`ordenes_compra_idordenes_compra`);

--
-- Indices de la tabla `facturas_combustible`
--
ALTER TABLE `facturas_combustible`
  ADD PRIMARY KEY (`idfacturas_combustible`),
  ADD KEY `fk_facturas_combustible_vehiculos1_idx` (`idvehiculos`),
  ADD KEY `fk_facturas_combustible_tipo_combustible1_idx` (`idtipo_combustible`),
  ADD KEY `fk_facturas_combustible_chofer1_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `mantenimiento_alertas`
--
ALTER TABLE `mantenimiento_alertas`
  ADD PRIMARY KEY (`idmantenimiento_alertas`),
  ADD KEY `fk_mantenimiento_alertas_vehiculos1_idx` (`vehiculos_idvehiculos`),
  ADD KEY `fk_mantenimiento_alertas_mantenimiento_servicios1_idx` (`idmantenimiento_servicios`),
  ADD KEY `fk_mantenimiento_alertas_medida_uso1_idx` (`id_medida_uso`),
  ADD KEY `fk_mantenimiento_alertas_usuarios1_idx` (`usuarios_idusuarios`);

--
-- Indices de la tabla `mantenimiento_componentes`
--
ALTER TABLE `mantenimiento_componentes`
  ADD PRIMARY KEY (`idmantenimiento_componentes`),
  ADD KEY `fk_mantenimiento_componentes_mantenimiento_sistemas1_idx` (`idmantenimiento_sistemas`);

--
-- Indices de la tabla `mantenimiento_evaluaciones`
--
ALTER TABLE `mantenimiento_evaluaciones`
  ADD PRIMARY KEY (`idmantenimiento_evaluaciones`),
  ADD KEY `fk_mantenimiento_evaluaciones_mantenimiento_solicitudes1_idx` (`idmantenimiento_solicitudes`),
  ADD KEY `fk_mantenimiento_evaluaciones_usuarios1_idx` (`usuarios_idusuarios`);

--
-- Indices de la tabla `mantenimiento_servicios`
--
ALTER TABLE `mantenimiento_servicios`
  ADD PRIMARY KEY (`idmantenimiento_servicios`),
  ADD KEY `fk_mantenimiento_servicios_mantenimiento_sistemas1_idx` (`idmantenimiento_sistemas`),
  ADD KEY `fk_mantenimiento_servicios_mantenimiento_tipos_servicios1_idx` (`idmantenimiento_tipos_servicios`),
  ADD KEY `fk_mantenimiento_servicios_medida_uso1_idx` (`id_medida_uso`);

--
-- Indices de la tabla `mantenimiento_sistemas`
--
ALTER TABLE `mantenimiento_sistemas`
  ADD PRIMARY KEY (`idmantenimiento_sistemas`);

--
-- Indices de la tabla `mantenimiento_solicitudes`
--
ALTER TABLE `mantenimiento_solicitudes`
  ADD PRIMARY KEY (`idmantenimiento_solicitudes`),
  ADD KEY `fk_mantenimiento_solicitudes_vehiculos1_idx` (`vehiculos_idvehiculos`),
  ADD KEY `fk_mantenimiento_solicitudes_usuarios1_idx` (`usuarios_idusuarios`);

--
-- Indices de la tabla `mantenimiento_tipos_servicios`
--
ALTER TABLE `mantenimiento_tipos_servicios`
  ADD PRIMARY KEY (`idmantenimiento_tipos_servicios`);

--
-- Indices de la tabla `marcas_vehiculos`
--
ALTER TABLE `marcas_vehiculos`
  ADD PRIMARY KEY (`idmarcas_vehiculos`);

--
-- Indices de la tabla `medida_combustible`
--
ALTER TABLE `medida_combustible`
  ADD PRIMARY KEY (`idmedida_combustible`);

--
-- Indices de la tabla `medida_uso`
--
ALTER TABLE `medida_uso`
  ADD PRIMARY KEY (`id_medida_uso`);

--
-- Indices de la tabla `modelos_vehiculos`
--
ALTER TABLE `modelos_vehiculos`
  ADD PRIMARY KEY (`idmodelos_vehiculos`),
  ADD KEY `fk_modelos_vehiculos_marcas_vehiculos1_idx` (`idmarcas_vehiculos`);

--
-- Indices de la tabla `modelos_x_servicios`
--
ALTER TABLE `modelos_x_servicios`
  ADD PRIMARY KEY (`idmodelos_x_servicios`),
  ADD KEY `fk_marcas_x_servicios_mantenimiento_servicios1_idx` (`idmantenimiento_servicios`),
  ADD KEY `fk_marcas_x_servicios_modelos_vehiculos1_idx` (`idmodelos_vehiculos`);

--
-- Indices de la tabla `ordenes_compra`
--
ALTER TABLE `ordenes_compra`
  ADD PRIMARY KEY (`idordenes_compra`),
  ADD KEY `fk_ordenes_compra_contratos1_idx` (`contratos_idcontratos`),
  ADD KEY `fk_ordenes_compra_sedes1_idx` (`sedes_idsedes`),
  ADD KEY `fk_ordenes_compra_proveedores1_idx` (`proveedores_idproveedores`);

--
-- Indices de la tabla `ordenes_compra_items`
--
ALTER TABLE `ordenes_compra_items`
  ADD PRIMARY KEY (`idordenes_compra_item`),
  ADD KEY `fk_facturas_items_contratos_item_adjudicados1_idx` (`id_item_adjudicados`),
  ADD KEY `fk_facturas_items_ordenes_compra1_idx` (`idordenes_compra`),
  ADD KEY `fk_ordenes_compra_items_tipo_combustible1_idx` (`idtipo_combustible`),
  ADD KEY `fk_ordenes_compra_items_medida_combustible1_idx` (`idmedida_combustible`);

--
-- Indices de la tabla `orden_trabajo`
--
ALTER TABLE `orden_trabajo`
  ADD PRIMARY KEY (`idorden_trabajo`),
  ADD KEY `fk_orden_trabajo_mantenimiento_evaluaciones1_idx` (`idmantenimiento_evaluaciones`),
  ADD KEY `fk_orden_trabajo_usuarios1_idx` (`usuarios_idusuarios`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`idproveedores`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idroles`);

--
-- Indices de la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD PRIMARY KEY (`idsedes`),
  ADD KEY `fk_sedes_empresas1_idx` (`empresas_idempresas`);

--
-- Indices de la tabla `servicios_cierre_chofer`
--
ALTER TABLE `servicios_cierre_chofer`
  ADD PRIMARY KEY (`idservicios_cierre_chofer`),
  ADD KEY `fk_servicios_registro_acciones_servicios_solicitud1_idx` (`idservicio_solicitud`);

--
-- Indices de la tabla `servicios_cierre_usuario`
--
ALTER TABLE `servicios_cierre_usuario`
  ADD PRIMARY KEY (`idservicios_cierre`),
  ADD KEY `fk_servicios_cierre_servicios_solicitud1_idx` (`idservicio_solicitud`),
  ADD KEY `fk_servicios_cierre_usuarios1_idx` (`usuarios_idusuarios`);

--
-- Indices de la tabla `servicios_comisionados`
--
ALTER TABLE `servicios_comisionados`
  ADD PRIMARY KEY (`idservicios_comisionados`),
  ADD KEY `fk_servicios_comisionados_servicios_solicitud1_idx` (`idservicio_solicitud`),
  ADD KEY `fk_servicios_comisionados_usuarios1_idx` (`usuarios_idusuarios`);

--
-- Indices de la tabla `servicios_destinos`
--
ALTER TABLE `servicios_destinos`
  ADD PRIMARY KEY (`idservicios_destinos`),
  ADD KEY `fk_servicios_destinos_servicios_solicitud1_idx` (`idservicio_solicitud`),
  ADD KEY `fk_servicios_destinos_ubigeo1_idx` (`ubigeo_idubigeo`);

--
-- Indices de la tabla `servicios_escala_movilidades`
--
ALTER TABLE `servicios_escala_movilidades`
  ADD PRIMARY KEY (`idservicios_escala_movilidades`);

--
-- Indices de la tabla `servicios_estados`
--
ALTER TABLE `servicios_estados`
  ADD PRIMARY KEY (`idservicios_estados`),
  ADD KEY `fk_servicios_estados_servicios_solicitud1_idx` (`idservicio_solicitud`);

--
-- Indices de la tabla `servicios_incidencias`
--
ALTER TABLE `servicios_incidencias`
  ADD PRIMARY KEY (`idservicios_incidencias`),
  ADD KEY `fk_servicios_incidencias_servicios_solicitud1_idx` (`idservicio_solicitud`);

--
-- Indices de la tabla `servicios_solicitud`
--
ALTER TABLE `servicios_solicitud`
  ADD PRIMARY KEY (`idservicio_solicitud`),
  ADD KEY `fk_solicitud_comision_usuarios1_idx` (`usuarios_idusuarios`),
  ADD KEY `fk_solicitud_comision_tipo_vehiculo1_idx` (`idtipos_vehiculo`),
  ADD KEY `fk_servicios_solicitud_vehiculos1_idx` (`vehiculos_idvehiculos`),
  ADD KEY `fk_servicios_solicitud_ubigeo1_idx` (`ubigeo_idubigeo`),
  ADD KEY `fk_servicios_solicitud_chofer1_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `servicios_vales`
--
ALTER TABLE `servicios_vales`
  ADD PRIMARY KEY (`idservicios_vales`),
  ADD KEY `fk_servicios_vales_servicios_solicitud1_idx` (`idservicio_solicitud`),
  ADD KEY `fk_servicios_vales_servicios_escala_movilidades1_idx` (`idservicios_escala_movilidades`);

--
-- Indices de la tabla `servicios_x_solicitudes`
--
ALTER TABLE `servicios_x_solicitudes`
  ADD PRIMARY KEY (`idservicios_x_solicitudes`),
  ADD KEY `fk_servicios_x_solicitudes_mantenimiento_tipos_servicios1_idx` (`idmantenimiento_tipos_servicios`),
  ADD KEY `fk_servicios_x_solicitudes_mantenimiento_alertas1_idx` (`idmantenimiento_alertas`),
  ADD KEY `fk_servicios_x_solicitudes_mantenimiento_servicios1_idx` (`idmantenimiento_servicios`),
  ADD KEY `fk_servicios_x_solicitudes_mantenimiento_componentes1_idx` (`idmantenimiento_componentes`),
  ADD KEY `fk_servicios_x_solicitudes_mantenimiento_solicitudes1_idx` (`idmantenimiento_solicitudes`);

--
-- Indices de la tabla `soat`
--
ALTER TABLE `soat`
  ADD PRIMARY KEY (`idsoat`),
  ADD KEY `fk_soat_vehiculos1_idx` (`vehiculos_idvehiculos`);

--
-- Indices de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`idsucursales`),
  ADD KEY `fk_sucursales_proveedores1_idx` (`proveedores_idproveedores`);

--
-- Indices de la tabla `talleres`
--
ALTER TABLE `talleres`
  ADD PRIMARY KEY (`idtalleres`);

--
-- Indices de la tabla `tarjetas_combustible`
--
ALTER TABLE `tarjetas_combustible`
  ADD PRIMARY KEY (`idtarjetas_combustible`),
  ADD KEY `fk_tarjetas_combustible_vehiculos1_idx` (`vehiculos_idvehiculos`),
  ADD KEY `fk_tarjetas_combustible_proveedores1_idx` (`proveedores_idproveedores`),
  ADD KEY `fk_tarjetas_combustible_contratos_item_adjudicados1_idx` (`id_item_adjudicados`);

--
-- Indices de la tabla `tarjeta_propiedad`
--
ALTER TABLE `tarjeta_propiedad`
  ADD PRIMARY KEY (`idtarjeta_propiedad`),
  ADD KEY `fk_tarjeta_propiedad_vehiculos1_idx` (`vehiculos_idvehiculos`);

--
-- Indices de la tabla `tickets_combustible`
--
ALTER TABLE `tickets_combustible`
  ADD PRIMARY KEY (`idticket_combustible`),
  ADD KEY `fk_recarga_combustible_vehiculos1_idx` (`idvehiculos`),
  ADD KEY `fk_tickets_combustible_tipo_combustible1_idx` (`idtipo_combustible`),
  ADD KEY `fk_tickets_combustible_chofer1_idx` (`chofer_idchofer`),
  ADD KEY `fk_tickets_combustible_sucursales1_idx` (`idsucursales`),
  ADD KEY `fk_tickets_combustible_tarjetas_combustible1_idx` (`idtarjetas_combustible`),
  ADD KEY `fk_tickets_combustible_sedes1_idx` (`sedes_idsedes`);

--
-- Indices de la tabla `tickets_combustible_adjuntos`
--
ALTER TABLE `tickets_combustible_adjuntos`
  ADD PRIMARY KEY (`idtickets_combustible_adjuntos`),
  ADD KEY `fk_tickets_combustible_adjuntos_tickets_combustible1_idx` (`tickets_combustible_idticket_combustible`);

--
-- Indices de la tabla `tickets_x_factura_cabecera`
--
ALTER TABLE `tickets_x_factura_cabecera`
  ADD PRIMARY KEY (`idtickets_x_factura_cabecera`),
  ADD KEY `fk_tickets_x_factura_cabecera_facturas1_idx` (`facturas_idfacturas`);

--
-- Indices de la tabla `tickets_x_factura_detalle`
--
ALTER TABLE `tickets_x_factura_detalle`
  ADD PRIMARY KEY (`idtickets_x_factura_detalle`),
  ADD KEY `fk_tickets_x_factura_detalle_tickets_x_factura_cabecera1_idx` (`idtickets_x_factura_cabecera`),
  ADD KEY `fk_tickets_x_factura_detalle_tickets_combustible1_idx` (`idticket_combustible`);

--
-- Indices de la tabla `tipo_combustible`
--
ALTER TABLE `tipo_combustible`
  ADD PRIMARY KEY (`idtipo_combustible`);

--
-- Indices de la tabla `tipo_identificacion`
--
ALTER TABLE `tipo_identificacion`
  ADD PRIMARY KEY (`idtipo_identificacion`);

--
-- Indices de la tabla `tipo_licencia`
--
ALTER TABLE `tipo_licencia`
  ADD PRIMARY KEY (`idtipo_licencia`);

--
-- Indices de la tabla `tipo_vehiculo`
--
ALTER TABLE `tipo_vehiculo`
  ADD PRIMARY KEY (`idtipos_vehiculo`);

--
-- Indices de la tabla `trabajos_x_evaluaciones`
--
ALTER TABLE `trabajos_x_evaluaciones`
  ADD PRIMARY KEY (`idtrabajos_x_evaluaciones`),
  ADD KEY `fk_trabajos_x_evaluaciones_orden_trabajo1_idx` (`idorden_trabajo`),
  ADD KEY `fk_trabajos_x_evaluaciones_evaluaciones_x_servicios1_idx` (`idevaluaciones_x_servicios`);

--
-- Indices de la tabla `ubigeo`
--
ALTER TABLE `ubigeo`
  ADD PRIMARY KEY (`idubigeo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuarios`),
  ADD KEY `fk_usuarios_roles1_idx` (`roles_idroles`),
  ADD KEY `fk_usuarios_tipo_identificacion1_idx` (`idtipo_identificacion`),
  ADD KEY `fk_usuarios_tipo_licencia1_idx` (`idtipo_licencia`),
  ADD KEY `fk_usuarios_areas1_idx` (`areas_idareas`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`idvehiculos`),
  ADD KEY `fk_vehiculos_sedes1_idx` (`sedes_idsedes`),
  ADD KEY `fk_vehiculos_tipos_vehiculo1_idx` (`idtipos_vehiculo`),
  ADD KEY `fk_vehiculos_tipo_combustible1_idx` (`idtipo_combustible`),
  ADD KEY `fk_vehiculos_vehiculo_medida_combustible1_idx` (`idmedida_combustible`),
  ADD KEY `fk_vehiculos_vehiculo_medida_uso1_idx` (`idmedida_uso`),
  ADD KEY `fk_vehiculos_modelos_vehiculos1_idx` (`idmodelos_vehiculos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adjuntos_contratos`
--
ALTER TABLE `adjuntos_contratos`
  MODIFY `idadjuntos_contratos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `adjuntos_evaluaciones`
--
ALTER TABLE `adjuntos_evaluaciones`
  MODIFY `idadjuntos_evaluaciones` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `adjuntos_factura`
--
ALTER TABLE `adjuntos_factura`
  MODIFY `idadjuntos_factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `adjuntos_ordenes_compra`
--
ALTER TABLE `adjuntos_ordenes_compra`
  MODIFY `idadjuntos_ordenes_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `adjuntos_usuarios`
--
ALTER TABLE `adjuntos_usuarios`
  MODIFY `idadjuntos_usuarios` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `adjuntos_vehiculos`
--
ALTER TABLE `adjuntos_vehiculos`
  MODIFY `idadjuntos_vehiculos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `idareas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `chofer`
--
ALTER TABLE `chofer`
  MODIFY `idchofer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `configuracion_parametros`
--
ALTER TABLE `configuracion_parametros`
  MODIFY `idconfiguracion_parametros` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `contratos`
--
ALTER TABLE `contratos`
  MODIFY `idcontratos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `contratos_item_adjudicados`
--
ALTER TABLE `contratos_item_adjudicados`
  MODIFY `id_item_adjudicados` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `idempresas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `evaluaciones_x_servicios`
--
ALTER TABLE `evaluaciones_x_servicios`
  MODIFY `idevaluaciones_x_servicios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `idfacturas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `facturas_combustible`
--
ALTER TABLE `facturas_combustible`
  MODIFY `idfacturas_combustible` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mantenimiento_alertas`
--
ALTER TABLE `mantenimiento_alertas`
  MODIFY `idmantenimiento_alertas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mantenimiento_componentes`
--
ALTER TABLE `mantenimiento_componentes`
  MODIFY `idmantenimiento_componentes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `mantenimiento_evaluaciones`
--
ALTER TABLE `mantenimiento_evaluaciones`
  MODIFY `idmantenimiento_evaluaciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `mantenimiento_servicios`
--
ALTER TABLE `mantenimiento_servicios`
  MODIFY `idmantenimiento_servicios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT de la tabla `mantenimiento_sistemas`
--
ALTER TABLE `mantenimiento_sistemas`
  MODIFY `idmantenimiento_sistemas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `mantenimiento_solicitudes`
--
ALTER TABLE `mantenimiento_solicitudes`
  MODIFY `idmantenimiento_solicitudes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `mantenimiento_tipos_servicios`
--
ALTER TABLE `mantenimiento_tipos_servicios`
  MODIFY `idmantenimiento_tipos_servicios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `marcas_vehiculos`
--
ALTER TABLE `marcas_vehiculos`
  MODIFY `idmarcas_vehiculos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `medida_combustible`
--
ALTER TABLE `medida_combustible`
  MODIFY `idmedida_combustible` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `medida_uso`
--
ALTER TABLE `medida_uso`
  MODIFY `id_medida_uso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `modelos_vehiculos`
--
ALTER TABLE `modelos_vehiculos`
  MODIFY `idmodelos_vehiculos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `modelos_x_servicios`
--
ALTER TABLE `modelos_x_servicios`
  MODIFY `idmodelos_x_servicios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ordenes_compra`
--
ALTER TABLE `ordenes_compra`
  MODIFY `idordenes_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `ordenes_compra_items`
--
ALTER TABLE `ordenes_compra_items`
  MODIFY `idordenes_compra_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `orden_trabajo`
--
ALTER TABLE `orden_trabajo`
  MODIFY `idorden_trabajo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `idproveedores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idroles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sedes`
--
ALTER TABLE `sedes`
  MODIFY `idsedes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `servicios_cierre_chofer`
--
ALTER TABLE `servicios_cierre_chofer`
  MODIFY `idservicios_cierre_chofer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `servicios_cierre_usuario`
--
ALTER TABLE `servicios_cierre_usuario`
  MODIFY `idservicios_cierre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `servicios_comisionados`
--
ALTER TABLE `servicios_comisionados`
  MODIFY `idservicios_comisionados` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `servicios_destinos`
--
ALTER TABLE `servicios_destinos`
  MODIFY `idservicios_destinos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios_escala_movilidades`
--
ALTER TABLE `servicios_escala_movilidades`
  MODIFY `idservicios_escala_movilidades` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `servicios_estados`
--
ALTER TABLE `servicios_estados`
  MODIFY `idservicios_estados` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `servicios_incidencias`
--
ALTER TABLE `servicios_incidencias`
  MODIFY `idservicios_incidencias` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios_solicitud`
--
ALTER TABLE `servicios_solicitud`
  MODIFY `idservicio_solicitud` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `servicios_vales`
--
ALTER TABLE `servicios_vales`
  MODIFY `idservicios_vales` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios_x_solicitudes`
--
ALTER TABLE `servicios_x_solicitudes`
  MODIFY `idservicios_x_solicitudes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT de la tabla `soat`
--
ALTER TABLE `soat`
  MODIFY `idsoat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `idsucursales` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `talleres`
--
ALTER TABLE `talleres`
  MODIFY `idtalleres` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tarjetas_combustible`
--
ALTER TABLE `tarjetas_combustible`
  MODIFY `idtarjetas_combustible` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tarjeta_propiedad`
--
ALTER TABLE `tarjeta_propiedad`
  MODIFY `idtarjeta_propiedad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tickets_combustible`
--
ALTER TABLE `tickets_combustible`
  MODIFY `idticket_combustible` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT de la tabla `tickets_combustible_adjuntos`
--
ALTER TABLE `tickets_combustible_adjuntos`
  MODIFY `idtickets_combustible_adjuntos` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tickets_x_factura_cabecera`
--
ALTER TABLE `tickets_x_factura_cabecera`
  MODIFY `idtickets_x_factura_cabecera` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tickets_x_factura_detalle`
--
ALTER TABLE `tickets_x_factura_detalle`
  MODIFY `idtickets_x_factura_detalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_combustible`
--
ALTER TABLE `tipo_combustible`
  MODIFY `idtipo_combustible` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipo_identificacion`
--
ALTER TABLE `tipo_identificacion`
  MODIFY `idtipo_identificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_licencia`
--
ALTER TABLE `tipo_licencia`
  MODIFY `idtipo_licencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipo_vehiculo`
--
ALTER TABLE `tipo_vehiculo`
  MODIFY `idtipos_vehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `trabajos_x_evaluaciones`
--
ALTER TABLE `trabajos_x_evaluaciones`
  MODIFY `idtrabajos_x_evaluaciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `ubigeo`
--
ALTER TABLE `ubigeo`
  MODIFY `idubigeo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3701;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `idvehiculos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adjuntos_contratos`
--
ALTER TABLE `adjuntos_contratos`
  ADD CONSTRAINT `fk_adjuntos_contratos_contratos1` FOREIGN KEY (`contratos_idcontratos`) REFERENCES `contratos` (`idcontratos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `adjuntos_evaluaciones`
--
ALTER TABLE `adjuntos_evaluaciones`
  ADD CONSTRAINT `fk_adjuntos_evaluaciones_evaluaciones_x_servicios1` FOREIGN KEY (`idevaluaciones_x_servicios`) REFERENCES `evaluaciones_x_servicios` (`idevaluaciones_x_servicios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `adjuntos_factura`
--
ALTER TABLE `adjuntos_factura`
  ADD CONSTRAINT `fk_adjuntos_factura_facturas1` FOREIGN KEY (`facturas_idfacturas`) REFERENCES `facturas` (`idfacturas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `adjuntos_ordenes_compra`
--
ALTER TABLE `adjuntos_ordenes_compra`
  ADD CONSTRAINT `fk_adjuntos_ordenes_compra_ordenes_compra1` FOREIGN KEY (`ordenes_compra_idordenes_compra`) REFERENCES `ordenes_compra` (`idordenes_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `adjuntos_usuarios`
--
ALTER TABLE `adjuntos_usuarios`
  ADD CONSTRAINT `fk_adjuntos_usuarios_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `adjuntos_vehiculos`
--
ALTER TABLE `adjuntos_vehiculos`
  ADD CONSTRAINT `fk_adjuntos_vehiculos` FOREIGN KEY (`vehiculos_idvehiculos`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `areas`
--
ALTER TABLE `areas`
  ADD CONSTRAINT `fk_areas_sedes1` FOREIGN KEY (`sedes_idsedes`) REFERENCES `sedes` (`idsedes`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `chofer`
--
ALTER TABLE `chofer`
  ADD CONSTRAINT `fk_chofer_sedes1` FOREIGN KEY (`sedes_idsedes`) REFERENCES `sedes` (`idsedes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_tipo_identificacion1` FOREIGN KEY (`idtipo_identificacion`) REFERENCES `tipo_identificacion` (`idtipo_identificacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_tipo_licencia1` FOREIGN KEY (`idtipo_licencia`) REFERENCES `tipo_licencia` (`idtipo_licencia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_vehiculos1` FOREIGN KEY (`vehiculos_idvehiculos`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD CONSTRAINT `fk_contratos_proveedores1` FOREIGN KEY (`proveedores_idproveedores`) REFERENCES `proveedores` (`idproveedores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contratos_sedes1` FOREIGN KEY (`sedes_idsedes`) REFERENCES `sedes` (`idsedes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contratos_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `contratos_item_adjudicados`
--
ALTER TABLE `contratos_item_adjudicados`
  ADD CONSTRAINT `fk_contratos_item_adjudicados_contratos1` FOREIGN KEY (`contratos_idcontratos`) REFERENCES `contratos` (`idcontratos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contratos_item_adjudicados_medida_combustible1` FOREIGN KEY (`idmedida_combustible`) REFERENCES `medida_combustible` (`idmedida_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contratos_item_adjudicados_tipo_combustible1` FOREIGN KEY (`idtipo_combustible`) REFERENCES `tipo_combustible` (`idtipo_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `evaluaciones_x_servicios`
--
ALTER TABLE `evaluaciones_x_servicios`
  ADD CONSTRAINT `fk_evaluaciones_x_servicios_mantenimiento_evaluaciones1` FOREIGN KEY (`idmantenimiento_evaluaciones`) REFERENCES `mantenimiento_evaluaciones` (`idmantenimiento_evaluaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_evaluaciones_x_servicios_servicios_x_solicitudes1` FOREIGN KEY (`idservicios_x_solicitudes`) REFERENCES `servicios_x_solicitudes` (`idservicios_x_solicitudes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_evaluaciones_x_servicios_talleres1` FOREIGN KEY (`talleres_idtalleres`) REFERENCES `talleres` (`idtalleres`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `fk_facturas_ordenes_compra1` FOREIGN KEY (`ordenes_compra_idordenes_compra`) REFERENCES `ordenes_compra` (`idordenes_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `facturas_combustible`
--
ALTER TABLE `facturas_combustible`
  ADD CONSTRAINT `fk_facturas_combustible_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_facturas_combustible_tipo_combustible1` FOREIGN KEY (`idtipo_combustible`) REFERENCES `tipo_combustible` (`idtipo_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_facturas_combustible_vehiculos1` FOREIGN KEY (`idvehiculos`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mantenimiento_alertas`
--
ALTER TABLE `mantenimiento_alertas`
  ADD CONSTRAINT `fk_mantenimiento_alertas_mantenimiento_servicios1` FOREIGN KEY (`idmantenimiento_servicios`) REFERENCES `mantenimiento_servicios` (`idmantenimiento_servicios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mantenimiento_alertas_medida_uso1` FOREIGN KEY (`id_medida_uso`) REFERENCES `medida_uso` (`id_medida_uso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mantenimiento_alertas_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mantenimiento_alertas_vehiculos1` FOREIGN KEY (`vehiculos_idvehiculos`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mantenimiento_componentes`
--
ALTER TABLE `mantenimiento_componentes`
  ADD CONSTRAINT `fk_mantenimiento_componentes_mantenimiento_sistemas1` FOREIGN KEY (`idmantenimiento_sistemas`) REFERENCES `mantenimiento_sistemas` (`idmantenimiento_sistemas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mantenimiento_evaluaciones`
--
ALTER TABLE `mantenimiento_evaluaciones`
  ADD CONSTRAINT `fk_mantenimiento_evaluaciones_mantenimiento_solicitudes1` FOREIGN KEY (`idmantenimiento_solicitudes`) REFERENCES `mantenimiento_solicitudes` (`idmantenimiento_solicitudes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mantenimiento_evaluaciones_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mantenimiento_servicios`
--
ALTER TABLE `mantenimiento_servicios`
  ADD CONSTRAINT `fk_mantenimiento_servicios_mantenimiento_sistemas1` FOREIGN KEY (`idmantenimiento_sistemas`) REFERENCES `mantenimiento_sistemas` (`idmantenimiento_sistemas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mantenimiento_servicios_mantenimiento_tipos_servicios1` FOREIGN KEY (`idmantenimiento_tipos_servicios`) REFERENCES `mantenimiento_tipos_servicios` (`idmantenimiento_tipos_servicios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mantenimiento_servicios_medida_uso1` FOREIGN KEY (`id_medida_uso`) REFERENCES `medida_uso` (`id_medida_uso`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mantenimiento_solicitudes`
--
ALTER TABLE `mantenimiento_solicitudes`
  ADD CONSTRAINT `fk_mantenimiento_solicitudes_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mantenimiento_solicitudes_vehiculos1` FOREIGN KEY (`vehiculos_idvehiculos`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `modelos_vehiculos`
--
ALTER TABLE `modelos_vehiculos`
  ADD CONSTRAINT `fk_modelos_vehiculos_marcas_vehiculos1` FOREIGN KEY (`idmarcas_vehiculos`) REFERENCES `marcas_vehiculos` (`idmarcas_vehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `modelos_x_servicios`
--
ALTER TABLE `modelos_x_servicios`
  ADD CONSTRAINT `fk_marcas_x_servicios_mantenimiento_servicios1` FOREIGN KEY (`idmantenimiento_servicios`) REFERENCES `mantenimiento_servicios` (`idmantenimiento_servicios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_marcas_x_servicios_modelos_vehiculos1` FOREIGN KEY (`idmodelos_vehiculos`) REFERENCES `modelos_vehiculos` (`idmodelos_vehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ordenes_compra`
--
ALTER TABLE `ordenes_compra`
  ADD CONSTRAINT `fk_ordenes_compra_contratos1` FOREIGN KEY (`contratos_idcontratos`) REFERENCES `contratos` (`idcontratos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ordenes_compra_proveedores1` FOREIGN KEY (`proveedores_idproveedores`) REFERENCES `proveedores` (`idproveedores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ordenes_compra_sedes1` FOREIGN KEY (`sedes_idsedes`) REFERENCES `sedes` (`idsedes`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ordenes_compra_items`
--
ALTER TABLE `ordenes_compra_items`
  ADD CONSTRAINT `fk_facturas_items_contratos_item_adjudicados1` FOREIGN KEY (`id_item_adjudicados`) REFERENCES `contratos_item_adjudicados` (`id_item_adjudicados`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_facturas_items_ordenes_compra1` FOREIGN KEY (`idordenes_compra`) REFERENCES `ordenes_compra` (`idordenes_compra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ordenes_compra_items_medida_combustible1` FOREIGN KEY (`idmedida_combustible`) REFERENCES `medida_combustible` (`idmedida_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ordenes_compra_items_tipo_combustible1` FOREIGN KEY (`idtipo_combustible`) REFERENCES `tipo_combustible` (`idtipo_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orden_trabajo`
--
ALTER TABLE `orden_trabajo`
  ADD CONSTRAINT `fk_orden_trabajo_mantenimiento_evaluaciones1` FOREIGN KEY (`idmantenimiento_evaluaciones`) REFERENCES `mantenimiento_evaluaciones` (`idmantenimiento_evaluaciones`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_orden_trabajo_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD CONSTRAINT `fk_sedes_empresas1` FOREIGN KEY (`empresas_idempresas`) REFERENCES `empresas` (`idempresas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `servicios_cierre_chofer`
--
ALTER TABLE `servicios_cierre_chofer`
  ADD CONSTRAINT `fk_servicios_registro_acciones_servicios_solicitud1` FOREIGN KEY (`idservicio_solicitud`) REFERENCES `servicios_solicitud` (`idservicio_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `servicios_cierre_usuario`
--
ALTER TABLE `servicios_cierre_usuario`
  ADD CONSTRAINT `fk_servicios_cierre_servicios_solicitud1` FOREIGN KEY (`idservicio_solicitud`) REFERENCES `servicios_solicitud` (`idservicio_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_servicios_cierre_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `servicios_comisionados`
--
ALTER TABLE `servicios_comisionados`
  ADD CONSTRAINT `fk_servicios_comisionados_servicios_solicitud1` FOREIGN KEY (`idservicio_solicitud`) REFERENCES `servicios_solicitud` (`idservicio_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_servicios_comisionados_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `servicios_destinos`
--
ALTER TABLE `servicios_destinos`
  ADD CONSTRAINT `fk_servicios_destinos_servicios_solicitud1` FOREIGN KEY (`idservicio_solicitud`) REFERENCES `servicios_solicitud` (`idservicio_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_servicios_destinos_ubigeo1` FOREIGN KEY (`ubigeo_idubigeo`) REFERENCES `ubigeo` (`idubigeo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `servicios_estados`
--
ALTER TABLE `servicios_estados`
  ADD CONSTRAINT `fk_servicios_estados_servicios_solicitud1` FOREIGN KEY (`idservicio_solicitud`) REFERENCES `servicios_solicitud` (`idservicio_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `servicios_incidencias`
--
ALTER TABLE `servicios_incidencias`
  ADD CONSTRAINT `fk_servicios_incidencias_servicios_solicitud1` FOREIGN KEY (`idservicio_solicitud`) REFERENCES `servicios_solicitud` (`idservicio_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `servicios_solicitud`
--
ALTER TABLE `servicios_solicitud`
  ADD CONSTRAINT `fk_servicios_solicitud_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_servicios_solicitud_ubigeo1` FOREIGN KEY (`ubigeo_idubigeo`) REFERENCES `ubigeo` (`idubigeo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_servicios_solicitud_vehiculos1` FOREIGN KEY (`vehiculos_idvehiculos`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitud_comision_tipo_vehiculo1` FOREIGN KEY (`idtipos_vehiculo`) REFERENCES `tipo_vehiculo` (`idtipos_vehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitud_comision_usuarios1` FOREIGN KEY (`usuarios_idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `servicios_vales`
--
ALTER TABLE `servicios_vales`
  ADD CONSTRAINT `fk_servicios_vales_servicios_escala_movilidades1` FOREIGN KEY (`idservicios_escala_movilidades`) REFERENCES `servicios_escala_movilidades` (`idservicios_escala_movilidades`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_servicios_vales_servicios_solicitud1` FOREIGN KEY (`idservicio_solicitud`) REFERENCES `servicios_solicitud` (`idservicio_solicitud`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `servicios_x_solicitudes`
--
ALTER TABLE `servicios_x_solicitudes`
  ADD CONSTRAINT `fk_servicios_x_solicitudes_mantenimiento_alertas1` FOREIGN KEY (`idmantenimiento_alertas`) REFERENCES `mantenimiento_alertas` (`idmantenimiento_alertas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_servicios_x_solicitudes_mantenimiento_componentes1` FOREIGN KEY (`idmantenimiento_componentes`) REFERENCES `mantenimiento_componentes` (`idmantenimiento_componentes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_servicios_x_solicitudes_mantenimiento_servicios1` FOREIGN KEY (`idmantenimiento_servicios`) REFERENCES `mantenimiento_servicios` (`idmantenimiento_servicios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_servicios_x_solicitudes_mantenimiento_solicitudes1` FOREIGN KEY (`idmantenimiento_solicitudes`) REFERENCES `mantenimiento_solicitudes` (`idmantenimiento_solicitudes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_servicios_x_solicitudes_mantenimiento_tipos_servicios1` FOREIGN KEY (`idmantenimiento_tipos_servicios`) REFERENCES `mantenimiento_tipos_servicios` (`idmantenimiento_tipos_servicios`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `soat`
--
ALTER TABLE `soat`
  ADD CONSTRAINT `fk_soat_vehiculos1` FOREIGN KEY (`vehiculos_idvehiculos`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sucursales`
--
ALTER TABLE `sucursales`
  ADD CONSTRAINT `fk_sucursales_proveedores1` FOREIGN KEY (`proveedores_idproveedores`) REFERENCES `proveedores` (`idproveedores`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tarjetas_combustible`
--
ALTER TABLE `tarjetas_combustible`
  ADD CONSTRAINT `fk_tarjetas_combustible_contratos_item_adjudicados1` FOREIGN KEY (`id_item_adjudicados`) REFERENCES `contratos_item_adjudicados` (`id_item_adjudicados`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tarjetas_combustible_proveedores1` FOREIGN KEY (`proveedores_idproveedores`) REFERENCES `proveedores` (`idproveedores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tarjetas_combustible_vehiculos1` FOREIGN KEY (`vehiculos_idvehiculos`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tarjeta_propiedad`
--
ALTER TABLE `tarjeta_propiedad`
  ADD CONSTRAINT `fk_tarjeta_propiedad_vehiculos1` FOREIGN KEY (`vehiculos_idvehiculos`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tickets_combustible`
--
ALTER TABLE `tickets_combustible`
  ADD CONSTRAINT `fk_recarga_combustible_vehiculos1` FOREIGN KEY (`idvehiculos`) REFERENCES `vehiculos` (`idvehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tickets_combustible_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tickets_combustible_sedes1` FOREIGN KEY (`sedes_idsedes`) REFERENCES `sedes` (`idsedes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tickets_combustible_sucursales1` FOREIGN KEY (`idsucursales`) REFERENCES `sucursales` (`idsucursales`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tickets_combustible_tarjetas_combustible1` FOREIGN KEY (`idtarjetas_combustible`) REFERENCES `tarjetas_combustible` (`idtarjetas_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tickets_combustible_tipo_combustible1` FOREIGN KEY (`idtipo_combustible`) REFERENCES `tipo_combustible` (`idtipo_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tickets_combustible_adjuntos`
--
ALTER TABLE `tickets_combustible_adjuntos`
  ADD CONSTRAINT `fk_tickets_combustible_adjuntos_tickets_combustible1` FOREIGN KEY (`tickets_combustible_idticket_combustible`) REFERENCES `tickets_combustible` (`idticket_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tickets_x_factura_cabecera`
--
ALTER TABLE `tickets_x_factura_cabecera`
  ADD CONSTRAINT `fk_tickets_x_factura_cabecera_facturas1` FOREIGN KEY (`facturas_idfacturas`) REFERENCES `facturas` (`idfacturas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tickets_x_factura_detalle`
--
ALTER TABLE `tickets_x_factura_detalle`
  ADD CONSTRAINT `fk_tickets_x_factura_detalle_tickets_combustible1` FOREIGN KEY (`idticket_combustible`) REFERENCES `tickets_combustible` (`idticket_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tickets_x_factura_detalle_tickets_x_factura_cabecera1` FOREIGN KEY (`idtickets_x_factura_cabecera`) REFERENCES `tickets_x_factura_cabecera` (`idtickets_x_factura_cabecera`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `trabajos_x_evaluaciones`
--
ALTER TABLE `trabajos_x_evaluaciones`
  ADD CONSTRAINT `fk_trabajos_x_evaluaciones_evaluaciones_x_servicios1` FOREIGN KEY (`idevaluaciones_x_servicios`) REFERENCES `evaluaciones_x_servicios` (`idevaluaciones_x_servicios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_trabajos_x_evaluaciones_orden_trabajo1` FOREIGN KEY (`idorden_trabajo`) REFERENCES `orden_trabajo` (`idorden_trabajo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_areas1` FOREIGN KEY (`areas_idareas`) REFERENCES `areas` (`idareas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuarios_roles1` FOREIGN KEY (`roles_idroles`) REFERENCES `roles` (`idroles`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuarios_tipo_identificacion1` FOREIGN KEY (`idtipo_identificacion`) REFERENCES `tipo_identificacion` (`idtipo_identificacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuarios_tipo_licencia1` FOREIGN KEY (`idtipo_licencia`) REFERENCES `tipo_licencia` (`idtipo_licencia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `fk_vehiculos_modelos_vehiculos1` FOREIGN KEY (`idmodelos_vehiculos`) REFERENCES `modelos_vehiculos` (`idmodelos_vehiculos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculos_sedes1` FOREIGN KEY (`sedes_idsedes`) REFERENCES `sedes` (`idsedes`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculos_tipo_combustible1` FOREIGN KEY (`idtipo_combustible`) REFERENCES `tipo_combustible` (`idtipo_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculos_tipos_vehiculo1` FOREIGN KEY (`idtipos_vehiculo`) REFERENCES `tipo_vehiculo` (`idtipos_vehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculos_vehiculo_medida_combustible1` FOREIGN KEY (`idmedida_combustible`) REFERENCES `medida_combustible` (`idmedida_combustible`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculos_vehiculo_medida_uso1` FOREIGN KEY (`idmedida_uso`) REFERENCES `medida_uso` (`id_medida_uso`) ON DELETE NO ACTION ON UPDATE NO ACTION;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
