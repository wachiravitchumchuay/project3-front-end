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
      <div>        
        <Button onClick={() => setActivePage('TablePage')}>Go to Table Page</Button>
      </div>
    </motion.div>
  );
};

export default TableHome;
