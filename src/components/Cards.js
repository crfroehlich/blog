import React from 'react';
import Link from './link';
import PageWrapper from './PageWrapper';
import { Tooltip, CardMedia, Card, CardPrimaryAction, Typography, Grid, GridCell } from 'rmwc'

export const Cards = ({ props }) => {
  let {
    data: {
      allMdx: {
        edges
      },
    },
    path,
  } = props;

  const parts = path.split('/');

  const title = parts[parts.length-1];

  const cards = (<Grid>
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
                  //alignItems: 'center',
                  //justifyContent: 'center',
                  background: '#ede7f3',
                  width: '20rem',
                  //height: '8rem',
                  color: 'black',
                  //borderRadius: '1px',
                  //margin: '0 -3px'
                  padding: '1rem,'
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
            }>
            <Card style={{ width: '15rem' }}>
                <CardPrimaryAction>
                  <CardMedia
                    sixteenByNine
                    style={{
                      backgroundImage: `url(${e.node.fields.img})`,
                      backgroundSize: 'fit'
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
                        position: 'absolute'
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
  );

  return (
    <PageWrapper
      pageTitle={title}
      props={props}
      pageContent={cards}
    />
  );
};

export default Cards;
