

const HowItsWorkCard = ({ howWork }) => {
     const { icon: Icon,icon, title, description } = howWork;
    return (
         <div
      className="
        bg-white 
        shadow-md 
        rounded-[24px] 
        p-6 
        border 
        transition-all 
        duration-300 
        hover:bg-[#CAEB66]
        hover:shadow-lg
        hover:-translate-y-2
        hover:scale-[1.02]
        text-center
        flex
        flex-col
        items-center
      "
    >
      <div className="mb-4">
        <img src={icon} alt={title} className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-primary transition-colors duration-300 hover:text-black">
        {title}
      </h3>
      <p className="text-gray-600 transition-colors duration-300 hover:text-black">
        {description}
      </p>
    </div>
    );
};

export default HowItsWorkCard;