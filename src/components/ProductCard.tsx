import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
        />
        {product.discount && (
          <Badge className="absolute right-2 top-2 bg-destructive">
            -{product.discount}%
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary">Нет в наличии</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2">
          {product.category}
        </Badge>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-1 mb-3">
          <Icon name="Star" className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice.toLocaleString('ru-RU')} ₽
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
