import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PaymentForm = () => {
    const {parcelId}=useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset previous messages
    setErrorMsg("");
    setSuccessMsg("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMsg(error.message || "Payment failed. Try again.");
      setSuccessMsg("");
    } else {
      setSuccessMsg("Payment successful!");
      setErrorMsg("");
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>

        {/* Card Input Box */}
        <div className="p-4 rounded-lg border border-gray-300 bg-gray-50 focus-within:border-blue-500 transition">
          <CardElement
            className="p-2"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#a0a0a0" },
                },
                invalid: { color: "#e11d48" },
              },
            }}
          />
        </div>

        {/* Error Message */}
        {errorMsg && (
          <p className="text-red-600 text-sm mt-2 font-medium">{errorMsg}</p>
        )}

        {/* Success Message */}
        {successMsg && (
          <p className="text-green-600 text-sm mt-2 font-medium">{successMsg}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={!stripe}
          className="btn w-full bg-[#CAEB66] hover:bg-[#B5D54B] text-black font-bold py-2 rounded-lg shadow-md disabled:bg-gray-400 mt-4"
        >
          Pay For Parcel
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
