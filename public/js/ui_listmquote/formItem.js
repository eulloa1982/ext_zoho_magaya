'use strict';

const e = React.createElement;

class FormItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return (
      <input className="form-control" name="id" value="id"></input>
    );
  }
}

const domContainer = document.querySelector('#form-item');
ReactDOM.render(e(LikeButton), domContainer);
