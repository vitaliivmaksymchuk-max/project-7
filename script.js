/**
 * Чиста функція валідації введеного тексту.
 * @param {unknown} value - Вхідне значення
 * @param {number} maxLength - Максимально допустима довжина
 * @returns {boolean}
 */
function validateInput(value, maxLength = 300) {
  if (typeof value !== 'string') {
    return false;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength;
}

/**
 * Безпечне створення елемента списку без використання innerHTML (захист від XSS)
 */
function renderItem(text) {
  const list = document.getElementById('items-list');
  if (!list) return;

  const li = document.createElement('li');
  li.textContent = text; // Безпечно: HTML-теги відобразяться як звичайний текст
  list.appendChild(li);
}

// Обробник форми
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('item-form');
  const input = document.getElementById('user-input');

  if (form && input) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const rawValue = input.value;

      if (!validateInput(rawValue)) {
        input.focus();
        return;
      }

      renderItem(rawValue.trim());
      input.value = '';
    });
  }
});