import { state } from './state/store.js';
import { StorageService } from './services/StorageService.js';
import { AIService } from './services/AIService.js';
import { ChatManager } from './core/ChatManager.js';
import { MessageManager } from './core/MessageManager.js';
import { Sidebar } from './components/Sidebar.js';
import { ChatView } from './components/ChatView.js';
import { SettingsModal } from './components/SettingsModal.js';
import { Toast } from './components/Toast.js';
import { createId } from './utils/helpers.js';

class NexusApp {
  constructor() {
    this.storage = new StorageService();
    this.chatManager = new ChatManager(this.storage);
    this.messageManager = new MessageManager();
    this.aiService = new AIService();
    this.toast = new Toast();

    const savedSettings = this.storage.getSettings();
    state.settings = { ...state.settings, ...savedSettings };
    state.selectedModel = 'nexus-default';

    const storedChatId = this.storage.getCurrentChatId();
    if (storedChatId && this.chatManager.chats.some((chat) => chat.id === storedChatId)) {
      this.chatManager.currentChatId = storedChatId;
    } else if (this.chatManager.chats.length === 0) {
      const initialChat = this.chatManager.createChat('Novo chat');
      this.chatManager.currentChatId = initialChat.id;
    } else {
      this.chatManager.currentChatId = this.chatManager.chats[0].id;
    }

    this.state = state;
    this.state.chats = this.chatManager.chats;
    this.state.currentChatId = this.chatManager.currentChatId;
    this.state.messages = this.getCurrentChatMessages();
    this.root = document.getElementById('app');
    this.isSettingsOpen = false;

    this.render();
    this.bindEvents();
  }

  getCurrentChatMessages() {
    const chat = this.chatManager.getCurrentChat();
    return chat?.messages || [];
  }

  syncStateFromChats() {
    this.state.chats = this.chatManager.chats;
    this.state.currentChatId = this.chatManager.currentChatId;
    this.state.messages = this.getCurrentChatMessages();
    this.storage.saveCurrentChatId(this.chatManager.currentChatId);
  }

  render() {
    const sidebar = new Sidebar({
      state: this.state,
      onNewChat: () => this.createNewChat(),
      onSelectChat: (chatId) => this.selectChat(chatId),
      onDeleteChat: (chatId) => this.deleteChat(chatId),
      onOpenSettings: () => this.toggleSettings(true)
    });

    const chatView = new ChatView({
      state: this.state,
      onSend: () => this.sendMessage(),
      onRegenerate: () => this.regenerate(),
      onCopyMessage: (messageId) => this.copyMessage(messageId),
      onStopGenerating: () => this.stopGenerating(),
      onOpenSettings: () => this.toggleSettings(true)
    });

    const appLayout = `
      <div class="flex flex-col md:flex-row min-h-screen bg-[#080808] text-white">
        <div class="md:w-[260px] md:min-h-screen">
          ${sidebar.render()}
        </div>
        <div class="flex-1 min-h-screen">
          ${chatView.render()}
        </div>
      </div>
      ${this.isSettingsOpen ? new SettingsModal({ state: this.state, onSave: () => this.saveSettings() }).render() : ''}
    `;

    this.root.innerHTML = appLayout;
    this.afterRender();
  }

  afterRender() {
    const chatInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    if (chatInput) {
      chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          this.sendMessage();
        }

        if (event.key === 'Escape') {
          chatInput.blur();
        }
      });

      chatInput.addEventListener('input', () => {
        chatInput.style.height = 'auto';
        chatInput.style.height = `${Math.min(chatInput.scrollHeight, 144)}px`;
      });
    }

    if (sendButton) {
      sendButton.addEventListener('click', () => this.sendMessage());
    }

    document.querySelectorAll('[data-action="new-chat"]').forEach((button) => {
      button.addEventListener('click', () => this.createNewChat());
    });

    document.querySelectorAll('[data-action="select-chat"]').forEach((button) => {
      button.addEventListener('click', () => this.selectChat(button.dataset.chatId));
    });

    document.querySelectorAll('[data-action="delete-chat"]').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        this.deleteChat(button.dataset.chatId);
      });
    });

    document.querySelectorAll('[data-action="open-settings"]').forEach((button) => {
      button.addEventListener('click', () => this.toggleSettings(true));
    });

    document.querySelectorAll('[data-action="close-settings"]').forEach((button) => {
      button.addEventListener('click', () => this.toggleSettings(false));
    });

    const saveSettingsButton = document.getElementById('save-settings');
    if (saveSettingsButton) {
      saveSettingsButton.addEventListener('click', () => this.saveSettings());
    }

    const copyButtons = document.querySelectorAll('[data-action="copy-message"]');
    copyButtons.forEach((button) => {
      button.addEventListener('click', () => this.copyMessage(button.dataset.messageId));
    });

    const mobileToggle = document.getElementById('mobile-menu-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const sidebar = document.querySelector('aside');
        if (sidebar) {
          sidebar.classList.toggle('hidden');
        }
      });
    }
  }

  bindEvents() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action]');
      if (!button) return;

      const action = button.dataset.action;
      if (action === 'new-chat') this.createNewChat();
      if (action === 'select-chat') this.selectChat(button.dataset.chatId);
      if (action === 'delete-chat') this.deleteChat(button.dataset.chatId);
      if (action === 'open-settings') this.toggleSettings(true);
      if (action === 'close-settings') this.toggleSettings(false);
      if (action === 'copy-message') this.copyMessage(button.dataset.messageId);
    });
  }

  createNewChat() {
    const chat = this.chatManager.createChat(`Chat ${this.chatManager.chats.length + 1}`);
    this.syncStateFromChats();
    this.render();
    this.toast.show('Novo chat criado');
    return chat;
  }

  selectChat(chatId) {
    const selected = this.chatManager.selectChat(chatId);
    if (!selected) return;

    this.syncStateFromChats();
    this.render();
  }

  deleteChat(chatId) {
    if (!chatId) return;
    this.chatManager.deleteChat(chatId);
    this.syncStateFromChats();
    this.render();
    this.toast.show('Chat removido');
  }

  toggleSettings(open) {
    this.isSettingsOpen = open;
    this.render();
  }

  saveSettings() {
    const temperatureInput = document.getElementById('temperature');
    const systemPromptInput = document.getElementById('system-prompt');

    state.settings.temperature = Number(temperatureInput?.value || 0.7);
    state.settings.systemPrompt = systemPromptInput?.value || state.settings.systemPrompt;

    this.storage.saveSettings(state.settings);
    this.isSettingsOpen = false;
    this.render();
    this.toast.show('Configurações salvas', 'success');
  }

  async sendMessage() {
    const input = document.getElementById('message-input');
    const content = input?.value.trim();

    if (!content) return;

    let chat = this.chatManager.getCurrentChat();
    if (!chat) {
      chat = this.chatManager.createChat('Novo chat');
      this.syncStateFromChats();
    }

    const userMessage = this.messageManager.addMessage('user', content);
    chat.messages.push(userMessage);
    chat.updatedAt = Date.now();

    const assistantPlaceholder = this.messageManager.addMessage('assistant', 'Pensando...', { status: 'loading' });
    chat.messages.push(assistantPlaceholder);
    this.chatManager.updateChat(chat.id, { messages: chat.messages });
    this.syncStateFromChats();
    this.state.isGenerating = true;
    this.render();

    try {
      const modelMessages = chat.messages
        .filter((message) => message.id !== assistantPlaceholder.id)
        .map((message) => ({ role: message.role, content: message.content }));

      const response = await this.aiService.sendMessage(modelMessages, {
        systemPrompt: state.settings.systemPrompt,
        temperature: state.settings.temperature,
        model: state.selectedModel
      });

      chat.messages = chat.messages.filter((message) => message.id !== assistantPlaceholder.id);
      const assistantMessage = this.messageManager.addMessage('assistant', response, { status: 'complete' });
      chat.messages.push(assistantMessage);
      chat.title = chat.title === 'Novo chat' ? this.extractTitle(content) : chat.title;
      this.chatManager.updateChat(chat.id, { messages: chat.messages, title: chat.title });
      this.syncStateFromChats();
      this.state.isGenerating = false;
      this.render();
      this.toast.show('Resposta gerada', 'success');
    } catch (error) {
      chat.messages = chat.messages.filter((message) => message.id !== assistantPlaceholder.id);
      const errorMessage = this.messageManager.addMessage('assistant', `Erro: ${error.message || 'Falha ao processar a resposta.'}`, { status: 'error' });
      chat.messages.push(errorMessage);
      this.chatManager.updateChat(chat.id, { messages: chat.messages });
      this.state.isGenerating = false;
      this.syncStateFromChats();
      this.render();
      this.toast.show('Erro ao gerar resposta', 'error');
    }

    input.value = '';
    input.focus();
  }

  regenerate() {
    this.toast.show('Regeneração em desenvolvimento', 'info');
  }

  stopGenerating() {
    this.state.isGenerating = false;
    this.render();
    this.toast.show('Geração interrompida', 'info');
  }

  extractTitle(text) {
    const clean = text.replace(/\s+/g, ' ').trim();
    return clean.length > 28 ? `${clean.slice(0, 28)}...` : clean;
  }

  async copyMessage(messageId) {
    const chat = this.chatManager.getCurrentChat();
    const message = chat?.messages.find((item) => item.id === messageId);

    if (!message) return;

    try {
      await navigator.clipboard.writeText(message.content);
      this.toast.show('Mensagem copiada', 'success');
    } catch (error) {
      this.toast.show('Não foi possível copiar', 'error');
    }
  }
}

new NexusApp();
