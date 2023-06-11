import React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode,
  element?: HTMLElement,
}

export const Portal = (props: PortalProps) => {
  const { children, element = document.getElementById('portal')! } = props;

  return createPortal(children, element);
};
