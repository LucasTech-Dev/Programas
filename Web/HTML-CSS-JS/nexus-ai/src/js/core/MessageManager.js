import { createId } from '../utils/helpers.js';

export class MessageManager {
  constructor() {
    this.messages = [];
  }

  addMessage(role, content, metadata = {}) {
    const message = {
      id: createId('msg'),
      role,
      content,
      timestamp: Date.now(),
      status: metadata.status || 'complete',
      ...metadata
    };

    this.messages.push(message);
    return message;
  }

  updateMessage(messageId, partial) {
    const message = this.messages.find((item) => item.id === messageId);
    if (!message) return null;

    Object.assign(message, partial);
    return message;
  }

  replaceLastAssistant(content, status = 'complete') {
    const lastAssistant = [...this.messages].reverse().find((message) => message.role === 'assistant');
    if (!lastAssistant) return null;

    lastAssistant.content = content;
    lastAssistant.status = status;
    return lastAssistant;
  }

  clear() {
    this.messages = [];
  }
}
