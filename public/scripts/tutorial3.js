// tutorial3.js
/*
 * Notice how we're mixing HTML tags and components we've built. 
 * HTML components are regular React components, just like the ones you define, with one difference. 
 * The JSX compiler will automatically rewrite HTML tags to React.createElement(tagName) expressions 
 * and leave everything else alone. This is to prevent the pollution of the global namespace.
 */ 
var CommentList = React.createClass({
  render: function() {
	return (
	  <div className="commentList">
		Hello, world! I am a CommentList.
	  </div>
	);
  }
});

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