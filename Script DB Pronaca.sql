/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     16/1/2023 16:57:43                           */
/*==============================================================*/


drop table if exists ASIENTO;

drop table if exists INFORME_FINANCIERO;

drop table if exists CARGO_EMPLEADO;

drop table if exists CLIENTE_MINORISTA;

drop table if exists CLIENTE_POTENCIAL;

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
   CODIGO_CARGO           varchar(20),
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
   RUC_CEDULA_ varchar(50),
   EMAIL_CLIENTE varchar (50),
   ESTADO_CLIENTE varchar(20),
   ID_UBICACION int,
   primary key (ID_CLIENTE)
);

/*==============================================================*/
/* Table: UBICACION                                             */
/*==============================================================*/
create table UBICACION
(
   ID_UBICACION int not null AUTO_INCREMENT,
   ZONA_UBICACION varchar(200),
   SECTOR_UBICACION varchar(200),
   NOM_UBICACION varchar(100),
   primary key (ID_UBICACION)
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
   SUELDO_HORAS         float(8,2),
   SUELDO_FIJO          float(8,2),
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
   NOMBRE_EMPLEADO      varchar(200),
   APELLIDO_EMPLEADO       varchar(200),
   CEDULA_EMPLEADO      varchar(10),
   CORREO               varchar(200),
   HORAS_LABORADAS      int,
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
   ID_LISTA_ITEMS2      int,
   ID_CUENTA            int,
   ID_LISTA_ITEMS       int,
   TIPO_ITEM            varchar(100),
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
   ESTADO_ITEM          varchar(100),
   primary key (ID_ITEM)
);

/*==============================================================*/
/* Table: LISTA_DESECHABLES                                     */
/*==============================================================*/
create table LISTA_DESECHABLES
(
   ID_LISTA_ITEMS2      int not null AUTO_INCREMENT,
   ID_CUENTA            int,
   ID_EMPLEADO          int,
   DETALLE_LISTA_DESECHABLES text,
   FECHA_LISTA_DESECHABLES date,
   ESTADO_LISTA_DESECHABLES varchar(100),
   DETALLE_ESTADO_LISTA_DESECHABLES text,
   primary key (ID_LISTA_ITEMS2)
);

/*==============================================================*/
/* Table: LISTA_ITEMS                                           */
/*==============================================================*/
create table LISTA_ITEMS
(
   ID_LISTA_ITEMS       int not null AUTO_INCREMENT,
   ID_EMPLEADO          int,
   ID_CUENTA            int,
   DETALLE_LISTA_DESECHABLES text,
   FECHA_LISTA_DESECHABLES date,
   ESTADO_LISTA_DESECHABLES varchar(100),
   DETALLE_ESTADO_LISTA_DESECHABLES text,
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
   ID_EMPLEADO            int,
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

alter table ASIENTO add constraint FK_RELATIONSHIP_17 foreign key (ID_INFORME_FINANCIERO)
      references INFORME_FINANCIERO (ID_INFORME_FINANCIERO);

alter table ASIENTO add constraint FK_RELATIONSHIP_18 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table BANCO add constraint FK_RELATIONSHIP_30 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table CLIENTE add constraint FK_RELATIONSHIP_31 foreign key (ID_UBICACION)
      references UBICACION (ID_UBICACION);

alter table CUENTA add constraint FK_RELATIONSHIP_19 foreign key (CUE_ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table DEPARTAMENTO add constraint FK_RELATIONSHIP_28 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table DETALLE_PEDIDO add constraint FK_RELATIONSHIP_1 foreign key (ID_ITEM)
      references ITEM (ID_ITEM);

alter table DETALLE_PEDIDO add constraint FK_RELATIONSHIP_2 foreign key (ID_PEDIDO)
      references PEDIDO (ID_PEDIDO);

alter table CARGO_EMPLEADO add constraint FK_RELATIONSHIP_26 foreign key (ID_DEPARTAMENTO)
      references DEPARTAMENTO (ID_DEPARTAMENTO);

alter table EMPLEADO add constraint FK_RELATIONSHIP_15 foreign key (ID_CARGO_EMPLEADO)
      references CARGO_EMPLEADO (ID_CARGO_EMPLEADO);

alter table EMPLEADO add constraint FK_RELATIONSHIP_16 foreign key (ID_BANCO)
      references BANCO (ID_BANCO);

alter table MOVIMIENTO_EMPLEADO add constraint FK_RELATIONSHIP_25 foreign key (ID_EMPLEADO)
      references EMPLEADO (ID_EMPLEADO);

alter table MOVIMIENTO_EMPLEADO add constraint FK_RELATIONSHIP_27 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);
      
alter table MOVIMIENTO_EMPLEADO add constraint FK_RELATIONSHIP_29 foreign key (ID_PARAMETRO_IESS)
      references PARAMETRO_IESS (ID_PARAMETRO_IESS);

alter table ITEM add constraint FK_RELATIONSHIP_20 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table ITEM add constraint FK_RELATIONSHIP_8 foreign key (ID_LISTA_ITEMS)
      references LISTA_ITEMS (ID_LISTA_ITEMS);

alter table ITEM add constraint FK_RELATIONSHIP_9 foreign key (ID_LISTA_ITEMS2)
      references LISTA_DESECHABLES (ID_LISTA_ITEMS2);

alter table LISTA_DESECHABLES add constraint FK_RELATIONSHIP_14 foreign key (ID_EMPLEADO)
      references EMPLEADO (ID_EMPLEADO);

alter table LISTA_DESECHABLES add constraint FK_RELATIONSHIP_24 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table LISTA_ITEMS add constraint FK_RELATIONSHIP_13 foreign key (ID_EMPLEADO)
      references EMPLEADO (ID_EMPLEADO);

alter table LISTA_ITEMS add constraint FK_RELATIONSHIP_22 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table PEDIDO add constraint FK_RELATIONSHIP_21 foreign key (ID_CUENTA)
      references CUENTA (ID_CUENTA);

alter table PEDIDO add constraint FK_RELATIONSHIP_3 foreign key (ID_CLIENTE)
      references CLIENTE (ID_CLIENTE);

alter table PEDIDO add constraint FK_RELATIONSHIP_4 foreign key (ID_EMPLEADO)
      references EMPLEADO (ID_EMPLEADO);

alter table PREVENTA add constraint FK_RELATIONSHIP_6 foreign key (ID_CLIENTE)
      references CLIENTE (ID_CLIENTE);

alter table PREVENTA add constraint FK_RELATIONSHIP_7 foreign key (ID_EMPLEADO)
      references EMPLEADO (ID_EMPLEADO);

alter table PROVEEDOR add constraint FK_RELATIONSHIP_10 foreign key (ID_PEDIDO_MATERIAP)
      references PEDIDO_MATERIA_PRIMA (ID_PEDIDO_MATERIAP);

alter table RECETA_PRODUCCION add constraint FK_RELATIONSHIP_11 foreign key (ID_PEDIDO_MATERIAP)
      references PEDIDO_MATERIA_PRIMA (ID_PEDIDO_MATERIAP);

alter table RECETA_PRODUCCION add constraint FK_RELATIONSHIP_12 foreign key (ID_ITEM)
      references ITEM (ID_ITEM);

INSERT INTO CUENTA (CUE_ID_CUENTA,DESCRIPCION_CUENTA,CODIGO_CUENTA,INFORME_FINANCIERO,VALOR_CUENTA) VALUES
(null,"Activos","1.",1,0.0),(1,"Activos corrientes","1.1.",1,0.0),(2,"Bancos","1.1.1.",1,0.0),
(3,"Banco Pichincha","1.1.1.1.",1,5000.0),(2,"Inventario","1.1.1.2.",1,8000.0),
(1,"Activos fijos","1.2.",1,0.0),(null,"Pasivos","2.",1,0.0),(7,"Pasivos corrientes","2.1.",1,0.0),
(8,"Cuentas por pagar","2.1.1.",1,0.0),(9,"Pago de nómina","2.1.1.1.",1,0.0),(9,"Beneficios sociales","2.1.1.2.",1,0.0),
(7,"Pasivos fijos","2.2.",1,0.0),(null,"Patrimonio","3.",1,0.0),(null,"Ingresos","4.",2,0.0),(14,"Ventas","4.1.",2,0.0),
(null,"Costos","5",2,0.0),(16,"Costos Directos","5.1.",2,0.0),(17,"Costos operativos","5.1.1.",2,0.0),
(17,"Costos de ventas","5.1.2.",2,0.0),(null,"Gastos","6.",2,0.0),(20,"Gastos nómina","6.1.",2,0.0);

INSERT INTO departamento( ID_CUENTA, NOMBRE_DEPARTAMENTO, SUELDO_HORAS, SUELDO_FIJO, CODIGO_CUENTA, CUENTA) VALUES (19,'Administrativo',3.5,460,'6.1.1','Gastos nómina');
INSERT INTO cargo_empleado(ID_DEPARTAMENTO,DESCRIPCION_CARGO,CODIGO_CARGO) VALUES (1,'Contador','[value-4]');
INSERT INTO banco(ID_CUENTA,NOMBRE_BANCO, SALDO) VALUES (3,'Banco Pichincha',5000);
INSERT INTO parametro_iess(NOMBRE_PARAMETRO, VALOR) VALUES ('Personal',9.4);
INSERT INTO parametro_iess(NOMBRE_PARAMETRO, VALOR) VALUES ('Patronal',11.5);

/* INSERT DE UBICACIONES */
INSERT into UBICACION (ZONA_UBICACION,SECTOR_UBICACION,NOM_UBICACION) values ("La delicia ", "El Condado", "OE4-234");
INSERT into UBICACION (ZONA_UBICACION,SECTOR_UBICACION,NOM_UBICACION) values ("Tumbaco", "Santa Rita", "NE4-134");
INSERT into UBICACION (ZONA_UBICACION,SECTOR_UBICACION,NOM_UBICACION) values ("Norte", "La Luz", "E-144");





