import React from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { BADGE_CONFIGS } from '../../constants/badges';
import { BadgeType } from '../../types';

interface BadgeSelectorProps {
  selectedBadges: BadgeType[];
  onChange: (badges: BadgeType[]) => void;
}

const BadgeSelector: React.FC<BadgeSelectorProps> = ({ selectedBadges, onChange }) => {
  const handleToggle = (type: BadgeType) => {
    if (selectedBadges.includes(type)) {
      onChange(selectedBadges.filter((b) => b !== type));
    } else {
      onChange([...selectedBadges, type]);
    }
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">GitHub Badges</FormLabel>
      <FormGroup row>
        {(Object.keys(BADGE_CONFIGS) as BadgeType[]).map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox
                checked={selectedBadges.includes(type)}
                onChange={() => handleToggle(type)}
                name={type}
              />
            }
            label={BADGE_CONFIGS[type].label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default BadgeSelector;
