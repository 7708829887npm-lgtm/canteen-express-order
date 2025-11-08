import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { Loader2, ShoppingCart, Leaf, Drumstick } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  is_special_offer: boolean;
  discount_percentage: number;
  type: string;
}

const Menu = () => {
  const { type } = useParams<{ type: "veg" | "non-veg" }>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenuItems();
  }, [type]);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("type", type)
        .eq("is_available", true)
        .order("name");

      if (error) throw error;
      setMenuItems(data || []);
    } catch (error: any) {
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    const finalPrice = item.is_special_offer
      ? item.price * (1 - item.discount_percentage / 100)
      : item.price;

    addToCart({
      id: item.id,
      name: item.name,
      price: finalPrice,
      image_url: item.image_url || undefined,
    });
    toast.success(`${item.name} added to cart!`);
  };

  const getDiscountedPrice = (price: number, discount: number) => {
    return price * (1 - discount / 100);
  };

  const isVeg = type === "veg";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {isVeg ? (
              <Leaf className="h-8 w-8 text-green-600" />
            ) : (
              <Drumstick className="h-8 w-8 text-orange-600" />
            )}
            <h1 className="text-3xl md:text-4xl font-bold">
              {isVeg ? "Vegetarian" : "Non-Vegetarian"} Menu
            </h1>
          </div>
          <p className="text-muted-foreground">
            Discover our delicious {isVeg ? "vegetarian" : "non-vegetarian"} offerings
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No items available at the moment</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => {
              const finalPrice = item.is_special_offer
                ? getDiscountedPrice(item.price, item.discount_percentage)
                : item.price;

              return (
                <Card key={item.id} className="overflow-hidden hover:shadow-[var(--shadow-card)] transition-shadow border-2 hover:border-primary/30">
                  <div className="relative h-48 bg-muted">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {isVeg ? (
                          <Leaf className="h-16 w-16 text-green-600" />
                        ) : (
                          <Drumstick className="h-16 w-16 text-orange-600" />
                        )}
                      </div>
                    )}
                    {item.is_special_offer && (
                      <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground font-semibold">
                        {item.discount_percentage}% OFF
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        {item.is_special_offer ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">
                              ₹{finalPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xl font-bold">₹{item.price.toFixed(2)}</span>
                        )}
                      </div>
                      <Button onClick={() => handleAddToCart(item)} size="sm">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;