// tutorial5.js
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
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});
/*
 * Now that we have defined the Comment component, we will want to pass it the author name and comment text. 
 * This allows us to reuse the same code for each unique comment. 
 * Now let's add some comments within our CommentList:
 */
var CommentList = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        <Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>
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

var CommentBox = React.createClass({
  render: function() {
	return (
	  <div className="commentBox">
		<h1>Comments</h1>
		<CommentList />
		<CommentForm />
	  </div>
	);
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
); 