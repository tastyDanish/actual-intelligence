import { useAppSettings } from "@/hooks/app-settings-provider";
import { Checkbox } from "./ui/checkbox";

export const AdminControls = () => {
  const { settings, setSettings } = useAppSettings();

  return (
    <div className="flex items-center space-x-2 text-right">
      <Checkbox
        id="talk"
        checked={settings.talkToSelf}
        onCheckedChange={() =>
          setSettings({ ...settings, talkToSelf: !settings.talkToSelf })
        }
      />
      <label htmlFor="talk">selftalk</label>
    </div>
  );
};
