# Overview

Deel challenge for a autoComplete component.

The project has been done on a Create React App template and only has CRA boilerplate and the component code itself.

To run the project:

  - npm install
  - npm start

## Structure

The preview of the component is being rendered on the `App` component and the component itself and all its logic is on the components/autoComplete folder.

The component has been split into several files so it can be easily readable.

  - autoComplete - Contains the component itself
  - useAutoComplete - Contains most of the logic regarding the autoComplete feature
  - autoComplete.module - Used CSS modules so styles are in this file
  - types - contains created types
  - useDebounce - created a small utility hook to use debounce

## Notes

  - Left the source function who feeds suggestions to the autoComplete component outside of this one so it can be reused with different source functions.
  - This component styles additional logic and parameters can be extracted and handled outside the component to make it more re-usable but didnt do it this way because it was not mentioned on the challenge.
  - The project itself is a preview of a autoComplete so it can be showcased. If we wanted to use it as a library to be project ready we would have to modify the strcuture to the proper configurations so we use a dist build package and install it as a dependency on a different project.
