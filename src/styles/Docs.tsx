import React from 'react';
import styled from '@emotion/styled';
import { Theme, Typography, makeStyles } from '@material-ui/core';
import { DarkStyles } from './Theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  pageTitle: {
    fontSize: '32px',
    lineHeight: '1.5',
    fontWeight: 500,
    padding: '0 5px',
    flex: '1',
    marginTop: '0',
    paddingTop: '0',
    color: DarkStyles.colors.heading,
  },
  pageSubtitle: {
    fontSize: '16px',
    lineHeight: '.75',
    fontWeight: 300,
    paddingLeft: '10px',
    flex: '1',
    marginTop: '0',
    paddingTop: '0',
    color: DarkStyles.colors.heading,
  },
  edit: {
    padding: '1rem 1.5rem',
    textAlign: 'right',
  },
  editLink: {

  }
}));

export const PageHeader = (props): JSX.Element => {
  const classes = useStyles();
  const { children } = props;
  return (
    <Typography {...props} className={classes.pageTitle} variant="h1" gutterBottom>{children}</Typography>
  );
};

export const PageSubtitle = (props): JSX.Element => {
  const classes = useStyles();
  const { children } = props;
  return (
    <Typography {...props} className={classes.pageSubtitle} variant="subtitle1" >{children}</Typography>
  );
};

export const StyledMainWrapper = styled.div`
  max-width: 750px;
  color: ${DarkStyles.colors.text};

  ul,
  ol {
    -webkit-padding-start: 40px;
    -moz-padding-start: 40px;
    -o-padding-start: 40px;
    margin: 24px 0px;
    padding: 0px 0px 0px 2em;

    li {
      font-size: 16px;
      line-height: 1.8;
      font-weight: 400;
    }
  }

  a {
    transition: color 0.15s;
    color: ${DarkStyles.colors.link};
  }

  code {
    border-radius: 10px;
  }

  @media (max-width: 767px) {
    padding: 0 15px;
  }
`;
