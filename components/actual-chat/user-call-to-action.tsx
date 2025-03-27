import { AnimatePresence, motion } from "framer-motion";

type UserCallToActionProps = {
  visible: boolean;
};
export const UserCallToAction = ({ visible }: UserCallToActionProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 top-1/4"
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="text-2xl">What is on your mind?</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
