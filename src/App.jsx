import { useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IRR");
  const [convertedAmount, setConvertedAmount] = useState(596000);



  // calculator USD to IRR and IRR to USD
  const handleConvert = () => {
    let conversionRate = 1;
    if (fromCurrency === "USD" && toCurrency === "IRR") {
      conversionRate = 596000;
    } else if (fromCurrency === "IRR" && toCurrency === "USD") {
      conversionRate = 1 / 596000;
    }

    setConvertedAmount(amount * conversionRate);
  };


  // Convert between each other 
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (fromCurrency === "USD") {
      setAmount(596000);
      setConvertedAmount(1);
    }else{
      setAmount(1)
      setConvertedAmount(596000);
    }
    
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg">
        <div className="text-black font-bold mb-6">
          <h1 className="text-xl">Currency Converter</h1>
          <h3 className="text-xs text-gray-400">Convert between USD and IRR</h3>
        </div>
        <div className="flex flex-col items-center gap-2 *:w-full">
          <div className=" flex items-center justify-between gap-2 *:py-2 *:rounded-md">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onKeyDown={(e) => {e.key === "Enter" && handleConvert()}}
              onChange={(e) => {
                e.target.value > -1 ? setAmount(parseFloat(e.target.value)) : 0;
              }}
              className="bg-[#374151] outline-none text-white px-4 min-w-[60px] sm:w-[65%]"
            />
            <div className=" flex items-center justify-between gap-1 *:px-4 *:py-2 *:rounded-md">
              <span className="bg-[#374151] text-white hover:bg-[#4b5563]">
                {fromCurrency}
              </span>
              
              <button
              // shuffle button
                onClick={handleSwapCurrencies}
                className="bg-[#374151] text-white outline-none hover:bg-[#4b5563]"
              >
                <ShuffleIcon className="" />
              </button>
              <span className="bg-[#374151] text-white hover:bg-[#4b5563]">
                {toCurrency}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConvert}
            className="bg-[#6366f1] py-2 text-white hover:bg-[#4f46e5] rounded-md "
          >
            {/* convert button */}
            Convert
          </button>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <p
            className={`text-center text-2xl font-bold ${
              Number.isNaN(convertedAmount) ? "text-red-700" : "text-green-600"
            }`}
          >
            {Number.isNaN(convertedAmount)
              ? "Please enter the amount first"
              : convertedAmount.toLocaleString() + " " + toCurrency}
          </p>
        </div>
      </div>
    </div>
  );
}


// shuffle Icon
function ShuffleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
      <path d="m18 14 4 4-4 4" />
    </svg>
  );
}
