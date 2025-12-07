import { useState } from 'react';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, bonusPoints } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'FIRST10') {
      setDiscount(0.1);
    }
  };

  const finalPrice = totalPrice * (1 - discount);
  const deliveryFee = finalPrice > 5000 ? 0 : 300;
  const totalWithDelivery = finalPrice + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Icon name="ShoppingCart" className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Добавьте товары из каталога
          </p>
          <Button size="lg" asChild>
            <Link to="/catalog">
              <Icon name="ShoppingBag" className="mr-2 h-5 w-5" />
              Перейти в каталог
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Корзина</h1>
        
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="text-xl font-bold text-primary">
                          {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Icon name="Trash2" className="h-5 w-5 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button variant="outline" onClick={clearCart}>
              <Icon name="Trash2" className="mr-2 h-4 w-4" />
              Очистить корзину
            </Button>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Итого</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Товары:</span>
                    <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Скидка по промокоду:</span>
                      <span>-{(totalPrice * discount).toLocaleString('ru-RU')} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка:</span>
                    <span>{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Бесплатная доставка от 5000 ₽
                    </p>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>Всего:</span>
                  <span className="text-primary">
                    {totalWithDelivery.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                <div className="bg-accent/10 border-2 border-accent/30 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="Gift" className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-sm">Бонусная программа</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    С этой покупки вы получите <Badge variant="secondary">{bonusPoints} бонусов</Badge>
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Промокод</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Введите промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={handleApplyPromo} variant="outline">
                      Применить
                    </Button>
                  </div>
                  {discount === 0 && (
                    <p className="text-xs text-muted-foreground">
                      Попробуйте: FIRST10 для скидки 10%
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">
                  <Icon name="CreditCard" className="mr-2 h-5 w-5" />
                  Оформить заказ
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
