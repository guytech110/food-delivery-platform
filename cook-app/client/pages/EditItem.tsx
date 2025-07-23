import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMenu } from "@/contexts/MenuContext";
import { useAuth } from "@/contexts/AuthContext";
import { MenuItem } from "@/contexts/MenuContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Timestamp } from "firebase/firestore";

const categories = [
  "Main Course",
  "Appetizer",
  "Dessert",
  "Beverage",
  "Salad",
  "Soup",
  "Side Dish",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack"
];

const allergens = [
  "Dairy",
  "Eggs",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Gluten",
  "None"
];

const EditItem: React.FC = () => {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();
  const { updateMenuItem, getMenuItemById, deleteMenuItem } = useMenu();
  const { cook } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    preparationTime: "",
    image: "",
    isAvailable: true,
    allergens: [] as string[]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load existing item data
  useEffect(() => {
    const loadItem = async () => {
      if (!itemId) return;
      
      setIsLoading(true);
      try {
        const item = await getMenuItemById(itemId);
        if (item) {
          setFormData({
            name: item.name,
            description: item.description,
            price: item.price.toString(),
            category: item.category,
            preparationTime: item.preparationTime?.toString() || "",
            image: item.image || "",
            isAvailable: item.isAvailable ?? true,
            allergens: item.allergens || []
          });
        }
      } catch (error) {
        console.error('Error loading item:', error);
        toast({
          title: "Error",
          description: "Failed to load menu item",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadItem();
  }, [itemId, getMenuItemById, toast]);

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAllergenToggle = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cook || !itemId) return;

    // Validation
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Item name is required",
        variant: "destructive"
      });
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast({
        title: "Error",
        description: "Valid price is required",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const updatedItem: Partial<MenuItem> = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : undefined,
        image: formData.image || undefined,
        isAvailable: formData.isAvailable,
        allergens: formData.allergens,
        updatedAt: Timestamp.now()
      };

      await updateMenuItem(itemId, updatedItem);
      
      toast({
        title: "Success",
        description: "Menu item updated successfully",
      });
      
      navigate("/menu");
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: "Error",
        description: "Failed to update menu item",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!itemId) return;
    
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    setIsSaving(true);
    try {
      await deleteMenuItem(itemId);
      toast({
        title: "Success",
        description: "Menu item deleted successfully",
      });
      navigate("/menu");
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete menu item",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu item...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-urbanist">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Edit Menu Item</h1>
        <button
          onClick={handleDelete}
          className="p-2 hover:bg-red-100 rounded-full text-red-600"
          disabled={isSaving}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Image Upload */}
        <div>
          <Label htmlFor="image">Item Image</Label>
          <div className="mt-2">
            {formData.image ? (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Click to upload image</p>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-green-600"
                >
                  Choose Image
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Item Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter item name"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your item"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <Label htmlFor="preparationTime">Prep Time (min)</Label>
              <Input
                id="preparationTime"
                type="number"
                min="0"
                value={formData.preparationTime}
                onChange={(e) => handleInputChange("preparationTime", e.target.value)}
                placeholder="30"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="available">Available for Order</Label>
            <Switch
              id="available"
              checked={formData.isAvailable}
              onCheckedChange={(checked) => handleInputChange("isAvailable", checked)}
            />
          </div>
        </div>

        {/* Allergens */}
        <div>
          <Label>Allergens</Label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {allergens.map((allergen) => (
              <label key={allergen} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.allergens.includes(allergen)}
                  onChange={() => handleAllergenToggle(allergen)}
                  className="rounded"
                />
                <span className="text-sm">{allergen}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isSaving}
          >
            {isSaving ? "Updating..." : "Update Menu Item"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditItem; 