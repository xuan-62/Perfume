const express = require("express");
const router = express.Router();
const data = require("../data");
const perfumeData = data.Perfume;
const userData = data.users;

router.get("/", async (req, res) => {
    try {
      const perfumeList = await perfumeData.getAll();
      res.json(perfumeList);
      
    } catch (e) {
      res.status(500).render("page/errorPage",{ error: e });
    }
  });   

router.post("/", async (req, res) => {
  const blogperfumeData = req.body;
  if (!blogperfumeData) {
    res.status(400).json({ error: "You must provide data to perfume" });
    return;
  }

  if (!blogperfumeData.title||typeof blogperfumeData.title != "string") {
    res.status(400).json({ error: "You must provide a String title" });
    return;
  }
  if (!blogperfumeData.author||typeof blogperfumeData.author != "string") {
    res.status(400).json({ error: "You must provide a string author" });
    return;
  }
  if (!blogperfumeData.content||typeof blogperfumeData.content != "string") {
    res.status(400).json({ error: "You must provide a content" });
    return;
  }
  try {
    const newperfume = await perfumeData.addperfume(
      blogperfumeData.title, 
      blogperfumeData.author,
      blogperfumeData.content.productName,
      blogperfumeData.content.picture,
      blogperfumeData.content.companyName,
      blogperfumeData.content.parameters,
      blogperfumeData.content.briefIntro,
      blogperfumeData.content.links,
      blogperfumeData.content.detailInfo,
      blogperfumeData.content.tags
      );
    await userData.addPerfume(blogperfumeData.author,newperfume._id);
    res.status(200).json(newperfume);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const perfume = await perfumeData.getperfumeById(req.params.id);
    res.json(perfume);
  } catch (e) {
    res.status(404).json({ error: "perfume not found" });
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;

  if (!updatedData.newTitle&&!updatedData.newContent) {
    res.status(400).json({ error: "You must provide a new name or new type" });
    return;
  }

  try {
    await perfumeData.getperfumeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "perfume not found" });
  }

  try {
    const updatedperfume = await perfumeData.updateperfume(req.params.id,updatedData);
    res.json(updatedperfume);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    blogperfumeData = await perfumeData.getperfumeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "perfume not found" });
  }
  try {
    const removed = await perfumeData.removeperfume(req.params.id);
    await userData.deletePerfume(blogperfumeData.author.id,req.params.id);
    res.json(removed);
    } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("comment/:perfumeId", async (req, res) => {
  if (Object.keys(req.query).length != 1 || !req.query.userId) {
      res.status(400).json({ error: "You must provide one and only one userId in your url" });
      return;
    }
    const perfumeId = req.params.perfumeId;
    const userId = req.query.userId;
    const commentId = req.query.commentId;
    const comment = req.query.commentId;
    try {
      await perfumeData.get(perfumeId);
    } catch (e) {
      res.status(404).json({ error: "perfume not found" });
      return;
    }
    try {
      await userData.readuser(userId);
    } catch (e) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    try {
      await perfumeData.commentinguser(perfumeId, userId, commentId, comment);
      await userData.comment
      res.status(200).json();
    } catch (e) {
      res.status(500).json({ error: e });
    }
  });
  
router.delete("comment/:perfumeId", async (req, res) => {
  if (Object.keys(req.query).length != 1 || !req.query.userId) {
  res.status(400).json({ error: "You must one and only one userId in your url" });
  return;
  }
  const perfumeId = req.params.perfumeId;
  const userId = req.query.userId;
  try {
  await perfumeData.get(perfumeId);
  } catch (e) {
  res.status(404).json({ error: "perfume not found" });
  return;
  }
  try {
  await userData.readuser(userId);
  } catch (e) {
  res.status(404).json({ error: "user not found" });
  return;
  }
  try {
  await perfumeData.decommentinguser(perfumeId, userId, commentId);
  res.status(200).json();
  } catch (e) {
  res.status(500).json({ error: e });
  }
});

router.post("like/:userId", async (req, res) => {
  if (Object.keys(req.query).length != 1 || !req.query.perfumeId) {
    res.status(400).json({ error: "You must provide one and only one perfumeId in your url" });
    return;
  }
  const userId = req.params.userId;
  const perfumeId = req.query.perfumeId;
  try {
    await userData.get(userId);
  } catch (e) {
    res.status(404).json({ error: "user not found" });
    return;
  }
  try {
    await perfumeData.readperfume(perfumeId);
  } catch (e) {
    res.status(404).json({ error: "perfume not found" });
    return;
  }
  try {
    await userData.likingperfume(userId, perfumeId);
    res.status(200).json();
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("like/:userId", async (req, res) => {
  if (Object.keys(req.query).length != 1 || !req.query.perfumeId) {
    res.status(400).json({ error: "You must one and only one perfumeId in your url" });
    return;
  }
  const userId = req.params.userId;
  const perfumeId = req.query.perfumeId;
  try {
    await userData.get(userId);
  } catch (e) {
    res.status(404).json({ error: "user not found" });
    return;
  }
  try {
    await perfumeData.readperfume(perfumeId);
  } catch (e) {
    res.status(404).json({ error: "perfume not found" });
    return;
  }
  try {
    await userData.unlikingperfume(userId, perfumeId);
    res.status(200).json();
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;


module.exports = router;