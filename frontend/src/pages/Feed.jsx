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
