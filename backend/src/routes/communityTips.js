import express from "express";
import { getDB } from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const filter = {};

    if (req.query.tripType) filter.tripType = req.query.tripType;
    if (req.query.climate) filter.climate = req.query.climate;

    const tips = await db.collection("communityTips").find(filter).toArray();
    res.json(tips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid tip id" });
    }

    const db = getDB();
    const tip = await db
      .collection("communityTips")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!tip) return res.status(404).json({ error: "Tip not found" });

    res.json(tip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { tripType, climate, tip, author } = req.body;

    if (!tripType || !climate || !tip || !author) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = getDB();

    const newTip = {
      tripType,
      climate,
      tip: tip.trim(),
      author: author.trim(),
      upvotes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("communityTips").insertOne(newTip);
    const createdTip = await db
      .collection("communityTips")
      .findOne({ _id: result.insertedId });

    res.status(201).json(createdTip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid tip id" });
    }

    const { tripType, climate, tip, author } = req.body;

    const updatedFields = {
      ...(tripType && { tripType }),
      ...(climate && { climate }),
      ...(tip && { tip: tip.trim() }),
      ...(author && { author: author.trim() }),
      updatedAt: new Date(),
    };

    const db = getDB();

    const result = await db.collection("communityTips").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Tip not found" });
    }

    const updatedTip = await db
      .collection("communityTips")
      .findOne({ _id: new ObjectId(req.params.id) });

    res.json(updatedTip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/upvote", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid tip id" });
    }

    const db = getDB();

    const result = await db.collection("communityTips").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $inc: { upvotes: 1 },
        $set: { updatedAt: new Date() },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Tip not found" });
    }

    res.json({ message: "Tip upvoted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/remove-upvote", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid tip id" });
    }

    const db = getDB();

    const tip = await db
      .collection("communityTips")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!tip) {
      return res.status(404).json({ error: "Tip not found" });
    }

    const result = await db.collection("communityTips").updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          upvotes: Math.max((tip.upvotes || 0) - 1, 0),
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Tip not found" });
    }

    res.json({ message: "Upvote removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid tip id" });
    }

    const db = getDB();

    const result = await db
      .collection("communityTips")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Tip not found" });
    }

    res.json({ message: "Tip deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;