const Connection = require("../models/Connection");
const User = require("../models/User");

exports.sendRequest = async (req, res) => {
  try {
    const fromUser = req.user.id;
    const toUser = req.params.id;

    if (fromUser === toUser) {
      return res.status(400).json({ message: "You cannot send request to yourself" });
    }

    const connection = await Connection.findOne({
      $or: [
        { fromUser, toUser },
        { fromUser: toUser, toUser: fromUser }
      ]
    });

    if (connection) {
      return res.status(400).json({ message: "Connection already exists" });
    }

    const newRequest = await Connection.create({
      fromUser,
      toUser,
      status: "pending"
    });

    res.status(201).json({ message: "Request sent", data: newRequest });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const requestId = req.params.id;

    const connection = await Connection.findOne({ _id: requestId, toUser: userId });

    if (!connection) {
      return res.status(404).json({ message: "Request not found" });
    }

    connection.status = "accepted";
    await connection.save();

    res.json({ message: "Request accepted", data: connection });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const requestId = req.params.id;

    const connection = await Connection.findOne({ _id: requestId, toUser: userId });

    if (!connection) {
      return res.status(404).json({ message: "Request not found" });
    }

    connection.status = "rejected";
    await connection.save();

    res.json({ message: "Request rejected", data: connection, });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.ignoreUser = async (req, res) => {
  try {
    const meId = req.user.id;
    const ignoreId = req.params.id;

    if (meId === ignoreId) {
      return res.status(400).json({ message: "You cannot ignore yourself" });
    }

    const user = await User.findById(meId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.ignoredUsers.push(ignoreId);
    await User.findByIdAndUpdate(meId, {
      $addToSet: { ignoredUsers: ignoreId }
    });

    res.json({ message: "User ignored successfully", ignoredUser: ignoreId });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





exports.getConnections = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

   
    const connections = await Connection.find({
      status: "accepted",
      $or: [{ fromUser: userId }, { toUser: userId }]
    })
    .populate("fromUser", "-password")
    .populate("toUser", "-password");

  
    const me = await User.findById(userId);
    const ignored = Array.isArray(me?.ignoredUsers) ? me.ignoredUsers.map(id => id.toString()) : [];

   
    const friends = connections
      .map(conn => {
        if (!conn.fromUser || !conn.toUser) return null; 
        return conn.fromUser._id.toString() === userId ? conn.toUser : conn.fromUser;
      })
      .filter(friend => friend && !ignored.includes(friend._id.toString()));

    res.json({ message: "Accepted friends", data: friends });

  } catch (err) {
    console.error("Error in getConnections:", err);
    res.status(500).json({ error: err.message });
  }
};





exports.getReceivedRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await Connection.find({
      toUser: userId,
      status: "pending",
    }).populate("fromUser", "-password");

    res.json({ success: true, data: requests });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
