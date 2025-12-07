import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-24 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=900&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl animate-fade-in">
              Добро пожаловать в TrendShop
            </h1>
            <p className="mb-8 text-xl text-white/90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Современный магазин с яркими трендами и выгодными предложениями
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/catalog">
                  <Icon name="ShoppingBag" className="mr-2 h-5 w-5" />
                  Каталог товаров
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white hover:bg-white/20" asChild>
                <Link to="/about">
                  Узнать больше
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon name="Truck" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Быстрая доставка</h3>
                <p className="text-muted-foreground">
                  Доставка по всей России от 1 дня
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <Icon name="Shield" className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Гарантия качества</h3>
                <p className="text-muted-foreground">
                  Официальная гарантия на все товары
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Icon name="Gift" className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Бонусная система</h3>
                <p className="text-muted-foreground">
                  Получайте до 5% бонусами с каждой покупки
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">Популярные товары</h2>
            <p className="text-xl text-muted-foreground">
              Лучшие предложения этого месяца
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <Link to="/catalog">
                Смотреть весь каталог
                <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-12 text-center text-white">
            <Icon name="Sparkles" className="mx-auto mb-6 h-16 w-16" />
            <h2 className="mb-4 text-4xl font-bold">Специальное предложение</h2>
            <p className="mb-8 text-xl text-white/90">
              Получите дополнительную скидку 10% на первый заказ
            </p>
            <Button size="lg" variant="secondary">
              <Link to="/catalog">
                Воспользоваться предложением
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <Icon name="ShoppingBag" className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">TrendShop</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Современный интернет-магазин с яркими трендами
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Навигация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/catalog" className="hover:text-foreground">Каталог</Link></li>
                <li><Link to="/about" className="hover:text-foreground">О магазине</Link></li>
                <li><Link to="/contacts" className="hover:text-foreground">Контакты</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Помощь</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Доставка</a></li>
                <li><a href="#" className="hover:text-foreground">Оплата</a></li>
                <li><a href="#" className="hover:text-foreground">Гарантия</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  +7 (800) 555-35-35
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4" />
                  info@trendshop.ru
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2024 TrendShop. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
