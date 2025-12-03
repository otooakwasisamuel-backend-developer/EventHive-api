import { CollegeModel } from "../models/college.js";
import { postCollegeValidator, patchCollegeValidator } from "../validators/college.js";

export const postCollege = async (req, res, next) => {
  try {
    // Validate request
    const { value, error } = postCollegeValidator.validate({
      ...req.body,
      image: req.file?.filename
    }, {
      abortEarly: true
    });
    if (error) {
      return res.status(422).json({ error: { message: error.message } });
    }
    // Create college
    const college = await CollegeModel.create(value);
    // Return response
    res.status(201).json({ data: college });
  } catch (error) {
    // Handle duplicate field error code
    if (error.code === 11000) {
      return res.status(409).json({ error: { message: error.message } });
    }
    // Allow next to take over the rest
    next(error);
  }
}

export const getColleges = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
    // Fetch colleges from database
    const colleges = await CollegeModel
      .find(JSON.parse(filter))
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip);
    // Return response
    res.status(200).json({ data: colleges });
  } catch (error) {
    next(error);
  }
}

export const getCollege = async (req, res, next) => {
  try {
    // Find college by id
    const college = await CollegeModel.findById(req.params.id);
    // Handle not found case
    if (!college) {
      return res.status(404).json({ error: { message: 'No college found!' } });
    }
    // Return response
    res.status(200).json({ data: college });
  } catch (error) {
    next(error);
  }
}

export const patchCollege = async (req, res, next) => {
  try {
    // Validate request
    const { value, error } = patchCollegeValidator.validate({
      ...req.body,
      image: req.file?.filename
    }, {
      abortEarly: true
    });
    if (error) {
      return res.status(422).json({ error: { message: error.message } });
    }
    // Update college
    const result = await CollegeModel.updateOne(
      { _id: req.params.id },
      value,
    );
    // Handle no update result
    if (!result.modifiedCount) {
      return res.status(417).json({ error: { message: 'No college found to update!' } });
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

export const deleteCollege = async (req, res, next) => {
  try {
    // Delete college
    const result = await CollegeModel.deleteOne({ _id: req.params.id });
    // Handle no delete result
    if (!result.deletedCount) {
      return res.status(417).json({ error: { message: 'No college found to delete!' } });
    }
    // Return response
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}