// tutorial1-raw.js
/*
 * We pass some methods in a JavaScript object to React.createClass() to create a new React component. 
 * The most important of these methods is called render which returns a tree of React components 
 * that will eventually render to HTML.
 */
var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
     /*
      * The <div> tags are not actual DOM nodes; they are instantiations of React div components. 
      * You can think of these as markers or pieces of data that React knows how to handle. 
      * React is safe. We are not generating HTML strings so XSS protection is the default.
      *
      * You do not have to return basic HTML. You can return a tree of components that you (or someone else) built. 
      * This is what makes React composable: a key tenet of maintainable frontends.
      */
      React.createElement('div', {className: "commentBox"},
        "Hello, world! I am a CommentBox."
      )
    );
  }
});
/*
 * ReactDOM.render() instantiates the root component, starts the framework, 
 * and injects the markup into a raw DOM element, provided as the second argument.
 *
 * The ReactDOM module exposes DOM-specific methods, while React has the core tools 
 * shared by React on different platforms (e.g., React Native).
 *
 * It is important that ReactDOM.render remain at the bottom of the script for this tutorial. 
 * ReactDOM.render should only be called after the composite components have been defined.
 */
ReactDOM.render(
  React.createElement(CommentBox, null),
  document.getElementById('content')
);