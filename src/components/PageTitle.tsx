import React from 'react';
import { Button, Grid, Theme, makeStyles } from '@material-ui/core';
import {
  DateTime,
  Icon,
  TagSet,
} from '../components';
import { PageHeader, PageSubtitle } from '../styles';

const useStyles = makeStyles((theme: Theme) => ({
  gitBtn: {
    height: '30px',
    minHeight: '30px',
    border: '1px solid rgb(211,220,228)',
    backgroundColor: 'rgb(255,255,255)',
    color: 'rgb(36,42,49)',
  },
}));

export const PageTitle = (props): JSX.Element => {
  const classes = useStyles();
  const { gitHubPath, tags, tagLinkPrefix, date } = props;
  let { subtitle, title } = props;

  title = title.split(':')[0].trim();
  subtitle = subtitle || title.split(':')[1]?.trim();

  return (
  <Grid container spacing={3}>
    <Grid item xs={10}>
      <PageHeader>{title}</PageHeader>
      <PageSubtitle>{subtitle}</PageSubtitle>
    </Grid>
    {gitHubPath?.length && 
      (<Grid item xs={2}>
        <Button
          variant="contained"
          href={gitHubPath}
          className={classes.gitBtn}
          startIcon={<Icon icon={['fab', 'github']}/>}
        >
          Edit
        </Button>
      </Grid>)
    }
    {tags?.length && (
      <Grid item xs>
        <TagSet tags={tags} linkPrefix={tagLinkPrefix} />
      </Grid>
    )}
    {date && (
      <Grid item xs>
        <DateTime date={date} />
      </Grid>)
    }
  </Grid>);
}