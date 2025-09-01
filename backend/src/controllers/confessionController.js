import Confession from "../models/confession.js";

// CREATE
export const createConfession = async (req, res, next) => {
  try {
    const { text } = req.body;
    
    // Check if user is authenticated
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const { userId } = req.auth;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Confession text is required" });
    }
    
    const doc = await Confession.create({ text: text.trim(), userId });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
};

// READ (everyone can see)
export const getConfessions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;   // default page = 1
    const limit = parseInt(req.query.limit) || 5; // default limit = 5
    const skip = (page - 1) * limit;

    // Count total docs for pagination info
    const total = await Confession.countDocuments();

    // Apply skip + limit properly
    const docs = await Confession.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      confessions: docs,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateConfession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    
    // Check if user is authenticated
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const { userId } = req.auth;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Confession text is required" });
    }
    
    const confession = await Confession.findById(id);
    if (!confession) {
      return res.status(404).json({ message: "Confession not found" });
    }
    
    if (confession.userId !== userId) {
      return res.status(403).json({ message: "Not authorized to update this confession" });
    }
    
    confession.text = text.trim();
    await confession.save();
    res.json(confession);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteConfession = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if user is authenticated
    if (!req.auth?.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const { userId } = req.auth;
    
    const confession = await Confession.findById(id);
    if (!confession) {
      return res.status(404).json({ message: "Confession not found" });
    }
    
    if (confession.userId !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this confession" });
    }
    
    await confession.deleteOne();
    res.json({ message: "Confession deleted successfully" });
  } catch (err) {
    next(err);
  }
};