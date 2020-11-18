import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React, { Component } from 'react';
import { Card, CardPrimaryAction, Grid, GridCell, Tooltip, Typography } from 'rmwc';
import { Link, StyledHeading, StyledMainWrapper } from '../components';
import { IPageProps } from '../types/interfaces';

const makeCell = ({e, i}) => {
  return (
<Link to={`${e.node.fields.slug}`}>
                  <Tooltip
                    align={'right'}
                    enterDelay={1000}
                    content={
                      <div
                        style={{
                          display: 'flex',
                          // alignItems: 'center',
                          // justifyContent: 'center',
                          background: '#ede7f3',
                          width: '20rem',
                          // height: '8rem',
                          color: 'black',
                          // borderRadius: '1px',
                          // margin: '0 -3px'
                          padding: '1rem,',
                        }}
                      >
                        <Img fluid={e.node.frontmatter.background?.childImageSharp.fluid} />
                        <Typography use="headline5" tag="div">
                          {e.node.fields.title}
                        </Typography>
                        <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
                          {e.node.excerpt}
                        </Typography>
                      </div>
                    }
                  >
                    <Card style={{ width: '15rem' }}>
                      <CardPrimaryAction>
                        <Img
                          fluid={e.node.frontmatter.background?.childImageSharp.fluid}
                          alt={e.node.fields.title}
                        />
                        <Typography
                          use="subtitle2 truncate"
                          tag="div"
                          theme="textPrimaryOnDark"
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundImage:
                              'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            position: 'absolute',
                          }}
                        >
                          {e.node.fields.title}
                        </Typography>
                      </CardPrimaryAction>
                    </Card>
                  </Tooltip>
                </Link>
  );
}

export default class Tag extends Component<IPageProps> {
  render(): JSX.Element {
    const {
      data: {
        allMdx: { edges },
      },
      pageContext: { title },
    } = this.props;

    return (
      <div>
        <div className={'titleWrapper'}>
          <StyledHeading>{title}</StyledHeading>
        </div>
        <StyledMainWrapper>
          <Grid>
            {edges.map((e, i) => (
              <GridCell span={6} key={`gridcell_${i}_${e.node.fields.id}`}>
                {makeCell({e:e, i:i})}
              </GridCell>
            ))}
          </Grid>
        </StyledMainWrapper>
      </div>
    );
  }
}

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
          }
          frontmatter {
            background {
              childImageSharp {
                fluid(maxWidth: 200, maxHeight: 100) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
