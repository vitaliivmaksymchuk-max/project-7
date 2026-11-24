/**
 * Чиста функція валідації введеного тексту завдання
 */
function validateTaskInput(value, maxLength = 300) {
  if (typeof value !== 'string') {
    return false;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength;
}

/**
 * Чиста функція фільтрації списку завдань за станом
 */
function filterTasks(tasks, filter) {
  if (!Array.isArray(tasks)) {
    return [];
  }
  if (filter === 'active') {
    return tasks.filter((task) => !task.completed);
  }
  if (filter === 'completed') {
    return tasks.filter((task) => task.completed);
  }
  return tasks;
}

// Стан додатку
let tasks = [
  { id: 1, text: 'Перевірити адаптивність на 375px, 768px та 1440px', completed: true },
  { id: 2, text: 'Провести аудит доступності у Chrome DevTools Lighthouse', completed: false }
];
let currentFilter = 'all';

function renderApp() {
  const listEl = document.getElementById('task-list');
  const emptyEl = document.getElementById('empty-state');
  const countAll = document.getElementById('count-all');
  const countActive = document.getElementById('count-active');
  const countCompleted = document.getElementById('count-completed');

  if (!listEl) return;

  // Оновлення лічильників
  countAll.textContent = String(tasks.length);
  countActive.textContent = String(tasks.filter((t) => !t.completed).length);
  countCompleted.textContent = String(tasks.filter((t) => t.completed).length);

  // Очищення списку та безпечний рендер через textContent
  listEl.innerHTML = '';
  const visibleTasks = filterTasks(tasks, currentFilter);

  emptyEl.style.display = visibleTasks.length === 0 ? 'block' : 'none';

  visibleTasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'task-item completed' : 'task-item';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'task-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', 'Позначити завдання як виконане');
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      renderApp();
    });

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text; // Захист від XSS

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Видалити';
    deleteBtn.setAttribute('aria-label', 'Видалити завдання');
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter((item) => item.id !== task.id);
      renderApp();
    });

    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(span);
    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    listEl.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const errorMsg = document.getElementById('error-msg');
  const tabButtons = document.querySelectorAll('.tab-btn');

  if (form && input && errorMsg) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const rawValue = input.value;

      if (!validateTaskInput(rawValue, 300)) {
        errorMsg.textContent =
          rawValue.trim().length === 0
            ? 'Помилка: поле не може бути порожнім або містити лише пробіли.'
            : 'Помилка: максимальна довжина завдання — 300 символів.';
        input.focus();
        return;
      }

      errorMsg.textContent = '';
      tasks.unshift({
        id: Date.now(),
        text: rawValue.trim(),
        completed: false
      });

      input.value = '';
      renderApp();
    });

    input.addEventListener('input', () => {
      if (errorMsg.textContent) {
        errorMsg.textContent = '';
      }
    });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter || 'all';
      renderApp();
    });
  });

  renderApp();
});