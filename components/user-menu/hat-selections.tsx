import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ActualAvatar } from "../actual-chat/actual-avatar";

type HatSelectionsProps = {
  hat: string;
  onChange: (e: string) => void;
};

export const HatSelections = ({ hat, onChange }: HatSelectionsProps) => {
  return (
    <RadioGroup
      className="flex gap-6"
      onValueChange={onChange}
      defaultValue={hat}>
      <div className="flex flex-col gap-1 items-center">
        <ActualAvatar fallback="US" />
        <RadioGroupItem value="null"></RadioGroupItem>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <ActualAvatar
          hat="wizard"
          fallback="US"
        />
        <RadioGroupItem value="wizard"></RadioGroupItem>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <ActualAvatar
          hat="fish"
          fallback="US"
        />
        <RadioGroupItem value="fish"></RadioGroupItem>
      </div>
    </RadioGroup>
  );
};
