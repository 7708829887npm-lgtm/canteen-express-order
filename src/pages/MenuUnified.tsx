import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { Loader2, ShoppingCart, Leaf, Drumstick, Egg } from "lucide-react";

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

const MenuUnified = () => {
  const [vegItems, setVegItems] = useState<MenuItem[]>([]);
  const [eggItems, setEggItems] = useState<MenuItem[]>([]);
  const [nonVegItems, setNonVegItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .order("name");

      if (error) throw error;

      const veg = data?.filter((item) => item.type === "veg") || [];
      const egg = data?.filter((item) => item.type === "egg") || [];
      const nonVeg = data?.filter((item) => item.type === "non-veg") || [];

      setVegItems(veg);
      setEggItems(egg);
      setNonVegItems(nonVeg);
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

  const renderMenuItems = (items: MenuItem[], itemType: "veg" | "egg" | "non-veg") => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">No items available at the moment</p>
        </div>
      );
    }

    const getIconConfig = () => {
      switch (itemType) {
        case "veg":
          return {
            icon: Leaf,
            color: "text-green-600",
            borderColor: "border-green-600",
            bgColor: "text-green-600"
          };
        case "egg":
          return {
            icon: Egg,
            color: "text-amber-600",
            borderColor: "border-amber-600",
            bgColor: "text-amber-600"
          };
        case "non-veg":
          return {
            icon: Drumstick,
            color: "text-orange-600",
            borderColor: "border-orange-600",
            bgColor: "text-orange-600"
          };
      }
    };

    const config = getIconConfig();
    const IconComponent = config.icon;

    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const finalPrice = item.is_special_offer
            ? getDiscountedPrice(item.price, item.discount_percentage)
            : item.price;

          return (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-[var(--shadow-card)] transition-shadow border-2 hover:border-primary/30"
            >
              <div className="relative h-48 bg-muted">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <IconComponent className={`h-16 w-16 ${config.bgColor}`} />
                  </div>
                )}
                {item.is_special_offer && (
                  <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground font-semibold">
                    {item.discount_percentage}% OFF
                  </Badge>
                )}
                <div className="absolute top-2 left-2">
                  <div className={`bg-white rounded-sm p-1 border-2 ${config.borderColor}`}>
                    <IconComponent className={`h-4 w-4 ${config.color}`} fill="currentColor" />
                  </div>
                </div>
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
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our delicious vegetarian and non-vegetarian offerings
          </p>
        </div>

        <Tabs defaultValue="veg" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 h-12">
              <TabsTrigger value="veg" className="text-base data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
                <Leaf className="h-5 w-5 mr-2" />
                Veg Menu
              </TabsTrigger>
              <TabsTrigger value="egg" className="text-base data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">
                <Egg className="h-5 w-5 mr-2" />
                Egg Menu
              </TabsTrigger>
              <TabsTrigger value="non-veg" className="text-base data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
                <Drumstick className="h-5 w-5 mr-2" />
                Non-Veg Menu
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="veg" className="mt-6">
            {renderMenuItems(vegItems, "veg")}
          </TabsContent>

          <TabsContent value="egg" className="mt-6">
            {renderMenuItems(eggItems, "egg")}
          </TabsContent>

          <TabsContent value="non-veg" className="mt-6">
            {renderMenuItems(nonVegItems, "non-veg")}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MenuUnified;
