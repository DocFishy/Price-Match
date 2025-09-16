import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

interface ProductRowProps {
  index: number;
  productName: string;
  productPrice: string;
  isRefunded: boolean;
  onProductNameChange: (index: number, value: string) => void;
  onProductPriceChange: (index: number, value: string) => void;
  onRefundChange: (index: number, checked: boolean) => void;
}

export function ProductRow({
  index,
  productName,
  productPrice,
  isRefunded,
  onProductNameChange,
  onProductPriceChange,
  onRefundChange
}: ProductRowProps) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center py-1 px-4 border-b border-gray-100">
      <div className="col-span-1 text-muted-foreground">
        {index + 1}
      </div>
      <div className="col-span-6">
        <Input
          value={productName}
          onChange={(e) => onProductNameChange(index, e.target.value)}
          placeholder="Product name or number"
          className="bg-white/80 border-gray-200"
        />
      </div>
      <div className="col-span-3">
        <Input
          type="number"
          value={productPrice}
          onChange={(e) => onProductPriceChange(index, e.target.value)}
          placeholder="0.00"
          step="0.01"
          min="0"
          className="bg-white/80 border-gray-200"
        />
      </div>
      <div className="col-span-2 flex justify-center">
        <Checkbox
          checked={isRefunded}
          onCheckedChange={(checked) => onRefundChange(index, checked as boolean)}
        />
      </div>
    </div>
  );
}