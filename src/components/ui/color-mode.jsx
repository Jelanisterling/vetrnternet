import React, { useEffect, useState } from 'react';
import { IconButton, useColorMode, Skeleton } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';

export function ColorModeButton(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton boxSize="8" />;
  }

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      icon={colorMode === 'dark' ? <LuMoon /> : <LuSun />}
      {...props}
    />
  );
}
