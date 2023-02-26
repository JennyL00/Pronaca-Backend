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
            const balance = yield database_1.default.query('SELECT * FROM `informe_financiero` WHERE TIPO_INFORME = "Balance"');
            res.json(balance);    
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            
            res.status(404).json({ text: "Balances doesn't exists" });
        });
    }

    ///////////////////

create(req, res) {
  return __awaiter(this, void 0, void 0, function* () {
    const {  date_init, date_end} = req.body;

    // Calcular el id
    const result = yield database_1.default.query('SELECT MAX(ID_INFORME_FINANCIERO) AS max_id FROM INFORME_FINANCIERO');
    const max_id = result[0].max_id;
    const id_informe = max_id + 1;
    const date_informe = new Date().toISOString().substring(0, 10);

    // Filtrar por fecha
    let lista_asiento_fecha_filtro;
    try {
      lista_asiento_fecha_filtro = yield database_1.default.query(`SELECT * FROM ASIENTO WHERE FECHA_ASIENTO > '${date_init}' AND FECHA_ASIENTO < '${date_end}'`);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error en el servidor" });
      return;
    }

    // Filtrar por codigo de cuenta
    const lista_asiento_codigo_filtro_activos = lista_asiento_fecha_filtro.filter(asiento => asiento.CODIGO_CUENTA.startsWith('1'));
    const lista_asiento_codigo_filtro_pasivos = lista_asiento_fecha_filtro.filter(asiento => asiento.CODIGO_CUENTA.startsWith('2'));

    // Sumar debe y haber
    const suma_activos = lista_asiento_codigo_filtro_activos.reduce((suma, asiento) => suma + asiento.DEBE, 0);
    const suma_pasivos = lista_asiento_codigo_filtro_pasivos.reduce((suma, asiento) => suma + asiento.HABER, 0);

    // Obtener const patrimonio de Pronaca
    const patrimonio_pronaca = 123123;

    // Obtener resultado de Balance
    const Resultado_Activos = patrimonio_pronaca - suma_pasivos + suma_activos;

    // Create a financial report
    const newInformeFinanciero = {
      id_informe,
      fecha: date_informe,
      activos: suma_activos,
      pasivos: suma_pasivos,
      patrimonio: patrimonio_pronaca
    };

    yield database_1.default.query(`INSERT INTO INFORME_FINANCIERO (ID_INFORME_FINANCIERO, TIPO_INFORME, FECHA) VALUES (${id_informe}, 'Balance', '${date_informe}')`);
    yield database_1.default.query(`INSERT INTO BALANCE_GENERAL (ID_INFORME_FINANCIERO, FECHA, ACTIVOS, PASIVOS, PATRIMONIO) VALUES (${newInformeFinanciero.id_informe}, '${newInformeFinanciero.fecha}', ${newInformeFinanciero.activos}, ${newInformeFinanciero.pasivos}, ${newInformeFinanciero.patrimonio})`);

    res.json({ message: 'Financial report Balance saved' });
  });
}

      
        
        
        ///////////////

}
exports.balanceController = new balanceController();