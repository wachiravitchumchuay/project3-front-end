import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Home = () => {
  const { sharedProp } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Home Page</h1>
      <p>{sharedProp}</p>
      <Button asChild>
        <Link to="/about">Go to About</Link>
      </Button>
    </motion.div>
  );
};

export default Home;
