export class SettingsModal {
  constructor({ state, onSave }) {
    this.state = state;
    this.onSave = onSave;
  }

  render() {
    return `
      <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div class="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111111] p-5">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold">Configurações</h3>
            <button data-action="close-settings" class="text-[#a3a3a3] hover:text-white">✕</button>
          </div>

          <div class="space-y-6">
            <div>
              <label class="block text-sm mb-2 text-[#a3a3a3]">Nome da IA</label>
              <input id="ai-name" value="${this.state.settings?.systemPrompt?.includes('Nexus') ? 'Nexus AI' : 'Nexus AI'}" class="w-full bg-[#0d0d0d] text-white border border-white/10 rounded-xl px-3 py-2 outline-none focus:border-[#ff6a00]/60" />
            </div>

            <div>
              <label class="block text-sm mb-2 text-[#a3a3a3]">Temperatura</label>
              <input id="temperature" type="range" min="0" max="1" step="0.1" value="${this.state.settings.temperature || 0.7}" class="w-full accent-[#ff6a00]" />
            </div>

            <div>
              <label class="block text-sm mb-2 text-[#a3a3a3]">System Prompt</label>
              <textarea id="system-prompt" rows="6" class="w-full bg-[#0d0d0d] text-white border border-white/10 rounded-xl px-3 py-2 outline-none focus:border-[#ff6a00]/60">${this.state.settings.systemPrompt || 'Você é Nexus AI...'}</textarea>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button data-action="close-settings" class="px-4 py-2 rounded-lg border border-white/10 text-[#e5e5e5]">Cancelar</button>
            <button id="save-settings" class="px-4 py-2 rounded-lg bg-[#ff6a00] hover:bg-[#ff7a1a] text-white">Salvar</button>
          </div>
        </div>
      </div>
    `;
  }
}
