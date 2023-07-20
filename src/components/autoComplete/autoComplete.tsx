import React from 'react';
import styles from './autoComplete.module.css';
import useAutoComplete from './useAutocomplete';
import { Props } from './types';

export default function AutoComplete({ source }: Props) {
  const {
    inputValue,
    suggestions,
    selectedSuggestionIndex,
    listRef,
    isFocused,
    selectSuggestion,
    handleInputChange,
    onKeyDown,
    handleFocus,
    handleBlur,
  } = useAutoComplete({ source });

  function getHighlightedText(text: string) {
    const parts = text.split(new RegExp(`(${inputValue})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === inputValue.toLowerCase() ? (
            <mark key={`${part}_${index}`}>{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  }

  return (
    <div className={styles.root}>
      <input
        placeholder="Search"
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && suggestions.length > 0 && (
        <div className={styles.suggestionsListRoot}>
          <ul className={styles.suggestionsList} ref={listRef}>
            {suggestions.map(({ id, label }, index) => (
              <li
                key={`${id}_${index}`}
                className={`${styles.suggestionItem} ${
                  index === selectedSuggestionIndex
                    ? styles.selectedSuggestion
                    : undefined
                }`}
                onClick={() => selectSuggestion(index)}
              >
                {getHighlightedText(label)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
