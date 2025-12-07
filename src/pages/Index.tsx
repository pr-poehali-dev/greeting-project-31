import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  discount?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Беспроводные наушники Pro', price: 12990, category: 'Электроника', image: '🎧', rating: 4.8, discount: 20 },
  { id: 2, name: 'Смарт-часы Ultra', price: 24990, category: 'Электроника', image: '⌚', rating: 4.9 },
  { id: 3, name: 'Рюкзак городской Premium', price: 5990, category: 'Аксессуары', image: '🎒', rating: 4.7, discount: 15 },
  { id: 4, name: 'Кроссовки спортивные Boost', price: 8990, category: 'Обувь', image: '👟', rating: 4.6 },
  { id: 5, name: 'Солнцезащитные очки Ray', price: 7490, category: 'Аксессуары', image: '🕶️', rating: 4.5 },
  { id: 6, name: 'Портативная колонка Wave', price: 4990, category: 'Электроника', image: '🔊', rating: 4.7, discount: 10 },
  { id: 7, name: 'Фитнес-браслет Smart', price: 3990, category: 'Электроника', image: '📱', rating: 4.4 },
  { id: 8, name: 'Термос стальной 1L', price: 2490, category: 'Товары для дома', image: '🌡️', rating: 4.8 },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<'home' | 'catalog' | 'profile' | 'about' | 'contacts'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = products.filter(p =>
    (selectedCategory === 'Все' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center text-2xl animate-scale-in">
                🛍️
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                TrendShop
              </h1>
            </div>

            <nav className="hidden md:flex gap-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'catalog', label: 'Каталог' },
                { id: 'about', label: 'О магазине' },
                { id: 'contacts', label: 'Контакты' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`font-medium transition-all hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveSection('profile')}
                className="relative"
              >
                <Icon name="User" size={20} />
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-gradient-to-r from-secondary to-accent">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Icon name="ShoppingBag" size={20} />
                      Корзина ({cartCount})
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        Корзина пуста
                      </div>
                    ) : (
                      <>
                        {cart.map(item => (
                          <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="text-5xl">{item.image}</div>
                                <div className="flex-1">
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {item.price.toLocaleString()} ₽
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, -1)}
                                    >
                                      -
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => updateQuantity(item.id, 1)}
                                    >
                                      +
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => removeFromCart(item.id)}
                                      className="ml-auto text-destructive"
                                    >
                                      <Icon name="X" size={16} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between text-lg font-bold mb-4">
                            <span>Итого:</span>
                            <span className="text-primary">{cartTotal.toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-primary via-secondary to-accent">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Icon name="Menu" size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <nav className="flex flex-col gap-4 mt-8">
                    {[
                      { id: 'home', label: 'Главная' },
                      { id: 'catalog', label: 'Каталог' },
                      { id: 'profile', label: 'Профиль' },
                      { id: 'about', label: 'О магазине' },
                      { id: 'contacts', label: 'Контакты' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id as any)}
                        className={`text-left font-medium transition-all hover:text-primary ${
                          activeSection === item.id ? 'text-primary' : 'text-gray-600'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-12 text-white">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-5xl font-bold mb-4 animate-slide-up">
                  Новая коллекция 2025
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Откройте для себя яркие тренды сезона с эксклюзивными скидками до 30%
                </p>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => setActiveSection('catalog')}
                >
                  Смотреть каталог
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 text-9xl opacity-20">
                🎁
              </div>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-6">🔥 Хиты продаж</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product, index) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 relative">
                      {product.discount && (
                        <Badge className="absolute top-4 right-4 bg-accent">
                          -{product.discount}%
                        </Badge>
                      )}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                      >
                        <Icon
                          name="Heart"
                          size={20}
                          className={
                            favorites.includes(product.id)
                              ? 'fill-red-500 text-red-500'
                              : 'text-gray-400'
                          }
                        />
                      </button>
                      <div className="text-7xl mb-4 text-center group-hover:scale-110 transition-transform">
                        {product.image}
                      </div>
                      <Badge variant="secondary" className="mb-2">
                        {product.category}
                      </Badge>
                      <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                      <div className="flex items-center gap-1 mb-3">
                        <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.discount ? (
                            <>
                              <p className="text-sm text-muted-foreground line-through">
                                {product.price.toLocaleString()} ₽
                              </p>
                              <p className="text-xl font-bold text-primary">
                                {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
                              </p>
                            </>
                          ) : (
                            <p className="text-xl font-bold text-primary">
                              {product.price.toLocaleString()} ₽
                            </p>
                          )}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => addToCart(product)}
                          className="bg-gradient-to-r from-primary to-secondary"
                        >
                          <Icon name="ShoppingCart" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">🚚</div>
                  <h4 className="font-bold text-lg mb-2">Быстрая доставка</h4>
                  <p className="text-sm text-muted-foreground">
                    Доставим ваш заказ за 1-3 дня по всей России
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-pink-100 to-pink-200 border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">💳</div>
                  <h4 className="font-bold text-lg mb-2">Безопасная оплата</h4>
                  <p className="text-sm text-muted-foreground">
                    Принимаем все виды карт и электронные кошельки
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-4">🎁</div>
                  <h4 className="font-bold text-lg mb-2">Программа лояльности</h4>
                  <p className="text-sm text-muted-foreground">
                    Накапливайте баллы и получайте скидки
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {categories.map(cat => (
                  <TabsTrigger key={cat} value={cat}>
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6 relative">
                    {product.discount && (
                      <Badge className="absolute top-4 right-4 bg-accent">
                        -{product.discount}%
                      </Badge>
                    )}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                    >
                      <Icon
                        name="Heart"
                        size={20}
                        className={
                          favorites.includes(product.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }
                      />
                    </button>
                    <div className="text-7xl mb-4 text-center group-hover:scale-110 transition-transform">
                      {product.image}
                    </div>
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                    <div className="flex items-center gap-1 mb-3">
                      <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.discount ? (
                          <>
                            <p className="text-sm text-muted-foreground line-through">
                              {product.price.toLocaleString()} ₽
                            </p>
                            <p className="text-xl font-bold text-primary">
                              {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} ₽
                            </p>
                          </>
                        ) : (
                          <p className="text-xl font-bold text-primary">
                            {product.price.toLocaleString()} ₽
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-primary to-secondary"
                      >
                        <Icon name="ShoppingCart" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                По вашему запросу ничего не найдено
              </div>
            )}
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Александр Петров</h2>
                    <p className="text-muted-foreground">alex.petrov@example.com</p>
                    <Badge className="mt-2 bg-gradient-to-r from-primary to-secondary">
                      VIP покупатель
                    </Badge>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-primary">47</p>
                      <p className="text-sm text-muted-foreground">Заказов</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-pink-50 border-pink-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-secondary">2,540</p>
                      <p className="text-sm text-muted-foreground">Баллов</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-accent">{favorites.length}</p>
                      <p className="text-sm text-muted-foreground">Избранное</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">История заказов</h3>
                <div className="space-y-4">
                  {[
                    { id: '#12834', date: '15.12.2024', status: 'Доставлен', amount: 18990 },
                    { id: '#12756', date: '02.12.2024', status: 'В пути', amount: 12490 },
                    { id: '#12643', date: '28.11.2024', status: 'Доставлен', amount: 8990 },
                  ].map(order => (
                    <Card key={order.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                order.status === 'Доставлен'
                                  ? 'bg-green-500'
                                  : 'bg-blue-500'
                              }
                            >
                              {order.status}
                            </Badge>
                            <p className="font-bold mt-1">{order.amount.toLocaleString()} ₽</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">О нашем магазине</h2>
                <div className="prose max-w-none">
                  <p className="text-lg mb-4">
                    TrendShop — это современный интернет-магазин, где вы найдете самые актуальные товары по доступным ценам. 
                    Мы работаем с 2020 года и уже обслужили более 50,000 довольных клиентов.
                  </p>
                  <p className="mb-4">
                    Наша миссия — делать покупки удобными, быстрыми и приятными. Мы тщательно отбираем каждый товар, 
                    чтобы вы получали только качественную продукцию от проверенных производителей.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-0">
                      <CardContent className="p-6">
                        <div className="text-4xl mb-3">✨</div>
                        <h4 className="font-bold text-lg mb-2">Качество</h4>
                        <p className="text-sm">Только оригинальные товары от официальных поставщиков</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-pink-50 to-orange-50 border-0">
                      <CardContent className="p-6">
                        <div className="text-4xl mb-3">🚀</div>
                        <h4 className="font-bold text-lg mb-2">Скорость</h4>
                        <p className="text-sm">Быстрая обработка заказов и доставка в кратчайшие сроки</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-orange-50 to-purple-50 border-0">
                      <CardContent className="p-6">
                        <div className="text-4xl mb-3">💰</div>
                        <h4 className="font-bold text-lg mb-2">Выгода</h4>
                        <p className="text-sm">Регулярные акции, скидки и программа лояльности</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-50 to-orange-50 border-0">
                      <CardContent className="p-6">
                        <div className="text-4xl mb-3">🤝</div>
                        <h4 className="font-bold text-lg mb-2">Поддержка</h4>
                        <p className="text-sm">Профессиональная служба поддержки 24/7</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6">Контакты</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                        📍
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Адрес</h4>
                        <p className="text-muted-foreground">
                          г. Москва, ул. Тверская, д. 1, офис 100
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                        📞
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Телефон</h4>
                        <p className="text-muted-foreground">
                          +7 (495) 123-45-67<br />
                          +7 (800) 555-35-35 (бесплатно)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                        📧
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Email</h4>
                        <p className="text-muted-foreground">
                          info@trendshop.ru<br />
                          support@trendshop.ru
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                        🕐
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Режим работы</h4>
                        <p className="text-muted-foreground">
                          Пн-Пт: 9:00 - 21:00<br />
                          Сб-Вс: 10:00 - 20:00
                        </p>
                      </div>
                    </div>
                  </div>
                  <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-0">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4">Напишите нам</h3>
                      <form className="space-y-4">
                        <Input placeholder="Ваше имя" />
                        <Input type="email" placeholder="Email" />
                        <Input placeholder="Тема сообщения" />
                        <textarea
                          className="w-full min-h-[120px] p-3 border rounded-lg resize-none"
                          placeholder="Ваше сообщение"
                        />
                        <Button className="w-full bg-gradient-to-r from-primary via-secondary to-accent">
                          Отправить
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center text-xl">
                🛍️
              </div>
              <span className="font-bold">TrendShop</span>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 TrendShop. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                VK
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Telegram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;