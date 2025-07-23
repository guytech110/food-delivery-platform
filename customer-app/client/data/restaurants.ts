// Mock restaurant and food data for the food delivery app

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  preparationTime: number; // in minutes
  allergens: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  calories?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  cuisine: string;
  deliveryTime: number; // in minutes
  deliveryFee: number;
  minimumOrder: number;
  distance: number; // in km
  isOpen: boolean;
  menu: MenuItem[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Mama's Kitchen",
    description: "Homemade comfort food with love",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/49623f1e6e4b4cd94f32bc88028a28c92a1cbe1b?width=614",
    rating: 4.8,
    reviewCount: 127,
    cuisine: "American",
    deliveryTime: 25,
    deliveryFee: 2.99,
    minimumOrder: 15,
    distance: 0.8,
    isOpen: true,
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: "123 Main St, Los Angeles, CA"
    },
    menu: [
      {
        id: "1-1",
        name: "Cantina Crispy Chicken",
        description: "Crispy fried chicken with special seasoning",
        price: 15.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/49623f1e6e4b4cd94f32bc88028a28c92a1cbe1b?width=614",
        category: "Chicken",
        rating: 4.9,
        preparationTime: 15,
        allergens: ["gluten", "eggs"],
        calories: 450
      },
      {
        id: "1-2",
        name: "Classic Burger",
        description: "Juicy beef burger with fresh vegetables",
        price: 12.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/52a6bf52b7928426c02ec07ac01e4959b09668d7?width=112",
        category: "Burger",
        rating: 4.7,
        preparationTime: 12,
        allergens: ["gluten", "dairy"],
        calories: 380
      },
      {
        id: "1-3",
        name: "Caesar Salad",
        description: "Fresh romaine lettuce with caesar dressing",
        price: 9.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3479807bda6dd1d7bb495d4fd4fb3d148a1d23a5?width=112",
        category: "Salad",
        rating: 4.5,
        preparationTime: 8,
        allergens: ["dairy"],
        isVegetarian: true,
        calories: 220
      },
      {
        id: "1-4",
        name: "Mac & Cheese",
        description: "Creamy macaroni and cheese with breadcrumbs",
        price: 11.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/49623f1e6e4b4cd94f32bc88028a28c92a1cbe1b?width=614",
        category: "Pasta",
        rating: 4.6,
        preparationTime: 10,
        allergens: ["gluten", "dairy"],
        calories: 420
      }
    ]
  },
  {
    id: "2",
    name: "Asian Fusion Delights",
    description: "Modern Asian cuisine with a twist",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5dae5aa598c8d7ecedcb4c7e7e08493294e42a5e?width=580",
    rating: 4.6,
    reviewCount: 89,
    cuisine: "Asian",
    deliveryTime: 30,
    deliveryFee: 3.99,
    minimumOrder: 20,
    distance: 1.2,
    isOpen: true,
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: "456 Oak Ave, Los Angeles, CA"
    },
    menu: [
      {
        id: "2-1",
        name: "Flavorful Fried Rice Fiesta",
        description: "Stir-fried rice with vegetables and choice of protein",
        price: 13.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5dae5aa598c8d7ecedcb4c7e7e08493294e42a5e?width=580",
        category: "Rice",
        rating: 4.8,
        preparationTime: 18,
        allergens: ["soy"],
        calories: 320
      },
      {
        id: "2-2",
        name: "Spicy Noodle Bowl",
        description: "Hand-pulled noodles with spicy sauce",
        price: 14.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6599a2098eaf5c8bd610484acd5af3c2ac37df4e?width=112",
        category: "Noodles",
        rating: 4.6,
        preparationTime: 20,
        allergens: ["gluten", "soy"],
        calories: 410
      },
      {
        id: "2-3",
        name: "Dumpling Delight",
        description: "Steamed dumplings with dipping sauce",
        price: 16.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5dae5aa598c8d7ecedcb4c7e7e08493294e42a5e?width=580",
        category: "Dumplings",
        rating: 4.7,
        preparationTime: 15,
        allergens: ["gluten", "soy"],
        calories: 280
      },
      {
        id: "2-4",
        name: "Teriyaki Chicken",
        description: "Grilled chicken with teriyaki glaze",
        price: 18.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6599a2098eaf5c8bd610484acd5af3c2ac37df4e?width=112",
        category: "Chicken",
        rating: 4.5,
        preparationTime: 22,
        allergens: ["soy"],
        calories: 380
      }
    ]
  },
  {
    id: "3",
    name: "Sweet Treats Bakery",
    description: "Fresh baked goods and desserts",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0ea02586ff6c480b64e7d643ec0c0ad69ce43367?width=112",
    rating: 4.9,
    reviewCount: 156,
    cuisine: "Bakery",
    deliveryTime: 20,
    deliveryFee: 1.99,
    minimumOrder: 10,
    distance: 0.5,
    isOpen: true,
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: "789 Sweet St, Los Angeles, CA"
    },
    menu: [
      {
        id: "3-1",
        name: "Chocolate Donuts",
        description: "Freshly baked chocolate glazed donuts",
        price: 8.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0ea02586ff6c480b64e7d643ec0c0ad69ce43367?width=112",
        category: "Donuts",
        rating: 4.9,
        preparationTime: 5,
        allergens: ["gluten", "dairy", "eggs"],
        calories: 280
      },
      {
        id: "3-2",
        name: "Apple Pie",
        description: "Homemade apple pie with cinnamon",
        price: 11.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1dcd493c7415a63855015acaa2d7e1d9ba680e68?width=112",
        category: "Pie",
        rating: 4.8,
        preparationTime: 10,
        allergens: ["gluten", "dairy"],
        calories: 350
      },
      {
        id: "3-3",
        name: "Croissant",
        description: "Buttery French croissant",
        price: 6.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0ea02586ff6c480b64e7d643ec0c0ad69ce43367?width=112",
        category: "Pastry",
        rating: 4.7,
        preparationTime: 3,
        allergens: ["gluten", "dairy"],
        calories: 240
      },
      {
        id: "3-4",
        name: "Chocolate Cake",
        description: "Rich chocolate layer cake",
        price: 14.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/1dcd493c7415a63855015acaa2d7e1d9ba680e68?width=112",
        category: "Cake",
        rating: 4.9,
        preparationTime: 8,
        allergens: ["gluten", "dairy", "eggs"],
        calories: 420
      }
    ]
  },
  {
    id: "4",
    name: "Grill Master Steaks",
    description: "Premium steaks and grilled specialties",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4bef8741bea07f5a0a435ed9fd112883f9f1088d?width=112",
    rating: 4.7,
    reviewCount: 203,
    cuisine: "Steakhouse",
    deliveryTime: 35,
    deliveryFee: 4.99,
    minimumOrder: 25,
    distance: 1.5,
    isOpen: true,
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: "321 Grill Blvd, Los Angeles, CA"
    },
    menu: [
      {
        id: "4-1",
        name: "Ribeye Steak",
        description: "Premium ribeye steak with garlic butter",
        price: 28.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4bef8741bea07f5a0a435ed9fd112883f9f1088d?width=112",
        category: "Steak",
        rating: 4.9,
        preparationTime: 25,
        allergens: [],
        calories: 650
      },
      {
        id: "4-2",
        name: "Grilled Chicken Wrap",
        description: "Grilled chicken with fresh vegetables in tortilla",
        price: 16.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0b844de8367136ad921c114e4e620c92ab52291e?width=112",
        category: "Wraps",
        rating: 4.6,
        preparationTime: 15,
        allergens: ["gluten"],
        calories: 420
      },
      {
        id: "4-3",
        name: "Filet Mignon",
        description: "Tender filet mignon with red wine sauce",
        price: 34.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4bef8741bea07f5a0a435ed9fd112883f9f1088d?width=112",
        category: "Steak",
        rating: 4.8,
        preparationTime: 30,
        allergens: [],
        calories: 580
      },
      {
        id: "4-4",
        name: "BBQ Ribs",
        description: "Fall-off-the-bone BBQ ribs",
        price: 22.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0b844de8367136ad921c114e4e620c92ab52291e?width=112",
        category: "Ribs",
        rating: 4.7,
        preparationTime: 28,
        allergens: [],
        calories: 520
      }
    ]
  },
  {
    id: "5",
    name: "Pizza Palace",
    description: "Authentic Italian pizzas and pasta",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/49623f1e6e4b4cd94f32bc88028a28c92a1cbe1b?width=614",
    rating: 4.5,
    reviewCount: 178,
    cuisine: "Italian",
    deliveryTime: 28,
    deliveryFee: 2.49,
    minimumOrder: 18,
    distance: 0.9,
    isOpen: true,
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: "555 Pizza Way, Los Angeles, CA"
    },
    menu: [
      {
        id: "5-1",
        name: "Margherita Pizza",
        description: "Classic tomato sauce with mozzarella",
        price: 16.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/49623f1e6e4b4cd94f32bc88028a28c92a1cbe1b?width=614",
        category: "Pizza",
        rating: 4.6,
        preparationTime: 20,
        allergens: ["gluten", "dairy"],
        calories: 380
      },
      {
        id: "5-2",
        name: "Pepperoni Pizza",
        description: "Spicy pepperoni with melted cheese",
        price: 18.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/52a6bf52b7928426c02ec07ac01e4959b09668d7?width=112",
        category: "Pizza",
        rating: 4.7,
        preparationTime: 22,
        allergens: ["gluten", "dairy"],
        calories: 420
      },
      {
        id: "5-3",
        name: "Spaghetti Carbonara",
        description: "Creamy pasta with bacon and eggs",
        price: 14.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3479807bda6dd1d7bb495d4fd4fb3d148a1d23a5?width=112",
        category: "Pasta",
        rating: 4.5,
        preparationTime: 18,
        allergens: ["gluten", "dairy", "eggs"],
        calories: 450
      },
      {
        id: "5-4",
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter",
        price: 5.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/49623f1e6e4b4cd94f32bc88028a28c92a1cbe1b?width=614",
        category: "Bread",
        rating: 4.4,
        preparationTime: 8,
        allergens: ["gluten", "dairy"],
        calories: 180
      }
    ]
  },
  {
    id: "6",
    name: "Taco Town",
    description: "Fresh Mexican street food",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5dae5aa598c8d7ecedcb4c7e7e08493294e42a5e?width=580",
    rating: 4.4,
    reviewCount: 92,
    cuisine: "Mexican",
    deliveryTime: 22,
    deliveryFee: 1.99,
    minimumOrder: 12,
    distance: 0.7,
    isOpen: true,
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: "777 Taco Lane, Los Angeles, CA"
    },
    menu: [
      {
        id: "6-1",
        name: "Street Tacos",
        description: "Three authentic street tacos with salsa",
        price: 12.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5dae5aa598c8d7ecedcb4c7e7e08493294e42a5e?width=580",
        category: "Tacos",
        rating: 4.5,
        preparationTime: 12,
        allergens: ["gluten"],
        calories: 320
      },
      {
        id: "6-2",
        name: "Burrito Bowl",
        description: "Rice, beans, meat, and fresh toppings",
        price: 13.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6599a2098eaf5c8bd610484acd5af3c2ac37df4e?width=112",
        category: "Bowl",
        rating: 4.3,
        preparationTime: 15,
        allergens: ["dairy"],
        calories: 480
      },
      {
        id: "6-3",
        name: "Quesadilla",
        description: "Cheese quesadilla with guacamole",
        price: 10.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5dae5aa598c8d7ecedcb4c7e7e08493294e42a5e?width=580",
        category: "Quesadilla",
        rating: 4.4,
        preparationTime: 10,
        allergens: ["gluten", "dairy"],
        calories: 380
      },
      {
        id: "6-4",
        name: "Churros",
        description: "Cinnamon sugar churros with chocolate sauce",
        price: 7.99,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6599a2098eaf5c8bd610484acd5af3c2ac37df4e?width=112",
        category: "Dessert",
        rating: 4.6,
        preparationTime: 8,
        allergens: ["gluten", "dairy"],
        calories: 280
      }
    ]
  }
];

export const categories = [
  { id: "burger", name: "Burger", icon: "🍔" },
  { id: "donuts", name: "Donuts", icon: "🍩" },
  { id: "steak", name: "Steak", icon: "🥩" },
  { id: "wraps", name: "Wraps", icon: "🌯" },
  { id: "noodles", name: "Noodles", icon: "🍜" },
  { id: "pie", name: "Pie", icon: "🥧" },
  { id: "salad", name: "Salad", icon: "🥗" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "tacos", name: "Tacos", icon: "🌮" },
  { id: "pasta", name: "Pasta", icon: "🍝" },
  { id: "chicken", name: "Chicken", icon: "🍗" },
  { id: "rice", name: "Rice", icon: "🍚" },
  { id: "cake", name: "Cake", icon: "🍰" },
  { id: "bread", name: "Bread", icon: "🥖" },
  { id: "bowl", name: "Bowl", icon: "🥣" },
  { id: "more", name: "More", icon: "➕" }
];

// Helper functions
export const getRestaurantsByCategory = (category: string): Restaurant[] => {
  return restaurants.filter(restaurant => 
    restaurant.menu.some(item => item.category.toLowerCase() === category.toLowerCase())
  );
};

export const searchRestaurants = (query: string): Restaurant[] => {
  const lowercaseQuery = query.toLowerCase();
  return restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(lowercaseQuery) ||
    restaurant.cuisine.toLowerCase().includes(lowercaseQuery) ||
    restaurant.menu.some(item => 
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery)
    )
  );
};

export const getRecommendedItems = (): (MenuItem & { restaurantId: string; restaurantName: string })[] => {
  // Return items with high ratings and restaurant info
  const allItems = restaurants.flatMap(restaurant => 
    restaurant.menu.map(item => ({
      ...item,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name
    }))
  );
  return allItems
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);
}; 