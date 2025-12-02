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
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      {!loading && list.length === 0 && <p>No friends yet.</p>}

      {list.map((friend) => (
        <div key={friend._id} style={styles.card}>
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
  container: { padding: 20, width: "90%", margin: "auto", fontFamily: "Arial" },
  card: { border: "1px solid #ccc", padding: 15, borderRadius: 6, marginBottom: 10 },
};
