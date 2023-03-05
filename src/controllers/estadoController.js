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
exports.estadoController = void 0;
const database_1 = __importDefault(require("../database"));


class estadoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const estado = yield database_1.default.query('SELECT * FROM ESTADO_FINANCIERO');
            res.json(estado); 

        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
          const { id } = req.params;
          const estado = yield database_1.default.query('SELECT * FROM ESTADO_FINANCIERO WHERE id_estado = ?', [id]);
          if (estado.length > 0) {
            return res.json(estado[0]);
          }
          res.status(404).json({ text: "Estado doesn't exists" });
        });
    }



    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
          const {date_end} = req.body;
      
          try {
  
            const date_estado = new Date().toISOString().substring(0, 10);
            /// toma el valor de las cuentas (Ventas)
            const ingresos_cuenta = yield database_1.default.query(`SELECT VALOR_CUENTA FROM CUENTA WHERE ID_CUENTA = 46`);
            const ingresos = ingresos_cuenta[0].VALOR_CUENTA;
            /// toma el valor de las cuentas (Costo de Ventas)
            const costos_cuenta = yield database_1.default.query(`SELECT VALOR_CUENTA FROM CUENTA WHERE ID_CUENTA = 53`);
            const costos = costos_cuenta[0].VALOR_CUENTA;
            /// toma el valor de las cuentas (Gastos Operacion) 

            const gastos_cuenta = yield database_1.default.query(`SELECT VALOR_CUENTA as total_gastos FROM CUENTA WHERE ID_CUENTA = 50`);
            const gastos = gastos_cuenta[0].VALOR_CUENTA || 0;


            const newEstadoFinanciero = {
                fecha: date_estado,
                ingresos:ingresos,///costos de venta
                costos:costos,//costos de ventas
                gastos:gastos ,//gastos operacion
                tipo_informe: 2
            };
        
            yield database_1.default.query(`INSERT INTO estado_financiero (fecha, ingresos, costos, gastos, ID_informe_financiero) VALUES ('${newEstadoFinanciero.fecha}', ${newEstadoFinanciero.ingresos}, ${newEstadoFinanciero.costos}, ${newEstadoFinanciero.gastos}, ${newEstadoFinanciero.tipo_informe})`);
        

            res.json({ message: 'Financial report Estado saved' });
          } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error en el servidor" });
          }
        });
      }

}
exports.estadoController = new estadoController();