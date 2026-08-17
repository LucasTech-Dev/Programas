export class Toast {
  constructor() {
    this.element = null;
  }

  show(message, type = 'info') {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.className = 'fixed bottom-5 right-5 z-50 rounded-xl px-4 py-3 text-sm shadow-lg border';
      document.body.appendChild(this.element);
    }

    const colors = {
      info: 'bg-[#111111] text-white border-white/10',
      success: 'bg-green-900/80 text-green-100 border-green-500/40',
      error: 'bg-red-900/80 text-red-100 border-red-500/40'
    };

    this.element.className = `fixed bottom-5 right-5 z-50 rounded-xl px-4 py-3 text-sm shadow-lg border ${colors[type] || colors.info}`;
    this.element.textContent = message;
    this.element.hidden = false;

    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.element.hidden = true;
    }, 2200);
  }
}
