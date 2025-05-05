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
      <div className="max-w-2/5 pt-16">
        <div className="font-head text-7xl">Active Travel Recommender</div>
        <div className="mt-4">
          Discover running events, travel places, and restaurants that fit your
          interests, activity level, and travel style. All personalized to your
          active lifestyle.
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
