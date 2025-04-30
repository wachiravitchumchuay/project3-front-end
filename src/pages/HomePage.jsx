// eslint-disable-next-line
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-1/3 pt-24">
        <div className="font-head text-7xl">Restaurant Recommender</div>
        <div className="mt-4">
          Discover restaurants that match your cravings, budget, and lifestyle —
          personalized just for you, wherever you are.
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
