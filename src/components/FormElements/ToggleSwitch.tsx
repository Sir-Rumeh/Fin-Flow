import { Switch } from '@mui/material';

type ToggleSwitchProps = {
  id: number;
  toggleLabel: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ToggleSwitch = ({ id, toggleLabel, checked, onChange }: ToggleSwitchProps) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <div key={id} className="flex items-center justify-between">
      <p className="font-semibold">{toggleLabel}</p>
      <Switch {...label} checked={checked} onChange={onChange} />
    </div>
  );
};

export default ToggleSwitch;
