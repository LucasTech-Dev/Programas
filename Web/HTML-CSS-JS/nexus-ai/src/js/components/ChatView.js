import { renderMarkdown } from '../utils/markdown.js';
import { formatTime } from '../utils/helpers.js';

export class ChatView {
  constructor({ state, onSend, onRegenerate, onCopyMessage, onStopGenerating, onOpenSettings }) {
    this.state = state;
    this.onSend = onSend;
    this.onRegenerate = onRegenerate;
    this.onCopyMessage = onCopyMessage;
    this.onStopGenerating = onStopGenerating;
    this.onOpenSettings = onOpenSettings;
  }

  render() {
    const currentChat = this.state.chats.find((chat) => chat.id === this.state.currentChatId) || null;
    const messages = currentChat?.messages || [];

    return `
      <div class="flex flex-col h-full w-full relative">
        <header class="flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10 bg-[#080808]/80 backdrop-blur-sm">
          <div class="flex items-center gap-3">
            <button id="mobile-menu-toggle" class="md:hidden text-xl">☰</button>
            <div>
              <h2 class="text-lg font-semibold">${currentChat?.title || 'Nexus AI'}</h2>
            </div>
          </div>
          <button data-action="open-settings" class="text-[#a3a3a3] hover:text-white">⋮</button>
        </header>

        <main class="flex-1 overflow-y-auto scrollbar-thin px-4 md:px-8 py-6">
          ${messages.length ? `
            <div class="max-w-3xl mx-auto space-y-5">
              ${messages.map((message) => `
                <article class="message-enter flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}">
                  <div class="max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${message.role === 'user' ? 'bg-[#ff6a00] text-white' : 'bg-[#111111] border border-white/10 text-white'}">
                    <div class="text-xs uppercase tracking-[0.16em] mb-2 opacity-70">
                      ${message.role === 'user' ? 'Você' : 'Nexus'}
                    </div>
                    <div class="text-sm leading-7 whitespace-pre-wrap">
                      ${message.role === 'assistant' ? renderMarkdown(message.content) : message.content}
                    </div>
                    <div class="mt-3 flex items-center justify-between gap-3 text-[10px] opacity-70">
                      <span>${formatTime(message.timestamp)}</span>
                      ${message.role === 'assistant' ? `
                        <div class="flex items-center gap-2">
                          <button data-action="copy-message" data-message-id="${message.id}" class="hover:text-orange-300">Copiar</button>
                        </div>
                      ` : ''}
                    </div>
                  </div>
                </article>
              `).join('')}

              ${this.state.isGenerating ? `
                <div class="message-enter flex justify-start">
                  <div class="max-w-[85%] md:max-w-[60%] rounded-2xl bg-[#111111] border border-white/10 px-4 py-3">
                    <div class="flex items-center gap-2">
                      <div class="typing-dot"></div>
                      <div class="typing-dot"></div>
                      <div class="typing-dot"></div>
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>
          ` : `
            <div class="max-w-3xl mx-auto h-full flex items-center justify-center">
              <div class="text-center max-w-xl">
                <div class="text-4xl mb-4">✦</div>
                <h3 class="text-2xl font-semibold mb-2">Bem-vindo ao Nexus</h3>
                <p class="text-[#a3a3a3] leading-7">
                  Comece uma conversa, peça ajuda com código, planejamento, organização ou ideias e deixe o sistema evoluir para um ambiente pessoal de IA.
                </p>
              </div>
            </div>
          `}
        </main>

        <footer class="border-t border-white/10 bg-[#080808] px-4 md:px-8 py-4">
          <div class="max-w-3xl mx-auto">
            <div class="bg-[#111111] border border-white/10 rounded-2xl p-3 focus-within:border-[#ff6a00]/60 focus-within:shadow-glow transition">
              <textarea id="message-input" rows="1" placeholder="Escreva sua mensagem..." class="w-full resize-none bg-transparent text-white placeholder-[#737373] outline-none px-2 py-2 max-h-36"></textarea>
              <div class="flex items-center justify-between gap-3 pt-2 border-t border-white/10 mt-2">
                <div class="flex items-center gap-3 text-[#a3a3a3]">
                  <button class="text-xl hover:text-white" title="Anexar">＋</button>
                  <button class="text-xl hover:text-white" title="Adicionar arquivo">📎</button>
                </div>

                <div class="flex items-center gap-3">
                  <div class="text-xs text-[#a3a3a3]">Modelo: <span class="text-white">Nexus AI</span></div>
                  <button id="send-button" class="bg-[#ff6a00] hover:bg-[#ff7a1a] text-white rounded-lg px-4 py-2 font-medium transition">
                    ${this.state.isGenerating ? 'Gerando...' : 'Enviar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    `;
  }
}
