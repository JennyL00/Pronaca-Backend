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
    const { id } = req.params;
    database.query('SELECT * FROM balance_general WHERE id_balance = ?', [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error retrieving balance details');
        }
        if (result.length === 0) {
            return res.status(404).send('Balance not found');
        }
        return res.status(200).send(result[0]);
    });
}

  ///////////////////
  create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { date_init, date_end } = req.body;
  
      try {
        // // Calcular el id
        // const result = yield database_1.default.query('SELECT MAX(ID_INFORME_FINANCIERO) AS max_id FROM INFORME_FINANCIERO');
        // const max_id = result[0].max_id;
        // const id_informe = max_id + 1;

        const date_informe = new Date().toISOString().substring(0, 10);
  
        // Filtrar por fecha
        const lista_asiento_fecha_filtro = yield database_1.default.query(`SELECT * FROM ASIENTO INNER JOIN DETALLE_ASIENTO ON ASIENTO.ID_ASIENTO = DETALLE_ASIENTO.ID_ASIENTO WHERE ASIENTO.FECHA_ASIENTO > '${date_init}' AND ASIENTO.FECHA_ASIENTO < '${date_end}'`);

        //const lista_cuenta_codigo_filtro_activos = lista_asiento_fecha_filtro.filter(detalle_asiento => detalle_asiento.CODIGO_CUENTA.startsWith('1.'));
        //const lista_cuenta_codigo_filtro_pasivos = lista_asiento_fecha_filtro.filter(detalle_asiento => detalle_asiento.CODIGO_CUENTA.startsWith('2.'));
        
        const lista_cuenta_codigo_filtro_activos=yield database_1.default.query(`SELECT * FROM CUENTA WHERE CODIGO_CUENTA LIKE '1%'`)
        const lista_cuenta_codigo_filtro_pasivos=yield database_1.default.query(`SELECT * FROM CUENTA WHERE CODIGO_CUENTA LIKE '2%'`)


        //calcular el patrimonio
        const pasivos_lista = yield database_1.default.query(`SELECT * FROM CUENTA WHERE CODIGO_CUENTA LIKE '3%'`);

        let suma_patrimonio = 0;
        for (let i = 0; i < pasivos_lista.length; i++) {
          suma_patrimonio += pasivos_lista[i].VALOR_CUENTA;
        }
  
        // Sumar debe y haber
        let suma_activos = lista_cuenta_codigo_filtro_activos.reduce((total, cuenta) => total + cuenta.VALOR_CUENTA, 0);
        let suma_pasivos = lista_cuenta_codigo_filtro_pasivos.reduce((total, cuenta) => total + cuenta.VALOR_CUENTA, 0);
  
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
        tipo_informe: 1
      };

      yield database_1.default.query(`INSERT INTO BALANCE_GENERAL (FECHA, ACTIVOS, PASIVOS, PATRIMONIO, ID_informe_financiero) VALUES ('${newInformeFinanciero.fecha}', ${newInformeFinanciero.activos}, ${newInformeFinanciero.pasivos}, ${newInformeFinanciero.patrimonio}, ${newInformeFinanciero.tipo_informe})`);

        
  
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