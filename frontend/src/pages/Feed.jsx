// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFeed, removeUserFromFeed } from "../features/feedSlice";
// import axiosInstance from "../api/axiosInstance";

// const FeedPage = () => {
//   const dispatch = useDispatch();
//   const { users, loading, error } = useSelector((state) => state.feed);

//   useEffect(() => {
//     dispatch(fetchFeed());
//   }, [dispatch]);

//   const sendRequest = async (id) => {
//     await axiosInstance.post(`/connections/request/${id}`);
//     dispatch(removeUserFromFeed(id));
//   };

//   const ignoreUser = async (id) => {
//     await axiosInstance.put(`/connections/ignore/${id}`);
//     dispatch(removeUserFromFeed(id));
//   };

// //   const rejectUser = async (id) => {
// //     await axiosInstance.put(`/connections/reject/${id}`);
// //     dispatch(removeUserFromFeed(id));
// //   };

//   if (loading) return <h2>Loading feed...</h2>;
//   if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

//   return (
//     <div>
//       <h1>User Feed</h1>
//       {users.map((u) => (
//         <div key={u._id}>
//           <h3>{u.name}, {u.age}</h3>
//           <p>{u.bio}</p>
//           <button onClick={() => sendRequest(u._id)}>❤️ Send</button>
//           <button onClick={() => ignoreUser(u._id)}>Ignore</button>
//           {/* <button onClick={() => rejectUser(u._id)}>Reject</button> */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FeedPage;



import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, removeUserFromFeed } from "../features/feedSlice";
import axiosInstance from "../api/axiosInstance";
import "./Feed.css"; 

const Feed = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const sendRequest = async (id) => {
    await axiosInstance.post(`/connections/request/${id}`);
    dispatch(removeUserFromFeed(id));
  };

  const ignoreUser = async (id) => {
    await axiosInstance.put(`/connections/ignore/${id}`);
    dispatch(removeUserFromFeed(id));
  };

  if (loading) return <h2 className="feed-title">Loading feed...</h2>;
  if (error) return <h2 className="feed-title error">{error}</h2>;

  return (
    <div className="feed-container">
      <h1 className="feed-title">User Feed</h1>

      <div className="card-grid">
        {users.map((u) => (
          <div className="user-card" key={u._id}>
            <div>
              <h3 className="card-header">{u.name}</h3>
              <p className="card-bio">age:{u.age}</p>
              <p className="card-bio">gender:{u.gender}</p>
              <p className="card-bio">bio:{u.bio}</p>
            </div>

            <div className="card-actions">
              <button className="btn-send" onClick={() => sendRequest(u._id)}>Send</button>
              <button className="btn-ignore" onClick={() => ignoreUser(u._id)}>Ignore</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
