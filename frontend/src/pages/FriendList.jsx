import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFriends } from "../features/friendSlice";

const FriendList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div style={styles.container}>
      <h2>My Friends</h2>

      {loading && <p>Loading...</p>}
     
      {!loading && list.length === 0 && <p>No friends yet.</p>}

      {list.map((friend) => (
        <div key={friend._id} style={styles.card}>
             <img
          src={"data:image/png;base64,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"}
          alt="Default User"
          className="card-image"
        />
          <p><b>Name:</b> {friend.name}</p>
          <p><b>Email:</b> {friend.email}</p>
          <p><b>Gender:</b> {friend.gender}</p>
          <p><b>Bio:</b> {friend.bio}</p>
        </div>
      ))}
    </div>
  );
};

export default FriendList;

const styles = {
  container: { padding: 20, width: "30%", margin: "auto", fontFamily: "Arial" },
  card: { border: "1px solid #ccc", padding: 15, borderRadius: 6, marginBottom: 10,textAlign:"center" },
};
