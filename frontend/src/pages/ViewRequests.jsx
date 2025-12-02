import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRequests, updateRequestStatus } from "../features/requestSlice";

const ViewRequests = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  const handleUpdate = (id, status) => {
    dispatch(updateRequestStatus({ requestId: id, status }));
  };

  return (
    <div style={styles.container}>
      <h2>Connection Requests</h2>

      {loading && <p>Loading...</p>}
      {list.length === 0 && !loading && <p>No requests found.</p>}

      {list.map((req) => (
        <div key={req._id} style={styles.card}>
          <p> {req.fromUser.name}
            {req.fromUser.age}
        
          </p>

          <div>
            <button onClick={() => handleUpdate(req._id, "accept")} style={{ ...styles.btn, background: "green" }}>
              Accept
            </button>
            <button onClick={() => handleUpdate(req._id, "reject")} style={{ ...styles.btn, background: "red" }}>
              Reject
            </button>
            {/* <button onClick={() => handleUpdate(req._id, "ignore")} style={{ ...styles.btn, background: "gray" }}>
              Ignore
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewRequests;

const styles = {
  container: { padding: 20, width: "90%", margin: "auto", fontFamily: "Arial" },
  card: { border: "1px solid #ccc", padding: 15, borderRadius: 6, marginBottom: 10 },
  btn: { padding: 8, marginRight: 5, cursor: "pointer", color: "#fff", border: "none", borderRadius: 4 },
};
