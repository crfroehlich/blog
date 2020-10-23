import React from 'react';
import Link from './link';
import PageWrapper from './PageWrapper';
import { CardMedia, Card, CardPrimaryAction, Typography, Grid, GridCell } from 'rmwc'
import backgroundImage from './images/card.png';

export const Cards = ({ props }) => {
  console.log(props)
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
    {edges.map(e => (
        <GridCell span={6}>
         <Card style={{ width: '21rem', height: '22rem' }}>
            <CardPrimaryAction>
              <CardMedia
                sixteenByNine
                style={{
                  backgroundImage: `url(${backgroundImage})`
                }}
              />
              <Link to={e.node.fields.slug} key={e.node.fields.slug}>
                <div style={{ padding: '0 1rem 1rem 1rem' }}>
                <Typography use="headline6" tag="h2">
                  {'                                                                                      .'} 
                  </Typography>
                  <Typography
                    use="subtitle2"
                    tag="h3"
                    theme="textSecondaryOnBackground"
                    style={{ marginTop: '-1rem' }}
                  >
                    { e.node.fields.title }
                  </Typography>
                  <Typography
                    use="body1"
                    tag="div"
                    theme="textSecondaryOnBackground"
                  >
                    { e.node.excerpt }
                  </Typography>
              </div>
              </Link>
            </CardPrimaryAction>
          </Card>
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
