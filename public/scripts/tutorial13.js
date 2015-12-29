// tutorial13.js
/*
 * Let's create the Comment component, which will depend on data passed in from its parent. 
 * Data passed in from a parent component is available as a 'property' on the child component. 
 * These 'properties' are accessed through this.props. 
 * Using props, we will be able to read the data passed to the Comment from the CommentList, 
 * and render some markup:
 */
 
/*
 * By surrounding a JavaScript expression in braces inside JSX (as either an attribute or child), 
 * you can drop text or React components into the tree. 
 * We access named attributes passed to the component as keys on this.props and any nested elements 
 * as this.props.children.
 */
 
/*
 * Markdown is a simple way to format your text inline. 
 * For example, surrounding text with asterisks will make it emphasized.
 *
 * In this tutorial we use a third-party library marked which takes Markdown text and converts it to raw HTML. 
 * We already included this library with the original markup for the page, so we can just start using it. 
 * Let's convert the comment text to Markdown and output it:
 */

/*
 * All we're doing here is calling the marked library. We need to convert this.props.children 
 * from React's wrapped text to a raw string that marked will understand so we explicitly call toString().
 *
 * But there's a problem! Our rendered comments look like this in the browser: 
 * "<p>This is <em>another</em> comment</p>". We want those tags to actually render as HTML.
 *
 * That's React protecting you from an XSS attack.
 * 
 * There's a way to get around it but the framework warns you not to use it:
 */
var Comment = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});
/*
 * This is a special API that intentionally makes it difficult to insert raw HTML, 
 * but for marked we'll take advantage of this backdoor.
 *
 * Remember: by using this feature you're relying on marked to be secure. 
 * In this case, we pass sanitize: true which tells marked to escape any HTML markup in the source 
 * instead of passing it through unchanged.
 */

/*
 * Now that we have defined the Comment component, we will want to pass it the author name and comment text. 
 * This allows us to reuse the same code for each unique comment. 
 * Now let's add some comments within our CommentList:
 */
 
/* So far we've been inserting the comments directly in the source code. 
 * Instead, let's render a blob of JSON data into the comment list. 
 * Eventually this will come from the server, but for now, write it in your source:
 */
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];
/* We need to get this data into CommentList in a modular way. 
 * Modify CommentBox and the ReactDOM.render() call to pass this data into the CommentList via props.
 * Now that the data is available in the CommentList, let's render the comments dynamically:
 */
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
/*
 * Note that we have passed some data from the parent CommentList component to the child Comment components. 
 * For example, we passed Pete Hunt (via an attribute) and This is one comment (via an XML-like child node) 
 * to the first Comment. As noted above, the Comment component will access these 'properties' 
 * through this.props.author, and this.props.children.
 */

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

/* We need to get this data into CommentList in a modular way. 
* Modify CommentBox and the ReactDOM.render() call to pass this data into the CommentList via props:
*/

/* 
 * Reactive state
 * So far, based on its props, each component has rendered itself once. 
 * props are immutable: they are passed from the parent and are "owned" by the parent. 
 * To implement interactions, we introduce mutable state to the component. 
 * this.state is private to the component and can be changed by calling this.setState(). 
 * When the state updates, the component re-renders itself.
 *
 * render() methods are written declaratively as functions of this.props and this.state. 
 * The framework guarantees the UI is always consistent with the inputs.
 *
 * When the server fetches data, we will be changing the comment data we have. 
 * Let's add an array of comment data to the CommentBox component as its state:
 */
 
/*
 * getInitialState() executes exactly once during the lifecycle of the component 
 * and sets up the initial state of the component.
 */
 
/*
 * Updating state
 * When the component is first created, we want to GET some JSON from the server and update the state 
 * to reflect the latest data. We're going to use jQuery to make an asynchronous request to the server 
 * we started earlier to fetch the data we need. 
 * The data is already included in the server you started (based on the comments.json file), 
 * so once it's fetched, this.state.data will look something like this:
 *
 * [
 *  {"author": "Pete Hunt", "text": "This is one comment"},
 *  {"author": "Jordan Walke", "text": "This is *another* comment"}
 * ]
 */
 
/*
 * Here, componentDidMount is a method called automatically by React after a component is rendered for the first time.  
 * The key to dynamic updates is the call to this.setState(). 
 * We replace the old array of comments with the new one from the server and the UI automatically updates itself. 
 * Because of this reactivity, it is only a minor change to add live updates. 
 * We will use simple polling here but you could easily use WebSockets or other technologies.
 */  
var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm />
      </div>
    );
  }
});

/* 
 * Let's replace the hard-coded data with some dynamic data from the server. 
 * We will remove the data prop and replace it with a URL to fetch:
 */ 
ReactDOM.render(
  <CommentBox url="/api/comments" />,
  document.getElementById('content')
); 

/* 
 * This component is different from the prior components because it will have to re-render itself. 
 * The component won't have any data until the request from the server comes back, 
 * at which point the component may need to render some new comments.
 *
 * Note: the code will not be working at this step.
 */