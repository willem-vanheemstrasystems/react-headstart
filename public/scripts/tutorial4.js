// tutorial4.js
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