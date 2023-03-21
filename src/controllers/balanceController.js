"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceController = void 0;
const database_1 = __importDefault(require("../database"));


class balanceController {

  list(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const balance = yield database_1.default.query('SELECT * FROM `balance_general`');
      res.json(balance);
    });
  }

  
  getOne(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { id } = req.params;
      const balance = yield database_1.default.query('SELECT * FROM balance_general WHERE id_balance = ?', [id]);
      if (balance.length > 0) {
        return res.json(balance[0]);
      }
      res.status(404).json({ text: "Departamento doesn't exists" });
    });
}

  ///////////////////
  create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const {date_end } = req.body;
  
      try {
 

        const date_informe = new Date().toISOString().substring(0, 10);
  

        //ACTIVOS
        const lista_cuenta_codigo_filtro_activos=yield database_1.default.query(`SELECT * FROM CUENTA WHERE CODIGO_CUENTA LIKE '1%'`)
        ////bancos01
        const lista_cuenta_codigo_bancos=yield database_1.default.query(`SELECT * FROM CUENTA WHERE CODIGO_CUENTA LIKE '1.1.2.%'`)
        ////inventario02
        const lista_cuenta_inventario=yield database_1.default.query(`SELECT * FROM CUENTA WHERE CODIGO_CUENTA LIKE '1.1.3.%'`)
          ///suma inventario del id 9 operacion
          const inventarioo = yield database_1.default.query(`SELECT VALOR_CUENTA FROM CUENTA WHERE ID_CUENTA = 9`)
          const inventario=inventarioo[0].VALOR_CUENTA

        ////cuentas por cobrar cliente  ///cambiar empleado por cliente
        const cuentaxcobrar_clientee = yield database_1.default.query(`SELECT VALOR_CUENTA FROM CUENTA WHERE ID_CUENTA = 15`)
        const cuentaxcobrar_cliente=cuentaxcobrar_clientee[0].VALOR_CUENTA
        ///// iva encompras
        const iva_comprass= yield database_1.default.query(`SELECT VALOR_CUENTA FROM CUENTA WHERE ID_CUENTA = 19`)
        const iva_compras=iva_comprass[0].VALOR_CUENTA



        /////PASIVOS
        const lista_cuenta_codigo_filtro_pasivos=yield database_1.default.query(`SELECT * FROM CUENTA WHERE CODIGO_CUENTA LIKE '2%'`)
        /////cuentas por pagar proveedor
        const cuentaxpagar_proveedorr = yield database_1.default.query(`SELECT VALOR_CUENTA FROM CUENTA WHERE ID_CUENTA = 26`);
        const cuentaxpagar_proveedor=cuentaxpagar_proveedorr[0].VALOR_CUENTA

        /////cuentas por pagar transporte
        const cuentaTransporte = yield database_1.default.query(`SELECT VALOR_CUENTA FROM CUENTA WHERE DESCRIPCION_CUENTA = "Cuentas por pagar transporte"`);
        const cuentaPorPagarTransporte=cuentaTransporte[0].VALOR_CUENTA

        /////iva en venta
        const iva_ventass = yield database_1.default.query(`SELECT VALOR_CUENTA FROM CUENTA WHERE ID_CUENTA = 29`);
        const iva_ventas=iva_ventass[0].VALOR_CUENTA
        /////aportes personal y patronal
        const lista_cuenta_aportes=yield database_1.default.query(`SELECT * FROM CUENTA WHERE CODIGO_CUENTA LIKE '2.1.4.%'`)
        /////nomina por pagar
        const nomina_pagarr = yield database_1.default.query(`SELECT VALOR_CUENTA FROM CUENTA WHERE ID_CUENTA = 36`);
        const nomina_pagar=nomina_pagarr[0].VALOR_CUENTA  
        ////pasivos fijos////usa id cuenta
        const lista_pasivos_fijos=yield database_1.default.query(`SELECT VALOR_CUENTA FROM CUENTA WHERE CUE_ID_CUENTA = 37`)
      




        //calcular el patrimonio
        const pasivos_lista = yield database_1.default.query(`SELECT * FROM CUENTA WHERE CODIGO_CUENTA LIKE '3%'`);

        let suma_patrimonio = 0;
        for (let i = 0; i < pasivos_lista.length; i++) {
          suma_patrimonio += pasivos_lista[i].VALOR_CUENTA;
        }
        /////suma repetida


        
        // Sumar Activos totales
        let suma_activos = lista_cuenta_codigo_filtro_activos.reduce((total, cuenta) => total + cuenta.VALOR_CUENTA, 0);
        /// suma inventario
        let suma_inventatio = lista_cuenta_inventario.reduce((total, cuenta) => total + cuenta.VALOR_CUENTA, 0);
        /////suma repetida
        suma_activos=suma_activos-inventario


        ////sumar bancos
        let suma_bancos = lista_cuenta_codigo_bancos.reduce((total, cuenta) => total + cuenta.VALOR_CUENTA, 0);





        ///Suma Pasivos Totales
        let suma_pasivos = lista_cuenta_codigo_filtro_pasivos.reduce((total, cuenta) => total + cuenta.VALOR_CUENTA, 0);
        ///suma aportes 
        let suma_aportes = lista_cuenta_aportes.reduce((total, cuenta) => total + cuenta.VALOR_CUENTA, 0);
        ///pasivos fijos suma
        let suma_pasivos_fijos = lista_pasivos_fijos.reduce((total, cuenta) => total + cuenta.VALOR_CUENTA, 0);

  
        // Obtener const patrimonio de Pronaca
        const patrimonio_pronaca = suma_patrimonio;
  
        // Obtener resultado de Balance
        const resultado_balance = patrimonio_pronaca - suma_pasivos + suma_activos;
  
        // Create a financial report
      // Create a financial report
      const newInformeFinanciero = {
        fecha: date_informe,
        activos: suma_activos,
        pasivos: suma_pasivos,
        patrimonio: patrimonio_pronaca,
        tipo_informe: 1,
        //////
        bancos:suma_bancos,
        inventario:suma_inventatio,
        cuentas_por_cobrar_cli:cuentaxcobrar_cliente,
        iva_compras:iva_compras,
        /////
        cuenta_pagar_proveedor:cuentaxpagar_proveedor,
        cuenta_pagar_transporte:cuentaPorPagarTransporte,
        iva_ventas:iva_ventas,
        aportes:suma_aportes,
        nomina:nomina_pagar,
        pasivos_fijos:suma_pasivos_fijos,

      };

      //yield database_1.default.query(`INSERT INTO BALANCE_GENERAL (FECHA, ACTIVOS, PASIVOS, PATRIMONIO, ID_informe_financiero, BANCOS, INVENTARIO, Cuentas_por_cobrar_cli, Cuenta_pagar_proveedor, Iva_ventas, Aportes, Nomina, Pasivos_fijos) VALUES ('${newInformeFinanciero.fecha}', ${newInformeFinanciero.activos}, ${newInformeFinanciero.pasivos}, ${newInformeFinanciero.patrimonio}, ${newInformeFinanciero.tipo_informe}, ${newInformeFinanciero.bancos}, ${newInformeFinanciero.inventario}, ${newInformeFinanciero.cuentas_por_cobrar_cli}, ${newInformeFinanciero.cuenta_pagar_proveedor}, ${newInformeFinanciero.iva_ventas}, ${newInformeFinanciero.aportes}, ${newInformeFinanciero.nomina}, ${newInformeFinanciero.pasivos_fijos})`);
      yield database_1.default.query(`INSERT INTO BALANCE_GENERAL (FECHA, ACTIVOS, PASIVOS, PATRIMONIO, ID_informe_financiero, BANCOS, INVENTARIO, CUENTAS_POR_COBRAR_CLI, IVA_COMPRAS, CUENTA_PAGAR_PROVEEDOR, CUENTA_PAGAR_TRANSPORTE, IVA_VENTAS, APORTES, NOMINA, PASIVOS_FIJOS) VALUES ('${newInformeFinanciero.fecha}', ${newInformeFinanciero.activos}, ${newInformeFinanciero.pasivos}, ${newInformeFinanciero.patrimonio}, ${newInformeFinanciero.tipo_informe}, ${newInformeFinanciero.bancos}, ${newInformeFinanciero.inventario}, ${newInformeFinanciero.cuentas_por_cobrar_cli}, ${newInformeFinanciero.iva_compras}, ${newInformeFinanciero.cuenta_pagar_proveedor}, ${newInformeFinanciero.cuenta_pagar_transporte}, ${newInformeFinanciero.iva_ventas}, ${newInformeFinanciero.aportes}, ${newInformeFinanciero.nomina}, ${newInformeFinanciero.pasivos_fijos})`);

        
  
        res.json({ message: 'Financial report Balance saved' });
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error en el servidor" });
      }
    });
  }




  ///////////////

}
exports.balanceController = new balanceController();