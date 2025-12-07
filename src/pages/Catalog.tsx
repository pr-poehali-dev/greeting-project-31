import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Все', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Каталог товаров</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Найдено товаров: {filteredProducts.length}
          </p>
          
          <Card className="p-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              По вашему запросу ничего не найдено
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
