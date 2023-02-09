/*Tipo lista produccion*/
INSERT INTO `tipo_lista_produc`(`TIPO_LISTA_ITEMS`, `DETALLE_TIPO_LISTA`) 
VALUES ('Materia Prima','Material utilizado para la produccion de un producto');
INSERT INTO `tipo_lista_produc`(`TIPO_LISTA_ITEMS`, `DETALLE_TIPO_LISTA`) 
VALUES ('Productos Produccion','Productos que son realizados en la empresa');

/*Estado Produccion*/
INSERT INTO `estado_produccion`(`ESTADO_PRODUCCION`, `DETALLE_ESTADO_PRODU`) 
VALUES ('Prepoduccion','El produccto aun no se encuentra en proceso de produccion');

INSERT INTO `estado_produccion`(`ESTADO_PRODUCCION`, `DETALLE_ESTADO_PRODU`) 
VALUES ('Bodega','El producto se encuentra almacenado esperando ingresar a produccion');

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

/*Tipo Item*/
INSERT INTO `tipo_item`(`TIPO_ITEM`, `DETALLE_TIPO_ITEM`) 
VALUES ('Materia Prima','Material para produccion');
INSERT INTO `tipo_item`(`TIPO_ITEM`, `DETALLE_TIPO_ITEM`) 
VALUES ('Insumos','Insumos para produccion');
INSERT INTO `tipo_item`(`TIPO_ITEM`, `DETALLE_TIPO_ITEM`) 
VALUES ('Producto','Producto para venta');

/*GRUPO_FINANCIERO*/
INSERT INTO CUENTA (CUE_ID_CUENTA,DESCRIPCION_CUENTA,CODIGO_CUENTA,INFORME_FINANCIERO,VALOR_CUENTA) VALUES
(null,"Activos","1.",1,0.0),(1,"Activos corrientes","1.1.",1,0.0),(2,"Bancos","1.1.1.",1,0.0),
(3,"Banco Pichincha","1.1.1.1.",1,5000.0),(2,"Inventario","1.1.2.",1,0.0),
(1,"Activos fijos","1.2.",1,0.0),(null,"Pasivos","2.",1,0.0),(7,"Pasivos corrientes","2.1.",1,0.0),
(8,"Cuentas por pagar","2.1.1.",1,0.0),(9,"Pago de nómina","2.1.1.1.",1,0.0),(9,"Beneficios sociales","2.1.1.2.",1,0.0),
(7,"Pasivos fijos","2.2.",1,0.0),(null,"Patrimonio","3.",1,0.0),(null,"Ingresos","4.",2,0.0),(14,"Ventas","4.1.",2,0.0),
(null,"Costos","5",2,0.0),(16,"Costos Directos","5.1.",2,0.0),(17,"Costos operativos","5.1.1.",2,0.0),
(17,"Costos de ventas","5.1.2.",2,0.0),(null,"Gastos","6.",2,0.0),(20,"Gastos nómina","6.1.",2,0.0);

INSERT INTO departamento( ID_CUENTA, NOMBRE_DEPARTAMENTO,CODIGO_CUENTA, CUENTA) VALUES (21,'Administrativo','6.1.1','Gastos nómina');
INSERT INTO cargo_empleado(ID_DEPARTAMENTO,DESCRIPCION_CARGO) VALUES (1,'Contador');
INSERT INTO banco(ID_CUENTA,NOMBRE_BANCO, SALDO) VALUES (4,'Banco Pichincha',5000);
INSERT INTO parametro_iess(NOMBRE_PARAMETRO, VALOR) VALUES ('Personal',9.4);
INSERT INTO parametro_iess(NOMBRE_PARAMETRO, VALOR) VALUES ('Patronal',11.5);
INSERT INTO `movimiento_empleado`(`ID_CUENTA`, `ID_PARAMETRO_IESS`, `DESCRIPCION_MOVIMIENTO_ENPLEADO`, `VALOR_MOVIMIENTO_EMPLEADO`) VALUES (11,1,'personal',0.0);
INSERT INTO `movimiento_empleado`(`ID_CUENTA`, `ID_PARAMETRO_IESS`, `DESCRIPCION_MOVIMIENTO_ENPLEADO`, `VALOR_MOVIMIENTO_EMPLEADO`) VALUES (10,null,'Pago de nómina',0.0);
INSERT INTO `movimiento_empleado`(`ID_CUENTA`, `ID_PARAMETRO_IESS`, `DESCRIPCION_MOVIMIENTO_ENPLEADO`, `VALOR_MOVIMIENTO_EMPLEADO`) VALUES (11,2,'patronal',0.0);


INSERT INTO `empleado`(`ID_CUENTA`, `ID_CARGO_EMPLEADO`, `ID_MOVIMIENTO_EMPLEADO`, `NOMBRE_EMPLEADO`, `APELLIDO_EMPLEADO`,
                       `CEDULA_EMPLEADO`, `HORAS_LABORADAS`, `SUELDO`, `SUELDO_NETO`) 
VALUES (6,8,1,'ELVIS','MONTALUISA','0503408080',40,500,450);

INSERT INTO `lista_items`(`ID_EMPLEADO`, `ID_CUENTA`, `ID_TIPO_LISTA_PRODUC`, `DETALLE_LISTA`, `FECHA_LISTA`, `ESTADO_LISTA`,
                          `DETALLE_ESTADO_LISTA`) 
VALUES (1,5,2,'Productos para llenar el stock','2023-01-26','EN PROCESO','PROCESO DE PRODUCCION');

INSERT INTO `item`(`ID_LISTA_ITEMS`, `ID_ESTADO_PRODUCION`, `ID_TIPO_ITEM`, `CODIGO_ITEM`, `NOMBRE_ITEM`, `FECHA_FABRI_ITEM`,
                   `FECHA1_CADU_ITEM`, `FECHA2_CADU_ITEM`, `LOTE_ITEM`, `CANTIDAD_LOTE_ITEM`, `PRECIO_ITEM`, `PESO_ITEM`,
                   `CONSERVACION_ITEM`, `DETALLE_ITEM`) 
VALUES (1,1,3,'101010','MORTADELA PLUMROSE','','','','','','','','','');

INSERT INTO `item`(`ID_LISTA_ITEMS`, `ID_ESTADO_PRODUCION`, `ID_TIPO_ITEM`, `CODIGO_ITEM`, `NOMBRE_ITEM`, `FECHA_FABRI_ITEM`,
                   `FECHA1_CADU_ITEM`, `FECHA2_CADU_ITEM`, `LOTE_ITEM`, `CANTIDAD_LOTE_ITEM`, `PRECIO_ITEM`, `PESO_ITEM`,
                   `CONSERVACION_ITEM`, `DETALLE_ITEM`) 
VALUES (1,1,3,'101010','MORTADELA PLUMROSE','2023-01-26','2023-02-26','2023-03-26','LT1010',100,1.5,200,'Refrigerado',
        'Linea Diaria');

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

