export class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName).add(callback);
  }

  emit(eventName, payload) {
    const listeners = this.listeners.get(eventName) || new Set();
    listeners.forEach((callback) => callback(payload));
  }

  off(eventName, callback) {
    const listeners = this.listeners.get(eventName);
    if (!listeners) return;
    listeners.delete(callback);
  }
}
