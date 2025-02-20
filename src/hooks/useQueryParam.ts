import { useEffect, useState } from "react";

/**
 * Set query parameters to the URL.
 * @param paramsToSet query parameters to set in the URL
 * @param options options to control how the query parameters are set
 * @example
 * setQueryParams({ page: '2', sort: 'desc' }, { pushChangesToHistory: true });
 * // URL becomes: /current/path?page=2&sort=desc
 */
const setQueryParams = (
  paramsToSet: { [key: string]: string },
  options: UseQueryParamOptions
) => {
  const currentUrl = new URL(window.location.href);
  const newQueryParams = new URLSearchParams(currentUrl.search);

  Object.entries(paramsToSet).forEach(([key, value]) => {
    newQueryParams.set(key, value.toString());
  });

  const newUrl = currentUrl.pathname + "?" + newQueryParams.toString();

  if (options.pushChangesToHistory) {
    window.history.pushState({}, "", newUrl);
  } else {
    window.history.replaceState({}, "", newUrl);
  }
};

type UseQueryParamOptions = {
  /** Whether to create a new history entry (true) or replace the current one (false) */
  pushChangesToHistory?: boolean;
};

/**
 * Hook that syncs state with a URL query parameter. When the state changes, the URL
 * is automatically updated. Great for shareable, bookmarkable UI state.
 * 
 * @param key the key to set on the query parameter
 * @param defaultValue the default value for that key. set on the param
 * @param options options for the query param
 * @returns [value, setValue] tuple like useState
 * 
 * @example
 * // Basic usage
 * const [page, setPage] = useQueryParam('page', '1');
 * 
 * @example
 * // With history entries (for back button support)
 * const [sort, setSort] = useQueryParam('sort', 'asc', { 
 *   pushChangesToHistory: true 
 * });
 * 
 * @example
 * // With a function for default value
 * const [filter, setFilter] = useQueryParam('filter', () => 'all');
 */
function useQueryParam<T>(
  key: string,
  defaultValue: T | (() => T),
  options: UseQueryParamOptions = { pushChangesToHistory: false }
): [T, (newValue: T) => void] {
  const [localParam, setLocalParam] = useState<T>(defaultValue);

  useEffect(() => {
    if (localParam) {
      setQueryParams({ [key]: localParam.toString() }, options);
    }
  }, [key, localParam, options]);

  return [localParam, setLocalParam];
}

export { useQueryParam };
