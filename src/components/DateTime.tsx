import React from 'react';
import { Theme, Typography, makeStyles } from '@material-ui/core';
import { tools } from '../utils/tools';
import { DarkStyles } from '../styles';
import { Tooltip } from './Tooltip';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  date: {
    textAlight: 'right',
    float: 'right',
    display: 'block',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 'large',
    color: DarkStyles.colors.link,
  },
}));

export const DateTime = (props): JSX.Element => {
  const classes = useStyles();
  const { date, style } = props;
  return (
    <Tooltip tip={tools.getLocalDate(date, 'en-US')} >
      <Typography {...props} style={style} className={classes.date} variant="h4" gutterBottom>
        {tools.getLocalDate(date)}
      </Typography>
    </Tooltip>
  );
};
