import React from 'react';
import Link from './link';
import PageWrapper from './PageWrapper';
import { Elevation, CardActions, CardActionButton, CardActionButtons, CardAction, CardActionItems, CardActionItem, CardActionIcon, CardActionIcons, CardMedia, Card, CardPrimaryAction, Typography, Grid, GridCell } from 'rmwc'

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

  const [elevation, setElevation] = React.useState(0);

  const cards = (<Grid>
    {edges.map((e, i) => (
        <GridCell span={8} key={`gridcell_${i}_${e.node.fields.id}`}>
          <Link to={`${e.node.fields.slug}`}>
            <Elevation z={elevation}
              transition
              onMouseOver={() => setElevation(24)}
              onMouseOut={() => setElevation(0)}
            >
            <Card style={{ width: '20rem', height: '22rem' }}>
                <CardPrimaryAction>
                  <CardMedia
                    sixteenByNine
                    my-prop={e.node.fields.img}
                    style={{
                      backgroundImage: `url(${e.node.fields.img})`,
                      backgroundSize: 'fit'
                    }}
                  >
                  </CardMedia>
                  <Typography use="headline6"
                    tag="h3"
                    style={{
                      color: '#1cd3c6',
                      textAlign: 'left',
                      paddingLeft: '1rem',
                      //WebkitTextStroke: '0.02em black'
                    }}>
                    {e.node.fields.title}
                  </Typography>
                    <div style={{ padding: '1rem 1rem 1rem 1rem' }}>
                      <Typography
                        use="body1"
                        tag="div"
                        theme="textSecondaryOnBackground"
                      >
                        { e.node.excerpt }
                      </Typography>
                  </div>
                </CardPrimaryAction>
              </Card>
            </Elevation>
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
