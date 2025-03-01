import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const About = () => {
  const { sharedProp, setSharedProp } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>About Page</h1>
      <p>{sharedProp}</p>
      <Button onClick={() => setSharedProp('Updated from About Page!')}>Update Context</Button>
    </motion.div>
  );
};

export default About;
