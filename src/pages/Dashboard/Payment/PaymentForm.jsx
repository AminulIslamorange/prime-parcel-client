import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth();
  const navigate=useNavigate();
  const { parcelId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) return "...Loading";

  const amount = parcelInfo?.data?.cost || 0;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMsg(error.message || "Payment failed. Try again.");
      setSuccessMsg("");
      return;
    }

    setSuccessMsg("Payment method created!");
    setErrorMsg("");
    console.log("[PaymentMethod]", paymentMethod);

    try {
      // Create payment intent on server
      const res = await axiosSecure.post("/payment-checkout-session", {
        amountInCents,
        parcelId,
      });

      const clientSecret = res.data.clientSecret;

      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card:elements.getElement(CardElement),
          billing_details: {
             name: user.displayName ,
             email:user.email,
            },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        setErrorMsg(result.error.message);
        setSuccessMsg("");
      } else if (result.paymentIntent?.status === "succeeded") {
        console.log("Payment succeeded!");
        setSuccessMsg("Payment succeeded!");
        setErrorMsg("");

        // Todo create a payment history
        const transactionId=result.paymentIntent.id
        const paymentData={
          amount,
                    currency,
                    customerEmail:user.email,
                    parcelId,
                    parcelName,
                    transactionId,
                    paymentStatus,
                    paidAt
        }
        const paymentRes=await axiosSecure.post('/create-checkout-session',paymentData)
        if(paymentRes.data.insertedId){
          console.log('payment successfull')
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
        <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>

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

        {errorMsg && <p className="text-red-600 text-sm mt-2 font-medium">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm mt-2 font-medium">{successMsg}</p>}

        <button
          type="submit"
          disabled={!stripe}
          className="btn w-full bg-[#CAEB66] hover:bg-[#B5D54B] text-black font-bold py-2 rounded-lg shadow-md disabled:bg-gray-400 mt-4"
        >
          Pay For Parcel ${amount}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
