import { AnimatePresence, motion } from "framer-motion";

type IntelligenceCallToActionProps = {
  visible?: boolean;
};
export const IntelligenceCallToAction = ({
  visible = true,
}: IntelligenceCallToActionProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="w-full h-full flex items-center flex-col justify-center gap-2"
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}>
          <div>
            There are no questions left for the Actual Intelligence to answer.
          </div>
          <div>Leave some requests for others to answer.</div>
          <div>
            Or share with your friends and answer some of theirs (share link
            here)
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
