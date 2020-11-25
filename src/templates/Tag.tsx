import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { graphql, navigate } from 'gatsby';
import Img from 'gatsby-image';
import React, { useState } from 'react';
import { DisplayDate, Icon, PageTitle } from '../components';
import { PageWrapper, StyledMainWrapper } from '../styles';

const getCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 360,
      color: theme.palette.text.secondary,
      backgroundColor: '#d1d2d3',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.complex,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    grid: {
      flexGrow: 1,
    },
    description: {
      width: '250',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }),
);

const GridCard = ({ edge, idx }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = getCardStyles();

  const handleExpandClick = () => setExpanded(!expanded);
  const handleNavigate = () => navigate(edge.node.fields.slug);

  return (
    <Grid item xs key={`gridcell_${idx}_${edge.node.fields.id}`}>
      <Card className={classes.root} variant="elevation">
        <CardActionArea onClick={handleNavigate}>
          <Img fixed={edge.node?.frontmatter?.background?.childImageSharp.fixed} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {edge.node.fields.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.description}
            >
              {edge.node.fields.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton>
            <DisplayDate style={{ color: '#0000008A' }} date={new Date(edge.node.fields.date)} />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {expanded ? <Icon icon={'angle-up'} /> : <Icon icon={'angle-down'} />}
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{edge.node.excerpt.replace('\n', '<br>')}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export const Tag = (props): JSX.Element => {
  const {
    data: {
      allMdx: { edges },
    },
    pageContext: { title },
  } = props;

  const classes = getCardStyles();

  return (
    <PageWrapper>
      <PageTitle title={title} />
      <StyledMainWrapper>
        <div className={classes.grid}>
          <Grid container spacing={3}>
            {edges.map((e, i) => (
              <GridCard edge={e} idx={i} key={`gridcard_${i}_${e.node.fields.id}`} />
            ))}
          </Grid>
        </div>
      </StyledMainWrapper>
    </PageWrapper>
  );
};

export default Tag;

export const tagQuery = graphql`
  query GetTagByNameQuery($tag: String) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { glob: "**/content/posts/**" }
        frontmatter: { tags: { in: [$tag] } }
      }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            id
            title
            slug
            date
            tags
            description
          }
          frontmatter {
            background {
              childImageSharp {
                fixed(width: 360) {
                  base64
                  aspectRatio
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`;
