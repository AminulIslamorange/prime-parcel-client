import ClientLogo from "../ClientLogo";
import HowItsWork from "../HowItsWork/HowItsWork";
import Services from "../Services/Services";
import Banner from "./Banner/Banner";
import BeMarcent from "./BeMarcent/BeMarcent";
import Benifits from "./Benifits/Benifits";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <HowItsWork></HowItsWork>
           
           <Services></Services>
           <ClientLogo></ClientLogo>
           <Benifits></Benifits>
          
           <BeMarcent></BeMarcent>
        </div>
    );
};

export default Home;