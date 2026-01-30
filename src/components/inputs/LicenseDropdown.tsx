import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { LICENSE_OPTIONS } from '../../constants/licenses';
import type { LicenseType } from '../../types';

interface LicenseDropdownProps {
  value: LicenseType;
  onChange: (value: LicenseType) => void;
}

const LicenseDropdown: React.FC<LicenseDropdownProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as LicenseType);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="license-select-label">License</InputLabel>
      <Select
        labelId="license-select-label"
        id="license-select"
        value={value}
        label="License"
        onChange={handleChange}
      >
        {LICENSE_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LicenseDropdown;
