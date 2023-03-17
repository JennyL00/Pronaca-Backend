/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     16/1/2023 16:57:43                           */
/*==============================================================*/
drop database if exists pronaca;

create database pronaca;

use pronaca;

drop table if exists ASIENTO;

drop table if exists INFORME_FINANCIERO;

drop table if exists CARGO_EMPLEADO;

drop table if exists CLIENTE;

drop table if exists CUENTA;

drop table if exists DETALLE_PEDIDO;

drop table if exists DEPARTAMENTO;

drop table if exists EMPLEADO;

drop table if exists ITEM;

drop table if exists LISTA_DESECHABLES;

drop table if exists LISTA_ITEMS;

drop table if exists PEDIDO;

drop table if exists PEDIDO_MATERIA_PRIMA;

drop table if exists PREVENTA;

drop table if exists PROVEEDOR;

drop table if exists RECETA_PRODUCCION;

/*==============================================================*/
/* Table: ASIENTO                                               */
/*==============================================================*/
create table ASIENTO
(
   ID_ASIENTO           int not null AUTO_INCREMENT,
   FECHA_ASIENTO        date,
   descripcion_asiento  varchar(100),
   primary key (ID_ASIENTO)
);

/*==============================================================*/
/* Table: BANCO                                                 */
/*==============================================================*/
create table BANCO
(
   ID_BANCO           int not null AUTO_INCREMENT,
   ID_CUENTA            int,
   NOMBRE_BANCO         varchar(100),
   SALDO                float(8,2),
   primary key (ID_BANCO)
);

/*==============================================================*/
/* Table: INFORME_FINANCIERO                                    */
/*==============================================================*/
create table INFORME_FINANCIERO
(
   ID_INFORME_FINANCIERO   int not null AUTO_INCREMENT,
   TIPO_INFORME            varchar(100),
   FECHA DATE NOT NULL,
   primary key (ID_INFORME_FINANCIERO)
);

create table balance_general (
  id_balance int not null AUTO_INCREMENT,
  fecha date not null,
  activos decimal(10,2) not null,
  pasivos decimal(10,2) not null,
  patrimonio decimal(10,2) not null,
  ID_informe_financiero int not null,

  bancos decimal(10,2) not null,
  inventario decimal(10,2) not null,
  cuentas_por_cobrar_cli decimal(10,2) not null,
  iva_compras decimal(10,2) not null,
  
  cuenta_pagar_proveedor decimal(10,2) not null,
  iva_ventas decimal(10,2) not null,
  aportes decimal(10,2) not null,
  nomina decimal(10,2) not null,
  pasivos_fijos decimal(10,2) not null,

  primary key (id_balance),
  foreign key (ID_informe_financiero) references informe_financiero(id_informe_financiero)
);


create table estado_financiero
(
id_estado int not null AUTO_INCREMENT,
fecha date not null,
ingresos decimal(10,2) not null,
costos decimal(10,2) not null,
gastos decimal(10,2) not null,
ID_informe_financiero int not null,
primary key (id_estado),

foreign key (id_informe_financiero) references informe_financiero(id_informe_financiero)
);
/*==============================================================*/
/* Table: CARGO_EMPLEADO                                        */
/*==============================================================*/
create table CARGO_EMPLEADO
(
   ID_CARGO_EMPLEADO     int not null AUTO_INCREMENT,
   ID_DEPARTAMENTO       int,
   DESCRIPCION_CARGO    varchar(100),
   primary key (ID_CARGO_EMPLEADO)
);
/*==============================================================*/
/* Table: CLIENTE                                               */
/*==============================================================*/
create table CLIENTE
(
   ID_CLIENTE int not null AUTO_INCREMENT,
   NOMBRE_CLIENTE varchar(200),
   APELLIDO_CLIENTE varchar(200),
   RUC_CEDULA varchar(50),
   EMAIL_CLIENTE varchar (50),
   ESTADO_CLIENTE varchar(20),
   ID_UBICACION int,
   NUMERO_UBICACION varchar(50),
   TELEFONO_CLIENTE varchar(10),
   primary key (ID_CLIENTE)
);

/*==============================================================*/
/* Table: CUENTA                                                */
/*==============================================================*/
create table CUENTA
(
   ID_CUENTA            int not null AUTO_INCREMENT,
   ID_INFORME_FINANCIERO   int,
   CUE_ID_CUENTA        int,
   DESCRIPCION_CUENTA   varchar(200),
   CODIGO_CUENTA        varchar(100),
   VALOR_CUENTA         float(8,2),
   primary key (ID_CUENTA)
);

/*==============================================================*/
/* Table: DETALLE_ASIENTO                                        */
/*==============================================================*/
create table DETALLE_ASIENTO
(
   ID_DETALLE_ASIENTO    int not null AUTO_INCREMENT,
   ID_ASIENTO            int,
   INFORME_FINANCIERO int,
   ID_CUENTA            int,
   CODIGO_CUENTA        varchar(100),
   CUENTA  varchar(100),
   DEBE                 float(8,2),
   HABER                float(8,2),
   primary key (ID_DETALLE_ASIENTO)
);

/*==============================================================*/
/* Table: DETALLE_PEDIDO                                        */
/*==============================================================*/
create table DETALLE_PEDIDO
(
   ID_DETALLE_PEDIDO    int not null AUTO_INCREMENT,
   ID_PEDIDO            int,
   ID_ITEM              int,
   CANTIDAD_PEDIDO      int,
   SUBTOTAL_DETALLE_PEDIDO float(8,2),
   PRECIO_DETALLE_PEDIDO          float(8,2),
   primary key (ID_DETALLE_PEDIDO)
);

/*==============================================================*/
/* Table: DEPARTAMENTO                                        */
/*==============================================================*/
create table DEPARTAMENTO
(
   ID_DEPARTAMENTO    int not null AUTO_INCREMENT,
   ID_CUENTA          int,
   NOMBRE_DEPARTAMENTO       varchar(100),
   CODIGO_CUENTA        varchar(10),
   CUENTA               varchar(100),
   primary key (ID_DEPARTAMENTO)
);

/*==============================================================*/
/* Table: EMPLEADO                                              */
/*==============================================================*/
create table EMPLEADO
(
   ID_EMPLEADO          int not null AUTO_INCREMENT,
   ID_CARGO_EMPLEADO     int,
   ID_BANCO              int,
   ID_MOVIMIENTO_EMPLEADO int,
   NOMBRE_EMPLEADO      varchar(200),
   APELLIDO_EMPLEADO       varchar(200),
   CEDULA_EMPLEADO      varchar(10),
   CORREO               varchar(200),
   HORAS_LABORADAS      int,
   SUELDO_FIJO          float(8,2),
   SUELDO_HORAS         float(8,2),
   SUELDO               float(8,2),
   SUELDO_NETO          float(8,2),
   primary key (ID_EMPLEADO)
);

/*==============================================================*/
/* Table: ITEM                                                  */
/*==============================================================*/
create table ITEM
(
   ID_ITEM              int not null AUTO_INCREMENT,
   ID_LISTA_ITEMS       int,
   ID_ESTADO_PRODUCION  int,
   ID_TIPO_ITEM         int, 
   CODIGO_ITEM          varchar(100),
   NOMBRE_ITEM          varchar(100),
   FECHA_FABRI_ITEM     date,
   FECHA1_CADU_ITEM     date,
   FECHA2_CADU_ITEM     date,
   LOTE_ITEM            varchar(100),
   CANTIDAD_LOTE_ITEM   int,
   UNIDAD_MEDIDA        varchar(100),
   PRECIO_ITEM          float(8,2),
   PESO_ITEM            float,
   CONSERVACION_ITEM    varchar(100),
   DETALLE_ITEM         text,
   ID_PEDIDO_PROVEEDOR  int, 
   ID_PASO_RECETA		int,
   ID_BODEGA            int,
   primary key (ID_ITEM)
);

/*==============================================================*/
/* Table: TIPO_ITEM                                    			*/
/*==============================================================*/
create table TIPO_ITEM
(
   ID_TIPO_ITEM 		int not null AUTO_INCREMENT,
   ID_CUENTA            int,
   TIPO_ITEM	        varchar(100),
   DETALLE_TIPO_ITEM    text,
   primary key (ID_TIPO_ITEM)
);

/*==============================================================*/
/* Table: ESTADO_PRODUCCION                                     */
/*==============================================================*/
create table ESTADO_PRODUCCION
(
   ID_ESTADO_PRODUCCION int not null AUTO_INCREMENT,
   ESTADO_PRODUCCION    varchar(100),
   DETALLE_ESTADO_PRODU text,
   primary key (ID_ESTADO_PRODUCCION)
);

/*==============================================================*/
/* Table: LISTA_ITEMS                                           */
/*==============================================================*/
create table LISTA_ITEMS
(
   ID_LISTA_ITEMS       int not null AUTO_INCREMENT,
   ID_EMPLEADO          int,
   DETALLE_LISTA        text,
   FECHA_LISTA          date,
   ESTADO_LISTA         varchar(100),
   DETALLE_ESTADO_LISTA text,
   ID_RECETAP		int,
   primary key (ID_LISTA_ITEMS)
);

/*==============================================================*/
/* Table: Parametro_IESS                                          */
/*==============================================================*/
create table PARAMETRO_IESS
(
   ID_PARAMETRO_IESS    int not null AUTO_INCREMENT,
   NOMBRE_PARAMETRO     varchar(100),
   VALOR                float(8,2),
   primary key (ID_PARAMETRO_IESS)
);

/*==============================================================*/
/* Table: PEDIDO                                                */
/*==============================================================*/
create table PEDIDO
(
   ID_PEDIDO            int not null AUTO_INCREMENT,
   ID_CLIENTE           int,
   ID_EMPLEADO          int,
   ID_CUENTA            int,
   FECHA_PEDIDO         date,
   ESTADO_PEDIDO        varchar(100),
   ID_FLOTA             int,
   IVA_PEDIDO           float(8,2),
   SUBTOTAL_PEDIDO      float(8,2),
   TOTAL_PEDIDO         float(8,2),
   primary key (ID_PEDIDO)
);

/*==============================================================*/
/* Table: RECETA_PRODUCCION                                  */
/*==============================================================*/
create table RECETA_PRODUCCION
(
   ID_RECETA_PRODUCCION   int not null AUTO_INCREMENT,
   NOMBRE_RECETA          varchar(200),
   DETALLE_PEDIDO_PRODUCCION varchar(200),
   primary key (ID_RECETA_PRODUCCION)
);

/*==============================================================*/
/* Table: PREVENTA                                              */
/*==============================================================*/
create table PREVENTA
(
   ID_PREVENTA          int not null AUTO_INCREMENT,
   ID_EMPLEADO          int,
   ID_CLIENTE           int,
   FECHA_VISITA_PREVENTA date,
   DESCRIPCION_PREVENTA text,
   primary key (ID_PREVENTA)
);

/*==============================================================*/
/* Table: MOVIMIENTO_EMPLEADO                                   */
/*==============================================================*/
create table MOVIMIENTO_EMPLEADO
(
   ID_MOVIMIENTO_EMPLEADO int not null AUTO_INCREMENT,
   ID_CUENTA              int,
   ID_PARAMETRO_IESS      int,
   DESCRIPCION_MOVIMIENTO_ENPLEADO varchar(200),
   VALOR_MOVIMIENTO_EMPLEADO float(8,2),
   primary key (ID_MOVIMIENTO_EMPLEADO)
);

/*==============================================================*/
/* Table: PEDIDO_PROVEEDOR                                    */
/*==============================================================*/
create table PEDIDO_PROVEEDOR
(
   ID_PEDIDO_PROVEEDOR int not null AUTO_INCREMENT,
   ID_CUENTA int,
   ID_PROVEEDOR int,
   FECHA_PEDIDO_PROVEEDOR		date,
   DETALLE_PEDIDO_PROVEEDOR 	text,
   ESTADO_PEDIDO_PROVEEDOR text,
   CANTIDAD_PEDIDO int,
   SUBTOTAL_PEDIDO_PROVEEDOR float(8,2),
   TOTAL_PEDIDO_PROVEEDOR float(8,2),
   primary key (ID_PEDIDO_PROVEEDOR)
);

/*==============================================================*/
/* Table: PROVEEDOR                                             */
/*==============================================================*/
create table PROVEEDOR
(
   ID_PROVEEDOR         int not null AUTO_INCREMENT,
   /*ID_PEDIDO_MATERIAP   int,*/
   NOMBRE_PROVEEDOR     varchar(100),
   TIPO_PROVEEDOR       varchar(100),
   RUC                  varchar(100),
   primary key (ID_PROVEEDOR)
);

/*==============================================================*/
/* Table: RECETA_PRODUCCION                                     */
/*==============================================================*/
create table PASO_RECETA
(
   ID_PASO_RECETA            int not null AUTO_INCREMENT,
   /*ID_ITEM              int,*/
   ID_RECETA_PRODUCCION   int,
   NOMBRE_PASO_RECETA        varchar(100),
   DESCRIPCION_PASO_RECETA   text,
   CATEGORIA_PASO_RECETA     varchar(100),
   TIEMPO_PRODUC_RECETA time,
   primary key (ID_PASO_RECETA)
);

/*==============================================================*/
/* Table: UBICACION                                             */
/*==============================================================*/
create table UBICACION
(
   ID_UBICACION int not null AUTO_INCREMENT,
   ZONA_UBICACION varchar(200),
   SECTOR_UBICACION varchar(200),
   primary key (ID_UBICACION)
);

/*==============================================================*/
/* Table: TRANSPORTE                                            */
/*==============================================================*/

create table TRANSPORTE
(
   ID_TRANSPORTE         int not null AUTO_INCREMENT,
   NOMBRE_TRANSPORTE     varchar(100),
   RUC_TRANSPORTE        varchar(100),
   primary key (ID_TRANSPORTE)
);

/*==============================================================*/
/* Table: FLOTA                                                 */
/*==============================================================*/

create table FLOTA
(
   ID_FLOTA              int not null AUTO_INCREMENT,
   ID_TRANSPORTE         int,
   SECTOR_FLOTA          varchar(100),
   CANTIDAD_PEDIDOS      int,
   CANTIDAD_MAX          int,
   VALOR                 float(8,2),
   primary key (ID_FLOTA)
);


alter table DETALLE_PEDIDO add constraint FK_RELATIONSHIP_1 foreign key (ID_ITEM)
      references ITEM (ID_ITEM);

alter table DETALLE_PEDIDO add constraint FK_RELATIONSHIP_2 foreign key (ID_PEDIDO)
      references PEDIDO (ID_PEDIDO) ON DELETE CASCADE;
	  
alter table PEDIDO add constraint FK_RELATIONSHIP_3 foreign key (ID_CLIENTE)
      references CLIENTE (ID_CLIENTE);

alter table PEDIDO add constraint FK_RELATIONSHIP_4 foreign key (ID_EMPLEADO)
      references EMPLEADO (ID_EMPLEADO);
	  
alter table CLIENTE add constraint FK_RELATIONSHIP_5 foreign key (ID_UBICACION)
      references UBICACION (ID_UBICACION);
	  
alter table PREVENTA add constraint FK_RELATIONSHIP_6 foreign key (ID_CLIENTE)
      references CLIENTE (ID_CLIENTE);

alter table PREVENTA add constraint FK_RELATIONSHIP_7 foreign key (ID_EMPLEADO)
      references EMPLEADO (ID_EMPLEADO);

alter table ITEM add constraint FK_RELATIONSHIP_8 foreign key (ID_LISTA_ITEMS)
      references LISTA_ITEMS (ID_LISTA_ITEMS);
/*NEW RELATION ITEM - TIPO_ITEM*/
alter table ITEM add constraint FK_RELATIONSHIP_9 foreign key (ID_TIPO_ITEM)
      references TIPO_ITEM (ID_TIPO_ITEM);
	  
alter table PEDIDO_PROVEEDOR add constraint FK_RELATIONSHIP_10 foreign key (ID_PROVEEDOR)
      references PROVEEDOR (ID_PROVEEDOR);

alter table PEDIDO_PROVEEDOR add constraint FK_RELATIONSHIP_14 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table PASO_RECETA add constraint FK_RELATIONSHIP_11 foreign key (ID_RECETA_PRODUCCION)
      references RECETA_PRODUCCION (ID_RECETA_PRODUCCION);

alter table ITEM add constraint FK_RELATIONSHIP_12 foreign key (ID_PASO_RECETA)
      references PASO_RECETA (ID_PASO_RECETA);

alter table LISTA_ITEMS add constraint FK_RELATIONSHIP_13 foreign key (ID_EMPLEADO)
      references EMPLEADO (ID_EMPLEADO);
	  
alter table EMPLEADO add constraint FK_RELATIONSHIP_15 foreign key (ID_CARGO_EMPLEADO)
      references CARGO_EMPLEADO (ID_CARGO_EMPLEADO);

alter table EMPLEADO add constraint FK_RELATIONSHIP_16 foreign key (ID_BANCO)
      references BANCO (ID_BANCO);
	  
alter table CUENTA add constraint FK_RELATIONSHIP_17 foreign key (ID_INFORME_FINANCIERO)
      references INFORME_FINANCIERO (ID_INFORME_FINANCIERO);

alter table DETALLE_ASIENTO add constraint FK_RELATIONSHIP_18 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table DETALLE_ASIENTO add constraint FK_RELATIONSHIP_31 foreign key (ID_ASIENTO)
      references ASIENTO (ID_ASIENTO);
      
alter table CUENTA add constraint FK_RELATIONSHIP_19 foreign key (CUE_ID_CUENTA)
      references CUENTA (ID_CUENTA);
	
/* CONSTRAINT 200*/


alter table PEDIDO add constraint FK_RELATIONSHIP_21 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table TIPO_ITEM add constraint FK_RELATIONSHIP_22 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table EMPLEADO add constraint FK_RELATIONSHIP_25 foreign key (ID_MOVIMIENTO_EMPLEADO)
      references MOVIMIENTO_EMPLEADO (ID_MOVIMIENTO_EMPLEADO);

alter table CARGO_EMPLEADO add constraint FK_RELATIONSHIP_26 foreign key (ID_DEPARTAMENTO)
      references DEPARTAMENTO (ID_DEPARTAMENTO);

alter table MOVIMIENTO_EMPLEADO add constraint FK_RELATIONSHIP_27 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);
	  
alter table DEPARTAMENTO add constraint FK_RELATIONSHIP_28 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);
	  
alter table MOVIMIENTO_EMPLEADO add constraint FK_RELATIONSHIP_29 foreign key (ID_PARAMETRO_IESS)
      references PARAMETRO_IESS (ID_PARAMETRO_IESS);

alter table BANCO add constraint FK_RELATIONSHIP_30 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table PEDIDO add constraint FK_RELATIONSHIP_32 foreign key (ID_FLOTA)
      references FLOTA (ID_FLOTA);

alter table FLOTA add constraint FK_RELATIONSHIP_33 foreign key (ID_TRANSPORTE)
      references TRANSPORTE (ID_TRANSPORTE);

/*relacion estadoproduccion-item*/
ALTER TABLE `item` ADD CONSTRAINT `FK_RELATIONSHIP_40` FOREIGN KEY (`ID_ESTADO_PRODUCION`) 
REFERENCES `estado_produccion`(`ID_ESTADO_PRODUCCION`) ON DELETE RESTRICT ON UPDATE RESTRICT;

/*==============================================================*/
/* Table: BODEGA                                                */
/*==============================================================*/
create table BODEGA
(
   ID_BODEGA int not null AUTO_INCREMENT,
   NOMBRE varchar(200),
   SECTOR_UBICACION varchar(200),
   primary key (ID_BODEGA)
);

/*==============================================================*/
/* Table: BODEGAITEM                                                */
/*==============================================================*/
create table BODEGAITEM
(
   ID_BODEGA int,
   ID_ITEM int,
   CANTIDAD int
);