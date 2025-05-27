<template>
    <div class="border-8 border-yellow-600 "></div>
    <footer class="bg-stone-800 text-white py-10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-4 gap-6">
          <div>
            <h3 class="text-lg font-bold">МЫ НА СВЯЗИ!</h3>
            <p class="text-sm mt-2">Винные истории, акции и бонусы для своих. Один клик - и у вас в почте.</p>
            <div class="mt-4 flex items-center border border-gray-600 rounded overflow-hidden">
              <input 
                type="email" 
                placeholder="Укажите свой e-mail" 
                class="flex-1 px-3 py-2 bg-stone-800 text-white focus:outline-none" />
              <button class="bg-yellow-600 px-4 py-2">&rarr;</button>
            </div>
            <div class="flex items-center mt-2">
              <input type="checkbox" id="agreement" class="mr-2" />
              <label for="agreement" class="text-xs">Я согласен с условиями пользовательского соглашения</label>
            </div>
            <h3 class="text-lg font-bold mt-6">МЫ В СОЦИАЛЬНЫХ СЕТЯХ</h3>
            <div class="flex space-x-4 mt-3">
              <img src="/icons/facebook.svg" alt="Facebook" class="w-6 h-6" />
              <img src="/icons/instagram.svg" alt="Instagram" class="w-6 h-6" />
              <img src="/icons/whatsapp.svg" alt="WhatsApp" class="w-6 h-6" />
              <img src="/icons/telegram.svg" alt="Telegram" class="w-6 h-6" />
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold">О BRUT</h3>
            <ul class="mt-3 space-y-2 text-sm">
              <li>О магазине</li>
              <li>События</li>
              <li>Система лояльности</li>
              <li>Публичная оферта</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold">СОТРУДНИЧЕСТВО</h3>
            <ul class="mt-3 space-y-2 text-sm">
              <li>Корпоративным клиентам</li>
              <li>Частным клиентам</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold">КОНТАКТЫ</h3>
            <ul class="mt-3 space-y-2 text-sm">
              <li><img src="/icons/location.svg" class="inline w-4 h-4 mr-2" /> Алматы</li>
              <li>+7 777 666 2233</li>
              <li>+7 777 666 2233</li>
              <li><strong>Есть винный вопрос?</strong> Звоните, обсудим!</li>
              <li>brutwine@mail.ru</li>
            </ul>
          </div>
        </div>
        <div class="mt-10 flex justify-between text-xs border-t border-gray-700 pt-4">
          <p>@BRUT, 2025</p>
          <p>Пользовательское соглашение и условия | Обработка персональных данных</p>
          <p>Создание сайтов. Разработано Danial Issak</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  </script>
  