export class Sidebar {
  constructor({ state, onNewChat, onSelectChat, onDeleteChat, onOpenSettings }) {
    this.state = state;
    this.onNewChat = onNewChat;
    this.onSelectChat = onSelectChat;
    this.onDeleteChat = onDeleteChat;
    this.onOpenSettings = onOpenSettings;
  }

  render() {
    const chats = this.state.chats || [];
    const currentId = this.state.currentChatId;

    return `
      <aside class="w-full md:w-[260px] h-full bg-[#0d0d0d] border-r border-white/10 flex flex-col">
        <div class="p-4 border-b border-white/10">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ff6a00] to-[#ff7a1a] flex items-center justify-center text-sm font-bold text-black">N</div>
              <div>
                <h1 class="text-lg font-semibold">Nexus AI</h1>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4">
          <button data-action="new-chat" class="w-full bg-[#ff6a00] hover:bg-[#ff7a1a] text-white font-medium rounded-xl px-4 py-3 transition text-left flex items-center gap-2 shadow-glow">
            <span>＋</span>
            <span>Novo chat</span>
          </button>
        </div>

        <div class="px-4 pb-4">
          <div class="text-[11px] uppercase tracking-[0.18em] text-[#737373] mb-3">Chats</div>
          <div class="space-y-2 max-h-[56vh] overflow-y-auto scrollbar-thin">
            ${chats.length ? chats.map((chat) => `
              <div data-chat-id="${chat.id}" class="group flex items-center justify-between rounded-xl px-3 py-2 transition ${chat.id === currentId ? 'bg-white/5 border border-orange-500/30' : 'bg-transparent hover:bg-white/5'} ">
                <button data-action="select-chat" data-chat-id="${chat.id}" class="flex-1 text-left truncate text-sm text-[#e5e5e5]">
                  ${chat.title || 'Novo chat'}
                </button>
                <button data-action="delete-chat" data-chat-id="${chat.id}" class="opacity-0 group-hover:opacity-100 text-[#a3a3a3] hover:text-white text-xs transition">Excluir</button>
              </div>
            `).join('') : `
              <div class="rounded-xl border border-dashed border-white/10 p-3 text-sm text-[#a3a3a3]">
                Ainda não há chats.
              </div>
            `}
          </div>
        </div>

        <div class="mt-auto border-t border-white/10 p-4 space-y-2">
          <button data-action="open-settings" class="w-full text-left text-sm text-[#e5e5e5] hover:bg-white/5 rounded-lg px-3 py-2 transition">
            ⚙ Configurações
          </button>
          <div class="text-sm text-[#a3a3a3] px-3 py-2">
            👤 ${this.state.user?.name || 'Lucas'}
          </div>
        </div>
      </aside>
    `;
  }
}
