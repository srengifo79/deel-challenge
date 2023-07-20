import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useDebounce from './useDebounce';
import { Props, Suggestions } from './types';

export default function useAutoComplete({ source }: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const [suggestions, setSuggestions] = useState<Suggestions>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setInputValue(value);
    clearSuggestions();
    debouncedGetSuggestions(value);
  }

  function selectSuggestion(index: number) {
    if (index > -1) {
      setInputValue(suggestions[index].label);
    }
    clearSuggestions();
  }

  function clearSuggestions() {
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
  }

  async function getSuggestions(searchTerm: string) {
    if (searchTerm) {
      const options = await source(searchTerm);
      setSuggestions(options);
    }
  }

  const debouncedGetSuggestions = useDebounce(getSuggestions);

  function selectUp() {
    if (selectedSuggestionIndex > 0) {
      setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
    }
  }

  function selectDown() {
    if (selectedSuggestionIndex < suggestions.length - 1) {
      setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const keyOperation = {
      ArrowUp: selectUp,
      ArrowDown: selectDown,
      Enter: () => selectSuggestion(selectedSuggestionIndex),
      Escape: clearSuggestions,
    };
    const keyNumber = event.key as keyof typeof keyOperation;
    const operation = keyOperation[keyNumber];
    if (operation) {
      operation();
    } else {
      setSelectedSuggestionIndex(-1);
    }
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  useEffect(() => {
    if (listRef.current && selectedSuggestionIndex !== -1) {
      const selectedItem = listRef.current.children[selectedSuggestionIndex];
      window.requestAnimationFrame(() => {
        selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  }, [selectedSuggestionIndex]);

  return {
    inputValue,
    suggestions,
    selectedSuggestionIndex,
    listRef,
    isFocused,
    handleBlur,
    handleFocus,
    selectSuggestion,
    handleInputChange,
    onKeyDown,
  };
}
