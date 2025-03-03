import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const TableHome = ({ setActivePage }) => {
  const { sharedProp, setSharedProp } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
<div className="bg-green-3 flex flex-col justify-center items-center">
  <div className="pt-18 flex flex-col justify-center items-center text-center">
    <p className="font-head text-6xl">Recommender</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ullam!</p>
  </div>
  <div className="p-6">
    <Button onClick={() => setActivePage("TablePage")}>Start!</Button>
  </div>
</div>
    </motion.div>
  );
};

export default TableHome;
