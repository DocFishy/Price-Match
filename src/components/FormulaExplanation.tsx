import { Card } from "./ui/card";
import { Alert } from "./ui/alert";
import { Info } from "lucide-react";

export function FormulaExplanation() {
  return (
    <Card className="bg-white/90 backdrop-blur-sm p-4 border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-4 w-4 text-blue-600" />
        <h3 className="text-primary">Formula</h3>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg mb-3 border border-blue-200">
        <code className="text-xs text-gray-800">
          Refund = Total - (Total × (Non-Returned ÷ Kit Price))
        </code>
      </div>
      
      <Alert className="border-blue-200 bg-blue-50 p-3">
        <Info className="h-3 w-3" />
        <div>
          <p className="text-xs text-gray-700">
            Ensures proportional refunds based on kit's total price.
          </p>
        </div>
      </Alert>
    </Card>
  );
}