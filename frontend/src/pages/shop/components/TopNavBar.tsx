import { Button } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';

const TopNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end items-center bg-white p-3 m-5 rounded-lg shadow-sm">
      <Button
        onClick={() => navigate('/order')}
      >
        我的订单
      </Button>
    </div>
  );
};

export default TopNavBar;