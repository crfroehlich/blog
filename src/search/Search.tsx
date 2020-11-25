import React, { useReducer, useEffect } from 'react';
import { SearchReducer, initialSearchState } from './SearchReducer';
import { useStaticQuery, graphql } from 'gatsby';
import { Scrollbars } from 'react-custom-scrollbars';
import { RebuildIndex } from './RebuildIndex';
import ResultList from './ResultList';
import {
  SearchWrapper,
  SearchForm,
  SearchResult,
  NoResult,
} from '../styles/SearchStyles';

export const Search = () => {
  const [state, dispatch] = useReducer(SearchReducer, initialSearchState);

  const data = useStaticQuery(graphql`
    query GetSearchData {
      allMdx(filter: { fileAbsolutePath: { glob: "**/content/posts/**" } }) {
        edges {
          node {
            excerpt(truncate: false, pruneLength: 10000)
            fields {
              slug
            }
            frontmatter {
              date
              subtitle
              title
              description
              tags
              background {
                childImageSharp {
                  fixed(width: 30) {
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
  `);

  const dataset = data.allMdx.edges;

  /**
   * handles the input change and perfom a search with js-search
   * in which the results will be added to the state
   */
  const searchData = (e: any) => {
    const { search } = state;
    const queryResult = search.search(e.target.value);
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: { searchQuery: e.target.value, searchResults: queryResult },
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (dataset.length !== 0) {
      let data = dataset.map(({ node }: any) => {
        return {
          ...node.frontmatter,
          slug: node.fields.slug,
          excerpt: node.excerpt
        };
      });

      dispatch({ type: 'SET_DATA', payload: data });
      const dataToSearch = RebuildIndex(data);
      if (dataToSearch) {
        dispatch({
          type: 'SET_SEARCH',
          payload: dataToSearch,
        });
      }
    }
  }, [dataset]);

  const { searchResults, searchQuery } = state;
  const queryResults = searchResults;

  return (
    <SearchWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <input
          id="Search"
          value={searchQuery}
          onChange={searchData}
          placeholder="The Questing Beast asks...?"
        />
      </SearchForm>
      <SearchResult>
        {queryResults.length == 0 && searchQuery !== '' ? (
          <NoResult>No results found</NoResult>
        ) : (
          ''
        )}

        {queryResults.length !== 0 && (
          <Scrollbars
            autoHeight={true}
            autoHeightMax={505}
            className="search-scrollbar"
          >
            {queryResults.map((item: any) => {
              return (
                <ResultList
                  key={item.slug}
                  title={item.title}
                  url={item.slug}
                  image={
                    item.background == null ? null : item.background.childImageSharp.fixed
                  }
                  date={item.date}
                  tags={item.tags}
                />
              );
            })}
          </Scrollbars>
        )}
      </SearchResult>
    </SearchWrapper>
  );
}

export default Search;
