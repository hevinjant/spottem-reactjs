import React from "react";
import Form from "./Form";

function AddFriend(props) {
  function handleFormSubmit(email) {
    // make post request to add new friend
    props.handleAddFriend(email);
  }

  return (
    <div className="add-friend">
      <Form
        formLabel="Add friend"
        placeholder="Search friends by email"
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default AddFriend;
