export const state = {
  currentChatId: null,
  chats: [],
  messages: [],
  isGenerating: false,
  selectedModel: 'nexus-default',
  settings: {
    theme: 'dark',
    temperature: 0.7,
    systemPrompt: 'Você é Nexus AI, um assistente pessoal útil, direto e organizado. Responda em português, explique quando necessário e não invente informações.'
  },
  user: {
    name: 'Lucas'
  }
};
