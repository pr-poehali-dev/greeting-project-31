import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const location = useLocation();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Icon name="ShoppingBag" className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TrendShop
            </span>
          </Link>

          {location.pathname === '/catalog' && onSearch && (
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>
          )}

          <nav className="hidden md:flex items-center space-x-1">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/">
                <Icon name="Home" className="mr-2 h-4 w-4" />
                Главная
              </Link>
            </Button>
            <Button
              variant={isActive('/catalog') ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/catalog">
                <Icon name="Grid3x3" className="mr-2 h-4 w-4" />
                Каталог
              </Link>
            </Button>
            <Button
              variant={isActive('/about') ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/about">
                <Icon name="Info" className="mr-2 h-4 w-4" />
                О магазине
              </Link>
            </Button>
            <Button
              variant={isActive('/contacts') ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/contacts">
                <Icon name="Mail" className="mr-2 h-4 w-4" />
                Контакты
              </Link>
            </Button>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile">
                <Icon name="User" className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <Icon name="ShoppingCart" className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {location.pathname === '/catalog' && onSearch && (
          <form onSubmit={handleSearch} className="md:hidden pb-4">
            <div className="relative w-full">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
