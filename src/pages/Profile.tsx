import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Profile = () => {
  const [user] = useState({
    name: 'Анна Смирнова',
    email: 'anna@example.com',
    phone: '+7 (900) 123-45-67',
    bonusPoints: 1250,
    orders: 12,
  });

  const orderHistory = [
    { id: 1, date: '25.11.2024', total: 8990, status: 'Доставлен', items: 2 },
    { id: 2, date: '10.11.2024', total: 15990, status: 'Доставлен', items: 1 },
    { id: 3, date: '02.11.2024', total: 4990, status: 'Доставлен', items: 3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Личный кабинет</h1>
        
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                  <Icon name="User" className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-accent/10 border-2 border-accent/30 p-4 text-center">
                  <Icon name="Gift" className="mx-auto mb-2 h-8 w-8 text-accent" />
                  <p className="text-sm text-muted-foreground mb-1">Бонусные баллы</p>
                  <p className="text-3xl font-bold text-accent">{user.bonusPoints}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-lg border p-3">
                    <Icon name="ShoppingBag" className="mx-auto mb-2 h-6 w-6 text-primary" />
                    <p className="text-2xl font-bold">{user.orders}</p>
                    <p className="text-xs text-muted-foreground">Заказов</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <Icon name="Star" className="mx-auto mb-2 h-6 w-6 text-secondary" />
                    <p className="text-2xl font-bold">4.9</p>
                    <p className="text-xs text-muted-foreground">Отзывы</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">
                  <Icon name="User" className="mr-2 h-4 w-4" />
                  Личные данные
                </TabsTrigger>
                <TabsTrigger value="orders">
                  <Icon name="Package" className="mr-2 h-4 w-4" />
                  Заказы
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Редактировать профиль</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" defaultValue={user.phone} />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Адрес доставки</Label>
                      <Input id="address" placeholder="Введите адрес" />
                    </div>
                    
                    <Button className="w-full">
                      <Icon name="Save" className="mr-2 h-4 w-4" />
                      Сохранить изменения
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>История заказов</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-lg">Заказ #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <Badge variant="secondary">{order.status}</Badge>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Package" className="h-4 w-4" />
                              {order.items} товара
                            </span>
                          </div>
                          <p className="text-xl font-bold text-primary">
                            {order.total.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {orderHistory.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        У вас пока нет заказов
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
