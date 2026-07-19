// js/service/GastoService.js
import { db } from "../firebase.js";
import { doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const GastoService = {
  // Recebe o 'uid', 'ano' e 'mes'
  getMesRef(uid, ano, mes) {
    let uidString = "usuario_nao_logado";

    // PROTEÇÃO EXTRA: Se passarem o objeto 'user' inteiro do Firebase por engano, extrai o .uid interno
    if (uid) {
      if (typeof uid === "object" && uid.uid) {
        uidString = uid.uid; // Extrai o ID do objeto
      } else if (typeof uid === "string") {
        uidString = uid; // Já é uma string válida
      }
    }

    // Garante que ano e mês sejam estritamente strings normais
    const anoString = (ano ?? new Date().getFullYear()).toString();
    const mesString = (mes ?? (new Date().getMonth() + 1)).toString();

    // Mostra no console exatamente o que está sendo processado para ajudar você a testar
    console.log(`[GastoService] Montando caminho: gastos / ${uidString} / anos / ${anoString} / meses / ${mesString}`);

    return doc(db, "gastos", uidString, "anos", anoString, "meses", mesString);
  },

  async inicializarMesSeNaoExistir(uid, ano, mes) {
    const mesRef = this.getMesRef(uid, ano, mes);
    const mesSnap = await getDoc(mesRef);

    if (!mesSnap.exists()) {
      const dadosIniciais = { rendaTotal: 0, criadoEm: new Date() };
      await setDoc(mesRef, dadosIniciais);
      
      // Tenta puxar automaticamente os gastos fixos (📌) do mês anterior
      try {
        let anoAnt = ano;
        let mesAnt = mes - 1;
        if (mesAnt === 0) {
          mesAnt = 12;
          anoAnt = ano - 1;
        }
        
        const contasAntRef = collection(this.getMesRef(uid, anoAnt, mesAnt), "contas");
        const snapshotAnt = await getDocs(contasAntRef);
        
        const contasNovasRef = collection(mesRef, "contas");
        for (const d of snapshotAnt.docs) {
          const data = d.data();
          if (data.tipo === "fixo") {
            await addDoc(contasNovasRef, {
              nome: data.nome,
              valor: data.valor,
              tipo: "fixo",
              status: "pendente",
              criadoEm: new Date()
            });
          }
        }
      } catch (e) {
        console.log("Nenhum mês anterior encontrado para transferência automática.");
      }
      
      return dadosIniciais;
    }
    return mesSnap.data();
  },

  async atualizarRenda(uid, ano, mes, valor) {
    const mesRef = this.getMesRef(uid, ano, mes);
    await updateDoc(mesRef, { rendaTotal: parseFloat(valor) });
  },

  async adicionarConta(uid, ano, mes, conta) {
    const contasRef = collection(this.getMesRef(uid, ano, mes), "contas");
    conta.status = "pendente";
    conta.valor = parseFloat(conta.valor);
    conta.criadoEm = new Date();
    await addDoc(contasRef, conta);
  },

  async listarContas(uid, ano, mes) {
    const contasRef = collection(this.getMesRef(uid, ano, mes), "contas");
    const snapshot = await getDocs(contasRef);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async alterarStatusConta(uid, ano, mes, contaId, novoStatus) {
    // Reutiliza o getMesRef para gerar o caminho correto com segurança
    const mesRef = this.getMesRef(uid, ano, mes);
    const contaRef = doc(db, mesRef.path, "contas", contaId);
    await updateDoc(contaRef, { status: novoStatus });
  },

  // =========================================
  // NOVA FUNÇÃO: REMOVER CONTA DO BANCO
  // =========================================
  async removerConta(uid, ano, mes, contaId) {
    try {
      // Reutiliza a lógica centralizada de caminhos do seu sistema
      const mesRef = this.getMesRef(uid, ano, mes);
      const contaRef = doc(db, mesRef.path, "contas", contaId);
      
      // Deleta definitivamente o documento no Firestore
      await deleteDoc(contaRef);
      console.log(`[GastoService] Conta ${contaId} removida com sucesso.`);
    } catch (error) {
      console.error("[GastoService] Erro ao remover conta:", error);
      throw error;
    }
  },
  
  async listarMesesDisponiveis() {
    const mesesNome = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const lista = [];
    for (let m = 1; m <= 12; m++) {
      lista.push({ ano: 2026, mes: m, nome: `${mesesNome[m-1]} / 2026` });
    }
    return lista;
  }
};

export default GastoService;