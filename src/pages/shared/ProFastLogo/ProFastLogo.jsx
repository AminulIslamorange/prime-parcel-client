
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
const ProFastLogo = () => {
    return (
    <Link to='/'>
  <div className='flex items-end'>
      <img src={logo} alt="ProFast Logo" />
      <p className='font-bold text-xl -ml-3'>ProFast</p>
    </div>
</Link>
        
    );
};

export default ProFastLogo;