import location from '../../../../assets/location-merchant.png'

const BeMarcent = () => {
    return (
        <div data-aos="zoom-in-up" className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] rounded-4xl p-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={location}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <button
                        className="text-black px-6 py-2 font-semibold"
                        style={{
                            borderRadius: "99px",
                            backgroundColor: "#CAEB66",
                        }}
                    >
                        Become A Merchant
                    </button>
                    <button
                        className="text-[#CAEB66] font-semibold px-6 py-2 bg-transparent transition-colors duration-300 hover:bg-[#CAEB66]/10 ml-2"
                        style={{
                            borderRadius: "99px",
                            border: "1px solid #CAEB66",
                        }}
                    >
                        Earn with Profast Courier
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BeMarcent;