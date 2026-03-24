import jsPDF from "jspdf";

interface ProposalData {
  proposal: any;
  client: any;
  closer: any;
}

export function generateProposalPDF(data: ProposalData) {
  const { proposal, client, closer } = data;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, pageWidth, 30, "F");
  doc.setTextColor(255, 0, 0);
  doc.setFontSize(24);
  doc.text("FABRANI", 20, 18);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text("Faculdade Brasileira de Negócios Inovadores", 20, 25);

  yPosition = 45;

  // Título
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont(undefined as any, "bold");
  doc.text("PROPOSTA COMERCIAL", 20, yPosition);
  yPosition += 15;

  // Informações da Proposta
  doc.setFontSize(10);
  doc.setFont(undefined as any, "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`ID da Proposta: ${proposal.id}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Data de Criação: ${new Date(proposal.createdAt).toLocaleDateString("pt-BR")}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Status: ${proposal.status}`, 20, yPosition);
  yPosition += 15;

  // Seção: Dados do Cliente
  doc.setFont(undefined as any, "bold");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("DADOS DO CLIENTE", 20, yPosition);
  yPosition += 10;

  doc.setFont(undefined as any, "normal");
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);

  const clientInfo = [
    [`Empresa:`, client?.companyName || "N/A"],
    [`Sócio Principal:`, client?.mainPartner || "N/A"],
    [`CNPJ:`, client?.cnpj || "N/A"],
    [`CPF:`, client?.cpf || "N/A"],
    [`RG:`, client?.rg || "N/A"],
    [`Endereço:`, `${client?.street || ""} ${client?.number || ""}, ${client?.neighborhood || ""}, ${client?.city || ""} - ${client?.state || ""}`],
    [`WhatsApp:`, client?.whatsapp || "N/A"],
  ];

  clientInfo.forEach(([label, value]) => {
    doc.setFont(undefined as any, "bold");
    doc.text(label as any, 20, yPosition);
    doc.setFont(undefined as any, "normal");
    doc.text(value as any, 60, yPosition);
    yPosition += 7;
  });

  yPosition += 5;

  // Seção: Detalhes da Proposta
  doc.setFont(undefined as any, "bold");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("DETALHES DA PROPOSTA", 20, yPosition);
  yPosition += 10;

  doc.setFont(undefined as any, "normal");
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);

  const projectTypeMap: Record<string, string> = {
    certificacao_mec: "Certificação MEC",
    projeto_alianca: "Projeto Aliança",
    pos_mba_parceiros: "Pós/MBA Parceiros",
    mentoria_ni1: "Mentoria NI1 Negócios Inovadores",
  };

  const proposalInfo = [
    [`Tipo de Projeto:`, projectTypeMap[proposal.projectType] || proposal.projectType],
    [`Valor Total:`, `R$ ${parseFloat(proposal.value).toFixed(2)}`],
    [`Quantidade de Cursos:`, proposal.numberOfCourses || "1"],
  ];

  proposalInfo.forEach(([label, value]) => {
    doc.setFont(undefined as any, "bold");
    doc.text(label as any, 20, yPosition);
    doc.setFont(undefined as any, "normal");
    doc.text(value as any, 60, yPosition);
    yPosition += 7;
  });

  // Configuração de Pagamento
  if (proposal.paymentMethod) {
    yPosition += 5;
    doc.setFont(undefined as any, "bold");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("CONFIGURAÇÃO DE PAGAMENTO", 20, yPosition);
    yPosition += 10;

    doc.setFont(undefined as any, "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);

    const paymentMethodMap: Record<string, string> = {
      cartao_credito: "Cartão de Crédito",
      pix: "PIX",
      boleto: "Boleto",
    };

    const paymentInfo = [
      [`Método de Pagamento:`, paymentMethodMap[proposal.paymentMethod] || proposal.paymentMethod],
      ...(proposal.downPayment ? [[`Valor da Entrada:`, `R$ ${parseFloat(proposal.downPayment).toFixed(2)}`]] : []),
      ...(proposal.installments ? [[`Parcelas:`, proposal.installments.toString()]] : []),
      ...(proposal.installmentValue ? [[`Valor por Parcela:`, `R$ ${parseFloat(proposal.installmentValue).toFixed(2)}`]] : []),
    ];

    paymentInfo.forEach(([label, value]) => {
      doc.setFont(undefined as any, "bold");
      doc.text(label as any, 20, yPosition);
      doc.setFont(undefined as any, "normal");
      doc.text(value as any, 60, yPosition);
      yPosition += 7;
    });
  }

  // Calendário
  if (proposal.proposalSentDate || proposal.expectedPaymentDate) {
    yPosition += 5;
    doc.setFont(undefined as any, "bold");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text("CALENDÁRIO", 20, yPosition);
    yPosition += 10;

    doc.setFont(undefined as any, "normal");
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);

    if (proposal.proposalSentDate) {
      doc.setFont(undefined as any, "bold");
      doc.text("Data de Envio da Proposta:", 20, yPosition);
      doc.setFont(undefined as any, "normal");
      doc.text(new Date(proposal.proposalSentDate).toLocaleDateString("pt-BR"), 60, yPosition);
      yPosition += 7;
    }

    if (proposal.expectedPaymentDate) {
      doc.setFont(undefined as any, "bold");
      doc.text("Data Prevista de Pagamento:", 20, yPosition);
      doc.setFont(undefined as any, "normal");
      doc.text(new Date(proposal.expectedPaymentDate).toLocaleDateString("pt-BR"), 60, yPosition);
      yPosition += 7;
    }
  }

  // Observações
  if (proposal.observation) {
    yPosition += 5;
  doc.setFont(undefined as any, "bold");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("OBSERVAÇÕES", 20, yPosition);
  yPosition += 10;

  doc.setFont(undefined as any, "normal");
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
    const splitText = doc.splitTextToSize(proposal.observation, pageWidth - 40);
    doc.text(splitText as any, 20, yPosition);
    yPosition += splitText.length * 5 + 5;
  }

  // Informações do Closer
  yPosition += 10;
  doc.setFont(undefined as any, "bold");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text("RESPONSÁVEL", 20, yPosition);
  yPosition += 10;

  doc.setFont(undefined as any, "normal");
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.text(`Nome: ${closer?.name || "N/A"}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Email: ${closer?.email || "N/A"}`, 20, yPosition);
  yPosition += 7;
  doc.text(`Telefone: ${closer?.phone || "N/A"}`, 20, yPosition);

  // Footer
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(8);
  doc.text(`Documento gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`, 20, pageHeight - 10);

  // Salvar PDF
  doc.save(`Proposta_${proposal.id}_${new Date().getTime()}.pdf`);
}
