import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { ChevronRight, Clock, Star, Utensils, Leaf, Drumstick, Package } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";
import vegImage from "@/assets/veg-special.jpg";
import nonVegImage from "@/assets/nonveg-special.jpg";
import comboImage from "@/assets/combo-special.jpg";

const Index = () => {
  const features = [
    {
      icon: Clock,
      title: "Fast Service",
      description: "Quick preparation with real-time tracking",
    },
    {
      icon: Star,
      title: "Quality Food",
      description: "Fresh ingredients, delicious taste",
    },
    {
      icon: Utensils,
      title: "Wide Variety",
      description: "Veg, non-veg, and combo options",
    },
  ];

  const menuCategories = [
    {
      title: "Vegetarian Delights",
      image: vegImage,
      link: "/menu/veg",
      icon: Leaf,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Non-Veg Specials",
      image: nonVegImage,
      link: "/menu/non-veg",
      icon: Drumstick,
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Combo Meals",
      image: comboImage,
      link: "/combos",
      icon: Package,
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Delicious Food,{" "}
                <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                  Delivered Fast
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Experience the perfect blend of taste and convenience at our canteen. Fresh ingredients, quick service, and amazing flavors!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu/veg">
                  <Button variant="hero" size="lg">
                    Order Now <ChevronRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/offers">
                  <Button variant="outline" size="lg">
                    View Offers
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <img
                src={heroImage}
                alt="Delicious food spread"
                className="relative rounded-3xl shadow-[var(--shadow-card)] w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-[var(--shadow-card)]">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Menu</h2>
            <p className="text-muted-foreground text-lg">Choose from our delicious categories</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {menuCategories.map((category, index) => (
              <Link to={category.link} key={index} className="group">
                <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-[var(--shadow-card)] transform hover:scale-[1.02]">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-50 transition-opacity`}></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white">
                        <category.icon className="h-6 w-6" />
                        <h3 className="font-bold text-xl">{category.title}</h3>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                      Browse Menu <ChevronRight className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary-hover text-primary-foreground border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50"></div>
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">🎉 Special Offers Available!</h2>
                <p className="text-lg mb-6 opacity-90">Check out our latest deals and combo offers. Limited time only!</p>
                <Link to="/offers">
                  <Button variant="accent" size="lg">
                    View All Offers <ChevronRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Tasty Canteen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;