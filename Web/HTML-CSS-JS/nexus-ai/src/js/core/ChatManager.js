import { createId } from '../utils/helpers.js';

export class ChatManager {
  constructor(storageService) {
    this.storage = storageService;
    this.chats = this.storage.getChats();
    this.currentChatId = null;
  }

  createChat(title = 'Novo chat') {
    const chat = {
      id: createId('chat'),
      title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: []
    };

    this.chats.unshift(chat);
    this.currentChatId = chat.id;
    this.storage.saveChats(this.chats);
    return chat;
  }

  selectChat(chatId) {
    const chat = this.chats.find((item) => item.id === chatId);
    this.currentChatId = chat ? chat.id : null;
    return chat || null;
  }

  renameChat(chatId, newTitle) {
    const chat = this.chats.find((item) => item.id === chatId);
    if (!chat) return null;

    chat.title = newTitle || 'Novo chat';
    chat.updatedAt = Date.now();
    this.storage.saveChats(this.chats);
    return chat;
  }

  deleteChat(chatId) {
    this.chats = this.chats.filter((chat) => chat.id !== chatId);
    if (this.currentChatId === chatId) {
      this.currentChatId = this.chats[0]?.id || null;
    }
    this.storage.saveChats(this.chats);
    return this.chats;
  }

  getCurrentChat() {
    return this.chats.find((chat) => chat.id === this.currentChatId) || null;
  }

  updateChat(chatId, payload) {
    const chat = this.chats.find((item) => item.id === chatId);
    if (!chat) return null;

    Object.assign(chat, payload, { updatedAt: Date.now() });
    this.storage.saveChats(this.chats);
    return chat;
  }

  clear() {
    this.chats = [];
    this.currentChatId = null;
    this.storage.saveChats(this.chats);
  }
}
