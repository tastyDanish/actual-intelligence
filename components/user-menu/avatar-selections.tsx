import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ActualAvatar } from "../actual-chat/actual-avatar";

type AvatarSelectionsProps = {
  avatar: string;
  onChange: (e: string) => void;
};

export const AvatarSelections = ({
  avatar,
  onChange,
}: AvatarSelectionsProps) => {
  return (
    <RadioGroup
      className="flex gap-6"
      onValueChange={onChange}
      defaultValue={avatar}>
      <div className="flex items-center flex-col gap-2">
        <ActualAvatar fallback="US" />
        <RadioGroupItem value="null"></RadioGroupItem>
      </div>
      <div className="flex items-center flex-col gap-2">
        <ActualAvatar
          avatar="bot"
          fallback="BT"
        />
        <RadioGroupItem value="bot"></RadioGroupItem>
      </div>
      <div className="flex items-center flex-col gap-2">
        <ActualAvatar
          avatar="cat"
          fallback="CT"
        />
        <RadioGroupItem value="cat"></RadioGroupItem>
      </div>
    </RadioGroup>
  );
};
