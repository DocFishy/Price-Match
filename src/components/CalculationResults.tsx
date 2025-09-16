import { Card } from "./ui/card";

interface CalculationResultsProps {
  sumOfProducts: number;
  refundedProductsTotal: number;
  finalRefundAmount: number;
}

export function CalculationResults({
  sumOfProducts,
  refundedProductsTotal,
  finalRefundAmount
}: CalculationResultsProps) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm p-4 border-gray-200">
      <h3 className="mb-3 text-primary">Calculation Results</h3>
      <div className="space-y-3">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Sum of Products</p>
          <p className="text-primary">${sumOfProducts.toFixed(2)}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Refunded Products Total</p>
          <p className="text-primary">${refundedProductsTotal.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-3 rounded-lg border-2 border-blue-300">
          <p className="text-xs text-muted-foreground mb-1">Final Refund Amount</p>
          <p className="text-lg text-primary">${finalRefundAmount.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
}