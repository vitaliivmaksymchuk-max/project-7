/**
 * Ізольовані модульні перевірки бізнес-логіки засобами нативного console.assert()
 */
function runUnitTests() {
  // Перевірка наявності тестованої функції у глобальній області видимості
  console.assert(
    typeof validateInput === 'function',
    'Критична помилка: функція validateInput не знайдена.'
  );

  if (typeof validateInput !== 'function') return;

  // Тест 1: Валідний непорожній рядок
  console.assert(
    validateInput('Коректний запис') === true,
    'Тест 1 провалено: валідний рядок має повертати true.'
  );

  // Тест 2: Порожній рядок
  console.assert(
    validateInput('') === false,
    'Тест 2 провалено: порожній рядок має повертати false.'
  );

  // Тест 3: Рядок, що складається лише з пробілів
  console.assert(
    validateInput('     ') === false,
    'Тест 3 провалено: рядок із пробілів має повертати false.'
  );

  // Тест 4: Некоректний тип даних (число, null, undefined)
  console.assert(
    validateInput(null) === false && validateInput(12345) === false,
    'Тест 4 провалено: нерядкові типи даних мають повертати false.'
  );

  // Тест 5: Гранична довжина (рядок понад ліміт у 300 символів)
  const overLimitString = 'A'.repeat(301);
  console.assert(
    validateInput(overLimitString, 300) === false,
    'Тест 5 провалено: рядок, довший за ліміт, має повертати false.'
  );

  // Тест 6: XSS-рядок є валідним текстом на рівні вводу (екранування відбувається при рендері)
  console.assert(
    validateInput('<img src=x onerror=alert(1)>') === true,
    'Тест 6 провалено: текстовий рядок зі спецсимволами має проходити базову валідацію довжини.'
  );
}

// Запуск тестів після повного завантаження DOM без побічних ефектів для інтерфейсу
document.addEventListener('DOMContentLoaded', () => {
  runUnitTests();
});