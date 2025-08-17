import React from 'react';
import { WindowFrame } from './WindowFrame';
import type { MacOSWindowProps } from '../types';

export const MacOSWindow: React.FC<MacOSWindowProps> = (props) => {
  return <WindowFrame {...props} />;
};
