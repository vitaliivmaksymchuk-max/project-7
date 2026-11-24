/**
 * Модульні перевірки бізнес-логіки засобами нативного console.assert()
 */
function runUnitTests() {
  console.assert(
    typeof validateTaskInput === 'function' && typeof filterTasks === 'function',
    'Критична помилка: функції бізнес-логіки не знайдені.'
  );

  // Тести функції validateTaskInput()
  console.assert(
    validateTaskInput('Здати практичну роботу №7') === true,
    'Тест 1 провалено: коректний рядок має проходити валідацію.'
  );

  console.assert(
    validateTaskInput('') === false,
    'Тест 2 провалено: порожній рядок має відхилятися.'
  );

  console.assert(
    validateTaskInput('     ') === false,
    'Тест 3 провалено: рядок лише з пробілів має відхилятися.'
  );

  console.assert(
    validateTaskInput(null) === false && validateTaskInput(42) === false,
    'Тест 4 провалено: некоректні типи даних мають відхилятися.'
  );

  console.assert(
    validateTaskInput('A'.repeat(301), 300) === false,
    'Тест 5 провалено: рядок понад 300 символів має відхилятися.'
  );

  // Тести функції filterTasks()
  const mockTasks = [
    { id: 1, text: 'Перше', completed: false },
    { id: 2, text: 'Друге', completed: true }
  ];

  console.assert(
    filterTasks(mockTasks, 'all').length === 2,
    'Тест 6 провалено: фільтр "all" має повертати всі елементи.'
  );

  console.assert(
    filterTasks(mockTasks, 'active').length === 1 &&
      filterTasks(mockTasks, 'active')[0].id === 1,
    'Тест 7 провалено: фільтр "active" має повертати лише невиконані завдання.'
  );

  console.assert(
    filterTasks(mockTasks, 'completed').length === 1 &&
      filterTasks(mockTasks, 'completed')[0].id === 2,
    'Тест 8 провалено: фільтр "completed" має повертати лише виконані завдання.'
  );
}

document.addEventListener('DOMContentLoaded', () => {
  runUnitTests();
});