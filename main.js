function copyAddress(address) {
  navigator.clipboard
    .writeText(address)
    .then(() => {
      alert("Адрес скопирован: " + address);
    })
    .catch((err) => {
      console.error("Ошибка копирования: ", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("language-selector");

  // Функция для загрузки JSON-файлов перевода
  async function loadTranslation(lang) {
    try {
      const response = await fetch(`./locales/${lang}.json`);
      const translations = await response.json();
      applyTranslation(translations);
    } catch (error) {
      console.error("Error loading translation:", error);
    }
  }

  // Функция для применения перевода
  function applyTranslation(translations) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[key] && element) { // Добавлена проверка на существование элемента
        element.textContent = translations[key];
      }
    });
  }

  // Слушатель для изменения языка
  languageSelector.addEventListener("change", (event) => {
    const selectedLang = event.target.value;
    loadTranslation(selectedLang);
  });

  // Загрузка перевода по умолчанию
  loadTranslation("ru");
});