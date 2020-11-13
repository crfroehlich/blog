import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { Tooltip, CardMedia, Card, CardPrimaryAction, Typography, Grid, GridCell } from 'rmwc';
import { Link, Layout, StyledHeading, StyledMainWrapper, SEO } from '../components';
import { IPageProps } from '../types/interfaces';

export default class Tag extends Component<IPageProps> {
  render(): JSX.Element {
    const {
      data: {
        allMdx: { edges },
      },
      path,
    } = this.props;

    const parts = path.split('/');
    const title = parts[parts.length - 1];

    return (
      <Layout {...this.props}>
        <SEO title={title} slug={title} />
        <div className={'titleWrapper'}>
          <StyledHeading>{title}</StyledHeading>
        </div>
        <StyledMainWrapper>
          <Grid>
            {edges.map((e, i) => (
              <GridCell span={6} key={`gridcell_${i}_${e.node.fields.id}`}>
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
                        <CardPrimaryAction>
                          <div style={{ padding: '1rem' }}>
                            <Typography use="headline5" tag="div">
                              {e.node.fields.title}
                            </Typography>
                            <Typography use="body1" tag="p" theme="textSecondaryOnBackground">
                              {e.node.excerpt}
                            </Typography>
                          </div>
                        </CardPrimaryAction>
                      </div>
                    }
                  >
                    <Card style={{ width: '15rem' }}>
                      <CardPrimaryAction>
                        <CardMedia
                          sixteenByNine
                          style={{
                            backgroundImage: `url(${e.node.fields.img})`,
                            backgroundSize: 'fit',
                          }}
                        >
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
                        </CardMedia>
                      </CardPrimaryAction>
                    </Card>
                  </Tooltip>
                </Link>
              </GridCell>
            ))}
          </Grid>
        </StyledMainWrapper>
      </Layout>
    );
  }
}

export const tagQuery = graphql`
  query GetTagByNameQuery($tag: String) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
            img
          }
        }
      }
    }
  }
`;
