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
   ID_INFORME_FINANCIERO     int,
   ID_CUENTA            int,
   FECHA_ASIENTO        date,
   descripcion_asiento  varchar(100),
   DEBE                 float(8,2),
   HABER                float(8,2),
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
   primary key (ID_INFORME_FINANCIERO)
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
   NUMERO_UBICACION varchar(10),
   TELEFONO_CLIENTE varchar(10),
   primary key (ID_CLIENTE)
);

/*==============================================================*/
/* Table: CUENTA                                                */
/*==============================================================*/
create table CUENTA
(
   ID_CUENTA            int not null AUTO_INCREMENT,
   CUE_ID_CUENTA        int,
   DESCRIPCION_CUENTA   varchar(200),
   CODIGO_CUENTA        varchar(100),
   INFORME_FINANCIERO   int,
   VALOR_CUENTA         float(8,2),
   primary key (ID_CUENTA)
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
   DETALLE_PEDIDO       varchar(100),
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
   PRECIO_ITEM          float(8,2),
   PESO_ITEM            float,
   CONSERVACION_ITEM    varchar(100),
   DETALLE_ITEM         text,
   ID_RECETAP		int,
   primary key (ID_ITEM)
);

/*==============================================================*/
/* Table: TIPO_ITEM                                    			*/
/*==============================================================*/
create table TIPO_ITEM
(
   ID_TIPO_ITEM 		int not null AUTO_INCREMENT,
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
/* Table: TIPO_LISTA_PRODUC                                     */
/*==============================================================*/
create table TIPO_LISTA_PRODUC
(
   ID_TIPO_LISTA_PRODUC int not null AUTO_INCREMENT,
   TIPO_LISTA_ITEMS		varchar(100),
   DETALLE_TIPO_LISTA 	text,
   primary key (ID_TIPO_LISTA_PRODUC)
);

/*==============================================================*/
/* Table: LISTA_ITEMS                                           */
/*==============================================================*/
create table LISTA_ITEMS
(
   ID_LISTA_ITEMS       int not null AUTO_INCREMENT,
   ID_EMPLEADO          int,
   ID_CUENTA            int,
   ID_TIPO_LISTA_PRODUC int,
   DETALLE_LISTA        text,
   FECHA_LISTA          date,
   ESTADO_LISTA         varchar(100),
   DETALLE_ESTADO_LISTA text,
   BODEGA			varchar(100),
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
   PEDIDO_DEVUELTO      int,
   ESTADO_PEDIDO        varchar(100),
   PRECIO_PEDIDO          float(8,2),
   primary key (ID_PEDIDO)
);

/*==============================================================*/
/* Table: PEDIDO_MATERIA_PRIMA                                  */
/*==============================================================*/
create table PEDIDO_MATERIA_PRIMA
(
   ID_PEDIDO_MATERIAP   int not null AUTO_INCREMENT,
   DETALLE_PEDIDO_MATERIAP varchar(200),
   FECHA_PEDIDO_MATERIAP date,
   primary key (ID_PEDIDO_MATERIAP)
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
/* Table: PROVEEDOR                                             */
/*==============================================================*/
create table PROVEEDOR
(
   ID_PROVEEDOR         int not null AUTO_INCREMENT,
   ID_PEDIDO_MATERIAP   int,
   NOMBRE_PROVEEDOR     varchar(100),
   TIPO_PROVEEDOR       varchar(100),
   RUC                  varchar(100),
   primary key (ID_PROVEEDOR)
);

/*==============================================================*/
/* Table: RECETA_PRODUCCION                                     */
/*==============================================================*/
create table RECETA_PRODUCCION
(
   ID_RECETA            int not null AUTO_INCREMENT,
   ID_ITEM              int,
   ID_PEDIDO_MATERIAP   int,
   NOMBRE_RECETA        varchar(100),
   DESCRIPCION_RECETA   text,
   CATEGORIA_RECETA     varchar(100),
   TIEMPO_PRODUC_RECETA time,
   primary key (ID_RECETA)
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

alter table DETALLE_PEDIDO add constraint FK_RELATIONSHIP_1 foreign key (ID_ITEM)
      references ITEM (ID_ITEM);

alter table DETALLE_PEDIDO add constraint FK_RELATIONSHIP_2 foreign key (ID_PEDIDO)
      references PEDIDO (ID_PEDIDO);
	  
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
	  
alter table PROVEEDOR add constraint FK_RELATIONSHIP_10 foreign key (ID_PEDIDO_MATERIAP)
      references PEDIDO_MATERIA_PRIMA (ID_PEDIDO_MATERIAP);

alter table RECETA_PRODUCCION add constraint FK_RELATIONSHIP_11 foreign key (ID_PEDIDO_MATERIAP)
      references PEDIDO_MATERIA_PRIMA (ID_PEDIDO_MATERIAP);

alter table RECETA_PRODUCCION add constraint FK_RELATIONSHIP_12 foreign key (ID_ITEM)
      references ITEM (ID_ITEM);

alter table LISTA_ITEMS add constraint FK_RELATIONSHIP_13 foreign key (ID_EMPLEADO)
      references EMPLEADO (ID_EMPLEADO);

alter table LISTA_ITEMS add constraint FK_RELATIONSHIP_14 foreign key (ID_TIPO_LISTA_PRODUC)
      references TIPO_LISTA_PRODUC (ID_TIPO_LISTA_PRODUC);
	  
alter table EMPLEADO add constraint FK_RELATIONSHIP_15 foreign key (ID_CARGO_EMPLEADO)
      references CARGO_EMPLEADO (ID_CARGO_EMPLEADO);

alter table EMPLEADO add constraint FK_RELATIONSHIP_16 foreign key (ID_BANCO)
      references BANCO (ID_BANCO);
	  
alter table ASIENTO add constraint FK_RELATIONSHIP_17 foreign key (ID_INFORME_FINANCIERO)
      references INFORME_FINANCIERO (ID_INFORME_FINANCIERO);

alter table ASIENTO add constraint FK_RELATIONSHIP_18 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table CUENTA add constraint FK_RELATIONSHIP_19 foreign key (CUE_ID_CUENTA)
      references CUENTA (ID_CUENTA);
	
/* CONSTRAINT 200*/


alter table PEDIDO add constraint FK_RELATIONSHIP_21 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table LISTA_ITEMS add constraint FK_RELATIONSHIP_22 foreign key (ID_CUENTA)
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
/*relacion estadoproduccion-item*/
ALTER TABLE `item` ADD CONSTRAINT `FK_RELATIONSHIP_40` FOREIGN KEY (`ID_ESTADO_PRODUCION`) 
	REFERENCES `estado_produccion`(`ID_ESTADO_PRODUCCION`) ON DELETE RESTRICT ON UPDATE RESTRICT;