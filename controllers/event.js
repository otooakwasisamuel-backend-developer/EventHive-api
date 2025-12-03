import { EventModel } from "../models/event.js";
import { postEventValidator, patchEventValidator } from "../validators/event.js";

export const postEvent = async (req, res, next) => {
  try {
    // Validate request
    const { value, error } = postEventValidator.validate({
      ...req.body,
      image: req.file?.filename
    }, {
      abortEarly: true
    });
    if (error) {
      return res.status(422).json({ error: { message: error.message } });
    }
    // Create event
    const event = await EventModel.create({
      ...value,
      user: req.auth.id
    });
    // Return response
    res.status(201).json({ data: event });
  } catch (error) {
    // Handle duplicate field error code
    if (error.code === 11000) {
      return res.status(409).json({ error: { message: error.message } });
    }
    // Allow next to take over the rest
    next(error);
  }
}

export const getEvents = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
    // Fetch events from database
    const events = await EventModel
      .find(JSON.parse(filter))
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip)
      .populate([
        { path: 'user', select: { name: true, email: true } },
        { path: 'college', select: { bio: false, createdAt: false, updatedAt: false } }
      ]);
    // Return response
    res.status(200).json({ data: events });
  } catch (error) {
    next(error);
  }
}

export const getEvent = async (req, res, next) => {
  try {
    // Find event by id
    const event = await EventModel
      .findById(req.params.id)
      .populate([
        { path: 'user', select: { name: true, email: true } },
        { path: 'college', select: { bio: false, createdAt: false, updatedAt: false } }
      ]);
    // Handle not found case
    if (!event) {
      return res.status(404).json({ error: { message: 'No event found!' } });
    }
    // Return response
    res.status(200).json({ data: event });
  } catch (error) {
    next(error);
  }
}

export const patchEvent = async (req, res, next) => {
  try {
    // Validate request
    const { value, error } = patchEventValidator.validate({
      ...req.body,
      image: req.file?.filename
    }, {
      abortEarly: true
    });
    if (error) {
      return res.status(422).json({ error: { message: error.message } });
    }
    // Update event
    const result = await EventModel.updateOne(
      { _id: req.params.id, user: req.auth.id },
      value,
    );
    // Handle no update result
    if (!result.modifiedCount) {
      return res.status(417).json({ error: { message: 'No event found to update!' } });
    }
    // Return response
    res.status(204).send();
  } catch (error) {
    // Handle duplicate field error code
    if (error.code === 11000) {
      return res.status(409).json({ error: { message: error.message } });
    }
    // Allow next to take over the rest
    next(error);
  }
}

export const deleteEvent = async (req, res, next) => {
  try {
    // Delete event
    const result = await EventModel.deleteOne({ _id: req.params.id, user: req.auth.id });
    // Handle no delete result
    if (!result.deletedCount) {
      return res.status(417).json({ error: { message: 'No event found to delete!' } });
    }
    // Return response
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}