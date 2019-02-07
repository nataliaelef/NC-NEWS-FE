//this id for 404
//create a NotFound.js file with a func
{
/_ <div><h2>404 not found</h2></div> _/
}

//add <NotFound default/>in home.js

//add isLoading in state as true

//add hasError in state as false

//if(hasError) goes on top
// if(isLoading) goes after

//articleAdder.js

//navigate from reach-router to be in the exact page (however this makes another get request to the api)
//navigate takes also a second argument which is called state: {state : {article: data.article}}
in articles render check:
if(this.props.location.state) {
const {article} = this.props.location.state
}
