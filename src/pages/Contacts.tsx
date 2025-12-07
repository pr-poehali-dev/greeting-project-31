import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: 'Phone',
      title: 'Телефон',
      value: '+7 (800) 555-35-35',
      description: 'Звонок по России бесплатный',
    },
    {
      icon: 'Mail',
      title: 'Email',
      value: 'info@trendshop.ru',
      description: 'Ответим в течение 24 часов',
    },
    {
      icon: 'MapPin',
      title: 'Адрес',
      value: 'Москва, ул. Примерная, д. 123',
      description: 'Офис работает с 9:00 до 18:00',
    },
    {
      icon: 'Clock',
      title: 'Режим работы',
      value: 'Ежедневно 24/7',
      description: 'Поддержка всегда на связи',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-20 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold">Контакты</h1>
          <p className="mx-auto max-w-2xl text-xl text-white/90">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {contactInfo.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                    <Icon name={item.icon as any} className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="font-bold text-primary mb-1">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Напишите нам</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input
                      id="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      placeholder="Расскажите нам о вашем вопросе..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="Send" className="mr-2 h-4 w-4" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Часто задаваемые вопросы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-start gap-2">
                      <Icon name="HelpCircle" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      Как оформить заказ?
                    </h3>
                    <p className="text-sm text-muted-foreground ml-7">
                      Добавьте товары в корзину и следуйте инструкциям при оформлении заказа.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-start gap-2">
                      <Icon name="HelpCircle" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      Какие способы оплаты доступны?
                    </h3>
                    <p className="text-sm text-muted-foreground ml-7">
                      Мы принимаем банковские карты, онлайн-оплату и наличные при получении.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-start gap-2">
                      <Icon name="HelpCircle" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      Сколько длится доставка?
                    </h3>
                    <p className="text-sm text-muted-foreground ml-7">
                      По Москве - 1-2 дня, по России - 3-7 дней в зависимости от региона.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-start gap-2">
                      <Icon name="HelpCircle" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      Можно ли вернуть товар?
                    </h3>
                    <p className="text-sm text-muted-foreground ml-7">
                      Да, вы можете вернуть товар в течение 14 дней с момента получения.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Icon name="MessageCircle" className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Нужна помощь?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Наша служба поддержки всегда готова помочь вам с любыми вопросами
                      </p>
                      <Button variant="default">
                        <Icon name="Headphones" className="mr-2 h-4 w-4" />
                        Связаться с поддержкой
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
