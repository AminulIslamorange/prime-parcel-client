import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { parcelId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch parcel info
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) return "...Loading";

  const parcel = parcelInfo.data;
  const amount = parcel?.cost || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      // 1️⃣ Create PaymentIntent on backend
      const res = await axiosSecure.post("/create-payment-intent", {
        amount,
        parcelId,
        parcelName: parcel?.parcelName,
        senderEmail: user.email,
      });

      const clientSecret = res.data.clientSecret;

      // 2️⃣ Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setErrorMsg(result.error.message || "Payment failed");
        setSuccessMsg("");
        console.error(result.error);
      } else if (result.paymentIntent?.status === "succeeded") {
        setSuccessMsg("Payment succeeded!");
        setErrorMsg("");
        console.log("Payment succeeded!", result.paymentIntent);

        // 3️⃣ Save payment info to DB
        const paymentData = {
          amount,
          currency: "usd",
          customerEmail: user.email,
          parcelId,
          parcelName: parcel?.parcelName,
          transactionId: result.paymentIntent.id,
          paymentStatus: result.paymentIntent.status,
          paidAt: new Date(),
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);
        if (paymentRes.data.insertedId) {
          console.log("Payment successfully saved in DB");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Payment failed");
      setSuccessMsg("");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Pay for Parcel: ${amount}
        </h2>

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

        {errorMsg && (
          <p className="text-red-600 text-sm mt-2 font-medium">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-sm mt-2 font-medium">{successMsg}</p>
        )}

        <button
          type="submit"
          disabled={!stripe}
          className="btn w-full bg-[#CAEB66] hover:bg-[#B5D54B] text-black font-bold py-2 rounded-lg shadow-md disabled:bg-gray-400 mt-4"
        >
          Pay ${amount}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
