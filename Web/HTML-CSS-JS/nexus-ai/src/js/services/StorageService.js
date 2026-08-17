import { appConfig } from '../config/app.config.js';

export class StorageService {
  getChats() {
    try {
      const raw = localStorage.getItem(appConfig.storageKeys.chats);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.error('Erro ao ler chats:', error);
      return [];
    }
  }

  saveChats(chats) {
    localStorage.setItem(appConfig.storageKeys.chats, JSON.stringify(chats));
  }

  getSettings() {
    try {
      const raw = localStorage.getItem(appConfig.storageKeys.settings);
      return raw ? JSON.parse(raw) : { theme: 'dark', temperature: 0.7 };
    } catch (error) {
      return { theme: 'dark', temperature: 0.7 };
    }
  }

  saveSettings(settings) {
    localStorage.setItem(appConfig.storageKeys.settings, JSON.stringify(settings));
  }

  getCurrentChatId() {
    return localStorage.getItem(appConfig.storageKeys.currentChat) || null;
  }

  saveCurrentChatId(chatId) {
    if (!chatId) {
      localStorage.removeItem(appConfig.storageKeys.currentChat);
      return;
    }

    localStorage.setItem(appConfig.storageKeys.currentChat, chatId);
  }
}
