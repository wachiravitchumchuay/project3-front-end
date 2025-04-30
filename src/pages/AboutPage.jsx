// eslint-disable-next-line
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-1/3 pt-24">
        <div className="font-head text-7xl">Project 3</div>
        <div className="mt-6">
          Website for testing the recommender system’s API requests and
          evaluating data usability.
          <div>
            Images used are sourced from Unsplash.com under their free license.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
