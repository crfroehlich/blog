import React from 'react';
import styled from '@emotion/styled';
import { Theme, Typography, makeStyles } from '@material-ui/core';
import { theme as darkTheme } from './DarkTheme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  pageTitle: {
    fontSize: '32px',
    lineHeight: '1.5',
    fontWeight: 500,
    borderLeft: '2px solid #1ed3c6',
    padding: '0 16px',
    flex: '1',
    marginTop: '0',
    paddingTop: '0',
    color: darkTheme.colors.heading,
  },
}));

export const PageHeader = (props): JSX.Element => {
  const classes = useStyles();
  const { children } = props;
  return (
    <Typography {...props} className={classes.pageTitle} variant="h1" component="h1" gutterBottom>{children}</Typography>
  );
}

export const StyledHeading = styled('h1')`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 500;
  border-left: 2px solid #1ed3c6;
  padding: 0 16px;
  flex: 1;
  margin-top: 0;
  padding-top: 0;
  color: ${darkTheme.colors.heading};
`;

export const Edit = styled('div')`
  padding: 1rem 1.5rem;
  text-align: right;

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1em;
    text-decoration: none;
    color: #555;
    border: 1px solid rgb(211, 220, 228);
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s ease-out 0s;
    text-decoration: none;
    color: rgb(36, 42, 49);
    background-color: rgb(255, 255, 255);
    height: 30px;
    padding: 5px 16px;
    &:hover {
      background-color: rgb(245, 247, 249);
    }
  }
`;

export const StyledMainWrapper = styled.div`
  max-width: 750px;
  color: ${darkTheme.colors.text};

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
    color: ${darkTheme.colors.link};
  }

  code {
    border-radius: 10px;
  }

  @media (max-width: 767px) {
    padding: 0 15px;
  }
`;
