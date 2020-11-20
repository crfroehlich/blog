import * as React from 'react';
import { Tooltip as MuiTooltip, withStyles, Theme } from '@material-ui/core';

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(MuiTooltip);

export const Tooltip = (props): JSX.Element => {
  const { title, children } = props;
  return (
    <div>
      <LightTooltip title={title}>
        {children}
      </LightTooltip>
    </div>
  );
}