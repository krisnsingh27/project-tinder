
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFeed, removeUserFromFeed } from "../features/feedSlice";
// import axiosInstance from "../api/axiosInstance";
// import "./Feed.css"; 

// const Feed = () => {
//   const dispatch = useDispatch();
//   const { users, loading } = useSelector((state) => state.feed);

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

//   if (loading) return <h2 className="feed-title">Loading feed...</h2>;
 

//   return (
//     <div className="feed-container">
//       <h1 className="feed-title">User Feed</h1>


//       <div className="card-grid">
//         {users.map((u) => (
//           <div className="user-card" key={u._id}>
//             <div>
//               <img
//           src={"data:image/png;base64,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"}
//           alt="Default User"
//           className="card-image"
//         />
//               <h3 className="card-header">{u.name}</h3>
//               <p className="card-bio">age:{u.age}</p>
//               <p className="card-bio">gender:{u.gender}</p>
//               <p className="card-bio">bio:{u.bio}</p>
//             </div>

//             <div className="card-actions">
//               <button className="btn-send" onClick={() => sendRequest(u._id)}>Send</button>
//               <button className="btn-ignore" onClick={() => ignoreUser(u._id)}>Ignore</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeed, removeUserFromFeed } from "../features/feedSlice";
import axiosInstance from "../api/axiosInstance";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.feed);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  useEffect(() => {
    setIndex(0);      
  }, [users]);

  const nextUser = () => {
    setIndex((prev) => prev + 1);
  };

  const sendRequest = async (id) => {
    await axiosInstance.post(`/connections/request/${id}`);
    dispatch(removeUserFromFeed(id));
    nextUser();
  };

  const ignoreUser = async (id) => {
    await axiosInstance.put(`/connections/ignore/${id}`);
    dispatch(removeUserFromFeed(id));
    nextUser();
  };

  if (loading) return <h2 className="feed-title">Loading feed...</h2>;

  if (!users || users.length === 0 || index >= users.length) {
    return <h2 className="feed-title">No more users in feed!</h2>;
  }

  const u = users[index];

  return (
    <div className="feed-container">
      <h1 className="feed-title">User Feed</h1>

      <div className="user-card">
        <div>
          <img
            src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAPFBMVEX///+BgYF+fn57e3t4eHj7+/u8vLzh4eF1dXWMjIzr6+uYmJjNzc2np6f09PSxsbHY2NjFxcWSkpKfn58RQhN/AAAD+0lEQVR4nO2c2ZLiMAxF4y3xEmeB///XSQgwk4YBy/I1VHXuC6+nZFnWRprm0KFDh36HzLDq0xR3mWFqY3CbQmwnbz5NNLUnZbWUUqxafrW1Is7d55D86KTacHZSSrjWfwRpilo9At3BdKxvri7IJzba22usay0/vrLSHUv2FZkmmYC0So/VmGIi0iI71gkQPqQzLUcYazANjsK02KqCX3n35tI9Ch4aDJ1JndFMJH+6yoJNNWo6k5BYX59sBpMQDhnZTSA71EV2AkLNOYe3SLdAqDykxamA92/OuHkblIMxDZkeBYXq8q7eKtehnuWsGHWzVQBVOvlIK5WAxCqf61E3WyGgpty7d5VGvIDZAeEqNQOgWi4UIqyPXChEDUGoFipC8W4fBuorj++AStVXhoSvhJqZt08iInrPhUKU7xMXClHSdEyfkogsYeBaCpHlGS4UJE3nMQmBYGpOLFPJEwSKl7uA2owto8SC9Yl7HhSm9dmxoEDtIM/zKUzjbHAcKIep2/O7LgLWTDCGExNkNICI3rsY8pkWS0VX/P4ZId/N995QSVX8oWH2XDau0heQm+JdoEqHqgPq10OJ0lBdCUuVLh08n0kUbxAPJaCKP38loEozNay8ZVP5CQ235QlpUPX546KrAAsKBTwdkOaxW9YRkOXx6gZU5cCZ98GKURMZVBpxeBtV6i7XTymIQ13VjVkx1I3YbZcxI1uQ6B24nFEkZPz4r3L2ANCrSs2QAwXfFczxKTRTQ+9yYIb/O9HnRtBFpU0TOaxr5ErXJnpZA5l/7EXf84Ru5F1F9XTkmtld1FUA8ELlJmo7HdRA38sTY7qtsr5PtJStwUT0dIWP56toXSHI6PiJKMVWncX9VenjSNDo8Zm65Ezd1ftDT5d+fPWg+mSnqhI5N6W/NPX8nJIS41PhqygPTZ1HpqEt8Gt0zXfTmXJ8NbKpZs0905nq5J0NJSCsUnWCAi1LqFD1NfTC3db4dzK1GoVsLf4QeWVCnvCm+sayPadxDVpzuauj/+dw/S8PMoEx7bM/jSdQyRbVNxvm3I714leyh7h7f+JNHE7Fn+ZhFiykRVKLuaS1TOu4SBuWK+ZbftQlkC5SusiXAXxkH9xOWkQmlpmCLbG6sZO0YWKc4hTyg8ArKRkyOwy+F+WtdJO0MuMqDq3Li97JUq6lYXWjLerdTyWVJcwBuyggrvQoJRI/aTKdLfjg/pW057c+b/q3X0YpjiVD/ypC+NbhLtwLLPvf7+WY1ZU+gHTBWp3r0VzDHGwl734uZcM+chn/OSP91Wqu+2eiTH9O+cZODSm9PYu+FbXv2ystLIvTS3zoJkrLIguApXVApeqAStUBlaqvhPoDe0s4NVHzTvwAAAAASUVORK5CYII="}
            alt="Default User"
            className="card-image"
          />
          <h3 className="card-header">{u.name}</h3>
          <p className="card-bio">age: {u.age}</p>
          <p className="card-bio">gender: {u.gender}</p>
          <p className="card-bio">bio: {u.bio}</p>
        </div>

        <div className="card-actions">
          <button className="btn-send" onClick={() => sendRequest(u._id)}>Send</button>
          <button className="btn-ignore" onClick={() => ignoreUser(u._id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default Feed;
