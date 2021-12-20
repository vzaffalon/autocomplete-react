### What is the difference between Component and PureComponent? give an example where it might break my app.
React PureComponent implements shouldComponentUpdate with a shallow prop and state comparison, which means that if the props did not change the component and all its sub components will not re-render, this will bring a performance optimization to the component. React.pureComponent can be implemented with the hook useMemo. It might break the app if you use a complex data structure in the component state, because of the shallow comparison shouldComponentUpdate() might return false-negatives causing the component to not update when it should. Also if you expect a component child of the pureComponent to re-render it will not happen if the pureComponent haven’t updated.

### Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
Context provider always updates all it's children when the state in the context changes. Because of that shouldComponentUpdate will not work on consumers of the context, the component and it's children will update even when using shouldComponentUpdate. If you expect your components to update only when props changes or based on a custom logic separate from the context, you might have an unexpected behavior when using the context as provider.
 
### Describe 3 ways to pass information from a component to its PARENT. 
- Using a context provider, updating the state in the context from the children and accessing the state in the parent. 
- Passing a function from the parent to the children that updates the state in the parent. Passing the ref of input from the parent to a children and updating the ref value in the children. 
- You can also use component composition to avoid having to pass functions down the tree in case the child can function outside the parent.

### Give 2 ways to prevent components from re-rendering. 
- Use the PureComponent or in react-hooks useMemo, these will make the component only re-render when the props changes. 
- For react hooks useCallback to avoid the component from re-rendering when passing functions as props, cause javascript will create a new object reference every time a re-render occurs, causing children to also re-render if you are not memoizing the call to the function. 
- Use useRef for forms to change formsValues without triggering re-renders on the screen for every value change.

### What is a fragment and why do we need it? Give an example where it might break my app. 
Fragment allows you to return a list of children without having to introduce an unecessary <div> just for that. It might break the app if you swap the div to the frament and your current css expected a div to work, this could happend if you are creating a flex layout with space-between for example.

### Give 3 examples of the HOC pattern. 
- Redux connect is an example of HOC which takes a component and returns a new component that receives updates from changes in the store. 
- React router withRouter higher-order-component adds access to the application router properties via props like match location and history. 
- Formik withFormik high-order-component composes a new component that has as props form handler functions.

### What's the difference in handling exceptions in promises, callbacks and async...await. 
In promises you use the catch block after the then to catch errors, if you have multiple nested thens you only need a catch in the last one, this catch will handle all errors. In async await you need a try catch block on top of all the awaited functions to catch all the erros any of those functions could throw, you can also have a catch after each await if you want to catch errors individually. For callbacks you will need to add a try catch inside the callback function, and if you want access to the error on the function that called the callback you should have a catch on the parent and throw the error inside the callback catch. 

### How many arguments does setState take and why is it async. 
Set state takes two arguments, an updater function you can use to set state based on the last state, and a callback function that will only run after the state is updated and the screen re-rendered.
Set state is async cause it enqueues an update to the react virtual dom and causes a re-render in the screen, the this.state variable is only updated after the re-render so you can’t trust that the value will be updated immediately, React enqueues updates to make sure you have the best possible performance by batch updating the DOM with multiple state change in one go if possible.

### List the steps needed to migrate a Class to Function Component. 
1. Change the class keyword to function and remove the extends React.component
2. Place the content of render() method in the function body inside a return()
3. Convert class methods to functions
4. Remove the constructor functions
5. Remove this from methods.
6. Remove event handler bindings.
7. Convert this.setState to hooks state method.
8. Migrate lifecycle methods to useEffect hook.
9. Migrate setStates that update lots of states at the same time to a useReducer hook and dispatch functions.
10. Migrate dependent libraries to a version with hooks and change the use to a hooks inside the component when available.

### List a few ways styles can be used with components. 
You can use className to set up a style defined in your css file to style a component. You can import a global css file in the root App.js component. Most common solutions in the React ecosystem involves using css-in-js libraries like styled-components which can easily create react components with css styles, and give the developer the ability to modify those style by passing props to the styled components. With styled-components the css is only applied to the component and its children, and a unique css class id name for each css which means you don’t need to worry about css properties being override and interfering with each other, even if they have the same name. 

### How to render an HTML string coming from the server.
dangerouslySetInnerHTML is the property that react uses to render html content, you should be careful when using that to not expose the server to cross-site scripting attack, you should make sure the html being rendered is safely stored in the database, and is being returned directly from the server. The difference between using that property to innerHtml is that dangerouslySetInnerHTML let react now that it shouldn’t worry about the html and its children when updating the virtual dom, react will overwrite the dom for that node every time the components re-render if youse innerHtml with what he thinks is the correct DOM node which can cause screen flashes and unexpected behaviours.