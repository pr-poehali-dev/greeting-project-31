import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const About = () => {
  const features = [
    {
      icon: 'ShieldCheck',
      title: 'Гарантия качества',
      description: 'Все товары проходят строгий контроль качества. Официальная гарантия от производителей.',
    },
    {
      icon: 'Truck',
      title: 'Быстрая доставка',
      description: 'Доставка по всей России от 1 дня. Бесплатная доставка при заказе от 5000 рублей.',
    },
    {
      icon: 'CreditCard',
      title: 'Удобная оплата',
      description: 'Безопасная оплата картой, онлайн или наличными при получении.',
    },
    {
      icon: 'Headphones',
      title: 'Поддержка 24/7',
      description: 'Наша служба поддержки всегда готова помочь вам с любыми вопросами.',
    },
    {
      icon: 'Gift',
      title: 'Бонусная программа',
      description: 'Получайте бонусы с каждой покупки и тратьте их на следующие заказы.',
    },
    {
      icon: 'RefreshCw',
      title: 'Возврат товара',
      description: 'Легкий возврат и обмен товаров в течение 14 дней без лишних вопросов.',
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Довольных клиентов' },
    { value: '100,000+', label: 'Товаров в каталоге' },
    { value: '99%', label: 'Положительных отзывов' },
    { value: '24/7', label: 'Поддержка клиентов' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-20 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold">О TrendShop</h1>
          <p className="mx-auto max-w-2xl text-xl text-white/90">
            Современный интернет-магазин с яркими трендами и лучшими предложениями для вас
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Наша миссия</h2>
            <p className="text-lg text-muted-foreground">
              Мы создали TrendShop, чтобы сделать онлайн-шопинг простым, удобным и доступным для каждого. 
              Наша цель - предложить вам качественные товары по честным ценам с отличным сервисом.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                    <Icon name={feature.icon as any} className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Почему выбирают нас?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon name="Check" className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Тщательный отбор товаров</h3>
                    <p className="text-muted-foreground">
                      Мы работаем только с проверенными поставщиками и брендами
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                      <Icon name="Check" className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Конкурентные цены</h3>
                    <p className="text-muted-foreground">
                      Регулярные акции и специальные предложения для наших клиентов
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <Icon name="Check" className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Прозрачность и честность</h3>
                    <p className="text-muted-foreground">
                      Никаких скрытых комиссий и неожиданных платежей
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop"
                alt="Shopping"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Присоединяйтесь к нам</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Станьте частью сообщества TrendShop и получайте эксклюзивные предложения
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <Icon name="Mail" className="h-5 w-5" />
              <span>info@trendshop.ru</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <Icon name="Phone" className="h-5 w-5" />
              <span>+7 (800) 555-35-35</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
