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
      <h1>project3</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore est quis pariatur a exercitationem, doloremque soluta nihil eum omnis aliquam? Nisi voluptate, tempora ullam impedit minus a facilis. Ipsam, quidem. Temporibus beatae, architecto ex optio facilis animi corporis? Earum officiis esse dolorum cupiditate nihil ea dolorem. Quia, nisi consectetur? Neque.</p>
    </motion.div>
  );
};

export default About;
