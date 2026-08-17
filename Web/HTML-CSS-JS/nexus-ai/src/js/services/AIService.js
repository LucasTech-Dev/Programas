export class AIService {
  constructor() {
    this.provider = 'mock';
  }

  async sendMessage(messages, options = {}) {
    const systemPrompt = options.systemPrompt || 'Você é Nexus AI, um assistente pessoal útil e direto.';
    const userInput = messages[messages.length - 1]?.content || '';

    if (!userInput.trim()) {
      throw new Error('Mensagem vazia.');
    }

    if (this.provider === 'mock') {
      return this.mockResponse(userInput, systemPrompt);
    }

    const response = await fetch(options.endpoint || '/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.apiKey ? { Authorization: `Bearer ${options.apiKey}` } : {})
      },
      body: JSON.stringify({
        model: options.model || 'nexus-default',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature: options.temperature ?? 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Erro ao consultar a API.');
    }

    const data = await response.json();
    return data.output || data.message || data.content || 'Sem resposta.';
  }

  mockResponse(userInput, systemPrompt) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const answer = `Olá! Sou o Nexus AI.\n\nRecebi sua mensagem: "${userInput}".\n\nO sistema está pronto para evoluir para streaming, memória, arquivos e integrações com IA real.\n\nPrompt do sistema atual:\n\n${systemPrompt}`;
        resolve(answer);
      }, 1200);
    });
  }
}
