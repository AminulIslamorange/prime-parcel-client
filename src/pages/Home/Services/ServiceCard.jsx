const ServiceCard = ({ service, idx, activeCard, setActiveCard }) => {
  const { icon: Icon, title, description } = service;

  const isActive = idx === activeCard;

  return (
    <div
      onMouseEnter={() => setActiveCard(idx)}
      onMouseLeave={() => setActiveCard(1)}
      className={`
        shadow-md 
        rounded-[24px] 
        p-6 
        border 
        transition-all 
        duration-300 
        text-center
        flex flex-col items-center
        ${isActive ? "bg-[#CAEB66] scale-[1.02] -translate-y-2 shadow-lg" : "bg-white"}
      `}
    >
      <div className="text-4xl text-primary mb-4 transition-colors duration-300">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
