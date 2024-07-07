import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  const [date, Setdate] = useState();
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  //handleSubmit Method
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      setAmountInTargetCurrency(responce.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  //get all currencies
  useEffect(() => {
    const getTheCurrencies = async () => {
      try {
        const responce = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(responce.data);
      } catch (err) {
        console.error(err);
      }
    };
    getTheCurrencies();
  }, []);

  return (
    <div>
      <div className=" lg:mx-32 py-10">
      <h1 className=" lg:mx-32 text-6xl font-bold text-white text-center">
        Currency Converter Pro
      </h1>
      <p className="lg:mx 32 opacity-60 py-6">
        Currency Converter Pro is a comprehensive web application designed for
        seamless and accurate currency conversions. Ideal for travelers,
        business professionals, and online shoppers, this tool provides
        real-time exchange rates for over 150 currencies from around the world.
        With real-time exchange rates sourced from reliable financial
        institutions, users can stay updated with the latest information. The
        application offers access to historical exchange rate data, allowing
        users to analyze trends and make informed decisions. Its intuitive and
        clean interface ensures a smooth user experience for both beginners and
        experts. Users can effortlessly convert between multiple currencies,
        making it perfect for international transactions. Customizable alerts
        enable users to set up notifications for their preferred currency pairs,
        so they are notified when rates reach their desired level. Additionally,
        the offline mode allows access to recent exchange rates even without an
        internet connection, ensuring users are never left stranded. The
        built-in currency conversion calculator provides quick and precise
        results, and the dark mode feature offers a comfortable viewing
        experience in low-light environments. Whether you're planning a trip
        abroad, managing international investments, or simply curious about
        currency fluctuations, Currency Converter Pro is your go-to solution for
        all currency conversion needs. Experience the convenience and accuracy
        of Currency Converter Pro and make informed financial decisions with
        ease.
      </p>

      <div className=" mt-10 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => Setdate(e.target.value)}
                type="Date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Source Currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                name={sourceCurrency}
                id={sourceCurrency}
                value={sourceCurrency}
              >
                <option value="">Select Source Currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                name={targetCurrency}
                id={targetCurrency}
                value={targetCurrency}
              >
                <option value="">Select Target Currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor={amountInSourceCurrency}
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Amount In Source Currency
              </label>
              <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="number"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                placeholder="Enter Amount In Source Currency"
                required
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-red-600 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-md mt-5">
                Get the Target Currency
              </button>
            </div>
          </form>
        </section>
      </div>

      {!loading ? (
        <section className="text-xl flex justify-center mt-5">
          {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals
          to&nbsp;
          <span className="text-black font-bold">
            {amountInTargetCurrency}
          </span>
          &nbsp;in {currencyNames[targetCurrency]}
        </section>
      ) : null}
    </div>
    </div>
  );
}
