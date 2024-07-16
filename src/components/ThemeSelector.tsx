import { Select } from "@chakra-ui/react";
import { useTheme } from '../hooks/useTheme';

const ThemeSelector = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Select value={theme} onChange={toggleTheme}  width={{ base: '100px', md: '250px' }}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </Select>
  );
};

export default ThemeSelector;