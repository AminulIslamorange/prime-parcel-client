import ClientLogo from "../ClientLogo";
import Services from "../Services/Services";
import Banner from "./Banner/Banner";
import Benifits from "./Benifits/Benifits";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Services></Services>
           <ClientLogo></ClientLogo>
           <Benifits></Benifits>
        </div>
    );
};

export default Home;