// Toast notification utilities
export const showToast = (message, type = 'info', duration = 1500) => {
  // Remove any existing toasts
  const existingToasts = document.querySelectorAll('.toast-notification');
  existingToasts.forEach(toast => toast.remove());

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast-notification alert alert-${type} fixed top-20 right-4 w-auto max-w-sm z-50 shadow-2xl rounded-2xl border border-base-content/20 backdrop-blur-xl bg-base-100/90 transform translate-x-full opacity-0 transition-all duration-300`;
  
  // Toast content with emojis
  const getToastEmoji = (type) => {
    switch (type) {
      case 'success': return '';
      case 'error': return '';
      case 'warning': return '';
      case 'info': return '';
      default: return '';
    }
  };

  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="text-xl">${getToastEmoji(type)}</span>
      <span class="font-medium text-sm">${message}</span>
      <button class="btn btn-ghost btn-xs ml-2 hover:bg-base-content/10 rounded-lg" onclick="this.parentElement.parentElement.remove()">
        ✕
      </button>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
    toast.style.opacity = '1';
  }, 100);
  
  // Auto remove after duration
  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.style.transform = 'translateX(100%)';
      toast.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }
  }, duration);
};

// Success toast shorthand
export const showSuccessToast = (message) => {
  showToast(message, 'success');
};

// Error toast shorthand
export const showErrorToast = (message) => {
  showToast(message, 'error');
};

// Warning toast shorthand
export const showWarningToast = (message) => {
  showToast(message, 'warning');
};

// Info toast shorthand
export const showInfoToast = (message) => {
  showToast(message, 'info');
};