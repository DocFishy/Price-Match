import { useState, useMemo } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import { ScrollArea } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";
import { ProductRow } from "./components/ProductRow";
import { CalculationResults } from "./components/CalculationResults";
import { FormulaExplanation } from "./components/FormulaExplanation";
import { Calculator, RotateCcw } from "lucide-react";

interface Product {
  name: string;
  price: string;
  isRefunded: boolean;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>(
    Array.from({ length: 48 }, () => ({ name: "", price: "", isRefunded: false }))
  );
  const [kitPrice, setKitPrice] = useState<string>("");

  const calculations = useMemo(() => {
    const sumOfProducts = products.reduce((sum, product) => {
      const price = parseFloat(product.price) || 0;
      return sum + price;
    }, 0);

    const refundedProductsTotal = products.reduce((sum, product) => {
      if (product.isRefunded) {
        const price = parseFloat(product.price) || 0;
        return sum + price;
      }
      return sum;
    }, 0);

    const nonReturnedItemsTotal = sumOfProducts - refundedProductsTotal;
    const kitPriceNum = parseFloat(kitPrice) || 0;

    let finalRefundAmount = 0;
    if (kitPriceNum > 0 && sumOfProducts > 0) {
      finalRefundAmount = kitPriceNum - (kitPriceNum * (nonReturnedItemsTotal / sumOfProducts));
    }

    return {
      sumOfProducts,
      refundedProductsTotal,
      finalRefundAmount: Math.max(0, finalRefundAmount)
    };
  }, [products, kitPrice]);

  const handleProductNameChange = (index: number, value: string) => {
    const newProducts = [...products];
    newProducts[index].name = value;
    setProducts(newProducts);
  };

  const handleProductPriceChange = (index: number, value: string) => {
    const newProducts = [...products];
    newProducts[index].price = value;
    setProducts(newProducts);
  };

  const handleRefundChange = (index: number, checked: boolean) => {
    const newProducts = [...products];
    newProducts[index].isRefunded = checked;
    setProducts(newProducts);
  };

  const handleReset = () => {
    setProducts(Array.from({ length: 48 }, () => ({ name: "", price: "", isRefunded: false })));
    setKitPrice("");
  };

  const handleCalculate = () => {
    // Auto-calculation is already happening via useMemo, but we could add validation here
    console.log("Calculation results:", calculations);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Calculator className="h-8 w-8 text-blue-600" />
              <h1 className="text-primary">Price Match - Detroit Axle</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              created by Hamzeh Al Akkari
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-5rem)]">
          {/* Left Column - Products Table */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200 h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 flex-shrink-0">
                <h2 className="text-primary">Product Information</h2>
                <p className="text-muted-foreground text-sm">
                  Enter product details and mark items to be refunded
                </p>
              </div>

              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 items-center py-2 px-4 bg-gray-50 border-b border-gray-200 flex-shrink-0">
                <div className="col-span-1 text-sm text-muted-foreground">#</div>
                <div className="col-span-6 text-sm text-muted-foreground">Product Name / Number</div>
                <div className="col-span-3 text-sm text-muted-foreground">Price ($)</div>
                <div className="col-span-2 text-sm text-muted-foreground text-center">Refund</div>
              </div>

              <ScrollArea className="flex-1">
                {products.map((product, index) => (
                  <ProductRow
                    key={index}
                    index={index}
                    productName={product.name}
                    productPrice={product.price}
                    isRefunded={product.isRefunded}
                    onProductNameChange={handleProductNameChange}
                    onProductPriceChange={handleProductPriceChange}
                    onRefundChange={handleRefundChange}
                  />
                ))}
              </ScrollArea>
            </Card>
          </div>

          {/* Right Column - Controls and Results */}
          <div className="flex flex-col gap-4">
            {/* Kit Price Section */}
            <Card className="bg-white/90 backdrop-blur-sm p-4 border-gray-200">
              <h3 className="mb-3 text-primary">Total Kit Price</h3>
              <Input
                type="number"
                value={kitPrice}
                onChange={(e) => setKitPrice(e.target.value)}
                placeholder="Enter total kit price"
                step="0.01"
                min="0"
                className="bg-white/80 border-gray-200"
              />
            </Card>

            {/* Calculation Results */}
            <CalculationResults
              sumOfProducts={calculations.sumOfProducts}
              refundedProductsTotal={calculations.refundedProductsTotal}
              finalRefundAmount={calculations.finalRefundAmount}
            />

            {/* Formula Explanation */}
            <FormulaExplanation />

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleCalculate}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Refund
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}