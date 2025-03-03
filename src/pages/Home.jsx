import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { sharedProp, setSharedProp, formValues } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        <div className="max-w-1/3 pt-24">
          <p className="font-head text-7xl">Restaurant Recommender</p>
          <p className="">E Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime architecto laboriosam maiores pariatur accusantium quos totam dolores minima, debitis error.</p>
        </div>
    </motion.div>
  );
};

export default Home;
