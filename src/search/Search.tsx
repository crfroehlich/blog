import React, { useReducer, useEffect } from 'react';
import { SearchReducer, initialSearchState } from './SearchReducer';
import { useStaticQuery, graphql } from 'gatsby';
import { Scrollbars } from 'react-custom-scrollbars';
import { SearchEngine } from './SearchEngine';
import ResultList from './ResultList';
import {
  SearchWrapper,
  SearchForm,
  SearchResult,
  NoResult,
} from '../styles/SearchStyles';
import { IResult, ISearch } from './ISearch';

let searchEngine: SearchEngine;

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
                  fixed(width: 60) {
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

  let searchInput: HTMLElement;

  /**
   * handles the input change and perfom a search with js-search
   * in which the results will be added to the state
   */
  const searchData = (e: any) => {
    const { search } = state;
    const { value } = e.target;
    search.search(value).then(searchResults => {
      dispatch({
        type: 'SET_SEARCH_QUERY',
        payload: { searchQuery: value, searchResults },
      });
    });
    searchInput.focus();
    // e.preventDefault();
  };
  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  // };
  useEffect(() => {
    searchInput.focus();
    if (dataset.length !== 0) {
      let data = dataset.map(({ node }: any) => {
        return {
          ...node.frontmatter,
          slug: node.fields.slug,
          excerpt: node.excerpt
        };
      });

      dispatch({ type: 'SET_DATA', payload: data });
      searchEngine = searchEngine || new SearchEngine(data);
      dispatch({
        type: 'SET_SEARCH',
        payload: searchEngine,
      });
    }
  }, [dataset]);

  const { searchResults, searchQuery } = state;
  const queryResults: ISearch = searchResults;
  return (
    <SearchWrapper>
      <SearchForm onSubmit={searchData}>
        <input
          autoFocus={true}
          tabIndex={0}
          id="Search"
          value={searchQuery}
          onChange={searchData}
          placeholder="The Questing Beast asks...?"
          ref={(r) => searchInput = r}
        />
      </SearchForm>
      <SearchResult>
        {(!queryResults?.result || !queryResults?.result?.length || queryResults.result.length === 0) && searchQuery !== '' ? (
          <NoResult>No trail found</NoResult>
        ) : (
          ''
        )}

        {queryResults && queryResults.result && queryResults.result.length > 0 && (
          <Scrollbars
            autoHeight
            autoHeightMax={505}
            className="search-scrollbar"
          >
            {queryResults.result.map && queryResults.result.map((item: IResult, i: number) => <ResultList key={`result_${i}`} {...item}/>)}
          </Scrollbars>
        )}
      </SearchResult>
    </SearchWrapper>
  );
}

export default Search;
