## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

The Component class is the base class for creating React components. 
If we dont specify the `shouldcomponentupdate` method when the component is updated, 
or its parent re renders the component and all of its child components will re render 
regardless of whether any actual changes have occurred in the component's props or state

The pure component is a optimized version of the component class where it performs a `shallow` 
comparison of the component's props and state to determine if an update should trigger a re-render.

In fuctional components a component can be wrapped with React.memo and it will be equivalent to a pure component
where if its second param is not specified the default comparison would be `shallow` as well.

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

In should `ShouldComponentUpdate` you have to make comparisons with props and state and now with context you are adding
a layer of extra complexity and a ouside source and now you dont only rely on the component props and state wich have 
the following implications:

  - Break `ShouldComponentUpdate` encapsulation by adding a external source.
  - Can downgrade performance because context can change frequently and adds an additional layer of complexity
    to determine if a component should re-render or not.
  - Harder to maintain due to the need to keep up with context changes and in sync on all components should update relying on it.
  - Introducing shouldComponentUpdate with context can make it actually understand when a component should and shouldnt update.
    Context updates might happen in unrelated parts of the component tree wich can lead to unexpected re-renders or missed
    updates.

## 3. Describe 3 ways to pass information from a component to its PARENT.

  - Using callbacks, the parent can create a callback that passes it to the child wich the in its child can be called with the data that
    needs to be send to the parent.
  - Using Redux, context or other state management solutions where a child can trigger a action with the data and the parent consumes it
    from the state.
  - Passing the setState action to the children so it sets the parent new state making the desired data available to the parent on its state.

Preferably is better to stick to callbacks on inmediate or close by parent children relations. 

## 4. Give 2 ways to prevent components from re-rendering.

  - Using memo for functional components and `ShouldComponentUpdate` for class components
  - For functiontional components doing a well use of dependencies array of useEffect, useMemo, useCallback
  - Proper state encapsulation or splitting so we dont re render a component that doesnt needs it when state changes.
    
## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Jsx should only retur a single root element, fragments can be used so we can return grouped elements or components
without the need to introduce a additional container like a `div`. 

Fragments can create a app if for example you use two fragments alongside each other and dont wrap them in a fragment so you return only one root
but this will easily be detected while writing the code. Fragments issues can be more related to styling where for example a flex container 
that renders a component that returns a group of elements in a fragment the flex container will take into account all elements as it children 
therefore displaying them as childrens in flex where maybe (it depends if that is the intended case) is not desired and you want the component to be
displayed as a single child of the flex container. The opossite can happen as well depending on the desired behaviour.

## 6. Give 3 examples of the HOC pattern.

Hoc pattern where widley used on class components by libraries such as redux react router dom but now with hooks in functional hooks are used

  - Redux `connect` HOC
  - React router dom `withRouter` HOC
  - Custom HOC such as this one:

```
const withAuth = (WrappedComponent) => {
  const isAuthenticated = true;

  const AuthHOC = (props) => {
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};
```

## 7. What's the difference in handling exceptions in promises, callbacks and async...await?

  - Callbacks: error handling is typically done through the use of error-first callbacks and we need to explicitly
    check for errors within the callback and handle them accordingly.
  - Promises: Errors are handled with catch keyword after a promise with the error as a param
    The catch block will only catch errors that occur within the Promise chain. Errors from outised wont be caught.
  - Async/await: Errors withing the try block will be catch in the catch block with the error as a param.
    Errors thrown within an async function that aren't caught will be treated as Promise rejections.

Usually the more clear way to go is async await but it depends on how we want to handle the error where promises offers more 
granularity on error scopes where you can attach multiple catch to the promise chain. Now it is better to avoid errors in callbacks 
to avoid callback hells and promises and async await offers more readability.


## 8. How many arguments does setState take and why is it async.

SetState takes two arguments: first one is the new state and second one a callback when the update has been done and the component is 
re rendered. Note that the first argument can be the new state or a function that receives the previous state and returns the new state.

SetState are async for performance since it batches it batches multiple state updates together, 
minimizing the number of component re-renders.

## 9. List the steps needed to migrate a Class to Function Component.

 - Create a new functional component
 - Convert the Class Component's render method to `return`.
 - Convert state management to useState hook
 - Convert lifecycle methods to useEffect hook
 - Convert Class Component methods to regular functions
 - Update props handling, no longer use `this`
 - Handle other Class Component-specific features for example error boundaries
 - Update references to use the new functional component

## 10. List a few ways styles can be used with components.

  - Inline styles.
  - Css classes.
  - Css modules
  - Css in js libaries
  
## 11. How to render an HTML string coming from the server.

Usually to render html string you can use `dangerouslySetInnerHTML` ex:

```
<div dangerouslySetInnerHTML={{ __html: htmlString }} />;
```

Or you can use a external library such as react-html-parser
