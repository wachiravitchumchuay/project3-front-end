// eslint-disable-next-line
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const TablePage = () => {
  const { restaurants } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <Table>
          <TableCaption>List of Restaurants.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              {restaurants && restaurants[0]?.confidence && (
                <TableHead>Confidence</TableHead>
              )}
              <TableHead>Restaurant Name</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Food Type</TableHead>
              <TableHead>Carbs</TableHead>
              <TableHead>Protein</TableHead>
              <TableHead>Fat</TableHead>
              <TableHead>Min Budget</TableHead>
              <TableHead>Max Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants && restaurants.length > 0 ? (
              restaurants.map((restaurant, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  {restaurant.confidence && (
                    <TableCell>{restaurant.confidence}</TableCell>
                  )}
                  <TableCell className="font-medium">
                    {restaurant.restaurant_name}
                  </TableCell>
                  <TableCell>{restaurant.restaurant_nationality}</TableCell>
                  <TableCell>{restaurant.district}</TableCell>
                  <TableCell>{restaurant.restaurant_type}</TableCell>
                  <TableCell>{restaurant.food_type}</TableCell>
                  <TableCell>{restaurant.carbohydrates}</TableCell>
                  <TableCell>{restaurant.protein}</TableCell>
                  <TableCell>{restaurant.fat}</TableCell>
                  <TableCell>{restaurant.clean_min_budget}</TableCell>
                  <TableCell>{restaurant.clean_max_budget}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="10" className="text-center">
                  No restaurants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default TablePage;
