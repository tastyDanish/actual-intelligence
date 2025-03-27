import { ActualChat } from "../actual-chat";

export const IntelligenceChat = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div>you are in intelligence mode</div>
      <ActualChat />
    </div>
  );
};
