// tutorial8.js
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
var CommentBox = React.createClass({
  render: function() {
	return (
	  <div className="commentBox">
		<h1>Comments</h1>
		<CommentList data={this.props.data}/>
		<CommentForm />
	  </div>
	);
  }
});

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content')
); 