import HowItsWorkCard from "./HowItsWorkCard";
import delevaryImage from '../../../assets/big-deliveryman.png'

const howWorksData = [
  {
    icon: delevaryImage ,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    icon: delevaryImage ,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    icon: delevaryImage ,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time."
  },
  {
    icon: delevaryImage ,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.."
  }]
const HowItsWork = () => {
    return (
        <section className="py-16 px-4 md:px-10 rounded-[32px]">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">How it Works</h2>
       
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {howWorksData.map((howWork , idx) => (
          <HowItsWorkCard key={idx} howWork ={howWork } />
        ))}
        
      </div>
    </section>
    );
};

export default HowItsWork;