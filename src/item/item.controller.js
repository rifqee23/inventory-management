import express from "express";
import { authorizeJWT } from "../middleware/authorizeJWT.js";
import { authorizeAdmin } from "../middleware/adminAuthorization.js";
import {
  createItem,
  deleteItemById,
  editItemById,
  getAllItems,
  getItemById,
} from "./item.service.js";

export const router = express.Router();

//Get All Item
router.get("/", authorizeJWT, async (req, res) => {
  try {
    const items = await getAllItems();
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Get Item by Id
router.get("/:id", authorizeJWT, async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const item = await getItemById(itemId);
    res.status(200).send(item);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Create Item
router.post("/", authorizeAdmin, async (req, res) => {
  const { name, description, quantity } = req.body;

  try {
    const newItem = await createItem(name, description, quantity);
    res.status(201).json({
      data: {
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        quantity: newItem.quantity,
        createdAt: newItem.created_at,
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//Update Item
router.put("/:id", authorizeAdmin, async (req, res) => {
  const itemId = parseInt(req.params.id);
  const { name, description, quantity } = req.body;
  try {
    const item = await editItemById(itemId, name, description, quantity);
    res.status(200).json({
      data: {
        id: item.id,
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        createdAt: item.created_at,
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", authorizeAdmin, async (req, res) => {
  const itemId = parseInt(req.params.id);

  try {
    const item = await deleteItemById(itemId);
    res.status(200).json({
      data: {
        id: item.id,
      },
      message: "Delete Success!",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
