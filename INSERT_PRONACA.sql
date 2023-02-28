/*Tipo lista produccion*/
/*INSERT INTO `tipo_lista_produc`(`TIPO_LISTA_ITEMS`, `DETALLE_TIPO_LISTA`) 
VALUES ('Materia Prima','Material utilizado para la produccion de un producto');
INSERT INTO `tipo_lista_produc`(`TIPO_LISTA_ITEMS`, `DETALLE_TIPO_LISTA`) 
VALUES ('Productos Produccion','Productos que son realizados en la empresa');*/

/* ubicaciones */
INSERT INTO `ubicacion` (`ID_UBICACION`, `ZONA_UBICACION`, `SECTOR_UBICACION`) VALUES (NULL, 'Norte', 'La delicia, el condado');
INSERT INTO `ubicacion` (`ID_UBICACION`, `ZONA_UBICACION`, `SECTOR_UBICACION`) VALUES (NULL, 'Eloy Alfaro', 'San Bartolo');

/*Estado Produccion*/
INSERT INTO `estado_produccion`(`ESTADO_PRODUCCION`, `DETALLE_ESTADO_PRODU`) 
VALUES ('Prepoduccion','El produccto aun no se encuentra en proceso de produccion');

INSERT INTO `estado_produccion`(`ESTADO_PRODUCCION`, `DETALLE_ESTADO_PRODU`) 
VALUES ('Bodegaje','El producto se encuentra almacenado esperando ingresar a produccion');

INSERT INTO `estado_produccion`(`ESTADO_PRODUCCION`, `DETALLE_ESTADO_PRODU`) 
VALUES ('Produccion','El producto se encuentra en proceso de produccion');

INSERT INTO `estado_produccion`(`ESTADO_PRODUCCION`, `DETALLE_ESTADO_PRODU`) 
VALUES ('Control de calidad','El producto esta en inspeccion de defectos ');

INSERT INTO `estado_produccion`(`ESTADO_PRODUCCION`, `DETALLE_ESTADO_PRODU`) 
VALUES ('Embalado y etiquetado','El producto esta en proceso de embalado y etiquetado para entrega final');

INSERT INTO `estado_produccion`(`ESTADO_PRODUCCION`, `DETALLE_ESTADO_PRODU`) 
VALUES ('Finalizado','El producto esta listo para la venta al cliente');

INSERT INTO `estado_produccion`(`ESTADO_PRODUCCION`, `DETALLE_ESTADO_PRODU`) 
VALUES ('Sin Stock','Este producto se encuentra agotado');

/*GRUPO_FINANCIERO*/
/*
INformes Financieros , Balance y Estado de Resultados
*/
INSERT INTO `informe_financiero` (`ID_INFORME_FINANCIERO`, `TIPO_INFORME`, `FECHA`) VALUES ('1', 'Balance', '2019-05-18');
INSERT INTO `informe_financiero` (`ID_INFORME_FINANCIERO`, `TIPO_INFORME`, `FECHA`) VALUES ('2', 'Estado', '2019-05-18');


INSERT INTO CUENTA (CUE_ID_CUENTA,DESCRIPCION_CUENTA,CODIGO_CUENTA,ID_INFORME_FINANCIERO,VALOR_CUENTA) VALUES
(null,"Activos","1.",1,0.0),(1,"Activos corrientes","1.1.",1,0.0),(2,"Caja","1.1.1.",1,0.0),
(3,"Caja general","1.1.1.01.",1,0.0),(3,"Caja chica","1.1.1.02.",1,0.0),(2,"Bancos","1.1.2.",1,0.0),
(6,"Banco Pichincha","1.1.2.01.",1,5000.0),(6,"Banco Internacional","1.1.2.02.",1,5000.0),
(2,"Inventario","1.1.3.",1,0.0),(9,"Inventario materia prima","1.1.3.01.",1,0.0),(9,"Inventario insumos","1.1.3.02",1,0.0),
(9,"Inventario producto","1.1.3.03.",1,0.0),(9,"Inventario subproducto","1.1.3.04.",1,0.0),(2,"Cuentas por cobrar","1.1.4.",1,0.0),
(14,"Clientes","1.1.4.01",1,0.0),(2,"Cuentas por cobrar empleados","1.1.5.",1,0.0),
(16,"Anticipos y prestamos a empleados","1.1.5.01",1,0.0),(2,"Impuestos anticipados","1.1.6.",1,0.0),
(18,"Iva en compras 12%","1.1.6.01.",1,0.0),(1,"Activos fijos","1.2.",1,0.0),
(20,"Propiedad planta y equipo","1.2.1.",1,0.0),(20,"Depreciaciones acumuladas","1.2.2.",1,0.0),
(null,"Pasivos","2.",1,0.0),(23,"Pasivos corrientes","2.1.",1,0.0),
(24,"Cuentas por pagar","2.1.1.",1,0.0),(25,"Cuentas por pagar proveedor","2.1.1.01.",1,0.0),
(24,"Anticipo de clientes","2.1.2.",1,0.0),(24,"Obligaciones fiscales por pagar","2.1.3.",1,0.0),
(28,"IVA en ventas","2.1.3.01.",1,0.0),(28,"Retención del IVA","2.1.3.02.",1,0.0),
(24,"Obligaciones con el IESS","2.1.4.",1,0.0),(31,"Aporte personal por pagar","2.1.4.01.",1,0.0),
(31,"Aporte patronal por pagar","2.1.4.02.",1,0.0),(24,"Provisión beneficios sociales","2.1.5.",1,0.0),
(24,"Sueldos, comisiones por pagar","2.1.6.",1,0.0),(35,"Nómina por pagar","2.1.6.01.",1,0.0),
(23,"Pasivos fijos","2.2.",1,0.0),(37,"Obligaciones financieras","2.2.1.",1,75.526),(37,"Pasivos por arrendamiento","2.2.2.",1,3.571),
(null,"Patrimonio","3.",1,0.0),(40,"Capital","3.1.",1,407.166),(40,"Reservas","3.2.",1,130.000),(null,"Ingresos","4.",2,0.0),
(43,"Ingresos operativos","4.1.",2,0.0),(44,"Ventas y devoluciones","4.1.1.",2,0.0),(45,"Ventas","4.1.1.01.",2,0.0),(45,"Devoluciones","4.1.1.02.",2,0.0),
(null,"Costos","5",2,0.0),(48,"Costos Directos","5.1.",2,0.0),(49,"Costos operativos","5.1.1.",2,0.0),
(50,"Costos personal comercial","5.1.1.01",2,0.0),(50,"Costos personal producción","5.1.1.02.",2,0.0),
(49,"Costos de ventas","5.1.2.",2,0.0),(53,"Costos de ventas de mercancia","5.1.2.01.",2,0.0),(null,"Gastos","6.",2,0.0),(55,"Gastos operativos","6.1.",2,0.0),
(56,"Gastos nómina","6.1.1.",2,0.0),(57,"Gastos personal administrativo","6.1.1.01",2,0.0),(57,"Gastos personal financiero","6.1.1.02.",2,0.0);

INSERT INTO departamento( ID_CUENTA, NOMBRE_DEPARTAMENTO,CODIGO_CUENTA, CUENTA) VALUES (58,'Administrativo','6.1.1.01.','Gastos personal administrativo');
INSERT INTO `departamento`(`ID_CUENTA`, `NOMBRE_DEPARTAMENTO`, `CODIGO_CUENTA`, `CUENTA`) VALUES (52,'Produccion','5.1.1.02.','Costos personal producción');
INSERT INTO departamento( ID_CUENTA, NOMBRE_DEPARTAMENTO,CODIGO_CUENTA, CUENTA) VALUES (51,'Comercial','5.1.1.01.','Costos personal comercial');
INSERT INTO `departamento`(`ID_CUENTA`, `NOMBRE_DEPARTAMENTO`, `CODIGO_CUENTA`, `CUENTA`) VALUES (59,'Financiero','6.1.1.02.','Gastos personal financiero');

INSERT INTO cargo_empleado(ID_DEPARTAMENTO,DESCRIPCION_CARGO) VALUES (1,'Contador');
INSERT INTO `cargo_empleado`(`ID_DEPARTAMENTO`, `DESCRIPCION_CARGO`) VALUES (2,'Gestor de Produccion');
INSERT INTO `cargo_empleado`(`ID_DEPARTAMENTO`, `DESCRIPCION_CARGO`) VALUES (2,'Operario Produccion');
INSERT INTO banco(ID_CUENTA,NOMBRE_BANCO, SALDO) VALUES (7,'Banco Pichincha',5000);
INSERT INTO banco(ID_CUENTA,NOMBRE_BANCO, SALDO) VALUES (8,'Banco Internacional',5000);
INSERT INTO parametro_iess(NOMBRE_PARAMETRO, VALOR) VALUES ('Personal',9.4);
INSERT INTO parametro_iess(NOMBRE_PARAMETRO, VALOR) VALUES ('Patronal',11.5);
INSERT INTO `movimiento_empleado`(`ID_CUENTA`, `ID_PARAMETRO_IESS`, `DESCRIPCION_MOVIMIENTO_ENPLEADO`, `VALOR_MOVIMIENTO_EMPLEADO`) VALUES (23,1,'personal',0.0);
INSERT INTO `movimiento_empleado`(`ID_CUENTA`, `ID_PARAMETRO_IESS`, `DESCRIPCION_MOVIMIENTO_ENPLEADO`, `VALOR_MOVIMIENTO_EMPLEADO`) VALUES (27,null,'Nómina por pagar',0.0);
INSERT INTO `movimiento_empleado`(`ID_CUENTA`, `ID_PARAMETRO_IESS`, `DESCRIPCION_MOVIMIENTO_ENPLEADO`, `VALOR_MOVIMIENTO_EMPLEADO`) VALUES (24,2,'patronal',0.0);


INSERT INTO `empleado` (`ID_EMPLEADO`, `ID_CARGO_EMPLEADO`, `ID_BANCO`, `ID_MOVIMIENTO_EMPLEADO`, `NOMBRE_EMPLEADO`, `APELLIDO_EMPLEADO`,
 `CEDULA_EMPLEADO`, `CORREO`, `HORAS_LABORADAS`, `SUELDO_FIJO`, `SUELDO_HORAS`, `SUELDO`, `SUELDO_NETO`) 
VALUES ('1', '1', '1', '2', 'ELVIS', 'MONTALUISA', '0503408080', 'elvis@gmail.com', '40', '500.00', '3.00', '620.00', '490.42');

INSERT INTO `empleado` (`ID_EMPLEADO`, `ID_CARGO_EMPLEADO`, `ID_BANCO`, `ID_MOVIMIENTO_EMPLEADO`, `NOMBRE_EMPLEADO`, `APELLIDO_EMPLEADO`, 
 `CEDULA_EMPLEADO`, `CORREO`, `HORAS_LABORADAS`, `SUELDO_FIJO`, `SUELDO_HORAS`, `SUELDO`, `SUELDO_NETO`) 
VALUES (NULL, '3', '1', '2', 'JOSE', 'PALLO', '1724082605', 'jose.pallo01@epn.edu.ec', '40', '500', '3', '620', '490.42');

/*Tipo Item*/
INSERT INTO `tipo_item`(`ID_CUENTA`,`TIPO_ITEM`, `DETALLE_TIPO_ITEM`) 
VALUES (10,'Materia Prima','Material para produccion');
INSERT INTO `tipo_item`(`ID_CUENTA`,`TIPO_ITEM`, `DETALLE_TIPO_ITEM`) 
VALUES (11,'Insumos','Insumos para produccion');
INSERT INTO `tipo_item`(`ID_CUENTA`,`TIPO_ITEM`, `DETALLE_TIPO_ITEM`) 
VALUES (12,'Producto','Producto para venta');


INSERT INTO `lista_items`(`ID_EMPLEADO`, `DETALLE_LISTA`, `FECHA_LISTA`, `ESTADO_LISTA`,
                          `DETALLE_ESTADO_LISTA`,`ID_RECETAP`) 
VALUES (1,'PLUMROSE MORTADELA EN','2023-01-20','GENERADA','PROCESO DE PRODUCCION',1);

INSERT INTO `proveedor` (`NOMBRE_PROVEEDOR`, `TIPO_PROVEEDOR`, `RUC`) 
VALUES ('PROVEEDOR DE CARNE ', 'CARNICO', '1234567890001');

INSERT INTO `pedido_proveedor` (`ID_PEDIDO_PROVEEDOR`, `ID_CUENTA`, `ID_PROVEEDOR`, `FECHA_PEDIDO_PROVEEDOR`, `DETALLE_PEDIDO_PROVEEDOR`) 
VALUES (NULL, '17', '1', '2023-01-18', 'PEDIDO CARNE PARA EMBUTIDOS PLUMROSE');

INSERT INTO `receta_produccion`(`NOMBRE_RECETA`, `DETALLE_PEDIDO_PRODUCCION`) 
VALUES ('MORTADELA PLUMROSE','MORTADELA LINEA DIARIA FAMILIAR - PESO:170G');

INSERT INTO `paso_receta`(`ID_RECETA_PRODUCCION`, `NOMBRE_PASO_RECETA`, `DESCRIPCION_PASO_RECETA`, `CATEGORIA_PASO_RECETA`, `TIEMPO_PRODUC_RECETA`) 
VALUES (1,'CORTE Y PREPARACION','CORTE DE LA CARNE EN PARTES MAS PEQUENAS','EMBUTIDOS-POLLOS-CHANCHO-PAVO','1:00');

INSERT INTO `paso_receta`(`ID_RECETA_PRODUCCION`, `NOMBRE_PASO_RECETA`, `DESCRIPCION_PASO_RECETA`, `CATEGORIA_PASO_RECETA`, `TIEMPO_PRODUC_RECETA`) 
VALUES (1,'EMPACADO Y ETIQUETADO','AGREGAR ESPECIAS, EMPACADO Y ETIQUETADO','EMBUTIDOS-POLLOS-CHANCHO-PAVO','4:00');

INSERT INTO `paso_receta`(`ID_RECETA_PRODUCCION`, `NOMBRE_PASO_RECETA`, `DESCRIPCION_PASO_RECETA`, `CATEGORIA_PASO_RECETA`, `TIEMPO_PRODUC_RECETA`) 
VALUES (1,'CONTROL DE CALIDAD','CONTROL DE EMPAQUE, PRODUCTO Y DATOS ETIQUETA','EMBUTIDOS-POLLOS-CHANCHO-PAVO','2:00');

INSERT INTO `item`(`ID_LISTA_ITEMS`, `ID_ESTADO_PRODUCION`, `ID_TIPO_ITEM`, `CODIGO_ITEM`, `NOMBRE_ITEM`, `FECHA_FABRI_ITEM`,
                   `FECHA1_CADU_ITEM`, `FECHA2_CADU_ITEM`, `LOTE_ITEM`, `CANTIDAD_LOTE_ITEM`,`UNIDAD_MEDIDA`,`PRECIO_ITEM`, 						   
				   `PESO_ITEM`,`CONSERVACION_ITEM`, `DETALLE_ITEM`,`ID_PASO_RECETA`) 
VALUES (1,2,1,'MP1010','CARNE FRESCA','2023-01-20','2023-02-20','2023-03-20','23EN10',10,'BANDEJAS/KG',50,10,'Refrigerado',
        'CARNE PARA EMBUTIDOS',1);

INSERT INTO `item`(`ID_LISTA_ITEMS`, `ID_ESTADO_PRODUCION`, `ID_TIPO_ITEM`, `CODIGO_ITEM`, `NOMBRE_ITEM`, `FECHA_FABRI_ITEM`,
                   `FECHA1_CADU_ITEM`, `FECHA2_CADU_ITEM`, `LOTE_ITEM`, `CANTIDAD_LOTE_ITEM`,`UNIDAD_MEDIDA`,`PRECIO_ITEM`,
                   `PESO_ITEM`,`CONSERVACION_ITEM`, `DETALLE_ITEM`,`ID_PASO_RECETA`) 
VALUES (1,3,1,'SP1010','CARNE LISTA PARA EMBUTIDOS','2023-01-20','2023-02-20','2023-03-
        20','2301EN20',8,'BANDEJAS/KG',50,10,'Refrigerado','CONTENIDO PARA EMBUTIDOS',2);

INSERT INTO `item`(`ID_LISTA_ITEMS`, `ID_ESTADO_PRODUCION`, `ID_TIPO_ITEM`, `CODIGO_ITEM`, `NOMBRE_ITEM`, `FECHA_FABRI_ITEM`,
                   `FECHA1_CADU_ITEM`, `FECHA2_CADU_ITEM`, `LOTE_ITEM`, `CANTIDAD_LOTE_ITEM`,`UNIDAD_MEDIDA`,`PRECIO_ITEM`,
                   `PESO_ITEM`,`CONSERVACION_ITEM`, `DETALLE_ITEM`,`ID_PASO_RECETA`) 
VALUES (1,6,3,'PP1010','MORTADELA PLUMROSE','2023-01-20','2023-02-20','2023-03-
        20','2301EN30',50,'PAQUETE/g',0.99,170,'Refrigerado','LENEA DIARIA FAMILIAR',3);

/*Consulta productos terminados para ventas
SELECT ITEM.ID_ITEM, ITEM.ID_LISTA_ITEMS, ITEM.ID_ESTADO_PRODUCION, ITEM.ID_TIPO_ITEM, ITEM.CODIGO_ITEM, ITEM.NOMBRE_ITEM,
ITEM.FECHA_FABRI_ITEM, ITEM.FECHA1_CADU_ITEM, ITEM.FECHA2_CADU_ITEM, ITEM.LOTE_ITEM, ITEM.CANTIDAD_LOTE_ITEM, ITEM.PRECIO_ITEM,
ITEM.PESO_ITEM, ITEM.CONSERVACION_ITEM, ITEM.DETALLE_ITEM FROM `item`,`tipo_item`,`estado_produccion` 
WHERE item.ID_ESTADO_PRODUCION=estado_produccion.ID_ESTADO_PRODUCCION AND item.ID_TIPO_ITEM=tipo_item.ID_TIPO_ITEM AND
tipo_item.TIPO_ITEM='Producto' AND estado_produccion.ESTADO_PRODUCCION='Finalizado';*/

CREATE PROCEDURE LIST_PRODUCTOS()
SELECT ITEM.ID_ITEM, ITEM.ID_LISTA_ITEMS, ITEM.ID_ESTADO_PRODUCION, ITEM.ID_TIPO_ITEM, ITEM.CODIGO_ITEM, ITEM.NOMBRE_ITEM,
ITEM.FECHA_FABRI_ITEM, ITEM.FECHA1_CADU_ITEM, ITEM.FECHA2_CADU_ITEM, ITEM.LOTE_ITEM, ITEM.CANTIDAD_LOTE_ITEM, ITEM.PRECIO_ITEM,
ITEM.PESO_ITEM, ITEM.CONSERVACION_ITEM, ITEM.DETALLE_ITEM FROM item,tipo_item,estado_produccion 
WHERE item.ID_ESTADO_PRODUCION=estado_produccion.ID_ESTADO_PRODUCCION AND item.ID_TIPO_ITEM=tipo_item.ID_TIPO_ITEM AND
tipo_item.TIPO_ITEM='Producto' AND estado_produccion.ESTADO_PRODUCCION='Finalizado';

CREATE PROCEDURE LIST_ITEM_ALL()
SELECT lista_items.ID_LISTA_ITEMS, lista_items.ID_EMPLEADO,empleado.NOMBRE_EMPLEADO,empleado.APELLIDO_EMPLEADO,
lista_items.DETALLE_LISTA, lista_items.FECHA_LISTA, lista_items.ESTADO_LISTA, 
lista_items.DETALLE_ESTADO_LISTA, lista_items.ID_RECETAP
FROM lista_items, empleado
WHERE lista_items.ID_EMPLEADO=empleado.ID_EMPLEADO; 

CREATE PROCEDURE ITEMS_ALL()
SELECT item.ID_ITEM, item.ID_LISTA_ITEMS, .item.ID_ESTADO_PRODUCION,estado_produccion.ESTADO_PRODUCCION, item.ID_TIPO_ITEM,
tipo_item.TIPO_ITEM,item.CODIGO_ITEM, item.NOMBRE_ITEM, item.FECHA_FABRI_ITEM, item.FECHA1_CADU_ITEM, item.FECHA2_CADU_ITEM,
item.LOTE_ITEM, item.CANTIDAD_LOTE_ITEM, item.PRECIO_ITEM, item.PESO_ITEM, item.CONSERVACION_ITEM, item.DETALLE_ITEM, 
item.ID_PASO_RECETA FROM item, estado_produccion, tipo_item 
WHERE item.ID_ESTADO_PRODUCION=estado_produccion.ID_ESTADO_PRODUCCION and item.ID_TIPO_ITEM=tipo_item.ID_TIPO_ITEM;

/*CLIENTE*/
INSERT INTO `cliente` (`ID_CLIENTE`, `NOMBRE_CLIENTE`, `APELLIDO_CLIENTE`, `RUC_CEDULA`, `EMAIL_CLIENTE`, `ESTADO_CLIENTE`, `ID_UBICACION`, `NUMERO_UBICACION`, `TELEFONO_CLIENTE`) VALUES (NULL, 'Carlos', 'Mantilla', '1720195393', 'carlos.mantilla@epn.edu.ec', 'Activo', '1', 'Oe9-160', '0992586602');
/*PEDIDOS*/
INSERT INTO `pedido` (`ID_PEDIDO`, `ID_CLIENTE`, `ID_EMPLEADO`, `ID_CUENTA`, `FECHA_PEDIDO`, `ESTADO_PEDIDO`, `IVA_PEDIDO`, `SUBTOTAL_PEDIDO`, `TOTAL_PEDIDO`) VALUES (NULL, '1', '1', NULL, '2023-02-26', 'Entregado','2.376','17.43','19.80');
/*DETALLE PEDIDOS*/
INSERT INTO `detalle_pedido` (`ID_DETALLE_PEDIDO`, `ID_PEDIDO`, `ID_ITEM`, `CANTIDAD_PEDIDO`, `PRECIO_DETALLE_PEDIDO`) VALUES (NULL, '1', '3', '20', '19.8');

INSERT INTO `bodega`(`NOMBRE`, `SECTOR_UBICACION`)
VALUES ('Chillogallo','Sur');

INSERT INTO `bodega`(`NOMBRE`, `SECTOR_UBICACION`)
VALUES ('Miraflores','Centro');

INSERT INTO `bodega`(`NOMBRE`, `SECTOR_UBICACION`)
VALUES ('Carcelén','Norte');