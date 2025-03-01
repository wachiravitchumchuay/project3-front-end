import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const Home = () => {
  const { sharedProp, setSharedProp } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-yellow-200">
        <h1>Home Page</h1>
        <p>{sharedProp}</p>
        <Button onClick={() => setSharedProp('Updated from Home Page!')}>Update Context</Button>
      </div>
    </motion.div>
  );
};

export default Home;
