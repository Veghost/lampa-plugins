(function(){
  // Список плагинов: добавь сюда URL-адреса своих js-файлов
  const plugins = [
    // пример raw-ссылок или GitHub Pages
    'https://raw.githubusercontent.com/Veghost/lampa-plugins/main/plugins/plugin1.js',
    'https://raw.githubusercontent.com/Veghost/lampa-plugins/main/plugins/plugin2.js',
    'https://raw.githubusercontent.com/Veghost/lampa-plugins/main/plugins/torrents.js',
    'https://raw.githubusercontent.com/Veghost/lampa-plugins/main/plugins/online.js'
  ];

  // Основная инициализация
  function init(){
    // Вешаем слушатель на открытие настроек
    Lampa.Settings.listener.follow('open', (event) => {
      if(event.name === 'addons_menu'){
        showAddonMenu();
      }
    });
  }

  // Показываем пункт "Плагины"
  function showAddonMenu(){
    let items = plugins.map((url, index) => ({
      title: `Плагин ${index + 1}`,
      url: url,
      component: 'text',
      handler: () => loadPlugin(url)
    }));

    Lampa.Activity.push({
      url: '',
      title: 'Установить плагины',
      component: 'list',
      page: 1,
      search: false,
      once: false,
      more: false,
      items: items
    });
  }

  // Подгрузка плагина
  function loadPlugin(url){
    import(url)
      .then(() => {
        Lampa.Noty.show('Плагин загружен');
      })
      .catch(err => {
        console.error('Ошибка загрузки плагина', err);
        Lampa.Noty.show('Не удалось загрузить плагин');
      });
  }

  // Зарегистрировать вкладку в настройках
  Lampa.Settings.add({
    id: 'addons_menu',
    title: 'Плагины',
    component: {
      name: 'addons_menu'
    }
  });

  // Запуск
  init();
})();
