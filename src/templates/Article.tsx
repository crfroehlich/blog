import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import React from 'react';
import { Button, Paper, Grid, Theme, makeStyles } from '@material-ui/core';
import { getConfig } from '../../config';
import {
  DateTime,
  Comments,
  Icon,
  NextPrevious,
  PageHeader,
  StyledMainWrapper,
  TagSet,
} from '../components';
import { INode, IPageProps } from '../types/interfaces';

const config = getConfig();

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#001933',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#001933',
  },
  gitBtn: {
    height: '30px',
    minHeight: '30px',
    border: '1px solid rgb(211,220,228)',
    backgroundColor: 'rgb(255,255,255)',
    color: 'rgb(36,42,49)',
  },
}));

export const Article: React.FC<IPageProps> = (props): JSX.Element => {
  const classes = useStyles();
  const {
    data,
    pageContext: { next, previous, pageTags },
  } = props;
  if (!data) return null;
  const { mdx } = data;
  const { title } = mdx.fields;
  const date = new Date(mdx.fields.date);
  console.log(props)
  return (
    <div>
      <Paper className={`${classes.root}`}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <PageHeader>
              {title.split(':')[0].trim()}
            </PageHeader>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              href={`${config.siteMetadata.docsLocation}/${(mdx.parent as INode)?.relativePath}`}
              className={classes.gitBtn}
              startIcon={Icon({ icon: ['fab', 'github'] })}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs>
            <TagSet tags={pageTags} linkPrefix={'тег'} />
          </Grid>
          <Grid item xs>
            <DateTime date={date} />
          </Grid>
        </Grid>
      </Paper>

      <StyledMainWrapper>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </StyledMainWrapper>
      <div id="comment_div">
        <Comments id={'comment_div'} />
      </div>
      <div className={'addPaddTopBottom'}>
        <NextPrevious next={next} prev={previous} />
      </div>
    </div>
  );
};

export default Article;

export const articleQuery = graphql`
  query GetArticeByIdQuery($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
        date
        tags
      }
      body
    }
  }
`;
