import { Loader } from "lucide-react";
import { motion } from "framer-motion";

export const ActualLoader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center absolute">
      <motion.div
        animate={{ rotate: [0, 0, 180, 180, 0] }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}>
        <Loader size={128} />
      </motion.div>
    </div>
  );
};
