const User = require("../models/User");
const Connection = require("../models/Connection")








exports.getFeed = async (req, res) => {
  try {
    const meId = req.user.id;

   
    const connections = await Connection.find({
      $or: [{ fromUser: meId }, { toUser: meId }]
    });

  
    const connectedIds = connections.map(conn =>
      conn.fromUser.toString() === meId ? conn.toUser.toString() : conn.fromUser.toString()
    );

    
    const me = await User.findById(meId);
    if (!me) return res.status(404).json({ message: "User not found" });

    const ignoredIds = (me.ignoredUsers || []).map(id => id.toString());
    const rejectedIds = (me.rejectedUsers || []).map(id => id.toString());

  
    const excludeList = [meId, ...connectedIds, ...ignoredIds, ...rejectedIds, ...connectedIds];

    
    const others = await User.find({ _id: { $nin: excludeList } })
      .select("name age gender bio hobbies");

    
    const shuffled = others.sort(() => Math.random() - 0.5);

    res.json({ message: "User feed", data: shuffled });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getUserById = async (req, res) => {
  try {
    console.log(req.user)
    res.json({ message: "User fetched", data: req.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};









exports.updateUser = async (req, res) => {
  try {
    const myId = req.user.id;
    const targetId = req.params.id;

    if (myId !== targetId) {
      return res.status(403).json({ message: "You can only edit your own profile" });
    }

    const updated = await User.findByIdAndUpdate(targetId, req.body, { new: true })
      .select("-password"); 

    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Profile updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.deleteUser = async (req, res) => {
  try {
    const myId = req.user.id;
    const targetId = req.params.id;

    if (myId !== targetId) {
      return res.status(403).json({ message: "You can only delete your own profile" });
    }

    const deleted = await User.findByIdAndDelete(targetId);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.clearCookie("token"); 
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





