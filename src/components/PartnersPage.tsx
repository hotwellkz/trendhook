const faqItems: FAQItem[] = [
  {
    question: 'Как это работает?',
    answer: 'Это работает очень просто! Мы предоставляем вам уникальную партнерскую ссылку для распространения. Если кто-то зарегистрирует аккаунт и купит подписку в течение 30 дней после клика по ссылке, вы получите свою долю с продажи!'
  },
  {
    question: 'Какие комиссионные я получу?',
    answer: 'Наша партнерская программа предлагает 30% повторяющейся комиссии. Наша модель с регулярными выплатами означает отличный пассивный доход для вас.'
  },
  {
    question: 'Когда производятся выплаты?',
    answer: 'Выплаты будут отправляться 1-го числа каждого месяца через PayPal.'
  },
  {
    question: 'Существуют ли минимальные требования к выплате?',
    answer: 'Вам нужно иметь минимальную сумму «неоплаченных комиссий» в размере $10 перед получением выплаты, чтобы снизить расходы на транзакционные сборы.'
  },
  {
    question: 'Как работает отслеживание партнеров?',
    answer: 'Когда кто-то нажимает на вашу ссылку, в их браузере закрепляется cookie-файл на 30 дней. Это позволяет отслеживать их, и при регистрации аккаунта они навсегда закрепляются за вами.'
  },
  {
    question: 'Могу ли я запустить рекламу для продвижения ViralHook?',
    answer: 'Да, вы можете использовать любые легальные методы продвижения, включая контекстную рекламу, социальные сети и email-маркетинг.'
  }
];

// ... остальной код остается тем же до кнопки ...

              <button
                onClick={copyToClipboard}
                disabled={!referralCode}
                className="bg-[#AAFF00] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#88CC00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Скопировано!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Сгенерировать URL
                  </>
                )}
              </button>

// ... остальной код остается без изменений
