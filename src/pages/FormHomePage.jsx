// eslint-disable-next-line
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import  TablePage  from "./TablePage";


const FormHomePage = () => {
  const [showFormHomePage, setShowFormHomePage] = useState(true);
  return (
    <div>

      {showFormHomePage ? (
        //true
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-green-3 flex flex-col justify-center items-center">
          <div className="pt-18 flex flex-col justify-center items-center text-center">
            <p className="font-head text-6xl">Recommender</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium, ullam!
            </p>
          </div>
          <div className="p-6">
            <Button onClick={() => setShowFormHomePage(false)}>Start</Button>
          </div>
        </div>
        </motion.div>
        
      ) : (
        //false
        <div className=" pl-24 pt-6">
          <Button onClick={() => setShowFormHomePage(true)}>Close</Button>
          <TablePage />
        </div>
      )}
    </div>
  );
};

export default FormHomePage;
