// @flow
import * as React from 'react';
import Box from '../Box/Box';
import Controller from '../FlyoutUtils/Controller';

type Props = {|
  anchor: ?any,
  children?: any,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  positionRelativeToAnchor?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' /* default md */,
|};

export default function Tooltip(props: Props) {
  const {
    anchor,
    children,
    idealDirection,
    onDismiss,
    positionRelativeToAnchor = true,
    size = 'md',
  } = props;

  if (!anchor) {
    return null;
  }

  return (
    <Controller
      anchor={anchor}
      bgColor="darkGray"
      idealDirection={idealDirection}
      positionRelativeToAnchor={positionRelativeToAnchor}
      onDismiss={onDismiss}
      size={size}
    >
      <Box column={12} padding={3}>
        {children}
      </Box>
    </Controller>
  );
}
